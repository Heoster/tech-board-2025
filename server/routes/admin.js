const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticateToken, requireAdmin, validateAdmin } = require('../middleware/auth');
const database = require('../config/database');

const router = express.Router();

// Validation middleware for questions
const validateQuestion = [
    body('grade').isIn([6, 7, 8, 9, 11]).withMessage('Grade must be 6, 7, 8, 9, or 11'),
    body('difficulty').isIn(['basic', 'medium', 'advanced']).withMessage('Difficulty must be basic, medium, or advanced'),
    body('questionText').trim().isLength({ min: 10, max: 1000 }).withMessage('Question text must be between 10 and 1000 characters'),
    body('options').isArray({ min: 4, max: 4 }).withMessage('Must have exactly 4 options'),
    body('options.*.text').trim().isLength({ min: 1, max: 200 }).withMessage('Option text must be between 1 and 200 characters'),
    body('options.*.isCorrect').isBoolean().withMessage('isCorrect must be a boolean'),
    body('options').custom((options) => {
        const correctCount = options.filter(opt => opt.isCorrect === true).length;
        if (correctCount !== 1) {
            throw new Error('Exactly one option must be marked as correct');
        }
        return true;
    })
];

// Get all questions with filtering
router.get('/questions', authenticateToken, requireAdmin, validateAdmin, async (req, res) => {
    try {
        const { grade, difficulty, page = 1, limit = 20 } = req.query;
        const db = database.getDb();
        
        let whereClause = '';
        let params = [];
        
        if (grade) {
            whereClause += ' WHERE q.grade = ?';
            params.push(grade);
        }
        
        if (difficulty) {
            whereClause += grade ? ' AND q.difficulty = ?' : ' WHERE q.difficulty = ?';
            params.push(difficulty);
        }
        
        const offset = (page - 1) * limit;
        params.push(limit, offset);
        
        const questionsQuery = `
            SELECT q.id, q.grade, q.difficulty, q.question_text, q.created_at, q.updated_at,
                   GROUP_CONCAT(
                       json_object(
                           'id', o.id,
                           'text', o.option_text,
                           'isCorrect', o.is_correct,
                           'order', o.option_order
                       )
                   ) as options
            FROM questions q
            LEFT JOIN options o ON q.id = o.question_id
            ${whereClause}
            GROUP BY q.id
            ORDER BY q.created_at DESC
            LIMIT ? OFFSET ?
        `;
        
        const questions = await new Promise((resolve, reject) => {
            db.all(questionsQuery, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        // Parse options JSON
        const formattedQuestions = questions.map(q => ({
            ...q,
            options: q.options ? q.options.split(',').map(opt => JSON.parse(opt)).sort((a, b) => a.order - b.order) : []
        }));
        
        // Get total count for pagination
        const countQuery = `SELECT COUNT(*) as total FROM questions q${whereClause}`;
        const countParams = params.slice(0, -2); // Remove limit and offset
        
        const totalCount = await new Promise((resolve, reject) => {
            db.get(countQuery, countParams, (err, row) => {
                if (err) reject(err);
                else resolve(row.total);
            });
        });
        
        res.json({
            success: true,
            data: {
                questions: formattedQuestions,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total: totalCount,
                    pages: Math.ceil(totalCount / limit)
                }
            }
        });
        
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'FETCH_QUESTIONS_FAILED',
                message: 'Failed to fetch questions'
            }
        });
    }
});

