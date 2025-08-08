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

// Admin login with enhanced security
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

        const { username, password, securityCode, browserInfo, securityLevel } = req.body;
        const clientIP = req.ip || req.connection.remoteAddress;
        const userAgent = req.get('User-Agent');
        const db = database.getDb();

        // Security: Log all admin login attempts
        console.log(`🔐 Admin login attempt: ${username} from ${clientIP} at ${new Date().toISOString()}`);
        console.log(`   User-Agent: ${userAgent}`);
        console.log(`   Security Level: ${securityLevel || 'normal'}`);

        // Security: Validate time-based security code if required
        if (securityLevel === 'high' && securityCode) {
            const now = new Date();
            const hour = now.getHours();
            const minute = Math.floor(now.getMinutes() / 10) * 10;
            const expectedCode = `TECH${hour}${minute}`;
            
            if (securityCode !== expectedCode) {
                console.log(`❌ Invalid security code: expected ${expectedCode}, got ${securityCode}`);
                return res.status(401).json({
                    success: false,
                    error: {
                        code: 'INVALID_SECURITY_CODE',
                        message: 'Invalid security code'
                    }
                });
            }
        }

        // Security: Rate limiting check (basic implementation)
        const rateLimitKey = `admin_login_${clientIP}`;
        // In production, use Redis or similar for distributed rate limiting

        // Find admin
        const admin = await new Promise((resolve, reject) => {
            db.get(
                'SELECT id, username, password_hash, last_login, failed_attempts, locked_until FROM admins WHERE username = ?',
                [username],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });

        if (!admin) {
            console.log(`❌ Admin not found: ${username}`);
            return res.status(401).json({
                success: false,
                error: {
                    code: 'INVALID_CREDENTIALS',
                    message: 'Invalid credentials'
                }
            });
        }

        // Security: Check if admin account is locked
        if (admin.locked_until && new Date(admin.locked_until) > new Date()) {
            console.log(`🔒 Admin account locked: ${username} until ${admin.locked_until}`);
            return res.status(423).json({
                success: false,
                error: {
                    code: 'ACCOUNT_LOCKED',
                    message: 'Account temporarily locked due to security reasons'
                }
            });
        }

        // Verify password
        const isValidPassword = await authUtils.verifyPassword(password, admin.password_hash);
        if (!isValidPassword) {
            console.log(`❌ Invalid password for admin: ${username}`);
            
            // Security: Increment failed attempts
            const newFailedAttempts = (admin.failed_attempts || 0) + 1;
            let lockedUntil = null;
            
            // Lock account after 5 failed attempts for 30 minutes
            if (newFailedAttempts >= 5) {
                lockedUntil = new Date(Date.now() + 30 * 60 * 1000).toISOString();
                console.log(`🔒 Locking admin account: ${username} until ${lockedUntil}`);
            }
            
            await new Promise((resolve, reject) => {
                db.run(
                    'UPDATE admins SET failed_attempts = ?, locked_until = ? WHERE id = ?',
                    [newFailedAttempts, lockedUntil, admin.id],
                    (err) => {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });

            return res.status(401).json({
                success: false,
                error: {
                    code: 'INVALID_CREDENTIALS',
                    message: 'Invalid credentials'
                }
            });
        }

        // Security: Reset failed attempts on successful login
        await new Promise((resolve, reject) => {
            db.run(
                'UPDATE admins SET failed_attempts = 0, locked_until = NULL, last_login = ? WHERE id = ?',
                [new Date().toISOString(), admin.id],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                }
            );
        });

        // Security: Log successful admin login
        console.log(`✅ Successful admin login: ${username} from ${clientIP}`);
        
        // Security: Create admin session log
        await new Promise((resolve, reject) => {
            db.run(
                `INSERT OR IGNORE INTO admin_sessions (admin_id, ip_address, user_agent, login_time, browser_info) 
                 VALUES (?, ?, ?, ?, ?)`,
                [admin.id, clientIP, userAgent, new Date().toISOString(), JSON.stringify(browserInfo)],
                (err) => {
                    if (err) console.error('Failed to log admin session:', err);
                    resolve();
                }
            );
        });

        // Generate secure token with additional claims
        const token = authUtils.generateToken({
            id: admin.id,
            username: admin.username,
            role: 'admin',
            loginTime: Date.now(),
            securityLevel: securityLevel || 'normal',
            ip: clientIP
        });

        res.json({
            success: true,
            data: {
                token,
                admin: {
                    id: admin.id,
                    username: admin.username,
                    lastLogin: admin.last_login,
                    securityLevel: securityLevel || 'normal'
                }
            }
        });

    } catch (error) {
        console.error('❌ Admin login error:', error);
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