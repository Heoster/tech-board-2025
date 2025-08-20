const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

// Enhanced rate limiting for different endpoints
const createRateLimit = (windowMs, max, message) => rateLimit({
    windowMs,
    max,
    message: { error: message },
    standardHeaders: true,
    legacyHeaders: false,
});

// Strict rate limiting for auth endpoints
const authLimiter = createRateLimit(
    15 * 60 * 1000, // 15 minutes
    5, // 5 attempts
    'Too many authentication attempts, please try again later'
);

// General API rate limiting
const apiLimiter = createRateLimit(
    15 * 60 * 1000, // 15 minutes
    100, // 100 requests
    'Too many requests, please try again later'
);

// Quiz submission rate limiting
const quizLimiter = createRateLimit(
    60 * 60 * 1000, // 1 hour
    10, // 10 submissions
    'Too many quiz submissions, please try again later'
);

// Security headers
const securityHeaders = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
        },
    },
    crossOriginEmbedderPolicy: false,
});

module.exports = {
    authLimiter,
    apiLimiter,
    quizLimiter,
    securityHeaders
};