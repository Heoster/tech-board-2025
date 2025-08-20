const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class SimpleDatabase {
    constructor() {
        this.db = null;
        this.dbPath = path.join(__dirname, 'database', 'mcq_system_fixed.db');
    }

    async connect() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(this.dbPath, (err) => {
                if (err) {
                    console.error('Database connection error:', err.message);
                    reject(err);
                } else {
                    console.log('✅ Database connected');
                    resolve();
                }
            });
        });
    }

    getDb() {
        return this.db;
    }

    async get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    async all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    async run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function(err) {
                if (err) reject(err);
                else resolve({ lastID: this.lastID, changes: this.changes });
            });
        });
    }

    async healthCheck() {
        try {
            await this.get('SELECT 1 as health_check');
            return { healthy: true };
        } catch (error) {
            return { healthy: false, error: error.message };
        }
    }

    async close() {
        return new Promise((resolve) => {
            if (this.db) {
                this.db.close((err) => {
                    if (err) console.error('Error closing database:', err.message);
                    else console.log('Database closed');
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }
}

module.exports = new SimpleDatabase();