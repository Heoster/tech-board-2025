const { sanitizeForLog } = require('./sanitizer');

class QueryOptimizer {
    constructor(db) {
        this.db = db;
        this.queryCache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    }

    async optimizeQuery(query, params = []) {
        const cacheKey = `${query}:${JSON.stringify(params)}`;
        const cached = this.queryCache.get(cacheKey);
        
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            return cached.result;
        }

        const startTime = Date.now();
        
        try {
            const result = await new Promise((resolve, reject) => {
                this.db.all(query, params, (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });

            const executionTime = Date.now() - startTime;
            
            // Cache successful queries
            this.queryCache.set(cacheKey, {
                result,
                timestamp: Date.now()
            });

            // Log slow queries
            if (executionTime > 1000) {
                console.warn(`Slow query detected (${executionTime}ms):`, sanitizeForLog(query));
            }

            return result;
        } catch (error) {
            console.error('Query optimization failed:', sanitizeForLog(error.message));
            throw error;
        }
    }

    clearCache() {
        this.queryCache.clear();
    }

    getCacheStats() {
        return {
            size: this.queryCache.size,
            timeout: this.cacheTimeout
        };
    }
}

module.exports = QueryOptimizer;