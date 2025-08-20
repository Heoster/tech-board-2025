const express = require('express');
const database = require('./simple-database');

const router = express.Router();

// Simple middleware to check admin token
const requireAdmin = (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        if (decoded.type !== 'admin') {
            return res.status(403).json({ error: 'Admin access required' });
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// Get dashboard data
router.get('/dashboard', requireAdmin, async (req, res) => {
    try {
        const [studentCount, questionCount, quizCount] = await Promise.all([
            database.get('SELECT COUNT(*) as count FROM students'),
            database.get('SELECT COUNT(*) as count FROM questions'),
            database.get('SELECT COUNT(*) as count FROM quizzes')
        ]);

        res.json({
            success: true,
            data: {
                students: studentCount.count,
                questions: questionCount.count,
                quizzes: quizCount.count
            }
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ error: 'Failed to load dashboard' });
    }
});

// Get all results
router.get('/results', requireAdmin, async (req, res) => {
    try {
        const results = await database.all(`
            SELECT s.name, s.roll_number, s.grade, s.section, 
                   q.score, q.total_questions, q.completed_at
            FROM students s
            LEFT JOIN quizzes q ON s.id = q.student_id
            ORDER BY s.grade, s.section, s.roll_number
        `);

        res.json({
            success: true,
            data: results
        });
    } catch (error) {
        console.error('Results error:', error);
        res.status(500).json({ error: 'Failed to load results' });
    }
});

module.exports = router;