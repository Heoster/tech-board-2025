require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const database = require('./config/database');
const logger = require('./utils/logger');
const securityMiddleware = require('./middleware/security');

const app = express();
const PORT = process.env.PORT || 8000;

// Trust proxy for Railway deployment
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1); // Trust first proxy (Railway)
    console.log('🔧 Proxy trust enabled for production deployment');
}

// Enhanced security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            scriptSrc: ["'self'"],
            objectSrc: ["'none'"],
            ...(process.env.NODE_ENV === 'production' && { upgradeInsecureRequests: [] }),
        },
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }
}));

app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? [
            'https://tech-board.up.railway.app',
            process.env.FRONTEND_URL || 'https://tech-board.up.railway.app'
          ]
        : [
            'http://localhost:5173',
            'http://localhost:5174',
            'http://localhost:3000',
            'http://127.0.0.1:5173',
            'http://127.0.0.1:5174',
            'http://127.0.0.1:3000'
        ],
    credentials: true,
    optionsSuccessStatus: 200,
    maxAge: 86400 // 24 hours
}));

// Apply additional security headers
app.use(securityMiddleware.securityHeaders);

// Apply general rate limiting
app.use(securityMiddleware.generalLimiter);

// Apply input sanitization and validation
app.use(securityMiddleware.sanitizeInput);
app.use(securityMiddleware.validateRequest);

// Body parsing middleware with enhanced security
app.use(express.json({
    limit: process.env.NODE_ENV === 'production' ? '1mb' : '10mb',
    strict: true,
    type: ['application/json']
}));
app.use(express.urlencoded({
    extended: false, // More secure - prevents prototype pollution
    limit: process.env.NODE_ENV === 'production' ? '1mb' : '10mb'
}));

// Enhanced request logging middleware
app.use((req, res, next) => {
    const startTime = Date.now();
    
    // Log the request
    logger.info(`${req.method} ${req.path}`, {
        method: req.method,
        url: req.originalUrl,
        path: req.path,
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        contentType: req.headers['content-type'],
        contentLength: req.headers['content-length'],
        userId: req.user?.id,
        userRole: req.user?.role
    });

    // Override res.end to log response
    const originalEnd = res.end;
    res.end = function(...args) {
        const responseTime = Date.now() - startTime;
        
        // Log the response
        logger.request(req, res, responseTime);
        
        // Log security events
        if (res.statusCode === 401 || res.statusCode === 403) {
            logger.security(`Authentication/Authorization failure`, {
                statusCode: res.statusCode,
                method: req.method,
                path: req.path,
                ip: req.ip,
                userAgent: req.headers['user-agent']
            });
        }
        
        originalEnd.apply(this, args);
    };

    next();
});

// Serve static files from client build in production
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    console.log('🌐 Serving static files from client/dist');
    app.use(express.static(path.join(__dirname, '../client/dist')));
}

// Multiple health check endpoints for Railway
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        server: 'running',
        environment: process.env.NODE_ENV || 'development'
    });
});

app.get('/healthz', (req, res) => {
    res.status(200).send('OK');
});

app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

// API health endpoints (for testing)
app.get('/api/healthz', (req, res) => {
    res.status(200).send('OK');
});

app.get('/api/ping', (req, res) => {
    res.status(200).send('pong');
});

app.get('/', (req, res) => {
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
        res.json({ 
            status: 'OK',
            message: 'TECH BOARD 2025 Server Running',
            timestamp: new Date().toISOString()
        });
    } else {
        res.send('TECH BOARD 2025 Server Running');
    }
});

// API health check with database fallback
app.get('/api/health', async (req, res) => {
    try {
        // Try to get database info, but don't fail if database isn't ready
        let dbStatus = 'Unknown';
        let questionCount = 0;
        
        try {
            const db = database.getDb();
            if (db) {
                const result = await new Promise((resolve, reject) => {
                    const timeout = setTimeout(() => reject(new Error('Database timeout')), 2000);
                    db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                        clearTimeout(timeout);
                        if (err) reject(err);
                        else resolve(row.count);
                    });
                });
                dbStatus = 'Connected';
                questionCount = result;
            }
        } catch (dbError) {
            dbStatus = 'Initializing';
        }

        res.json({
            status: 'OK',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'development',
            database: dbStatus,
            questionCount: questionCount,
            server: 'running',
            deployment: {
                platform: 'Railway',
                ready: true
            }
        });

    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            timestamp: new Date().toISOString(),
            error: error.message,
            database: 'Error'
        });
    }
});

