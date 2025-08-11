#!/usr/bin/env node

/**
 * Simple Database Reset Script
 * Clears all data from the database tables
 */

const database = require('./server/config/database');

async function resetDatabase() {
    console.log('🔄 RESETTING DATABASE');
    console.log('=====================');
    
    try {
        await database.connect();
        const db = database.getDb();
        
        console.log('🗑️  Clearing all data...');
        
        // Clear all data in correct order (respecting foreign keys)
        const tables = ['responses', 'quizzes', 'students', 'options', 'questions', 'admins'];
        
        for (const table of tables) {
            await new Promise((resolve, reject) => {
                db.run(`DELETE FROM ${table}`, (err) => {
                    if (err && !err.message.includes('no such table')) {
                        console.error(`Error clearing ${table}:`, err);
                        reject(err);
                    } else {
                        console.log(`✅ Cleared ${table} table`);
                        resolve();
                    }
                });
            });
        }
        
        // Reset auto-increment counters
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM sqlite_sequence', (err) => {
                if (err && !err.message.includes('no such table')) {
                    console.error('Error resetting sequences:', err);
                    reject(err);
                } else {
                    console.log('✅ Reset auto-increment counters');
                    resolve();
                }
            });
        });
        
        console.log('');
        console.log('🎉 DATABASE RESET COMPLETE!');
        console.log('===========================');
        console.log('✅ All tables cleared');
        console.log('✅ Auto-increment counters reset');
        console.log('✅ Database ready for fresh data');
        
        await database.close();
        process.exit(0);
        
    } catch (error) {
        console.error('❌ Reset failed:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    resetDatabase();
}

module.exports = resetDatabase;