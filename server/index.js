const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const path = require('path');
const mime = require('mime');
const database = require('./config/database');
const compressionMiddleware = require('./middleware/compression');
const { questionCacheMiddleware, studentCacheMiddleware, apiCacheMiddleware, invalidateCache, getCacheStats } = require('./middleware/cache');
const { csrfProtection, generateCSRFMiddleware } = require('./middleware/csrf');
const { authenticateToken, requireAdmin } = require('./middleware/auth');
const { sanitizeForLog } = require('./utils/sanitizer');
const securityMiddleware = require('./middleware/security');
const monitor = require('./monitoring');

// Load environment variables based on NODE_ENV
if (process.env.NODE_ENV === 'production' && !process.env.DISABLE_MONITORING) {
    require('dotenv').config({ path: '.env.production' });
} else {
    require('dotenv').config();
}

const app = express();
const PORT = process.env.PORT || 8000;

// Trust proxy for Railway deployment
app.set('trust proxy', 1);

// Enhanced security middleware
app.use(helmet({
    contentSecurityPolicy: false, // We'll handle this in our custom middleware
    crossOriginEmbedderPolicy: false
}));
app.use(securityMiddleware.securityHeaders);
app.use(securityMiddleware.sanitizeInput);
app.use(securityMiddleware.validateRequest);
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
// Apply different rate limits to different endpoints - Railway optimized
app.use('/api/', securityMiddleware.generalLimiter);
app.use('/api/auth/admin', securityMiddleware.adminLimiter);
app.use('/api/auth', securityMiddleware.authLimiter);
app.use('/api/quiz', securityMiddleware.quizLimiter);

// Railway-specific middleware
app.use((req, res, next) => {
    // Add Railway-specific headers
    res.setHeader('X-Powered-By', 'TechBoard 2025');
    res.setHeader('X-Railway-Environment', process.env.RAILWAY_ENVIRONMENT || 'production');

    // Handle Railway health checks
    if (req.path === '/' && req.headers['user-agent']?.includes('Railway')) {
        return res.redirect('/health');
    }

    next();
});

// CORS - Railway optimized
const allowedOrigins = process.env.NODE_ENV === 'production'
    ? [
        'https://tech-board.up.railway.app',
        process.env.CORS_ORIGIN,
        process.env.RAILWAY_STATIC_URL
    ].filter(Boolean)
    : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, etc.)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        // In production, be more strict
        if (process.env.NODE_ENV === 'production') {
            return callback(new Error('Not allowed by CORS'));
        }

        // In development, allow all
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json({
    limit: process.env.MAX_REQUEST_SIZE || '10mb',
    strict: true
}));
app.use(express.urlencoded({
    extended: true,
    limit: process.env.MAX_REQUEST_SIZE || '10mb'
}));

