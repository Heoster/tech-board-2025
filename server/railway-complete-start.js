#!/usr/bin/env node

// Complete Railway startup script - ensures frontend is built and served
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting TECH BOARD MCQ System on Railway...');
console.log('🌐 Environment:', process.env.NODE_ENV);
console.log('🔗 Railway URL: https://tech-board.up.railway.app');

// Set production environment
process.env.NODE_ENV = 'production';

// Check if client build exists
const clientDistPath = path.join(__dirname, '../client/dist');
const indexHtmlPath = path.join(clientDistPath, 'index.html');

console.log('🔍 Checking client build...');
console.log('   Client dist path:', clientDistPath);
console.log('   Index.html path:', indexHtmlPath);

if (fs.existsSync(indexHtmlPath)) {
    console.log('✅ Client build found - frontend will be served');
    
    // Check build size
    const stats = fs.statSync(indexHtmlPath);
    console.log(`   Build size: ${stats.size} bytes`);
    
    // List dist contents
    try {
        const distContents = fs.readdirSync(clientDistPath);
        console.log(`   Dist contents: ${distContents.join(', ')}`);
    } catch (error) {
        console.log('   Could not list dist contents:', error.message);
    }
} else {
    console.log('❌ Client build not found!');
    console.log('⚠️  Frontend will not be served - only API endpoints available');
    
    // Try to find where the build might be
    const possiblePaths = [
        path.join(__dirname, '../client/build'),
        path.join(__dirname, '../build'),
        path.join(__dirname, '../dist'),
        path.join(__dirname, '../../client/dist')
    ];
    
    console.log('🔍 Searching for build in other locations...');
    for (const possiblePath of possiblePaths) {
        if (fs.existsSync(possiblePath)) {
            console.log(`   Found build at: ${possiblePath}`);
        }
    }
}

// Start database seeding in background (non-blocking)
setTimeout(async () => {
    try {
        console.log('🌱 Starting background database seeding...');
        const database = require('./config/database');
        const db = database.getDb();
        
        // Quick check if database has data
        const questionCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                if (err) resolve(0);
                else resolve(row.count);
            });
        });
        
        console.log(`📊 Current questions in database: ${questionCount}`);
        
        if (questionCount < 1000) {
            console.log('🌱 Seeding database with 250+ questions per grade...');
            const { seed250QuestionsPerGrade } = require('./scripts/seed-250-per-grade.js');
            await seed250QuestionsPerGrade();
            console.log('✅ Background database seeding completed');
        } else {
            console.log('✅ Database already contains sufficient data');
        }
        
    } catch (error) {
        console.error('⚠️  Background seeding failed:', error.message);
        console.log('⚠️  Server will continue running with existing data');
    }
}, 3000); // Start seeding 3 seconds after server starts

// Start the Express server
console.log('🚀 Starting Express server...');
require('./index.js');

console.log('✅ Railway startup complete');
console.log('🔒 Ultra-strict no-duplicates system active');
console.log('🎯 TECH BOARD 2025 Selection Test ready');

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 Received SIGTERM, shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 Received SIGINT, shutting down gracefully...');
    process.exit(0);
});