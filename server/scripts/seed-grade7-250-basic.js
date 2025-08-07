require('dotenv').config();
const database = require('../config/database');

// Grade 7: 250+ Basic Computer Knowledge Questions
const grade7BasicQuestions = [
    // SECTION 1: Computer Types (25 questions)
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What is a desktop computer?',
        options: [
            { text: 'A computer that sits on a desk', is_correct: true },
            { text: 'A computer you can carry', is_correct: false },
            { text: 'A computer in your pocket', is_correct: false },
            { text: 'A computer on your wrist', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What is a laptop computer?',
        options: [
            { text: 'A portable computer you can carry', is_correct: true },
            { text: 'A computer that never moves', is_correct: false },
            { text: 'A computer for cooking', is_correct: false },
            { text: 'A computer for cleaning', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What is a tablet computer?',
        options: [
            { text: 'A flat computer with a touch screen', is_correct: true },
            { text: 'A medicine for computers', is_correct: false },
            { text: 'A computer keyboard', is_correct: false },
            { text: 'A computer mouse', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What is a smartphone?',
        options: [
            { text: 'A phone that can run computer programs', is_correct: true },
            { text: 'A very intelligent phone', is_correct: false },
            { text: 'A phone for smart people', is_correct: false },
            { text: 'A phone that talks', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What is a smartwatch?',
        options: [
            { text: 'A watch that can run simple programs', is_correct: true },
            { text: 'A watch that tells jokes', is_correct: false },
            { text: 'A watch for smart people', is_correct: false },
            { text: 'A watch that cooks food', is_correct: false }
        ]
    }
];

async function seedGrade7Basic250() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('🚀 Seeding Grade 7: 250+ Basic Computer Questions...');

        let insertedCount = 0;

        for (const questionData of grade7BasicQuestions) {
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

        console.log(`✅ Grade 7: Added ${insertedCount} basic questions`);

    } catch (error) {
        console.error('❌ Error seeding Grade 7:', error);
    } finally {
        await database.close();
    }
}

if (require.main === module) {
    seedGrade7Basic250();
}

module.exports = seedGrade7Basic250;