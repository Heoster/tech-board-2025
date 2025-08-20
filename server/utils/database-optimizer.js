// Database optimization utilities for TECH BOARD 2025 MCQ System
// Implements connection pooling, query optimization, and performance monitoring

const database = require('../config/database');
const { performanceMonitor } = require('../middleware/performance');

class DatabaseOptimizer {
    constructor() {
        this.queryCache = new Map();
        this.connectionPool = [];
        this.maxConnections = 10;
        this.queryStats = new Map();
        this.slowQueryThreshold = 100; // ms
    }

    // Initialize database indexes for optimal performance
    async createOptimizedIndexes() {
        const db = database.getDb();
        const indexes = [
            // Questions table indexes
            'CREATE INDEX IF NOT EXISTS idx_questions_grade ON questions(grade)',

            'CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty)',

            
            // Options table indexes
            'CREATE INDEX IF NOT EXISTS idx_options_question_id ON options(question_id)',
            'CREATE INDEX IF NOT EXISTS idx_options_is_correct ON options(is_correct)',
            
            // Quizzes table indexes
            'CREATE INDEX IF NOT EXISTS idx_quizzes_student_id ON quizzes(student_id)',
            'CREATE INDEX IF NOT EXISTS idx_quizzes_status ON quizzes(status)',
            'CREATE INDEX IF NOT EXISTS idx_quizzes_grade ON quizzes(grade)',
            'CREATE INDEX IF NOT EXISTS idx_quizzes_started_at ON quizzes(started_at)',
            
            // Quiz answers table indexes
            'CREATE INDEX IF NOT EXISTS idx_quiz_answers_quiz_id ON quiz_answers(quiz_id)',
            'CREATE INDEX IF NOT EXISTS idx_quiz_answers_question_id ON quiz_answers(question_id)',
            'CREATE INDEX IF NOT EXISTS idx_quiz_answers_is_correct ON quiz_answers(is_correct)',
            
            // Students table indexes
            'CREATE INDEX IF NOT EXISTS idx_students_grade ON students(grade)',

            'CREATE INDEX IF NOT EXISTS idx_students_roll_grade ON students(roll_number, grade)',
            
            // Composite indexes for complex queries
            'CREATE INDEX IF NOT EXISTS idx_quiz_answers_quiz_correct ON quiz_answers(quiz_id, is_correct)',
            'CREATE INDEX IF NOT EXISTS idx_questions_grade_difficulty ON questions(grade, difficulty)'
        ];

        const startTime = performance.now();
        
        for (const indexQuery of indexes) {
            try {
                await new Promise((resolve, reject) => {
                    db.run(indexQuery, (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            } catch (error) {
                console.warn(`Failed to create index: ${indexQuery}`, error);
            }
        }
        
        const indexTime = performance.now() - startTime;
        console.log(`Database indexes created/verified in ${indexTime.toFixed(2)}ms`);
        
        return indexTime;
    }

    // Optimized batch query execution
    async executeBatchQuery(queries, params = []) {
        const db = database.getDb();
        const startTime = performance.now();
        
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run('BEGIN TRANSACTION');
                
                const results = [];
                let completed = 0;
                
                queries.forEach((query, index) => {
                    const queryParams = params[index] || [];
                    
                    db.all(query, queryParams, (err, rows) => {
                        if (err) {
                            db.run('ROLLBACK');
                            return reject(err);
                        }
                        
                        results[index] = rows;
                        completed++;
                        
                        if (completed === queries.length) {
                            db.run('COMMIT', (commitErr) => {
                                if (commitErr) {
                                    return reject(commitErr);
                                }
                                
                                const queryTime = performance.now() - startTime;
                                performanceMonitor.trackQuery(`batchQuery(${queries.length})`, queryTime);
                                
                                resolve(results);
                            });
                        }
                    });
                });
            });
        });
    }

    // Optimized question fetching with pagination and filtering
    async getQuestionsOptimized(options = {}) {
        const {
            grade,
            subject,
            difficulty,
            limit = 50,
            offset = 0,
            includeOptions = true,
            randomize = false
        } = options;

        const cacheKey = `questions_${JSON.stringify(options)}`;
        const cached = this.queryCache.get(cacheKey);
        
        if (cached && (Date.now() - cached.timestamp) < 300000) { // 5 min cache
            return cached.data;
        }

        const startTime = performance.now();
        
        try {
            const db = database.getDb();
            
            if (!db) {
                console.warn('Database not available for getQuestionsOptimized');
                return [];
            }
            
            // Build dynamic query with proper parameterization
            let whereConditions = [];
            let queryParams = [];
            
            if (grade) {
                whereConditions.push('q.grade = ?');
                queryParams.push(grade);
            }
            
            if (subject) {
                whereConditions.push('q.subject = ?');
                queryParams.push(subject);
            }
            
            if (difficulty) {
                whereConditions.push('q.difficulty = ?');
                queryParams.push(difficulty);
            }
            
            const whereClause = whereConditions.length > 0 ? 
                `WHERE ${whereConditions.join(' AND ')}` : '';
            
            const orderClause = randomize ? 'ORDER BY RANDOM()' : 'ORDER BY q.id';
            const limitClause = `LIMIT ${limit} OFFSET ${offset}`;
            
            const questionQuery = `
                SELECT q.id, q.question_text, q.difficulty, q.grade
                FROM questions q
                ${whereClause}
                ${orderClause}
                ${limitClause}
            `;
            
            const questions = await new Promise((resolve, reject) => {
                db.all(questionQuery, queryParams, (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows || []);
                });
            });
            
            let result = questions;
            
            if (includeOptions && questions.length > 0) {
                // Batch fetch options for better performance
                const questionIds = questions.map(q => q.id);
                const placeholders = questionIds.map(() => '?').join(',');
                
                const options = await new Promise((resolve, reject) => {
                    db.all(`
                        SELECT question_id, id, option_text, option_order
                        FROM options 
                        WHERE question_id IN (${placeholders})
                        ORDER BY question_id, option_order
                    `, questionIds, (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows || []);
                    });
                });
                
                // Group options by question
                const optionsByQuestion = {};
                options.forEach(option => {
                    if (!optionsByQuestion[option.question_id]) {
                        optionsByQuestion[option.question_id] = [];
                    }
                    optionsByQuestion[option.question_id].push({
                        id: option.id,
                        text: option.option_text,
                        order: option.option_order
                    });
                });
                
                // Attach options to questions
                result = questions.map(question => ({
                    ...question,
                    options: optionsByQuestion[question.id] || []
                }));
            }
            
