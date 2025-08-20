const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const database = require('./simple-database');

const router = express.Router();

// Student registration
router.post('/register', async (req, res) => {
    try {
        const { name, roll_number, rollNumber, password, grade, section } = req.body;
        const studentRollNumber = roll_number || rollNumber;
        
        // Basic validation
        if (!name || !studentRollNumber || !password || !grade || !section) {
            return res.status(400).json({ 
                success: false, 
                message: 'All fields are required' 
            });
        }
        
        // Check if student exists
        const existingUser = await database.get(
            'SELECT id FROM students WHERE roll_number = ? AND grade = ? AND section = ?', 
            [studentRollNumber, grade, section]
        );
        
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: 'Student already registered' 
            });
        }
        
        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await database.run(
            'INSERT INTO students (name, roll_number, password, grade, section) VALUES (?, ?, ?, ?, ?)',
            [name, studentRollNumber, hashedPassword, parseInt(grade), section.toUpperCase()]
        );
        
        const token = jwt.sign({ 
            id: result.lastID, 
            type: 'student', 
            grade: parseInt(grade),
            rollNumber: studentRollNumber,
            section: section.toUpperCase(),
            name
        }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
        
        res.json({ 
            success: true, 
            token,
            user: { 
                id: result.lastID, 
                name, 
                rollNumber: studentRollNumber, 
                grade: parseInt(grade), 
                section: section.toUpperCase() 
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Registration failed' 
        });
    }
});

// Student login
router.post('/login', async (req, res) => {
    try {
        const { rollNumber, roll_number, grade, section, password } = req.body;
        const studentRollNumber = rollNumber || roll_number;
        
        if (!studentRollNumber || !password || !grade || !section) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing required fields' 
            });
        }
        
        const user = await database.get(
            'SELECT * FROM students WHERE roll_number = ? AND grade = ? AND section = ?', 
            [studentRollNumber, grade, section]
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
        
        // Check password
        let passwordValid = false;
        try {
            passwordValid = await bcrypt.compare(password, admin.password);
        } catch (bcryptError) {
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
                    username: admin.username,
                    type: 'admin'
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

module.exports = router;