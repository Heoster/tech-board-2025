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

const finalTargetMediumQuestions = [
    // Grade 6 Final Target Medium Questions
    {
        grade: 6,
        questions: [
            { question: "What is the difference between primary and secondary storage?", options: ["Primary is faster, secondary is slower", "Secondary is faster, primary is slower", "Both are same speed", "Both are different"], correct: 0, difficulty: "medium" },
            { question: "Which component manages system interrupts?", options: ["Interrupt Controller", "CPU", "RAM", "Hard Drive"], correct: 0, difficulty: "medium" },
            { question: "What is the purpose of a system registry?", options: ["Store system configuration", "Store user data", "Store programs", "Store files"], correct: 0, difficulty: "medium" },
            { question: "Which device converts digital signals to analog?", options: ["DAC", "ADC", "CPU", "GPU"], correct: 0, difficulty: "medium" },
            { question: "What is the function of a graphics accelerator?", options: ["Speed up graphics processing", "Store graphics", "Process data", "Display data"], correct: 0, difficulty: "medium" },
            { question: "Which component manages system cache?", options: ["Cache Controller", "CPU", "RAM", "Hard Drive"], correct: 0, difficulty: "medium" },
            { question: "What is the purpose of a system monitor?", options: ["Track system performance", "Display data", "Store data", "Process data"], correct: 0, difficulty: "medium" },
            { question: "Which device provides backup power supply?", options: ["UPS", "Power Supply", "Battery", "Generator"], correct: 0, difficulty: "medium" },
            { question: "What is the function of a system timer?", options: ["Manage system timing", "Store time", "Process data", "Display time"], correct: 0, difficulty: "medium" },
            { question: "Which component manages system buses?", options: ["Bus Controller", "CPU", "RAM", "Hard Drive"], correct: 0, difficulty: "medium" }
        ]
    },

    // Grade 7 Final Target Medium Questions
    {
        grade: 7,
        questions: [
            { question: "What is the difference between source code and machine code?", options: ["Source is readable, machine code is binary", "Machine code is readable, source is binary", "Both are readable", "Both are binary"], correct: 0, difficulty: "medium" },
            { question: "Which programming paradigm uses mathematical functions?", options: ["Functional", "Object-oriented", "Procedural", "Logical"], correct: 0, difficulty: "medium" },
            { question: "What is a profiler in programming?", options: ["Analyzes program performance", "Translates code", "Runs programs", "Debugs code"], correct: 0, difficulty: "medium" },
            { question: "Which data structure uses FIFO principle?", options: ["Queue", "Stack", "Array", "List"], correct: 0, difficulty: "medium" },
            { question: "What is an actual parameter?", options: ["Parameter in function call", "Parameter in function definition", "Variable", "Constant"], correct: 0, difficulty: "medium" },
            { question: "Which loop executes a fixed number of times?", options: ["For", "While", "Do-while", "If"], correct: 0, difficulty: "medium" },
            { question: "What is a function definition?", options: ["Function implementation", "Function declaration", "Function call", "Function body"], correct: 0, difficulty: "medium" },
            { question: "Which operator performs logical OR?", options: ["||", "&&", "!", "=="], correct: 0, difficulty: "medium" },
            { question: "What is a function scope?", options: ["Variables accessible within function", "Global variables", "Local variables", "Static variables"], correct: 0, difficulty: "medium" },
            { question: "Which data type stores true/false values?", options: ["Boolean", "Integer", "String", "Float"], correct: 0, difficulty: "medium" }
        ]
    },

    // Grade 8 Final Target Medium Questions
    {
        grade: 8,
        questions: [
            { question: "What is the difference between HTTP and HTTPS protocols?", options: ["HTTPS is secure, HTTP is not", "HTTP is secure, HTTPS is not", "Both are secure", "Both are insecure"], correct: 0, difficulty: "medium" },
            { question: "Which protocol is used for file transfer?", options: ["FTP", "HTTP", "SMTP", "SSH"], correct: 0, difficulty: "medium" },
            { question: "What is a DNS resolver?", options: ["Translates domain names to IP addresses", "Stores web pages", "Processes data", "Sends emails"], correct: 0, difficulty: "medium" },
            { question: "Which cloud service model provides platform?", options: ["PaaS", "SaaS", "IaaS", "DaaS"], correct: 0, difficulty: "medium" },
            { question: "What is virtualization technology?", options: ["Creating virtual resources", "Physical resources", "Network resources", "Storage resources"], correct: 0, difficulty: "medium" },
            { question: "Which HTML element is semantic?", options: ["<article>", "<div>", "<span>", "<p>"], correct: 0, difficulty: "medium" },
            { question: "What is CSS cascading?", options: ["Rule inheritance", "Rule deletion", "Rule creation", "Rule modification"], correct: 0, difficulty: "medium" },
            { question: "Which algorithm uses divide and conquer?", options: ["Merge Sort", "Bubble Sort", "Selection Sort", "Insertion Sort"], correct: 0, difficulty: "medium" },
            { question: "What is recursion in programming?", options: ["Function calling itself", "Loop repetition", "Condition checking", "Data storage"], correct: 0, difficulty: "medium" },
            { question: "Which data structure is hierarchical?", options: ["Tree", "Array", "List", "Queue"], correct: 0, difficulty: "medium" }
        ]
    },

    // Grade 9 Final Target Medium Questions
    {
        grade: 9,
        questions: [
            { question: "What is the difference between supervised and unsupervised learning?", options: ["Supervised uses labeled data", "Unsupervised uses labeled data", "Both use labeled data", "Neither uses labeled data"], correct: 0, difficulty: "medium" },
            { question: "Which Python data type is immutable?", options: ["Tuple", "List", "Dictionary", "Set"], correct: 0, difficulty: "medium" },
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

    // Grade 11 Final Target Medium Questions
    {
        grade: 11,
        questions: [
            { question: "What is the difference between synchronous and asynchronous programming?", options: ["Synchronous blocks execution, asynchronous doesn't", "Asynchronous blocks execution, synchronous doesn't", "Both block execution", "Neither blocks execution"], correct: 0, difficulty: "medium" },
            { question: "Which CSS property creates grid layout?", options: ["display: grid", "display: flex", "display: block", "display: inline"], correct: 0, difficulty: "medium" },
            { question: "What is event bubbling in JavaScript?", options: ["Events propagate up the DOM tree", "Events propagate down", "Events stop", "Events disappear"], correct: 0, difficulty: "medium" },
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

async function addFinalTargetMediumQuestions() {
    try {
        console.log('Starting to add final target medium questions...');
        let totalAdded = 0;

        for (const gradeData of finalTargetMediumQuestions) {
            console.log(`\nAdding final target medium questions for Grade ${gradeData.grade}...`);
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

            console.log(`✅ Added ${gradeAdded} final target medium questions for Grade ${gradeData.grade}`);
        }

        console.log(`\n🎉 Successfully added ${totalAdded} final target medium questions total!`);
        await showFinalStatistics();
        
    } catch (error) {
        console.error('Error adding final target medium questions:', error);
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
addFinalTargetMediumQuestions();
