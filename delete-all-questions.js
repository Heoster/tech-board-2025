#!/usr/bin/env node

const database = require('./server/config/database');

async function deleteAllQuestions() {
    try {
        await database.connect();
        const db = database.getDb();
        
        console.log('🗑️  Deleting all questions...');
        
        // Delete in correct order due to foreign key constraints
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM responses', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM options', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM questions', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        console.log('✅ All questions deleted successfully');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await database.close();
    }
}

deleteAllQuestions();