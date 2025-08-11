const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'mcq_system.db');
const db = new sqlite3.Database(dbPath);

db.all('SELECT grade, COUNT(*) as count FROM questions GROUP BY grade', (err, rows) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('Questions by grade:');
        rows.forEach(row => {
            console.log(`Class ${row.grade}: ${row.count} questions`);
        });
    }
    db.close();
});