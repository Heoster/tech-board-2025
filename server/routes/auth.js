const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const database = require('../config/database');

const router = express.Router();

// Student registration
router.post('/register', [
    body('name').trim().isLength({ min: 2 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('grade').isIn([6, 7, 8, 9, 11])
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
        const { name, email, password, grade } = req.body;
        
        // Check if student exists
        const existingUser = await database.get(
            'SELECT id FROM students WHERE email = ?', 
            [email]
        );
        
        if (existingUser) {
            return res.status(400).json({ success: false, error: 'Student already registered' });
        }
        
        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await database.run(
            'INSERT INTO students (name, email, password, grade) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, grade]
        );
        
        const token = jwt.sign({ id: result.lastID, type: 'student', grade }, process.env.JWT_SECRET || 'secret');
        res.json({ 
            success: true, 
            data: { 
                token, 
                user: { id: result.lastID, name, email, grade } 
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
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing required fields' 
            });
        }
        
        const user = await database.get(
            'SELECT * FROM students WHERE email = ?', 
            [email]
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
            email: user.email
        }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
        
        res.json({ 
            success: true,
            data: {
                token, 
                user: { 
                    id: user.id, 
                    name: user.name, 
                    email: user.email, 
                    grade: user.grade 
                }
            },

        });
    } catch (error) {
        console.error('Student login error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Login failed' 
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

// Simple login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing email or password' 
            });
        }
        
        const user = await database.get('SELECT * FROM students WHERE email = ?', [email]);
        
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
            email: user.email
        }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
        
        res.json({ 
            success: true,
            data: {
                token, 
                user: { 
                    id: user.id, 
                    name: user.name, 
                    email: user.email, 
                    grade: user.grade
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