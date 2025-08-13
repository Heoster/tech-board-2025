const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

class Database {
    constructor() {
        this.db = null;
        this.dbPath = process.env.NODE_ENV === 'test' ? ':memory:' : (process.env.DB_PATH || path.join(__dirname, '../database/mcq_system_fixed.db'));
        this.connectionRetries = 3;
        this.retryDelay = 1000; // 1 second
        this.queryTimeout = 30000; // 30 seconds
        this.isInitialized = false;
    }

    async connect() {
        return new Promise(async (resolve, reject) => {
            let retries = this.connectionRetries;
            
            const attemptConnection = async () => {
                try {
                    // Ensure database directory exists
                    const dbDir = path.dirname(this.dbPath);
                    if (!fs.existsSync(dbDir)) {
                        fs.mkdirSync(dbDir, { recursive: true });
                        logger.info('Created database directory', { path: dbDir });
                    }

                    const dbExists = fs.existsSync(this.dbPath);
                    logger.info('Attempting database connection', {
                        dbPath: this.dbPath,
                        exists: dbExists,
                        retries: retries
                    });

                    this.db = new sqlite3.Database(this.dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, async (err) => {
                        if (err) {
                            logger.error('Database connection failed', {
                                error: err.message,
                                dbPath: this.dbPath,
                                retries: retries
                            });
                            
                            if (retries > 0) {
                                retries--;
                                logger.info('Retrying database connection', { retriesLeft: retries });
                                setTimeout(attemptConnection, this.retryDelay);
                                return;
                            }
                            reject(err);
                        } else {
                            logger.info('SQLite database connected successfully', { dbPath: this.dbPath });
                            
                            // Configure database for better performance and reliability
                            await this.configurateDatabase();
                            
                            try {
                                await this.initializeDatabase();
                                this.isInitialized = true;
                                logger.info('Database initialized successfully');
                                resolve();
                            } catch (initError) {
                                logger.error('Database initialization failed', { error: initError.message });
                                reject(initError);
                            }
                        }
                    });
                } catch (error) {
                    logger.error('Database connection attempt failed', { error: error.message });
                    if (retries > 0) {
                        retries--;
                        setTimeout(attemptConnection, this.retryDelay);
                    } else {
                        reject(error);
                    }
                }
            };

            await attemptConnection();
        });
    }

    async configurateDatabase() {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not connected'));
                return;
            }

            // Configure SQLite for better performance and reliability
            const configurations = [
                'PRAGMA journal_mode = WAL',           // Write-Ahead Logging for better concurrency
                'PRAGMA synchronous = NORMAL',         // Balance between safety and performance
                'PRAGMA cache_size = 10000',           // 10MB cache
                'PRAGMA temp_store = MEMORY',          // Store temp tables in memory
                'PRAGMA mmap_size = 268435456',        // 256MB memory map
                'PRAGMA optimize',                     // Optimize database
                'PRAGMA foreign_keys = ON'             // Enable foreign key constraints
            ];

            let completed = 0;
            const total = configurations.length;

