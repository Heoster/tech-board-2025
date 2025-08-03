require('dotenv').config();
const database = require('../config/database');

async function cleanupTestData() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('🧹 Starting cleanup of test data...');

        // First, let's see what we have
        console.log('\n=== Current Database Status ===');
        
        const students = await new Promise((resolve, reject) => {
            db.all('SELECT id, name, roll_number, grade, section FROM students', (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        const quizzes = await new Promise((resolve, reject) => {
            db.all('SELECT id, student_id, status, score FROM quizzes', (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        const responses = await new Promise((resolve, reject) => {
            db.all('SELECT COUNT(*) as count FROM responses', (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        console.log(`📊 Students: ${students.length}`);
        students.forEach(s => console.log(`   - ${s.name} (ID: ${s.id}, Roll: ${s.roll_number}, Grade: ${s.grade}${s.section})`));
        
        console.log(`📊 Quizzes: ${quizzes.length}`);
        quizzes.forEach(q => console.log(`   - Quiz ID: ${q.id}, Student: ${q.student_id}, Status: ${q.status}, Score: ${q.score || 'N/A'}`));
        
        console.log(`📊 Responses: ${responses.count}`);

        // Delete all quiz responses first (foreign key constraint)
        console.log('\n🗑️ Deleting all quiz responses...');
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM responses', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        // Delete all quizzes
        console.log('🗑️ Deleting all quizzes...');
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM quizzes', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        // Delete test students (keep only real students if any)
        console.log('🗑️ Deleting test students...');
        const testStudentPatterns = ['Test Student', 'Debug Test', 'Test User', 'API'];
        
        for (const pattern of testStudentPatterns) {
            await new Promise((resolve, reject) => {
                db.run('DELETE FROM students WHERE name LIKE ?', [`%${pattern}%`], function(err) {
                    if (err) reject(err);
                    else {
                        if (this.changes > 0) {
                            console.log(`   ✅ Deleted ${this.changes} students matching "${pattern}"`);
                        }
                        resolve();
                    }
                });
            });
        }

        // Reset auto-increment counters
        console.log('🔄 Resetting auto-increment counters...');
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM sqlite_sequence WHERE name IN ("students", "quizzes", "responses")', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        // Final status check
        console.log('\n=== Final Database Status ===');
        
        const finalStudents = await new Promise((resolve, reject) => {
            db.all('SELECT id, name, roll_number, grade, section FROM students', (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        const finalQuizzes = await new Promise((resolve, reject) => {
            db.all('SELECT COUNT(*) as count FROM quizzes', (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        const finalResponses = await new Promise((resolve, reject) => {
            db.all('SELECT COUNT(*) as count FROM responses', (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        console.log(`📊 Remaining Students: ${finalStudents.length}`);
        finalStudents.forEach(s => console.log(`   - ${s.name} (ID: ${s.id}, Roll: ${s.roll_number}, Grade: ${s.grade}${s.section})`));
        
        console.log(`📊 Remaining Quizzes: ${finalQuizzes.count}`);
        console.log(`📊 Remaining Responses: ${finalResponses.count}`);

        console.log('\n✅ Cleanup completed successfully!');
        console.log('🎯 Students can now take fresh tests without restrictions.');

    } catch (error) {
        console.error('❌ Cleanup failed:', error.message);
    } finally {
        await database.close();
    }
}

cleanupTestData();