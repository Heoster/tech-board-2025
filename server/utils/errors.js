/**
 * Enhanced Error Handling Utilities
 */

class AppError extends Error {
    constructor(message, statusCode, code = null) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = true;
        
        Error.captureStackTrace(this, this.constructor);
    }
}

class ValidationError extends AppError {
    constructor(message, details = []) {
        super(message, 400, 'VALIDATION_ERROR');
        this.details = details;
    }
}

class DatabaseError extends AppError {
    constructor(message, originalError = null) {
        super(message, 500, 'DATABASE_ERROR');
        this.originalError = originalError;
    }
}

class AuthenticationError extends AppError {
    constructor(message = 'Authentication failed') {
        super(message, 401, 'AUTHENTICATION_ERROR');
    }
}

class AuthorizationError extends AppError {
    constructor(message = 'Insufficient permissions') {
        super(message, 403, 'AUTHORIZATION_ERROR');
    }
}

const handleError = (error, req, res, next) => {
    let { statusCode = 500, message, code } = error;
    
    // Log error details
    console.error('Error occurred:', {
        message: error.message,
        stack: error.stack,
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
        userAgent: req.headers['user-agent']
    });
    
    // Don't leak error details in production
    if (process.env.NODE_ENV === 'production' && statusCode === 500) {
        message = 'Something went wrong!';
    }
    
    res.status(statusCode).json({
        success: false,
        error: {
            code: code || 'INTERNAL_SERVER_ERROR',
            message,
            ...(process.env.NODE_ENV !== 'production' && { stack: error.stack })
        }
    });
};

module.exports = {
    AppError,
    ValidationError,
    DatabaseError,
    AuthenticationError,
    AuthorizationError,
    handleError
};
