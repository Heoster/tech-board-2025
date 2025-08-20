const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const database = require('../config/database');
const { performanceMonitor } = require('../middleware/performance');
// const { questionGenerator } = require('../utils/question-generator'); // Disabled for now

const router = express.Router();

// In-memory cache for quiz questions by grade
const questionCache = new Map();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

// Cache management utilities
const getCacheKey = (grade) => `questions_grade_${grade}`;
const isCacheValid = (cacheEntry) => {
    return cacheEntry && (Date.now() - cacheEntry.timestamp) < CACHE_TTL;
};

// Optimized question fetching with selective fields and caching
const getQuestionsForGrade = async (grade) => {
    const cacheKey = getCacheKey(grade);
    const cached = questionCache.get(cacheKey);

    if (isCacheValid(cached)) {
        console.log(`Cache hit for grade ${grade} questions`);
        return cached.data;
    }

    const startTime = performance.now();
    const db = database.getDb();

    // Optimized query with selective fields, proper indexing, and minimal data transfer
    const questions = await new Promise((resolve, reject) => {
        // First get questions with minimal fields
        db.all(`
            SELECT id, question_text, difficulty
            FROM questions 
            WHERE grade = ?
            ORDER BY RANDOM()
        `, [grade], (err, questionRows) => {
            if (err) {
                reject(err);
                return;
            }

            if (questionRows.length === 0) {
                resolve([]);
                return;
            }

            // Batch fetch options for all questions
            const questionIds = questionRows.map(q => q.id);
            const placeholders = questionIds.map(() => '?').join(',');

            db.all(`
                SELECT question_id, id, option_text, option_order, is_correct
                FROM options 
                WHERE question_id IN (${placeholders})
                ORDER BY question_id, option_order
            `, questionIds, (err, optionRows) => {
                if (err) {
                    reject(err);
                    return;
                }

                // Group options by question_id for efficient lookup
                const optionsByQuestion = {};
                optionRows.forEach(option => {
                    if (!optionsByQuestion[option.question_id]) {
                        optionsByQuestion[option.question_id] = [];
                    }
                    optionsByQuestion[option.question_id].push({
                        id: option.id,
                        text: option.option_text,
                        order: option.option_order,
                        // Don't include is_correct in client response for security
                    });
                });

                // Combine questions with their options
                const result = questionRows.map(question => ({
                    id: question.id,
                    question_text: question.question_text,
                    difficulty: question.difficulty,
                    options: optionsByQuestion[question.id] || []
                }));

                resolve(result);
            });
        });
    });

    const queryTime = performance.now() - startTime;
    performanceMonitor.trackQuery(`getQuestionsForGrade(${grade})`, queryTime);

    // Cache the results
    questionCache.set(cacheKey, {
        data: questions,
        timestamp: Date.now()
    });

    console.log(`Cached ${questions.length} questions for grade ${grade} (${queryTime.toFixed(2)}ms)`);
    return questions;
};

// Batch operation for quiz answers
const batchInsertAnswers = async (quizId, answers) => {
    const db = database.getDb();
    const startTime = performance.now();

    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('BEGIN TRANSACTION');

            const stmt = db.prepare(`
                INSERT INTO quiz_answers (quiz_id, question_id, selected_option_id, is_correct) 
                VALUES (?, ?, ?, ?)
            `);

            let completed = 0;
            let totalScore = 0;

            answers.forEach((answer, index) => {
                // Handle unanswered questions (null selectedOptionId)
                if (answer.selectedOptionId === null) {
                    stmt.run([quizId, answer.questionId, null, 0], (err) => {
                        if (err) {
                            db.run('ROLLBACK');
                            return reject(err);
                        }

                        completed++;
                        if (completed === answers.length) {
                            stmt.finalize();
                            db.run('COMMIT', (err) => {
                                if (err) {
                                    return reject(err);
                                }

                                const queryTime = performance.now() - startTime;
                                performanceMonitor.trackQuery(`batchInsertAnswers(${answers.length})`, queryTime);

                                resolve(totalScore);
                            });
                        }
                    });
                } else {
                    // Get correct answer info for answered questions
                    db.get('SELECT is_correct FROM options WHERE id = ?', [answer.selectedOptionId], (err, option) => {
                        if (err) {
                            db.run('ROLLBACK');
                            return reject(err);
                        }

                        const isCorrect = option?.is_correct || 0;
                        if (isCorrect) totalScore++;

                        stmt.run([quizId, answer.questionId, answer.selectedOptionId, isCorrect], (err) => {
                            if (err) {
                                db.run('ROLLBACK');
                                return reject(err);
                            }

                            completed++;
                            if (completed === answers.length) {
                                stmt.finalize();
                                db.run('COMMIT', (err) => {
                                    if (err) {
                                        return reject(err);
                                    }

                                    const queryTime = performance.now() - startTime;
                                    performanceMonitor.trackQuery(`batchInsertAnswers(${answers.length})`, queryTime);

                                    resolve(totalScore);
                                });
                            }
                        });
                    });
                }
            });
        });
    });
};

