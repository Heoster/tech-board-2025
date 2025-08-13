const database = require('../config/database');

/**
 * Optimized query utilities for better performance
 */
class QueryOptimizer {
    constructor() {
        this.queryCache = new Map();
        this.queryStats = {
            totalQueries: 0,
            cacheHits: 0,
            averageTime: 0,
            slowQueries: []
        };
    }

    /**
     * Execute optimized quiz question queries with selective fields
     */
    async getQuizQuestions(grade, limit = 50, fields = ['id', 'question_text', 'difficulty']) {
        const startTime = Date.now();
        const cacheKey = `questions:${grade}:${limit}:${fields.join(',')}`;
        
        // Check cache first
        if (this.queryCache.has(cacheKey)) {
            this.queryStats.cacheHits++;
            return this.queryCache.get(cacheKey);
        }

        const db = database.getDb();
        
        // Build selective field query
        const fieldList = fields.includes('options') 
            ? fields.filter(f => f !== 'options').join(', q.') 
            : fields.join(', q.');
        
        const sql = `
            SELECT q.${fieldList}
            FROM questions q
            WHERE q.grade = ?
            ORDER BY RANDOM()
            LIMIT ?
        `;

        try {
            const questions = await new Promise((resolve, reject) => {
                db.all(sql, [grade, limit], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });

            // If options are requested, fetch them separately for better performance
            if (fields.includes('options')) {
                const questionIds = questions.map(q => q.id);
                const options = await this.getQuestionOptions(questionIds);
                
                // Attach options to questions
                questions.forEach(question => {
                    question.options = options.filter(opt => opt.question_id === question.id)
                        .sort((a, b) => a.option_order - b.option_order);
                });
            }

            // Cache the result
            this.queryCache.set(cacheKey, questions);
            
            // Update stats
            const queryTime = Date.now() - startTime;
            this.updateQueryStats(queryTime, sql);
            
            return questions;
        } catch (error) {
            console.error('Query optimization error:', error);
            throw error;
        }
    }

    /**
     * Batch fetch question options for multiple questions
     */
    async getQuestionOptions(questionIds) {
        if (!questionIds.length) return [];

        const db = database.getDb();
        const placeholders = questionIds.map(() => '?').join(',');
        
        const sql = `
            SELECT question_id, id, option_text as text, option_order, is_correct
            FROM question_options
            WHERE question_id IN (${placeholders})
            ORDER BY question_id, option_order
        `;

        return new Promise((resolve, reject) => {
            db.all(sql, questionIds, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    /**
     * Optimized student progress tracking
     */
    async getStudentProgress(studentId, includeDetails = false) {
        const cacheKey = `progress:${studentId}:${includeDetails}`;
        
        if (this.queryCache.has(cacheKey)) {
            this.queryStats.cacheHits++;
            return this.queryCache.get(cacheKey);
        }

        const db = database.getDb();
        
        const baseFields = `
            qs.id as session_id,
            qs.status,
            qs.score,
            qs.total_questions,
            qs.correct_answers,
            qs.created_at,
            qs.completed_at,
            qs.time_taken
        `;

        const detailFields = includeDetails ? `, 
            COUNT(qr.id) as responses_count,
            AVG(CASE WHEN qr.is_correct = 1 THEN 1.0 ELSE 0.0 END) as accuracy
        ` : '';

        const sql = `
            SELECT ${baseFields}${detailFields}
            FROM quiz_sessions qs
            ${includeDetails ? 'LEFT JOIN quiz_responses qr ON qs.id = qr.session_id' : ''}
            WHERE qs.student_id = ?
            ${includeDetails ? 'GROUP BY qs.id' : ''}
            ORDER BY qs.created_at DESC
            LIMIT 10
        `;

        try {
            const progress = await new Promise((resolve, reject) => {
                db.all(sql, [studentId], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });

            this.queryCache.set(cacheKey, progress);
            return progress;
        } catch (error) {
            console.error('Student progress query error:', error);
            throw error;
        }
    }

    /**
     * Batch insert quiz responses for better performance
     */
    async batchInsertResponses(sessionId, responses) {
        const db = database.getDb();
        
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run('BEGIN TRANSACTION');
                
                const stmt = db.prepare(`
                    INSERT INTO quiz_responses (session_id, question_id, selected_option_id, is_correct, response_time)
                    VALUES (?, ?, ?, ?, ?)
                `);

                let completed = 0;
                let hasError = false;

                responses.forEach(response => {
                    stmt.run([
                        sessionId,
                        response.question_id,
                        response.selected_option_id,
                        response.is_correct ? 1 : 0,
                        response.response_time || null
                    ], function(err) {
                        if (err && !hasError) {
                            hasError = true;
                            db.run('ROLLBACK');
                            reject(err);
                            return;
                        }
                        
                        completed++;
                        if (completed === responses.length && !hasError) {
                            stmt.finalize();
                            db.run('COMMIT', (err) => {
                                if (err) reject(err);
                                else resolve({ inserted: completed });
                            });
                        }
                    });
                });
            });
        });
    }

    /**
     * Optimized leaderboard query with pagination
     */
    async getLeaderboard(grade = null, limit = 50, offset = 0) {
        const cacheKey = `leaderboard:${grade}:${limit}:${offset}`;
        
        if (this.queryCache.has(cacheKey)) {
            this.queryStats.cacheHits++;
            return this.queryCache.get(cacheKey);
        }

        const db = database.getDb();
        
        const gradeFilter = grade ? 'WHERE s.grade = ?' : '';
        const params = grade ? [grade, limit, offset] : [limit, offset];
        
        const sql = `
            SELECT 
                s.name,
                s.school,
                s.grade,
                qs.score,
                qs.correct_answers,
                qs.total_questions,
                qs.time_taken,
                qs.completed_at,
                RANK() OVER (ORDER BY qs.score DESC, qs.time_taken ASC) as rank
            FROM students s
            INNER JOIN quiz_sessions qs ON s.id = qs.student_id
            ${gradeFilter}
            AND qs.status = 'completed'
            ORDER BY qs.score DESC, qs.time_taken ASC
            LIMIT ? OFFSET ?
        `;

        try {
            const leaderboard = await new Promise((resolve, reject) => {
                db.all(sql, params, (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });

            this.queryCache.set(cacheKey, leaderboard);
            return leaderboard;
        } catch (error) {
            console.error('Leaderboard query error:', error);
            throw error;
        }
    }

    /**
     * Update query statistics
     */
    updateQueryStats(queryTime, sql) {
        this.queryStats.totalQueries++;
        
        // Update average time
        this.queryStats.averageTime = 
            (this.queryStats.averageTime * (this.queryStats.totalQueries - 1) + queryTime) / 
            this.queryStats.totalQueries;

        // Track slow queries (>1000ms)
        if (queryTime > 1000) {
            this.queryStats.slowQueries.push({
                sql: sql.substring(0, 100) + '...',
                time: queryTime,
                timestamp: new Date().toISOString()
            });
            
            // Keep only last 10 slow queries
            if (this.queryStats.slowQueries.length > 10) {
                this.queryStats.slowQueries.shift();
            }
        }
    }

    /**
     * Clear query cache
     */
    clearCache(pattern = null) {
        if (pattern) {
            for (const [key] of this.queryCache) {
                if (key.includes(pattern)) {
                    this.queryCache.delete(key);
                }
            }
        } else {
            this.queryCache.clear();
        }
    }

    /**
     * Get query statistics
     */
    getStats() {
        return {
            ...this.queryStats,
            cacheSize: this.queryCache.size,
            hitRate: this.queryStats.totalQueries > 0 
                ? this.queryStats.cacheHits / this.queryStats.totalQueries 
                : 0
        };
    }
}

// Export singleton instance
module.exports = new QueryOptimizer();