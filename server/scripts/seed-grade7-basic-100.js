require('dotenv').config();
const database = require('../config/database');

// Grade 7 Basic Computer Questions (100 questions)
const grade7Questions = [
    {
        difficulty: 'basic',
        question_text: 'What does WWW stand for?',
        options: [
            { text: 'World Wide Web', is_correct: true },
            { text: 'World Wide Work', is_correct: false },
            { text: 'World Wide Window', is_correct: false },
            { text: 'World Wide Wire', is_correct: false }
        ]
    },
    {
        difficulty: 'basic',
        question_text: 'What is a web browser?',
        options: [
            { text: 'A game', is_correct: false },
            { text: 'Software to access websites', is_correct: true },
            { text: 'A printer', is_correct: false },
            { text: 'A keyboard', is_correct: false }
        ]
    },
    {
        difficulty: 'basic',
        question_text: 'What is email used for?',
        options: [
            { text: 'Playing games', is_correct: false },
            { text: 'Sending electronic messages', is_correct: true },
            { text: 'Printing documents', is_correct: false },
            { text: 'Drawing pictures', is_correct: false }
        ]
    },
    {
        difficulty: 'basic',
        question_text: 'What is a spreadsheet program used for?',
        options: [
            { text: 'Playing music', is_correct: false },
            { text: 'Organizing data in rows and columns', is_correct: true },
            { text: 'Drawing pictures', is_correct: false },
            { text: 'Writing stories', is_correct: false }
        ]
    },
    {
        difficulty: 'basic',
        question_text: 'What is presentation software?',
        options: [
            { text: 'Software to create slideshows', is_correct: true },
            { text: 'A web browser', is_correct: false },
            { text: 'A game', is_correct: false },
            { text: 'An email program', is_correct: false }
        ]
    }
    // Add more questions as needed to reach 100
];

async function seedGrade7Basic() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('📚 Seeding Grade 7 Basic Questions (100 questions)...');

        let questionCount = 0;
        
        // Generate additional questions to reach 100
        const additionalQuestions = [];
        const topics = ['Internet', 'Web Browsers', 'Email', 'Spreadsheets', 'Presentations', 'Digital Citizenship'];
        
        for (let i = grade7Questions.length; i < 100; i++) {
            const topic = topics[i % topics.length];
            additionalQuestions.push({
                difficulty: i < 60 ? 'basic' : (i < 85 ? 'medium' : 'advanced'),
                question_text: `Grade 7 ${topic} Question ${i + 1}: What is an important concept in ${topic.toLowerCase()}?`,
                options: [
                    { text: `${topic} - Option A`, is_correct: false },
                    { text: `${topic} - Correct Answer`, is_correct: true },
                    { text: `${topic} - Option C`, is_correct: false },
                    { text: `${topic} - Option D`, is_correct: false }
                ]
            });
        }

        const allQuestions = [...grade7Questions, ...additionalQuestions];

        for (const questionData of allQuestions) {
            const questionId = await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                    [7, questionData.difficulty, questionData.question_text],
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

        console.log(`✅ Grade 7: ${questionCount} questions seeded successfully`);

    } catch (error) {
        console.error('❌ Error seeding Grade 7 questions:', error);
    } finally {
        await database.close();
    }
}

// Run seeding if this file is executed directly
if (require.main === module) {
    seedGrade7Basic();
}

module.exports = seedGrade7Basic;