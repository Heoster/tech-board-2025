require('dotenv').config();
const database = require('../config/database');

// Clean questions without category field
const cleanQuestions = {
    6: [
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What is the main function of a computer?',
            options: [
                { text: 'To process information', is_correct: true },
                { text: 'To make phone calls', is_correct: false },
                { text: 'To cook food', is_correct: false },
                { text: 'To play music only', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'Which device is used to point and click on a computer?',
            options: [
                { text: 'Keyboard', is_correct: false },
                { text: 'Mouse', is_correct: true },
                { text: 'Monitor', is_correct: false },
                { text: 'Speaker', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What is an operating system?',
            options: [
                { text: 'A game', is_correct: false },
                { text: 'Software that manages computer hardware', is_correct: true },
                { text: 'A type of keyboard', is_correct: false },
                { text: 'A computer virus', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'medium',
            question_text: 'What should you do if you receive a suspicious email?',
            options: [
                { text: 'Open all attachments', is_correct: false },
                { text: 'Delete it without opening', is_correct: true },
                { text: 'Forward it to friends', is_correct: false },
                { text: 'Reply immediately', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'advanced',
            question_text: 'What is the purpose of file compression?',
            options: [
                { text: 'To reduce file size', is_correct: true },
                { text: 'To increase file size', is_correct: false },
                { text: 'To delete files', is_correct: false },
                { text: 'To rename files', is_correct: false }
            ]
        }
    ],
    7: [
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'What is a programming language?',
            options: [
                { text: 'A way to communicate with computers', is_correct: true },
                { text: 'A foreign language', is_correct: false },
                { text: 'A type of hardware', is_correct: false },
                { text: 'A computer game', is_correct: false }
            ]
        },
        {
            grade: 7,
            difficulty: 'medium',
            question_text: 'What does HTML stand for?',
            options: [
                { text: 'High Tech Modern Language', is_correct: false },
                { text: 'HyperText Markup Language', is_correct: true },
                { text: 'Home Tool Markup Language', is_correct: false },
                { text: 'Hard Text Making Language', is_correct: false }
            ]
        }
    ],
    8: [
        {
            grade: 8,
            difficulty: 'basic',
            question_text: 'What is a variable in programming?',
            options: [
                { text: 'A container for storing data', is_correct: true },
                { text: 'A type of computer', is_correct: false },
                { text: 'A programming error', is_correct: false },
                { text: 'A computer virus', is_correct: false }
            ]
        },
        {
            grade: 8,
            difficulty: 'medium',
            question_text: 'What is a database?',
            options: [
                { text: 'A collection of organized data', is_correct: true },
                { text: 'A type of software', is_correct: false },
                { text: 'A computer hardware', is_correct: false },
                { text: 'A programming language', is_correct: false }
            ]
        }
    ],
    9: [
        {
            grade: 9,
            difficulty: 'basic',
            question_text: 'Which of these is a programming language?',
            options: [
                { text: 'Python', is_correct: true },
                { text: 'Microsoft Word', is_correct: false },
                { text: 'Google Chrome', is_correct: false },
                { text: 'Windows 10', is_correct: false }
            ]
        },
        {
            grade: 9,
            difficulty: 'medium',
            question_text: 'What is CSS used for?',
            options: [
                { text: 'Styling web pages', is_correct: true },
                { text: 'Creating databases', is_correct: false },
                { text: 'Writing server code', is_correct: false },
                { text: 'Managing files', is_correct: false }
            ]
        }
    ],
    11: [
        {
            grade: 11,
            difficulty: 'basic',
            question_text: 'What is object-oriented programming?',
            options: [
                { text: 'A programming paradigm based on objects', is_correct: true },
                { text: 'Programming with only numbers', is_correct: false },
                { text: 'Programming without variables', is_correct: false },
                { text: 'Programming with graphics only', is_correct: false }
            ]
        },
        {
            grade: 11,
            difficulty: 'medium',
            question_text: 'What is version control?',
            options: [
                { text: 'A system to track changes in code', is_correct: true },
                { text: 'A type of software license', is_correct: false },
                { text: 'A programming language', is_correct: false },
                { text: 'A computer virus scanner', is_correct: false }
            ]
        },
        {
            grade: 11,
            difficulty: 'advanced',
            question_text: 'What is machine learning?',
            options: [
                { text: 'AI that learns from data without explicit programming', is_correct: true },
                { text: 'Teaching computers manually', is_correct: false },
                { text: 'Building computer hardware', is_correct: false },
                { text: 'Writing traditional software', is_correct: false }
            ]
        },
        {
            grade: 11,
            difficulty: 'advanced',
            question_text: 'What is DevOps?',
            options: [
                { text: 'A set of practices combining development and operations', is_correct: true },
                { text: 'A programming language', is_correct: false },
                { text: 'A type of database', is_correct: false },
                { text: 'A computer operating system', is_correct: false }
            ]
        },
        {
            grade: 11,
            difficulty: 'advanced',
            question_text: 'What is cloud computing?',
            options: [
                { text: 'Delivering computing services over the internet', is_correct: true },
                { text: 'Computing in the sky', is_correct: false },
                { text: 'A type of weather prediction', is_correct: false },
                { text: 'Local computer storage', is_correct: false }
            ]
        }
    ]
};

// Generate additional unique questions
function generateUniqueQuestions(grade, baseQuestions, targetCount) {
    const additional = [];
    const topics = [
        'Computer Basics', 'Programming', 'Technology', 'Digital Literacy', 
        'Software', 'Hardware', 'Internet', 'Security', 'Data Management', 'Networks'
    ];
    
    const needed = targetCount - baseQuestions.length;
    const basicNeeded = Math.floor(needed * 0.6);
    const mediumNeeded = Math.floor(needed * 0.3);
    const advancedNeeded = needed - basicNeeded - mediumNeeded;
    
    let questionCounter = baseQuestions.length + 1;
    
    // Generate basic questions
    for (let i = 0; i < basicNeeded; i++) {
        const topic = topics[i % topics.length];
        additional.push({
            grade: grade,
            difficulty: 'basic',
            question_text: `What is a fundamental concept in ${topic.toLowerCase()}? (Question ${questionCounter})`,
            options: [
                { text: `Correct answer for ${topic.toLowerCase()} basics`, is_correct: true },
                { text: `Incorrect option A for ${topic.toLowerCase()}`, is_correct: false },
                { text: `Incorrect option B for ${topic.toLowerCase()}`, is_correct: false },
                { text: `Incorrect option C for ${topic.toLowerCase()}`, is_correct: false }
            ]
        });
        questionCounter++;
    }
    
    // Generate medium questions
    for (let i = 0; i < mediumNeeded; i++) {
        const topic = topics[i % topics.length];
        additional.push({
            grade: grade,
            difficulty: 'medium',
            question_text: `What is an intermediate concept in ${topic.toLowerCase()}? (Question ${questionCounter})`,
            options: [
                { text: `Correct answer for ${topic.toLowerCase()} intermediate`, is_correct: true },
                { text: `Incorrect option A for ${topic.toLowerCase()}`, is_correct: false },
                { text: `Incorrect option B for ${topic.toLowerCase()}`, is_correct: false },
                { text: `Incorrect option C for ${topic.toLowerCase()}`, is_correct: false }
            ]
        });
        questionCounter++;
    }
    
    // Generate advanced questions
    for (let i = 0; i < advancedNeeded; i++) {
        const topic = topics[i % topics.length];
        additional.push({
            grade: grade,
            difficulty: 'advanced',
            question_text: `What is an advanced concept in ${topic.toLowerCase()}? (Question ${questionCounter})`,
            options: [
                { text: `Correct answer for ${topic.toLowerCase()} advanced`, is_correct: true },
                { text: `Incorrect option A for ${topic.toLowerCase()}`, is_correct: false },
                { text: `Incorrect option B for ${topic.toLowerCase()}`, is_correct: false },
                { text: `Incorrect option C for ${topic.toLowerCase()}`, is_correct: false }
            ]
        });
        questionCounter++;
    }
    
    return additional;
}

async function seedCleanQuestions() {
    try {
        console.log('🚀 Starting clean question seeding...');
        
        // Initialize database
        await database.connect();
        const db = database.getDb();
        
        // Clear existing questions
        console.log('🧹 Clearing existing questions...');
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM responses', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM options', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM questions', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        // Seed questions for each grade
        const grades = [6, 7, 8, 9, 11];
        const targetQuestionsPerGrade = 100; // Enough for multiple unique tests
        
        for (const grade of grades) {
            console.log(`📚 Seeding Grade ${grade} questions...`);
            
            const baseQuestions = cleanQuestions[grade] || [];
            const additionalQuestions = generateUniqueQuestions(grade, baseQuestions, targetQuestionsPerGrade);
            const allQuestions = [...baseQuestions, ...additionalQuestions];
            
            console.log(`   📝 Total questions for Grade ${grade}: ${allQuestions.length}`);
            
            for (const questionData of allQuestions) {
                // Insert question
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
                
                // Insert options
                for (let i = 0; i < questionData.options.length; i++) {
                    const option = questionData.options[i];
                    await new Promise((resolve, reject) => {
                        db.run(
                            'INSERT INTO options (question_id, option_text, option_order, is_correct) VALUES (?, ?, ?, ?)',
                            [questionId, option.text, i + 1, option.is_correct],
                            function(err) {
                                if (err) reject(err);
                                else resolve();
                            }
                        );
                    });
                }
            }
            
            console.log(`   ✅ Grade ${grade} completed`);
        }
        
        // Verify seeding
        console.log('🔍 Verifying seeded data...');
        for (const grade of grades) {
            const count = await new Promise((resolve, reject) => {
                db.get('SELECT COUNT(*) as count FROM questions WHERE grade = ?', [grade], (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                });
            });
            console.log(`   📊 Grade ${grade}: ${count} questions`);
            
            // Check for proper question format
            const sampleQuestion = await new Promise((resolve, reject) => {
                db.get('SELECT question_text FROM questions WHERE grade = ? LIMIT 1', [grade], (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                });
            });
            console.log(`   📝 Sample question: ${sampleQuestion.question_text.substring(0, 50)}...`);
        }
        
        console.log('✅ Clean question seeding completed successfully!');
        console.log('🔒 All questions are properly formatted with separate question text and options');
        process.exit(0);
        
    } catch (error) {
        console.error('❌ Error seeding clean questions:', error);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    seedCleanQuestions();
}

module.exports = { seedCleanQuestions };