const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database path
const dbPath = path.join(__dirname, '..', 'database', 'mcq_system.db');

// Final questions to reach 10% advanced
const tenPercentAdvancedQuestions = [
    {
        grade: 6,
        questions: [
            {
                question: "What is the concept of memory bandwidth in computer architecture?",
                options: [
                    "The rate at which data can be read from or written to memory",
                    "A way to backup data",
                    "A type of computer virus",
                    "A programming technique"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "Explain the concept of memory latency in computer systems.",
                options: [
                    "The time delay between a memory request and when the data is available",
                    "A way to organize files",
                    "A type of database",
                    "A programming language"
                ],
                correct: 0,
                difficulty: "advanced"
            }
        ]
    },
    {
        grade: 7,
        questions: [
            {
                question: "What is the concept of type inference in programming languages?",
                options: [
                    "Automatic deduction of data types by the compiler or interpreter",
                    "A way to backup data",
                    "A type of computer virus",
                    "A programming error"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "Explain the concept of generic programming.",
                options: [
                    "Writing code that works with multiple data types without being rewritten",
                    "A way to write code quickly",
                    "A type of database",
                    "A programming language"
                ],
                correct: 0,
                difficulty: "advanced"
            }
        ]
    },
    {
        grade: 8,
        questions: [
            {
                question: "What is the concept of memory fragmentation in operating systems?",
                options: [
                    "A situation where memory becomes divided into small, unusable pieces",
                    "A way to organize files",
                    "A type of computer virus",
                    "A programming technique"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "Explain the concept of memory compaction.",
                options: [
                    "A technique to reduce memory fragmentation by moving allocated memory",
                    "A way to backup data",
                    "A type of database",
                    "A programming language"
                ],
                correct: 0,
                difficulty: "advanced"
            }
        ]
    },
    {
        grade: 9,
        questions: [
            {
                question: "What is the concept of ensemble learning in machine learning?",
                options: [
                    "Combining multiple models to improve prediction accuracy",
                    "A way to study programming",
                    "A type of database",
                    "A programming language"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "Explain the concept of cross-validation in machine learning.",
                options: [
                    "A technique to assess how well a model will generalize to new data",
                    "A way to write code quickly",
                    "A type of computer virus",
                    "A programming technique"
                ],
                correct: 0,
                difficulty: "advanced"
            }
        ]
    },
    {
        grade: 11,
        questions: [
            {
                question: "What is the concept of amortized analysis in data structures?",
                options: [
                    "Analyzing the average cost of operations over a sequence",
                    "A way to measure file size",
                    "A type of database",
                    "A programming technique"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "Explain the concept of persistent data structures.",
                options: [
                    "Data structures that preserve previous versions when modified",
                    "A way to write code quickly",
                    "A type of computer virus",
                    "A programming language"
                ],
                correct: 0,
                difficulty: "advanced"
            }
        ]
    }
];

async function queryDatabase(sql, params = []) {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                reject(err);
                return;
            }
        });

        db.run(sql, params, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ lastID: this.lastID, changes: this.changes });
            }
            db.close();
        });
    });
}

async function addTenPercentAdvancedQuestions() {
    try {
        console.log('Adding advanced questions to reach 10% target...');
        
        let totalAdded = 0;
        
        for (const gradeData of tenPercentAdvancedQuestions) {
            console.log(`\nAdding 10% target advanced questions for Grade ${gradeData.grade}...`);
            
            for (const questionData of gradeData.questions) {
                // Insert question
                const questionResult = await queryDatabase(
                    'INSERT INTO questions (grade, difficulty, question_text, created_at, updated_at) VALUES (?, ?, ?, datetime("now"), datetime("now"))',
                    [gradeData.grade, questionData.difficulty, questionData.question]
                );
                
                const questionId = questionResult.lastID;
                
                // Insert options
                for (let i = 0; i < questionData.options.length; i++) {
                    await queryDatabase(
                        'INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                        [questionId, questionData.options[i], i === questionData.correct ? 1 : 0, i + 1]
                    );
                }
                
                totalAdded++;
                console.log(`  Added question: ${questionData.question.substring(0, 50)}...`);
            }
        }
        
        console.log(`\n✅ Successfully added ${totalAdded} advanced questions to reach 10% target!`);
        console.log(`📊 Added ${totalAdded} questions across 5 grades`);
        
    } catch (error) {
        console.error('❌ Error adding 10% target advanced questions:', error);
    }
}

// Run the script
addTenPercentAdvancedQuestions();
