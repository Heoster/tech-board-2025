#!/usr/bin/env node

console.log('🚂 STARTING RAILWAY SERVER...');
console.log('Node version:', process.version);
console.log('Environment:', process.env.NODE_ENV);
console.log('Port:', process.env.PORT);

try {
    const express = require('express');
    console.log('✅ Express loaded');
    
    const app = express();
    const PORT = process.env.PORT || 8000;
    
    console.log('🔧 Setting up routes...');
    
    // Health endpoint - MUST respond quickly
    app.get('/health', (req, res) => {
        console.log('🏥 Health check requested');
        res.status(200).json({ 
            status: 'healthy', 
            timestamp: new Date().toISOString(),
            port: PORT,
            uptime: process.uptime()
        });
    });
    
    app.get('/api/health', (req, res) => {
        console.log('🏥 API health check requested');
        res.status(200).json({ 
            status: 'OK', 
            timestamp: new Date().toISOString(),
            service: 'tech-board-2025'
        });
    });
    
    app.get('/', (req, res) => {
        res.status(200).json({ 
            message: 'Tech Board 2025 - Railway Server Running',
            health: '/health',
            api: '/api/health'
        });
    });
    
    app.get('*', (req, res) => {
        res.status(200).json({ 
            message: 'Tech Board 2025 Server',
            path: req.path,
            health: '/health'
        });
    });
    
    console.log('🚀 Starting server...');
    
    // Start server with error handling
    const server = app.listen(PORT, '0.0.0.0', () => {
        console.log(`✅ SERVER RUNNING ON PORT ${PORT}`);
        console.log(`🏥 Health check: http://localhost:${PORT}/health`);
        console.log(`🌐 Server ready for Railway health checks`);
    });
    
    server.on('error', (error) => {
        console.error('❌ SERVER ERROR:', error);
        process.exit(1);
    });
    
    // Graceful shutdown
    process.on('SIGTERM', () => {
        console.log('🛑 SIGTERM received, shutting down...');
        server.close(() => {
            console.log('✅ Server closed');
            process.exit(0);
        });
    });
    
    process.on('SIGINT', () => {
        console.log('🛑 SIGINT received, shutting down...');
        server.close(() => {
            console.log('✅ Server closed');
            process.exit(0);
        });
    });
    
    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
        console.error('❌ UNCAUGHT EXCEPTION:', error);
        process.exit(1);
    });
    
    process.on('unhandledRejection', (reason, promise) => {
        console.error('❌ UNHANDLED REJECTION:', reason);
        process.exit(1);
    });
    
} catch (error) {
    console.error('❌ STARTUP ERROR:', error);
    process.exit(1);
}