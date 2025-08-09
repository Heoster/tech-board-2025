const authUtils = require('../utils/auth');
const database = require('../config/database');

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authUtils.extractTokenFromHeader(authHeader);

    if (!token) {
        return res.status(401).json({
            success: false,
            error: {
                code: 'NO_TOKEN',
                message: 'Access token is required'
            }
        });
    }

    try {
        const decoded = authUtils.verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            error: {
                code: 'INVALID_TOKEN',
                message: error.message
            }
        });
    }
};

// Middleware to check if user is a student
const requireStudent = (req, res, next) => {
    if (req.user.role !== 'student') {
        return res.status(403).json({
            success: false,
            error: {
                code: 'INSUFFICIENT_PERMISSIONS',
                message: 'Student access required'
            }
        });
    }
    next();
};

// Middleware to check if user is an admin
const requireAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            error: {
                code: 'INSUFFICIENT_PERMISSIONS',
                message: 'Admin access required'
            }
        });
    }
    next();
};

// Middleware to validate student exists in database
const validateStudent = async (req, res, next) => {
    try {
        const db = database.getDb();
        const student = await new Promise((resolve, reject) => {
            db.get(
                'SELECT id, name, roll_number, grade, section FROM students WHERE id = ?',
                [req.user.id],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });

        if (!student) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 'STUDENT_NOT_FOUND',
                    message: 'Student not found'
                }
            });
        }

        req.student = student;
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: {
                code: 'DATABASE_ERROR',
                message: 'Error validating student'
            }
        });
    }
};

// Simple middleware to validate admin
const validateAdmin = async (req, res, next) => {
    try {
        const db = database.getDb();
        
        // Get admin information
        const admin = await new Promise((resolve, reject) => {
            db.get(
                'SELECT id, username FROM admins WHERE id = ?',
                [req.user.id],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });

        if (!admin) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 'ADMIN_NOT_FOUND',
                    message: 'Admin not found'
                }
            });
        }

        req.admin = admin;
        next();
        
    } catch (error) {
        console.error('Admin validation error:', error);
        return res.status(500).json({
            success: false,
            error: {
                code: 'DATABASE_ERROR',
                message: 'Error validating admin'
            }
        });
    }
};



module.exports = {
    authenticateToken,
    requireStudent,
    requireAdmin,
    validateStudent,
    validateAdmin
};