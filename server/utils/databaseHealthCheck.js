const database = require('../config/database');
const logger = require('./logger');

class DatabaseHealthChecker {
    constructor() {
        this.checks = [
            this.checkTableStructure,
            this.checkConstraints,
            this.checkDataIntegrity,
            this.checkQuestionDistribution,
            this.checkStudentStructure,
            this.checkQuizIntegrity,
            this.checkIndexes
        ];
    }

    async runAllChecks() {
        logger.info('Starting comprehensive database health check');
        const results = {
            timestamp: new Date().toISOString(),
            overallHealth: 'HEALTHY',
            checks: [],
            warnings: [],
            errors: [],
            statistics: {}
        };

        try {
            for (const check of this.checks) {
                const checkResult = await check.call(this);
                results.checks.push(checkResult);

                if (checkResult.status === 'ERROR') {
                    results.errors.push(checkResult);
                    results.overallHealth = 'CRITICAL';
                } else if (checkResult.status === 'WARNING') {
                    results.warnings.push(checkResult);
                    if (results.overallHealth === 'HEALTHY') {
                        results.overallHealth = 'WARNING';
                    }
                }
            }

            // Get database statistics
            results.statistics = await this.getDatabaseStatistics();

            // Log results
            if (results.overallHealth === 'CRITICAL') {
                logger.error('Database health check failed', { 
                    errors: results.errors,
                    warnings: results.warnings 
                });
            } else if (results.overallHealth === 'WARNING') {
                logger.warn('Database health check has warnings', { 
                    warnings: results.warnings 
                });
            } else {
                logger.info('Database health check passed', { 
                    statistics: results.statistics 
                });
            }

            return results;

        } catch (error) {
            logger.error('Database health check failed with exception', { error: error.message });
            results.overallHealth = 'CRITICAL';
            results.errors.push({
                name: 'Health Check Exception',
                status: 'ERROR',
                message: error.message
            });
            return results;
        }
    }

