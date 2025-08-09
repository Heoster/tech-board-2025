const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'database', 'mcq_system.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

const moreMediumQuestions = [
    // Grade 6 Additional Medium Questions
    {
        grade: 6,
        questions: [
            { question: "What is the difference between input and output devices?", options: ["Input receives data, output displays data", "Input displays data, output receives data", "Both receive data", "Both display data"], correct: 0, difficulty: "medium" },
            { question: "Which component controls all other hardware?", options: ["CPU", "RAM", "Hard Drive", "Power Supply"], correct: 0, difficulty: "medium" },
            { question: "What is the purpose of a motherboard?", options: ["Connects all components", "Stores data", "Processes data", "Displays data"], correct: 0, difficulty: "medium" },
            { question: "Which storage type is non-volatile?", options: ["Hard Drive", "RAM", "Cache", "Virtual Memory"], correct: 0, difficulty: "medium" },
            { question: "What is the function of an operating system?", options: ["Manage computer resources", "Play games", "Browse internet", "Type documents"], correct: 0, difficulty: "medium" },
            { question: "Which device converts analog to digital signals?", options: ["ADC", "DAC", "CPU", "GPU"], correct: 0, difficulty: "medium" },
            { question: "What is a driver in computing?", options: ["Software that controls hardware", "Hardware component", "Computer program", "Operating system"], correct: 0, difficulty: "medium" },
            { question: "Which component is responsible for graphics?", options: ["GPU", "CPU", "RAM", "Hard Drive"], correct: 0, difficulty: "medium" },
            { question: "What is the purpose of a cooling system?", options: ["Prevent overheating", "Store data", "Process data", "Display data"], correct: 0, difficulty: "medium" },
            { question: "Which device connects to the internet?", options: ["Modem", "Monitor", "Keyboard", "Mouse"], correct: 0, difficulty: "medium" }
        ]
    },

    // Grade 7 Additional Medium Questions
    {
        grade: 7,
        questions: [
            { question: "What is the difference between high-level and low-level languages?", options: ["High-level is easier to read", "Low-level is easier to read", "Both are same", "Both are different"], correct: 0, difficulty: "medium" },
            { question: "Which programming paradigm uses objects?", options: ["Object-oriented", "Procedural", "Functional", "Logical"], correct: 0, difficulty: "medium" },
            { question: "What is an interpreter?", options: ["Translates code line by line", "Translates entire program", "Computer program", "Programming language"], correct: 0, difficulty: "medium" },
            { question: "Which data structure uses FIFO?", options: ["Queue", "Stack", "Array", "List"], correct: 0, difficulty: "medium" },
            { question: "What is a constant in programming?", options: ["Fixed value", "Changing value", "Variable", "Function"], correct: 0, difficulty: "medium" },
            { question: "Which loop checks condition first?", options: ["While", "Do-while", "For", "If"], correct: 0, difficulty: "medium" },
            { question: "What is a function return value?", options: ["Output of function", "Input to function", "Function name", "Function type"], correct: 0, difficulty: "medium" },
            { question: "Which operator compares values?", options: ["==", "=", "+", "-"], correct: 0, difficulty: "medium" },
            { question: "What is scope in programming?", options: ["Variable accessibility", "Variable name", "Variable type", "Variable value"], correct: 0, difficulty: "medium" },
            { question: "Which data type stores text?", options: ["String", "Integer", "Float", "Boolean"], correct: 0, difficulty: "medium" }
        ]
    },

    // Grade 8 Additional Medium Questions
    {
        grade: 8,
        questions: [
            { question: "What is the difference between TCP and UDP?", options: ["TCP is reliable, UDP is not", "UDP is reliable, TCP is not", "Both are reliable", "Both are unreliable"], correct: 0, difficulty: "medium" },
            { question: "Which protocol is used for secure web browsing?", options: ["HTTPS", "HTTP", "FTP", "SMTP"], correct: 0, difficulty: "medium" },
            { question: "What is a subnet mask?", options: ["Divides network into subnets", "Network address", "IP address", "MAC address"], correct: 0, difficulty: "medium" },
            { question: "Which cloud service model provides software?", options: ["SaaS", "PaaS", "IaaS", "DaaS"], correct: 0, difficulty: "medium" },
            { question: "What is a virtual machine?", options: ["Software that emulates hardware", "Physical computer", "Operating system", "Application"], correct: 0, difficulty: "medium" },
            { question: "Which HTML attribute provides accessibility?", options: ["alt", "src", "href", "class"], correct: 0, difficulty: "medium" },
            { question: "What is CSS inheritance?", options: ["Child elements inherit parent styles", "Parent inherits child styles", "No inheritance", "Random inheritance"], correct: 0, difficulty: "medium" },
            { question: "Which algorithm has O(n²) complexity?", options: ["Bubble Sort", "Merge Sort", "Quick Sort", "Heap Sort"], correct: 0, difficulty: "medium" },
            { question: "What is a base case in recursion?", options: ["Stopping condition", "Starting condition", "Middle condition", "Random condition"], correct: 0, difficulty: "medium" },
            { question: "Which data structure allows random access?", options: ["Array", "Linked List", "Stack", "Queue"], correct: 0, difficulty: "medium" }
        ]
    },

    // Grade 9 Additional Medium Questions
    {
        grade: 9,
        questions: [
            { question: "What is the difference between supervised and unsupervised learning?", options: ["Supervised uses labeled data", "Unsupervised uses labeled data", "Both use labeled data", "Neither uses labeled data"], correct: 0, difficulty: "medium" },
            { question: "Which Python data type is immutable?", options: ["Tuple", "List", "Dictionary", "Set"], correct: 0, difficulty: "medium" },
            { question: "What is inheritance in OOP?", options: ["Reusing code from parent class", "Creating new class", "Deleting class", "Modifying class"], correct: 0, difficulty: "medium" },
            { question: "Which networking device operates at Layer 3?", options: ["Router", "Switch", "Hub", "Bridge"], correct: 0, difficulty: "medium" },
            { question: "What is hashing?", options: ["Converting data to fixed size", "Compressing data", "Encrypting data", "Deleting data"], correct: 0, difficulty: "medium" },
            { question: "Which database type is NoSQL?", options: ["MongoDB", "MySQL", "PostgreSQL", "SQLite"], correct: 0, difficulty: "medium" },
            { question: "What is ACID in databases?", options: ["Transaction properties", "Database type", "Query language", "Storage method"], correct: 0, difficulty: "medium" },
            { question: "Which attack exploits SQL vulnerabilities?", options: ["SQL Injection", "DDoS", "Phishing", "XSS"], correct: 0, difficulty: "medium" },
            { question: "What is a VPN?", options: ["Secure network connection", "Virtual computer", "Network device", "Security software"], correct: 0, difficulty: "medium" },
            { question: "Which protocol is connection-oriented?", options: ["TCP", "UDP", "HTTP", "FTP"], correct: 0, difficulty: "medium" }
        ]
    },

    // Grade 11 Additional Medium Questions
    {
        grade: 11,
        questions: [
            { question: "What is the difference between synchronous and asynchronous?", options: ["Synchronous blocks, asynchronous doesn't", "Asynchronous blocks, synchronous doesn't", "Both block", "Neither blocks"], correct: 0, difficulty: "medium" },
            { question: "Which CSS property controls layout?", options: ["display", "color", "font", "margin"], correct: 0, difficulty: "medium" },
            { question: "What is a promise in JavaScript?", options: ["Handles asynchronous operations", "Synchronous operation", "Variable", "Function"], correct: 0, difficulty: "medium" },
            { question: "Which sorting algorithm is in-place?", options: ["Quick Sort", "Merge Sort", "Heap Sort", "Bubble Sort"], correct: 0, difficulty: "medium" },
            { question: "What is encapsulation?", options: ["Data hiding", "Data sharing", "Data deletion", "Data creation"], correct: 0, difficulty: "medium" },
            { question: "Which design pattern is behavioral?", options: ["Observer", "Singleton", "Factory", "Builder"], correct: 0, difficulty: "medium" },
            { question: "What is inversion of control?", options: ["Dependency management", "Data management", "Memory management", "Process management"], correct: 0, difficulty: "medium" },
            { question: "Which HTTP method is idempotent?", options: ["GET", "POST", "PUT", "DELETE"], correct: 0, difficulty: "medium" },
            { question: "What is a container in software?", options: ["Isolated environment", "Virtual machine", "Operating system", "Application"], correct: 0, difficulty: "medium" },
            { question: "Which protocol is stateful?", options: ["FTP", "HTTP", "SMTP", "POP3"], correct: 0, difficulty: "medium" }
        ]
    }
];

