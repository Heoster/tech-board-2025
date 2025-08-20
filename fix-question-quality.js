const database = require('./server/config/database');

const properQuestions = {
    22: {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is the fundamental principle of programming?',
        options: [
            { text: 'Breaking down complex problems into smaller, manageable parts', isCorrect: true },
            { text: 'Writing code as fast as possible', isCorrect: false },
            { text: 'Using the most advanced programming language', isCorrect: false },
            { text: 'Memorizing all programming syntax', isCorrect: false }
        ]
    },
    30: {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Which of the following is a characteristic of object-oriented programming?',
        options: [
            { text: 'Encapsulation', isCorrect: true },
            { text: 'Linear execution', isCorrect: false },
            { text: 'Global variables only', isCorrect: false },
            { text: 'No function definitions', isCorrect: false }
        ]
    }
};

async function fixQuestionQuality() {
    try {
        await database.connect();
        const db = database.getDb();
        
        console.log('Fixing question quality...');
        
        for (const [questionId, questionData] of Object.entries(properQuestions)) {
            console.log(`\nFixing question ${questionId}...`);
            
            // Start transaction
            await new Promise((resolve, reject) => {
                db.run('BEGIN TRANSACTION', (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            
            try {
                // Update question
                await new Promise((resolve, reject) => {
                    db.run(
                        'UPDATE questions SET grade = ?, difficulty = ?, question_text = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                        [questionData.grade, questionData.difficulty, questionData.question_text, questionId],
                        function(err) {
                            if (err) reject(err);
                            else resolve();
                        }
                    );
                });
                
                // Delete existing options
                await new Promise((resolve, reject) => {
                    db.run('DELETE FROM options WHERE question_id = ?', [questionId], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
                
                // Insert new options
                for (let i = 0; i < questionData.options.length; i++) {
                    const option = questionData.options[i];
                    await new Promise((resolve, reject) => {
                        db.run(
                            'INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                            [questionId, option.text, option.isCorrect, i + 1],
                            function(err) {
                                if (err) reject(err);
                                else resolve();
                            }
                        );
                    });
                }
                
                // Commit transaction
                await new Promise((resolve, reject) => {
                    db.run('COMMIT', (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
                
                console.log(`✅ Question ${questionId} fixed successfully`);
                
            } catch (error) {
                // Rollback transaction
                await new Promise((resolve) => {
                    db.run('ROLLBACK', () => resolve());
                });
                throw error;
            }
        }
        
        // Fix other placeholder questions
        console.log('\nFixing placeholder questions...');
        
        const placeholderFixes = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.grade, q.difficulty
                FROM questions q
                LEFT JOIN options o ON q.id = o.question_id
                WHERE q.question_text LIKE '%Alternative option%'
                   OR q.question_text LIKE '%Option A for%'
                   OR o.option_text LIKE '%Alternative option%'
                   OR o.option_text LIKE '%Option A for%'
                GROUP BY q.id
                LIMIT 50
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        for (const question of placeholderFixes) {
            const newQuestion = generateProperQuestion(question.grade, question.difficulty);
            
            // Start transaction
            await new Promise((resolve, reject) => {
                db.run('BEGIN TRANSACTION', (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            
            try {
                // Update question
                await new Promise((resolve, reject) => {
                    db.run(
                        'UPDATE questions SET question_text = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                        [newQuestion.question_text, question.id],
                        function(err) {
                            if (err) reject(err);
                            else resolve();
                        }
                    );
                });
                
                // Delete existing options
                await new Promise((resolve, reject) => {
                    db.run('DELETE FROM options WHERE question_id = ?', [question.id], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
                
                // Insert new options
                for (let i = 0; i < newQuestion.options.length; i++) {
                    const option = newQuestion.options[i];
                    await new Promise((resolve, reject) => {
                        db.run(
                            'INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                            [question.id, option.text, option.isCorrect, i + 1],
                            function(err) {
                                if (err) reject(err);
                                else resolve();
                            }
                        );
                    });
                }
                
                // Commit transaction
                await new Promise((resolve, reject) => {
                    db.run('COMMIT', (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
                
                console.log(`✅ Fixed placeholder question ${question.id}`);
                
            } catch (error) {
                // Rollback transaction
                await new Promise((resolve) => {
                    db.run('ROLLBACK', () => resolve());
                });
                console.error(`❌ Failed to fix question ${question.id}:`, error.message);
            }
        }
        
        console.log('\n✅ Question quality fixes completed!');
        await database.close();
        
    } catch (error) {
        console.error('Error fixing question quality:', error);
    }
}

function generateProperQuestion(grade, difficulty) {
    const questionTemplates = {
        6: {
            basic: [
                {
                    question_text: 'What is the main function of a computer\'s CPU?',
                    options: [
                        { text: 'To process instructions and perform calculations', isCorrect: true },
                        { text: 'To store data permanently', isCorrect: false },
                        { text: 'To display images on screen', isCorrect: false },
                        { text: 'To connect to the internet', isCorrect: false }
                    ]
                },
                {
                    question_text: 'Which of these is an input device?',
                    options: [
                        { text: 'Keyboard', isCorrect: true },
                        { text: 'Monitor', isCorrect: false },
                        { text: 'Speaker', isCorrect: false },
                        { text: 'Printer', isCorrect: false }
                    ]
                }
            ],
            medium: [
                {
                    question_text: 'What does RAM stand for in computer terminology?',
                    options: [
                        { text: 'Random Access Memory', isCorrect: true },
                        { text: 'Read Access Memory', isCorrect: false },
                        { text: 'Rapid Access Memory', isCorrect: false },
                        { text: 'Remote Access Memory', isCorrect: false }
                    ]
                }
            ]
        },
        7: {
            basic: [
                {
                    question_text: 'What is the purpose of an operating system?',
                    options: [
                        { text: 'To manage computer hardware and software resources', isCorrect: true },
                        { text: 'To create documents', isCorrect: false },
                        { text: 'To browse the internet', isCorrect: false },
                        { text: 'To play games', isCorrect: false }
                    ]
                }
            ]
        },
        8: {
            basic: [
                {
                    question_text: 'What is a computer algorithm?',
                    options: [
                        { text: 'A step-by-step procedure to solve a problem', isCorrect: true },
                        { text: 'A type of computer hardware', isCorrect: false },
                        { text: 'A programming language', isCorrect: false },
                        { text: 'A computer virus', isCorrect: false }
                    ]
                }
            ]
        },
        9: {
            basic: [
                {
                    question_text: 'What is the main advantage of using functions in programming?',
                    options: [
                        { text: 'Code reusability and organization', isCorrect: true },
                        { text: 'Faster computer performance', isCorrect: false },
                        { text: 'Better graphics display', isCorrect: false },
                        { text: 'Increased memory usage', isCorrect: false }
                    ]
                }
            ]
        },
        11: {
            basic: [
                {
                    question_text: 'What is object-oriented programming?',
                    options: [
                        { text: 'A programming paradigm based on objects and classes', isCorrect: true },
                        { text: 'Programming only with numbers', isCorrect: false },
                        { text: 'Programming without functions', isCorrect: false },
                        { text: 'Programming only for games', isCorrect: false }
                    ]
                }
            ]
        }
    };
    
    const gradeQuestions = questionTemplates[grade] || questionTemplates[6];
    const difficultyQuestions = gradeQuestions[difficulty] || gradeQuestions.basic;
    
    return difficultyQuestions[Math.floor(Math.random() * difficultyQuestions.length)];
}

fixQuestionQuality();