// API routes with specific security middleware
app.use('/api/auth', securityMiddleware.authLimiter);
app.use('/api/auth/admin/login', securityMiddleware.adminLimiter);
app.use('/api/quiz', securityMiddleware.quizLimiter);

// Route handlers
app.use('/api/auth', require('./routes/auth'));
app.use('/api/students', require('./routes/students'));
app.use('/api/quiz', require('./routes/quiz'));
app.use('/api/admin', require('./routes/admin'));

// Serve React app for all non-API routes in production
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('*', (req, res) => {
        // Don't serve React app for API routes
        if (req.path.startsWith('/api/')) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: 'API route not found'
                }
            });
        }
        
        console.log(`🌐 Serving React app for route: ${req.path}`);
        const indexPath = path.join(__dirname, '../client/dist/index.html');
        
        // Check if index.html exists
        const fs = require('fs');
        if (fs.existsSync(indexPath)) {
            res.sendFile(indexPath);
        } else {
            console.error('❌ React build not found at:', indexPath);
            res.status(404).json({
                success: false,
                error: {
                    code: 'FRONTEND_NOT_BUILT',
                    message: 'Frontend application not built. Please run build process.'
                }
            });
        }
    });
}

// Enhanced error handling middleware
app.use((err, req, res, next) => {
    const errorId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    
    // Log the error with context
    logger.error('Unhandled application error', {
        errorId,
        error: err.message,
        stack: err.stack,
        method: req.method,
        path: req.path,
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        userId: req.user?.id
    });

    // Send sanitized error response
    res.status(err.status || 500).json({
        success: false,
        error: {
            code: err.code || 'INTERNAL_SERVER_ERROR',
            message: process.env.NODE_ENV === 'production'
                ? 'Something went wrong! Please try again.'
                : err.message,
            errorId: errorId // Helps with debugging
        }
    });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
    logger.warn('API endpoint not found', {
        method: req.method,
        path: req.path,
        ip: req.ip
    });
    
    res.status(404).json({
        success: false,
        error: {
            code: 'NOT_FOUND',
            message: 'API endpoint not found'
        }
    });
});

// This 404 handler is now handled in the catch-all route above for production

// Enhanced server startup
async function startServer() {
    const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';
    
    try {
        // Initialize database first
        logger.info('Initializing database connection...');
        await database.connect();
        logger.info('Database connected and initialized successfully');
        
        // Start server after database is ready
        const server = app.listen(PORT, host, () => {
            logger.info(`TECH BOARD 2025 Server started`, {
                host,
                port: PORT,
                environment: process.env.NODE_ENV,
                proxyTrust: app.get('trust proxy') ? 'enabled' : 'disabled',
                nodeVersion: process.version,
                pid: process.pid
            });
            
            if (process.env.NODE_ENV === 'production') {
                logger.info('Production server configuration', {
                    url: 'https://tech-board.up.railway.app',
                    apiBase: 'https://tech-board.up.railway.app/api'
                });
            }
            
            logger.info('Server ready for TECH BOARD 2025 Selection Test');
        });

        // Enhanced server error handling
        server.on('error', (error) => {
            logger.error('Server error', { error: error.message });
            process.exit(1);
        });

        // Graceful shutdown handling
        const gracefulShutdown = async (signal) => {
            logger.info(`Received ${signal}, shutting down gracefully`);
            
            server.close(async () => {
                logger.info('HTTP server closed');
                
                try {
                    await database.close();
                    logger.info('Database connection closed');
                } catch (error) {
                    logger.error('Error closing database', { error: error.message });
                }
                
                logger.info('Graceful shutdown completed');
                process.exit(0);
            });
        };

        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));

        return server;
        
    } catch (error) {
        logger.error('Failed to start server', { error: error.message });
        process.exit(1);
    }
}

// Start the server
startServer().catch(error => {
    logger.error('Server startup failed', { error: error.message });
    process.exit(1);
});

// Export app for testing
module.exports = app;
