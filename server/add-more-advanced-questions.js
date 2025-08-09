const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database path
const dbPath = path.join(__dirname, '..', 'database', 'mcq_system.db');

// More advanced questions for each grade
const moreAdvancedQuestions = [
    {
        grade: 6,
        questions: [
            {
                question: "What is the Von Neumann architecture and why is it important?",
                options: [
                    "A computer architecture where data and instructions are stored in the same memory",
                    "A type of computer virus",
                    "A programming language",
                    "A type of database"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "Explain the concept of pipelining in CPU design.",
                options: [
                    "A technique where multiple instructions are processed simultaneously in different stages",
                    "A way to connect computers to the internet",
                    "A method to backup data",
                    "A type of computer memory"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the difference between RISC and CISC architectures?",
                options: [
                    "RISC has simple instructions, CISC has complex instructions",
                    "RISC is faster than CISC",
                    "CISC is newer than RISC",
                    "Both are the same type of architecture"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "How does a computer handle interrupt processing?",
                options: [
                    "By temporarily stopping current execution to handle urgent events",
                    "By ignoring all errors",
                    "By restarting the computer",
                    "By deleting files"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the concept of memory hierarchy in computer systems?",
                options: [
                    "Different levels of memory with varying speed, size, and cost",
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
        grade: 7,
        questions: [
            {
                question: "What is the concept of polymorphism in object-oriented programming?",
                options: [
                    "Ability of different objects to respond to the same method call differently",
                    "A type of computer virus",
                    "A way to backup data",
                    "A programming language"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "Explain the concept of inheritance in programming.",
                options: [
                    "A mechanism where a class can inherit properties and methods from another class",
                    "A way to copy files",
                    "A type of database",
                    "A programming error"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the difference between pass by value and pass by reference?",
                options: [
                    "Pass by value copies the data, pass by reference passes the memory address",
                    "Both copy the data",
                    "Both pass memory addresses",
                    "There is no difference"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "How does a computer implement exception handling?",
                options: [
                    "By using try-catch blocks to handle runtime errors gracefully",
                    "By ignoring all errors",
                    "By restarting the program",
                    "By deleting the error"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the concept of garbage collection in programming?",
                options: [
                    "Automatic memory management that reclaims unused memory",
                    "A way to delete files",
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
                question: "What is the concept of deadlock in operating systems?",
                options: [
                    "A situation where two or more processes are waiting for each other to release resources",
                    "A type of computer virus",
                    "A way to backup data",
                    "A programming error"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "Explain the concept of process scheduling in operating systems.",
                options: [
                    "The mechanism by which the CPU decides which process to execute next",
                    "A way to organize files",
                    "A type of database",
                    "A programming technique"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the difference between a process and a thread?",
                options: [
                    "Process is independent, thread shares resources within a process",
                    "Both are independent",
                    "Both share resources",
                    "There is no difference"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "How does a computer implement memory protection?",
                options: [
                    "By using hardware and software mechanisms to prevent unauthorized access",
                    "By using passwords only",
                    "By using firewalls only",
                    "By using antivirus only"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the concept of virtual memory paging?",
                options: [
                    "A technique where memory is divided into fixed-size blocks called pages",
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
                question: "What is the concept of neural networks in artificial intelligence?",
                options: [
                    "Computing systems inspired by biological neural networks",
                    "A type of computer virus",
                    "A way to backup data",
                    "A programming language"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "Explain the concept of deep learning.",
                options: [
                    "A subset of machine learning using neural networks with multiple layers",
                    "A way to study programming",
                    "A type of database",
                    "A programming technique"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the concept of blockchain technology?",
                options: [
                    "A distributed ledger technology that maintains a continuously growing list of records",
                    "A type of computer virus",
                    "A way to backup data",
                    "A programming language"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "How does a computer implement distributed systems?",
                options: [
                    "By coordinating multiple computers to work together as a single system",
                    "By using only one computer",
                    "By using only the internet",
                    "By using only databases"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the concept of microservices architecture?",
                options: [
                    "An architectural style where an application is built as a collection of small services",
                    "A type of computer virus",
                    "A way to backup data",
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
                question: "What is the concept of graph algorithms in computer science?",
                options: [
                    "Algorithms designed to solve problems involving graphs and networks",
                    "A way to draw pictures",
                    "A type of database",
                    "A programming language"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "Explain the concept of dynamic programming optimization.",
                options: [
                    "A method to solve optimization problems by breaking them into subproblems",
                    "A way to write code quickly",
                    "A type of computer virus",
                    "A programming technique"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the concept of parallel computing?",
                options: [
                    "Computing where multiple processors work simultaneously on a problem",
                    "A way to use one computer",
                    "A type of database",
                    "A programming language"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "How does a computer implement load balancing?",
                options: [
                    "By distributing workload across multiple computing resources",
                    "By using only one server",
                    "By using only one database",
                    "By using only one network"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the concept of software architecture patterns?",
                options: [
                    "Reusable solutions to common software architecture problems",
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

async function addMoreAdvancedQuestions() {
    try {
        console.log('Adding more advanced questions to the database...');
        
        let totalAdded = 0;
        
        for (const gradeData of moreAdvancedQuestions) {
            console.log(`\nAdding more advanced questions for Grade ${gradeData.grade}...`);
            
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
        
        console.log(`\n✅ Successfully added ${totalAdded} more advanced questions to the database!`);
        console.log(`📊 Added ${totalAdded / 5} questions per grade (5 grades)`);
        
    } catch (error) {
        console.error('❌ Error adding more advanced questions:', error);
    }
}

// Run the script
addMoreAdvancedQuestions();
