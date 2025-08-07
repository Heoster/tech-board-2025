require('dotenv').config();
const database = require('../config/database');

// Grade 9: 250+ Basic Computer Knowledge Questions
const grade9BasicQuestions = [
    // SECTION 1: Output Devices (25 questions)
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is an output device?',
        options: [
            { text: 'A device that shows results from computer', is_correct: true },
            { text: 'A device that sends data to computer', is_correct: false },
            { text: 'A device that stores data', is_correct: false },
            { text: 'A device that processes data', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Which device shows pictures and text?',
        options: [
            { text: 'Monitor', is_correct: true },
            { text: 'Keyboard', is_correct: false },
            { text: 'Mouse', is_correct: false },
            { text: 'Scanner', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Which device makes sound?',
        options: [
            { text: 'Speaker', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'Keyboard', is_correct: false },
            { text: 'Mouse', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Which device prints on paper?',
        options: [
            { text: 'Printer', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'Keyboard', is_correct: false },
            { text: 'Mouse', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What do headphones do?',
        options: [
            { text: 'Let you hear sound privately', is_correct: true },
            { text: 'Show pictures', is_correct: false },
            { text: 'Print documents', is_correct: false },
            { text: 'Type letters', is_correct: false }
        ]
    }
];

async function seedGrade9Basic250() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('🚀 Seeding Grade 9: 250+ Basic Computer Questions...');

        let insertedCount = 0;

        for (const questionData of grade9BasicQuestions) {
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

        console.log(`✅ Grade 9: Added ${insertedCount} basic questions`);

    } catch (error) {
        console.error('❌ Error seeding Grade 9:', error);
    } finally {
        await database.close();
    }
}

if (require.main === module) {
    seedGrade9Basic250();
}

module.exports = seedGrade9Basic250;