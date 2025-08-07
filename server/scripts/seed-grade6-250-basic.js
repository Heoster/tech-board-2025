require('dotenv').config();
const database = require('../config/database');

// Grade 6: 250+ Basic Computer Knowledge Questions
const grade6BasicQuestions = [
    // SECTION 1: What is a Computer? (25 questions)
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is a computer?',
        options: [
            { text: 'An electronic machine that processes data', is_correct: true },
            { text: 'A type of television', is_correct: false },
            { text: 'A kitchen appliance', is_correct: false },
            { text: 'A musical instrument', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which of these is a computer?',
        options: [
            { text: 'Laptop', is_correct: true },
            { text: 'Chair', is_correct: false },
            { text: 'Book', is_correct: false },
            { text: 'Pen', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What does a computer need to work?',
        options: [
            { text: 'Electricity', is_correct: true },
            { text: 'Water', is_correct: false },
            { text: 'Oil', is_correct: false },
            { text: 'Gas', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which computer is easy to carry?',
        options: [
            { text: 'Laptop', is_correct: true },
            { text: 'Desktop', is_correct: false },
            { text: 'Server', is_correct: false },
            { text: 'Mainframe', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is the main job of a computer?',
        options: [
            { text: 'To process information', is_correct: true },
            { text: 'To cook food', is_correct: false },
            { text: 'To clean clothes', is_correct: false },
            { text: 'To grow plants', is_correct: false }
        ]
    }
];

async function seedGrade6Basic250() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('🚀 Seeding Grade 6: 250+ Basic Computer Questions...');

        let insertedCount = 0;

        for (const questionData of grade6BasicQuestions) {
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

        console.log(`✅ Grade 6: Added ${insertedCount} basic questions`);

    } catch (error) {
        console.error('❌ Error seeding Grade 6:', error);
    } finally {
        await database.close();
    }
}

if (require.main === module) {
    seedGrade6Basic250();
}

module.exports = seedGrade6Basic250;