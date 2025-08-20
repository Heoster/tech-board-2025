const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Container startup sequence initiated...');

// Check if database exists and has data
const dbPath = path.join(__dirname, '..', 'database', 'mcq_system.db');
let needsSeeding = false;

if (!fs.existsSync(dbPath)) {
    console.log('📊 Database not found, will create and seed...');
    needsSeeding = true;
} else {
    // Check if database has questions
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database(dbPath);
    
    db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
        if (err || row.count === 0) {
            console.log('📊 Database exists but has no questions, will seed...');
            needsSeeding = true;
        } else {
            console.log(`✅ Database exists with ${row.count} questions`);
        }
        
        db.close();
        
        if (needsSeeding) {
            try {
                console.log('🌱 Seeding database...');
                execSync('node ../reset-database-simple.js', { stdio: 'inherit' });
                execSync('node ../seed-all-grades.js', { stdio: 'inherit' });
                console.log('✅ Database seeding completed');
            } catch (error) {
                console.error('❌ Error during seeding:', error.message);
                // Continue anyway, server might still work
            }
        }
        
        console.log('🎯 Starting MCQ server...');
        // Start the actual server
        require('../index.js');
    });
}