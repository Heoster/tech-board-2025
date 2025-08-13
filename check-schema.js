const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'server/database/mcq_system_fixed.db');
const db = new sqlite3.Database(dbPath);

console.log('Checking database schema...\n');

// Check students table
db.all('PRAGMA table_info(students)', (err, columns) => {
    if (err) {
        console.log('ERROR checking students table:', err.message);
    } else {
        console.log('STUDENTS table columns:');
        columns.forEach(col => {
            console.log(`  ${col.name} (${col.type}) - ${col.notnull ? 'NOT NULL' : 'NULL'}`);
        });
    }
    
    // Check admins table
    db.all('PRAGMA table_info(admins)', (err, columns) => {
        if (err) {
            console.log('ERROR checking admins table:', err.message);
        } else {
            console.log('\nADMINS table columns:');
            columns.forEach(col => {
                console.log(`  ${col.name} (${col.type}) - ${col.notnull ? 'NOT NULL' : 'NULL'}`);
            });
        }
        
        // Check questions table
        db.all('PRAGMA table_info(questions)', (err, columns) => {
            if (err) {
                console.log('ERROR checking questions table:', err.message);
            } else {
                console.log('\nQUESTIONS table columns:');
                columns.forEach(col => {
                    console.log(`  ${col.name} (${col.type}) - ${col.notnull ? 'NOT NULL' : 'NULL'}`);
                });
            }
            
            db.close();
        });
    });
});