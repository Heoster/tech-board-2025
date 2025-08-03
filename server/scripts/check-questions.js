require('dotenv').config();
const database = require('../config/database');

async function checkQuestions() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('=== Question Distribution ===');
        
        // Get total count by grade
        const gradeStats = await new Promise((resolve, reject) => {
            db.all(
                'SELECT grade, difficulty, COUNT(*) as count FROM questions GROUP BY grade, difficulty ORDER BY grade, difficulty',
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });

        console.log('\nBy Grade and Difficulty:');
        gradeStats.forEach(stat => {
            console.log(`Grade ${stat.grade} - ${stat.difficulty}: ${stat.count} questions`);
        });

        // Get total by grade
        const totalByGrade = await new Promise((resolve, reject) => {
            db.all(
                'SELECT grade, COUNT(*) as total FROM questions GROUP BY grade ORDER BY grade',
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });

        console.log('\nTotal by Grade:');
        totalByGrade.forEach(stat => {
            console.log(`Grade ${stat.grade}: ${stat.total} questions`);
        });

        // Overall total
        const overallTotal = await new Promise((resolve, reject) => {
            db.get(
                'SELECT COUNT(*) as total FROM questions',
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });

        console.log(`\nOverall Total: ${overallTotal.total} questions`);

    } catch (error) {
        console.error('Error checking questions:', error);
    } finally {
        await database.close();
    }
}

checkQuestions();