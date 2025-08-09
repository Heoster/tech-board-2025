const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database path
const dbPath = path.join(__dirname, '..', 'database', 'mcq_system.db');

// Advanced questions for each grade
const advancedQuestions = [
    {
        grade: 6,
        questions: [
            {
                question: "What is the difference between RAM and ROM in terms of data persistence?",
                options: [
                    "RAM is volatile, ROM is non-volatile",
                    "RAM is non-volatile, ROM is volatile", 
                    "Both are volatile",
                    "Both are non-volatile"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "Explain the concept of binary number system in computer science.",
                options: [
                    "A system using only 0s and 1s to represent data",
                    "A system using decimal numbers",
                    "A system using hexadecimal numbers",
                    "A system using octal numbers"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the purpose of a CPU cache in computer architecture?",
                options: [
                    "To store frequently accessed data for faster retrieval",
                    "To store permanent data",
                    "To store backup files",
                    "To store user documents"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "How does a computer convert analog signals to digital signals?",
                options: [
                    "Through analog-to-digital conversion (ADC)",
                    "Through digital-to-analog conversion (DAC)",
                    "Through binary encoding",
                    "Through hexadecimal encoding"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the role of an operating system in managing computer resources?",
                options: [
                    "To allocate and manage CPU, memory, and I/O devices",
                    "To only manage files",
                    "To only manage user accounts",
                    "To only manage network connections"
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
                question: "Explain the concept of algorithm complexity and Big O notation.",
                options: [
                    "A way to measure algorithm efficiency and performance",
                    "A way to measure file size",
                    "A way to measure memory usage only",
                    "A way to measure network speed"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the difference between a compiler and an interpreter?",
                options: [
                    "Compiler translates entire program at once, interpreter translates line by line",
                    "Both translate entire programs at once",
                    "Both translate line by line",
                    "Compiler is faster than interpreter"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "How does a computer handle floating-point arithmetic?",
                options: [
                    "Using IEEE 754 standard for precision and accuracy",
                    "Using simple decimal arithmetic",
                    "Using integer arithmetic only",
                    "Using binary arithmetic only"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the concept of recursion in programming?",
                options: [
                    "A function calling itself to solve a problem",
                    "A loop that repeats infinitely",
                    "A function that never ends",
                    "A function that only runs once"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "Explain the concept of data structures and their importance.",
                options: [
                    "Organized ways to store and access data efficiently",
                    "Ways to delete data",
                    "Ways to backup data",
                    "Ways to compress data"
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
                question: "What is the difference between TCP and UDP protocols?",
                options: [
                    "TCP is connection-oriented and reliable, UDP is connectionless and unreliable",
                    "Both are connection-oriented",
                    "Both are connectionless",
                    "TCP is faster than UDP"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "How does a computer perform virtual memory management?",
                options: [
                    "By using hard disk space as an extension of RAM",
                    "By using only RAM",
                    "By using only cache",
                    "By using only ROM"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the concept of object-oriented programming (OOP)?",
                options: [
                    "Programming paradigm based on objects containing data and code",
                    "Programming based on functions only",
                    "Programming based on variables only",
                    "Programming based on loops only"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "Explain the concept of database normalization.",
                options: [
                    "Process of organizing data to reduce redundancy and improve integrity",
                    "Process of backing up data",
                    "Process of deleting data",
                    "Process of copying data"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the role of a firewall in network security?",
                options: [
                    "To monitor and control incoming and outgoing network traffic",
                    "To only block viruses",
                    "To only allow emails",
                    "To only protect passwords"
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
                question: "What is machine learning and how does it differ from traditional programming?",
                options: [
                    "ML learns patterns from data, traditional programming uses explicit rules",
                    "Both use explicit rules",
                    "Both learn from data",
                    "ML is faster than traditional programming"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "Explain the concept of API (Application Programming Interface).",
                options: [
                    "A set of rules that allows different software applications to communicate",
                    "A type of computer virus",
                    "A type of database",
                    "A type of operating system"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the difference between synchronous and asynchronous programming?",
                options: [
                    "Synchronous executes sequentially, asynchronous can execute concurrently",
                    "Both execute sequentially",
                    "Both execute concurrently",
                    "Synchronous is always faster"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "How does a computer handle encryption and decryption?",
                options: [
                    "Using mathematical algorithms to secure data transmission",
                    "Using simple text encoding",
                    "Using file compression",
                    "Using data backup"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the concept of version control in software development?",
                options: [
                    "System to track changes in source code over time",
                    "System to backup files",
                    "System to delete files",
                    "System to compress files"
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
                question: "What is the difference between a stack and a queue data structure?",
                options: [
                    "Stack is LIFO, Queue is FIFO",
                    "Both are LIFO",
                    "Both are FIFO",
                    "Stack is faster than Queue"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "Explain the concept of dynamic programming.",
                options: [
                    "Method to solve complex problems by breaking them into simpler subproblems",
                    "Method to write code quickly",
                    "Method to debug code",
                    "Method to test code"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the role of a hash function in data structures?",
                options: [
                    "To map data of arbitrary size to fixed-size values",
                    "To encrypt data",
                    "To compress data",
                    "To backup data"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "How does a computer implement multithreading?",
                options: [
                    "By allowing multiple threads to execute concurrently within a process",
                    "By running multiple processes",
                    "By using multiple CPUs only",
                    "By using multiple memory modules"
                ],
                correct: 0,
                difficulty: "advanced"
            },
            {
                question: "What is the concept of design patterns in software engineering?",
                options: [
                    "Reusable solutions to common software design problems",
                    "Ways to write code quickly",
                    "Ways to debug code",
                    "Ways to test code"
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

async function addAdvancedQuestions() {
    try {
        console.log('Adding advanced questions to the database...');
        
        let totalAdded = 0;
        
        for (const gradeData of advancedQuestions) {
            console.log(`\nAdding advanced questions for Grade ${gradeData.grade}...`);
            
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
        
        console.log(`\n✅ Successfully added ${totalAdded} advanced questions to the database!`);
        console.log(`📊 Added ${totalAdded / 5} questions per grade (5 grades)`);
        
    } catch (error) {
        console.error('❌ Error adding advanced questions:', error);
    }
}

// Run the script
addAdvancedQuestions();
