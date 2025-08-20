const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 12;

// Enforce secure JWT secret handling
const RAW_JWT_SECRET = process.env.JWT_SECRET;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Use a secure fallback for production if JWT_SECRET is not set
const JWT_SECRET = RAW_JWT_SECRET || 'tech-board-2025-production-secret-key-change-me-in-production';

// Warn if using fallback in production
if (!RAW_JWT_SECRET && NODE_ENV === 'production') {
  console.warn('⚠️ WARNING: Using default JWT_SECRET. Set JWT_SECRET environment variable for security.');
}

class AuthUtils {
  // Hash password
  async hashPassword(password) {
    try {
      return await bcrypt.hash(password, SALT_ROUNDS);
    } catch (error) {
      throw new Error('Error hashing password');
    }
  }

  // Verify password
  async verifyPassword(password, hashedPassword) {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      throw new Error('Error verifying password');
    }
  }

  // Generate JWT token
  generateToken(payload, expiresIn = '24h') {
    try {
      return jwt.sign(payload, JWT_SECRET, { expiresIn });
    } catch (error) {
      throw new Error('Error generating token');
    }
  }

  // Verify JWT token
  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Token expired');
      } else if (error.name === 'JsonWebTokenError') {
        throw new Error('Invalid token');
      } else {
        throw new Error('Token verification failed');
      }
    }
  }

  // Extract token from request header
  extractTokenFromHeader(authHeader) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.substring(7);
  }
}

module.exports = new AuthUtils();