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

console.log('🔍 CHECKING GRADE 6 QUESTIONS');
console.log('==============================\n');

// Check total questions for Grade 6
db.get('SELECT COUNT(*) as count FROM questions WHERE grade = 6', (err, row) => {
    if (err) {
        console.error('❌ Error:', err.message);
        return;
    }
    console.log(`📊 Total questions for Grade 6: ${row.count}`);
});

// Check questions with options for Grade 6
db.get(`
    SELECT COUNT(DISTINCT q.id) as count 
    FROM questions q 
    INNER JOIN options o ON q.id = o.question_id 
    WHERE q.grade = 6
`, (err, row) => {
    if (err) {
        console.error('❌ Error:', err.message);
        return;
    }
    console.log(`📊 Questions with options for Grade 6: ${row.count}`);
});

// Check questions without options for Grade 6
db.get(`
    SELECT COUNT(*) as count 
    FROM questions q 
    LEFT JOIN options o ON q.id = o.question_id 
    WHERE q.grade = 6 AND o.id IS NULL
`, (err, row) => {
    if (err) {
        console.error('❌ Error:', err.message);
        return;
    }
    console.log(`📊 Questions without options for Grade 6: ${row.count}`);
});

// Check difficulty distribution for Grade 6
db.all(`
    SELECT difficulty, COUNT(*) as count 
    FROM questions 
    WHERE grade = 6 
    GROUP BY difficulty
`, (err, rows) => {
    if (err) {
        console.error('❌ Error:', err.message);
        return;
    }
    console.log('\n📊 Difficulty distribution for Grade 6:');
    rows.forEach(row => {
        console.log(`   ${row.difficulty || 'NULL'}: ${row.count} questions`);
    });
});

// Check questions with options by difficulty for Grade 6
db.all(`
    SELECT q.difficulty, COUNT(DISTINCT q.id) as count 
    FROM questions q 
    INNER JOIN options o ON q.id = o.question_id 
    WHERE q.grade = 6 
    GROUP BY q.difficulty
`, (err, rows) => {
    if (err) {
        console.error('❌ Error:', err.message);
        return;
    }
    console.log('\n📊 Questions with options by difficulty for Grade 6:');
    rows.forEach(row => {
        console.log(`   ${row.difficulty || 'NULL'}: ${row.count} questions`);
    });
    
    // Close database after last query
    db.close((err) => {
        if (err) {
            console.error('❌ Error closing database:', err.message);
        } else {
            console.log('\n✅ Database connection closed');
        }
    });
});
