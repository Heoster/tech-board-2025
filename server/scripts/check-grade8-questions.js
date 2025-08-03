require('dotenv').config();
const database = require('../config/database');

async function checkGrade8Questions() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('=== Grade 8 Questions Analysis ===');
        
        // Check total Grade 8 questions
        const totalGrade8 = await new Promise((resolve, reject) => {
            db.get(
                'SELECT COUNT(*) as count FROM questions WHERE grade = 8',
                [],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                }
            );
        });

        console.log(`Total Grade 8 questions: ${totalGrade8}`);

        // Check by difficulty
        const byDifficulty = await new Promise((resolve, reject) => {
            db.all(
                'SELECT difficulty, COUNT(*) as count FROM questions WHERE grade = 8 GROUP BY difficulty',
                [],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });

        console.log('Grade 8 questions by difficulty:');
        byDifficulty.forEach(row => {
            console.log(`  - ${row.difficulty}: ${row.count} questions`);
        });

        // Check if we have enough for the quiz algorithm (15 basic, 7 medium, 3 advanced)
        const basic = byDifficulty.find(d => d.difficulty === 'basic')?.count || 0;
        const medium = byDifficulty.find(d => d.difficulty === 'medium')?.count || 0;
        const advanced = byDifficulty.find(d => d.difficulty === 'advanced')?.count || 0;

        console.log('\nQuiz Requirements Check:');
        console.log(`  - Need 15 basic, have ${basic}: ${basic >= 15 ? '✅' : '❌'}`);
        console.log(`  - Need 7 medium, have ${medium}: ${medium >= 7 ? '✅' : '❌'}`);
        console.log(`  - Need 3 advanced, have ${advanced}: ${advanced >= 3 ? '✅' : '❌'}`);
        console.log(`  - Total needed: 25, have ${totalGrade8}: ${totalGrade8 >= 25 ? '✅' : '❌'}`);

    } catch (error) {
        console.error('Error checking Grade 8 questions:', error);
    } finally {
        await database.close();
    }
}

checkGrade8Questions();