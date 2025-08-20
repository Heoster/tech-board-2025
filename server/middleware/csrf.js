const crypto = require('crypto');

const csrfTokens = new Map();

const generateCSRFToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

const csrfProtection = (req, res, next) => {
    if (process.env.NODE_ENV === 'test') {
        return next();
    }
    if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') {
        return next();
    }

    const token = req.headers['x-csrf-token'] || req.body._csrf;
    const sessionId = req.headers.authorization?.split(' ')[1];

    if (!token || !sessionId || !csrfTokens.has(sessionId) || csrfTokens.get(sessionId) !== token) {
        return res.status(403).json({ error: 'Invalid CSRF token' });
    }

    next();
};

const generateCSRFMiddleware = (req, res, next) => {
    const sessionId = req.headers.authorization?.split(' ')[1];
    if (sessionId) {
        const token = generateCSRFToken();
        csrfTokens.set(sessionId, token);
        res.locals.csrfToken = token;
    }
    next();
};

module.exports = { csrfProtection, generateCSRFMiddleware };