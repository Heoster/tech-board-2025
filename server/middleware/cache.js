const NodeCache = require('node-cache');

// Create cache instances with different TTL settings
const apiCache = new NodeCache({
    stdTTL: 300, // 5 minutes default TTL
    checkperiod: 60, // Check for expired keys every 60 seconds
    useClones: false, // Don't clone objects for better performance
    deleteOnExpire: true,
    maxKeys: 1000 // Limit cache size
});

const questionCache = new NodeCache({
    stdTTL: 3600, // 1 hour for questions (they don't change often)
    checkperiod: 300,
    useClones: false,
    maxKeys: 500
});

const studentCache = new NodeCache({
    stdTTL: 600, // 10 minutes for student data
    checkperiod: 120,
    useClones: false,
    maxKeys: 2000
});

// Cache middleware factory
const createCacheMiddleware = (cacheInstance, keyGenerator, ttl) => {
    return (req, res, next) => {
        // Skip caching for non-GET requests
        if (req.method !== 'GET') {
            return next();
        }
        
        // Generate cache key
        const cacheKey = keyGenerator ? keyGenerator(req) : `${req.originalUrl || req.url}`;
        
        // Try to get from cache
        const cachedResponse = cacheInstance.get(cacheKey);
        if (cachedResponse) {
            // Add cache hit header
            res.set('X-Cache', 'HIT');
            res.set('X-Cache-Key', cacheKey);
            return res.json(cachedResponse);
        }
        
        // Store original res.json
        const originalJson = res.json;
        
        // Override res.json to cache the response
        res.json = function(data) {
            // Only cache successful responses
            if (res.statusCode === 200 && data) {
                const cacheTTL = ttl || cacheInstance.options.stdTTL;
                cacheInstance.set(cacheKey, data, cacheTTL);
                res.set('X-Cache', 'MISS');
                res.set('X-Cache-Key', cacheKey);
            }
            
            // Call original json method
            return originalJson.call(this, data);
        };
        
        next();
    };
};

// Specific cache middleware for different endpoints
const questionCacheMiddleware = createCacheMiddleware(
    questionCache,
    (req) => `questions:${req.params.grade || 'all'}:${req.query.subject || 'all'}`,
    3600 // 1 hour
);

const studentCacheMiddleware = createCacheMiddleware(
    studentCache,
    (req) => `student:${req.user?.id || 'anonymous'}:${req.originalUrl}`,
    600 // 10 minutes
);

const apiCacheMiddleware = createCacheMiddleware(
    apiCache,
    (req) => `api:${req.originalUrl}:${JSON.stringify(req.query)}`,
    300 // 5 minutes
);

// Cache invalidation utilities
const invalidateCache = {
    questions: (grade = null) => {
        if (grade) {
            // Invalidate specific grade
            const keys = questionCache.keys().filter(key => key.includes(`questions:${grade}`));
            questionCache.del(keys);
        } else {
            // Invalidate all questions
            questionCache.flushAll();
        }
    },
    
    student: (studentId = null) => {
        if (studentId) {
            // Invalidate specific student
            const keys = studentCache.keys().filter(key => key.includes(`student:${studentId}`));
            studentCache.del(keys);
        } else {
            // Invalidate all students
            studentCache.flushAll();
        }
    },
    
    api: (pattern = null) => {
        if (pattern) {
            // Invalidate matching pattern
            const keys = apiCache.keys().filter(key => key.includes(pattern));
            apiCache.del(keys);
        } else {
            // Invalidate all API cache
            apiCache.flushAll();
        }
    },
    
    all: () => {
        questionCache.flushAll();
        studentCache.flushAll();
        apiCache.flushAll();
    }
};

// Cache statistics
const getCacheStats = () => {
    return {
        questions: {
            keys: questionCache.keys().length,
            hits: questionCache.getStats().hits,
            misses: questionCache.getStats().misses,
            hitRate: questionCache.getStats().hits / (questionCache.getStats().hits + questionCache.getStats().misses) || 0
        },
        students: {
            keys: studentCache.keys().length,
            hits: studentCache.getStats().hits,
            misses: studentCache.getStats().misses,
            hitRate: studentCache.getStats().hits / (studentCache.getStats().hits + studentCache.getStats().misses) || 0
        },
        api: {
            keys: apiCache.keys().length,
            hits: apiCache.getStats().hits,
            misses: apiCache.getStats().misses,
            hitRate: apiCache.getStats().hits / (apiCache.getStats().hits + apiCache.getStats().misses) || 0
        }
    };
};

module.exports = {
    questionCacheMiddleware,
    studentCacheMiddleware,
    apiCacheMiddleware,
    invalidateCache,
    getCacheStats,
    cacheInstances: {
        questions: questionCache,
        students: studentCache,
        api: apiCache
    }
};