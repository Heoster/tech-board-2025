const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, '../database/mcq_system_test.db');
const initSqlPath = path.join(__dirname, '../database/init.sql');

async function createTestDatabase() {
    try {
        console.log('Creating test database...');
        
        // Remove existing test database if it exists
        if (fs.existsSync(dbPath)) {
            fs.unlinkSync(dbPath);
            console.log('Existing test database removed');
        }
        
        // Create new database with updated schema
        const db = new sqlite3.Database(dbPath);
        const initSql = fs.readFileSync(initSqlPath, 'utf8');
        
        await new Promise((resolve, reject) => {
            db.exec(initSql, (err) => {
                if (err) {
                    console.error('Error creating database:', err);
                    reject(err);
                } else {
                    console.log('Test database created successfully');
                    resolve();
                }
            });
        });
        
        await new Promise((resolve) => {
            db.close((err) => {
                if (err) console.error('Error closing database:', err);
                else console.log('Database connection closed');
                resolve();
            });
        });
        
        console.log('Test database creation completed successfully!');
        
    } catch (error) {
        console.error('Test database creation failed:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    createTestDatabase();
}

module.exports = createTestDatabase;