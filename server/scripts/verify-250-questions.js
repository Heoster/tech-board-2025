const database = require('../config/database');

async function verify250Questions() {
    try {
        await database.connect();
        const db = database.getDb();
        
        console.log('📊 VERIFYING 250+ QUESTIONS PER GRADE');
        console.log('====================================\n');
        
        const grades = [6, 7, 8, 9, 11];
        
        for (const grade of grades) {
            const counts = await new Promise((resolve, reject) => {
                db.all(`
                    SELECT 
                        difficulty,
                        COUNT(*) as count
                    FROM questions 
                    WHERE grade = ? 
                    GROUP BY difficulty
                    ORDER BY difficulty
                `, [grade], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });

            const total = counts.reduce((sum, row) => sum + row.count, 0);
            const basic = counts.find(r => r.difficulty === 'basic')?.count || 0;
            const medium = counts.find(r => r.difficulty === 'medium')?.count || 0;
            const advanced = counts.find(r => r.difficulty === 'advanced')?.count || 0;

            const status = total >= 250 ? '✅' : '❌';
            console.log(`${status} Grade ${grade}: ${total} total (${basic} basic, ${medium} medium, ${advanced} advanced)`);
        }
        
        // Overall statistics
        const totalQuestions = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
        
        console.log(`\n📈 Total Questions in Database: ${totalQuestions}`);
        
        await database.close();
        
    } catch (error) {
        console.error('❌ Error verifying questions:', error);
        await database.close();
    }
}

// Run verification if this file is executed directly
if (require.main === module) {
    verify250Questions();
}

module.exports = verify250Questions;