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

const final40PercentMediumQuestions = [
    // Grade 6 Final 40% Medium Questions
    {
        grade: 6,
        questions: [
            { question: "What is the difference between volatile and non-volatile memory?", options: ["Volatile loses data when powered off", "Non-volatile loses data when powered off", "Both lose data", "Neither loses data"], correct: 0, difficulty: "medium" },
            { question: "Which component manages system resources?", options: ["Operating System", "CPU", "RAM", "Hard Drive"], correct: 0, difficulty: "medium" },
            { question: "What is the purpose of a registry in Windows?", options: ["Store system settings", "Store user data", "Store programs", "Store files"], correct: 0, difficulty: "medium" },
            { question: "Which device converts digital images to text?", options: ["OCR Scanner", "Printer", "Camera", "Monitor"], correct: 0, difficulty: "medium" },
            { question: "What is the function of a sound card?", options: ["Process audio signals", "Process video signals", "Process data", "Store data"], correct: 0, difficulty: "medium" },
            { question: "Which component manages system timing?", options: ["System Clock", "CPU", "RAM", "Hard Drive"], correct: 0, difficulty: "medium" },
            { question: "What is the purpose of a cache memory?", options: ["Speed up data access", "Store data permanently", "Process data", "Display data"], correct: 0, difficulty: "medium" },
            { question: "Which device provides wireless connectivity?", options: ["Wi-Fi Card", "Ethernet Card", "Sound Card", "Graphics Card"], correct: 0, difficulty: "medium" },
            { question: "What is the function of a power supply?", options: ["Convert AC to DC", "Convert DC to AC", "Store power", "Generate power"], correct: 0, difficulty: "medium" },
            { question: "Which component manages data transfer between devices?", options: ["I/O Controller", "CPU", "RAM", "Hard Drive"], correct: 0, difficulty: "medium" }
        ]
    },

    // Grade 7 Final 40% Medium Questions
    {
        grade: 7,
        questions: [
            { question: "What is the difference between interpreted and compiled languages?", options: ["Interpreted runs line by line, compiled runs all at once", "Compiled runs line by line, interpreted runs all at once", "Both run line by line", "Both run all at once"], correct: 0, difficulty: "medium" },
            { question: "Which programming paradigm uses mathematical functions?", options: ["Functional", "Object-oriented", "Procedural", "Logical"], correct: 0, difficulty: "medium" },
            { question: "What is a debugger?", options: ["Tool to find and fix errors", "Programming language", "Computer program", "Operating system"], correct: 0, difficulty: "medium" },
            { question: "Which data structure allows random access?", options: ["Array", "Linked List", "Stack", "Queue"], correct: 0, difficulty: "medium" },
            { question: "What is a parameter in programming?", options: ["Input to function", "Output of function", "Function name", "Function type"], correct: 0, difficulty: "medium" },
            { question: "Which loop executes at least once?", options: ["Do-while", "While", "For", "If"], correct: 0, difficulty: "medium" },
            { question: "What is a return statement?", options: ["Sends value back from function", "Starts function", "Ends program", "Creates variable"], correct: 0, difficulty: "medium" },
            { question: "Which operator assigns a value?", options: ["=", "==", "+", "-"], correct: 0, difficulty: "medium" },
            { question: "What is scope in programming?", options: ["Variable accessibility", "Variable name", "Variable type", "Variable value"], correct: 0, difficulty: "medium" },
            { question: "Which data type stores whole numbers?", options: ["Integer", "Float", "String", "Boolean"], correct: 0, difficulty: "medium" }
        ]
    },

    // Grade 8 Final 40% Medium Questions
    {
        grade: 8,
        questions: [
            { question: "What is the difference between HTTP and HTTPS?", options: ["HTTPS is secure, HTTP is not", "HTTP is secure, HTTPS is not", "Both are secure", "Both are insecure"], correct: 0, difficulty: "medium" },
            { question: "Which protocol is used for email transfer?", options: ["SMTP", "HTTP", "FTP", "SSH"], correct: 0, difficulty: "medium" },
            { question: "What is a DNS server?", options: ["Translates domain names to IP addresses", "Stores web pages", "Processes data", "Sends emails"], correct: 0, difficulty: "medium" },
            { question: "Which cloud service model provides software?", options: ["SaaS", "PaaS", "IaaS", "DaaS"], correct: 0, difficulty: "medium" },
            { question: "What is virtualization technology?", options: ["Creating virtual resources", "Physical resources", "Network resources", "Storage resources"], correct: 0, difficulty: "medium" },
            { question: "Which HTML element is semantic?", options: ["<article>", "<div>", "<span>", "<p>"], correct: 0, difficulty: "medium" },
            { question: "What is CSS inheritance?", options: ["Child elements inherit parent styles", "Parent inherits child styles", "No inheritance", "Random inheritance"], correct: 0, difficulty: "medium" },
            { question: "Which algorithm uses divide and conquer?", options: ["Merge Sort", "Bubble Sort", "Selection Sort", "Insertion Sort"], correct: 0, difficulty: "medium" },
            { question: "What is recursion in programming?", options: ["Function calling itself", "Loop repetition", "Condition checking", "Data storage"], correct: 0, difficulty: "medium" },
            { question: "Which data structure is hierarchical?", options: ["Tree", "Array", "List", "Queue"], correct: 0, difficulty: "medium" }
        ]
    },

    // Grade 9 Final 40% Medium Questions
    {
        grade: 9,
        questions: [
            { question: "What is the difference between supervised and unsupervised learning?", options: ["Supervised uses labeled data", "Unsupervised uses labeled data", "Both use labeled data", "Neither uses labeled data"], correct: 0, difficulty: "medium" },
            { question: "Which Python data type is mutable?", options: ["List", "Tuple", "String", "Integer"], correct: 0, difficulty: "medium" },
            { question: "What is inheritance in object-oriented programming?", options: ["Reusing code from parent class", "Creating new class", "Deleting class", "Modifying class"], correct: 0, difficulty: "medium" },
            { question: "Which networking device operates at Layer 2?", options: ["Switch", "Router", "Hub", "Gateway"], correct: 0, difficulty: "medium" },
            { question: "What is encryption in cybersecurity?", options: ["Converting data to secure format", "Data compression", "Data backup", "Data deletion"], correct: 0, difficulty: "medium" },
            { question: "Which database model is relational?", options: ["SQL", "NoSQL", "Graph", "Document"], correct: 0, difficulty: "medium" },
            { question: "What is normalization in databases?", options: ["Organizing data efficiently", "Making data bigger", "Making data smaller", "Deleting data"], correct: 0, difficulty: "medium" },
            { question: "Which cyber attack uses social engineering?", options: ["Phishing", "DDoS", "SQL Injection", "XSS"], correct: 0, difficulty: "medium" },
            { question: "What is a firewall in network security?", options: ["Network traffic control", "Data storage", "Data processing", "Data display"], correct: 0, difficulty: "medium" },
            { question: "Which protocol is connectionless?", options: ["UDP", "TCP", "HTTP", "FTP"], correct: 0, difficulty: "medium" }
        ]
    },

    // Grade 11 Final 40% Medium Questions
    {
        grade: 11,
        questions: [
            { question: "What is the difference between callbacks and promises?", options: ["Promises are more modern", "Callbacks are more modern", "Both are same", "Both are different"], correct: 0, difficulty: "medium" },
            { question: "Which CSS property creates animations?", options: ["@keyframes", "@media", "@import", "@font-face"], correct: 0, difficulty: "medium" },
            { question: "What is a closure in JavaScript?", options: ["Function with access to outer scope", "Function without scope", "Variable", "Object"], correct: 0, difficulty: "medium" },
            { question: "Which sorting algorithm is stable?", options: ["Merge Sort", "Quick Sort", "Heap Sort", "Selection Sort"], correct: 0, difficulty: "medium" },
            { question: "What is polymorphism in OOP?", options: ["Multiple forms", "Single form", "No form", "Random form"], correct: 0, difficulty: "medium" },
            { question: "Which design pattern is creational?", options: ["Singleton", "Observer", "Strategy", "Command"], correct: 0, difficulty: "medium" },
            { question: "What is dependency injection?", options: ["Providing dependencies externally", "Creating dependencies", "Deleting dependencies", "Ignoring dependencies"], correct: 0, difficulty: "medium" },
            { question: "Which HTTP status code is for success?", options: ["200", "404", "500", "300"], correct: 0, difficulty: "medium" },
            { question: "What is a microservice architecture?", options: ["Small independent services", "Large service", "Database service", "Network service"], correct: 0, difficulty: "medium" },
            { question: "Which protocol is stateless?", options: ["HTTP", "FTP", "SMTP", "POP3"], correct: 0, difficulty: "medium" }
        ]
    }
];

async function addFinal40PercentMediumQuestions() {
    try {
        console.log('Starting to add final 40% medium questions...');
        let totalAdded = 0;

        for (const gradeData of final40PercentMediumQuestions) {
            console.log(`\nAdding final 40% medium questions for Grade ${gradeData.grade}...`);
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

            console.log(`✅ Added ${gradeAdded} final 40% medium questions for Grade ${gradeData.grade}`);
        }

        console.log(`\n🎉 Successfully added ${totalAdded} final 40% medium questions total!`);
        await showFinalStatistics();
        
    } catch (error) {
        console.error('Error adding final 40% medium questions:', error);
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
addFinal40PercentMediumQuestions();
