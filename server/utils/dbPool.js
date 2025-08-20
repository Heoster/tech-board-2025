const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class DatabasePool {
    constructor(dbPath, maxConnections = 10) {
        this.dbPath = dbPath;
        this.maxConnections = maxConnections;
        this.connections = [];
        this.availableConnections = [];
        this.waitingQueue = [];
        this.stats = {
            totalQueries: 0,
            activeConnections: 0,
            totalConnections: 0,
            averageQueryTime: 0,
            queryTimes: []
        };
    }

    async initialize() {
        // Create initial connections
        for (let i = 0; i < Math.min(3, this.maxConnections); i++) {
            await this.createConnection();
        }
        console.log(`Database pool initialized with ${this.connections.length} connections`);
    }

    async createConnection() {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(this.dbPath, (err) => {
                if (err) {
                    console.error('Database connection error:', err);
                    reject(err);
                    return;
                }

                // Optimize SQLite settings for performance
                db.serialize(() => {
                    db.run('PRAGMA journal_mode = WAL');
                    db.run('PRAGMA synchronous = NORMAL');
                    db.run('PRAGMA cache_size = 10000');
                    db.run('PRAGMA temp_store = MEMORY');
                    db.run('PRAGMA mmap_size = 268435456'); // 256MB
                });

                const connection = {
                    db,
                    id: this.connections.length,
                    inUse: false,
                    created: new Date(),
                    lastUsed: new Date(),
                    queryCount: 0
                };

                this.connections.push(connection);
                this.availableConnections.push(connection);
                this.stats.totalConnections++;

                resolve(connection);
            });
        });
    }

    async getConnection() {
        return new Promise(async (resolve, reject) => {
            // Check for available connection
            if (this.availableConnections.length > 0) {
                const connection = this.availableConnections.pop();
                connection.inUse = true;
                connection.lastUsed = new Date();
                this.stats.activeConnections++;
                resolve(connection);
                return;
            }

            // Create new connection if under limit
            if (this.connections.length < this.maxConnections) {
                try {
                    const connection = await this.createConnection();
                    connection.inUse = true;
                    this.stats.activeConnections++;
                    resolve(connection);
                    return;
                } catch (error) {
                    reject(error);
                    return;
                }
            }

            // Add to waiting queue
            this.waitingQueue.push({ resolve, reject, timestamp: Date.now() });

            // Timeout after 30 seconds
            setTimeout(() => {
                const index = this.waitingQueue.findIndex(item => item.resolve === resolve);
                if (index !== -1) {
                    this.waitingQueue.splice(index, 1);
                    reject(new Error('Database connection timeout'));
                }
            }, 30000);
        });
    }

    releaseConnection(connection) {
        if (!connection || !connection.inUse) {
            return;
        }

        connection.inUse = false;
        connection.lastUsed = new Date();
        this.stats.activeConnections--;

        // Check waiting queue
        if (this.waitingQueue.length > 0) {
            const waiter = this.waitingQueue.shift();
            connection.inUse = true;
            this.stats.activeConnections++;
            waiter.resolve(connection);
        } else {
            this.availableConnections.push(connection);
        }
    }

    async query(sql, params = []) {
        const startTime = Date.now();
        let connection;

        try {
            connection = await this.getConnection();
            connection.queryCount++;
            this.stats.totalQueries++;

            return new Promise((resolve, reject) => {
                const method = sql.trim().toUpperCase().startsWith('SELECT') ? 'all' : 'run';
                
                connection.db[method](sql, params, function(err, result) {
                    const queryTime = Date.now() - startTime;
                    
                    // Update query time statistics
                    if (this.stats.queryTimes.length >= 100) {
                        this.stats.queryTimes.shift();
                    }
                    this.stats.queryTimes.push(queryTime);
                    this.stats.averageQueryTime = this.stats.queryTimes.reduce((a, b) => a + b, 0) / this.stats.queryTimes.length;

                    if (err) {
                        reject(err);
                    } else {
                        resolve(method === 'all' ? result : { changes: this.changes, lastID: this.lastID });
                    }
                });
            });
        } finally {
            if (connection) {
                this.releaseConnection(connection);
            }
        }
    }

    async get(sql, params = []) {
        let connection;
        try {
            connection = await this.getConnection();
            return new Promise((resolve, reject) => {
                connection.db.get(sql, params, (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                });
            });
        } finally {
            if (connection) {
                this.releaseConnection(connection);
            }
        }
    }

    getStats() {
        return {
            ...this.stats,
            availableConnections: this.availableConnections.length,
            waitingQueue: this.waitingQueue.length,
            connections: this.connections.map(conn => ({
                id: conn.id,
                inUse: conn.inUse,
                queryCount: conn.queryCount,
                created: conn.created,
                lastUsed: conn.lastUsed
            }))
        };
    }

    async close() {
        // Close all connections
        for (const connection of this.connections) {
            await new Promise((resolve) => {
                connection.db.close((err) => {
                    if (err) console.error('Error closing connection:', err);
                    resolve();
                });
            });
        }
        
        this.connections = [];
        this.availableConnections = [];
        this.waitingQueue = [];
        console.log('Database pool closed');
    }
}

module.exports = DatabasePool;