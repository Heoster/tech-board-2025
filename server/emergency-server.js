#!/usr/bin/env node

console.log('🚨 EMERGENCY SERVER - Pure Node.js HTTP');
console.log('Node version:', process.version);
console.log('Port:', process.env.PORT || 8000);

const http = require('http');
const PORT = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
    console.log(`📥 ${req.method} ${req.url}`);
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');
    
    // Handle health check
    if (req.url === '/health' || req.url === '/api/health') {
        res.statusCode = 200;
        res.end(JSON.stringify({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            server: 'emergency-node-http',
            port: PORT,
            uptime: process.uptime()
        }));
        return;
    }
    
    // Handle root
    if (req.url === '/') {
        res.statusCode = 200;
        res.end(JSON.stringify({
            message: 'Tech Board 2025 - Emergency Server',
            health: '/health',
            status: 'running'
        }));
        return;
    }
    
    // Handle all other requests
    res.statusCode = 200;
    res.end(JSON.stringify({
        message: 'Tech Board 2025 Emergency Server',
        path: req.url,
        method: req.method,
        health: '/health'
    }));
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ EMERGENCY SERVER RUNNING ON PORT ${PORT}`);
    console.log(`🏥 Health check: http://localhost:${PORT}/health`);
    console.log(`🌐 Ready for Railway health checks`);
});

server.on('error', (error) => {
    console.error('❌ SERVER ERROR:', error);
    process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM - Shutting down...');
    server.close(() => process.exit(0));
});

process.on('SIGINT', () => {
    console.log('🛑 SIGINT - Shutting down...');
    server.close(() => process.exit(0));
});

console.log('🚨 Emergency server starting...');