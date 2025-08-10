#!/usr/bin/env node

/**
 * Production Startup Script for TECH BOARD 2025
 * Ensures all systems are ready before starting the server
 */

const fs = require('fs');
const path = require('path');

async function startProduction() {
    console.log('🚀 Starting TECH BOARD 2025 Production Server...');
    
    // Check environment
    if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV = 'production';
        console.log('⚠️  Set NODE_ENV to production');
    }
    
    // Check database file exists
    const dbPath = process.env.DB_PATH || './database/mcq_system.db';
    if (!fs.existsSync(dbPath)) {
        console.error('❌ Database file not found:', dbPath);
        process.exit(1);
    }
    
    // Check client build exists
    const clientBuildPath = path.join(__dirname, '../client/dist');
    if (!fs.existsSync(clientBuildPath)) {
        console.error('❌ Client build not found. Please run: cd client && npm run build');
        process.exit(1);
    }
    
    console.log('✅ Pre-flight checks passed');
    
    // Start the main server
    require('./index.js');
}

startProduction();
