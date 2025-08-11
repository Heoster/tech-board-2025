const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'server/database/mcq_system.db');
const db = new sqlite3.Database(dbPath);

db.all("SELECT sql FROM sqlite_master WHERE type='table' AND name='students'", (err, rows) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('Students table schema:');
        rows.forEach(row => console.log(row.sql));
    }
    db.close();
});