// Start quiz
router.post('/start', authenticateToken, async (req, res) => {
    try {
        // Debug logging
        console.log('Quiz start request - User:', req.user);
        console.log('Quiz start request - Body:', req.body);

        // Get grade from user token (set during login) or request body as fallback
        const grade = req.user.grade || req.body.grade;
        const studentId = req.user.id;

        // Validate student ID
        if (!studentId) {
            console.error('Quiz start failed: No student ID');
            return res.status(400).json({
                success: false,
                error: 'Student ID not found. Please log in again.'
            });
        }

        // Validate grade
        const validGrades = [6, 7, 8, 9, 11];
        const gradeInt = parseInt(grade);
        if (!grade || !validGrades.includes(gradeInt)) {
            console.error('Quiz start failed: Invalid grade', { grade, gradeInt });
            return res.status(400).json({
                success: false,
                error: `Invalid grade: ${grade}. Valid grades are 6, 7, 8, 9, 11. Please ensure you are logged in properly.`
            });
        }

        const db = database.getDb();

        // Verify database connection
        if (!db) {
            console.error('Quiz start failed: Database not connected');
            return res.status(500).json({
                success: false,
                error: 'Database connection failed'
            });
        }

        // Check if student already has a quiz
        const existingQuiz = await database.get('SELECT id, status FROM quizzes WHERE student_id = ?', [studentId]);

        if (existingQuiz) {
            console.log('Student already has quiz:', existingQuiz);
            if (existingQuiz.status === 'completed') {
                return res.status(400).json({
                    success: false,
                    error: 'You have already completed the test'
                });
            } else {
                return res.status(400).json({
                    success: false,
                    error: 'You already have a test in progress'
                });
            }
        }

        // Get all questions for the grade and generate quiz
        console.log(`Generating question set for student ${studentId}, grade ${gradeInt}`);

        try {
            const allQuestions = await getQuestionsForGrade(gradeInt);
            console.log(`Retrieved ${allQuestions.length} questions for grade ${gradeInt}`);

            const minQuestions = process.env.NODE_ENV === 'test' ? 10 : 50;
            if (allQuestions.length < minQuestions) {
                console.error(`Insufficient questions for grade ${gradeInt}: ${allQuestions.length}`);
                return res.status(400).json({
                    success: false,
                    error: `Insufficient questions available for grade ${gradeInt}. Found ${allQuestions.length} questions, need ${minQuestions}.`
                });
            }

            // Ensure no duplicate questions in quiz
            const questionCount = process.env.NODE_ENV === 'test' ? Math.min(10, allQuestions.length) : 50;
            
            // Remove any potential duplicates based on question text
            const uniqueQuestions = [];
            const seenTexts = new Set();
            
            for (const question of allQuestions) {
                const normalizedText = question.question_text.toLowerCase().trim();
                if (!seenTexts.has(normalizedText)) {
                    seenTexts.add(normalizedText);
                    uniqueQuestions.push(question);
                }
            }
            
            console.log(`Filtered ${allQuestions.length} questions to ${uniqueQuestions.length} unique questions`);
            
            if (uniqueQuestions.length < questionCount) {
                console.error(`Insufficient unique questions for grade ${gradeInt}: ${uniqueQuestions.length} unique, need ${questionCount}`);
                return res.status(400).json({
                    success: false,
                    error: `Insufficient unique questions available for grade ${gradeInt}. Found ${uniqueQuestions.length} unique questions, need ${questionCount}.`
                });
            }
            
            // Shuffle and select questions
            const shuffled = [...uniqueQuestions].sort(() => Math.random() - 0.5);
            const questions = shuffled.slice(0, questionCount);

            console.log(`Successfully generated ${questions.length} questions for student ${studentId}`);

            // Create quiz session with 50-minute time limit
            const quizResult = await database.run(
                'INSERT INTO quizzes (student_id, grade, total_questions, status) VALUES (?, ?, ?, ?)',
                [studentId, gradeInt, questionCount, 'in_progress']
            );
            const quizId = quizResult.lastID;

            console.log(`Quiz created with ID: ${quizId}`);

            res.json({
                success: true,
                data: {
                    quizId,
                    questions,
                    timeLimit: 50 * 60 * 1000, // 50 minutes in milliseconds
                    startTime: new Date().toISOString()
                }
            });
        } catch (questionError) {
            console.error('Question generation error:', questionError);
            return res.status(500).json({
                success: false,
                error: 'Failed to generate quiz questions'
            });
        }
    } catch (error) {
        console.error('Quiz start error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to start quiz',
            details: process.env.NODE_ENV !== 'production' ? error.message : undefined
        });
    }
});

