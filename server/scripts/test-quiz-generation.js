require('dotenv').config();
const database = require('../config/database');

async function testQuizGeneration() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('=== Testing Quiz Generation ===');
        
        // Test for different grades
        const grades = [6, 7, 8, 9, 11];
        
        for (const grade of grades) {
            console.log(`\n--- Testing Grade ${grade} ---`);
            
            // Check available questions
            const questionCount = await new Promise((resolve, reject) => {
                db.get(
                    'SELECT COUNT(*) as count FROM questions WHERE grade = ?',
                    [grade],
                    (err, row) => {
                        if (err) reject(err);
                        else resolve(row.count);
                    }
                );
            });
            
            console.log(`Available questions for Grade ${grade}: ${questionCount}`);
            
            if (questionCount >= 25) {
                // Test question selection by difficulty
                const difficulties = ['basic', 'medium', 'advanced'];
                for (const difficulty of difficulties) {
                    const difficultyCount = await new Promise((resolve, reject) => {
                        db.get(
                            'SELECT COUNT(*) as count FROM questions WHERE grade = ? AND difficulty = ?',
                            [grade, difficulty],
                            (err, row) => {
                                if (err) reject(err);
                                else resolve(row.count);
                            }
                        );
                    });
                    console.log(`  ${difficulty}: ${difficultyCount} questions`);
                }
                
                // Test random selection
                const randomQuestions = await new Promise((resolve, reject) => {
                    db.all(
                        'SELECT id, difficulty FROM questions WHERE grade = ? ORDER BY RANDOM() LIMIT 25',
                        [grade],
                        (err, rows) => {
                            if (err) reject(err);
                            else resolve(rows);
                        }
                    );
                });
                
                const difficultyDistribution = {
                    basic: randomQuestions.filter(q => q.difficulty === 'basic').length,
                    medium: randomQuestions.filter(q => q.difficulty === 'medium').length,
                    advanced: randomQuestions.filter(q => q.difficulty === 'advanced').length
                };
                
                console.log(`  Random selection distribution:`, difficultyDistribution);
                console.log(`  ✅ Grade ${grade} can generate quizzes`);
            } else {
                console.log(`  ❌ Grade ${grade} has insufficient questions (need 25, have ${questionCount})`);
            }
        }
        
        // Test a complete quiz generation for Grade 8
        console.log('\n--- Testing Complete Quiz Generation for Grade 8 ---');
        
        const testQuestions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.question_text, q.difficulty,
                       GROUP_CONCAT(
                           json_object(
                               'id', o.id,
                               'text', o.option_text,
                               'is_correct', o.is_correct
                           )
                       ) as options
                FROM questions q
                LEFT JOIN options o ON q.id = o.question_id
                WHERE q.grade = 8
                GROUP BY q.id
                ORDER BY RANDOM()
                LIMIT 5
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        console.log(`Sample questions for Grade 8:`);
        testQuestions.forEach((q, index) => {
            console.log(`${index + 1}. [${q.difficulty.toUpperCase()}] ${q.question_text.substring(0, 80)}...`);
            if (q.options) {
                const options = q.options.split(',').map(opt => JSON.parse(opt));
                options.forEach((opt, optIndex) => {
                    const marker = opt.is_correct ? '✓' : ' ';
                    console.log(`   ${String.fromCharCode(65 + optIndex)}. [${marker}] ${opt.text.substring(0, 50)}...`);
                });
            }
        });
        
        console.log('\n=== Quiz Generation Test Completed ===');

    } catch (error) {
        console.error('❌ Quiz generation test failed:', error.message);
    } finally {
        await database.close();
    }
}

testQuizGeneration();