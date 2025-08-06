const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticateToken, requireStudent, validateStudent } = require('../middleware/auth');
const database = require('../config/database');

const router = express.Router();

// FIXED: Simple question selection without category dependency
const selectQuizQuestions = async (grade, totalQuestions = 25, studentId = null) => {
    const db = database.getDb();

    console.log(`🎯 Selecting ${totalQuestions} unique questions for Grade ${grade} (Student ID: ${studentId})`);

    // Get questions that haven't been used by this student yet
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
        console.log(`🚫 Found ${usedQuestionIds.length} previously used questions for this student`);
    } catch (error) {
        console.log('⚠️  No previously used questions found:', error.message);
    }

    // Target distribution: 60% basic, 30% medium, 10% advanced
    const basicCount = Math.floor(totalQuestions * 0.6); // 15 questions
    const mediumCount = Math.floor(totalQuestions * 0.3); // 7 questions  
    const advancedCount = totalQuestions - basicCount - mediumCount; // 3 questions

    console.log(`📊 Target distribution: ${basicCount} basic, ${mediumCount} medium, ${advancedCount} advanced`);

    const selectedQuestions = [];
    const selectedQuestionIds = new Set();

    // Helper function to select questions by difficulty
    const selectByDifficulty = async (difficulty, targetCount) => {
        const excludeClause = usedQuestionIds.length > 0 ?
            `AND id NOT IN (${usedQuestionIds.map(() => '?').join(',')})` : '';

        const availableQuestions = await new Promise((resolve, reject) => {
            db.all(
                `SELECT id FROM questions 
                 WHERE grade = ? AND difficulty = ? ${excludeClause}
                 ORDER BY RANDOM()`,
                [grade, difficulty, ...usedQuestionIds],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });

        console.log(`📋 Available ${difficulty} questions: ${availableQuestions.length}`);

        const selected = [];
        for (const question of availableQuestions) {
            if (selected.length >= targetCount) break;
            
            if (!selectedQuestionIds.has(question.id)) {
                selected.push(question);
                selectedQuestionIds.add(question.id);
            }
        }

        console.log(`✅ Selected ${selected.length}/${targetCount} ${difficulty} questions`);
        return selected;
    };

    try {
        // Select questions by difficulty
        const basicQuestions = await selectByDifficulty('basic', basicCount);
        const mediumQuestions = await selectByDifficulty('medium', mediumCount);
        const advancedQuestions = await selectByDifficulty('advanced', advancedCount);

        selectedQuestions.push(...basicQuestions, ...mediumQuestions, ...advancedQuestions);

        // If we don't have enough questions, fill with any available questions
        const currentTotal = selectedQuestions.length;
        if (currentTotal < totalQuestions) {
            const remaining = totalQuestions - currentTotal;
            console.log(`📝 Need ${remaining} more questions, filling gaps...`);

            const excludeClause = [...usedQuestionIds, ...Array.from(selectedQuestionIds)].length > 0 ?
                `AND id NOT IN (${[...usedQuestionIds, ...Array.from(selectedQuestionIds)].map(() => '?').join(',')})` : '';

            const additionalQuestions = await new Promise((resolve, reject) => {
                db.all(
                    `SELECT id FROM questions 
                     WHERE grade = ? ${excludeClause}
                     ORDER BY RANDOM()
                     LIMIT ?`,
                    [grade, ...usedQuestionIds, ...Array.from(selectedQuestionIds), remaining],
                    (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    }
                );
            });

            selectedQuestions.push(...additionalQuestions);
            additionalQuestions.forEach(q => selectedQuestionIds.add(q.id));
        }

    } catch (error) {
        console.error('❌ Error in question selection:', error);
        throw error;
    }

    // Final validation
    const finalQuestionIds = selectedQuestions.map(q => q.id);
    const uniqueQuestionIds = [...new Set(finalQuestionIds)];

    if (uniqueQuestionIds.length !== finalQuestionIds.length) {
        const duplicates = finalQuestionIds.filter((id, index) => finalQuestionIds.indexOf(id) !== index);
        console.error(`❌ CRITICAL: Found duplicates in final selection!`);
        console.error(`❌ Duplicate IDs: ${duplicates.join(', ')}`);
        throw new Error(`Duplicate questions detected: ${duplicates.join(', ')}`);
    }

    if (uniqueQuestionIds.length !== totalQuestions) {
        console.error(`❌ Expected ${totalQuestions} questions, got ${uniqueQuestionIds.length}`);
        throw new Error(`Expected ${totalQuestions} questions, got ${uniqueQuestionIds.length}`);
    }

    // Shuffle the final selection
    const shuffledQuestions = uniqueQuestionIds.sort(() => Math.random() - 0.5);

    console.log(`✅ Final selection: ${shuffledQuestions.length} unique questions`);
    console.log(`📋 Question IDs: [${shuffledQuestions.join(', ')}]`);

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

        // Check if enough questions are available
        const questionCount = await new Promise((resolve, reject) => {
            db.get(
                'SELECT COUNT(*) as count FROM questions WHERE grade = ?',
                [grade],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                }
            );
        });

        if (questionCount < 25) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'INSUFFICIENT_QUESTIONS',
                    message: `Not enough questions available for Grade ${grade}. Need at least 25 questions, but only ${questionCount} available.`
                }
            });
        }

        // Select 25 unique questions
        const selectedQuestionIds = await selectQuizQuestions(grade, 25, studentId);

        // Create quiz record
        const quizId = await new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO quizzes (student_id, grade, total_questions, status) VALUES (?, ?, ?, ?)',
                [studentId, grade, 25, 'in_progress'],
                function (err) {
                    if (err) reject(err);
                    else resolve(this.lastID);
                }
            );
        });

        console.log(`✅ Quiz created with ${selectedQuestionIds.length} questions`);

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

// Submit quiz (keeping the existing submit logic)
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

            // Validate no duplicate questions in submission
            const submittedQuestionIds = responses.map(r => r.questionId);
            const uniqueSubmittedIds = new Set(submittedQuestionIds);

            if (uniqueSubmittedIds.size !== submittedQuestionIds.length) {
                const duplicates = submittedQuestionIds.filter((id, index) => submittedQuestionIds.indexOf(id) !== index);
                console.error(`❌ SUBMISSION ERROR: Duplicate questions in submission!`);
                console.error(`❌ Duplicate question IDs: ${duplicates.join(', ')}`);
                throw new Error(`Duplicate questions in submission. IDs: ${duplicates.join(', ')}`);
            }

            console.log(`✅ SUBMISSION VALIDATION: ${uniqueSubmittedIds.size} unique questions submitted`);

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
                            if (err) {
                                if (err.message && err.message.includes('UNIQUE constraint failed')) {
                                    console.error(`❌ DUPLICATE CONSTRAINT: Question ${questionId} already answered`);
                                    reject(new Error(`Question ${questionId} has already been answered in this quiz`));
                                } else {
                                    reject(err);
                                }
                            } else {
                                resolve();
                            }
                        }
                    );
                });
            }

            // Update quiz with final score
            const passed = correctAnswers >= 18; // TECH BOARD 2025 pass criteria
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