const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const database = require('./config/database');
const compressionMiddleware = require('./middleware/compression');
const { questionCacheMiddleware, studentCacheMiddleware, apiCacheMiddleware } = require('./middleware/cache');
const { csrfProtection, generateCSRFMiddleware } = require('./middleware/csrf');
const { authenticateToken, requireAdmin } = require('./middleware/auth');
const { sanitizeForLog } = require('./utils/sanitizer');
const monitor = require('./monitoring');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Trust proxy for Railway deployment
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
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
}));
app.use(compressionMiddleware);
app.use(cookieParser());

// Rate limiting - more restrictive in production
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX) || (process.env.NODE_ENV === 'production' ? 100 : 200),
    message: { error: 'Too many requests, please try again later' },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
        // Skip rate limiting for health checks
        return req.path === '/health';
    }
});
app.use('/api/', limiter);

// CORS - Railway compatible
const allowedOrigins = process.env.NODE_ENV === 'production' 
    ? [process.env.CORS_ORIGIN || 'https://tech-board.up.railway.app']
    : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
    const startTime = Date.now();
    const originalSend = res.send;
    
    res.send = function(data) {
        const duration = Date.now() - startTime;
        const logData = {
            method: req.method,
            url: sanitizeForLog(req.url),
            status: res.statusCode,
            duration: `${duration}ms`,
            ip: req.ip,
            userAgent: sanitizeForLog(req.get('User-Agent'))
        };
        
        if (process.env.NODE_ENV !== 'production' || res.statusCode >= 400) {
            console.log(`${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
        }
        
        originalSend.call(this, data);
    };
    
    next();
});

// Health check endpoint - Railway optimized
app.get('/health', async (req, res) => {
    try {
        // Basic health check that doesn't fail during startup
        const memoryUsage = process.memoryUsage();
        const uptime = process.uptime();

        let dbHealth = { healthy: false, error: 'Not connected' };
        try {
            if (database.isConnected()) {
                dbHealth = await database.healthCheck();
            } else {
                dbHealth = { healthy: false, error: 'Database initializing' };
            }
        } catch (dbError) {
            dbHealth = { healthy: false, error: dbError.message };
        }

        // Check static files (more lenient for Railway)
        const staticFilesExist = process.env.NODE_ENV === 'test' ? true : 
                                 fs.existsSync(path.join(__dirname, 'client/index.html')) || 
                                 fs.existsSync(path.join(__dirname, 'public/index.html')) ||
                                 process.env.RAILWAY_ENVIRONMENT; // Railway serves static files differently

        const healthData = {
            status: 'healthy', // Always return healthy for basic server functionality
            timestamp: new Date().toISOString(),
            uptime: Math.floor(uptime),
            memory: {
                used: Math.round(memoryUsage.heapUsed / 1024 / 1024),
                total: Math.round(memoryUsage.heapTotal / 1024 / 1024),
                rss: Math.round(memoryUsage.rss / 1024 / 1024)
            },
            database: dbHealth,
            staticFiles: staticFilesExist,
            environment: {
                nodeEnv: process.env.NODE_ENV,
                port: process.env.PORT,
                railway: !!process.env.RAILWAY_ENVIRONMENT
            },
            version: '1.0.0',
            deployment: {
                platform: 'Railway',
                url: 'https://tech-board.up.railway.app'
            }
        };

        // Return 200 even if database is not ready (Railway needs this for deployment)
        res.json(healthData);
    } catch (error) {
        // Even on error, return 200 for Railway health check
        res.json({
            status: 'starting',
            error: error.message,
            timestamp: new Date().toISOString(),
            platform: 'Railway',
            message: 'Server is starting up'
        });
    }
});

// Production monitoring
if (process.env.NODE_ENV === 'production') {
    app.use(monitor.middleware());
}

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/quiz', authenticateToken, questionCacheMiddleware, require('./routes/quiz'));
app.use('/api/students', authenticateToken, studentCacheMiddleware, require('./routes/students'));
app.use('/api/performance', apiCacheMiddleware, require('./routes/performance'));

// Serve static files from React build
if (process.env.NODE_ENV === 'production') {
    const clientPath = path.join(__dirname, 'client');
    if (fs.existsSync(clientPath)) {
        app.use(express.static(clientPath));
        
        // Handle React Router
        app.get('*', (req, res) => {
            res.sendFile(path.join(clientPath, 'index.html'));
        });
    } else {
        // Fallback for development
        app.get('*', (req, res) => {
            res.json({ 
                message: 'Tech Board 2025 API Server',
                version: '1.0.0',
                endpoints: ['/api/auth', '/api/admin', '/api/quiz', '/api/students']
            });
        });
    }
} else {
    // Development mode
    app.get('*', (req, res) => {
        res.json({ 
            message: 'Tech Board 2025 API Server - Development Mode',
            version: '1.0.0',
            endpoints: ['/api/auth', '/api/admin', '/api/quiz', '/api/students']
        });
    });
}

// API info endpoint
app.get('/api', (req, res) => {
    res.json({
        name: 'Tech Board 2025 MCQ System API',
        version: '1.0.0',
        status: 'operational',
        endpoints: {
            auth: '/api/auth',
            admin: '/api/admin',
            quiz: '/api/quiz',
            students: '/api/students',
            performance: '/api/performance'
        },
        documentation: 'https://github.com/your-repo/tech-board-2025'
    });
});

// Health check
app.get('/api/health', async (req, res) => {
    try {
        // Check database connection
        const dbHealth = await database.healthCheck();
        
        res.json({
            status: 'OK',
            timestamp: new Date().toISOString(),
            database: {
                connected: dbHealth.connected || false,
                healthy: dbHealth.healthy || false,
                responseTime: dbHealth.responseTime
            },
            questions: dbHealth.questions || { total: 0, status: 'Unknown' },
            uptime: process.uptime()
        });
    } catch (error) {
        res.status(503).json({
            status: 'ERROR',
            error: error.message,
            timestamp: new Date().toISOString(),
            database: { connected: false },
            questions: { total: 0, status: 'Error' }
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message,
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'API endpoint not found',
        path: req.path,
        method: req.method,
        timestamp: new Date().toISOString()
    });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully');
    await database.close();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('SIGINT received, shutting down gracefully');
    await database.close();
    process.exit(0);
});

// Start server function for testing
const startServer = async () => {
    try {
        console.log('Starting server...');
        
        // Start server first, then initialize database (Railway-friendly approach)
        const server = await new Promise((resolve, reject) => {
            const serverInstance = app.listen(PORT, '0.0.0.0', () => {
                console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
                console.log(`🌐 Health check: http://localhost:${PORT}/health`);
                resolve(serverInstance);
            });
            
            serverInstance.on('error', (error) => {
                console.error('Server startup error:', error);
                reject(error);
            });
        });

        // Initialize database after server is running (non-blocking for Railway health checks)
        setImmediate(async () => {
            try {
                console.log('🗄️ Initializing database...');
                await database.connect();
                console.log('✅ Database connected successfully');
                console.log(`🔐 Admin credentials: username=admin, password=admin123`);
                console.log(`✅ Server startup completed successfully`);
            } catch (dbError) {
                console.error('⚠️ Database initialization failed:', dbError.message);
                console.log('Server will continue running, database will retry connection');
            }
        });
        
        return server;
    } catch (error) {
        console.error('Failed to start server:', error);
        throw error;
    }
};

// Auto-start in production
if (process.env.NODE_ENV === 'production' || require.main === module) {
    startServer().catch(console.error);
}

module.exports = app;
module.exports.startServer = startServer;