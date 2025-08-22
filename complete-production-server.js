#!/usr/bin/env node

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const net = require('net');
require('dotenv').config();

const app = express();

console.log('🚀 Starting Tech Board 2025 Production Server...');

// Function to check if port is available
function checkPort(port) {
    return new Promise((resolve) => {
        const server = net.createServer();
        server.listen(port, () => {
            server.close();
            resolve(true);
        });
        server.on('error', () => {
            resolve(false);
        });
    });
}

// Function to find available port
async function findAvailablePort(startPort = 8000) {
    for (let port = startPort; port <= startPort + 10; port++) {
        if (await checkPort(port)) {
            return port;
        }
    }
    throw new Error('No available ports found');
}

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'https://tech-board.up.railway.app',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Load existing API routes if available
try {
    if (fs.existsSync('./server/routes/auth.js')) {
        app.use('/api/auth', require('./server/routes/auth'));
    }
    if (fs.existsSync('./server/routes/admin.js')) {
        app.use('/api/admin', require('./server/routes/admin'));
    }
    if (fs.existsSync('./server/routes/quiz.js')) {
        app.use('/api/quiz', require('./server/routes/quiz'));
    }
    console.log('✅ API routes loaded');
} catch (error) {
    console.warn('⚠️ Using fallback API');
    app.use('/api/*', (req, res) => {
        res.json({ message: 'API initializing', endpoint: req.path });
    });
}

// Serve static files
const staticPaths = [
    path.join(__dirname, 'server', 'public'),
    path.join(__dirname, 'client', 'dist')
];

let staticPath = staticPaths.find(p => fs.existsSync(p));
if (staticPath) {
    app.use(express.static(staticPath));
    console.log(`📁 Serving static files from: ${staticPath}`);
}

// Handle React Router
app.get('*', (req, res) => {
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'API endpoint not found' });
    }
    
    const indexPath = staticPath ? path.join(staticPath, 'index.html') : null;
    if (indexPath && fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.json({ message: 'Tech Board 2025 Server Running', status: 'frontend-building' });
    }
});

// Start server with port availability check
async function startServer() {
    try {
        const PORT = await findAvailablePort(process.env.PORT || 8000);
        
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`🎉 Server running on port ${PORT}`);
            console.log(`🌐 Access: http://localhost:${PORT}`);
            console.log(`🏥 Health: http://localhost:${PORT}/health`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
}

startServer();

module.exports = app;
