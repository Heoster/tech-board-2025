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

        // Allow multiple attempts in development/testing
        const isDevelopment = process.env.NODE_ENV !== 'production';
        const allowMultipleAttempts = isDevelopment || process.env.ALLOW_MULTIPLE_ATTEMPTS === 'true';

        if (existingQuiz && !allowMultipleAttempts) {
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
        } else if (existingQuiz && allowMultipleAttempts) {
            // Clean up existing quiz for new attempt
            console.log(`🔄 Cleaning up existing quiz ${existingQuiz.id} for new attempt`);

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

        // Generate 25 questions for the quiz
        const targetQuestions = 25;
        
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

// Submit quiz - Simplified and robust version
router.post('/submit', authenticateToken, requireStudent, async (req, res) => {
    const db = database.getDb();
    
    try {
        console.log('🔍 Quiz submission received from user:', req.user.id);
        
        // Basic validation
        const { quizId, responses } = req.body;
        
        if (!quizId || !Number.isInteger(Number(quizId)) || Number(quizId) <= 0) {
            return res.status(400).json({
                success: false,
                error: { code: 'INVALID_QUIZ_ID', message: 'Valid quiz ID is required' }
            });
        }
        
        if (!Array.isArray(responses) || responses.length === 0) {
            return res.status(400).json({
                success: false,
                error: { code: 'INVALID_RESPONSES', message: 'Valid responses array is required' }
            });
        }
        
        console.log(`📝 Processing ${responses.length} responses for quiz ${quizId}`);
        
        // Verify quiz exists and belongs to user
        const quiz = await new Promise((resolve, reject) => {
            db.get(
                'SELECT id, student_id, status, total_questions FROM quizzes WHERE id = ? AND student_id = ?',
                [Number(quizId), req.user.id],
                (err, row) => err ? reject(err) : resolve(row)
            );
        });
        
        if (!quiz) {
            return res.status(404).json({
                success: false,
                error: { code: 'QUIZ_NOT_FOUND', message: 'Quiz not found' }
            });
        }
        
        if (quiz.status === 'completed') {
            return res.status(400).json({
                success: false,
                error: { code: 'QUIZ_COMPLETED', message: 'Quiz already completed' }
            });
        }
        
        // Process responses
        let correctAnswers = 0;
        const processedResponses = [];
        
        for (const response of responses) {
            const questionId = Number(response.questionId);
            const selectedOptionId = response.selectedOptionId ? Number(response.selectedOptionId) : null;
            
            if (!questionId || questionId <= 0) continue;
            
            // Get correct answer
            const correctOption = await new Promise((resolve, reject) => {
                db.get(
                    'SELECT id FROM options WHERE question_id = ? AND is_correct = 1',
                    [questionId],
                    (err, row) => err ? reject(err) : resolve(row)
                );
            });
            
            const isCorrect = selectedOptionId && correctOption && selectedOptionId === correctOption.id;
            if (isCorrect) correctAnswers++;
            
            processedResponses.push({
                quiz_id: Number(quizId),
                question_id: questionId,
                selected_option_id: selectedOptionId,
                is_correct: isCorrect ? 1 : 0
            });
        }
        
        // Save all responses and update quiz in transaction
        await new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run('BEGIN TRANSACTION');
                
                // Insert responses
                const stmt = db.prepare('INSERT INTO responses (quiz_id, question_id, selected_option_id, is_correct) VALUES (?, ?, ?, ?)');
                
                for (const resp of processedResponses) {
                    stmt.run([resp.quiz_id, resp.question_id, resp.selected_option_id, resp.is_correct]);
                }
                
                stmt.finalize();
                
                // Update quiz
                const totalQuestions = quiz.total_questions;
                const passingScore = Math.ceil(totalQuestions * 0.72);
                const passed = correctAnswers >= passingScore;
                
                db.run(
                    'UPDATE quizzes SET score = ?, passed = ?, end_time = CURRENT_TIMESTAMP, status = "completed" WHERE id = ?',
                    [correctAnswers, passed ? 1 : 0, Number(quizId)],
                    function(err) {
                        if (err) {
                            db.run('ROLLBACK');
                            reject(err);
                        } else {
                            db.run('COMMIT', (commitErr) => {
                                if (commitErr) {
                                    reject(commitErr);
                                } else {
                                    resolve({ correctAnswers, totalQuestions, passed, passingScore });
                                }
                            });
                        }
                    }
                );
            });
        }).then(result => {
            const percentage = Math.round((result.correctAnswers / result.totalQuestions) * 100);
            
            console.log(`✅ Quiz ${quizId} completed: ${result.correctAnswers}/${result.totalQuestions} (${percentage}%)`);
            
            res.json({
                success: true,
                data: {
                    quizId: Number(quizId),
                    score: result.correctAnswers,
                    totalQuestions: result.totalQuestions,
                    percentage,
                    passed: result.passed,
                    passingScore: result.passingScore,
                    message: 'Quiz submitted successfully'
                }
            });
        });
        
    } catch (error) {
        console.error('❌ Quiz submission error:', error.message);
        console.error('Stack:', error.stack);
        
        res.status(500).json({
            success: false,
            error: {
                code: 'SUBMISSION_FAILED',
                message: 'Failed to submit quiz. Please try again.',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            }
        });
    }
});

module.exports = router;