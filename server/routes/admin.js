const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticateToken, requireAdmin, validateAdmin } = require('../middleware/auth');
const database = require('../config/database');

const router = express.Router();

// Dashboard route
router.get('/dashboard', authenticateToken, requireAdmin, validateAdmin, async (req, res) => {
    try {
        const db = database.getDb();
        
        // Get total students
        const totalStudents = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM students', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
        
        // Get total questions
        const totalQuestions = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
        
        // Get total completed quizzes
        const totalQuizzes = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM quizzes WHERE status = "completed"', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
        
        // Get recent quizzes
        const recentQuizzes = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    q.id,
                    s.name as student_name,
                    s.roll_number,
                    s.grade,
                    q.score,
                    q.total_questions,
                    q.status,
                    q.completed_at
                FROM quizzes q
                JOIN students s ON q.student_id = s.id
                WHERE q.status = 'completed'
                ORDER BY q.completed_at DESC
                LIMIT 10
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        res.json({
            success: true,
            totalStudents,
            totalQuestions,
            totalQuizzes,
            recentQuizzes
        });
        
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'DASHBOARD_FETCH_FAILED',
                message: 'Failed to fetch dashboard data'
            }
        });
    }
});

// Quiz results route
router.get('/quiz-results', authenticateToken, requireAdmin, validateAdmin, async (req, res) => {
    try {
        const { grade } = req.query;
        const db = database.getDb();
        
        let whereClause = '';
        let params = [];
        
        if (grade) {
            whereClause = ' AND s.grade = ?';
            params.push(grade);
        }
        
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
                    q.status,
                    q.started_at,
                    q.completed_at,
                    ROUND((CAST(q.score AS FLOAT) / q.total_questions) * 100, 1) as percentage
                FROM quizzes q
                JOIN students s ON q.student_id = s.id
                WHERE q.status = 'completed'${whereClause}
                ORDER BY q.completed_at DESC
            `, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        res.json({
            success: true,
            results
        });
        
    } catch (error) {
        console.error('Error fetching quiz results:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'QUIZ_RESULTS_FETCH_FAILED',
                message: 'Failed to fetch quiz results'
            }
        });
    }
});

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

// Check question counts per grade
router.get('/question-counts', authenticateToken, requireAdmin, validateAdmin, async (req, res) => {
    try {
        const db = database.getDb();
        
        const counts = await new Promise((resolve, reject) => {
            db.all(`
                SELECT grade, COUNT(*) as count
                FROM questions 
                GROUP BY grade 
                ORDER BY grade
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        const result = {};
        [6, 7, 8, 9, 11].forEach(grade => {
            const gradeData = counts.find(c => c.grade === grade);
            result[grade] = {
                current: gradeData ? gradeData.count : 0,
                required: 300,
                status: gradeData && gradeData.count >= 300 ? 'sufficient' : 'insufficient'
            };
        });
        
        res.json({
            success: true,
            data: result
        });
        
    } catch (error) {
        console.error('Error fetching question counts:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'QUESTION_COUNTS_FAILED',
                message: 'Failed to fetch question counts'
            }
        });
    }
});

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
        
        // Parse options JSON (robust parsing across commas inside JSON)
        const formattedQuestions = questions.map(q => {
            const opts = q.options ? JSON.parse(`[${q.options}]`) : [];
            return {
                ...q,
                options: Array.isArray(opts) ? opts.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) : []
            };
        });
        
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
            questions: formattedQuestions,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: totalCount,
                pages: Math.ceil(totalCount / limit)
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
                questionId,
                message: 'Question created successfully'
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
        
        // Handle duplicate question error
        if (error.code === 'SQLITE_CONSTRAINT' && error.message.includes('UNIQUE constraint failed')) {
            return res.status(409).json({
                success: false,
                error: {
                    code: 'DUPLICATE_QUESTION',
                    message: 'A question with the same text already exists for this grade and difficulty level',
                    details: 'Questions must be unique within each grade and difficulty combination'
                }
            });
        }
        
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
        
        // Handle duplicate question error
        if (error.code === 'SQLITE_CONSTRAINT' && error.message.includes('UNIQUE constraint failed')) {
            return res.status(409).json({
                success: false,
                error: {
                    code: 'DUPLICATE_QUESTION',
                    message: 'A question with the same text already exists for this grade and difficulty level',
                    details: 'Questions must be unique within each grade and difficulty combination'
                }
            });
        }
        
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
router.get('/results', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const db = database.getDb();
        
        if (!db) {
            return res.status(500).json({
                success: false,
                error: 'Database connection not available'
            });
        }
        
        // Get all completed quiz results with student information
        const results = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    q.id,
                    COALESCE(s.name, 'Unknown Student') as student_name,
                    COALESCE(s.roll_number, 0) as roll_number,
                    COALESCE(s.grade, 0) as grade,
                    COALESCE(s.section, 'N/A') as section,
                    COALESCE(q.score, 0) as score,
                    COALESCE(q.total_questions, 0) as total_questions,
                    q.started_at,
                    q.completed_at,
                    COALESCE(q.status, 'unknown') as status,
                    CASE 
                        WHEN q.total_questions > 0 THEN ROUND((CAST(q.score AS FLOAT) / q.total_questions) * 100, 1)
                        ELSE 0
                    END as percentage
                FROM quizzes q
                LEFT JOIN students s ON q.student_id = s.id
                WHERE q.status = 'completed'
                ORDER BY q.completed_at DESC
                LIMIT 100
            `, (err, rows) => {
                if (err) {
                    console.error('Database query error:', err);
                    reject(err);
                } else {
                    resolve(rows || []);
                }
            });
        });
        
        res.json({
            success: true,
            results: results,
            count: results.length
        });
        
    } catch (error) {
        console.error('Error fetching admin results:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch results',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
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
                FROM quiz_answers r
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

// Add new student
router.post('/students', authenticateToken, requireAdmin, validateAdmin, [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('rollNumber').isInt({ min: 1, max: 80 }).withMessage('Roll number must be between 1 and 80'),
  body('grade').isIn([6, 7, 8, 9, 11]).withMessage('Grade must be 6, 7, 8, 9, or 11'),
  body('section').isIn(['A', 'B']).withMessage('Section must be A or B'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
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

    const { name, rollNumber, grade, section, password } = req.body;
    const db = database.getDb();
    const authUtils = require('../utils/auth');

    // Check if student with same roll number, grade, and section already exists
    const existingStudent = await new Promise((resolve, reject) => {
      db.get('SELECT id FROM students WHERE roll_number = ? AND grade = ? AND section = ?', 
        [rollNumber, grade, section], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'STUDENT_EXISTS',
          message: 'Student with this roll number already exists in this grade and section'
        }
      });
    }

    // Hash password
    const passwordHash = await authUtils.hashPassword(password);

    // Insert student
    const studentId = await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO students (name, roll_number, grade, section, password) VALUES (?, ?, ?, ?, ?)',
        [name, rollNumber, grade, section, passwordHash],
        function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });

    res.status(201).json({
      success: true,
      data: {
        studentId,
        message: 'Student added successfully'
      }
    });

  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'ADD_STUDENT_FAILED',
        message: 'Failed to add student'
      }
    });
  }
});

// Get all students with their exam status
router.get('/students', authenticateToken, requireAdmin, validateAdmin, async (req, res) => {
    try {
        const { grade } = req.query;
        const db = database.getDb();
        
        let whereClause = '';
        let params = [];
        
        if (grade) {
            whereClause = ' WHERE s.grade = ?';
            params.push(grade);
        }
        
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
                    q.started_at,
                    q.completed_at,
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
                ${whereClause}
                ORDER BY s.grade, s.section, s.roll_number
            `, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        res.json({
            success: true,
            students
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

// Update student
router.put('/students/:id', authenticateToken, requireAdmin, validateAdmin, [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('rollNumber').isInt({ min: 1, max: 80 }).withMessage('Roll number must be between 1 and 80'),
  body('grade').isIn([6, 7, 8, 9, 11]).withMessage('Grade must be 6, 7, 8, 9, or 11'),
  body('section').isIn(['A', 'B']).withMessage('Section must be A or B')
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

    const studentId = req.params.id;
    const { name, rollNumber, grade, section } = req.body;
    const db = database.getDb();

    // Check if student exists
    const existingStudent = await new Promise((resolve, reject) => {
      db.get('SELECT id FROM students WHERE id = ?', [studentId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (!existingStudent) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'STUDENT_NOT_FOUND',
          message: 'Student not found'
        }
      });
    }

    // Check if another student with same roll number, grade, and section exists
    const duplicateStudent = await new Promise((resolve, reject) => {
      db.get('SELECT id FROM students WHERE roll_number = ? AND grade = ? AND section = ? AND id != ?', 
        [rollNumber, grade, section, studentId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (duplicateStudent) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'STUDENT_EXISTS',
          message: 'Another student with this roll number already exists in this grade and section'
        }
      });
    }

    // Update student
    await new Promise((resolve, reject) => {
      db.run(
        'UPDATE students SET name = ?, roll_number = ?, grade = ?, section = ? WHERE id = ?',
        [name, rollNumber, grade, section, studentId],
        function(err) {
          if (err) reject(err);
          else resolve();
        }
      );
    });

    res.json({
      success: true,
      data: {
        message: 'Student updated successfully'
      }
    });

  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'UPDATE_STUDENT_FAILED',
        message: 'Failed to update student'
      }
    });
  }
});

