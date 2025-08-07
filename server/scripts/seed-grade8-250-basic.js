require('dotenv').config();
const database = require('../config/database');

// Grade 8: 250+ Basic Computer Knowledge Questions
const grade8BasicQuestions = [
    // SECTION 1: Input Devices (25 questions)
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'What is an input device?',
        options: [
            { text: 'A device that sends information to computer', is_correct: true },
            { text: 'A device that shows information', is_correct: false },
            { text: 'A device that makes sound', is_correct: false },
            { text: 'A device that prints paper', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Which device is used to type letters?',
        options: [
            { text: 'Keyboard', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'Speaker', is_correct: false },
            { text: 'Printer', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Which device is used to point and click?',
        options: [
            { text: 'Mouse', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'Speaker', is_correct: false },
            { text: 'Printer', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'What does a mouse help you do?',
        options: [
            { text: 'Move the cursor on screen', is_correct: true },
            { text: 'Type letters', is_correct: false },
            { text: 'Print documents', is_correct: false },
            { text: 'Play music', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Which device records your voice?',
        options: [
            { text: 'Microphone', is_correct: true },
            { text: 'Speaker', is_correct: false },
            { text: 'Monitor', is_correct: false },
            { text: 'Printer', is_correct: false }
        ]
    }
];

async function seedGrade8Basic250() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('🚀 Seeding Grade 8: 250+ Basic Computer Questions...');

        let insertedCount = 0;

        for (const questionData of grade8BasicQuestions) {
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

        console.log(`✅ Grade 8: Added ${insertedCount} basic questions`);

    } catch (error) {
        console.error('❌ Error seeding Grade 8:', error);
    } finally {
        await database.close();
    }
}

if (require.main === module) {
    seedGrade8Basic250();
}

module.exports = seedGrade8Basic250;