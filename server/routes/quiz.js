const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticateToken, requireStudent, validateStudent } = require('../middleware/auth');
const database = require('../config/database');
const { selectUniqueQuizQuestions } = require('../services/quizService');

const router = express.Router();

// Question selection moved to services/quizService.js

// Start quiz with production-ready question selection
router.get('/start/:grade', authenticateToken, requireStudent, validateStudent, async (req, res) => {
    try {
        const grade = parseInt(req.params.grade);
        const studentId = req.user.id;
        const db = database.getDb();

        console.log(`🚀 Starting quiz for Grade ${grade}, Student ID: ${studentId}`);

        // Validate grade
        if (![6, 7, 8, 9, 11].includes(grade)) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'INVALID_GRADE',
                    message: 'Grade must be 6, 7, 8, 9, or 11'
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

        console.log(`🎯 Quiz start response - quizId: ${quizId} (type: ${typeof quizId})`);

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
                timeLimit: Math.ceil(actualQuestionCount * 60), // 1 minute per question in seconds
                passingScore,
                questionDistribution: {
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
    body('quizId').isInt({ min: 1 }).withMessage('Quiz ID must be a positive integer'),
    body('responses').isArray({ min: 1 }).withMessage('Responses must be a non-empty array'),
    body('responses.*.questionId').isInt({ min: 1 }).withMessage('Question ID must be a positive integer'),
    body('responses.*.selectedOptionId').optional().isInt({ min: 1 }).withMessage('Selected option ID must be a positive integer')
], async (req, res) => {
    try {
        // Debug logging for submission data
        console.log('🔍 Quiz submission received:');
        console.log('  Raw body:', JSON.stringify(req.body, null, 2));
        console.log('  quizId:', req.body.quizId, '(type:', typeof req.body.quizId, ')');
        console.log('  responses type:', Array.isArray(req.body.responses) ? 'array' : typeof req.body.responses);
        console.log('  responses length:', req.body.responses?.length);
        if (req.body.responses && req.body.responses.length > 0) {
            console.log('  First response:', req.body.responses[0]);
            console.log('  First response questionId:', req.body.responses[0]?.questionId, '(type:', typeof req.body.responses[0]?.questionId, ')');
            console.log('  First response selectedOptionId:', req.body.responses[0]?.selectedOptionId, '(type:', typeof req.body.responses[0]?.selectedOptionId, ')');
        }
        console.log('  User ID:', req.user.id, '(type:', typeof req.user.id, ')');

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('❌ Validation errors:', errors.array());
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

        console.log('✅ Quiz validation passed, starting transaction...');
        
        // Start transaction
        await new Promise((resolve, reject) => {
            db.run('BEGIN TRANSACTION', (err) => {
                if (err) {
                    console.error('❌ Transaction start failed:', err);
                    reject(err);
                } else {
                    console.log('✅ Transaction started successfully');
                    resolve();
                }
            });
        });

        try {
            let correctAnswers = 0;
            const totalQuestions = quiz.total_questions;

            console.log(`🔄 Processing ${responses.length} responses...`);
            
            // Process each response
            for (let i = 0; i < responses.length; i++) {
                const response = responses[i];
                const { questionId, selectedOptionId } = response;
                
                console.log(`  Processing response ${i + 1}/${responses.length}: questionId=${questionId}, selectedOptionId=${selectedOptionId}`);

                // Get correct answer for the question
                const correctOption = await new Promise((resolve, reject) => {
                    db.get(
                        'SELECT id FROM options WHERE question_id = ? AND is_correct = 1',
                        [questionId],
                        (err, row) => {
                            if (err) {
                                console.error(`❌ Error getting correct option for question ${questionId}:`, err);
                                reject(err);
                            } else {
                                console.log(`  Correct option for question ${questionId}:`, row?.id);
                                resolve(row);
                            }
                        }
                    );
                });

                const isCorrect = selectedOptionId && correctOption && selectedOptionId === correctOption.id;
                if (isCorrect) correctAnswers++;
                
                console.log(`  Question ${questionId}: selected=${selectedOptionId}, correct=${correctOption?.id}, isCorrect=${isCorrect}`);

                // Insert response
                await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT INTO responses (quiz_id, question_id, selected_option_id, is_correct) VALUES (?, ?, ?, ?)',
                        [quizId, questionId, selectedOptionId || null, isCorrect ? 1 : 0],
                        function (err) {
                            if (err) {
                                console.error(`❌ Error inserting response for question ${questionId}:`, err);
                                reject(err);
                            } else {
                                console.log(`  ✅ Response inserted for question ${questionId}`);
                                resolve();
                            }
                        }
                    );
                });
            }
            
            console.log(`✅ All responses processed. Correct answers: ${correctAnswers}/${totalQuestions}`);

            // Calculate pass criteria based on actual question count (72%)
            const passingScore = Math.ceil(totalQuestions * 0.72);
            const passed = correctAnswers >= passingScore;
            
            // Update quiz with final score
            console.log(`🏁 Updating quiz ${quizId} with final score: ${correctAnswers}/${totalQuestions}, passed: ${passed}`);
            await new Promise((resolve, reject) => {
                db.run(
                    'UPDATE quizzes SET score = ?, passed = ?, end_time = CURRENT_TIMESTAMP, status = "completed" WHERE id = ?',
                    [correctAnswers, passed ? 1 : 0, quizId],
                    function (err) {
                        if (err) {
                            console.error('❌ Error updating quiz:', err);
                            reject(err);
                        } else {
                            console.log('✅ Quiz updated successfully');
                            resolve();
                        }
                    }
                );
            });

            // Commit transaction
            console.log('💾 Committing transaction...');
            await new Promise((resolve, reject) => {
                db.run('COMMIT', (err) => {
                    if (err) {
                        console.error('❌ Transaction commit failed:', err);
                        reject(err);
                    } else {
                        console.log('✅ Transaction committed successfully');
                        resolve();
                    }
                });
            });

            const percentage = Math.round((correctAnswers / totalQuestions) * 100);
            
            console.log('🎉 Quiz submission completed successfully!');
            console.log(`  Final results: ${correctAnswers}/${totalQuestions} (${percentage}%), passed: ${passed}`);

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
            console.error('❌ Error during quiz processing:', error);
            // Rollback transaction
            console.log('🔄 Rolling back transaction...');
            await new Promise((resolve, reject) => {
                db.run('ROLLBACK', (err) => {
                    if (err) console.error('❌ Rollback error:', err);
                    else console.log('✅ Transaction rolled back');
                    resolve();
                });
            });
            throw error;
        }

    } catch (error) {
        console.error('❌ Quiz submission error details:');
        console.error('  Error type:', error.constructor.name);
        console.error('  Error message:', error.message);
        console.error('  Error stack:', error.stack);
        console.error('  Request body:', JSON.stringify(req.body, null, 2));
        console.error('  User:', req.user?.id, req.user?.email);
        
        res.status(500).json({
            success: false,
            error: {
                code: 'QUIZ_SUBMIT_FAILED',
                message: 'Failed to submit quiz',
                details: process.env.NODE_ENV !== 'production' ? {
                    message: error.message,
                    type: error.constructor.name,
                    stack: error.stack?.split('\n').slice(0, 5).join('\n')
                } : undefined
            }
        });
    }
});

module.exports = router;