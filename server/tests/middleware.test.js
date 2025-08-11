const jwt = require('jsonwebtoken');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

describe('Authentication Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            headers: {},
            user: null
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    describe('authenticateToken', () => {
        test('should authenticate valid token', () => {
            const token = jwt.sign(
                { id: 1, type: 'student', grade: 6 },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            req.headers.authorization = `Bearer ${token}`;

            authenticateToken(req, res, next);

            expect(req.user).toBeDefined();
            expect(req.user.id).toBe(1);
            expect(req.user.type).toBe('student');
            expect(next).toHaveBeenCalled();
        });

        test('should reject missing token', () => {
            authenticateToken(req, res, next);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Access token required' });
            expect(next).not.toHaveBeenCalled();
        });

        test('should reject invalid token', () => {
            req.headers.authorization = 'Bearer invalid-token';

            authenticateToken(req, res, next);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid or expired token' });
            expect(next).not.toHaveBeenCalled();
        });

        test('should reject expired token', () => {
            const expiredToken = jwt.sign(
                { id: 1, type: 'student', grade: 6 },
                process.env.JWT_SECRET,
                { expiresIn: '-1h' } // Expired 1 hour ago
            );
            req.headers.authorization = `Bearer ${expiredToken}`;

            authenticateToken(req, res, next);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid or expired token' });
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe('requireAdmin', () => {
        test('should allow admin access', () => {
            req.user = { id: 1, type: 'admin', username: 'admin' };

            requireAdmin(req, res, next);

            expect(next).toHaveBeenCalled();
        });

        test('should reject non-admin access', () => {
            req.user = { id: 1, type: 'student', grade: 6 };

            requireAdmin(req, res, next);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ error: 'Admin access required' });
            expect(next).not.toHaveBeenCalled();
        });

        test('should reject missing user', () => {
            req.user = null;

            requireAdmin(req, res, next);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ error: 'Admin access required' });
            expect(next).not.toHaveBeenCalled();
        });
    });
});