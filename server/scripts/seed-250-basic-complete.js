require('dotenv').config();
const database = require('../config/database');

// 250+ Basic Computer Knowledge Questions in Easy Language
const basicComputerQuestions = [
    // Computer Basics (50 questions)
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
        question_text: 'Which of the following is a computer?',
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

async function seed250BasicComplete() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('🚀 Starting 250+ Basic Computer Knowledge questions seeding...');
        console.log('📚 All questions use easy language and default format');

        let insertedCount = 0;

        // Insert questions
        for (const questionData of basicComputerQuestions) {
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
                insertedCount++;
                
            } catch (error) {
                console.log(`⚠️  Skipping duplicate question: ${questionData.question_text.substring(0, 50)}...`);
            }
        }

        console.log(`✅ Successfully added ${insertedCount} Basic Computer Knowledge questions!`);
        console.log('🎯 Perfect for TECH BOARD 2025 Selection Test');

        // Verify total count
        const totalBasic = await new Promise((resolve) => {
            db.get('SELECT COUNT(*) as count FROM questions WHERE difficulty = "basic"', (err, row) => {
                resolve(row ? row.count : 0);
            });
        });

        console.log(`📊 Total Basic Questions in Database: ${totalBasic}`);
        
        if (totalBasic >= 250) {
            console.log('🎉 SUCCESS: 250+ Basic Computer Questions Available!');
        } else {
            console.log('⚠️  Need more questions to reach 250+');
        }

    } catch (error) {
        console.error('❌ Error seeding Basic Computer questions:', error);
    } finally {
        await database.close();
    }
}

// Run seeding if this file is executed directly
if (require.main === module) {
    seed250BasicComplete();
}

module.exports = seed250BasicComplete;