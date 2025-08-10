#!/usr/bin/env node

const database = require('./config/database');

async function healthCheck() {
    try {
        console.log('🔍 Starting database health check...');
        
        await database.connect();
        console.log('✅ Database connection successful');
        
        const db = database.getDb();
        
        // Check essential tables
        const tables = ['students', 'questions', 'options', 'quizzes', 'responses', 'admins'];
        for (const table of tables) {
            const result = await new Promise((resolve, reject) => {
                db.get(`SELECT COUNT(*) as count FROM ${table}`, (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                });
            });
            console.log(`✅ Table ${table}: ${result} records`);
        }
        
        console.log('🎉 Database health check completed successfully');
        process.exit(0);
        
    } catch (error) {
        console.error('❌ Database health check failed:', error.message);
        process.exit(1);
    }
}

healthCheck();
