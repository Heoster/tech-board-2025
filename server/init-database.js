const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Initialize database
const dbPath = path.join(__dirname, 'database', 'mcq_system_fixed.db');
const db = new sqlite3.Database(dbPath);

// Read and execute SQL schema
const sqlSchema = fs.readFileSync(path.join(__dirname, 'database', 'init.sql'), 'utf8');

// Split SQL statements and execute them
const statements = sqlSchema.split(';').filter(stmt => stmt.trim().length > 0);

console.log('Initializing database...');

db.serialize(() => {
    statements.forEach((statement, index) => {
        const trimmedStatement = statement.trim();
        if (trimmedStatement) {
            console.log(`Executing statement ${index + 1}...`);
            db.run(trimmedStatement, (err) => {
                if (err) {
                    console.error(`Error in statement ${index + 1}:`, err);
                }
            });
        }
    });
    
    // Verify tables were created
    db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
        if (err) {
            console.error('Error checking tables:', err);
        } else {
            console.log('Created tables:', tables.map(t => t.name));
        }
        
        console.log('Database initialized successfully!');
        db.close();
    });
});