// Submit quiz
router.post('/submit', authenticateToken, async (req, res) => {
    try {
        console.log('Quiz submission request:', {
            userId: req.user?.id,
            userType: req.user?.type,
            bodyKeys: Object.keys(req.body),
            answersLength: req.body.answers?.length
        });

        const { quizId, answers, startTime } = req.body;
        const studentId = req.user.id;

        // Enhanced validation with detailed error messages
        if (!quizId) {
            console.error('Quiz submission failed: Missing quizId');
            return res.status(400).json({ 
                success: false,
                error: 'Quiz ID is required',
                code: 'MISSING_QUIZ_ID'
            });
        }

        if (!answers) {
            console.error('Quiz submission failed: Missing answers');
            return res.status(400).json({ 
                success: false,
                error: 'Answers are required',
                code: 'MISSING_ANSWERS'
            });
        }

        if (!Array.isArray(answers)) {
            console.error('Quiz submission failed: Answers not array', typeof answers);
            return res.status(400).json({ 
                success: false,
                error: 'Answers must be an array',
                code: 'INVALID_ANSWERS_FORMAT'
            });
        }

        if (!studentId) {
            console.error('Quiz submission failed: Missing student ID from token');
            return res.status(400).json({ 
                success: false,
                error: 'Student authentication failed',
                code: 'MISSING_STUDENT_ID'
            });
        }

        // Verify quiz belongs to student
        const quiz = await database.get(
            'SELECT * FROM quizzes WHERE id = ? AND student_id = ?',
            [quizId, studentId]
        );

        if (!quiz) {
            console.error('Quiz submission failed: Quiz not found', { quizId, studentId });
            return res.status(404).json({ 
                success: false,
                error: 'Quiz not found or does not belong to this student',
                code: 'QUIZ_NOT_FOUND'
            });
        }

        if (quiz.status === 'completed') {
            console.error('Quiz submission failed: Quiz already completed', { quizId, studentId });
            return res.status(400).json({ 
                success: false,
                error: 'Quiz already completed',
                code: 'QUIZ_ALREADY_COMPLETED'
            });
        }

        // Check time limit (50 minutes)
        const quizStartTime = new Date(startTime || quiz.started_at);
        const currentTime = new Date();
        const timeDiff = (currentTime - quizStartTime) / 1000 / 60; // in minutes

        if (timeDiff > 50) {
            console.error('Quiz submission failed: Time limit exceeded', { 
                quizId, 
                studentId, 
                timeDiff: Math.round(timeDiff * 100) / 100 
            });
            return res.status(400).json({ 
                success: false,
                error: 'Time limit exceeded. Quiz automatically submitted.',
                code: 'TIME_LIMIT_EXCEEDED'
            });
        }

        // Validate answer count (allow partial submissions but log them)
        if (answers.length > 50) {
            console.error('Quiz submission failed: Too many answers', { 
                quizId, 
                studentId, 
                expected: 50, 
                received: answers.length 
            });
            return res.status(400).json({ 
                success: false,
                error: `Cannot submit more than 50 answers. Received ${answers.length} answers.`,
                code: 'TOO_MANY_ANSWERS'
            });
        }

        if (answers.length < 50) {
            console.warn('Quiz submission with partial answers', { 
                quizId, 
                studentId, 
                expected: 50, 
                received: answers.length,
                unanswered: 50 - answers.length
            });
        }

        // Use batch operation for better performance
        const score = await batchInsertAnswers(quizId, answers);

        // Update quiz with final score
        await database.run(
            'UPDATE quizzes SET score = ?, status = "completed", completed_at = CURRENT_TIMESTAMP WHERE id = ?',
            [score, quizId]
        );

        // Calculate pass/fail (72% = 36/50)
        const passed = score >= 36;

        // Students only see pass/fail status - NO detailed results
        res.json({
            success: true,
            message: 'Test submitted successfully. Results will be reviewed by administration.',
            status: passed ? 'qualified' : 'not_qualified',
            quizId: quizId
        });
    } catch (error) {
        console.error('Quiz submit error:', {
            error: error.message,
            stack: error.stack,
            userId: req.user?.id,
            body: req.body
        });
        res.status(500).json({ 
            success: false,
            error: 'Failed to submit quiz',
            code: 'INTERNAL_SERVER_ERROR'
        });
    }
});

// Get quiz results (Admin only)
router.get('/results/:quizId', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const { quizId } = req.params;

        // Get quiz details
        const quiz = await database.get(
            'SELECT * FROM quizzes WHERE id = ?',
            [quizId]
        );

        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        // Admin access is already verified by middleware

        // Get quiz responses
        const responses = await database.query(`
            SELECT qa.*, q.question_text, o.option_text, o.is_correct
            FROM quiz_answers qa
            JOIN questions q ON qa.question_id = q.id
            JOIN options o ON qa.selected_option_id = o.id
            WHERE qa.quiz_id = ?
        `, [quizId]);

        res.json({ quiz, responses });
    } catch (error) {
        console.error('Get quiz results error:', error);
        res.status(500).json({ error: 'Failed to get quiz results' });
    }
});

module.exports = router;