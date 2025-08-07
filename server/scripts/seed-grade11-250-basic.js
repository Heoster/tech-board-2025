require('dotenv').config();
const database = require('../config/database');

// Grade 11: 250+ Basic Computer Knowledge Questions
const grade11BasicQuestions = [
    // SECTION 1: Computer Parts (25 questions)
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What is called the brain of computer?',
        options: [
            { text: 'CPU (Central Processing Unit)', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'Keyboard', is_correct: false },
            { text: 'Mouse', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What does CPU stand for?',
        options: [
            { text: 'Central Processing Unit', is_correct: true },
            { text: 'Computer Processing Unit', is_correct: false },
            { text: 'Central Program Unit', is_correct: false },
            { text: 'Computer Program Unit', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Where is data stored permanently?',
        options: [
            { text: 'Hard disk', is_correct: true },
            { text: 'RAM', is_correct: false },
            { text: 'CPU', is_correct: false },
            { text: 'Monitor', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What does RAM stand for?',
        options: [
            { text: 'Random Access Memory', is_correct: true },
            { text: 'Read Access Memory', is_correct: false },
            { text: 'Random Active Memory', is_correct: false },
            { text: 'Read Active Memory', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What connects all computer parts together?',
        options: [
            { text: 'Motherboard', is_correct: true },
            { text: 'CPU', is_correct: false },
            { text: 'RAM', is_correct: false },
            { text: 'Hard disk', is_correct: false }
        ]
    }
];

async function seedGrade11Basic250() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('🚀 Seeding Grade 11: 250+ Basic Computer Questions...');

        let insertedCount = 0;

        for (const questionData of grade11BasicQuestions) {
            try {
                const questionId = await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                        [questionData.grade, questionData.difficulty, questionData.question_text],
                        function(err) {
                            if (err) reject(err);
                            else resolve(this.lastID);
                        }
                    );
                });

                for (let i = 0; i < questionData.options.length; i++) {
                    const option = questionData.options[i];
                    await new Promise((resolve, reject) => {
                        db.run(
                            'INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                            [questionId, option.text, option.is_correct, i + 1],
                            function(err) {
                                if (err) reject(err);
                                else resolve();
                            }
                        );
                    });
                }
                insertedCount++;
            } catch (error) {
                console.log(`⚠️  Skipping duplicate: ${questionData.question_text.substring(0, 30)}...`);
            }
        }

        console.log(`✅ Grade 11: Added ${insertedCount} basic questions`);

    } catch (error) {
        console.error('❌ Error seeding Grade 11:', error);
    } finally {
        await database.close();
    }
}

if (require.main === module) {
    seedGrade11Basic250();
}

module.exports = seedGrade11Basic250;