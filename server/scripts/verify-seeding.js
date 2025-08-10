const sqlite3 = require('sqlite3').verbose();
const path = require('path');

async function verifySeeding() {
    console.log('🔍 VERIFYING DATABASE SEEDING');
    console.log('=============================');
    console.log('');

    const dbPath = path.join(__dirname, '../../database/mcq_system.db');

    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('❌ Database connection failed:', err.message);
                reject(err);
                return;
            }
            console.log('✅ Connected to database');
        });

        // Get total counts
        db.get(`
            SELECT 
                COUNT(*) as total_questions,
                (SELECT COUNT(*) FROM options) as total_options
            FROM questions
        `, (err, totals) => {
            if (err) {
                console.error('❌ Error getting totals:', err.message);
                db.close();
                reject(err);
                return;
            }

            console.log(`📊 TOTAL COUNTS:`);
            console.log(`   Questions: ${totals.total_questions}`);
            console.log(`   Options: ${totals.total_options}`);
            console.log('');

            // Get breakdown by grade and difficulty
            db.all(`
                SELECT 
                    grade,
                    difficulty,
                    COUNT(*) as count
                FROM questions 
                GROUP BY grade, difficulty 
                ORDER BY grade, difficulty
            `, (err, breakdown) => {
                if (err) {
                    console.error('❌ Error getting breakdown:', err.message);
                    db.close();
                    reject(err);
                    return;
                }

                console.log('📋 BREAKDOWN BY GRADE & DIFFICULTY:');
                console.log('===================================');

                const grades = [6, 7, 8, 9, 11];
                const difficulties = ['basic', 'medium', 'advanced'];
                
                grades.forEach(grade => {
                    const gradeQuestions = breakdown.filter(b => b.grade === grade);
                    const total = gradeQuestions.reduce((sum, b) => sum + b.count, 0);
                    
                    if (total > 0) {
                        console.log(`\n🎯 Grade ${grade}: ${total} questions`);
                        difficulties.forEach(diff => {
                            const diffCount = gradeQuestions.find(b => b.difficulty === diff);
                            const count = diffCount ? diffCount.count : 0;
                            const emoji = diff === 'basic' ? '📗' : diff === 'medium' ? '📙' : '📕';
                            console.log(`   ${emoji} ${diff}: ${count}`);
                        });
                    } else {
                        console.log(`\n❌ Grade ${grade}: No questions found`);
                    }
                });

                console.log('\n✅ Database verification completed!');
                db.close();
                resolve();
            });
        });
    });
}

// Run verification
verifySeeding()
    .then(() => {
        console.log('🎉 Verification completed!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('💥 Verification failed:', error);
        process.exit(1);
    });
