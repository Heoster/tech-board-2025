const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const path = require('path');
const database = require('./config/database');
const compressionMiddleware = require('./middleware/compression');
const { questionCacheMiddleware, studentCacheMiddleware, apiCacheMiddleware, invalidateCache, getCacheStats } = require('./middleware/cache');
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
app.use(helmet());
app.use(compressionMiddleware);
app.use(cookieParser());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: { error: 'Too many requests' }
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

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Production monitoring
if (process.env.NODE_ENV === 'production') {
    app.use(monitor.middleware());
}

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', authenticateToken, requireAdmin, csrfProtection, require('./routes/admin'));
app.use('/api/quiz', authenticateToken, csrfProtection, questionCacheMiddleware, require('./routes/quiz'));
app.use('/api/students', authenticateToken, requireAdmin, studentCacheMiddleware, require('./routes/students'));
app.use('/api/performance', apiCacheMiddleware, require('./routes/performance'));

// Serve static files from React build
if (process.env.NODE_ENV === 'production') {
    const clientDistPath = path.join(__dirname, 'public');
    
    // Serve static assets with aggressive caching
    app.use('/assets', express.static(path.join(clientDistPath, 'assets'), {
        maxAge: '1y', // 1 year for hashed assets
        etag: true,
        lastModified: true,
        immutable: true
    }));
    
    // Serve other static files with shorter cache
    app.use(express.static(clientDistPath, {
        maxAge: '1h', // 1 hour for HTML and other files
        etag: true,
        lastModified: true,
        setHeaders: (res, filePath) => {
            // Set correct MIME types and security headers
            if (filePath.endsWith('.css')) {
                res.setHeader('Content-Type', 'text/css');
            } else if (filePath.endsWith('.js')) {
                res.setHeader('Content-Type', 'application/javascript');
            } else if (filePath.endsWith('.json')) {
                res.setHeader('Content-Type', 'application/json');
            } else if (filePath.endsWith('.svg')) {
                res.setHeader('Content-Type', 'image/svg+xml');
            } else if (filePath.endsWith('.html')) {
                res.setHeader('Cache-Control', 'no-cache');
            }
            
            // Security headers for all static files
            res.setHeader('X-Content-Type-Options', 'nosniff');
        }
    }));
    
    // Catch-all handler for SPA routing
    app.get('*', (req, res) => {
        // Don't serve index.html for API routes
        if (req.path.startsWith('/api/')) {
            return res.status(404).json({ error: 'API endpoint not found' });
        }
        
        res.sendFile(path.join(clientDistPath, 'index.html'), {
            headers: {
                'Cache-Control': 'no-cache'
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

// Serve React app for all non-API routes (SPA routing)
app.get('*', (req, res) => {
    // Don't serve React app for API routes
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'Route not found' });
    }
    
    // Serve React app
    if (process.env.NODE_ENV === 'production') {
        const indexPath = path.join(__dirname, 'public', 'index.html');
        const fs = require('fs');
        
        // Check if React build exists
        if (fs.existsSync(indexPath)) {
            res.sendFile(indexPath);
        } else {
            res.status(404).send('Frontend not built');
        }
    } else {
        // Development mode - show API info
        res.send(`
            <html>
                <head>
                    <title>TECH BOARD 2025 MCQ System</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 40px; }
                        .container { max-width: 600px; margin: 0 auto; }
                        .status { background: #f0f8ff; padding: 20px; border-radius: 8px; }
                        .api-link { color: #0066cc; text-decoration: none; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>🎓 TECH BOARD 2025 MCQ Testing System</h1>
                        <div class="status">
                            <h2>✅ Server is Running</h2>
                            <p>The backend API is operational and ready to serve requests.</p>
                            <p><strong>API Health Check:</strong> <a href="/api/health" class="api-link">/api/health</a></p>
                            <p><strong>Performance Metrics:</strong> <a href="/api/performance/health" class="api-link">/api/performance/health</a></p>
                        </div>
                        <h3>📊 Features Available:</h3>
                        <ul>
                            <li>✅ Student Authentication</li>
                            <li>✅ Admin Panel</li>
                            <li>✅ Quiz Management</li>
                            <li>✅ Performance Monitoring</li>
                            <li>✅ SEO Optimization</li>
                            <li>✅ Core Web Vitals Tracking</li>
                        </ul>
                        <p><em>Development mode - Frontend should run separately on port 3000</em></p>
                    </div>
                </body>
            </html>
        `);
    }
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
                    const { setupProductionDatabase } = require('./scripts/production-db-setup');
                    await setupProductionDatabase();
                    console.log('✅ Production database setup completed');
                    
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

// Health monitoring
setInterval(async () => {
    try {
        const health = await database.healthCheck();
        if (!health.healthy) {
            console.error('Database health check failed:', health.error);
        }
    } catch (error) {
        console.error('Health monitoring error:', error.message);
    }
}, 60000); // Check every minute

startServer();

module.exports = app;