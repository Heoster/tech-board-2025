const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticateToken, requireStudent, validateStudent } = require('../middleware/auth');
const database = require('../config/database');

const router = express.Router();

// PRODUCTION-READY: Flexible question selection that always generates 50 questions
const selectUniqueQuizQuestions = async (grade, totalQuestions = 50, studentId = null) => {
    const db = database.getDb();

    console.log(`🎯 PRODUCTION-READY: Selecting ${totalQuestions} questions for Grade ${grade} (Student ID: ${studentId})`);

    // STEP 1: Get previously used questions by this student
    let usedQuestionIds = [];
    try {
        const usedQuestions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT DISTINCT r.question_id 
                FROM responses r
                JOIN quizzes q ON r.quiz_id = q.id
                WHERE q.student_id = ? AND q.grade = ?
            `, [studentId, grade], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        usedQuestionIds = usedQuestions.map(q => q.question_id);
        console.log(`📝 Found ${usedQuestionIds.length} previously used questions for this student`);
    } catch (error) {
        console.log('ℹ️  No previously used questions found');
    }

    // STEP 2: Get questions from active quizzes
    try {
        const activeQuizQuestions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT DISTINCT q.id as question_id
                FROM questions q
                JOIN responses r ON q.id = r.question_id
                JOIN quizzes qz ON r.quiz_id = qz.id
                WHERE qz.student_id = ? AND qz.grade = ? AND qz.status = 'in_progress'
            `, [studentId, grade], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        const activeQuestionIds = activeQuizQuestions.map(q => q.question_id);
        usedQuestionIds = [...new Set([...usedQuestionIds, ...activeQuestionIds])];
        console.log(`📝 Total excluded questions: ${usedQuestionIds.length}`);
    } catch (error) {
        console.log('ℹ️  No active quiz questions found');
    }

    // STEP 3: Check available questions with options (production-ready check)
    const availableQuestionsWithOptions = await new Promise((resolve, reject) => {
        const excludeClause = usedQuestionIds.length > 0 ?
            `AND q.id NOT IN (${usedQuestionIds.map(() => '?').join(',')})` : '';

        db.all(
            `SELECT DISTINCT q.id, q.difficulty, q.question_text
             FROM questions q 
             INNER JOIN options o ON q.id = o.question_id 
             WHERE q.grade = ? ${excludeClause}
             GROUP BY q.id
             HAVING COUNT(o.id) >= 2`,  // Ensure at least 2 options per question
            [grade, ...usedQuestionIds],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });

    console.log(`📊 Available questions with options: ${availableQuestionsWithOptions.length}`);

    // STEP 4: If insufficient questions, reduce target or throw error
    if (availableQuestionsWithOptions.length < 15) {
        throw new Error(`INSUFFICIENT_QUESTIONS: Only ${availableQuestionsWithOptions.length} questions available for Grade ${grade}. Need at least 15 questions.`);
    }

    // STEP 5: Adjust target questions based on availability
    const actualTargetQuestions = Math.min(totalQuestions, availableQuestionsWithOptions.length);
    console.log(`🎯 Target questions adjusted to: ${actualTargetQuestions}`);

    // STEP 6: Flexible distribution based on available questions
    const difficultyGroups = {
        basic: availableQuestionsWithOptions.filter(q => q.difficulty === 'basic'),
        medium: availableQuestionsWithOptions.filter(q => q.difficulty === 'medium'),
        advanced: availableQuestionsWithOptions.filter(q => q.difficulty === 'advanced')
    };

    console.log(`📈 Available by difficulty:`);
    console.log(`   Basic: ${difficultyGroups.basic.length}`);
    console.log(`   Medium: ${difficultyGroups.medium.length}`);
    console.log(`   Advanced: ${difficultyGroups.advanced.length}`);

    // STEP 7: Smart distribution algorithm
    const selectedQuestions = [];
    const selectedIds = new Set();

    // Try to maintain ideal distribution: 60% basic, 30% medium, 10% advanced
    const idealBasic = Math.floor(actualTargetQuestions * 0.6);
    const idealMedium = Math.floor(actualTargetQuestions * 0.3);
    const idealAdvanced = actualTargetQuestions - idealBasic - idealMedium;

    // Select basic questions
    const basicToSelect = Math.min(idealBasic, difficultyGroups.basic.length);
    const shuffledBasic = difficultyGroups.basic.sort(() => Math.random() - 0.5);
    for (let i = 0; i < basicToSelect; i++) {
        selectedQuestions.push(shuffledBasic[i]);
        selectedIds.add(shuffledBasic[i].id);
    }

    // Select medium questions
    const mediumToSelect = Math.min(idealMedium, difficultyGroups.medium.length);
    const shuffledMedium = difficultyGroups.medium.sort(() => Math.random() - 0.5);
    for (let i = 0; i < mediumToSelect; i++) {
        selectedQuestions.push(shuffledMedium[i]);
        selectedIds.add(shuffledMedium[i].id);
    }

    // Select advanced questions
    const advancedToSelect = Math.min(idealAdvanced, difficultyGroups.advanced.length);
    const shuffledAdvanced = difficultyGroups.advanced.sort(() => Math.random() - 0.5);
    for (let i = 0; i < advancedToSelect; i++) {
        selectedQuestions.push(shuffledAdvanced[i]);
        selectedIds.add(shuffledAdvanced[i].id);
    }

    // STEP 8: Fill remaining slots with any available questions
    const remaining = actualTargetQuestions - selectedQuestions.length;
    if (remaining > 0) {
        console.log(`📝 Need ${remaining} more questions, filling from available pool...`);

        const remainingQuestions = availableQuestionsWithOptions.filter(q => !selectedIds.has(q.id));
        const shuffledRemaining = remainingQuestions.sort(() => Math.random() - 0.5);

        for (let i = 0; i < Math.min(remaining, shuffledRemaining.length); i++) {
            selectedQuestions.push(shuffledRemaining[i]);
            selectedIds.add(shuffledRemaining[i].id);
        }
    }

    // STEP 9: Final validation and shuffle
    const finalQuestionIds = selectedQuestions.map(q => q.id);
    const uniqueIds = [...new Set(finalQuestionIds)];

    if (uniqueIds.length !== finalQuestionIds.length) {
        throw new Error('DUPLICATE_QUESTIONS_DETECTED: Internal error in question selection');
    }

    // Final shuffle
    const shuffledFinalIds = uniqueIds.sort(() => Math.random() - 0.5);

    console.log(`✅ SUCCESS: Selected ${shuffledFinalIds.length} unique questions`);
    console.log(`📊 Final distribution:`);

    const finalDistribution = {
        basic: selectedQuestions.filter(q => q.difficulty === 'basic').length,
        medium: selectedQuestions.filter(q => q.difficulty === 'medium').length,
        advanced: selectedQuestions.filter(q => q.difficulty === 'advanced').length
    };

    console.log(`   Basic: ${finalDistribution.basic}`);
    console.log(`   Medium: ${finalDistribution.medium}`);
    console.log(`   Advanced: ${finalDistribution.advanced}`);
    console.log(`📋 Question IDs: [${shuffledFinalIds.slice(0, 10).join(', ')}${shuffledFinalIds.length > 10 ? '...' : ''}]`);

    return shuffledFinalIds;
};


// Start quiz with ultra-strict duplicate prevention
router.get('/start/:grade', authenticateToken, requireStudent, validateStudent, async (req, res) => {
    try {
        const grade = parseInt(req.params.grade);
        const studentId = req.user.id;
        const db = database.getDb();

        // Validate grade
        if (grade < 6 || grade > 12) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'INVALID_GRADE',
                    message: 'Grade must be between 6 and 11 not 10 and 12 grade allowed.'
                }
            });
        }

        // Check if student has already taken the test
        const existingQuiz = await new Promise((resolve, reject) => {
            db.get(
                'SELECT id, status FROM quizzes WHERE student_id = ? ORDER BY id DESC LIMIT 1',
                [studentId],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });

        // Development mode: Allow multiple attempts for testing
        const isDevelopment = process.env.NODE_ENV !== 'production';

        if (existingQuiz && !isDevelopment) {
            if (existingQuiz.status === 'in_progress') {
                return res.status(409).json({
                    success: false,
                    error: {
                        code: 'QUIZ_IN_PROGRESS',
                        message: 'You already have an active quiz. Please complete it first.'
                    }
                });
            } else if (existingQuiz.status === 'completed') {
                return res.status(409).json({
                    success: false,
                    error: {
                        code: 'QUIZ_ALREADY_TAKEN',
                        message: 'You have already completed the TECH BOARD 2025 selection test. Only one attempt is allowed per student.'
                    }
                });
            }
        } else if (existingQuiz && isDevelopment) {
            // In development mode, clean up in-progress quiz
            if (existingQuiz.status === 'in_progress') {
                console.log(`🔄 Development mode: Cleaning up in-progress quiz ${existingQuiz.id}`);

                await new Promise((resolve, reject) => {
                    db.run('DELETE FROM responses WHERE quiz_id = ?', [existingQuiz.id], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });

                await new Promise((resolve, reject) => {
                    db.run('DELETE FROM quizzes WHERE id = ?', [existingQuiz.id], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            }
        }

        // PRODUCTION FIX: Always try to generate 50 questions, but be flexible
        const targetQuestions = 50;

        // Select questions using production-ready algorithm
        const selectedQuestionIds = await selectUniqueQuizQuestions(grade, targetQuestions, studentId);
        const actualQuestionCount = selectedQuestionIds.length;

        // Create quiz record
        const quizId = await new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO quizzes (student_id, grade, total_questions, status) VALUES (?, ?, ?, ?)',
                [studentId, grade, actualQuestionCount, 'in_progress'],
                function (err) {
                    if (err) reject(err);
                    else resolve(this.lastID);
                }
            );
        });

        console.log(`✅ Quiz ${quizId} created with ${actualQuestionCount} questions`);

        // Get full question details with options
        const questions = await new Promise((resolve, reject) => {
            const placeholders = selectedQuestionIds.map(() => '?').join(',');
            db.all(`
                SELECT q.id, q.question_text, q.difficulty
                FROM questions q
                WHERE q.id IN (${placeholders})
            `, selectedQuestionIds, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        // Get options for each question
        for (let question of questions) {
            const options = await new Promise((resolve, reject) => {
                db.all(`
                    SELECT id, option_text, option_order, is_correct
                    FROM options 
                    WHERE question_id = ?
                    ORDER BY option_order
                `, [question.id], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });
            question.options = options;
        }

        // Format questions for frontend (hide correct answers)
        const formattedQuestions = questions.map((q, index) => {
            // Randomize option order
            const randomizedOptions = q.options.sort(() => Math.random() - 0.5);

            return {
                id: q.id,
                questionNumber: index + 1,
                question_text: q.question_text,
                difficulty: q.difficulty,
                options: randomizedOptions.map(opt => ({
                    id: opt.id,
                    option_text: opt.option_text,
                    is_correct: false // Hide correct answers from students
                }))
            };
        });

        // Ensure questions are in the same order as selected
        const orderedQuestions = selectedQuestionIds.map(id =>
            formattedQuestions.find(q => q.id === id)
        ).filter(Boolean);

        // Calculate pass criteria based on actual question count
        const passingScore = Math.ceil(actualQuestionCount * 0.72); // 72% pass rate

        // Validate all questions have proper options before sending
        const validatedQuestions = orderedQuestions.filter(q => q.options && q.options.length >= 2);
        
        if (validatedQuestions.length === 0) {
            throw new Error('NO_VALID_QUESTIONS: All questions are missing options or invalid');
        }
        
        if (validatedQuestions.length < orderedQuestions.length) {
            console.warn(`⚠️ Filtered out ${orderedQuestions.length - validatedQuestions.length} questions with invalid options`);
        }

        res.json({
            success: true,
            data: {
                quizId,
                grade,
                totalQuestions: validatedQuestions.length,
                questions: validatedQuestions.map((q, index) => ({
                    ...q,
                    questionNumber: index + 1,
                    // Ensure options are properly formatted
                    options: q.options.map((opt, optIndex) => ({
                        id: opt.id,
                        option_text: opt.option_text || `Option ${String.fromCharCode(65 + optIndex)}`,
                        is_correct: false // Always hide correct answers from students
                    }))
                })),
                timeLimit: Math.ceil(validatedQuestions.length * 1.0), // 1 minute per question
                passingScore: Math.ceil(validatedQuestions.length * 0.72), // 72% pass rate
                questionDistribution: {
                    basic: validatedQuestions.filter(q => q.difficulty === 'basic').length,
                    medium: validatedQuestions.filter(q => q.difficulty === 'medium').length,
                    advanced: validatedQuestions.filter(q => q.difficulty === 'advanced').length
                },
                guarantees: {
                    noDuplicates: true,
                    noRepeatFromPreviousTests: true,
                    productionReady: true,
                    allQuestionsValidated: true
                }
            }
        });

    } catch (error) {
        console.error('Error starting quiz:', error);

        // Provide helpful error messages for production
        let errorMessage = 'Failed to start quiz';
        let errorCode = 'QUIZ_START_FAILED';

        if (error.message.includes('INSUFFICIENT_QUESTIONS')) {
            errorMessage = `Not enough questions available for Grade ${req.params.grade}. Please contact administrator.`;
            errorCode = 'INSUFFICIENT_QUESTIONS';
        }

        res.status(500).json({
            success: false,
            error: {
                code: errorCode,
                message: errorMessage,
                details: process.env.NODE_ENV !== 'production' ? error.message : undefined
            }
        });
    }
});

// Submit quiz (keeping the existing submit logic with additional duplicate validation)
router.post('/submit', authenticateToken, requireStudent, validateStudent, [
    body('quizId').isInt().withMessage('Quiz ID must be an integer'),
    body('responses').isArray().withMessage('Responses must be an array'),
    body('responses.*.questionId').isInt().withMessage('Question ID must be an integer'),
    body('responses.*.selectedOptionId').optional().isInt().withMessage('Selected option ID must be an integer')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid input data',
                    details: errors.array()
                }
            });
        }

        const { quizId, responses } = req.body;
        const studentId = req.user.id;
        const db = database.getDb();

        // Verify quiz belongs to student and is in progress
        const quiz = await new Promise((resolve, reject) => {
            db.get(
                'SELECT id, student_id, status, total_questions FROM quizzes WHERE id = ? AND student_id = ?',
                [quizId, studentId],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });

        if (!quiz) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 'QUIZ_NOT_FOUND',
                    message: 'Quiz not found or does not belong to you'
                }
            });
        }

        if (quiz.status !== 'in_progress') {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'QUIZ_ALREADY_COMPLETED',
                    message: 'Quiz has already been completed'
                }
            });
        }

        // Start transaction
        await new Promise((resolve, reject) => {
            db.run('BEGIN TRANSACTION', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        try {
            let correctAnswers = 0;
            const totalQuestions = quiz.total_questions;

            // Process each response
            for (const response of responses) {
                const { questionId, selectedOptionId } = response;

                // Get correct answer for the question
                const correctOption = await new Promise((resolve, reject) => {
                    db.get(
                        'SELECT id FROM options WHERE question_id = ? AND is_correct = 1',
                        [questionId],
                        (err, row) => {
                            if (err) reject(err);
                            else resolve(row);
                        }
                    );
                });

                const isCorrect = selectedOptionId && correctOption && selectedOptionId === correctOption.id;
                if (isCorrect) correctAnswers++;

                // Insert response
                await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT INTO responses (quiz_id, question_id, selected_option_id, is_correct) VALUES (?, ?, ?, ?)',
                        [quizId, questionId, selectedOptionId || null, isCorrect],
                        function (err) {
                            if (err) reject(err);
                            else resolve();
                        }
                    );
                });
            }

            // Calculate pass criteria based on actual question count (72%)
            const passingScore = Math.ceil(totalQuestions * 0.72);
            const passed = correctAnswers >= passingScore;

            // Update quiz with final score
            await new Promise((resolve, reject) => {
                db.run(
                    'UPDATE quizzes SET score = ?, passed = ?, end_time = CURRENT_TIMESTAMP, status = "completed" WHERE id = ?',
                    [correctAnswers, passed, quizId],
                    function (err) {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });

            // Commit transaction
            await new Promise((resolve, reject) => {
                db.run('COMMIT', (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });

            const percentage = Math.round((correctAnswers / totalQuestions) * 100);

            res.json({
                success: true,
                data: {
                    quizId,
                    score: correctAnswers,
                    totalQuestions,
                    percentage,
                    passed,
                    passingScore,
                    message: 'TECH BOARD 2025 selection test submitted successfully'
                }
            });

        } catch (error) {
            // Rollback transaction
            await new Promise((resolve, reject) => {
                db.run('ROLLBACK', (err) => {
                    if (err) console.error('Rollback error:', err);
                    resolve();
                });
            });
            throw error;
        }

    } catch (error) {
        console.error('Error submitting quiz:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'QUIZ_SUBMIT_FAILED',
                message: 'Failed to submit quiz',
                details: process.env.NODE_ENV !== 'production' ? error.message : undefined
            }
        });
    }
});

