const database = require('./server/config/database');

async function fixQuestionFormat() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('🔧 FIXING QUESTION FORMAT');
        console.log('=========================\n');

        // Get all questions that need format fixing
        const questions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT id, grade, difficulty, question_text 
                FROM questions 
                WHERE question_text LIKE '%Grade % % - % Question %'
                ORDER BY grade, difficulty, id
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log(`Found ${questions.length} questions that need format fixing`);

        let fixedCount = 0;

        for (const question of questions) {
            // Extract grade and topic from the current format
            const match = question.question_text.match(/Grade (\d+) (.+?) - (\w+) Question (\d+):/);
            if (match) {
                const [, grade, topic, difficulty, questionNum] = match;

                // Create a better question based on grade and topic
                let newQuestionText = '';

                switch (topic) {
                    case 'Computer Basics':
                        newQuestionText = `What is the main function of a computer's ${['CPU', 'RAM', 'hard drive', 'motherboard'][questionNum % 4]}?`;
                        break;
                    case 'Internet Safety':
                        newQuestionText = `Which of these is a good internet safety practice?`;
                        break;
                    case 'Programming Basics':
                        newQuestionText = `What is a ${['variable', 'function', 'loop', 'condition'][questionNum % 4]} in programming?`;
                        break;
                    case 'Web Development':
                        newQuestionText = `What does ${['HTML', 'CSS', 'JavaScript', 'HTTP'][questionNum % 4]} stand for?`;
                        break;
                    default:
                        newQuestionText = `What is an important concept in ${topic.toLowerCase()}?`;
                }

                // Update the question
                await new Promise((resolve, reject) => {
                    db.run(
                        'UPDATE questions SET question_text = ? WHERE id = ?',
                        [newQuestionText, question.id],
                        function (err) {
                            if (err) reject(err);
                            else resolve();
                        }
                    );
                });

                fixedCount++;

                if (fixedCount % 50 === 0) {
                    console.log(`Fixed ${fixedCount} questions...`);
                }
            }
        }

        console.log(`\n✅ Fixed ${fixedCount} questions successfully!`);

        await database.close();

    } catch (error) {
        console.error('❌ Error fixing question format:', error);
        await database.close();
    }
}

fixQuestionFormat();