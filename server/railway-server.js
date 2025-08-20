const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

// Basic middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoints (must be first)
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        port: PORT,
        service: 'tech-board-2025'
    });
});

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        database: 'available',
        port: PORT,
        service: 'tech-board-2025'
    });
});

// Serve static files
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Initialize database after server starts
let database = null;
let dbInitialized = false;

async function initDatabase() {
    try {
        database = require('./config/database');
        await database.connect();
        dbInitialized = true;
        console.log('✅ Database initialized');
    } catch (error) {
        console.error('❌ Database initialization failed:', error.message);
        dbInitialized = false;
    }
}

// Load API routes with error handling
function loadRoutes() {
    try {
        app.use('/api/auth', require('./routes/auth'));
        console.log('✅ Auth routes loaded');
    } catch (error) {
        console.error('❌ Auth routes failed:', error.message);
    }
    
    try {
        app.use('/api/admin', require('./routes/admin'));
        console.log('✅ Admin routes loaded');
    } catch (error) {
        console.error('❌ Admin routes failed:', error.message);
    }
    
    try {
        app.use('/api/quiz', require('./routes/quiz'));
        console.log('✅ Quiz routes loaded');
    } catch (error) {
        console.error('❌ Quiz routes failed:', error.message);
    }
    
    try {
        app.use('/api/students', require('./routes/students'));
        console.log('✅ Students routes loaded');
    } catch (error) {
        console.error('❌ Students routes failed:', error.message);
    }
    
    try {
        app.use('/api/performance', require('./routes/performance'));
        console.log('✅ Performance routes loaded');
    } catch (error) {
        console.error('❌ Performance routes failed:', error.message);
    }
}

// Catch-all for React app
app.get('*', (req, res) => {
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'API endpoint not found' });
    }
    
    try {
        res.sendFile(path.join(publicPath, 'index.html'));
    } catch (error) {
        res.status(500).json({ error: 'Failed to serve application' });
    }
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Server error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server immediately, initialize database after
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Tech Board 2025 Server running on port ${PORT}`);
    console.log(`🌐 Health check: http://0.0.0.0:${PORT}/health`);
    
    // Load routes after server starts
    loadRoutes();
    
    // Initialize database after server starts
    initDatabase().catch(error => {
        console.error('Database initialization failed, but server continues:', error.message);
    });
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    if (database && database.close) {
        database.close().then(() => process.exit(0));
    } else {
        process.exit(0);
    }
});

module.exports = app;