    async checkTableStructure() {
        const db = database.getDb();
        const requiredTables = [
            'students', 'questions', 'options', 'quizzes', 'responses', 'admins'
        ];

        try {
            const tables = await new Promise((resolve, reject) => {
                db.all(
                    "SELECT name FROM sqlite_master WHERE type='table'",
                    (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows.map(row => row.name));
                    }
                );
            });

            const missingTables = requiredTables.filter(table => !tables.includes(table));
            
            return {
                name: 'Table Structure Check',
                status: missingTables.length > 0 ? 'ERROR' : 'HEALTHY',
                message: missingTables.length > 0 
                    ? `Missing tables: ${missingTables.join(', ')}`
                    : 'All required tables present',
                details: { foundTables: tables, requiredTables, missingTables }
            };

        } catch (error) {
            return {
                name: 'Table Structure Check',
                status: 'ERROR',
                message: `Failed to check table structure: ${error.message}`
            };
        }
    }

    async checkConstraints() {
        const db = database.getDb();
        
        try {
            // Check if foreign keys are enabled
            const foreignKeys = await new Promise((resolve, reject) => {
                db.get('PRAGMA foreign_keys', (err, row) => {
                    if (err) reject(err);
                    else resolve(row.foreign_keys === 1);
                });
            });

            // Check unique constraints
            const duplicateStudents = await new Promise((resolve, reject) => {
                db.get(
                    'SELECT COUNT(*) as count FROM (SELECT roll_number, grade, section, COUNT(*) as duplicates FROM students GROUP BY roll_number, grade, section HAVING COUNT(*) > 1)',
                    (err, row) => {
                        if (err) reject(err);
                        else resolve(row.count);
                    }
                );
            });

            const issues = [];
            if (!foreignKeys) issues.push('Foreign keys not enabled');
            if (duplicateStudents > 0) issues.push(`${duplicateStudents} duplicate student records found`);

            return {
                name: 'Database Constraints Check',
                status: issues.length > 0 ? 'ERROR' : 'HEALTHY',
                message: issues.length > 0 ? issues.join(', ') : 'All constraints are properly configured',
                details: { foreignKeysEnabled: foreignKeys, duplicateStudents }
            };

        } catch (error) {
            return {
                name: 'Database Constraints Check',
                status: 'ERROR',
                message: `Failed to check constraints: ${error.message}`
            };
        }
    }

    async checkDataIntegrity() {
        const db = database.getDb();
        
        try {
            // Check questions without options
            const questionsWithoutOptions = await new Promise((resolve, reject) => {
                db.get(
                    `SELECT COUNT(*) as count FROM questions q 
                     WHERE NOT EXISTS (SELECT 1 FROM options o WHERE o.question_id = q.id)`,
                    (err, row) => {
                        if (err) reject(err);
                        else resolve(row.count);
                    }
                );
            });

            // Check options without questions
            const orphanedOptions = await new Promise((resolve, reject) => {
                db.get(
                    `SELECT COUNT(*) as count FROM options o 
                     WHERE NOT EXISTS (SELECT 1 FROM questions q WHERE q.id = o.question_id)`,
                    (err, row) => {
                        if (err) reject(err);
                        else resolve(row.count);
                    }
                );
            });

            // Check quizzes without responses
            const quizzesWithoutResponses = await new Promise((resolve, reject) => {
                db.get(
                    `SELECT COUNT(*) as count FROM quizzes q 
                     WHERE q.status = 'completed' AND NOT EXISTS (SELECT 1 FROM responses r WHERE r.quiz_id = q.id)`,
                    (err, row) => {
                        if (err) reject(err);
                        else resolve(row.count);
                    }
                );
            });

            const issues = [];
            if (questionsWithoutOptions > 0) issues.push(`${questionsWithoutOptions} questions without options`);
            if (orphanedOptions > 0) issues.push(`${orphanedOptions} orphaned options`);
            if (quizzesWithoutResponses > 0) issues.push(`${quizzesWithoutResponses} completed quizzes without responses`);

            return {
                name: 'Data Integrity Check',
                status: issues.length > 0 ? 'ERROR' : 'HEALTHY',
                message: issues.length > 0 ? issues.join(', ') : 'Data integrity is maintained',
                details: { questionsWithoutOptions, orphanedOptions, quizzesWithoutResponses }
            };

        } catch (error) {
            return {
                name: 'Data Integrity Check',
                status: 'ERROR',
                message: `Failed to check data integrity: ${error.message}`
            };
        }
    }

    async checkQuestionDistribution() {
        const db = database.getDb();
        
        try {
            const distribution = await new Promise((resolve, reject) => {
                db.all(
                    `SELECT grade, difficulty, COUNT(*) as count 
                     FROM questions 
                     GROUP BY grade, difficulty 
                     ORDER BY grade, difficulty`,
                    (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    }
                );
            });

            const minRequiredPerGradeLevel = 15; // Minimum questions per grade-difficulty combo
            const warnings = [];

            const distributionMap = {};
            distribution.forEach(row => {
                if (!distributionMap[row.grade]) distributionMap[row.grade] = {};
                distributionMap[row.grade][row.difficulty] = row.count;
                
                if (row.count < minRequiredPerGradeLevel) {
                    warnings.push(`Grade ${row.grade} ${row.difficulty}: only ${row.count} questions (min: ${minRequiredPerGradeLevel})`);
                }
            });

            return {
                name: 'Question Distribution Check',
                status: warnings.length > 0 ? 'WARNING' : 'HEALTHY',
                message: warnings.length > 0 
                    ? `Some grade-difficulty combinations have insufficient questions: ${warnings.join(', ')}`
                    : 'Question distribution is adequate',
                details: { distribution: distributionMap, warnings }
            };

        } catch (error) {
            return {
                name: 'Question Distribution Check',
                status: 'ERROR',
                message: `Failed to check question distribution: ${error.message}`
            };
        }
    }

    async checkStudentStructure() {
        const db = database.getDb();
        
        try {
            // Check grade compliance
            const invalidGrades = await new Promise((resolve, reject) => {
                db.all(
                    'SELECT grade, COUNT(*) as count FROM students WHERE grade NOT IN (6, 7, 8, 9, 11) GROUP BY grade',
                    (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    }
                );
            });

            // Check roll number compliance
            const invalidRollNumbers = await new Promise((resolve, reject) => {
                db.get(
                    'SELECT COUNT(*) as count FROM students WHERE roll_number < 1 OR roll_number > 80',
                    (err, row) => {
                        if (err) reject(err);
                        else resolve(row.count);
                    }
                );
            });

            // Check section compliance
            const invalidSections = await new Promise((resolve, reject) => {
                db.all(
                    'SELECT section, COUNT(*) as count FROM students WHERE section NOT IN ("A", "B") GROUP BY section',
                    (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    }
                );
            });

            const issues = [];
            if (invalidGrades.length > 0) {
                issues.push(`Invalid grades found: ${invalidGrades.map(g => `${g.grade} (${g.count} students)`).join(', ')}`);
            }
            if (invalidRollNumbers > 0) {
                issues.push(`${invalidRollNumbers} students with invalid roll numbers`);
            }
            if (invalidSections.length > 0) {
                issues.push(`Invalid sections found: ${invalidSections.map(s => `${s.section} (${s.count} students)`).join(', ')}`);
            }

            return {
                name: 'Student Structure Check',
                status: issues.length > 0 ? 'ERROR' : 'HEALTHY',
                message: issues.length > 0 ? issues.join(', ') : 'Student structure is compliant',
                details: { invalidGrades, invalidRollNumbers, invalidSections }
            };

        } catch (error) {
            return {
                name: 'Student Structure Check',
                status: 'ERROR',
                message: `Failed to check student structure: ${error.message}`
            };
        }
    }

    async checkQuizIntegrity() {
        const db = database.getDb();
        
        try {
            // Check for duplicate questions in quizzes
            const quizzesWithDuplicates = await new Promise((resolve, reject) => {
                db.all(
                    `SELECT quiz_id, COUNT(*) as total_responses, COUNT(DISTINCT question_id) as unique_questions
                     FROM responses 
                     GROUP BY quiz_id 
                     HAVING COUNT(*) != COUNT(DISTINCT question_id)`,
                    (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    }
                );
            });

            // Check completed quizzes with wrong response count
            const quizzesWithWrongCount = await new Promise((resolve, reject) => {
                db.all(
                    `SELECT q.id, q.total_questions, COUNT(r.id) as actual_responses
                     FROM quizzes q
                     LEFT JOIN responses r ON q.id = r.quiz_id
                     WHERE q.status = 'completed'
                     GROUP BY q.id, q.total_questions
                     HAVING COUNT(r.id) != q.total_questions`,
                    (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    }
                );
            });

            const issues = [];
            if (quizzesWithDuplicates.length > 0) {
                issues.push(`${quizzesWithDuplicates.length} quizzes with duplicate questions`);
            }
            if (quizzesWithWrongCount.length > 0) {
                issues.push(`${quizzesWithWrongCount.length} completed quizzes with incorrect response count`);
            }

            return {
                name: 'Quiz Integrity Check',
                status: issues.length > 0 ? 'ERROR' : 'HEALTHY',
                message: issues.length > 0 ? issues.join(', ') : 'Quiz integrity is maintained',
                details: { quizzesWithDuplicates, quizzesWithWrongCount }
            };

        } catch (error) {
            return {
                name: 'Quiz Integrity Check',
                status: 'ERROR',
                message: `Failed to check quiz integrity: ${error.message}`
            };
        }
    }

    async checkIndexes() {
        const db = database.getDb();
        
        try {
            const indexes = await new Promise((resolve, reject) => {
                db.all(
                    "SELECT name, tbl_name FROM sqlite_master WHERE type='index' AND name NOT LIKE 'sqlite_%'",
                    (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    }
                );
            });

            const requiredIndexes = [
                'idx_students_roll_grade_section',
                'idx_questions_grade_difficulty', 
                'idx_unique_quiz_question_response',
                'idx_student_quiz_lookup'
            ];

            const existingIndexes = indexes.map(idx => idx.name);
            const missingIndexes = requiredIndexes.filter(idx => !existingIndexes.includes(idx));

            return {
                name: 'Database Indexes Check',
                status: missingIndexes.length > 0 ? 'WARNING' : 'HEALTHY',
                message: missingIndexes.length > 0 
                    ? `Missing recommended indexes: ${missingIndexes.join(', ')}`
                    : 'All recommended indexes are present',
                details: { existingIndexes, missingIndexes }
            };

        } catch (error) {
            return {
                name: 'Database Indexes Check',
                status: 'ERROR',
                message: `Failed to check indexes: ${error.message}`
            };
        }
    }

    async getDatabaseStatistics() {
        const db = database.getDb();
        
        try {
            const stats = {};

            // Get table counts
            const tables = ['students', 'questions', 'options', 'quizzes', 'responses', 'admins'];
            for (const table of tables) {
                stats[table] = await new Promise((resolve, reject) => {
                    db.get(`SELECT COUNT(*) as count FROM ${table}`, (err, row) => {
                        if (err) reject(err);
                        else resolve(row.count);
                    });
                });
            }

            // Get quiz statistics
            const quizStats = await new Promise((resolve, reject) => {
                db.all(
                    `SELECT status, COUNT(*) as count FROM quizzes GROUP BY status`,
                    (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    }
                );
            });
            stats.quizStatusBreakdown = {};
            quizStats.forEach(stat => {
                stats.quizStatusBreakdown[stat.status] = stat.count;
            });

            // Get question distribution by grade
            const questionDistribution = await new Promise((resolve, reject) => {
                db.all(
                    'SELECT grade, COUNT(*) as count FROM questions GROUP BY grade ORDER BY grade',
                    (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    }
                );
            });
            stats.questionsByGrade = {};
            questionDistribution.forEach(dist => {
                stats.questionsByGrade[`grade_${dist.grade}`] = dist.count;
            });

            return stats;

        } catch (error) {
            logger.error('Failed to get database statistics', { error: error.message });
            return { error: 'Failed to collect statistics' };
        }
    }

    // Method to run a quick health check
    async quickHealthCheck() {
        try {
            const db = database.getDb();
            const startTime = Date.now();
            
            // Simple connectivity test
            await new Promise((resolve, reject) => {
                db.get('SELECT 1 as test', (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                });
            });

            const responseTime = Date.now() - startTime;
            
            return {
                healthy: true,
                responseTime,
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            return {
                healthy: false,
                error: error.message,
                timestamp: new Date().toISOString()
            };
        }
    }
}

module.exports = new DatabaseHealthChecker();