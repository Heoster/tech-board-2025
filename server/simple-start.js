#!/usr/bin/env node

// Load Railway environment configuration
require('dotenv').config({ path: '.env.railway' });

// Ultra-simple Railway startup - just start the server
console.log('🚀 Starting MCQ Testing System (Railway Production Mode)...');
console.log('🌐 Environment:', process.env.NODE_ENV);
console.log('🔗 Railway URL: https://tech-board.up.railway.app');
console.log('📁 Frontend URL:', process.env.FRONTEND_URL);

// Ensure production environment
process.env.NODE_ENV = 'production';

// Check if client build exists
const fs = require('fs');
const path = require('path');
const clientDistPath = path.join(__dirname, '../client/dist');

if (fs.existsSync(clientDistPath)) {
    console.log('✅ Client build found at:', clientDistPath);
    const indexPath = path.join(clientDistPath, 'index.html');
    if (fs.existsSync(indexPath)) {
        console.log('✅ Client index.html found');
    } else {
        console.error('❌ Client index.html NOT found!');
    }
} else {
    console.error('❌ Client build directory NOT found!');
    console.error('   Expected at:', clientDistPath);
}

// Start the server immediately
console.log('🚀 Starting Express server...');
require('./index.js');

console.log('✅ Server startup complete - Railway healthcheck should pass now');