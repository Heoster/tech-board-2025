const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database path
const dbPath = path.join(__dirname, 'database', 'mcq_system.db');

// Connect to database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Database connection error:', err.message);
        return;
    }
    console.log('✅ Connected to the database');
});

console.log('🔍 CHECKING DIFFICULTY DISTRIBUTION');
console.log('===================================\n');

// Check difficulty distribution for each grade
const grades = [6, 7, 8, 9, 11];

grades.forEach(grade => {
    db.all(`
        SELECT difficulty, COUNT(*) as count 
        FROM questions 
        WHERE grade = ? 
        GROUP BY difficulty
    `, [grade], (err, rows) => {
        if (err) {
            console.error(`❌ Error checking Grade ${grade}:`, err.message);
            return;
        }
        
        console.log(`📊 Grade ${grade} Difficulty Distribution:`);
        const totalQuestions = rows.reduce((sum, row) => sum + row.count, 0);
        
        rows.forEach(row => {
            const percentage = ((row.count / totalQuestions) * 100).toFixed(1);
            console.log(`   ${row.difficulty || 'NULL'}: ${row.count} questions (${percentage}%)`);
        });
        
        console.log(`   Total: ${totalQuestions} questions\n`);
        
        // Check if this is the last grade
        if (grade === 11) {
            db.close((err) => {
                if (err) {
                    console.error('❌ Error closing database:', err.message);
                } else {
                    console.log('✅ Database connection closed');
                }
            });
        }
    });
});
