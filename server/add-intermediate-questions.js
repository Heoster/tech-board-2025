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

const mediumQuestions = [
    // Grade 6 medium Questions
    {
        grade: 6,
        questions: [
                         { question: "What is the difference between hardware and software?", options: ["Hardware is physical, software is programs", "Hardware is programs, software is physical", "Both are physical", "Both are programs"], correct: 0, difficulty: "medium" },
            { question: "Which component processes data in a computer?", options: ["CPU", "Monitor", "Keyboard", "Mouse"], correct: 0, difficulty: "medium" },
            { question: "What is the purpose of an operating system?", options: ["Manage computer resources", "Play games", "Browse internet", "Type documents"], correct: 0, difficulty: "medium" },
            { question: "Which storage device is fastest?", options: ["SSD", "Hard Drive", "CD-ROM", "USB Drive"], correct: 0, difficulty: "medium" },
            { question: "What is a file extension?", options: ["Identifies file type", "File size", "File name", "File location"], correct: 0, difficulty: "medium" },
            { question: "Which is an example of system software?", options: ["Windows", "Microsoft Word", "Chrome", "Photoshop"], correct: 0, difficulty: "medium" },
            { question: "What is a peripheral device?", options: ["External device connected to computer", "Internal computer part", "Computer program", "Operating system"], correct: 0, difficulty: "medium" },
            { question: "Which device converts digital to analog signals?", options: ["Modem", "Router", "Switch", "Hub"], correct: 0, difficulty: "medium" },
            { question: "What is the function of a firewall?", options: ["Network security", "Data storage", "Data processing", "Data display"], correct: 0, difficulty: "medium" },
            { question: "Which is a volatile storage device?", options: ["RAM", "Hard Drive", "SSD", "USB Drive"], correct: 0, difficulty: "medium" }
        ]
    },

    // Grade 7 medium Questions
    {
        grade: 7,
        questions: [
            { question: "What is the difference between RAM and ROM?", options: ["RAM is temporary, ROM is permanent", "RAM is permanent, ROM is temporary", "Both are temporary", "Both are permanent"], correct: 0, difficulty: "medium" },
            { question: "Which programming language is object-oriented?", options: ["Java", "Assembly", "Machine code", "Binary"], correct: 0, difficulty: "medium" },
            { question: "What is a compiler?", options: ["Translates high-level to machine code", "Computer program", "Programming language", "Operating system"], correct: 0, difficulty: "medium" },
            { question: "Which is a high-level programming language?", options: ["Python", "Assembly", "Machine code", "Binary"], correct: 0, difficulty: "medium" },
            { question: "What is debugging?", options: ["Finding and fixing errors", "Writing code", "Running programs", "Installing software"], correct: 0, difficulty: "medium" },
            { question: "Which data structure uses LIFO?", options: ["Stack", "Queue", "Array", "List"], correct: 0, difficulty: "medium" },
            { question: "What is a variable in programming?", options: ["Storage for data", "Type of data", "Name of data", "Size of data"], correct: 0, difficulty: "medium" },
            { question: "Which loop runs at least once?", options: ["Do-while", "While", "For", "If"], correct: 0, difficulty: "medium" },
            { question: "What is a function parameter?", options: ["Input to function", "Output of function", "Function name", "Function type"], correct: 0, difficulty: "medium" },
            { question: "Which is a logical operator?", options: ["AND", "PLUS", "MINUS", "MULTIPLY"], correct: 0, difficulty: "medium" }
        ]
    },

    // Grade 8 medium Questions
    {
        grade: 8,
        questions: [
            { question: "What is the difference between LAN and WAN?", options: ["LAN is local, WAN is wide area", "LAN is wide area, WAN is local", "Both are local", "Both are wide area"], correct: 0, difficulty: "medium" },
            { question: "Which protocol is used for web browsing?", options: ["HTTP", "FTP", "SMTP", "POP3"], correct: 0, difficulty: "medium" },
            { question: "What is DNS?", options: ["Domain Name System", "Data Network System", "Digital Network Service", "Domain Network Service"], correct: 0, difficulty: "medium" },
            { question: "Which cloud service model provides platform?", options: ["PaaS", "SaaS", "IaaS", "DaaS"], correct: 0, difficulty: "medium" },
            { question: "What is virtualization?", options: ["Creating virtual resources", "Physical resources", "Network resources", "Storage resources"], correct: 0, difficulty: "medium" },
            { question: "Which HTML tag is semantic?", options: ["<article>", "<div>", "<span>", "<p>"], correct: 0, difficulty: "medium" },
            { question: "What is CSS specificity?", options: ["Rule priority", "Rule order", "Rule name", "Rule type"], correct: 0, difficulty: "medium" },
            { question: "Which algorithm uses divide and conquer?", options: ["Merge Sort", "Bubble Sort", "Selection Sort", "Insertion Sort"], correct: 0, difficulty: "medium" },
            { question: "What is recursion?", options: ["Function calling itself", "Loop repetition", "Condition checking", "Data storage"], correct: 0, difficulty: "medium" },
            { question: "Which data structure is hierarchical?", options: ["Tree", "Array", "List", "Queue"], correct: 0, difficulty: "medium" }
        ]
    },

    // Grade 9 medium Questions
    {
        grade: 9,
        questions: [
            { question: "What is the difference between AI and ML?", options: ["AI is broader, ML is subset", "ML is broader, AI is subset", "Both are same", "Both are different"], correct: 0, difficulty: "medium" },
            { question: "Which Python data type is mutable?", options: ["List", "Tuple", "String", "Integer"], correct: 0, difficulty: "medium" },
            { question: "What is a class in object-oriented programming?", options: ["Blueprint for objects", "Object instance", "Method", "Variable"], correct: 0, difficulty: "medium" },
            { question: "Which networking device operates at Layer 2?", options: ["Switch", "Router", "Hub", "Gateway"], correct: 0, difficulty: "medium" },
            { question: "What is encryption?", options: ["Converting data to secure format", "Data compression", "Data backup", "Data deletion"], correct: 0, difficulty: "medium" },
            { question: "Which database model is relational?", options: ["SQL", "NoSQL", "Graph", "Document"], correct: 0, difficulty: "medium" },
            { question: "What is normalization in databases?", options: ["Organizing data efficiently", "Making data bigger", "Making data smaller", "Deleting data"], correct: 0, difficulty: "medium" },
            { question: "Which cyber attack uses social engineering?", options: ["Phishing", "DDoS", "SQL Injection", "XSS"], correct: 0, difficulty: "medium" },
            { question: "What is a firewall rule?", options: ["Network traffic control", "Data storage", "Data processing", "Data display"], correct: 0, difficulty: "medium" },
            { question: "Which protocol is connectionless?", options: ["UDP", "TCP", "HTTP", "FTP"], correct: 0, difficulty: "medium" }
        ]
    },

    // Grade 11 medium Questions
    {
        grade: 11,
        questions: [
            { question: "What is the difference between GET and POST?", options: ["GET is read, POST is write", "POST is read, GET is write", "Both are read", "Both are write"], correct: 0, difficulty: "medium" },
            { question: "Which CSS property creates animations?", options: ["@keyframes", "@media", "@import", "@font-face"], correct: 0, difficulty: "medium" },
            { question: "What is a closure in JavaScript?", options: ["Function with access to outer scope", "Function without scope", "Variable", "Object"], correct: 0, difficulty: "medium" },
            { question: "Which sorting algorithm is stable?", options: ["Merge Sort", "Quick Sort", "Heap Sort", "Selection Sort"], correct: 0, difficulty: "medium" },
            { question: "What is polymorphism?", options: ["Multiple forms", "Single form", "No form", "Random form"], correct: 0, difficulty: "medium" },
            { question: "Which design pattern is creational?", options: ["Singleton", "Observer", "Strategy", "Command"], correct: 0, difficulty: "medium" },
            { question: "What is dependency injection?", options: ["Providing dependencies externally", "Creating dependencies", "Deleting dependencies", "Ignoring dependencies"], correct: 0, difficulty: "medium" },
            { question: "Which HTTP status code is for success?", options: ["200", "404", "500", "300"], correct: 0, difficulty: "medium" },
            { question: "What is a microservice?", options: ["Small independent service", "Large service", "Database service", "Network service"], correct: 0, difficulty: "medium" },
            { question: "Which protocol is stateless?", options: ["HTTP", "FTP", "SMTP", "POP3"], correct: 0, difficulty: "medium" }
        ]
    }
];

async function addmediumQuestions() {
    try {
        console.log('Starting to add medium questions...');
        let totalAdded = 0;

        for (const gradeData of mediumQuestions) {
            console.log(`\nAdding medium questions for Grade ${gradeData.grade}...`);
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

            console.log(`✅ Added ${gradeAdded} medium questions for Grade ${gradeData.grade}`);
        }

        console.log(`\n🎉 Successfully added ${totalAdded} medium questions total!`);
        await showFinalStatistics();
        
    } catch (error) {
        console.error('Error adding medium questions:', error);
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
addmediumQuestions();
