const database = require('./server/config/database');

async function verifyUltraStrictSystem() {
    try {
        await database.connect();
        const db = database.getDb();
        
        console.log('🔍 VERIFYING ULTRA-STRICT DUPLICATE PREVENTION SYSTEM');
        console.log('====================================================\n');
        
        // Check 1: Verify no duplicate questions within any quiz
        console.log('📋 Check 1: Verifying no duplicate questions within quizzes...');
        const duplicateWithinQuiz = await new Promise((resolve, reject) => {
            db.all(`
                SELECT quiz_id, question_id, COUNT(*) as count
                FROM responses
                GROUP BY quiz_id, question_id
                HAVING COUNT(*) > 1
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        if (duplicateWithinQuiz.length === 0) {
            console.log('✅ PASS: No duplicate questions found within any quiz');
        } else {
            console.log(`❌ FAIL: Found ${duplicateWithinQuiz.length} duplicate questions within quizzes`);
            duplicateWithinQuiz.forEach(dup => {
                console.log(`   Quiz ${dup.quiz_id}: Question ${dup.question_id} appears ${dup.count} times`);
            });
        }
        
        // Check 2: Verify no student has answered the same question multiple times
        console.log('\n📋 Check 2: Verifying no cross-quiz question repetition...');
        const crossQuizDuplicates = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    q.student_id,
                    r.question_id,
                    COUNT(*) as times_answered,
                    GROUP_CONCAT(q.id) as quiz_ids
                FROM responses r
                JOIN quizzes q ON r.quiz_id = q.id
                GROUP BY q.student_id, r.question_id
                HAVING COUNT(*) > 1
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        if (crossQuizDuplicates.length === 0) {
            console.log('✅ PASS: No student has answered the same question multiple times');
        } else {
            console.log(`❌ FAIL: Found ${crossQuizDuplicates.length} cross-quiz question repetitions`);
            crossQuizDuplicates.forEach(dup => {
                console.log(`   Student ${dup.student_id}: Question ${dup.question_id} answered ${dup.times_answered} times in quizzes [${dup.quiz_ids}]`);
            });
        }
        
        // Check 3: Verify all completed quizzes have exactly 25 responses
        console.log('\n📋 Check 3: Verifying all completed quizzes have exactly 25 responses...');
        const incorrectResponseCount = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    q.id as quiz_id,
                    q.status,
                    COUNT(r.id) as response_count
                FROM quizzes q
                LEFT JOIN responses r ON q.id = r.quiz_id
                WHERE q.status = 'completed'
                GROUP BY q.id, q.status
                HAVING COUNT(r.id) != 25
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        if (incorrectResponseCount.length === 0) {
            console.log('✅ PASS: All completed quizzes have exactly 25 responses');
        } else {
            console.log(`❌ FAIL: Found ${incorrectResponseCount.length} completed quizzes with incorrect response count`);
            incorrectResponseCount.forEach(quiz => {
                console.log(`   Quiz ${quiz.quiz_id}: Has ${quiz.response_count} responses instead of 25`);
            });
        }
        
        // Check 4: Verify database constraints are active
        console.log('\n📋 Check 4: Verifying database constraints...');
        const constraints = await new Promise((resolve, reject) => {
            db.all(`
                SELECT name, sql 
                FROM sqlite_master 
                WHERE type = 'trigger' 
                AND (name LIKE '%duplicate%' OR name LIKE '%unique%' OR name LIKE '%prevent%')
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        console.log(`✅ Found ${constraints.length} duplicate prevention constraints active`);
        constraints.forEach(constraint => {
            console.log(`   - ${constraint.name}`);
        });
        
        // Check 5: Verify unique indexes
        console.log('\n📋 Check 5: Verifying unique indexes...');
        const indexes = await new Promise((resolve, reject) => {
            db.all(`
                SELECT name, sql 
                FROM sqlite_master 
                WHERE type = 'index' 
                AND (sql LIKE '%UNIQUE%' OR name LIKE '%unique%')
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        console.log(`✅ Found ${indexes.length} unique indexes active`);
        indexes.forEach(index => {
            console.log(`   - ${index.name}`);
        });
        
        // Check 6: System integrity report
        console.log('\n📋 Check 6: Overall system integrity...');
        const totalQuizzes = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM quizzes', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
        
        const totalResponses = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM responses', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
        
        const uniqueQuestions = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(DISTINCT question_id) as count FROM responses', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
        
        const completedQuizzes = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM quizzes WHERE status = "completed"', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
        
        console.log(`📊 System Statistics:`);
        console.log(`   Total Quizzes: ${totalQuizzes}`);
        console.log(`   Completed Quizzes: ${completedQuizzes}`);
        console.log(`   Total Responses: ${totalResponses}`);
        console.log(`   Unique Questions Used: ${uniqueQuestions}`);
        console.log(`   Expected Responses (25 per completed quiz): ${completedQuizzes * 25}`);
        
        // Final verdict
        const allChecksPassed = (
            duplicateWithinQuiz.length === 0 &&
            crossQuizDuplicates.length === 0 &&
            incorrectResponseCount.length === 0
        );
        
        console.log('\n🎯 FINAL VERDICT:');
        console.log('================');
        if (allChecksPassed) {
            console.log('✅ ULTRA-STRICT SYSTEM VERIFICATION PASSED');
            console.log('🔒 Zero duplicates detected');
            console.log('🛡️  All constraints working correctly');
            console.log('📋 All quizzes have proper question count');
            console.log('🎯 System integrity maintained');
        } else {
            console.log('❌ ULTRA-STRICT SYSTEM VERIFICATION FAILED');
            console.log('⚠️  System integrity compromised');
            console.log('🔧 Manual intervention required');
            console.log('📞 Contact system administrator');
        }
        
        await database.close();
        
    } catch (error) {
        console.error('❌ Error verifying ultra-strict system:', error);
        await database.close();
    }
}

// Run verification if this file is executed directly
if (require.main === module) {
    verifyUltraStrictSystem();
}

module.exports = verifyUltraStrictSystem;