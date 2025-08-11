const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, '../database/mcq_system_fixed.db');
const initSqlPath = path.join(__dirname, '../database/init.sql');

async function updateSchema() {
    try {
        console.log('Updating database schema...');
        
        // Backup existing database if it exists
        if (fs.existsSync(dbPath)) {
            const backupPath = dbPath + '.backup.' + Date.now();
            fs.copyFileSync(dbPath, backupPath);
            console.log(`Backup created: ${backupPath}`);
        }
        
        // Remove existing database
        if (fs.existsSync(dbPath)) {
            fs.unlinkSync(dbPath);
            console.log('Existing database removed');
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
                    console.log('Database created successfully with updated schema');
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
        
        console.log('Schema update completed successfully!');
        
    } catch (error) {
        console.error('Schema update failed:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    updateSchema();
}

module.exports = updateSchema;