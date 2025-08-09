const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database path
const dbPath = path.join(__dirname, '..', 'database', 'mcq_system.db');

// Final target advanced questions to reach 10-20% range
const finalTargetAdvancedQuestions = [
    {
        grade: 6,
        questions: [
            {
                question: "What is the concept of branch target buffer in CPU design?",
                options: [
                    "A cache that stores predicted target addresses for branch instructions",
                    "A way to backup data",
                    "A type of computer virus",
                    "A programming technique"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "Explain the concept of register renaming in modern processors.",
                options: [
                    "A technique to eliminate false data dependencies between instructions",
                    "A way to organize files",
                    "A type of database",
                    "A programming language"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the concept of Tomasulo algorithm?",
                options: [
                    "A technique for dynamic instruction scheduling and register renaming",
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
        grade: 7,
        questions: [
            {
                question: "What is the concept of const correctness in C++?",
                options: [
                    "A programming practice that prevents accidental modification of data",
                    "A way to backup data",
                    "A type of database",
                    "A programming error"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "Explain the concept of RAII (Resource Acquisition Is Initialization).",
                options: [
                    "A programming idiom that ties resource management to object lifetime",
                    "A way to organize files",
                    "A type of computer virus",
                    "A programming language"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the concept of move semantics in C++?",
                options: [
                    "A feature that allows efficient transfer of resources between objects",
                    "A way to copy files",
                    "A type of database",
                    "A programming technique"
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
                question: "What is the concept of priority ceiling protocol?",
                options: [
                    "A protocol to prevent priority inversion in real-time systems",
                    "A way to organize files",
                    "A type of computer virus",
                    "A programming technique"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "Explain the concept of rate monotonic scheduling.",
                options: [
                    "A scheduling algorithm for periodic tasks with fixed priorities",
                    "A way to write code quickly",
                    "A type of database",
                    "A programming language"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the concept of earliest deadline first scheduling?",
                options: [
                    "A dynamic priority scheduling algorithm for real-time systems",
                    "A way to organize files",
                    "A type of computer virus",
                    "A programming technique"
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
                question: "What is the concept of attention mechanisms in neural networks?",
                options: [
                    "A technique that allows models to focus on relevant parts of input data",
                    "A way to study programming",
                    "A type of database",
                    "A programming language"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "Explain the concept of transformer architecture in NLP.",
                options: [
                    "A neural network architecture based on self-attention mechanisms",
                    "A way to write code quickly",
                    "A type of computer virus",
                    "A programming technique"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the concept of few-shot learning in machine learning?",
                options: [
                    "Learning to recognize new classes from very few examples",
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
        grade: 11,
        questions: [
            {
                question: "What is the concept of competitive analysis in online algorithms?",
                options: [
                    "Analyzing algorithm performance against an optimal offline algorithm",
                    "A way to measure file size",
                    "A type of database",
                    "A programming technique"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "Explain the concept of primal-dual algorithms.",
                options: [
                    "Algorithms that solve optimization problems using duality theory",
                    "A way to write code quickly",
                    "A type of computer virus",
                    "A programming language"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the concept of parameterized complexity?",
                options: [
                    "A framework for analyzing algorithm complexity with respect to parameters",
                    "A way to organize files",
                    "A type of database",
                    "A programming technique"
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

async function addFinalTargetAdvancedQuestions() {
    try {
        console.log('Adding final target advanced questions to reach 10-20% range...');
        
        let totalAdded = 0;
        
        for (const gradeData of finalTargetAdvancedQuestions) {
            console.log(`\nAdding final target advanced questions for Grade ${gradeData.grade}...`);
            
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
        
        console.log(`\n✅ Successfully added ${totalAdded} final target advanced questions to the database!`);
        console.log(`📊 Added ${totalAdded} questions across 5 grades`);
        
    } catch (error) {
        console.error('❌ Error adding final target advanced questions:', error);
    }
}

// Run the script
addFinalTargetAdvancedQuestions();
