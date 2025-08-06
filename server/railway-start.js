#!/usr/bin/env node

// Simplified Railway startup script - start server immediately, seed in background
console.log('🚀 Starting MCQ Testing System on Railway...');
console.log('🌐 Environment:', process.env.NODE_ENV);
console.log('🔗 Railway URL: https://tech-board.up.railway.app');

// Start the server immediately
console.log('🚀 Starting Express server...');
const server = require('./index.js');

// Seed database in background after server starts
setTimeout(async () => {
    try {
        console.log('🌱 Background seeding starting...');
        const database = require('./config/database');
        const db = database.getDb();
        
        // Quick check if database has data
        const questionCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                if (err) resolve(0); // If error, assume no data
                else resolve(row.count);
            });
        });
        
        console.log(`📊 Found ${questionCount} questions in database`);
        
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
}, 5000); // Start seeding 5 seconds after server starts

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 Received SIGTERM, shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 Received SIGINT, shutting down gracefully...');
    process.exit(0);
});