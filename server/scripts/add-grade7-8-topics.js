const database = require('../config/database');

// Grade 7: Intermediate Level (40 questions)
const generateGrade7Questions = () => {
    return [
        // Microsoft Office Intermediate (15 questions)
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'What is a formula in Excel?',
            options: [
                { text: 'A calculation that starts with =', is_correct: true },
                { text: 'A type of text', is_correct: false },
                { text: 'A picture in Excel', is_correct: false },
                { text: 'A color in Excel', is_correct: false }
            ]
        },
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'What does SUM function do in Excel?',
            options: [
                { text: 'Adds numbers together', is_correct: true },
                { text: 'Subtracts numbers', is_correct: false },
                { text: 'Multiplies numbers', is_correct: false },
                { text: 'Divides numbers', is_correct: false }
            ]
        },
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'What is a chart in Excel?',
            options: [
                { text: 'A visual representation of data', is_correct: true },
                { text: 'A type of text', is_correct: false },
                { text: 'A formula', is_correct: false },
                { text: 'A color scheme', is_correct: false }
            ]
        },
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'What is a slide in PowerPoint?',
            options: [
                { text: 'One page of a presentation', is_correct: true },
                { text: 'A type of animation', is_correct: false },
                { text: 'A sound effect', is_correct: false },
                { text: 'A color theme', is_correct: false }
            ]
        },
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'What is animation in PowerPoint?',
            options: [
                { text: 'Moving effects on slides', is_correct: true },
                { text: 'Static pictures', is_correct: false },
                { text: 'Text formatting', is_correct: false },
                { text: 'Slide backgrounds', is_correct: false }
            ]
        }
    ];
};

async function addGrade7And8Topics() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('🚀 ADDING GRADE 7 TOPICS');
        console.log('========================');

        const grade7Questions = generateGrade7Questions();
        
        for (const question of grade7Questions) {
            // Insert question
            const questionId = await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                    [question.grade, question.difficulty, question.question_text],
                    function (err) {
                        if (err) reject(err);
                        else resolve(this.lastID);
                    }
                );
            });

            // Insert options
            for (let i = 0; i < question.options.length; i++) {
                const option = question.options[i];
                await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT INTO options (question_id, option_text, option_order, is_correct) VALUES (?, ?, ?, ?)',
                        [questionId, option.text, i + 1, option.is_correct ? 1 : 0],
                        function (err) {
                            if (err) reject(err);
                            else resolve();
                        }
                    );
                });
            }
        }

        console.log(`✅ Added ${grade7Questions.length} questions to Grade 7`);

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await database.close();
    }
}

addGrade7And8Topics();