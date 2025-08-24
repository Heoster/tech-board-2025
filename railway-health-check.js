#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🏥 Railway Health Check');
console.log('======================');

// Check critical files
const checks = [
    'server/database/mcq_system_fixed.db',
    'server/public/index.html',
    'server/complete-production-server.js',
    'server/package.json'
];

let allHealthy = true;

checks.forEach(file => {
    if (fs.existsSync(file)) {
        console.log('✅', file);
    } else {
        console.log('❌', file);
        allHealthy = false;
    }
});

// Check database content if it exists
const dbPath = path.join(__dirname, 'server/database/mcq_system_fixed.db');
if (fs.existsSync(dbPath)) {
    try {
        const sqlite3 = require('sqlite3').verbose();
        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.log('❌ Database connection failed');
                allHealthy = false;
                process.exit(1);
            }
            
            db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                if (err) {
                    console.log('❌ Database query failed');
                    allHealthy = false;
                    process.exit(1);
                }
                
                console.log(`✅ Database: ${row.count} questions`);
                
                if (row.count < 1000) {
                    console.log('❌ Insufficient questions');
                    allHealthy = false;
                    process.exit(1);
                }
                
                db.close();
                
                if (allHealthy) {
                    console.log('🎉 All health checks passed!');
                    process.exit(0);
                } else {
                    console.log('❌ Health check failed!');
                    process.exit(1);
                }
            });
        });
    } catch (error) {
        console.log('❌ Database check error:', error.message);
        process.exit(1);
    }
} else {
    if (allHealthy) {
        console.log('🎉 Basic health checks passed!');
        process.exit(0);
    } else {
        console.log('❌ Health check failed!');
        process.exit(1);
    }
}