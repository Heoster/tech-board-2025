#!/usr/bin/env node

const database = require('./server/config/database');

async function resetDatabase() {
    console.log('🔄 RESETTING DATABASE');
    
    try {
        await database.connect();
        const db = database.getDb();
        
        // Clear all data
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM responses', (err) => err ? reject(err) : resolve());
        });
        
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM quizzes', (err) => err ? reject(err) : resolve());
        });
        
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM students', (err) => err ? reject(err) : resolve());
        });
        
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM options', (err) => err ? reject(err) : resolve());
        });
        
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM questions', (err) => err ? reject(err) : resolve());
        });
        
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM admins', (err) => err ? reject(err) : resolve());
        });
        
        // Reset auto-increment counters
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM sqlite_sequence', (err) => err ? reject(err) : resolve());
        });
        
        console.log('✅ Database reset complete');
        await database.close();
        
    } catch (error) {
        console.error('❌ Reset failed:', error);
        process.exit(1);
    }
}

resetDatabase();