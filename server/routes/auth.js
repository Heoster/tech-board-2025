const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const database = require('../config/database');

const router = express.Router();

// Student registration
router.post('/register', [
    body('name').trim().isLength({ min: 2 }),
    body('rollNumber').isInt({ min: 1, max: 999 }),
    body('password').isLength({ min: 6 }),
    body('grade').isIn([6, 7, 8, 9, 11]),
    body('section').isLength({ min: 1, max: 1 })
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
        const { name, rollNumber, password, grade, section } = req.body;
        
        // Check if student exists
        const existingUser = await database.get(
            'SELECT id FROM students WHERE roll_number = ? AND grade = ? AND section = ?', 
            [rollNumber, grade, section]
        );
        
        if (existingUser) {
            return res.status(400).json({ success: false, error: 'Student already registered' });
        }
        
        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await database.run(
            'INSERT INTO students (name, roll_number, password, grade, section) VALUES (?, ?, ?, ?, ?)',
            [name, rollNumber, hashedPassword, grade, section]
        );
        
        const token = jwt.sign({ 
            id: result.lastID, 
            type: 'student', 
            grade,
            rollNumber,
            section,
            name
        }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
        
        res.json({ 
            success: true, 
            data: { 
                token, 
                user: { id: result.lastID, name, rollNumber, grade, section } 
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
        const { rollNumber, roll_number, grade, section, password } = req.body;
        const studentRollNumber = rollNumber || roll_number;
        
        if (!studentRollNumber || !password || !grade || !section) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing required fields: rollNumber, password, grade, and section are required' 
            });
        }
        
        console.log('Looking for student:', { rollNumber: studentRollNumber, grade, section });
        
        const user = await database.get(
            'SELECT * FROM students WHERE roll_number = ? AND grade = ? AND section = ?', 
            [studentRollNumber, grade, section]
        );
        
        console.log('Found user:', user ? { id: user.id, name: user.name, roll_number: user.roll_number } : 'Not found');
        
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                error: 'Student not found' 
            });
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', passwordMatch);
        
        if (!passwordMatch) {
            return res.status(401).json({ 
                success: false, 
                error: 'Invalid password' 
            });
        }
        
        const token = jwt.sign({ 
            id: user.id, 
            type: 'student', 
            grade: user.grade,
            rollNumber: user.roll_number,
            section: user.section,
            name: user.name
        }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
        
        res.json({ 
            success: true,
            data: {
                token, 
                user: { 
                    id: user.id, 
                    name: user.name, 
                    rollNumber: user.roll_number, 
                    grade: user.grade,
                    section: user.section
                }
            }
        });
    } catch (error) {
        console.error('Student login error:', error);
        console.error('Request body:', req.body);
        res.status(500).json({ 
            success: false, 
            error: 'Login failed',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Admin login
router.post('/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing credentials' 
            });
        }
        
        const admin = await database.get('SELECT * FROM admins WHERE username = ?', [username]);
        
        if (!admin) {
            return res.status(401).json({ 
                success: false, 
                error: 'Invalid credentials' 
            });
        }
        
        // Check password - handle both hashed and plain text for backward compatibility
        let passwordValid = false;
        try {
            passwordValid = await bcrypt.compare(password, admin.password);
        } catch (bcryptError) {
            // If bcrypt fails, try plain text comparison (for development)
            passwordValid = password === admin.password;
        }
        
        if (!passwordValid) {
            return res.status(401).json({ 
                success: false, 
                error: 'Invalid credentials' 
            });
        }
        
        const token = jwt.sign({ 
            id: admin.id, 
            type: 'admin', 
            username: admin.username 
        }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
        
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
        res.status(500).json({ 
            success: false, 
            error: 'Login failed' 
        });
    }
});

// Simple login route (using roll number)
router.post('/login', async (req, res) => {
    try {
        const { rollNumber, password, grade, section } = req.body;
        
        if (!rollNumber || !password || !grade || !section) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing required fields: rollNumber, password, grade, and section are required' 
            });
        }
        
        const user = await database.get(
            'SELECT * FROM students WHERE roll_number = ? AND grade = ? AND section = ?', 
            [rollNumber, grade, section]
        );
        
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ 
                success: false, 
                error: 'Invalid credentials' 
            });
        }
        
        const token = jwt.sign({ 
            id: user.id, 
            type: 'student', 
            grade: user.grade,
            rollNumber: user.roll_number,
            section: user.section,
            name: user.name
        }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
        
        res.json({ 
            success: true,
            data: {
                token, 
                user: { 
                    id: user.id, 
                    name: user.name, 
                    rollNumber: user.roll_number, 
                    grade: user.grade,
                    section: user.section
                }
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Login failed' 
        });
    }
});

module.exports = router;