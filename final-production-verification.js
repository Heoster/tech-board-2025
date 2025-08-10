// Load production environment variables
require('dotenv').config({ path: './server/.env.production' });

const database = require('./server/config/database');
const authUtils = require('./server/utils/auth');

async function finalProductionVerification() {
    console.log('🔍 FINAL PRODUCTION VERIFICATION - TECH BOARD 2025');
    console.log('==================================================');
    console.log('🌐 Target URL: https://tech-board.up.railway.app');
    console.log('');

    try {
        await database.connect();
        const db = database.getDb();

        // 1. Verify admin credentials
        console.log('1️⃣ Verifying admin credentials...');
        const admin = await new Promise((resolve, reject) => {
            db.get('SELECT username, password_hash FROM admins WHERE username = "admin"', (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        if (admin) {
            const isValidPassword = await authUtils.verifyPassword('admin123', admin.password_hash);
            console.log(`✅ Admin user found: ${admin.username}`);
            console.log(`✅ Password verification: ${isValidPassword ? 'PASS' : 'FAIL'}`);
        } else {
            console.log('❌ Admin user not found');
        }

        // 2. Verify database integrity
        console.log('\n2️⃣ Verifying database integrity...');
        const dbStats = await new Promise((resolve, reject) => {
            db.get(`
                SELECT 
                    (SELECT COUNT(*) FROM questions) as total_questions,
                    (SELECT COUNT(*) FROM options) as total_options,
                    (SELECT COUNT(DISTINCT grade) FROM questions) as grades_covered
            `, (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        console.log(`✅ Total Questions: ${dbStats.total_questions}`);
        console.log(`✅ Total Options: ${dbStats.total_options}`);
        console.log(`✅ Grades Covered: ${dbStats.grades_covered}`);
        console.log(`✅ Average Options per Question: ${(dbStats.total_options / dbStats.total_questions).toFixed(1)}`);

        // 3. Verify quiz generation capability
        console.log('\n3️⃣ Verifying quiz generation capability...');
        const grades = [6, 7, 8, 9, 11];
        let allGradesReady = true;

        for (const grade of grades) {
            const questionCount = await new Promise((resolve, reject) => {
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

            const canGenerate50 = questionCount >= 50;
            const status = canGenerate50 ? '✅' : '❌';
            console.log(`   Grade ${grade}: ${questionCount} questions ${status}`);
            
            if (!canGenerate50) allGradesReady = false;
        }

        // 4. Verify data integrity constraints
        console.log('\n4️⃣ Verifying data integrity constraints...');
        
        // Check for questions without options
        const questionsWithoutOptions = await new Promise((resolve, reject) => {
            db.get(`
                SELECT COUNT(*) as count
                FROM questions q
                LEFT JOIN options o ON q.id = o.question_id
                WHERE o.id IS NULL
            `, (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

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

        // Check for duplicate questions
        const duplicateQuestions = await new Promise((resolve, reject) => {
            db.get(`
                SELECT COUNT(*) as count
                FROM (
                    SELECT question_text
                    FROM questions 
                    GROUP BY LOWER(TRIM(question_text))
                    HAVING COUNT(*) > 1
                )
            `, (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        console.log(`✅ Questions without options: ${questionsWithoutOptions}`);
        console.log(`✅ Orphaned options: ${orphanedOptions}`);
        console.log(`✅ Duplicate questions: ${duplicateQuestions}`);

        // 5. Test quiz creation simulation
        console.log('\n5️⃣ Testing quiz creation simulation...');
        const testQuestions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.question_text, q.difficulty
                FROM questions q 
                INNER JOIN options o ON q.id = o.question_id 
                WHERE q.grade = 9
                GROUP BY q.id
                HAVING COUNT(o.id) = 4
                ORDER BY RANDOM()
                LIMIT 5
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log(`✅ Sample quiz questions retrieved: ${testQuestions.length}`);
        if (testQuestions.length > 0) {
            console.log(`   Sample: "${testQuestions[0].question_text.substring(0, 50)}..."`);
        }

        // 6. Environment configuration check
        console.log('\n6️⃣ Environment configuration check...');
        console.log(`✅ NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
        console.log(`✅ PORT: ${process.env.PORT || 8000}`);
        console.log(`✅ JWT_SECRET: ${process.env.JWT_SECRET ? 'SET' : 'NOT SET'}`);
        console.log(`✅ FRONTEND_URL: ${process.env.FRONTEND_URL || 'NOT SET'}`);

        // 7. Production readiness summary
        console.log('\n🎯 PRODUCTION READINESS SUMMARY');
        console.log('================================');
        
        const checks = [
            { name: 'Admin Credentials', status: admin && await authUtils.verifyPassword('admin123', admin.password_hash) },
            { name: 'Database Integrity', status: questionsWithoutOptions === 0 && orphanedOptions === 0 && duplicateQuestions === 0 },
            { name: 'Quiz Generation', status: allGradesReady },
            { name: 'Question Count', status: dbStats.total_questions >= 3000 },
            { name: 'Options Ratio', status: (dbStats.total_options / dbStats.total_questions) === 4 },
            { name: 'Environment Config', status: process.env.JWT_SECRET && process.env.FRONTEND_URL }
        ];

        let allChecksPass = true;
        checks.forEach(check => {
            const status = check.status ? '✅ PASS' : '❌ FAIL';
            console.log(`   ${check.name}: ${status}`);
            if (!check.status) allChecksPass = false;
        });

        console.log('\n🚀 DEPLOYMENT STATUS');
        console.log('====================');
        if (allChecksPass) {
            console.log('🎉 ALL SYSTEMS GO! READY FOR PRODUCTION DEPLOYMENT');
            console.log('✅ Database: Perfect integrity');
            console.log('✅ Authentication: Working');
            console.log('✅ Quiz System: Fully functional');
            console.log('✅ Configuration: Production ready');
            console.log('');
            console.log('🌐 Deploy to: https://tech-board.up.railway.app');
            console.log('🔐 Admin Login: admin / admin123');
            console.log('📚 Students: Ready for registration and testing');
        } else {
            console.log('⚠️  ISSUES DETECTED - REVIEW FAILED CHECKS ABOVE');
        }

        await database.close();

    } catch (error) {
        console.error('❌ Production verification failed:', error);
        await database.close();
    }

    console.log('\n🔍 Final production verification completed');
}

// Run the verification
finalProductionVerification().catch(console.error);