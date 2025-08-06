const database = require('./server/config/database');

async function verify250Questions() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('🔍 Verifying 250+ questions per grade...\n');

        const grades = [6, 7, 8, 9, 11];
        let allGradesValid = true;

        for (const grade of grades) {
            // Get total count
            const totalCount = await new Promise((resolve, reject) => {
                db.get('SELECT COUNT(*) as count FROM questions WHERE grade = ?', [grade], (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                });
            });

            // Get difficulty distribution
            const distribution = await new Promise((resolve, reject) => {
                db.all(`
                    SELECT difficulty, COUNT(*) as count 
                    FROM questions 
                    WHERE grade = ? 
                    GROUP BY difficulty
                `, [grade], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });

            const status = totalCount >= 250 ? '✅' : '❌';
            console.log(`${status} Grade ${grade}: ${totalCount} questions`);

            if (totalCount < 250) {
                allGradesValid = false;
                console.log(`   ⚠️  Need ${250 - totalCount} more questions`);
            }

            // Show distribution
            distribution.forEach(row => {
                const percentage = ((row.count / totalCount) * 100).toFixed(1);
                console.log(`   ${row.difficulty}: ${row.count} (${percentage}%)`);
            });

            // Sample a few questions to verify format
            const sampleQuestions = await new Promise((resolve, reject) => {
                db.all(`
                    SELECT id, question_text, difficulty
                    FROM questions 
                    WHERE grade = ? 
                    LIMIT 2
                `, [grade], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });

            console.log('   Sample questions:');
            for (const q of sampleQuestions) {
                console.log(`   - ${q.question_text.substring(0, 60)}...`);
            }
            console.log('');
        }

        if (allGradesValid) {
            console.log('🎉 SUCCESS: All grades have 250+ questions!');
            console.log('📊 Total questions in database:');

            const grandTotal = await new Promise((resolve, reject) => {
                db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                });
            });

            console.log(`   Total: ${grandTotal} questions across all grades`);
            console.log(`   Average per grade: ${Math.floor(grandTotal / grades.length)} questions`);

            // Calculate potential unique quizzes per grade
            console.log('\n🎯 Quiz variety potential:');
            for (const grade of grades) {
                const count = await new Promise((resolve, reject) => {
                    db.get('SELECT COUNT(*) as count FROM questions WHERE grade = ?', [grade], (err, row) => {
                        if (err) reject(err);
                        else resolve(row.count);
                    });
                });

                // Calculate combinations (simplified - actual would be much higher)
                const possibleUniqueQuizzes = Math.floor(count / 25);
                console.log(`   Grade ${grade}: ~${possibleUniqueQuizzes} completely unique 25-question quizzes possible`);
            }

        } else {
            console.log('❌ Some grades need more questions. Run the seeding script again.');
        }

        process.exit(0);

    } catch (error) {
        console.error('❌ Error verifying questions:', error);
        process.exit(1);
    }
}

verify250Questions();