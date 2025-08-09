const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database path
const dbPath = path.join(__dirname, '..', 'database', 'mcq_system.db');

// Target advanced questions to reach 10-20% range
const targetAdvancedQuestions = [
    {
        grade: 6,
        questions: [
            {
                question: "What is the concept of cache coherence in multiprocessor systems?",
                options: [
                    "Ensuring consistency of data across multiple processor caches",
                    "A way to backup data",
                    "A type of computer virus",
                    "A programming technique"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "Explain the concept of speculative execution in CPU design.",
                options: [
                    "Executing instructions before knowing if they are needed",
                    "A way to write code quickly",
                    "A type of database",
                    "A programming language"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the concept of memory-mapped I/O?",
                options: [
                    "A technique where I/O devices are accessed through memory addresses",
                    "A way to organize files",
                    "A type of computer virus",
                    "A programming error"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "How does a computer implement direct memory access (DMA)?",
                options: [
                    "By allowing devices to access memory directly without CPU intervention",
                    "By using only CPU for all memory access",
                    "By using only cache memory",
                    "By using only virtual memory"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the concept of interrupt vector table?",
                options: [
                    "A table that contains addresses of interrupt service routines",
                    "A way to organize files",
                    "A type of database",
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
                question: "What is the concept of template metaprogramming?",
                options: [
                    "A technique where templates are used to perform computations at compile time",
                    "A way to write code quickly",
                    "A type of computer virus",
                    "A programming language"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "Explain the concept of lambda expressions in programming.",
                options: [
                    "Anonymous functions that can be defined inline",
                    "A way to backup data",
                    "A type of database",
                    "A programming error"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the concept of smart pointers in C++?",
                options: [
                    "Pointers that automatically manage memory allocation and deallocation",
                    "Pointers that are always smart",
                    "Pointers that never fail",
                    "Pointers that are always fast"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "How does a computer implement function pointers?",
                options: [
                    "By storing the address of a function in a variable",
                    "By using only regular pointers",
                    "By using only arrays",
                    "By using only variables"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the concept of operator overloading?",
                options: [
                    "Defining new meanings for existing operators",
                    "A way to write code quickly",
                    "A type of computer virus",
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
                question: "What is the concept of priority inversion in real-time systems?",
                options: [
                    "A situation where a low-priority task blocks a high-priority task",
                    "A type of computer virus",
                    "A way to backup data",
                    "A programming technique"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "Explain the concept of real-time operating systems.",
                options: [
                    "Operating systems designed to handle real-time applications with strict timing requirements",
                    "A way to organize files",
                    "A type of database",
                    "A programming language"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the concept of kernel mode vs user mode?",
                options: [
                    "Different privilege levels for executing code in the operating system",
                    "A way to organize files",
                    "A type of computer virus",
                    "A programming error"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "How does a computer implement system calls?",
                options: [
                    "By providing a controlled interface between user programs and the operating system",
                    "By using only function calls",
                    "By using only interrupts",
                    "By using only exceptions"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the concept of device drivers in operating systems?",
                options: [
                    "Software that allows the operating system to communicate with hardware devices",
                    "A way to organize files",
                    "A type of database",
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
                question: "What is the concept of transfer learning in machine learning?",
                options: [
                    "Applying knowledge learned from one task to a related task",
                    "A way to study programming",
                    "A type of database",
                    "A programming language"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "Explain the concept of generative adversarial networks (GANs).",
                options: [
                    "A framework where two neural networks compete against each other",
                    "A way to write code quickly",
                    "A type of computer virus",
                    "A programming technique"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the concept of federated learning?",
                options: [
                    "A machine learning approach where models are trained across multiple decentralized devices",
                    "A way to organize files",
                    "A type of database",
                    "A programming language"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "How does a computer implement explainable AI?",
                options: [
                    "By making AI decisions interpretable and understandable to humans",
                    "By using only black box models",
                    "By using only simple algorithms",
                    "By using only basic statistics"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the concept of adversarial attacks in machine learning?",
                options: [
                    "Techniques to fool machine learning models with carefully crafted inputs",
                    "A way to improve models",
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
                question: "What is the concept of amortized analysis in algorithms?",
                options: [
                    "Analyzing the average time complexity over a sequence of operations",
                    "A way to measure file size",
                    "A type of database",
                    "A programming technique"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "Explain the concept of randomized algorithms.",
                options: [
                    "Algorithms that use randomness to achieve good performance on average",
                    "A way to write code quickly",
                    "A type of computer virus",
                    "A programming language"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the concept of online algorithms?",
                options: [
                    "Algorithms that process input data as it arrives without seeing the future",
                    "A way to organize files",
                    "A type of database",
                    "A programming technique"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "How does a computer implement streaming algorithms?",
                options: [
                    "By processing data in a single pass with limited memory",
                    "By using only batch processing",
                    "By using only offline algorithms",
                    "By using only simple algorithms"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the concept of approximation algorithms for NP-hard problems?",
                options: [
                    "Algorithms that provide guaranteed near-optimal solutions for computationally difficult problems",
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

async function addTargetAdvancedQuestions() {
    try {
        console.log('Adding target advanced questions to reach 10-20% range...');
        
        let totalAdded = 0;
        
        for (const gradeData of targetAdvancedQuestions) {
            console.log(`\nAdding target advanced questions for Grade ${gradeData.grade}...`);
            
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
        
        console.log(`\n✅ Successfully added ${totalAdded} target advanced questions to the database!`);
        console.log(`📊 Added ${totalAdded / 5} questions per grade (5 grades)`);
        
    } catch (error) {
        console.error('❌ Error adding target advanced questions:', error);
    }
}

// Run the script
addTargetAdvancedQuestions();