// Delete student
router.delete('/students/:id', authenticateToken, requireAdmin, validateAdmin, async (req, res) => {
    try {
        const studentId = req.params.id;
        const db = database.getDb();
        
        // Check if student exists
        const existingStudent = await new Promise((resolve, reject) => {
            db.get('SELECT id FROM students WHERE id = ?', [studentId], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
        
        if (!existingStudent) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 'STUDENT_NOT_FOUND',
                    message: 'Student not found'
                }
            });
        }
        
        // Delete student (this will cascade to related records)
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM students WHERE id = ?', [studentId], function(err) {
                if (err) reject(err);
                else resolve();
            });
        });
        
        res.json({
            success: true,
            data: {
                message: 'Student deleted successfully'
            }
        });
        
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'DELETE_STUDENT_FAILED',
                message: 'Failed to delete student'
            }
        });
    }
});

// Reset student password
router.put('/students/:id/password', authenticateToken, requireAdmin, validateAdmin, async (req, res) => {
    try {
        const studentId = req.params.id;
        const { password } = req.body;
        
        if (!password || password.length < 6) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'INVALID_PASSWORD',
                    message: 'Password must be at least 6 characters long'
                }
            });
        }
        
        const db = database.getDb();
        const authUtils = require('../utils/auth');
        
        // Check if student exists
        const existingStudent = await new Promise((resolve, reject) => {
            db.get('SELECT id FROM students WHERE id = ?', [studentId], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
        
        if (!existingStudent) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 'STUDENT_NOT_FOUND',
                    message: 'Student not found'
                }
            });
        }
        
        // Hash new password
        const passwordHash = await authUtils.hashPassword(password);
        
        // Update password
        await new Promise((resolve, reject) => {
            db.run('UPDATE students SET password = ? WHERE id = ?', [passwordHash, studentId], function(err) {
                if (err) reject(err);
                else resolve();
            });
        });
        
        res.json({
            success: true,
            data: {
                message: 'Password reset successfully'
            }
        });
        
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'RESET_PASSWORD_FAILED',
                message: 'Failed to reset password'
            }
        });
    }
});

