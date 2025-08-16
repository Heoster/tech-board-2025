const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('🔍 Checking current database schema...');

// Get table schema
db.all("SELECT sql FROM sqlite_master WHERE type='table' AND name='questions'", (err, rows) => {
    if (err) {
        console.error('Error:', err);
        return;
    }
    
    console.log('📋 Current questions table schema:');
    rows.forEach(row => {
        console.log(row.sql);
    });
    
    // Check if there are any indexes
    db.all("SELECT sql FROM sqlite_master WHERE type='index' AND tbl_name='questions'", (err, indexes) => {
        if (err) {
            console.error('Error checking indexes:', err);
            return;
        }
        
        console.log('\n📋 Current indexes on questions table:');
        if (indexes.length === 0) {
            console.log('   No indexes found');
        } else {
            indexes.forEach(index => {
                console.log(index.sql);
            });
        }
        
        db.close();
    });
});