// Health check endpoint - Railway optimized
app.get('/health', async (req, res) => {
    try {
        const dbHealth = await database.healthCheck();
        const memoryUsage = process.memoryUsage();
        const uptime = process.uptime();

        // Check static files (more lenient for test environment)
        const staticFilesExist = process.env.NODE_ENV === 'test' ? true : 
                                 fs.existsSync(path.join(__dirname, 'client/index.html')) || 
                                 fs.existsSync(path.join(__dirname, 'public/index.html'));

        const healthData = {
            status: 'healthy',
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

        res.json(healthData);
    } catch (error) {
        res.status(503).json({
            status: 'unhealthy',
            error: error.message,
            timestamp: new Date().toISOString(),
            platform: 'Railway'
        });
    }
});

// Production monitoring
if (process.env.NODE_ENV === 'production') {
    app.use(monitor.middleware());
}

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', authenticateToken, requireAdmin, csrfProtection, require('./routes/admin'));
app.use('/api/quiz', authenticateToken, csrfProtection, questionCacheMiddleware, require('./routes/quiz'));
app.use('/api/students', authenticateToken, studentCacheMiddleware, require('./routes/students'));
app.use('/api/performance', apiCacheMiddleware, require('./routes/performance'));

// Serve static files from React build
if (process.env.NODE_ENV === 'production') {
    const clientDistPath = path.join(__dirname, 'public');

    // Enhanced MIME type configuration
    const setMimeType = (res, filePath) => {
        const ext = path.extname(filePath).toLowerCase();
        let mimeType = mime.getType(filePath);

        // Override specific MIME types for better compatibility
        const mimeOverrides = {
            '.css': 'text/css; charset=utf-8',
            '.js': 'application/javascript; charset=utf-8',
            '.mjs': 'application/javascript; charset=utf-8',
            '.json': 'application/json; charset=utf-8',
            '.svg': 'image/svg+xml; charset=utf-8',
            '.html': 'text/html; charset=utf-8',
            '.txt': 'text/plain; charset=utf-8',
            '.xml': 'application/xml; charset=utf-8'
        };

        if (mimeOverrides[ext]) {
            mimeType = mimeOverrides[ext];
        } else if (mimeType && (ext === '.css' || ext === '.js' || ext === '.html' || ext === '.json' || ext === '.xml' || ext === '.txt')) {
            mimeType += '; charset=utf-8';
        }

        if (mimeType) {
            res.setHeader('Content-Type', mimeType);
        }

        // Security headers for all static files
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
    };

    // Serve CSS files with explicit MIME type
    app.use('/assets/css', express.static(path.join(clientDistPath, 'assets/css'), {
        maxAge: '1y',
        etag: true,
        lastModified: true,
        immutable: true,
        setHeaders: (res, filePath) => {
            res.setHeader('Content-Type', 'text/css; charset=utf-8');
            res.setHeader('X-Content-Type-Options', 'nosniff');
        }
    }));

    // Serve JS files with explicit MIME type
    app.use('/assets', express.static(path.join(clientDistPath, 'assets'), {
        maxAge: '1y',
        etag: true,
        lastModified: true,
        immutable: true,
        setHeaders: (res, filePath) => {
            setMimeType(res, filePath);
            if (filePath.endsWith('.js')) {
                res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
            }
        }
    }));

    // Serve other static files - Railway optimized
    app.use(express.static(clientDistPath, {
        maxAge: process.env.NODE_ENV === 'production' ? '1d' : '1h', // Railway: 1 day cache
        etag: true,
        lastModified: true,
        index: ['index.html'],
        setHeaders: (res, filePath) => {
            setMimeType(res, filePath);

            // Railway-specific headers
            res.setHeader('X-Served-By', 'TechBoard-Railway');
            res.setHeader('X-Railway-Environment', process.env.RAILWAY_ENVIRONMENT || 'production');

            if (filePath.endsWith('.html')) {
                res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
                res.setHeader('Pragma', 'no-cache');
                res.setHeader('Expires', '0');
            } else if (filePath.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$/)) {
                // Railway: Better caching for assets
                res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
            }
        }
    }));

    // Catch-all handler for SPA routing
    app.get('*', (req, res) => {
        // Don't serve index.html for API routes
        if (req.path.startsWith('/api/')) {
            return res.status(404).json({ error: 'API endpoint not found' });
        }

        // Don't serve index.html for asset requests
        if (req.path.startsWith('/assets/') ||
            req.path.endsWith('.css') ||
            req.path.endsWith('.js') ||
            req.path.endsWith('.svg') ||
            req.path.endsWith('.png') ||
            req.path.endsWith('.jpg') ||
            req.path.endsWith('.ico')) {
            return res.status(404).send('Asset not found');
        }

        res.sendFile(path.join(clientDistPath, 'index.html'), {
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
    });
}

// Health check
app.get('/api/health', async (req, res) => {
    try {
        // Check database connection
        const dbHealth = await database.healthCheck();

        // Check question counts
        const db = database.getDb();
        const questionCounts = await new Promise((resolve, reject) => {
            db.all(`
                SELECT grade, COUNT(*) as count
                FROM questions 
                GROUP BY grade 
                ORDER BY grade
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        const totalQuestions = questionCounts.reduce((sum, row) => sum + row.count, 0);
        const gradesReady = questionCounts.filter(row => row.count >= 300).length;

        // Check admin and student counts
        const adminCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM admins', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        const studentCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM students', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        res.json({
            status: 'OK',
            message: 'Server is running',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'development',
            version: '1.0.0',
            database: {
                connected: dbHealth.healthy,
                responseTime: dbHealth.responseTime || 0
            },
            questions: {
                total: totalQuestions,
                gradesReady: gradesReady,
                target: 1500,
                status: totalQuestions >= 1500 ? 'Ready' : 'Seeding',
                byGrade: questionCounts
            },
            users: {
                admins: adminCount,
                students: studentCount
            },
            features: {
                authentication: 'Available',
                quizSystem: 'Available',
                adminPanel: 'Available',
                performanceMonitoring: 'Available',
                seoOptimization: 'Available'
            },
            loginTest: {
                adminCredentials: 'username: admin, password: admin123',
                testStudentCredentials: 'roll: 79, grade: 6, section: A, password: password123'
            }
        });
    } catch (error) {
        res.status(503).json({
            status: 'ERROR',
            message: 'Health check failed',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// Cache management endpoints
app.get('/api/cache/stats', (req, res) => {
    const stats = getCacheStats();
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        cache: stats,
        totalKeys: Object.values(stats).reduce((sum, cache) => sum + cache.keys, 0),
        averageHitRate: Object.values(stats).reduce((sum, cache) => sum + cache.hitRate, 0) / Object.keys(stats).length
    });
});

app.post('/api/cache/invalidate', authenticateToken, requireAdmin, csrfProtection, (req, res) => {
    const { type, pattern } = req.body;

    try {
        switch (type) {
            case 'questions':
                invalidateCache.questions(pattern);
                break;
            case 'students':
                invalidateCache.student(pattern);
                break;
            case 'api':
                invalidateCache.api(pattern);
                break;
            case 'all':
                invalidateCache.all();
                break;
            default:
                return res.status(400).json({ error: 'Invalid cache type' });
        }

        res.json({
            status: 'OK',
            message: `Cache invalidated for type: ${type}`,
            pattern: pattern || 'all',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            error: 'Cache invalidation failed',
            details: error.message
        });
    }
});

// Monitoring stats endpoint
app.get('/api/monitoring/stats', authenticateToken, requireAdmin, (req, res) => {
    try {
        const stats = monitor.getStats();
        res.json({
            status: 'OK',
            timestamp: new Date().toISOString(),
            server: stats
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to get monitoring stats',
            details: error.message
        });
    }
});

// API info endpoint
app.get('/api', (req, res) => {
    res.json({
        name: 'TECH BOARD 2025 MCQ Testing System API',
        version: '1.0.0',
        status: 'operational',
        endpoints: {
            health: '/api/health',
            auth: '/api/auth/*',
            admin: '/api/admin/*',
            quiz: '/api/quiz/*',
            students: '/api/students/*',
            performance: '/api/performance/*',
            cache: '/api/cache/*',
            monitoring: '/api/monitoring/*'
        },
        features: [
            'Student Authentication',
            'Admin Panel',
            'Quiz Management',
            'Performance Monitoring',
            'SEO Optimization',
            'Core Web Vitals Tracking',
            'Response Compression',
            'API Response Caching',
            'Production Monitoring'
        ]
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Server error:', sanitizeForLog(err.message));
    res.status(500).json({
        error: 'Something went wrong!',
        ...(process.env.NODE_ENV !== 'production' && { details: sanitizeForLog(err.message) })
    });
});



// Global error handlers for production stability
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    console.error('Stack:', error.stack);
    // Graceful shutdown
    gracefulShutdown('uncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Graceful shutdown
    gracefulShutdown('unhandledRejection');
});

process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    gracefulShutdown('SIGTERM');
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    gracefulShutdown('SIGINT');
});

let server;
let isShuttingDown = false;

// Graceful shutdown function
async function gracefulShutdown(signal) {
    if (isShuttingDown) return;
    isShuttingDown = true;

    console.log(`Received ${signal}, starting graceful shutdown...`);

    // Stop accepting new connections
    if (server) {
        server.close(async () => {
            console.log('HTTP server closed');

            try {
                // Close database connection
                await database.close();
                console.log('Database connection closed');

                console.log('Graceful shutdown completed');
                process.exit(0);
            } catch (error) {
                console.error('Error during shutdown:', error);
                process.exit(1);
            }
        });

        // Force shutdown after 30 seconds
        setTimeout(() => {
            console.error('Forced shutdown after timeout');
            process.exit(1);
        }, 30000);
    } else {
        process.exit(0);
    }
}

// Enhanced startup with retry logic
async function startServer() {
    let retries = 3;

    while (retries > 0) {
        try {
            console.log(`Starting server (attempt ${4 - retries}/3)...`);

            // Connect to database with retry
            await database.connect();
            console.log('✅ Database connected successfully');

            // Setup production database
            if (process.env.NODE_ENV === 'production') {
                try {
                    // Check if production setup script exists
                    const setupPath = './scripts/production-db-setup';
                    try {
                        const { setupProductionDatabase } = require(setupPath);
                        await setupProductionDatabase();
                        console.log('✅ Production database setup completed');
                    } catch (requireError) {
                        console.log('⚠️ Production setup script not found, using basic setup');
                    }

                    // Ensure admin exists
                    const db = database.getDb();
                    const admin = await new Promise((resolve, reject) => {
                        db.get('SELECT * FROM admins WHERE username = ?', ['admin'], (err, row) => {
                            if (err) reject(err);
                            else resolve(row);
                        });
                    });

                    if (!admin) {
                        console.log('Creating admin user...');
                        const bcrypt = require('bcrypt');
                        const hashedPassword = await bcrypt.hash('admin123', 10);
                        await new Promise((resolve, reject) => {
                            db.run('INSERT INTO admins (username, password) VALUES (?, ?)', ['admin', hashedPassword], (err) => {
                                if (err) reject(err);
                                else resolve();
                            });
                        });
                    }

                    console.log('✅ Admin user verified');
                } catch (error) {
                    console.log('⚠️ Schema setup failed:', error.message);
                }
            }

            // Start HTTP server
            server = app.listen(PORT, '0.0.0.0', () => {
                console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
                console.log('🔐 Admin credentials: username=admin, password=admin123');
                console.log('🌐 Health check: http://localhost:' + PORT + '/api/health');
                console.log('✅ Server startup completed successfully');
            });

            // Server error handling
            server.on('error', (error) => {
                if (error.code === 'EADDRINUSE') {
                    console.error(`Port ${PORT} is already in use`);
                    process.exit(1);
                } else {
                    console.error('Server error:', error);
                }
            });

            // Set server timeout
            server.timeout = 120000; // 2 minutes
            server.keepAliveTimeout = 65000; // 65 seconds
            server.headersTimeout = 66000; // 66 seconds

            break; // Success, exit retry loop

        } catch (error) {
            console.error(`Server startup failed (attempt ${4 - retries}/3):`, error.message);
            retries--;

            if (retries === 0) {
                console.error('❌ All startup attempts failed');
                process.exit(1);
            }

            console.log(`Retrying in 5 seconds... (${retries} attempts left)`);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}

// Health monitoring - only in production
let healthCheckInterval;
if (process.env.NODE_ENV === 'production') {
    healthCheckInterval = setInterval(async () => {
        try {
            const health = await database.healthCheck();
            if (!health.healthy) {
                console.error('Database health check failed:', health.error);
            }
        } catch (error) {
            console.error('Health monitoring error:', error.message);
        }
    }, 60000); // Check every minute
}

// Cleanup function for tests
function cleanup() {
    if (healthCheckInterval) {
        clearInterval(healthCheckInterval);
    }
    if (monitor && monitor.cleanup) {
        monitor.cleanup();
    }
}

module.exports = app;
module.exports.startServer = startServer;
module.exports.cleanup = cleanup;