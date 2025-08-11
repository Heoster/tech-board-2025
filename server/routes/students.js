const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const database = require('../config/database');

const router = express.Router();

// Get student by ID (admin only)
router.get('/:id', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const studentId = req.params.id;
        
        const student = await database.get(
            'SELECT id, name, roll_number, grade, section, created_at FROM students WHERE id = ?', 
            [studentId]
        );
        
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        res.json({ student });
    } catch (error) {
        console.error('Get student error:', error);
        res.status(500).json({ error: 'Failed to fetch student' });
    }
});

// Create student (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
    try {
        // Handle both rollNumber and roll_number formats
        const roll_number = req.body.roll_number || req.body.rollNumber;
        const { name, grade, section = 'A', password } = req.body;
        
        if (!name || !roll_number || !grade || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        // Check if student already exists
        const existingStudent = await database.get(
            'SELECT id FROM students WHERE roll_number = ? AND grade = ? AND section = ?',
            [roll_number, grade, section]
        );
        
        if (existingStudent) {
            return res.status(400).json({ error: 'Student already exists' });
        }
        
        // Hash password
        const bcrypt = require('bcrypt');
        const passwordHash = await bcrypt.hash(password, 10);
        
        const result = await database.run(
            'INSERT INTO students (name, roll_number, grade, section, password_hash) VALUES (?, ?, ?, ?, ?)',
            [name, roll_number, grade, section, passwordHash]
        );
        
        res.status(201).json({ studentId: result.lastID, message: 'Student created successfully' });
    } catch (error) {
        console.error('Create student error:', error);
        res.status(500).json({ error: 'Failed to create student' });
    }
});

// Get all students (admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const { grade } = req.query;
        
        let query = 'SELECT id, name, roll_number, grade, section, created_at FROM students ORDER BY created_at DESC';
        let params = [];
        
        if (grade) {
            query = 'SELECT id, name, roll_number, grade, section, created_at FROM students WHERE grade = ? ORDER BY created_at DESC';
            params = [grade];
        }
        
        const students = await database.query(query, params);
        
        res.json({ students });
    } catch (error) {
        console.error('Get students error:', error);
        res.status(500).json({ error: 'Failed to fetch students' });
    }
});

// Get student quiz results (admin only)
router.get('/:id/results', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const studentId = req.params.id;
        const db = database.getDb();
        
        const results = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.grade, q.score, q.total_questions, q.started_at, q.completed_at,
                       s.name as student_name
                FROM quizzes q
                JOIN students s ON q.student_id = s.id
                WHERE q.student_id = ? AND q.status = 'completed'
                ORDER BY q.completed_at DESC
            `, [studentId], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        res.json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch results' });
    }
});

// Get detailed quiz answers (admin only)
router.get('/quiz/:quizId/details', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const quizId = req.params.quizId;
        const db = database.getDb();
        
        const details = await new Promise((resolve, reject) => {
            db.all(`
                SELECT qa.*, q.question_text, q.difficulty,
                       o.option_text as selected_answer,
                       correct_o.option_text as correct_answer
                FROM quiz_answers qa
                JOIN questions q ON qa.question_id = q.id
                JOIN options o ON qa.selected_option_id = o.id
                JOIN options correct_o ON q.id = correct_o.question_id AND correct_o.is_correct = 1
                WHERE qa.quiz_id = ?
                ORDER BY qa.answered_at
            `, [quizId], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        res.json({ success: true, data: details });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch quiz details' });
    }
});

module.exports = router;