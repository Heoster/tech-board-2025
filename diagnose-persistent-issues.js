const database = require('./server/config/database');

async function diagnosePersistentIssues() {
    try {
        await database.connect();
        const db = database.getDb();
        
        console.log('🔍 DIAGNOSING PERSISTENT SYSTEM ISSUES');
        console.log('======================================\n');
        
        // Issue 1: Check database connection and basic functionality
        console.log('📋 Issue 1: Database Connection and Basic Functionality...');
        try {
            const dbInfo = await new Promise((resolve, reject) => {
                db.get('SELECT COUNT(*) as total_questions FROM questions', (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                });
            });
            console.log(`✅ Database connected successfully - ${dbInfo.total_questions} questions found`);
        } catch (error) {
            console.log(`❌ Database connection issue: ${error.message}`);
        }
        
        // Issue 2: Check table structure
        console.log('\n📋 Issue 2: Verifying Table Structure...');
        const tables = ['students', 'questions', 'options', 'quizzes', 'responses', 'admins'];
        
        for (const table of tables) {
            try {
                const tableInfo = await new Promise((resolve, reject) => {
                    db.all(`PRAGMA table_info(${table})`, (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    });
                });
                
                if (tableInfo.length > 0) {
                    console.log(`✅ Table '${table}' exists with ${tableInfo.length} columns`);
                } else {
                    console.log(`❌ Table '${table}' not found or empty`);
                }
            } catch (error) {
                console.log(`❌ Error checking table '${table}': ${error.message}`);
            }
        }
        
        // Issue 3: Check for orphaned records
        console.log('\n📋 Issue 3: Checking for Orphaned Records...');
        
        // Check for options without questions
        const orphanedOptions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT o.id, o.question_id
                FROM options o
                LEFT JOIN questions q ON o.question_id = q.id
                WHERE q.id IS NULL
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        if (orphanedOptions.length === 0) {
            console.log('✅ No orphaned options found');
        } else {
            console.log(`❌ Found ${orphanedOptions.length} orphaned options`);
        }
        
        // Check for responses without quizzes
        const orphanedResponses = await new Promise((resolve, reject) => {
            db.all(`
                SELECT r.id, r.quiz_id
                FROM responses r
                LEFT JOIN quizzes q ON r.quiz_id = q.id
                WHERE q.id IS NULL
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        if (orphanedResponses.length === 0) {
            console.log('✅ No orphaned responses found');
        } else {
            console.log(`❌ Found ${orphanedResponses.length} orphaned responses`);
        }
        
        // Issue 4: Check question quality
        console.log('\n📋 Issue 4: Checking Question Quality...');
        
        // Check for questions without options
        const questionsWithoutOptions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.question_text
                FROM questions q
                LEFT JOIN options o ON q.id = o.question_id
                WHERE o.id IS NULL
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        if (questionsWithoutOptions.length === 0) {
            console.log('✅ All questions have options');
        } else {
            console.log(`❌ Found ${questionsWithoutOptions.length} questions without options`);
        }
        
        // Check for questions with wrong number of options
        const questionsWrongOptionCount = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.question_text, COUNT(o.id) as option_count
                FROM questions q
                LEFT JOIN options o ON q.id = o.question_id
                GROUP BY q.id, q.question_text
                HAVING COUNT(o.id) != 4
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        if (questionsWrongOptionCount.length === 0) {
            console.log('✅ All questions have exactly 4 options');
        } else {
            console.log(`❌ Found ${questionsWrongOptionCount.length} questions with wrong option count`);
            questionsWrongOptionCount.slice(0, 3).forEach(q => {
                console.log(`   Question ${q.id}: ${q.option_count} options`);
            });
        }
        
        // Check for questions without correct answers
        const questionsWithoutCorrectAnswer = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.question_text
                FROM questions q
                WHERE NOT EXISTS (
                    SELECT 1 FROM options o 
                    WHERE o.question_id = q.id AND o.is_correct = 1
                )
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        if (questionsWithoutCorrectAnswer.length === 0) {
            console.log('✅ All questions have correct answers');
        } else {
            console.log(`❌ Found ${questionsWithoutCorrectAnswer.length} questions without correct answers`);
        }
        
        // Issue 5: Check system performance
        console.log('\n📋 Issue 5: System Performance Analysis...');
        
        const performanceStats = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    (SELECT COUNT(*) FROM students) as total_students,
                    (SELECT COUNT(*) FROM questions) as total_questions,
                    (SELECT COUNT(*) FROM quizzes) as total_quizzes,
                    (SELECT COUNT(*) FROM responses) as total_responses,
                    (SELECT COUNT(*) FROM quizzes WHERE status = 'completed') as completed_quizzes,
                    (SELECT COUNT(*) FROM quizzes WHERE status = 'in_progress') as in_progress_quizzes
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows[0]);
            });
        });
        
        console.log('📊 System Statistics:');
        console.log(`   Students: ${performanceStats.total_students}`);
        console.log(`   Questions: ${performanceStats.total_questions}`);
        console.log(`   Total Quizzes: ${performanceStats.total_quizzes}`);
        console.log(`   Completed Quizzes: ${performanceStats.completed_quizzes}`);
        console.log(`   In-Progress Quizzes: ${performanceStats.in_progress_quizzes}`);
        console.log(`   Total Responses: ${performanceStats.total_responses}`);
        
        // Issue 6: Check for potential memory issues
        console.log('\n📋 Issue 6: Memory and Resource Usage...');
        
        const largeQuestions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT id, LENGTH(question_text) as length
                FROM questions
                WHERE LENGTH(question_text) > 500
                ORDER BY length DESC
                LIMIT 5
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        if (largeQuestions.length === 0) {
            console.log('✅ No unusually large questions found');
        } else {
            console.log(`⚠️  Found ${largeQuestions.length} large questions (>500 chars)`);
        }
        
        // Issue 7: Check authentication system
        console.log('\n📋 Issue 7: Authentication System Check...');
        
        const adminCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM admins', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
        
        const studentCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM students', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
        
        console.log(`✅ Authentication system: ${adminCount} admins, ${studentCount} students`);
        
        // Final diagnosis
        console.log('\n🎯 DIAGNOSIS SUMMARY:');
        console.log('====================');
        
        const issues = [];
        if (orphanedOptions.length > 0) issues.push('Orphaned options');
        if (orphanedResponses.length > 0) issues.push('Orphaned responses');
        if (questionsWithoutOptions.length > 0) issues.push('Questions without options');
        if (questionsWrongOptionCount.length > 0) issues.push('Questions with wrong option count');
        if (questionsWithoutCorrectAnswer.length > 0) issues.push('Questions without correct answers');
        
        if (issues.length === 0) {
            console.log('✅ NO CRITICAL ISSUES FOUND');
            console.log('🎉 System appears to be functioning correctly');
        } else {
            console.log('❌ ISSUES DETECTED:');
            issues.forEach(issue => console.log(`   - ${issue}`));
            console.log('\n🔧 RECOMMENDED ACTIONS:');
            console.log('   1. Run database cleanup script');
            console.log('   2. Re-seed questions if necessary');
            console.log('   3. Verify data integrity constraints');
        }
        
        await database.close();
        
    } catch (error) {
        console.error('❌ Error during diagnosis:', error);
        await database.close();
    }
}

// Run diagnosis if this file is executed directly
if (require.main === module) {
    diagnosePersistentIssues();
}

module.exports = diagnosePersistentIssues;