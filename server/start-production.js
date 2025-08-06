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
    
    return new Promise((resolve, reject) => {
        const seedProcess = spawn('node', ['scripts/seed-250-per-grade.js'], {
            cwd: __dirname,
            stdio: 'inherit'
        });
        
        seedProcess.on('close', (code) => {
            if (code === 0) {
                console.log('✅ Database seeding completed successfully');
                resolve();
            } else {
                console.error('❌ Database seeding failed with code:', code);
                reject(new Error(`Seeding failed with code ${code}`));
            }
        });
        
        seedProcess.on('error', (error) => {
            console.error('❌ Database seeding error:', error);
            reject(error);
        });
    });
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