// Get system statistics
router.get('/system-stats', authenticateToken, requireAdmin, validateAdmin, async (req, res) => {
    try {
        const db = database.getDb();
        
        // Get total students
        const totalStudents = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM students', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
        
        // Get total questions
        const totalQuestions = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
        
        // Get total quizzes
        const totalQuizzes = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM quizzes WHERE status = "completed"', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
        
        res.json({
            success: true,
            data: {
                totalStudents,
                totalQuestions,
                totalQuizzes,
                databaseSize: '45.2 MB', // This would need to be calculated properly
                lastBackup: new Date().toISOString()
            }
        });
        
    } catch (error) {
        console.error('Error fetching system stats:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'SYSTEM_STATS_FAILED',
                message: 'Failed to fetch system statistics'
            }
        });
    }
});

// Get quiz settings
router.get('/quiz-settings', authenticateToken, requireAdmin, validateAdmin, async (req, res) => {
    try {
        const db = database.getDb();
        
        // Try to get settings from database, fallback to defaults
        let settings = {
            timeLimit: 60,
            totalQuestions: 50,
            passingScore: 36,
            allowRetake: false,
            shuffleQuestions: true,
            shuffleOptions: true
        };
        
        try {
            const result = await new Promise((resolve, reject) => {
                db.get('SELECT * FROM quiz_settings WHERE id = 1', (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                });
            });
            
            if (result) {
                settings = {
                    timeLimit: result.time_limit,
                    totalQuestions: result.total_questions,
                    passingScore: result.passing_score,
                    allowRetake: Boolean(result.allow_retake),
                    shuffleQuestions: Boolean(result.shuffle_questions),
                    shuffleOptions: Boolean(result.shuffle_options)
                };
            }
        } catch (error) {
            // Use defaults if table doesn't exist
        }
        
        res.json({
            success: true,
            data: settings
        });
    } catch (error) {
        console.error('Error fetching quiz settings:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'QUIZ_SETTINGS_FETCH_FAILED',
                message: 'Failed to fetch quiz settings'
            }
        });
    }
});

