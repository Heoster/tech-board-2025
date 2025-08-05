require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const database = require('./config/database');

const app = express();
const PORT = process.env.PORT || 8000;

// Security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? ['https://your-domain.com']
        : [
            'http://localhost:5173', 
            'http://localhost:5174', 
            'http://localhost:3000',
            'http://localhost:8000',
            'http://192.168.31.234:5173',
            'http://192.168.31.234:5174',
            'http://192.168.31.234:3000',
            'http://192.168.31.234:8000'
        ],
    credentials: true
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    if (req.method === 'POST' || req.method === 'PUT') {
        console.log('Request body:', JSON.stringify(req.body, null, 2));
    }
    next();
});

// Serve static files from client directory
app.use(express.static('../client'));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve the main HTML file for root route
app.get('/', (req, res) => {
    res.sendFile(require('path').join(__dirname, '../client/index.html'));
});

// API routes will be added here
app.use('/api/auth', require('./routes/auth'));
app.use('/api/students', require('./routes/students'));
app.use('/api/quiz', require('./routes/quiz'));
app.use('/api/admin', require('./routes/admin'));

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

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: {
            code: 'NOT_FOUND',
            message: 'Route not found'
        }
    });
});

// Start server
async function startServer() {
    try {
        await database.connect();
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Server running on http://192.168.31.234:${PORT}`);
            console.log(`🏠 Local access: http://localhost:${PORT}`);
            console.log(`🌐 Environment: ${process.env.NODE_ENV}`);
            console.log(`📡 API endpoints available at http://192.168.31.234:${PORT}/api`);
            console.log(`📋 Available routes:`);
            console.log(`   POST /api/auth/register - Student registration`);
            console.log(`   POST /api/auth/login - Student login`);
            console.log(`   POST /api/auth/admin/login - Admin login`);
            console.log(`   GET  /api/auth/verify - Token verification`);
            console.log(`   GET  /health - Health check`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
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
