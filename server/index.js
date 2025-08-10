require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const database = require('./config/database');

const app = express();
const PORT = process.env.PORT || 8000;

// Trust proxy for Railway deployment
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1); // Trust first proxy (Railway)
    console.log('🔧 Proxy trust enabled for production deployment');
}

// Security middleware
app.use(helmet());
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
    credentials: true
}));

// Rate limiting removed - unrestricted access
// If you need to reimpose limits later, you can configure them here

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Debug middleware to log all requests
app.use((req, res, next) => {
    const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path} from ${clientIP}`);
    
    // Log proxy headers in production for debugging
    if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-for']) {
        console.log(`   X-Forwarded-For: ${req.headers['x-forwarded-for']}`);
    }
    
    if (req.method === 'POST' || req.method === 'PUT') {
        console.log('Request body:', JSON.stringify(req.body, null, 2));
    }
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

// API routes will be added here
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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: {
            code: 'INTERNAL_SERVER_ERROR',
            message: process.env.NODE_ENV === 'production'
                ? 'Something went wrong!'
                : err.message
        }
    });
});

// This 404 handler is now handled in the catch-all route above for production

// Start server
async function startServer() {
    const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';
    
    // Start server first, then initialize database
    const server = app.listen(PORT, host, () => {
        console.log(`🚀 TECH BOARD 2025 Server running on ${host}:${PORT}`);
        console.log(`🌐 Environment: ${process.env.NODE_ENV}`);
        console.log(`🔧 Proxy trust: ${app.get('trust proxy') ? 'enabled' : 'disabled'}`);
        
        if (process.env.NODE_ENV === 'production') {
            console.log(`🌍 Production URL: https://tech-board.up.railway.app`);
            console.log(`📡 API Base: https://tech-board.up.railway.app/api`);
        } else {
            console.log(`📡 API endpoints available at http://${host}:${PORT}/api`);
        }
        
        console.log(`📋 Available routes:`);
        console.log(`   POST /api/auth/register - Student registration`);
        console.log(`   POST /api/auth/login - Student login`);
        console.log(`   POST /api/auth/admin/login - Admin login`);
        console.log(`   GET  /api/auth/verify - Token verification`);
        console.log(`   GET  /health - Health check`);
        console.log(`✅ Server ready for TECH BOARD 2025 Selection Test`);
    });

    // Initialize database in background
    try {
        console.log('🔧 Initializing database...');
        await database.connect();
        console.log('✅ Database connected successfully');
    } catch (error) {
        console.error('⚠️  Database initialization failed, but server is still running:', error.message);
        console.log('🔄 Database will retry connection on first request');
    }

    return server;
}

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await database.close();
    process.exit(0);
});

startServer();

// Export app for testing
module.exports = app;
