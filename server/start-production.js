#!/usr/bin/env node

// Production startup script for Railway deployment
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting MCQ Testing System on Railway...');
console.log('🌐 Environment:', process.env.NODE_ENV);
console.log('🔗 Railway URL: https://tech-board.up.railway.app');

// Check if database exists and has data
const dbPath = process.env.DB_PATH || './database/mcq_system.db';
const dbExists = fs.existsSync(dbPath);

async function checkDatabaseData() {
    if (!dbExists) {
        console.log('📊 Database not found, will seed on first connection');
        return false;
    }
    
    try {
        const database = require('./config/database');
        await database.connect();
        const db = database.getDb();
        
        const questionCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
        
        console.log(`📊 Found ${questionCount} questions in database`);
        await database.close();
        
        return questionCount >= 1000; // Should have at least 1000 questions
    } catch (error) {
        console.log('📊 Database check failed, will seed:', error.message);
        return false;
    }
}

async function seedDatabase() {
    console.log('🌱 Seeding database with 250+ questions per grade...');
    
    try {
        // Import and run seeding directly instead of spawning process
        const { seed250QuestionsPerGrade } = require('./scripts/seed-250-per-grade.js');
        await seed250QuestionsPerGrade();
        console.log('✅ Database seeding completed successfully');
    } catch (error) {
        console.error('❌ Database seeding error:', error);
        // Don't fail startup if seeding fails - try to continue
        console.log('⚠️  Continuing startup without seeding...');
    }
}

async function startServer() {
    console.log('🚀 Starting Express server...');
    
    // Start the main server
    require('./index.js');
}

async function main() {
    try {
        // Check if database needs seeding
        const hasData = await checkDatabaseData();
        
        if (!hasData) {
            await seedDatabase();
        } else {
            console.log('✅ Database already contains sufficient data');
        }
        
        // Start the server
        await startServer();
        
    } catch (error) {
        console.error('❌ Production startup failed:', error);
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 Received SIGTERM, shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 Received SIGINT, shutting down gracefully...');
    process.exit(0);
});

main();