            const queryTime = performance.now() - startTime;
            this.trackQueryPerformance('getQuestionsOptimized', queryTime);
            
            // Cache results
            this.queryCache.set(cacheKey, {
                data: result,
                timestamp: Date.now()
            });
            
            return result;
        } catch (error) {
            console.error('Error in getQuestionsOptimized:', error);
            return [];
        }
    }

    // Optimized student progress tracking
    async getStudentProgressOptimized(studentId) {
        const startTime = performance.now();
        const db = database.getDb();
        
        const queries = [
            // Quiz summary
            `SELECT 
                COUNT(*) as total_quizzes,
                AVG(score) as avg_score,
                MAX(score) as best_score,
                COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_quizzes
             FROM quizzes WHERE student_id = ?`,
            
            // Recent quiz performance
            `SELECT grade, score, started_at, status
             FROM quizzes 
             WHERE student_id = ? 
             ORDER BY started_at DESC 
             LIMIT 10`,
            
            // Grade-wise performance
            `SELECT 
                quiz.grade,
                COUNT(*) as attempts,
                AVG(quiz.score) as avg_score
             FROM quizzes quiz
             WHERE quiz.student_id = ? AND quiz.status = 'completed'
             GROUP BY quiz.grade`
        ];
        
        const results = await this.executeBatchQuery(queries, [
            [studentId],
            [studentId], 
            [studentId]
        ]);
        
        const queryTime = performance.now() - startTime;
        this.trackQueryPerformance('getStudentProgressOptimized', queryTime);
        
        return {
            summary: results[0][0] || {},
            recentQuizzes: results[1] || [],
            gradePerformance: results[2] || []
        };
    }

    // Track query performance for monitoring
    trackQueryPerformance(queryName, duration) {
        if (!this.queryStats.has(queryName)) {
            this.queryStats.set(queryName, {
                count: 0,
                totalTime: 0,
                avgTime: 0,
                maxTime: 0,
                slowQueries: 0
            });
        }
        
        const stats = this.queryStats.get(queryName);
        stats.count++;
        stats.totalTime += duration;
        stats.avgTime = stats.totalTime / stats.count;
        stats.maxTime = Math.max(stats.maxTime, duration);
        
        if (duration > this.slowQueryThreshold) {
            stats.slowQueries++;
            console.warn(`Slow query detected: ${queryName} took ${duration.toFixed(2)}ms`);
        }
        
        performanceMonitor.trackQuery(queryName, duration);
    }

    // Get query performance statistics
    getQueryStats() {
        const stats = {};
        this.queryStats.forEach((value, key) => {
            stats[key] = { ...value };
        });
        return stats;
    }

    // Clear query cache
    clearCache(pattern = null) {
        if (pattern) {
            const regex = new RegExp(pattern);
            for (const [key] of this.queryCache) {
                if (regex.test(key)) {
                    this.queryCache.delete(key);
                }
            }
        } else {
            this.queryCache.clear();
        }
    }

    // Database health check
    async healthCheck() {
        const startTime = performance.now();
        const db = database.getDb();
        
        try {
            // Test basic connectivity
            await new Promise((resolve, reject) => {
                db.get('SELECT 1 as test', (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                });
            });
            
            // Check table counts
            const tableCounts = await new Promise((resolve, reject) => {
                db.all(`
                    SELECT 
                        (SELECT COUNT(*) FROM questions) as questions,
                        (SELECT COUNT(*) FROM options) as options,
                        (SELECT COUNT(*) FROM students) as students,
                        (SELECT COUNT(*) FROM quizzes) as quizzes,
                        (SELECT COUNT(*) FROM quiz_answers) as quiz_answers
                `, (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows[0]);
                });
            });
            
            const healthTime = performance.now() - startTime;
            
            return {
                status: 'healthy',
                responseTime: Math.round(healthTime),
                tableCounts,
                cacheSize: this.queryCache.size,
                queryStats: this.getQueryStats()
            };
        } catch (error) {
            return {
                status: 'unhealthy',
                error: error.message,
                responseTime: Math.round(performance.now() - startTime)
            };
        }
    }
}

// Singleton instance
const dbOptimizer = new DatabaseOptimizer();

module.exports = {
    DatabaseOptimizer,
    dbOptimizer
};