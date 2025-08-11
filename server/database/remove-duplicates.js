const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'mcq_system.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    // Remove duplicate questions based on question_text and grade
    db.run(`DELETE FROM questions WHERE id NOT IN (
        SELECT MIN(id) FROM questions 
        GROUP BY question_text, grade
    )`, (err) => {
        if (err) {
            console.error('Error removing duplicates:', err);
        } else {
            console.log('Duplicate questions removed');
        }
    });
    
    // Remove orphaned options
    db.run(`DELETE FROM options WHERE question_id NOT IN (
        SELECT id FROM questions
    )`, (err) => {
        if (err) {
            console.error('Error removing orphaned options:', err);
        } else {
            console.log('Orphaned options removed');
        }
    });
    
    // Check final counts
    db.all('SELECT grade, COUNT(*) as count FROM questions GROUP BY grade', (err, rows) => {
        if (err) {
            console.error('Error:', err);
        } else {
            console.log('\nFinal question counts:');
            rows.forEach(row => {
                console.log(`Class ${row.grade}: ${row.count} questions`);
            });
        }
        db.close();
    });
});