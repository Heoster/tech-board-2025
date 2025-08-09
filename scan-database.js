#!/usr/bin/env node

/**
 * Comprehensive Database Scanner
 * Scans and analyzes the TECH BOARD 2025 database
 */

const database = require('./server/config/database');

async function scanDatabase() {
    console.log('🔍 SCANNING TECH BOARD 2025 DATABASE');
    console.log('====================================');
    console.log('');

    try {
        await database.connect();
        const db = database.getDb();

        // 1. Database File Information
        console.log('📁 DATABASE FILE INFORMATION:');
        console.log('─────────────────────────────');
        const fs = require('fs');
        const path = require('path');
        const dbPath = process.env.DB_PATH || './server/database/mcq_system.db';
        
        if (fs.existsSync(dbPath)) {
            const stats = fs.statSync(dbPath);
            console.log(`   📍 Location: ${dbPath}`);
            console.log(`   📊 Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
            console.log(`   📅 Created: ${stats.birthtime.toISOString()}`);
            console.log(`   🔄 Modified: ${stats.mtime.toISOString()}`);
        } else {
            console.log(`   ❌ Database file not found at: ${dbPath}`);
        }
        console.log('');

        // 2. Table Structure Analysis
        console.log('🏗️  TABLE STRUCTURE ANALYSIS:');
        console.log('─────────────────────────────');
        
        const tables = await new Promise((resolve, reject) => {
            db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        for (const table of tables) {
            console.log(`\n📋 Table: ${table.name.toUpperCase()}`);
            
            // Get table schema
            const schema = await new Promise((resolve, reject) => {
                db.all(`PRAGMA table_info(${table.name})`, (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });

            schema.forEach(column => {
                const nullable = column.notnull ? 'NOT NULL' : 'NULLABLE';
                const defaultVal = column.dflt_value ? ` DEFAULT ${column.dflt_value}` : '';
                const primaryKey = column.pk ? ' [PRIMARY KEY]' : '';
                console.log(`   ${column.name}: ${column.type} ${nullable}${defaultVal}${primaryKey}`);
            });

            // Get row count
            const count = await new Promise((resolve, reject) => {
                db.get(`SELECT COUNT(*) as count FROM ${table.name}`, (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                });
            });
            console.log(`   📊 Total Records: ${count}`);
        }
        console.log('');

        // 3. Questions Analysis
        console.log('❓ QUESTIONS ANALYSIS:');
        console.log('─────────────────────');
        
        const questionStats = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    grade,
                    difficulty,
                    COUNT(*) as count
                FROM questions 
                GROUP BY grade, difficulty 
                ORDER BY grade, difficulty
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        const gradeStats = {};
        questionStats.forEach(stat => {
            if (!gradeStats[stat.grade]) {
                gradeStats[stat.grade] = { total: 0, basic: 0, medium: 0, advanced: 0 };
            }
            gradeStats[stat.grade][stat.difficulty] = stat.count;
            gradeStats[stat.grade].total += stat.count;
        });

        Object.keys(gradeStats).sort().forEach(grade => {
            const stats = gradeStats[grade];
            console.log(`   Grade ${grade}: ${stats.total} questions`);
            console.log(`     📗 Basic: ${stats.basic || 0}`);
            console.log(`     📙 Medium: ${stats.medium || 0}`);
            console.log(`     📕 Advanced: ${stats.advanced || 0}`);
        });

        const totalQuestions = Object.values(gradeStats).reduce((sum, stats) => sum + stats.total, 0);
        console.log(`   🎯 TOTAL QUESTIONS: ${totalQuestions}`);
        console.log('');

        // 4. Options Analysis
        console.log('🔘 OPTIONS ANALYSIS:');
        console.log('───────────────────');
        
        const optionStats = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    COUNT(*) as total_options,
                    SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END) as correct_options,
                    COUNT(DISTINCT question_id) as questions_with_options
                FROM options
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows[0]);
            });
        });

        console.log(`   📊 Total Options: ${optionStats.total_options}`);
        console.log(`   ✅ Correct Options: ${optionStats.correct_options}`);
        console.log(`   ❓ Questions with Options: ${optionStats.questions_with_options}`);
        console.log(`   📈 Average Options per Question: ${(optionStats.total_options / optionStats.questions_with_options).toFixed(1)}`);

        // Check for questions without options
        const questionsWithoutOptions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.question_text, q.grade 
                FROM questions q 
                LEFT JOIN options o ON q.id = o.question_id 
                WHERE o.question_id IS NULL
                LIMIT 5
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        if (questionsWithoutOptions.length > 0) {
            console.log(`   ⚠️  Questions without options: ${questionsWithoutOptions.length}`);
            questionsWithoutOptions.forEach(q => {
                console.log(`     - Grade ${q.grade}: ${q.question_text.substring(0, 50)}...`);
            });
        } else {
            console.log(`   ✅ All questions have options`);
        }
        console.log('');

        // 5. Students Analysis
        console.log('👥 STUDENTS ANALYSIS:');
        console.log('────────────────────');
        
        const studentStats = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    grade,
                    section,
                    COUNT(*) as count
                FROM students 
                GROUP BY grade, section 
                ORDER BY grade, section
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        if (studentStats.length > 0) {
            studentStats.forEach(stat => {
                console.log(`   Grade ${stat.grade} Section ${stat.section}: ${stat.count} students`);
            });
            
            const totalStudents = studentStats.reduce((sum, stat) => sum + stat.count, 0);
            console.log(`   👥 Total Students: ${totalStudents}`);
        } else {
            console.log(`   📝 No students registered yet`);
        }
        console.log('');

        // 6. Quizzes Analysis
        console.log('📝 QUIZZES ANALYSIS:');
        console.log('──────────────────');
        
        const quizStats = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    status,
                    COUNT(*) as count,
                    AVG(score) as avg_score
                FROM quizzes 
                GROUP BY status
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        if (quizStats.length > 0) {
            quizStats.forEach(stat => {
                const avgScore = stat.avg_score ? stat.avg_score.toFixed(1) : 'N/A';
                console.log(`   ${stat.status}: ${stat.count} quizzes (Avg Score: ${avgScore})`);
            });
        } else {
            console.log(`   📝 No quizzes taken yet`);
        }
        console.log('');

        // 7. Admin Analysis
        console.log('👨‍💼 ADMIN ANALYSIS:');
        console.log('─────────────────');
        
        const adminStats = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    username,
                    created_at,
                    last_login,
                    failed_attempts
                FROM admins
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        if (adminStats.length > 0) {
            adminStats.forEach(admin => {
                console.log(`   👤 ${admin.username}`);
                console.log(`     Created: ${admin.created_at || 'Unknown'}`);
                console.log(`     Last Login: ${admin.last_login || 'Never'}`);
                console.log(`     Failed Attempts: ${admin.failed_attempts || 0}`);
            });
        } else {
            console.log(`   ❌ No admin accounts found`);
        }
        console.log('');

        // 8. Database Integrity Check
        console.log('🔍 DATABASE INTEGRITY CHECK:');
        console.log('───────────────────────────');
        
        // Check for orphaned options
        const orphanedOptions = await new Promise((resolve, reject) => {
            db.get(`
                SELECT COUNT(*) as count 
                FROM options o 
                LEFT JOIN questions q ON o.question_id = q.id 
                WHERE q.id IS NULL
            `, (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        // Check for questions with wrong number of options
        const wrongOptionCount = await new Promise((resolve, reject) => {
            db.all(`
                SELECT question_id, COUNT(*) as option_count 
                FROM options 
                GROUP BY question_id 
                HAVING COUNT(*) != 4
                LIMIT 5
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        // Check for questions with no correct answer
        const noCorrectAnswer = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.question_text, q.grade
                FROM questions q
                WHERE q.id NOT IN (
                    SELECT DISTINCT question_id 
                    FROM options 
                    WHERE is_correct = 1
                )
                LIMIT 5
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        // Check for questions with multiple correct answers
        const multipleCorrect = await new Promise((resolve, reject) => {
            db.all(`
                SELECT question_id, COUNT(*) as correct_count
                FROM options 
                WHERE is_correct = 1
                GROUP BY question_id
                HAVING COUNT(*) > 1
                LIMIT 5
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log(`   🔗 Orphaned Options: ${orphanedOptions}`);
        console.log(`   🔢 Questions with wrong option count: ${wrongOptionCount.length}`);
        console.log(`   ❌ Questions with no correct answer: ${noCorrectAnswer.length}`);
        console.log(`   ⚠️  Questions with multiple correct answers: ${multipleCorrect.length}`);

        if (wrongOptionCount.length > 0) {
            console.log(`     Wrong option counts:`);
            wrongOptionCount.forEach(q => {
                console.log(`       Question ${q.question_id}: ${q.option_count} options`);
            });
        }

        if (noCorrectAnswer.length > 0) {
            console.log(`     Questions without correct answers:`);
            noCorrectAnswer.forEach(q => {
                console.log(`       Grade ${q.grade}: ${q.question_text.substring(0, 50)}...`);
            });
        }

        if (multipleCorrect.length > 0) {
            console.log(`     Questions with multiple correct answers:`);
            multipleCorrect.forEach(q => {
                console.log(`       Question ${q.question_id}: ${q.correct_count} correct options`);
            });
        }

        console.log('');

        // 9. Quiz Generation Test
        console.log('🎯 QUIZ GENERATION TEST:');
        console.log('────────────────────────');
        
        const grades = [6, 7, 8, 9, 11];
        for (const grade of grades) {
            try {
                const testQuestions = await new Promise((resolve, reject) => {
                    db.all(`
                        SELECT q.*, 
                               GROUP_CONCAT(o.option_text || '|' || o.is_correct) as options
                        FROM questions q
                        JOIN options o ON q.id = o.question_id
                        WHERE q.grade = ?
                        GROUP BY q.id
                        ORDER BY RANDOM()
                        LIMIT 25
                    `, [grade], (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    });
                });

                if (testQuestions.length >= 25) {
                    console.log(`   ✅ Grade ${grade}: Can generate quiz (${testQuestions.length} questions available)`);
                } else {
                    console.log(`   ❌ Grade ${grade}: Cannot generate quiz (only ${testQuestions.length} questions available, need 25)`);
                }
            } catch (error) {
                console.log(`   ❌ Grade ${grade}: Error testing quiz generation - ${error.message}`);
            }
        }

        console.log('');

        // 10. Summary
        console.log('📊 DATABASE SUMMARY:');
        console.log('───────────────────');
        console.log(`   📁 Database Size: ${fs.existsSync(dbPath) ? (fs.statSync(dbPath).size / 1024 / 1024).toFixed(2) + ' MB' : 'Unknown'}`);
        console.log(`   📋 Tables: ${tables.length}`);
        console.log(`   ❓ Total Questions: ${totalQuestions}`);
        console.log(`   🔘 Total Options: ${optionStats.total_options}`);
        console.log(`   👥 Students: ${studentStats.reduce((sum, stat) => sum + stat.count, 0)}`);
        console.log(`   📝 Quizzes: ${quizStats.reduce((sum, stat) => sum + stat.count, 0)}`);
        console.log(`   👨‍💼 Admins: ${adminStats.length}`);
        
        const isHealthy = orphanedOptions === 0 && 
                         wrongOptionCount.length === 0 && 
                         noCorrectAnswer.length === 0 && 
                         multipleCorrect.length === 0 &&
                         totalQuestions >= 1000;
        
        console.log(`   🏥 Database Health: ${isHealthy ? '✅ HEALTHY' : '⚠️  NEEDS ATTENTION'}`);
        console.log(`   🎯 Quiz Ready: ${totalQuestions >= 125 ? '✅ YES' : '❌ NO'} (Need 25 questions per grade)`);

        await database.close();
        console.log('\n✅ Database scan complete!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error scanning database:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    scanDatabase();
}

module.exports = { scanDatabase };