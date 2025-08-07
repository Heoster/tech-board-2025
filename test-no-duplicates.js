const database = require('./server/config/database');

async function testNoDuplicates() {
    try {
        await database.connect();
        const db = database.getDb();
        
        console.log('🔍 TESTING NO DUPLICATES SYSTEM');
        console.log('===============================\n');
        
        // Test 1: Check for duplicate questions in database
        console.log('📋 Test 1: Checking for duplicate questions in database...');
        const duplicateQuestions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT question_text, grade, difficulty, COUNT(*) as count
                FROM questions
                GROUP BY question_text, grade, difficulty
                HAVING COUNT(*) > 1
                ORDER BY count DESC
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        if (duplicateQuestions.length === 0) {
            console.log('✅ No duplicate questions found in database');
        } else {
            console.log(`❌ Found ${duplicateQuestions.length} duplicate questions:`);
            duplicateQuestions.slice(0, 5).forEach(dup => {
                console.log(`   "${dup.question_text.substring(0, 50)}..." appears ${dup.count} times`);
            });
        }
        
        // Test 2: Check for duplicate options
        console.log('\n📋 Test 2: Checking for duplicate options within questions...');
        const duplicateOptions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT question_id, option_text, COUNT(*) as count
                FROM options
                GROUP BY question_id, option_text
                HAVING COUNT(*) > 1
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        if (duplicateOptions.length === 0) {
            console.log('✅ No duplicate options found within questions');
        } else {
            console.log(`❌ Found ${duplicateOptions.length} duplicate options within questions`);
        }
        
        // Test 3: Check quiz responses for duplicates
        console.log('\n📋 Test 3: Checking quiz responses for duplicates...');
        const duplicateResponses = await new Promise((resolve, reject) => {
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
        
        if (duplicateResponses.length === 0) {
            console.log('✅ No duplicate responses found in quizzes');
        } else {
            console.log(`❌ Found ${duplicateResponses.length} duplicate responses in quizzes`);
        }
        
        // Test 4: Check for students answering same question multiple times
        console.log('\n📋 Test 4: Checking for cross-quiz question repetition...');
        const crossQuizDuplicates = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    s.name,
                    s.roll_number,
                    s.grade,
                    s.section,
                    r.question_id,
                    COUNT(*) as times_answered
                FROM responses r
                JOIN quizzes q ON r.quiz_id = q.id
                JOIN students s ON q.student_id = s.id
                GROUP BY s.id, r.question_id
                HAVING COUNT(*) > 1
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        if (crossQuizDuplicates.length === 0) {
            console.log('✅ No students have answered the same question multiple times');
        } else {
            console.log(`❌ Found ${crossQuizDuplicates.length} cases of students answering same question multiple times:`);
            crossQuizDuplicates.forEach(dup => {
                console.log(`   ${dup.name} (${dup.roll_number}) answered question ${dup.question_id} ${dup.times_answered} times`);
            });
        }
        
        // Test 5: Verify question distribution
        console.log('\n📋 Test 5: Verifying question distribution per grade...');
        const grades = [6, 7, 8, 9, 11];
        
        for (const grade of grades) {
            const distribution = await new Promise((resolve, reject) => {
                db.all(`
                    SELECT difficulty, COUNT(*) as count
                    FROM questions
                    WHERE grade = ?
                    GROUP BY difficulty
                    ORDER BY difficulty
                `, [grade], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });
            
            const total = distribution.reduce((sum, row) => sum + row.count, 0);
            const basic = distribution.find(d => d.difficulty === 'basic')?.count || 0;
            const medium = distribution.find(d => d.difficulty === 'medium')?.count || 0;
            const advanced = distribution.find(d => d.difficulty === 'advanced')?.count || 0;
            
            console.log(`   Grade ${grade}: ${total} total (${basic} basic, ${medium} medium, ${advanced} advanced)`);
        }
        
        // Test 6: Check database constraints
        console.log('\n📋 Test 6: Verifying database constraints...');
        const constraints = await new Promise((resolve, reject) => {
            db.all(`
                SELECT name, type, sql
                FROM sqlite_master
                WHERE type IN ('trigger', 'index')
                AND (name LIKE '%unique%' OR name LIKE '%duplicate%' OR sql LIKE '%UNIQUE%')
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        console.log(`✅ Found ${constraints.length} duplicate prevention constraints:`);
        constraints.forEach(constraint => {
            console.log(`   - ${constraint.name} (${constraint.type})`);
        });
        
        // Summary
        const allTestsPassed = (
            duplicateQuestions.length === 0 &&
            duplicateOptions.length === 0 &&
            duplicateResponses.length === 0 &&
            crossQuizDuplicates.length === 0
        );
        
        console.log('\n🎯 TEST SUMMARY:');
        console.log('===============');
        if (allTestsPassed) {
            console.log('✅ ALL NO-DUPLICATE TESTS PASSED');
            console.log('🔒 System integrity maintained');
            console.log('🛡️  Duplicate prevention working correctly');
        } else {
            console.log('❌ SOME NO-DUPLICATE TESTS FAILED');
            console.log('⚠️  System requires attention');
            console.log('🔧 Review duplicate prevention mechanisms');
        }
        
        await database.close();
        
    } catch (error) {
        console.error('❌ Error testing no duplicates system:', error);
        await database.close();
    }
}

// Run test if this file is executed directly
if (require.main === module) {
    testNoDuplicates();
}

module.exports = testNoDuplicates;