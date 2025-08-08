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

// Enhanced middleware to validate admin with security checks
const validateAdmin = async (req, res, next) => {
    try {
        const db = database.getDb();
        const clientIP = req.ip || req.connection.remoteAddress;
        
        // Get admin with security information
        const admin = await new Promise((resolve, reject) => {
            db.get(
                'SELECT id, username, failed_attempts, locked_until, last_login FROM admins WHERE id = ?',
                [req.user.id],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });

        if (!admin) {
            console.log(`❌ Admin validation failed: Admin ID ${req.user.id} not found`);
            return res.status(404).json({
                success: false,
                error: {
                    code: 'ADMIN_NOT_FOUND',
                    message: 'Admin not found'
                }
            });
        }

        // Security: Check if admin account is locked
        if (admin.locked_until && new Date(admin.locked_until) > new Date()) {
            console.log(`🔒 Blocked request from locked admin: ${admin.username}`);
            return res.status(423).json({
                success: false,
                error: {
                    code: 'ACCOUNT_LOCKED',
                    message: 'Admin account is temporarily locked'
                }
            });
        }

        // Security: Validate token IP if available
        if (req.user.ip && req.user.ip !== clientIP) {
            console.log(`⚠️  IP mismatch for admin ${admin.username}: token=${req.user.ip}, request=${clientIP}`);
            // Log suspicious activity but don't block (IP can change legitimately)
            await new Promise((resolve) => {
                db.run(
                    `INSERT INTO admin_activity_log (admin_id, action, details, ip_address, timestamp) 
                     VALUES (?, ?, ?, ?, ?)`,
                    [admin.id, 'IP_MISMATCH', `Token IP: ${req.user.ip}, Request IP: ${clientIP}`, clientIP, new Date().toISOString()],
                    () => resolve() // Don't fail on logging errors
                );
            });
        }

        // Security: Check token age (expire after 8 hours)
        const tokenAge = Date.now() - (req.user.loginTime || 0);
        const maxAge = 8 * 60 * 60 * 1000; // 8 hours
        
        if (tokenAge > maxAge) {
            console.log(`⏰ Token expired for admin ${admin.username}: age=${Math.round(tokenAge/1000/60)} minutes`);
            return res.status(401).json({
                success: false,
                error: {
                    code: 'TOKEN_EXPIRED',
                    message: 'Admin session expired. Please login again.'
                }
            });
        }

        req.admin = admin;
        next();
        
    } catch (error) {
        console.error('❌ Admin validation error:', error);
        return res.status(500).json({
            success: false,
            error: {
                code: 'DATABASE_ERROR',
                message: 'Error validating admin'
            }
        });
    }
};

// Middleware to log admin activities
const logAdminActivity = (action) => {
    return async (req, res, next) => {
        try {
            const db = database.getDb();
            const clientIP = req.ip || req.connection.remoteAddress;
            const userAgent = req.get('User-Agent');
            
            if (req.admin) {
                await new Promise((resolve) => {
                    db.run(
                        `INSERT INTO admin_activity_log (admin_id, action, details, ip_address, user_agent, timestamp) 
                         VALUES (?, ?, ?, ?, ?, ?)`,
                        [
                            req.admin.id, 
                            action, 
                            JSON.stringify({ 
                                method: req.method, 
                                path: req.path, 
                                query: req.query,
                                body: req.method === 'POST' ? Object.keys(req.body) : undefined
                            }), 
                            clientIP, 
                            userAgent, 
                            new Date().toISOString()
                        ],
                        () => resolve() // Don't fail on logging errors
                    );
                });
            }
            
            next();
        } catch (error) {
            console.error('Failed to log admin activity:', error);
            next(); // Continue even if logging fails
        }
    };
};

module.exports = {
    authenticateToken,
    requireStudent,
    requireAdmin,
    validateStudent,
    validateAdmin,
    logAdminActivity
};