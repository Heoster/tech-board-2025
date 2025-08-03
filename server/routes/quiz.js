const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticateToken, requireStudent, validateStudent } = require('../middleware/auth');
const database = require('../config/database');

const router = express.Router();

// Enhanced Quiz selection algorithm - ensures NO question repetition globally + 70% practical focus for grades 6-8
const selectQuizQuestions = async (grade, totalQuestions = 25, studentId = null) => {
    const db = database.getDb();
    
    // Define difficulty distribution (60% basic, 30% medium, 10% advanced)
    const basicCount = Math.floor(totalQuestions * 0.6); // 15 questions
    const mediumCount = Math.floor(totalQuestions * 0.3); // 7 questions  
    const advancedCount = totalQuestions - basicCount - mediumCount; // 3 questions
    
    // Define practical/theoretical distribution for grades 6-8
    const isFoundationalGrade = [6, 7, 8].includes(grade);
    const practicalCount = isFoundationalGrade ? Math.floor(totalQuestions * 0.7) : 0; // 70% practical for grades 6-8
    const theoreticalCount = isFoundationalGrade ? totalQuestions - practicalCount : totalQuestions;
    
    if (isFoundationalGrade) {
        console.log(`🎯 Selecting ${totalQuestions} questions for Grade ${grade} (FOUNDATIONAL): ${practicalCount} practical (70%), ${theoreticalCount} theoretical (30%)`);
        console.log(`📊 Difficulty distribution: ${basicCount} basic, ${mediumCount} medium, ${advancedCount} advanced`);
    } else {
        console.log(`💻 Selecting ${totalQuestions} COMPUTER questions for Grade ${grade}: ${basicCount} basic, ${mediumCount} medium, ${advancedCount} advanced`);
    }
    
    const selectedQuestions = [];
    
    // Get ALL globally used questions to ensure NO repetition across the entire system
    let globallyUsedQuestions = [];
    try {
        const usedQuestionRows = await new Promise((resolve, reject) => {
            db.all(`
                SELECT DISTINCT question_id 
                FROM used_questions 
                WHERE grade = ?
            `, [grade], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        globallyUsedQuestions = usedQuestionRows.map(q => q.question_id);
        console.log(`🚫 Found ${globallyUsedQuestions.length} globally used questions for Grade ${grade} - these will be excluded`);
    } catch (error) {
        console.log('⚠️  No globally used questions found or error occurred:', error.message);
    }
    
    // Helper function to select questions with focus type filtering for grades 6-8
    const selectUnusedQuestions = async (difficulty, count, focusType = null, additionalExcludes = []) => {
        const allExcludes = [...globallyUsedQuestions, ...additionalExcludes];
        const excludeClause = allExcludes.length > 0 ? 
            `AND id NOT IN (${allExcludes.map(() => '?').join(',')})` : '';
        
        // Add focus type filter for foundational grades (6-8)
        const focusClause = focusType ? `AND focus_type = '${focusType}'` : '';
        
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT id FROM questions 
                 WHERE grade = ? AND difficulty = ? AND topic = 'computer' ${focusClause} ${excludeClause}
                 ORDER BY RANDOM() LIMIT ?`,
                [grade, difficulty, ...allExcludes, count],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });
    };
    
    // Check available questions by focus type for foundational grades
    let availablePractical = 0;
    let availableTheoretical = 0;
    
    if (isFoundationalGrade) {
        // Check practical questions availability
        availablePractical = await new Promise((resolve, reject) => {
            const excludeClause = globallyUsedQuestions.length > 0 ? 
                `AND id NOT IN (${globallyUsedQuestions.map(() => '?').join(',')})` : '';
            db.get(
                `SELECT COUNT(*) as count FROM questions 
                 WHERE grade = ? AND topic = 'computer' AND focus_type = 'practical' ${excludeClause}`,
                [grade, ...globallyUsedQuestions],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                }
            );
        });
        
        // Check theoretical questions availability
        availableTheoretical = await new Promise((resolve, reject) => {
            const excludeClause = globallyUsedQuestions.length > 0 ? 
                `AND id NOT IN (${globallyUsedQuestions.map(() => '?').join(',')})` : '';
            db.get(
                `SELECT COUNT(*) as count FROM questions 
                 WHERE grade = ? AND topic = 'computer' AND focus_type = 'theoretical' ${excludeClause}`,
                [grade, ...globallyUsedQuestions],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                }
            );
        });
        
        console.log(`📚 Available unused questions: Practical: ${availablePractical}, Theoretical: ${availableTheoretical}`);
        
        // Check if we have enough questions for the 70/30 split
        if (availablePractical < practicalCount) {
            throw new Error(`Insufficient practical questions for Grade ${grade}. Need ${practicalCount}, but only ${availablePractical} available.`);
        }
        if (availableTheoretical < theoreticalCount) {
            throw new Error(`Insufficient theoretical questions for Grade ${grade}. Need ${theoreticalCount}, but only ${availableTheoretical} available.`);
        }
    }
    
    // For grades 9+: declare difficulty-based availability variables
    let availableBasic = 0;
    let availableMedium = 0; 
    let availableAdvanced = 0;
    
    if (!isFoundationalGrade) {
        // For grades 9+ use original difficulty-based checking
        availableBasic = await new Promise((resolve, reject) => {
            const excludeClause = globallyUsedQuestions.length > 0 ? 
                `AND id NOT IN (${globallyUsedQuestions.map(() => '?').join(',')})` : '';
            db.get(
                `SELECT COUNT(*) as count FROM questions 
                 WHERE grade = ? AND difficulty = 'basic' AND topic = 'computer' ${excludeClause}`,
                [grade, ...globallyUsedQuestions],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                }
            );
        });
        
        const availableMedium = await new Promise((resolve, reject) => {
            const excludeClause = globallyUsedQuestions.length > 0 ? 
                `AND id NOT IN (${globallyUsedQuestions.map(() => '?').join(',')})` : '';
            db.get(
                `SELECT COUNT(*) as count FROM questions 
                 WHERE grade = ? AND difficulty = 'medium' AND topic = 'computer' ${excludeClause}`,
                [grade, ...globallyUsedQuestions],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                }
            );
        });
        
        const availableAdvanced = await new Promise((resolve, reject) => {
            const excludeClause = globallyUsedQuestions.length > 0 ? 
                `AND id NOT IN (${globallyUsedQuestions.map(() => '?').join(',')})` : '';
            db.get(
                `SELECT COUNT(*) as count FROM questions 
                 WHERE grade = ? AND difficulty = 'advanced' AND topic = 'computer' ${excludeClause}`,
                [grade, ...globallyUsedQuestions],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                }
            );
        });
        
        console.log(`💻 Available unused COMPUTER questions: Basic: ${availableBasic}, Medium: ${availableMedium}, Advanced: ${availableAdvanced}`);
        
        const totalAvailable = availableBasic + availableMedium + availableAdvanced;
        if (totalAvailable < totalQuestions) {
            throw new Error(`Insufficient unused computer questions for Grade ${grade}. Need ${totalQuestions}, but only ${totalAvailable} unused computer questions available.`);
        }
    }
    
    // Select questions based on grade type
    if (isFoundationalGrade) {
        // For grades 6-8: Select by practical/theoretical focus (70/30 split)
        
        // Select practical questions across all difficulties
        const practicalQuestions = await new Promise((resolve, reject) => {
            const excludeClause = globallyUsedQuestions.length > 0 ? 
                `AND id NOT IN (${globallyUsedQuestions.map(() => '?').join(',')})` : '';
            
            db.all(
                `SELECT id FROM questions 
                 WHERE grade = ? AND topic = 'computer' AND focus_type = 'practical' ${excludeClause}
                 ORDER BY RANDOM() LIMIT ?`,
                [grade, ...globallyUsedQuestions, practicalCount],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });
        
        selectedQuestions.push(...practicalQuestions.map(q => q.id));
        console.log(`🎯 Selected ${practicalQuestions.length} practical questions (70%)`);
        
        // Select theoretical questions across all difficulties
        const theoreticalQuestions = await new Promise((resolve, reject) => {
            const allExcludes = [...globallyUsedQuestions, ...selectedQuestions];
            const excludeClause = allExcludes.length > 0 ? 
                `AND id NOT IN (${allExcludes.map(() => '?').join(',')})` : '';
            
            db.all(
                `SELECT id FROM questions 
                 WHERE grade = ? AND topic = 'computer' AND focus_type = 'theoretical' ${excludeClause}
                 ORDER BY RANDOM() LIMIT ?`,
                [grade, ...allExcludes, theoreticalCount],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });
        
        selectedQuestions.push(...theoreticalQuestions.map(q => q.id));
        console.log(`📚 Selected ${theoreticalQuestions.length} theoretical questions (30%)`);
        
    } else {
        // For grades 9+: Use original difficulty-based selection
        // (availableBasic, availableMedium, availableAdvanced are already declared above)
        
        // Select basic computer questions (only unused ones)
        let basicQuestions = await selectUnusedQuestions('basic', Math.min(basicCount, availableBasic));
        selectedQuestions.push(...basicQuestions.map(q => q.id));
        console.log(`✅ Selected ${basicQuestions.length} basic computer questions`);
        
        // Select medium computer questions (only unused ones)
        let mediumQuestions = await selectUnusedQuestions('medium', Math.min(mediumCount, availableMedium), null, selectedQuestions);
        selectedQuestions.push(...mediumQuestions.map(q => q.id));
        console.log(`✅ Selected ${mediumQuestions.length} medium computer questions`);
        
        // Select advanced computer questions (only unused ones)
        let advancedQuestions = await selectUnusedQuestions('advanced', Math.min(advancedCount, availableAdvanced), null, selectedQuestions);
        selectedQuestions.push(...advancedQuestions.map(q => q.id));
        console.log(`✅ Selected ${advancedQuestions.length} advanced computer questions`);
    }
    
    // If we still need more questions due to distribution constraints, fill from any available difficulty
    const currentTotal = selectedQuestions.length;
    if (currentTotal < totalQuestions) {
        const remaining = totalQuestions - currentTotal;
        console.log(`📝 Need ${remaining} more questions, selecting from any available difficulty...`);
        
        const additionalQuestions = await new Promise((resolve, reject) => {
            const allExcludes = [...globallyUsedQuestions, ...selectedQuestions];
            const excludeClause = allExcludes.length > 0 ? 
                `AND id NOT IN (${allExcludes.map(() => '?').join(',')})` : '';
            
            db.all(
                `SELECT id FROM questions 
                 WHERE grade = ? AND topic = 'computer' ${excludeClause}
                 ORDER BY RANDOM() LIMIT ?`,
                [grade, ...allExcludes, remaining],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });
        
        selectedQuestions.push(...additionalQuestions.map(q => q.id));
        console.log(`✅ Selected ${additionalQuestions.length} additional computer questions from any difficulty`);
    }
    
    // Shuffle the final selection to randomize question order
    const shuffledQuestions = selectedQuestions.sort(() => Math.random() - 0.5);
    
    console.log(`💻 Final selection: ${shuffledQuestions.length} COMPUTER questions for Grade ${grade}`);
    return shuffledQuestions;
};

// Start quiz
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
                    message: 'Grade must be between 6 and 12'
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
            // In development mode, if there's an in-progress quiz, delete it to allow a fresh start
            if (existingQuiz.status === 'in_progress') {
                console.log(`🔄 Development mode: Cleaning up in-progress quiz ${existingQuiz.id} for student ${studentId}`);
                
                // Delete responses for the in-progress quiz
                await new Promise((resolve, reject) => {
                    db.run('DELETE FROM responses WHERE quiz_id = ?', [existingQuiz.id], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
                
                // Delete the in-progress quiz
                await new Promise((resolve, reject) => {
                    db.run('DELETE FROM quizzes WHERE id = ?', [existingQuiz.id], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            }
        }
        
        // Check if enough COMPUTER questions are available for the grade
        const computerQuestionCount = await new Promise((resolve, reject) => {
            db.get(
                'SELECT COUNT(*) as count FROM questions WHERE grade = ? AND topic = \'computer\'',
                [grade],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                }
            );
        });
        
        if (computerQuestionCount < 25) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'INSUFFICIENT_COMPUTER_QUESTIONS',
                    message: `Not enough computer questions available for Grade ${grade}. Need at least 25 computer questions, but only ${computerQuestionCount} available.`
                }
            });
        }
        
        // Select 25 questions using the enhanced algorithm for TECH BOARD 2025
        const selectedQuestionIds = await selectQuizQuestions(grade, 25, studentId);
        
        // Create quiz record
        const quizId = await new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO quizzes (student_id, grade, total_questions, status) VALUES (?, ?, ?, ?)',
                [studentId, grade, 25, 'in_progress'],
                function(err) {
                    if (err) reject(err);
                    else resolve(this.lastID);
                }
            );
        });
        
        // Mark selected questions as used globally to prevent future repetition
        console.log(`🔒 Marking ${selectedQuestionIds.length} questions as used globally...`);
        for (const questionId of selectedQuestionIds) {
            try {
                await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT OR IGNORE INTO used_questions (question_id, grade, quiz_id, student_id) VALUES (?, ?, ?, ?)',
                        [questionId, grade, quizId, studentId],
                        function(err) {
                            if (err) reject(err);
                            else resolve();
                        }
                    );
                });
            } catch (error) {
                console.log(`⚠️  Warning: Could not mark question ${questionId} as used:`, error.message);
            }
        }
        console.log(`✅ Successfully marked questions as used globally`);
        
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

        // Get options for each question separately
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
        
        // Format questions for frontend with randomized options (hide correct answers)
        const formattedQuestions = questions.map((q, index) => {
            // Randomize option order while keeping track of original order for consistency
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
        
        // Ensure questions are in the same random order as selected
        const orderedQuestions = selectedQuestionIds.map(id => 
            formattedQuestions.find(q => q.id === id)
        ).filter(Boolean);
        
        res.json({
            success: true,
            data: {
                quizId,
                grade,
                totalQuestions: 25,
                questions: orderedQuestions.map((q, index) => ({
                    ...q,
                    questionNumber: index + 1
                })),
                timeLimit: 30, // 30 minutes
                questionDistribution: {
                    basic: Math.floor(25 * 0.6),
                    medium: Math.floor(25 * 0.3), 
                    advanced: 25 - Math.floor(25 * 0.6) - Math.floor(25 * 0.3)
                }
            }
        });
        
    } catch (error) {
        console.error('Error starting quiz:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({
            success: false,
            error: {
                code: 'QUIZ_START_FAILED',
                message: 'Failed to start quiz',
                details: process.env.NODE_ENV !== 'production' ? error.message : undefined
            }
        });
    }
});

// Submit quiz
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
                'SELECT id, student_id, status FROM quizzes WHERE id = ? AND student_id = ?',
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
                        function(err) {
                            if (err) reject(err);
                            else resolve();
                        }
                    );
                });
            }
            
            // Update quiz with final score and pass/fail status
            const passed = correctAnswers >= 18; // TECH BOARD 2025 pass criteria
            await new Promise((resolve, reject) => {
                db.run(
                    'UPDATE quizzes SET score = ?, passed = ?, end_time = CURRENT_TIMESTAMP, status = "completed" WHERE id = ?',
                    [correctAnswers, passed, quizId],
                    function(err) {
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
            
            const percentage = Math.round((correctAnswers / 25) * 100);
            
            res.json({
                success: true,
                data: {
                    quizId,
                    score: correctAnswers,
                    totalQuestions: 25,
                    percentage,
                    passed,
                    message: 'TECH BOARD 2025 selection test submitted successfully'
                }
            });
            
        } catch (error) {
            // Rollback transaction
            await new Promise((resolve) => {
                db.run('ROLLBACK', () => resolve());
            });
            throw error;
        }
        
    } catch (error) {
        console.error('Error submitting quiz:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'QUIZ_SUBMIT_FAILED',
                message: 'Failed to submit quiz'
            }
        });
    }
});

// Student results access removed - results are only available to administrators

// Get student's quiz history
router.get('/history', authenticateToken, requireStudent, validateStudent, async (req, res) => {
    try {
        const studentId = req.user.id;
        const { page = 1, limit = 10 } = req.query;
        const db = database.getDb();
        
        const offset = (page - 1) * limit;
        
        const quizzes = await new Promise((resolve, reject) => {
            db.all(
                'SELECT id, grade, score, total_questions, start_time, end_time, status FROM quizzes WHERE student_id = ? ORDER BY start_time DESC LIMIT ? OFFSET ?',
                [studentId, limit, offset],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });
        
        const totalCount = await new Promise((resolve, reject) => {
            db.get(
                'SELECT COUNT(*) as total FROM quizzes WHERE student_id = ?',
                [studentId],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row.total);
                }
            );
        });
        
        const formattedQuizzes = quizzes.map(quiz => ({
            ...quiz,
            percentage: quiz.status === 'completed' ? Math.round((quiz.score / quiz.total_questions) * 100) : null,
            timeTaken: quiz.end_time && quiz.start_time ? 
                Math.round((new Date(quiz.end_time) - new Date(quiz.start_time)) / 1000 / 60) : null
        }));
        
        res.json({
            success: true,
            data: {
                quizzes: formattedQuizzes,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total: totalCount,
                    pages: Math.ceil(totalCount / limit)
                }
            }
        });
        
    } catch (error) {
        console.error('Error fetching quiz history:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'FETCH_HISTORY_FAILED',
                message: 'Failed to fetch quiz history'
            }
        });
    }
});

module.exports = router;