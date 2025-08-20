const database = require('./server/config/database');
const fs = require('fs');
const path = require('path');

console.log('🗄️ Ensuring Database is Ready for Production...\n');

async function ensureDatabaseReady() {
    try {
        // Connect to database
        console.log('📡 Connecting to database...');
        await database.connect();
        console.log('✅ Database connected successfully');

        // Check if database file exists and has content
        const dbPath = path.join(__dirname, 'server/database/mcq_system_fixed.db');
        if (fs.existsSync(dbPath)) {
            const stats = fs.statSync(dbPath);
            console.log(`📊 Database file size: ${(stats.size / 1024).toFixed(2)} KB`);
        }

        // Check question counts by grade
        console.log('\n📚 Checking question availability...');
        const questionCounts = await database.query(`
            SELECT grade, COUNT(*) as count
            FROM questions 
            GROUP BY grade 
            ORDER BY grade
        `);

        let totalQuestions = 0;
        const requiredGrades = [6, 7, 8, 9, 11];
        const gradeStatus = {};

        console.log('Question counts by grade:');
        for (const row of questionCounts) {
            totalQuestions += row.count;
            const sufficient = row.count >= 50; // Minimum 50 questions per grade for quiz
            gradeStatus[row.grade] = { count: row.count, sufficient };
            console.log(`  Grade ${row.grade}: ${row.count} questions ${sufficient ? '✅' : '❌'}`);
        }

        // Check for missing grades
        for (const grade of requiredGrades) {
            if (!gradeStatus[grade]) {
                console.log(`  Grade ${grade}: 0 questions ❌`);
                gradeStatus[grade] = { count: 0, sufficient: false };
            }
        }

        console.log(`\nTotal questions: ${totalQuestions}`);

        // Check admin users
        console.log('\n👨‍💼 Checking admin users...');
        const adminCount = await database.get('SELECT COUNT(*) as count FROM admins');
        console.log(`Admin users: ${adminCount.count} ${adminCount.count > 0 ? '✅' : '❌'}`);

        // Check students table
        console.log('\n👥 Checking students table...');
        const studentCount = await database.get('SELECT COUNT(*) as count FROM students');
        console.log(`Registered students: ${studentCount.count}`);

        // Seed questions if insufficient
        const insufficientGrades = requiredGrades.filter(grade => 
            !gradeStatus[grade] || gradeStatus[grade].count < 50
        );

        if (insufficientGrades.length > 0) {
            console.log(`\n🌱 Seeding questions for grades: ${insufficientGrades.join(', ')}`);
            
            try {
                // Try to run the seeding script
                const seedScript = path.join(__dirname, 'server/seed/seedAllGrades.js');
                if (fs.existsSync(seedScript)) {
                    console.log('Running seeding script...');
                    require(seedScript);
                    
                    // Wait a bit for seeding to complete
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    
                    // Re-check question counts
                    const newQuestionCounts = await database.query(`
                        SELECT grade, COUNT(*) as count
                        FROM questions 
                        GROUP BY grade 
                        ORDER BY grade
                    `);
                    
                    console.log('\nUpdated question counts:');
                    for (const row of newQuestionCounts) {
                        const sufficient = row.count >= 50;
                        console.log(`  Grade ${row.grade}: ${row.count} questions ${sufficient ? '✅' : '❌'}`);
                    }
                } else {
                    console.log('⚠️ Seeding script not found, will seed at runtime');
                }
            } catch (error) {
                console.log('⚠️ Seeding error:', error.message);
                console.log('Questions will be seeded at runtime');
            }
        }

        // Create admin user if none exists
        if (adminCount.count === 0) {
            console.log('\n👤 Creating default admin user...');
            const bcrypt = require('bcrypt');
            const adminPassword = await bcrypt.hash('admin123', 10);

            await database.run(
                'INSERT INTO admins (username, password) VALUES (?, ?)',
                ['admin', adminPassword]
            );
            console.log('✅ Default admin user created (username: admin, password: admin123)');
        }

        // Test database operations
        console.log('\n🧪 Testing database operations...');
        
        // Test question retrieval
        const sampleQuestions = await database.query(`
            SELECT q.id, q.question_text, q.grade, q.difficulty,
                   COUNT(o.id) as option_count
            FROM questions q
            LEFT JOIN options o ON q.id = o.question_id
            GROUP BY q.id
            LIMIT 5
        `);
        
        console.log(`Sample questions retrieved: ${sampleQuestions.length} ✅`);
        
        // Test admin authentication
        const adminUser = await database.get('SELECT * FROM admins WHERE username = ?', ['admin']);
        console.log(`Admin user exists: ${adminUser ? '✅' : '❌'}`);

        // Final assessment
        const readyForProduction = 
            totalQuestions >= 250 && // At least 250 total questions
            adminCount.count > 0 && // At least one admin
            requiredGrades.every(grade => gradeStatus[grade] && gradeStatus[grade].count >= 30); // At least 30 per grade

        console.log('\n📊 Database Readiness Assessment:');
        console.log(`  Total Questions: ${totalQuestions} ${totalQuestions >= 250 ? '✅' : '❌'}`);
        console.log(`  Admin Users: ${adminCount.count} ${adminCount.count > 0 ? '✅' : '❌'}`);
        console.log(`  All Grades Covered: ${requiredGrades.every(grade => gradeStatus[grade] && gradeStatus[grade].count >= 30) ? '✅' : '❌'}`);
        
        if (readyForProduction) {
            console.log('\n🎉 Database is ready for production!');
            console.log('✅ Sufficient questions for all grades');
            console.log('✅ Admin user configured');
            console.log('✅ All database operations working');
        } else {
            console.log('\n⚠️ Database needs attention:');
            if (totalQuestions < 250) {
                console.log('  - Need more questions (minimum 250 total)');
            }
            if (adminCount.count === 0) {
                console.log('  - Need admin user');
            }
            const missingGrades = requiredGrades.filter(grade => 
                !gradeStatus[grade] || gradeStatus[grade].count < 30
            );
            if (missingGrades.length > 0) {
                console.log(`  - Need more questions for grades: ${missingGrades.join(', ')}`);
            }
        }

        await database.close();
        return readyForProduction;

    } catch (error) {
        console.error('❌ Database setup failed:', error);
        return false;
    }
}

// Run if called directly
if (require.main === module) {
    ensureDatabaseReady()
        .then(ready => {
            process.exit(ready ? 0 : 1);
        })
        .catch(error => {
            console.error('❌ Error:', error);
            process.exit(1);
        });
}

module.exports = ensureDatabaseReady;