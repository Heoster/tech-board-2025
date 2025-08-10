const rateLimit = require('express-rate-limit');

// Enhanced security middleware for production
const securityMiddleware = {
  // Strict rate limiting for authentication endpoints
  authLimiter: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.NODE_ENV === 'production' ? 20 : 100, // 20 attempts in production, 100 in dev
    message: {
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many authentication attempts. Please try again later.'
      }
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    keyGenerator: (req) => {
      return req.ip + ':' + (req.headers['user-agent'] || 'unknown');
    }
  }),

  // Very strict admin rate limiting
  adminLimiter: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.NODE_ENV === 'production' ? 10 : 50, // 10 attempts in production
    message: {
      success: false,
      error: {
        code: 'ADMIN_RATE_LIMIT_EXCEEDED',
        message: 'Too many admin login attempts. Account temporarily locked.'
      }
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    keyGenerator: (req) => {
      return req.ip + ':admin:' + (req.headers['user-agent'] || 'unknown');
    }
  }),

  // General API rate limiting
  generalLimiter: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.NODE_ENV === 'production' ? 1000 : 10000, // 1000 requests per 15 min in production
    message: {
      success: false,
      error: {
        code: 'API_RATE_LIMIT_EXCEEDED',
        message: 'Too many API requests. Please slow down.'
      }
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => req.ip
  }),

  // Quiz submission rate limiting
  quizLimiter: rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: process.env.NODE_ENV === 'production' ? 400 : 1000, // 400 quiz requests per minute in production
    message: {
      success: false,
      error: {
        code: 'QUIZ_RATE_LIMIT_EXCEEDED',
        message: 'Quiz submission too frequent. Please wait before submitting again.'
      }
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    keyGenerator: (req) => req.ip + ':quiz'
  }),

  // Input sanitization middleware
  sanitizeInput: (req, res, next) => {
    const sanitizeString = (str) => {
      if (typeof str !== 'string') return str;
      
      // Remove potential XSS attacks
      return str
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .trim();
    };

    const sanitizeObject = (obj) => {
      if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
        for (const key in obj) {
          if (typeof obj[key] === 'string') {
            obj[key] = sanitizeString(obj[key]);
          } else if (typeof obj[key] === 'object') {
            obj[key] = sanitizeObject(obj[key]);
          }
        }
      }
      return obj;
    };

    // Sanitize request body
    if (req.body) {
      req.body = sanitizeObject(req.body);
    }

    // Sanitize query parameters
    if (req.query) {
      req.query = sanitizeObject(req.query);
    }

    next();
  },

  // Security headers middleware
  securityHeaders: (req, res, next) => {
    // Additional security headers beyond helmet
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    
    // Content Security Policy for API
    if (req.path.startsWith('/api/')) {
      res.setHeader('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'");
    }

    next();
  },

  // Request validation middleware
  validateRequest: (req, res, next) => {
    // Check for suspicious patterns
    const suspiciousPatterns = [
      /\b(union\s+select|drop\s+table|insert\s+into|delete\s+from)\b/i,
      /<script\b/i,
      /javascript:/i,
      /data:text\/html/i
    ];

    const checkString = (str) => {
      return suspiciousPatterns.some(pattern => pattern.test(str));
    };

    const checkObject = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === 'string' && checkString(obj[key])) {
          return true;
        }
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          if (checkObject(obj[key])) return true;
        }
      }
      return false;
    };

    // Check request body and query for suspicious content
    if ((req.body && checkObject(req.body)) || (req.query && checkObject(req.query))) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'SUSPICIOUS_REQUEST',
          message: 'Request contains potentially malicious content'
        }
      });
    }

    next();
  }
};

module.exports = securityMiddleware;