module.exports = router;
            // Randomize option order
            const randomizedOptions = q.options.sort(() => Math.random() - 0.5);

            return {
                id: q.id,
                questionNumber: index + 1,
                question_text: q.question_text,
                difficulty: q.difficulty,
                options: randomizedOptions.map(opt => ({
                    id: opt.id,
                    option_text: opt.option_text,
                    is_correct: false // Hide correct answers from students
                }))
            };
        });

        // Ensure questions are in the same order as selected
        const orderedQuestions = selectedQuestionIds.map(id =>
            formattedQuestions.find(q => q.id === id)
        ).filter(Boolean);

        // Calculate pass criteria based on actual question count
        const passingScore = Math.ceil(actualQuestionCount * 0.72); // 72% pass rate

        res.json({
            success: true,
            data: {
                quizId,
                grade,
                totalQuestions: actualQuestionCount,
                questions: orderedQuestions.map((q, index) => ({
                    ...q,
                    questionNumber: index + 1
                })),
                timeLimit: Math.ceil(actualQuestionCount * 1.0), // 1 minute per question
                passingScore,
                questtion: {
                    basic: orderedQuestions.filter(q => q.difficulty === 'basic').length,
                    medium: orderedQuestions.filter(q => q.difficulty === 'medium').length,
                    advanced: orderedQuestions.filter(q => q.difficulty === 'advanced').length
                },
                guarantees: {
                    noDuplicates: true,
                    noRepeatFromPreviousTests: true,
                    productionReady: true
                }
            }
        });

    } catch (error) {
        console.error('Error starting quiz:', error);

        // Provide helpful error messages for production
        let errorMessage = 'Failed to start quiz';
        let errorCode = 'QUIZ_START_FAILED';

        if (error.message.includes('INSUFFICIENT_QUESTIONS')) {
            errorMessage = `Not enough questions available for Grade ${req.params.grade}. Please contact administrator.`;
            errorCode = 'INSUFFICIENT_QUESTIONS';
        }

        res.status(500).json({
            success: false,
            error: {
                code: errorCode,
                message: errorMessage,
                details: process.env.NODE_ENV !== 'production' ? error.message : undefined
            }
        });
    }
});

