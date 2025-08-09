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

const remainingMediumQuestions = [
    // Grade 6 Remaining Medium Questions
    {
        grade: 6,
        questions: [
            { question: "What is the difference between analog and digital signals?", options: ["Analog is continuous, digital is discrete", "Digital is continuous, analog is discrete", "Both are continuous", "Both are discrete"], correct: 0, difficulty: "medium" },
            { question: "Which component stores the operating system?", options: ["Hard Drive", "RAM", "CPU", "GPU"], correct: 0, difficulty: "medium" },
            { question: "What is the purpose of a cache?", options: ["Speed up data access", "Store data permanently", "Process data", "Display data"], correct: 0, difficulty: "medium" },
            { question: "Which device converts text to digital signals?", options: ["Scanner", "Printer", "Monitor", "Keyboard"], correct: 0, difficulty: "medium" },
            { question: "What is the function of a modem?", options: ["Convert digital to analog signals", "Store data", "Process data", "Display data"], correct: 0, difficulty: "medium" },
            { question: "Which component manages input/output operations?", options: ["I/O Controller", "CPU", "RAM", "Hard Drive"], correct: 0, difficulty: "medium" },
            { question: "What is the purpose of a bus in a computer?", options: ["Transfer data between components", "Store data", "Process data", "Display data"], correct: 0, difficulty: "medium" },
            { question: "Which device provides backup power?", options: ["UPS", "Power Supply", "Battery", "Generator"], correct: 0, difficulty: "medium" },
            { question: "What is the function of a chipset?", options: ["Control data flow", "Store data", "Process data", "Display data"], correct: 0, difficulty: "medium" },
            { question: "Which component manages system clock?", options: ["Clock Generator", "CPU", "RAM", "Hard Drive"], correct: 0, difficulty: "medium" }
        ]
    },

    // Grade 7 Remaining Medium Questions
    {
        grade: 7,
        questions: [
            { question: "What is the difference between source code and object code?", options: ["Source is readable, object is machine code", "Object is readable, source is machine code", "Both are readable", "Both are machine code"], correct: 0, difficulty: "medium" },
            { question: "Which programming paradigm focuses on functions?", options: ["Functional", "Object-oriented", "Procedural", "Logical"], correct: 0, difficulty: "medium" },
            { question: "What is an IDE?", options: ["Integrated Development Environment", "Internet Development Engine", "Integrated Data Engine", "Internet Data Environment"], correct: 0, difficulty: "medium" },
            { question: "Which data structure uses key-value pairs?", options: ["Dictionary", "Array", "List", "Stack"], correct: 0, difficulty: "medium" },
            { question: "What is a local variable?", options: ["Accessible within function", "Accessible everywhere", "Global variable", "Constant"], correct: 0, difficulty: "medium" },
            { question: "Which loop is infinite?", options: ["While(true)", "For", "Do-while", "If"], correct: 0, difficulty: "medium" },
            { question: "What is a function signature?", options: ["Function declaration", "Function body", "Function call", "Function name"], correct: 0, difficulty: "medium" },
            { question: "Which operator checks equality?", options: ["==", "=", "+", "-"], correct: 0, difficulty: "medium" },
            { question: "What is a static variable?", options: ["Retains value between calls", "Changes value between calls", "Local variable", "Global variable"], correct: 0, difficulty: "medium" },
            { question: "Which data type stores true/false?", options: ["Boolean", "Integer", "String", "Float"], correct: 0, difficulty: "medium" }
        ]
    },

    // Grade 8 Remaining Medium Questions
    {
        grade: 8,
        questions: [
            { question: "What is the difference between packet switching and circuit switching?", options: ["Packet switching is more efficient", "Circuit switching is more efficient", "Both are same", "Both are different"], correct: 0, difficulty: "medium" },
            { question: "Which protocol is used for secure file transfer?", options: ["SFTP", "FTP", "HTTP", "SMTP"], correct: 0, difficulty: "medium" },
            { question: "What is a proxy server?", options: ["Intermediary between client and server", "Web server", "Database server", "File server"], correct: 0, difficulty: "medium" },
            { question: "Which cloud deployment model is private?", options: ["Private Cloud", "Public Cloud", "Hybrid Cloud", "Community Cloud"], correct: 0, difficulty: "medium" },
            { question: "What is load balancing?", options: ["Distribute traffic across servers", "Balance data", "Balance memory", "Balance CPU"], correct: 0, difficulty: "medium" },
            { question: "Which HTML element is inline?", options: ["<span>", "<div>", "<p>", "<h1>"], correct: 0, difficulty: "medium" },
            { question: "What is CSS cascading?", options: ["Rule inheritance", "Rule deletion", "Rule creation", "Rule modification"], correct: 0, difficulty: "medium" },
            { question: "Which algorithm has O(n) complexity?", options: ["Linear Search", "Binary Search", "Bubble Sort", "Quick Sort"], correct: 0, difficulty: "medium" },
            { question: "What is a recursive function?", options: ["Calls itself", "Calls other functions", "No function calls", "Random calls"], correct: 0, difficulty: "medium" },
            { question: "Which data structure is linear?", options: ["Array", "Tree", "Graph", "Network"], correct: 0, difficulty: "medium" }
        ]
    },

    // Grade 9 Remaining Medium Questions
    {
        grade: 9,
        questions: [
            { question: "What is the difference between classification and regression?", options: ["Classification predicts categories, regression predicts values", "Regression predicts categories, classification predicts values", "Both predict categories", "Both predict values"], correct: 0, difficulty: "medium" },
            { question: "Which Python data structure is ordered?", options: ["List", "Set", "Dictionary", "Frozenset"], correct: 0, difficulty: "medium" },
            { question: "What is method overloading?", options: ["Multiple methods with same name", "Single method", "No methods", "Random methods"], correct: 0, difficulty: "medium" },
            { question: "Which networking device operates at Layer 4?", options: ["Load Balancer", "Switch", "Router", "Hub"], correct: 0, difficulty: "medium" },
            { question: "What is asymmetric encryption?", options: ["Different keys for encryption and decryption", "Same keys", "No keys", "Random keys"], correct: 0, difficulty: "medium" },
            { question: "Which database type is document-based?", options: ["MongoDB", "MySQL", "PostgreSQL", "SQLite"], correct: 0, difficulty: "medium" },
            { question: "What is a deadlock in databases?", options: ["Circular wait condition", "Data lock", "Table lock", "Row lock"], correct: 0, difficulty: "medium" },
            { question: "Which attack exploits web vulnerabilities?", options: ["XSS", "DDoS", "Phishing", "SQL Injection"], correct: 0, difficulty: "medium" },
            { question: "What is biometric authentication?", options: ["Uses physical characteristics", "Uses passwords", "Uses tokens", "Uses keys"], correct: 0, difficulty: "medium" },
            { question: "Which protocol is used for secure web browsing?", options: ["HTTPS", "HTTP", "FTP", "SMTP"], correct: 0, difficulty: "medium" }
        ]
    },

    // Grade 11 Remaining Medium Questions
    {
        grade: 11,
        questions: [
            { question: "What is the difference between synchronous and asynchronous programming?", options: ["Synchronous blocks execution, asynchronous doesn't", "Asynchronous blocks execution, synchronous doesn't", "Both block execution", "Neither blocks execution"], correct: 0, difficulty: "medium" },
            { question: "Which CSS property creates grid layout?", options: ["display: grid", "display: flex", "display: block", "display: inline"], correct: 0, difficulty: "medium" },
            { question: "What is event bubbling in JavaScript?", options: ["Events propagate up the DOM tree", "Events propagate down", "Events stop", "Events disappear"], correct: 0, difficulty: "medium" },
            { question: "Which sorting algorithm is adaptive?", options: ["Insertion Sort", "Selection Sort", "Heap Sort", "Merge Sort"], correct: 0, difficulty: "medium" },
            { question: "What is method chaining?", options: ["Calling multiple methods in sequence", "Single method call", "No method calls", "Random calls"], correct: 0, difficulty: "medium" },
            { question: "Which design pattern is creational?", options: ["Factory", "Adapter", "Observer", "Strategy"], correct: 0, difficulty: "medium" },
            { question: "What is inversion of control?", options: ["Dependency management", "Data management", "Memory management", "Process management"], correct: 0, difficulty: "medium" },
            { question: "Which HTTP method updates resources?", options: ["PUT", "GET", "POST", "DELETE"], correct: 0, difficulty: "medium" },
            { question: "What is serverless computing?", options: ["No server management", "Server management", "Client management", "Network management"], correct: 0, difficulty: "medium" },
            { question: "Which protocol is used for real-time communication?", options: ["WebSocket", "HTTP", "FTP", "SMTP"], correct: 0, difficulty: "medium" }
        ]
    }
];

async function addRemainingMediumQuestions() {
    try {
        console.log('Starting to add remaining medium questions...');
        let totalAdded = 0;

        for (const gradeData of remainingMediumQuestions) {
            console.log(`\nAdding remaining medium questions for Grade ${gradeData.grade}...`);
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

            console.log(`✅ Added ${gradeAdded} remaining medium questions for Grade ${gradeData.grade}`);
        }

        console.log(`\n🎉 Successfully added ${totalAdded} remaining medium questions total!`);
        await showFinalStatistics();
        
    } catch (error) {
        console.error('Error adding remaining medium questions:', error);
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
addRemainingMediumQuestions();
