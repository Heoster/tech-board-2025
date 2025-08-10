const authMiddleware = require('../auth');
const authUtils = require('../../utils/auth');

// Mock the auth utils
jest.mock('../../utils/auth');

// Mock the database
jest.mock('../../config/database', () => ({
  getDb: jest.fn(() => ({
    get: jest.fn(),
    all: jest.fn(),
    run: jest.fn()
  }))
}));

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = global.testUtils.createMockRequest();
    res = global.testUtils.createMockResponse();
    next = jest.fn();
  });

  describe('authenticateToken', () => {
    it('should return 401 when no token is provided', () => {
      authUtils.extractTokenFromHeader.mockReturnValue(null);
      
      authMiddleware.authenticateToken(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: 'NO_TOKEN',
          message: 'Access token is required'
        }
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 403 when token is invalid', () => {
      const mockToken = 'invalid-token';
      authUtils.extractTokenFromHeader.mockReturnValue(mockToken);
      authUtils.verifyToken.mockImplementation(() => {
        throw new Error('Invalid token');
      });
      
      authMiddleware.authenticateToken(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Invalid token'
        }
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should call next() when token is valid', () => {
      const mockToken = 'valid-token';
      const mockUser = global.testUtils.createMockUser();
      
      authUtils.extractTokenFromHeader.mockReturnValue(mockToken);
      authUtils.verifyToken.mockReturnValue(mockUser);
      
      authMiddleware.authenticateToken(req, res, next);
      
      expect(req.user).toEqual(mockUser);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should use production-safe error message in production', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
      
      const mockToken = 'invalid-token';
      authUtils.extractTokenFromHeader.mockReturnValue(mockToken);
      authUtils.verifyToken.mockImplementation(() => {
        throw new Error('Detailed error message');
      });
      
      authMiddleware.authenticateToken(req, res, next);
      
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Authentication failed'
        }
      });
      
      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('requireStudent', () => {
    it('should return 403 when user is not a student', () => {
      req.user = global.testUtils.createMockAdmin();
      
      authMiddleware.requireStudent(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: 'INSUFFICIENT_PERMISSIONS',
          message: 'Student access required'
        }
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should call next() when user is a student', () => {
      req.user = global.testUtils.createMockUser();
      
      authMiddleware.requireStudent(req, res, next);
      
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });
  });

  describe('requireAdmin', () => {
    it('should return 403 when user is not an admin', () => {
      req.user = global.testUtils.createMockUser();
      
      authMiddleware.requireAdmin(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: 'INSUFFICIENT_PERMISSIONS',
          message: 'Admin access required'
        }
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should call next() when user is an admin', () => {
      req.user = global.testUtils.createMockAdmin();
      
      authMiddleware.requireAdmin(req, res, next);
      
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });
  });

  describe('validateStudent', () => {
    it('should return 404 when student is not found in database', async () => {
      const database = require('../../config/database');
      const mockDb = {
        get: jest.fn((query, params, callback) => {
          callback(null, null); // Student not found
        })
      };
      database.getDb.mockReturnValue(mockDb);
      
      req.user = { id: 999 };
      
      await authMiddleware.validateStudent(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: 'STUDENT_NOT_FOUND',
          message: 'Student not found'
        }
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should call next() when student is found in database', async () => {
      const database = require('../../config/database');
      const mockStudent = {
        id: 1,
        name: 'Test Student',
        roll_number: 12,
        grade: 9,
        section: 'A'
      };
      
      const mockDb = {
        get: jest.fn((query, params, callback) => {
          callback(null, mockStudent);
        })
      };
      database.getDb.mockReturnValue(mockDb);
      
      req.user = { id: 1 };
      
      await authMiddleware.validateStudent(req, res, next);
      
      expect(req.student).toEqual(mockStudent);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should return 500 on database error', async () => {
      const database = require('../../config/database');
      const mockDb = {
        get: jest.fn((query, params, callback) => {
          callback(new Error('Database error'), null);
        })
      };
      database.getDb.mockReturnValue(mockDb);
      
      req.user = { id: 1 };
      
      await authMiddleware.validateStudent(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'Error validating student'
        }
      });
      expect(next).not.toHaveBeenCalled();
    });
  });
});