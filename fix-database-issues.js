const database = require('./server/config/database');
const bcrypt = require('bcrypt');

async function fixDatabaseIssues() {
    try {
        console.log('🔧 Starting database fixes...');
        
        // Connect to database
        await database.connect();
        const db = database.getDb();
        
        // 1. Ensure admin user exists
        console.log('1. Checking admin user...');
        const admin = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM admins WHERE username = ?', ['admin'], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
        
        if (!admin) {
            console.log('   Creating admin user...');
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await new Promise((resolve, reject) => {
                db.run('INSERT INTO admins (username, password) VALUES (?, ?)', ['admin', hashedPassword], (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            console.log('   ✅ Admin user created');
        } else {
            console.log('   ✅ Admin user exists');
        }
        
        // 2. Check question counts
        console.log('2. Checking question counts...');
        const questionCounts = await new Promise((resolve, reject) => {
            db.all('SELECT grade, COUNT(*) as count FROM questions GROUP BY grade ORDER BY grade', (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        const totalQuestions = questionCounts.reduce((sum, row) => sum + row.count, 0);
        console.log('   Question counts by grade:');
        questionCounts.forEach(row => {
            console.log(`   Grade ${row.grade}: ${row.count} questions`);
        });
        console.log(`   Total questions: ${totalQuestions}`);
        
        // 3. Check database tables
        console.log('3. Verifying database tables...');
        const tables = ['students', 'admins', 'questions', 'options', 'quizzes', 'quiz_answers'];
        for (const table of tables) {
            const exists = await new Promise((resolve, reject) => {
                db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`, [table], (err, row) => {
                    if (err) reject(err);
                    else resolve(!!row);
                });
            });
            console.log(`   ${table}: ${exists ? '✅' : '❌'}`);
        }
        
        // 4. Test quiz generation capability
        console.log('4. Testing quiz generation...');
        const grade6Questions = await new Promise((resolve, reject) => {
            db.all('SELECT COUNT(*) as count FROM questions WHERE grade = 6', (err, rows) => {
                if (err) reject(err);
                else resolve(rows[0].count);
            });
        });
        
        if (grade6Questions >= 50) {
            console.log(`   ✅ Grade 6 has ${grade6Questions} questions (sufficient for quiz)`);
        } else {
            console.log(`   ⚠️ Grade 6 has only ${grade6Questions} questions (need 50 minimum)`);
        }
        
        // 5. Test database connectivity
        console.log('5. Testing database connectivity...');
        const healthCheck = await database.healthCheck();
        console.log(`   Database health: ${healthCheck.healthy ? '✅' : '❌'}`);
        console.log(`   Response time: ${healthCheck.responseTime}ms`);
        
        console.log('\n🎉 Database fixes completed successfully!');
        console.log('\n📋 Summary:');
        console.log(`   - Admin credentials: admin/admin123`);
        console.log(`   - Total questions: ${totalQuestions}`);
        console.log(`   - Database health: ${healthCheck.healthy ? 'Good' : 'Issues detected'}`);
        
        await database.close();
        
    } catch (error) {
        console.error('❌ Database fix failed:', error.message);
        process.exit(1);
    }
}

// Run the fix
fixDatabaseIssues();