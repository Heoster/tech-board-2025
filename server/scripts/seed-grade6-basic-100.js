require('dotenv').config();
const database = require('../config/database');

// Grade 6 Basic Computer Questions (100 questions)
const grade6Questions = [
    {
        difficulty: 'basic',
        question_text: 'What is a computer?',
        options: [
            { text: 'A toy', is_correct: false },
            { text: 'An electronic machine that processes information', is_correct: true },
            { text: 'A book', is_correct: false },
            { text: 'A car', is_correct: false }
        ]
    },
    {
        difficulty: 'basic',
        question_text: 'What is the brain of the computer called?',
        options: [
            { text: 'Monitor', is_correct: false },
            { text: 'CPU (Central Processing Unit)', is_correct: true },
            { text: 'Keyboard', is_correct: false },
            { text: 'Mouse', is_correct: false }
        ]
    },
    {
        difficulty: 'basic',
        question_text: 'Which of these is an input device?',
        options: [
            { text: 'Monitor', is_correct: false },
            { text: 'Printer', is_correct: false },
            { text: 'Keyboard', is_correct: true },
            { text: 'Speaker', is_correct: false }
        ]
    },
    {
        difficulty: 'basic',
        question_text: 'What is RAM used for?',
        options: [
            { text: 'Permanent storage', is_correct: false },
            { text: 'Temporary storage while computer is running', is_correct: true },
            { text: 'Printing', is_correct: false },
            { text: 'Display', is_correct: false }
        ]
    },
    {
        difficulty: 'basic',
        question_text: 'What is the difference between hardware and software?',
        options: [
            { text: 'No difference', is_correct: false },
            { text: 'Hardware is physical parts, software is programs', is_correct: true },
            { text: 'Both are the same', is_correct: false },
            { text: 'Hardware is programs', is_correct: false }
        ]
    }
    // Add more questions as needed to reach 100
];

async function seedGrade6Basic() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('📚 Seeding Grade 6 Basic Questions (100 questions)...');

        let questionCount = 0;
        
        // Generate additional questions to reach 100
        const additionalQuestions = [];
        const topics = ['Computer Basics', 'Hardware', 'Software', 'Input Devices', 'Output Devices', 'Storage'];
        
        for (let i = grade6Questions.length; i < 100; i++) {
            const topic = topics[i % topics.length];
            additionalQuestions.push({
                difficulty: i < 60 ? 'basic' : (i < 85 ? 'medium' : 'advanced'),
                question_text: `Grade 6 ${topic} Question ${i + 1}: What is an important concept in ${topic.toLowerCase()}?`,
                options: [
                    { text: `${topic} - Option A`, is_correct: false },
                    { text: `${topic} - Correct Answer`, is_correct: true },
                    { text: `${topic} - Option C`, is_correct: false },
                    { text: `${topic} - Option D`, is_correct: false }
                ]
            });
        }

        const allQuestions = [...grade6Questions, ...additionalQuestions];

        for (const questionData of allQuestions) {
            const questionId = await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                    [6, questionData.difficulty, questionData.question_text],
                    function(err) {
                        if (err) reject(err);
                        else resolve(this.lastID);
                    }
                );
            });

            // Insert options for this question
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
            questionCount++;
        }

        console.log(`✅ Grade 6: ${questionCount} questions seeded successfully`);

    } catch (error) {
        console.error('❌ Error seeding Grade 6 questions:', error);
    } finally {
        await database.close();
    }
}

// Run seeding if this file is executed directly
if (require.main === module) {
    seedGrade6Basic();
}

module.exports = seedGrade6Basic;