async function addMoreMediumQuestions() {
    try {
        console.log('Starting to add more medium questions...');
        let totalAdded = 0;

        for (const gradeData of moreMediumQuestions) {
            console.log(`\nAdding more medium questions for Grade ${gradeData.grade}...`);
            let gradeAdded = 0;

            for (const questionData of gradeData.questions) {
                try {
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
                    
                    gradeAdded++;
                    totalAdded++;
                } catch (error) {
                    console.error(`Error adding question "${questionData.question}":`, error.message);
                }
            }

            console.log(`✅ Added ${gradeAdded} more medium questions for Grade ${gradeData.grade}`);
        }

        console.log(`\n🎉 Successfully added ${totalAdded} more medium questions total!`);
        await showFinalStatistics();
        
    } catch (error) {
        console.error('Error adding more medium questions:', error);
    } finally {
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('Database connection closed.');
            }
        });
    }
}

async function showFinalStatistics() {
    try {
        console.log('\n📊 Final Database Statistics:');
        
        const totalQuestions = await queryDatabase("SELECT COUNT(*) as count FROM questions");
        console.log(`Total Questions: ${totalQuestions[0].count}`);
        
        const difficultyDistribution = await queryDatabase(`
            SELECT difficulty, COUNT(*) as count, 
                   ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM questions), 2) as percentage
            FROM questions 
            GROUP BY difficulty 
            ORDER BY difficulty
        `);
        
        console.log('\nDifficulty Distribution:');
        difficultyDistribution.forEach(row => {
            console.log(`   ${row.difficulty.toUpperCase()}: ${row.count} questions (${row.percentage}%)`);
        });
        
        const gradeDistribution = await queryDatabase(`
            SELECT grade, COUNT(*) as count 
            FROM questions 
            GROUP BY grade 
            ORDER BY grade
        `);
        
        console.log('\nGrade Distribution:');
        gradeDistribution.forEach(row => {
            console.log(`   Grade ${row.grade}: ${row.count} questions`);
        });
        
        // Calculate target percentages
        const total = totalQuestions[0].count;
        const mediumCount = difficultyDistribution.find(row => row.difficulty === 'medium')?.count || 0;
        const mediumPercentage = (mediumCount / total * 100).toFixed(1);
        
        console.log(`\n🎯 Medium Questions: ${mediumCount} (${mediumPercentage}%)`);
        console.log(`   Target: 40% (approximately ${Math.round(total * 0.4)} questions)`);
        
        if (mediumPercentage >= 35 && mediumPercentage <= 45) {
            console.log('   ✅ Target achieved!');
        } else if (mediumPercentage < 35) {
            console.log('   ⚠️  Need more medium questions');
        } else {
            console.log('   ⚠️  Too many medium questions');
        }
        
    } catch (error) {
        console.error('Error showing statistics:', error);
    }
}

function queryDatabase(sql, params = []) {
    return new Promise((resolve, reject) => {
        if (sql.trim().toUpperCase().startsWith('INSERT') ||
            sql.trim().toUpperCase().startsWith('UPDATE') ||
            sql.trim().toUpperCase().startsWith('DELETE') ||
            sql.trim().toUpperCase().startsWith('BEGIN') ||
            sql.trim().toUpperCase().startsWith('COMMIT') ||
            sql.trim().toUpperCase().startsWith('ROLLBACK')) {
            // For write operations
            db.run(sql, params, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes, lastID: this.lastID });
                }
            });
        } else {
            // For read operations
            db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        }
    });
}

// Run the script
addMoreMediumQuestions();
