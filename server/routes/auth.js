const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const database = require('../config/database');

const router = express.Router();

// Student registration
router.post('/register', [
    body('name').trim().isLength({ min: 2 }),
    body('roll_number').isInt({ min: 1, max: 100 }),
    body('password').isLength({ min: 6 }),
    body('grade').isIn([6, 7, 8, 9, 11]),
    body('section').isIn(['A', 'B'])
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({ 
            success: false, 
            error: 'Invalid input',
            details: errors.array()
        });
    }
    
    try {
        const { name, roll_number, password, grade, section = 'A' } = req.body;
        
        // Check if student exists
        const existingUser = await database.get(
            'SELECT id FROM students WHERE roll_number = ? AND grade = ? AND section = ?', 
            [roll_number, grade, section]
        );
        
        if (existingUser) {
            return res.status(400).json({ success: false, error: 'Student already registered' });
        }
        
        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await database.run(
            'INSERT INTO students (name, roll_number, grade, section, password_hash) VALUES (?, ?, ?, ?, ?)',
            [name, roll_number, grade, section, hashedPassword]
        );
        
        const token = jwt.sign({ id: result.lastID, type: 'student', grade }, process.env.JWT_SECRET || 'secret');
        res.json({ 
            success: true, 
            data: { 
                token, 
                user: { id: result.lastID, name, roll_number, grade, section } 
            } 
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Registration failed',
            details: error.message
        });
    }
});

// Student login
router.post('/student/login', async (req, res) => {
    try {
        // Handle both rollNumber and roll_number formats
        const roll_number = req.body.roll_number || req.body.rollNumber;
        const { password, grade, section = 'A' } = req.body;
        
        if (!roll_number || !password || !grade) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const user = await database.get(
            'SELECT * FROM students WHERE roll_number = ? AND grade = ? AND section = ?', 
            [roll_number, grade, section]
        );
        
        if (!user || !await bcrypt.compare(password, user.password_hash)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ id: user.id, type: 'student', grade: user.grade }, process.env.JWT_SECRET || 'secret');
        res.json({ 
            token, 
            user: { 
                id: user.id, 
                name: user.name, 
                roll_number: user.roll_number, 
                grade: user.grade, 
                section: user.section 
            } 
        });
    } catch (error) {
        console.error('Student login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Admin login
router.post('/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: 'Missing credentials' });
        }
        
        const admin = await database.get('SELECT * FROM admins WHERE username = ?', [username]);
        
        if (!admin || !await bcrypt.compare(password, admin.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ id: admin.id, type: 'admin', username: admin.username }, process.env.JWT_SECRET || 'secret');
        res.json({ 
            success: true,
            data: {
                token, 
                user: { 
                    id: admin.id, 
                    username: admin.username 
                }
            }
        });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;