#!/usr/bin/env node

// Ultra-simple Railway startup - just start the server
console.log('🚀 Starting MCQ Testing System (Simple Mode)...');
console.log('🌐 Environment:', process.env.NODE_ENV);
console.log('🔗 Railway URL: https://tech-board.up.railway.app');

// Set production environment
process.env.NODE_ENV = 'production';

// Start the server immediately
console.log('🚀 Starting Express server...');
require('./index.js');

console.log('✅ Server startup complete - Railway healthcheck should pass now');