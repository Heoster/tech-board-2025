const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const path = require('path');
const database = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Security middleware
app.use(helmet());
app.use(compression());
app.use(cookieParser());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: 'Too many requests' }
});
app.use('/api/', limiter);

// CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN || ['http://localhost:3000', 'https://tech-board.up.railway.app'],
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/quiz', require('./routes/quiz'));
app.use('/api/students', require('./routes/students'));
app.use('/api/performance', require('./routes/performance'));

// Serve static files from React build
const clientDistPath = path.join(__dirname, 'client/dist');
app.use(express.static(clientDistPath));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        features: {
            authentication: 'Available',
            quizSystem: 'Available', 
            adminPanel: 'Available',
            performanceMonitoring: 'Available',
            seoOptimization: 'Available'
        }
    });
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
            performance: '/api/performance/*'
        },
        features: [
            'Student Authentication',
            'Admin Panel',
            'Quiz Management', 
            'Performance Monitoring',
            'SEO Optimization',
            'Core Web Vitals Tracking'
        ]
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        ...(process.env.NODE_ENV !== 'production' && { details: err.message })
    });
});

// Serve React app for all non-API routes (SPA routing)
app.get('*', (req, res) => {
    // Don't serve React app for API routes
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'Route not found' });
    }
    
    // Serve React app
    const indexPath = path.join(clientDistPath, 'index.html');
    const fs = require('fs');
    
    // Check if React build exists
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        // Fallback HTML if React build is not available
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
                        <p><em>Frontend React app will be served when built and deployed.</em></p>
                    </div>
                </body>
            </html>
        `);
    }
});

// Start server
async function startServer() {
    try {
        await database.connect();
        console.log('Database connected successfully');
        
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();

module.exports = app;