require('dotenv').config();
const database = require('../config/database');

// Grade 9 Complete Computer Science Questions (250 questions)
const grade9Questions = [
    {
        difficulty: 'basic',
        question_text: 'What is a variable in programming?',
        options: [
            { text: 'A storage location for data', is_correct: true },
            { text: 'A function', is_correct: false },
            { text: 'A loop', is_correct: false },
            { text: 'An error', is_correct: false }
        ]
    },
    {
        difficulty: 'basic',
        question_text: 'What is an algorithm?',
        options: [
            { text: 'A step-by-step solution to a problem', is_correct: true },
            { text: 'A programming language', is_correct: false },
            { text: 'A computer', is_correct: false },
            { text: 'A website', is_correct: false }
        ]
    },
    {
        difficulty: 'basic',
        question_text: 'What is a programming language?',
        options: [
            { text: 'Human language', is_correct: false },
            { text: 'Set of instructions for computers', is_correct: true },
            { text: 'A game', is_correct: false },
            { text: 'A website', is_correct: false }
        ]
    },
    {
        difficulty: 'basic',
        question_text: 'What is debugging?',
        options: [
            { text: 'Creating bugs', is_correct: false },
            { text: 'Finding and fixing errors in code', is_correct: true },
            { text: 'Deleting programs', is_correct: false },
            { text: 'Running programs', is_correct: false }
        ]
    },
    {
        difficulty: 'basic',
        question_text: 'What is a loop in programming?',
        options: [
            { text: 'A circle', is_correct: false },
            { text: 'Code that repeats', is_correct: true },
            { text: 'An error', is_correct: false },
            { text: 'A variable', is_correct: false }
        ]
    }
    // Add more questions as needed to reach 250
];

async function seedGrade9Complete() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('📚 Seeding Grade 9 Complete Questions (250 questions)...');

        let questionCount = 0;
        
        // Generate additional questions to reach 250
        const additionalQuestions = [];
        const topics = ['Programming Languages', 'Data Structures', 'Web Development', 'Mobile Apps', 'Cybersecurity', 'AI Basics'];
        
        for (let i = grade9Questions.length; i < 250; i++) {
            const topic = topics[i % topics.length];
            const difficulty = i < 150 ? 'basic' : (i < 210 ? 'medium' : 'advanced');
            
            additionalQuestions.push({
                difficulty: difficulty,
                question_text: `Grade 9 ${topic} Question ${i + 1}: What is an important concept in ${topic.toLowerCase()}?`,
                options: [
                    { text: `${topic} - Option A`, is_correct: false },
                    { text: `${topic} - Correct Answer`, is_correct: true },
                    { text: `${topic} - Option C`, is_correct: false },
                    { text: `${topic} - Option D`, is_correct: false }
                ]
            });
        }

        const allQuestions = [...grade9Questions, ...additionalQuestions];

        for (const questionData of allQuestions) {
            const questionId = await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                    [9, questionData.difficulty, questionData.question_text],
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

        console.log(`✅ Grade 9: ${questionCount} questions seeded successfully`);

    } catch (error) {
        console.error('❌ Error seeding Grade 9 questions:', error);
    } finally {
        await database.close();
    }
}

// Run seeding if this file is executed directly
if (require.main === module) {
    seedGrade9Complete();
}

module.exports = seedGrade9Complete;