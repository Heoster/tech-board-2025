const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

class Database {
    constructor() {
        this.db = null;
        this.dbPath = process.env.DB_PATH || './database/mcq_system.db';
    }

    async connect() {
        return new Promise((resolve, reject) => {
            // Ensure database directory exists
            const dbDir = path.dirname(this.dbPath);
            if (!fs.existsSync(dbDir)) {
                fs.mkdirSync(dbDir, { recursive: true });
            }

            this.db = new sqlite3.Database(this.dbPath, (err) => {
                if (err) {
                    console.error('Error opening database:', err.message);
                    reject(err);
                } else {
                    console.log('Connected to SQLite database');
                    this.initializeDatabase()
                        .then(() => resolve())
                        .catch(reject);
                }
            });
        });
    }

    async initializeDatabase() {
        return new Promise((resolve, reject) => {
            const initSqlPath = path.join(__dirname, '../database/init.sql');
            const rulesSqlPath = path.join(__dirname, '../database/rules.sql');
            
            const initSql = fs.readFileSync(initSqlPath, 'utf8');
            const rulesSql = fs.readFileSync(rulesSqlPath, 'utf8');

            // Execute initialization SQL
            this.db.exec(initSql, (err) => {
                if (err) {
                    console.error('Error initializing database:', err.message);
                    reject(err);
                } else {
                    // Execute rules SQL
                    this.db.exec(rulesSql, (err) => {
                        if (err) {
                            console.error('Error applying database rules:', err.message);
                            reject(err);
                        } else {
                            console.log('Database initialized successfully');
                            console.log('Database rules applied successfully');
                            resolve();
                        }
                    });
                }
            });
        });
    }

    getDb() {
        return this.db;
    }

    async close() {
        return new Promise((resolve) => {
            if (this.db) {
                this.db.close((err) => {
                    if (err) {
                        console.error('Error closing database:', err.message);
                    } else {
                        console.log('Database connection closed');
                    }
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }
}

module.exports = new Database();