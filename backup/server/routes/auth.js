const express = require('express');
const { body, validationResult } = require('express-validator');
const authUtils = require('../utils/auth');
const database = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const validateRegistration = [
    body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
    body('rollNumber').isInt({ min: 1, max: 80 }).withMessage('Roll number must be between 1 and 80'),
    body('grade').isIn([6, 7, 8, 9, 11]).withMessage('Grade must be 6, 7, 8, 9, or 11'),
    body('section').isIn(['A', 'B']).withMessage('Section must be A or B'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

const validateLogin = [
    body('rollNumber').isInt({ min: 1, max: 80 }).withMessage('Roll number must be between 1 and 80'),
    body('grade').isIn([6, 7, 8, 9, 11]).withMessage('Grade must be 6, 7, 8, 9, or 11'),
    body('section').isIn(['A', 'B']).withMessage('Section must be A or B'),
    body('password').notEmpty().withMessage('Password is required')
];

const validateAdminLogin = [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
];

// Student registration
router.post('/register', validateRegistration, async (req, res) => {
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

        // Check if student already exists
        const existingStudent = await new Promise((resolve, reject) => {
            db.get(
                'SELECT id FROM students WHERE roll_number = ? AND grade = ? AND section = ?',
                [rollNumber, grade, section],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });

        if (existingStudent) {
            return res.status(409).json({
                success: false,
                error: {
                    code: 'STUDENT_EXISTS',
                    message: 'Student with this roll number already exists in this grade and section'
                }
            });
        }

        // Hash password and create student
        const passwordHash = await authUtils.hashPassword(password);
        
        const studentId = await new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO students (name, roll_number, grade, section, password_hash) VALUES (?, ?, ?, ?, ?)',
                [name, rollNumber, grade, section, passwordHash],
                function(err) {
                    if (err) reject(err);
                    else resolve(this.lastID);
                }
            );
        });

        // Generate token
        const token = authUtils.generateToken({
            id: studentId,
            rollNumber,
            grade,
            section,
            role: 'student'
        });

        res.status(201).json({
            success: true,
            data: {
                token,
                student: {
                    id: studentId,
                    name,
                    rollNumber,
                    grade,
                    section
                }
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'REGISTRATION_FAILED',
                message: 'Failed to register student'
            }
        });
    }
});

// Student login
router.post('/login', validateLogin, async (req, res) => {
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

        const { rollNumber, grade, section, password } = req.body;
        const db = database.getDb();

        // Find student
        const student = await new Promise((resolve, reject) => {
            db.get(
                'SELECT id, name, roll_number, grade, section, password_hash FROM students WHERE roll_number = ? AND grade = ? AND section = ?',
                [rollNumber, grade, section],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });

        if (!student) {
            return res.status(401).json({
                success: false,
                error: {
                    code: 'INVALID_CREDENTIALS',
                    message: 'Invalid credentials'
                }
            });
        }

        // Verify password
        const isValidPassword = await authUtils.verifyPassword(password, student.password_hash);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                error: {
                    code: 'INVALID_CREDENTIALS',
                    message: 'Invalid credentials'
                }
            });
        }

        // Generate token
        const token = authUtils.generateToken({
            id: student.id,
            rollNumber: student.roll_number,
            grade: student.grade,
            section: student.section,
            role: 'student'
        });

        res.json({
            success: true,
            data: {
                token,
                student: {
                    id: student.id,
                    name: student.name,
                    rollNumber: student.roll_number,
                    grade: student.grade,
                    section: student.section
                }
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'LOGIN_FAILED',
                message: 'Failed to login'
            }
        });
    }
});

// Admin login
router.post('/admin/login', validateAdminLogin, async (req, res) => {
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

        const { username, password } = req.body;
        const db = database.getDb();

        // Find admin
        const admin = await new Promise((resolve, reject) => {
            db.get(
                'SELECT id, username, password_hash FROM admins WHERE username = ?',
                [username],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });

        if (!admin) {
            return res.status(401).json({
                success: false,
                error: {
                    code: 'INVALID_CREDENTIALS',
                    message: 'Invalid credentials'
                }
            });
        }

        // Verify password
        const isValidPassword = await authUtils.verifyPassword(password, admin.password_hash);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                error: {
                    code: 'INVALID_CREDENTIALS',
                    message: 'Invalid credentials'
                }
            });
        }

        // Generate token
        const token = authUtils.generateToken({
            id: admin.id,
            username: admin.username,
            role: 'admin'
        });

        res.json({
            success: true,
            data: {
                token,
                admin: {
                    id: admin.id,
                    username: admin.username
                }
            }
        });

    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'LOGIN_FAILED',
                message: 'Failed to login'
            }
        });
    }
});

// Verify token
router.get('/verify', authenticateToken, (req, res) => {
    res.json({
        success: true,
        data: {
            user: req.user
        }
    });
});

// Logout (client-side token removal)
router.post('/logout', (req, res) => {
    res.json({
        success: true,
        message: 'Logged out successfully'
    });
});

module.exports = router;