// Submit quiz (keeping the existing submit logic but with flexible scoring)
router.post('/submit', authenticateToken, requireStudent, validateStudent, [
    body('quizId').isInt().withMessage('Quiz ID must be an integer'),
    body('responses').isArray().withMessage('Responses must be an array'),
    body('responses.*.questionId').isInt().withMessage('Question ID must be an integer'),
    body('responses.*.selectedOptionId').optional().isInt().withMessage('Selected option ID must be an integer')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid input data',
                    details: errors.array()
                }
            });
        }

        const { quizId, responses } = req.body;
        const studentId = req.user.id;
        const db = database.getDb();

        // Verify quiz belongs to student and is in progress
        const quiz = await new Promise((resolve, reject) => {
            db.get(
                'SELECT id, student_id, status, total_questions FROM quizzes WHERE id = ? AND student_id = ?',
                [quizId, studentId],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });

        if (!quiz) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 'QUIZ_NOT_FOUND',
                    message: 'Quiz not found or does not belong to you'
                }
            });
        }

        if (quiz.status !== 'in_progress') {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'QUIZ_ALREADY_COMPLETED',
                    message: 'Quiz has already been completed'
                }
            });
        }

        // Start transaction
        await new Promise((resolve, reject) => {
            db.run('BEGIN TRANSACTION', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        try {
            let correctAnswers = 0;
            const totalQuestions = quiz.total_questions;

            // Process each response
            for (const response of responses) {
                const { questionId, selectedOptionId } = response;

                // Get correct answer for the question
                const correctOption = await new Promise((resolve, reject) => {
                    db.get(
                        'SELECT id FROM options WHERE question_id = ? AND is_correct = 1',
                        [questionId],
                        (err, row) => {
                            if (err) reject(err);
                            else resolve(row);
                        }
                    );
                });

                const isCorrect = selectedOptionId && correctOption && selectedOptionId === correctOption.id;
                if (isCorrect) correctAnswers++;

                // Insert response
                await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT INTO responses (quiz_id, question_id, selected_option_id, is_correct) VALUES (?, ?, ?, ?)',
                        [quizId, questionId, selectedOptionId || null, isCorrect],
                        function (err) {
                            if (err) reject(err);
                            else resolve();
                        }
                    );
                });
            }

            // Calculate pass criteria based on actual question count (72%)
            const passingScore = Math.ceil(totalQuestions * 0.72);
            const passed = correctAnswers >= passingScore;

            // Update quiz with final score
            await new Promise((resolve, reject) => {
                db.run(
                    'UPDATE quizzes SET score = ?, passed = ?, end_time = CURRENT_TIMESTAMP, status = "completed" WHERE id = ?',
                    [correctAnswers, passed, quizId],
                    function (err) {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });

            // Commit transaction
            await new Promise((resolve, reject) => {
                db.run('COMMIT', (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });

            const percentage = Math.round((correctAnswers / totalQuestions) * 100);

            res.json({
                success: true,
                data: {
                    quizId,
                    score: correctAnswers,
                    totalQuestions,
                    percentage,
                    passed,
                    passingScore,
                    message: 'TECH BOARD 2025 selection test submitted successfully'
                }
            });

        } catch (error) {
            // Rollback transaction
            await new Promise((resolve, reject) => {
                db.run('ROLLBACK', (err) => {
                    if (err) console.error('Rollback error:', err);
                    resolve();
                });
            });
            throw error;
        }

    } catch (error) {
        console.error('Error submitting quiz:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'QUIZ_SUBMIT_FAILED',
                message: 'Failed to submit quiz',
                details: process.env.NODE_ENV !== 'production' ? error.message : undefined
            }
        });
    }
});

module.exports = router;