            configurations.forEach((pragma) => {
                this.db.run(pragma, (err) => {
                    if (err) {
                        logger.warn('Failed to set database configuration', { pragma, error: err.message });
                    } else {
                        logger.debug('Database configuration applied', { pragma });
                    }
                    
                    completed++;
                    if (completed === total) {
                        logger.info('Database configuration completed');
                        resolve();
                    }
                });
            });
        });
    }

    async initializeDatabase() {
        return new Promise(async (resolve, reject) => {
            try {
                const sqlFiles = [
                    { path: process.env.NODE_ENV === 'test' ? '../database/test-init.sql' : '../database/init.sql', name: 'initialization' }
                ];

                logger.info('Starting database initialization');

                for (const sqlFile of sqlFiles) {
                    const filePath = path.join(__dirname, sqlFile.path);
                    
                    if (!fs.existsSync(filePath)) {
                        logger.warn(`SQL file not found, skipping`, { file: sqlFile.path });
                        continue;
                    }

                    const sql = fs.readFileSync(filePath, 'utf8');
                    logger.debug(`Executing ${sqlFile.name} SQL`, { file: sqlFile.path });

                    await new Promise((resolveExec, rejectExec) => {
                        this.db.exec(sql, (err) => {
                            if (err) {
                                logger.error(`Error applying ${sqlFile.name}`, {
                                    error: err.message,
                                    file: sqlFile.path
                                });
                                rejectExec(err);
                            } else {
                                logger.info(`${sqlFile.name} applied successfully`);
                                resolveExec();
                            }
                        });
                    });
                }

                // Verify database integrity
                await this.verifyDatabaseIntegrity();
                
                logger.info('Database initialization completed successfully');
                resolve();

            } catch (error) {
                logger.error('Database initialization failed', { error: error.message });
                reject(error);
            }
        });
    }

    async verifyDatabaseIntegrity() {
        return new Promise((resolve, reject) => {
            // Check if essential tables exist
            const essentialTables = ['students', 'questions', 'options', 'quizzes', 'quiz_answers', 'admins'];
            let checkedTables = 0;

            essentialTables.forEach(tableName => {
                this.db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`, [tableName], (err, row) => {
                    if (err) {
                        logger.error(`Error checking table existence`, { table: tableName, error: err.message });
                        reject(err);
                        return;
                    }

                    if (!row) {
                        logger.error(`Essential table missing`, { table: tableName });
                        reject(new Error(`Essential table '${tableName}' is missing`));
                        return;
                    }

                    checkedTables++;
                    if (checkedTables === essentialTables.length) {
                        logger.info('Database integrity verification passed', { tables: essentialTables.length });
                        resolve();
                    }
                });
            });
        });
    }

    getDb() {
        if (!this.db) {
            logger.error('Attempted to get database connection before initialization');
            throw new Error('Database not connected');
        }
        return this.db;
    }

    isConnected() {
        return this.db !== null && this.isInitialized;
    }

    // Enhanced query method with timeout and logging
    async query(sql, params = []) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not connected'));
                return;
            }

            const startTime = Date.now();
            const timeoutId = setTimeout(() => {
                logger.error('Query timeout', { sql: sql.substring(0, 100), timeout: this.queryTimeout });
                reject(new Error('Query timeout'));
            }, this.queryTimeout);

            this.db.all(sql, params, (err, rows) => {
                clearTimeout(timeoutId);
                const duration = Date.now() - startTime;

                if (err) {
                    logger.error('Query failed', {
                        sql: sql.substring(0, 100),
                        error: err.message,
                        duration
                    });
                    reject(err);
                } else {
                    logger.database('Query executed', sql.substring(0, 100), duration, {
                        rowCount: rows.length
                    });
                    resolve(rows);
                }
            });
        });
    }

    // Run method for INSERT/UPDATE/DELETE operations (expected by tests)
    async run(sql, params = []) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not connected'));
                return;
            }

            const startTime = Date.now();
            this.db.run(sql, params, function(err) {
                const duration = Date.now() - startTime;
                
                if (err) {
                    logger.error('Run query failed', {
                        sql: sql.substring(0, 100),
                        error: err.message,
                        duration
                    });
                    reject(err);
                } else {
                    logger.database('Run query executed', sql.substring(0, 100), duration, {
                        lastID: this.lastID,
                        changes: this.changes
                    });
                    resolve({
                        lastID: this.lastID,
                        changes: this.changes
                    });
                }
            });
        });
    }

    // Get method for single row queries (expected by tests)
    async get(sql, params = []) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not connected'));
                return;
            }

            const startTime = Date.now();
            this.db.get(sql, params, (err, row) => {
                const duration = Date.now() - startTime;
                
                if (err) {
                    logger.error('Get query failed', {
                        sql: sql.substring(0, 100),
                        error: err.message,
                        duration
                    });
                    reject(err);
                } else {
                    logger.database('Get query executed', sql.substring(0, 100), duration, {
                        hasResult: !!row
                    });
                    resolve(row);
                }
            });
        });
    }

    // All method for multiple row queries (alias for query method)
    async all(sql, params = []) {
        return this.query(sql, params);
    }

    // Health check method
    async healthCheck() {
        try {
            const startTime = Date.now();
            await this.query('SELECT 1 as health_check');
            const duration = Date.now() - startTime;
            
            logger.info('Database health check passed', { duration });
            return { healthy: true, responseTime: duration };
        } catch (error) {
            logger.error('Database health check failed', { error: error.message });
            return { healthy: false, error: error.message };
        }
    }

    async close() {
        return new Promise((resolve) => {
            if (this.db) {
                logger.info('Closing database connection');
                
                this.db.close((err) => {
                    if (err) {
                        logger.error('Error closing database', { error: err.message });
                    } else {
                        logger.info('Database connection closed successfully');
                    }
                    this.db = null;
                    this.isInitialized = false;
                    resolve();
                });
            } else {
                logger.info('Database connection already closed');
                resolve();
            }
        });
    }

    // Backup database
    async backup() {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not connected'));
                return;
            }

            const backupDir = path.join(__dirname, '../backups');
            if (!fs.existsSync(backupDir)) {
                fs.mkdirSync(backupDir, { recursive: true });
            }

            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const backupPath = path.join(backupDir, `backup-${timestamp}.db`);

            try {
                fs.copyFileSync(this.dbPath, backupPath);
                logger.info('Database backup created successfully', { backupPath });
                resolve(backupPath);
            } catch (error) {
                logger.error('Database backup failed', { error: error.message });
                reject(error);
            }
        });
    }
}

module.exports = new Database();