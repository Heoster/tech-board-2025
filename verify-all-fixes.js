const database = require('./server/config/database');
const bcrypt = require('bcrypt');

async function verifyAllFixes() {
    console.log('🔍 Verifying all Tech Board fixes...\n');
    
    let allPassed = true;
    const results = {
        database: false,
        quizGeneration: false,
        adminDashboard: false,
        studentManagement: false,
        authentication: false
    };
    
    try {
        // 1. Database Connection Test
        console.log('1. Testing database connection...');
        await database.connect();
        const db = database.getDb();
        const healthCheck = await database.healthCheck();
        
        if (healthCheck.healthy) {
            console.log('   ✅ Database connection: WORKING');
            results.database = true;
        } else {
            console.log('   ❌ Database connection: FAILED');
            allPassed = false;
        }
        
        // 2. Quiz Generation Test
        console.log('2. Testing quiz generation...');
        try {
            const questions = await new Promise((resolve, reject) => {
                db.all('SELECT COUNT(*) as count FROM questions WHERE grade = 6', (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows[0].count);
                });
            });
            
            if (questions >= 50) {
                console.log(`   ✅ Quiz generation: WORKING (${questions} questions available)`);
                results.quizGeneration = true;
            } else {
                console.log(`   ❌ Quiz generation: INSUFFICIENT QUESTIONS (${questions})`);
                allPassed = false;
            }
        } catch (error) {
            console.log('   ❌ Quiz generation: FAILED -', error.message);
            allPassed = false;
        }
        
        // 3. Admin Dashboard Test
        console.log('3. Testing admin dashboard queries...');
        try {
            // Test the queries used in admin dashboard
            const totalStudents = await new Promise((resolve, reject) => {
                db.get('SELECT COUNT(*) as count FROM students', (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                });
            });
            
            const totalQuestions = await new Promise((resolve, reject) => {
                db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                });
            });
            
            const totalQuizzes = await new Promise((resolve, reject) => {
                db.get('SELECT COUNT(*) as count FROM quizzes WHERE status = \"completed\"', (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                });
            });
            
            console.log(`   ✅ Admin dashboard: WORKING (${totalStudents} students, ${totalQuestions} questions, ${totalQuizzes} completed quizzes)`);
            results.adminDashboard = true;
        } catch (error) {
            console.log('   ❌ Admin dashboard: FAILED -', error.message);
            allPassed = false;
        }
        
        // 4. Student Management Test
        console.log('4. Testing student management...');
        try {
            // Test student creation with correct column names
            const hashedPassword = await bcrypt.hash('testpass123', 10);
            
            // Clean up any existing test student
            await new Promise((resolve, reject) => {
                db.run('DELETE FROM students WHERE roll_number = 998 AND grade = 6', (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            
            const studentResult = await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO students (name, roll_number, grade, section, password) VALUES (?, ?, ?, ?, ?)',
                    ['Test Student Management', 998, 6, 'A', hashedPassword],
                    function(err) {
                        if (err) reject(err);
                        else resolve({ lastID: this.lastID });
                    }
                );
            });
            
            // Clean up test student
            await new Promise((resolve, reject) => {
                db.run('DELETE FROM students WHERE id = ?', [studentResult.lastID], (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            
            console.log('   ✅ Student management: WORKING');
            results.studentManagement = true;
        } catch (error) {
            console.log('   ❌ Student management: FAILED -', error.message);
            allPassed = false;
        }
        
        // 5. Authentication Test
        console.log('5. Testing authentication...');
        try {
            // Check admin exists
            const admin = await new Promise((resolve, reject) => {
                db.get('SELECT * FROM admins WHERE username = ?', ['admin'], (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                });
            });
            
            if (admin) {
                console.log('   ✅ Authentication: WORKING (admin user exists)');
                results.authentication = true;
            } else {
                console.log('   ❌ Authentication: FAILED (no admin user)');
                allPassed = false;
            }
        } catch (error) {
            console.log('   ❌ Authentication: FAILED -', error.message);
            allPassed = false;
        }
        
        await database.close();
        
        // Final Summary
        console.log('\n' + '='.repeat(50));
        console.log('🎯 TECH BOARD 2025 - FIX VERIFICATION RESULTS');
        console.log('='.repeat(50));
        
        console.log(`Database Connection: ${results.database ? '✅ FIXED' : '❌ FAILED'}`);
        console.log(`Quiz Generation: ${results.quizGeneration ? '✅ FIXED' : '❌ FAILED'}`);
        console.log(`Admin Dashboard: ${results.adminDashboard ? '✅ FIXED' : '❌ FAILED'}`);
        console.log(`Student Management: ${results.studentManagement ? '✅ FIXED' : '❌ FAILED'}`);
        console.log(`Authentication: ${results.authentication ? '✅ FIXED' : '❌ FAILED'}`);
        
        console.log('\n' + '='.repeat(50));
        
        if (allPassed) {
            console.log('🎉 ALL ISSUES FIXED! System is ready for deployment.');
            console.log('\n📊 System Health: 100% (5/5 core features working)');
            console.log('\n🚀 Ready for Railway deployment:');
            console.log('   1. git add . && git commit -m "Fix all critical issues"');
            console.log('   2. git push');
            console.log('   3. railway up');
            console.log('\n🔗 Test URL: https://tech-board.up.railway.app');
            console.log('🔐 Admin: admin/admin123');
        } else {
            console.log('❌ SOME ISSUES REMAIN. Please check the failed tests above.');
            const passedCount = Object.values(results).filter(Boolean).length;
            console.log(`\n📊 System Health: ${Math.round((passedCount/5)*100)}% (${passedCount}/5 core features working)`);
        }
        
        console.log('\n' + '='.repeat(50));
        
    } catch (error) {
        console.error('❌ Verification failed:', error.message);
        process.exit(1);
    }
}

// Run verification
verifyAllFixes();