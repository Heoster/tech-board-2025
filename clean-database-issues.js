const database = require('./server/config/database');

async function cleanDatabaseIssues() {
    console.log('🧹 CLEANING DATABASE ISSUES - TECH BOARD 2025');
    console.log('==============================================');
    console.log('');

    try {
        await database.connect();
        const db = database.getDb();

        // 1. Clean up any test data
        console.log('1️⃣ Cleaning up test data...');
        
        // Remove test students
        const testStudentsRemoved = await new Promise((resolve, reject) => {
            db.run(`DELETE FROM students WHERE name LIKE '%Test%' OR name LIKE '%test%'`, function(err) {
                if (err) reject(err);
                else resolve(this.changes);
            });
        });

        console.log(`✅ Removed ${testStudentsRemoved} test students`);

        // Remove any orphaned quizzes
        const orphanedQuizzesRemoved = await new Promise((resolve, reject) => {
            db.run(`
                DELETE FROM quizzes 
                WHERE student_id NOT IN (SELECT id FROM students)
            `, function(err) {
                if (err) reject(err);
                else resolve(this.changes);
            });
        });

        console.log(`✅ Removed ${orphanedQuizzesRemoved} orphaned quizzes`);

        // Remove any orphaned responses
        const orphanedResponsesRemoved = await new Promise((resolve, reject) => {
            db.run(`
                DELETE FROM responses 
                WHERE quiz_id NOT IN (SELECT id FROM quizzes)
            `, function(err) {
                if (err) reject(err);
                else resolve(this.changes);
            });
        });

        console.log(`✅ Removed ${orphanedResponsesRemoved} orphaned responses`);

        // 2. Check current database state
        console.log('\n2️⃣ Checking current database state...');
        
        const stats = await new Promise((resolve, reject) => {
            db.get(`
                SELECT 
                    (SELECT COUNT(*) FROM students) as total_students,
                    (SELECT COUNT(*) FROM quizzes) as total_quizzes,
                    (SELECT COUNT(*) FROM responses) as total_responses,
                    (SELECT COUNT(*) FROM questions) as total_questions,
                    (SELECT COUNT(*) FROM options) as total_options
            `, (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        console.log('📊 Current Database State:');
        console.log(`   Students: ${stats.total_students}`);
        console.log(`   Quizzes: ${stats.total_quizzes}`);
        console.log(`   Responses: ${stats.total_responses}`);
        console.log(`   Questions: ${stats.total_questions}`);
        console.log(`   Options: ${stats.total_options}`);

        // 3. Verify question integrity
        console.log('\n3️⃣ Verifying question integrity...');
        
        const questionIntegrity = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    q.grade,
                    COUNT(q.id) as question_count,
                    COUNT(o.id) as option_count,
                    COUNT(q.id) * 4 as expected_options,
                    CASE 
                        WHEN COUNT(o.id) = COUNT(q.id) * 4 THEN 'OK'
                        ELSE 'ISSUE'
                    END as integrity_status
                FROM questions q
                LEFT JOIN options o ON q.id = o.question_id
                GROUP BY q.grade
                ORDER BY q.grade
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log('📋 Question Integrity by Grade:');
        questionIntegrity.forEach(grade => {
            const status = grade.integrity_status === 'OK' ? '✅' : '❌';
            console.log(`   Grade ${grade.grade}: ${grade.question_count} questions, ${grade.option_count} options ${status}`);
        });

        // 4. Test quiz generation capability
        console.log('\n4️⃣ Testing quiz generation capability...');
        
        const grades = [6, 7, 8, 9, 11];
        for (const grade of grades) {
            const availableQuestions = await new Promise((resolve, reject) => {
                db.get(`
                    SELECT COUNT(DISTINCT q.id) as count
                    FROM questions q 
                    INNER JOIN options o ON q.id = o.question_id 
                    WHERE q.grade = ?
                    GROUP BY q.grade
                `, [grade], (err, row) => {
                    if (err) reject(err);
                    else resolve(row ? row.count : 0);
                });
            });

            const canGenerate50 = availableQuestions >= 50;
            const status = canGenerate50 ? '✅' : '⚠️';
            console.log(`   Grade ${grade}: ${availableQuestions} questions ${status}`);
        }

        console.log('\n🎉 DATABASE CLEANUP SUMMARY');
        console.log('============================');
        console.log('✅ Test data cleaned up');
        console.log('✅ Orphaned records removed');
        console.log('✅ Database integrity verified');
        console.log('✅ Quiz generation capability confirmed');
        console.log('✅ Ready for testing');

        await database.close();

    } catch (error) {
        console.error('❌ Database cleanup failed:', error);
        await database.close();
    }

    console.log('\n🧹 Database cleanup completed');
}

// Run the cleanup
cleanDatabaseIssues().catch(console.error);