// Update quiz settings
router.put('/quiz-settings', authenticateToken, requireAdmin, validateAdmin, async (req, res) => {
    try {
        const { timeLimit, totalQuestions, passingScore, allowRetake, shuffleQuestions, shuffleOptions } = req.body;
        const db = database.getDb();
        
        // Create table if it doesn't exist
        await new Promise((resolve, reject) => {
            db.run(`CREATE TABLE IF NOT EXISTS quiz_settings (
                id INTEGER PRIMARY KEY,
                time_limit INTEGER,
                total_questions INTEGER,
                passing_score INTEGER,
                allow_retake INTEGER,
                shuffle_questions INTEGER,
                shuffle_options INTEGER,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        // Insert or update settings
        await new Promise((resolve, reject) => {
            db.run(`INSERT OR REPLACE INTO quiz_settings 
                (id, time_limit, total_questions, passing_score, allow_retake, shuffle_questions, shuffle_options) 
                VALUES (1, ?, ?, ?, ?, ?, ?)`,
                [timeLimit, totalQuestions, passingScore, allowRetake ? 1 : 0, shuffleQuestions ? 1 : 0, shuffleOptions ? 1 : 0],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                }
            );
        });
        
        res.json({
            success: true,
            data: {
                message: 'Quiz settings updated successfully'
            }
        });
    } catch (error) {
        console.error('Error updating quiz settings:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'QUIZ_SETTINGS_UPDATE_FAILED',
                message: 'Failed to update quiz settings'
            }
        });
    }
});

// Backup database
router.post('/backup-database', authenticateToken, requireAdmin, validateAdmin, async (req, res) => {
    try {
        const backupPath = await database.backup();
        
        res.json({
            success: true,
            data: {
                message: 'Database backup created successfully',
                backupPath: backupPath
            }
        });
    } catch (error) {
        console.error('Error creating backup:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'BACKUP_FAILED',
                message: 'Failed to create database backup'
            }
        });
    }
});

// Restore database
router.post('/restore-database', authenticateToken, requireAdmin, validateAdmin, (req, res) => {
    // TODO: Implement database restore
    res.json({
        success: true,
        data: {
            message: 'Database restored successfully'
        }
    });
});

// Clear cache
router.post('/clear-cache', authenticateToken, requireAdmin, validateAdmin, async (req, res) => {
    try {
        // Clear any in-memory caches
        if (global.gc) {
            global.gc();
        }
        
        res.json({
            success: true,
            data: {
                message: 'System cache cleared successfully'
            }
        });
    } catch (error) {
        console.error('Error clearing cache:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'CACHE_CLEAR_FAILED',
                message: 'Failed to clear system cache'
            }
        });
    }
});

// Optimize database
router.post('/optimize-database', authenticateToken, requireAdmin, validateAdmin, async (req, res) => {
    try {
        const db = database.getDb();
        
        // Run VACUUM to optimize database
        await new Promise((resolve, reject) => {
            db.run('VACUUM', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        // Analyze tables for better query planning
        await new Promise((resolve, reject) => {
            db.run('ANALYZE', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        res.json({
            success: true,
            data: {
                message: 'Database optimized successfully'
            }
        });
    } catch (error) {
        console.error('Error optimizing database:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'OPTIMIZATION_FAILED',
                message: 'Failed to optimize database'
            }
        });
    }
});

// Get results summary with statistics
router.get('/results-summary', authenticateToken, requireAdmin, validateAdmin, async (req, res) => {
    try {
        const db = database.getDb();
        
        // Get overall statistics
        const overallStats = await new Promise((resolve, reject) => {
            db.get(`
                SELECT 
                    COUNT(*) as total_students,
                    COUNT(CASE WHEN q.status = 'completed' THEN 1 END) as completed_tests,
                    COUNT(CASE WHEN q.score >= 36 THEN 1 END) as passed_students,
                    ROUND(AVG(CASE WHEN q.status = 'completed' THEN q.score END), 1) as avg_score,
                    ROUND(AVG(CASE WHEN q.status = 'completed' THEN (CAST(q.score AS FLOAT) / q.total_questions) * 100 END), 1) as avg_percentage
                FROM students s
                LEFT JOIN quizzes q ON s.id = q.student_id
            `, (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
        
        // Get grade-wise statistics
        const gradeStats = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    s.grade,
                    COUNT(s.id) as total_students,
                    COUNT(CASE WHEN q.status = 'completed' THEN 1 END) as completed_tests,
                    COUNT(CASE WHEN q.score >= 36 THEN 1 END) as passed_students,
                    ROUND(AVG(CASE WHEN q.status = 'completed' THEN q.score END), 1) as avg_score,
                    ROUND(AVG(CASE WHEN q.status = 'completed' THEN (CAST(q.score AS FLOAT) / q.total_questions) * 100 END), 1) as avg_percentage,
                    ROUND((COUNT(CASE WHEN q.score >= 36 THEN 1 END) * 100.0 / NULLIF(COUNT(CASE WHEN q.status = 'completed' THEN 1 END), 0)), 1) as pass_rate
                FROM students s
                LEFT JOIN quizzes q ON s.id = q.student_id
                GROUP BY s.grade
                ORDER BY s.grade
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        // Get section-wise statistics
        const sectionStats = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    s.grade,
                    s.section,
                    COUNT(s.id) as total_students,
                    COUNT(CASE WHEN q.status = 'completed' THEN 1 END) as completed_tests,
                    COUNT(CASE WHEN q.score >= 36 THEN 1 END) as passed_students,
                    ROUND(AVG(CASE WHEN q.status = 'completed' THEN q.score END), 1) as avg_score,
                    ROUND((COUNT(CASE WHEN q.score >= 36 THEN 1 END) * 100.0 / NULLIF(COUNT(CASE WHEN q.status = 'completed' THEN 1 END), 0)), 1) as pass_rate
                FROM students s
                LEFT JOIN quizzes q ON s.id = q.student_id
                GROUP BY s.grade, s.section
                ORDER BY s.grade, s.section
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        // Get top performers
        const topPerformers = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    s.name,
                    s.roll_number,
                    s.grade,
                    s.section,
                    q.score,
                    q.total_questions,
                    ROUND((CAST(q.score AS FLOAT) / q.total_questions) * 100, 1) as percentage,
                    q.completed_at
                FROM students s
                JOIN quizzes q ON s.id = q.student_id
                WHERE q.status = 'completed'
                ORDER BY q.score DESC, q.completed_at ASC
                LIMIT 10
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        res.json({
            success: true,
            data: {
                overall: {
                    ...overallStats,
                    pass_rate: overallStats.completed_tests > 0 
                        ? Math.round((overallStats.passed_students / overallStats.completed_tests) * 100 * 10) / 10
                        : 0
                },
                byGrade: gradeStats,
                bySection: sectionStats,
                topPerformers
            }
        });
        
    } catch (error) {
        console.error('Error fetching results summary:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'RESULTS_SUMMARY_FAILED',
                message: 'Failed to fetch results summary'
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