// Create question
router.post('/questions', authenticateToken, requireAdmin, validateAdmin, validateQuestion, async (req, res) => {
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
        
        const { grade, difficulty, questionText, options } = req.body;
        const db = database.getDb();
        
        // Start transaction
        await new Promise((resolve, reject) => {
            db.run('BEGIN TRANSACTION', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        try {
            // Insert question
            const questionId = await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                    [grade, difficulty, questionText],
                    function(err) {
                        if (err) reject(err);
                        else resolve(this.lastID);
                    }
                );
            });
            
            // Insert options
            for (let i = 0; i < options.length; i++) {
                const option = options[i];
                await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                        [questionId, option.text, option.isCorrect, i + 1],
                        function(err) {
                            if (err) reject(err);
                            else resolve();
                        }
                    );
                });
            }
            
            // Commit transaction
            await new Promise((resolve, reject) => {
                db.run('COMMIT', (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            
            res.status(201).json({
                success: true,
                data: {
                    questionId,
                    message: 'Question created successfully'
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
        console.error('Error creating question:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'CREATE_QUESTION_FAILED',
                message: 'Failed to create question'
            }
        });
    }
});

// Update question
router.put('/questions/:id', authenticateToken, requireAdmin, validateAdmin, validateQuestion, async (req, res) => {
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
        
        const questionId = req.params.id;
        const { grade, difficulty, questionText, options } = req.body;
        const db = database.getDb();
        
        // Check if question exists
        const existingQuestion = await new Promise((resolve, reject) => {
            db.get('SELECT id FROM questions WHERE id = ?', [questionId], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
        
        if (!existingQuestion) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 'QUESTION_NOT_FOUND',
                    message: 'Question not found'
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
            // Update question
            await new Promise((resolve, reject) => {
                db.run(
                    'UPDATE questions SET grade = ?, difficulty = ?, question_text = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                    [grade, difficulty, questionText, questionId],
                    function(err) {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });
            
            // Delete existing options
            await new Promise((resolve, reject) => {
                db.run('DELETE FROM options WHERE question_id = ?', [questionId], (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            
            // Insert new options
            for (let i = 0; i < options.length; i++) {
                const option = options[i];
                await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                        [questionId, option.text, option.isCorrect, i + 1],
                        function(err) {
                            if (err) reject(err);
                            else resolve();
                        }
                    );
                });
            }
            
            // Commit transaction
            await new Promise((resolve, reject) => {
                db.run('COMMIT', (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            
            res.json({
                success: true,
                data: {
                    message: 'Question updated successfully'
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
        console.error('Error updating question:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'UPDATE_QUESTION_FAILED',
                message: 'Failed to update question'
            }
        });
    }
});

// Delete question
router.delete('/questions/:id', authenticateToken, requireAdmin, validateAdmin, async (req, res) => {
    try {
        const questionId = req.params.id;
        const db = database.getDb();
        
        // Check if question exists
        const existingQuestion = await new Promise((resolve, reject) => {
            db.get('SELECT id FROM questions WHERE id = ?', [questionId], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
        
        if (!existingQuestion) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 'QUESTION_NOT_FOUND',
                    message: 'Question not found'
                }
            });
        }
        
        // Delete question (options will be deleted automatically due to CASCADE)
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM questions WHERE id = ?', [questionId], function(err) {
                if (err) reject(err);
                else resolve();
            });
        });
        
        res.json({
            success: true,
            data: {
                message: 'Question deleted successfully'
            }
        });
        
    } catch (error) {
        console.error('Error deleting question:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'DELETE_QUESTION_FAILED',
                message: 'Failed to delete question'
            }
        });
    }
});

// Get results
router.get('/results', authenticateToken, requireAdmin, validateAdmin, async (req, res) => {
    try {
        const db = database.getDb();
        
        // Get all completed quiz results with student information
        const results = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    q.id,
                    s.name as student_name,
                    s.roll_number,
                    s.grade,
                    s.section,
                    q.score,
                    q.total_questions,
                    q.passed,
                    q.start_time,
                    q.end_time,
                    q.status,
                    ROUND((CAST(q.score AS FLOAT) / q.total_questions) * 100, 1) as percentage
                FROM quizzes q
                JOIN students s ON q.student_id = s.id
                WHERE q.status = 'completed'
                ORDER BY q.end_time DESC
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        res.json({
            success: true,
            data: results
        });
        
    } catch (error) {
        console.error('Error fetching admin results:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'RESULTS_FETCH_FAILED',
                message: 'Failed to fetch results'
            }
        });
    }
});

// Get detailed student results
router.get('/student-details/:quizId', authenticateToken, requireAdmin, validateAdmin, async (req, res) => {
    try {
        const quizId = parseInt(req.params.quizId);
        const db = database.getDb();
        
        // Get detailed responses for the quiz
        const responses = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    r.question_id,
                    q.question_text,
                    q.difficulty,
                    r.selected_option_id,
                    r.is_correct,
                    so.option_text as selected_option_text,
                    co.id as correct_option_id,
                    co.option_text as correct_option_text,
                    GROUP_CONCAT(
                        json_object(
                            'id', o.id,
                            'text', o.option_text,
                            'is_correct', o.is_correct
                        )
                    ) as options
                FROM responses r
                JOIN questions q ON r.question_id = q.id
                LEFT JOIN options so ON r.selected_option_id = so.id
                LEFT JOIN options co ON q.id = co.question_id AND co.is_correct = 1
                LEFT JOIN options o ON q.id = o.question_id
                WHERE r.quiz_id = ?
                GROUP BY r.question_id, q.question_text, q.difficulty, r.selected_option_id, r.is_correct, so.option_text, co.id, co.option_text
                ORDER BY r.question_id
            `, [quizId], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        // Format the responses
        const formattedResponses = responses.map(row => ({
            question_id: row.question_id,
            question_text: row.question_text,
            difficulty: row.difficulty,
            selected_option_id: row.selected_option_id,
            selected_option_text: row.selected_option_text,
            correct_option_id: row.correct_option_id,
            correct_option_text: row.correct_option_text,
            is_correct: row.is_correct,
            options: JSON.parse(`[${row.options}]`)
        }));
        
        res.json({
            success: true,
            data: formattedResponses
        });
        
    } catch (error) {
        console.error('Error fetching student details:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'STUDENT_DETAILS_FETCH_FAILED',
                message: 'Failed to fetch student details'
            }
        });
    }
});

// Get all students with their exam status
router.get('/students', authenticateToken, requireAdmin, validateAdmin, async (req, res) => {
    try {
        const db = database.getDb();
        
        // Get all students with their quiz status
        const students = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    s.id,
                    s.name,
                    s.roll_number,
                    s.grade,
                    s.section,
                    s.created_at as registration_date,
                    q.id as quiz_id,
                    q.score,
                    q.total_questions,
                    q.passed,
                    q.start_time,
                    q.end_time,
                    q.status as quiz_status,
                    CASE 
                        WHEN q.status = 'completed' THEN ROUND((CAST(q.score AS FLOAT) / q.total_questions) * 100, 1)
                        ELSE NULL
                    END as percentage,
                    CASE 
                        WHEN q.status IS NULL THEN 'not_started'
                        WHEN q.status = 'in_progress' THEN 'in_progress'
                        WHEN q.status = 'completed' THEN 'completed'
                        ELSE 'unknown'
                    END as exam_status
                FROM students s
                LEFT JOIN quizzes q ON s.id = q.student_id
                ORDER BY s.grade, s.section, s.roll_number
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        res.json({
            success: true,
            data: students
        });
        
    } catch (error) {
        console.error('Error fetching all students:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'STUDENTS_FETCH_FAILED',
                message: 'Failed to fetch students'
            }
        });
    }
});

// Get analytics
router.get('/analytics', authenticateToken, requireAdmin, validateAdmin, (req, res) => {
    // TODO: Implement analytics
    res.json({
        success: true,
        message: 'Admin analytics endpoint - to be implemented'
    });
});

module.exports = router;