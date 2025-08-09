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

const completionMediumQuestions = [
    // Grade 6 Completion Medium Questions
    {
        grade: 6,
        questions: [
            { question: "What is the difference between system software and application software?", options: ["System manages hardware, application performs tasks", "Application manages hardware, system performs tasks", "Both manage hardware", "Both perform tasks"], correct: 0, difficulty: "medium" },
            { question: "Which component processes graphics and images?", options: ["GPU", "CPU", "RAM", "Hard Drive"], correct: 0, difficulty: "medium" },
            { question: "What is the purpose of a device driver?", options: ["Enable communication between OS and hardware", "Store data", "Process data", "Display data"], correct: 0, difficulty: "medium" },
            { question: "Which device converts physical documents to digital format?", options: ["Scanner", "Printer", "Camera", "Monitor"], correct: 0, difficulty: "medium" },
            { question: "What is the function of a network interface card?", options: ["Connect computer to network", "Store data", "Process data", "Display data"], correct: 0, difficulty: "medium" },
            { question: "Which component manages system memory?", options: ["Memory Controller", "CPU", "RAM", "Hard Drive"], correct: 0, difficulty: "medium" },
            { question: "What is the purpose of a system bus?", options: ["Transfer data between components", "Store data", "Process data", "Display data"], correct: 0, difficulty: "medium" },
            { question: "Which device provides uninterruptible power?", options: ["UPS", "Power Supply", "Battery", "Generator"], correct: 0, difficulty: "medium" },
            { question: "What is the function of a BIOS chip?", options: ["Start the computer system", "Store user data", "Process data", "Display data"], correct: 0, difficulty: "medium" },
            { question: "Which component manages system timing and synchronization?", options: ["System Clock", "CPU", "RAM", "Hard Drive"], correct: 0, difficulty: "medium" }
        ]
    },

    // Grade 7 Completion Medium Questions
    {
        grade: 7,
        questions: [
            { question: "What is the difference between high-level and assembly language?", options: ["High-level is easier to read", "Assembly is easier to read", "Both are same", "Both are different"], correct: 0, difficulty: "medium" },
            { question: "Which programming paradigm focuses on data and functions?", options: ["Functional", "Object-oriented", "Procedural", "Logical"], correct: 0, difficulty: "medium" },
            { question: "What is a linker in programming?", options: ["Combines object files into executable", "Translates source code", "Runs programs", "Debugs code"], correct: 0, difficulty: "medium" },
            { question: "Which data structure uses LIFO principle?", options: ["Stack", "Queue", "Array", "List"], correct: 0, difficulty: "medium" },
            { question: "What is a formal parameter?", options: ["Parameter in function definition", "Parameter in function call", "Variable", "Constant"], correct: 0, difficulty: "medium" },
            { question: "Which loop checks condition at the end?", options: ["Do-while", "While", "For", "If"], correct: 0, difficulty: "medium" },
            { question: "What is a function prototype?", options: ["Function declaration", "Function definition", "Function call", "Function body"], correct: 0, difficulty: "medium" },
            { question: "Which operator performs logical AND?", options: ["&&", "||", "!", "=="], correct: 0, difficulty: "medium" },
            { question: "What is a block scope?", options: ["Variables accessible within block", "Global variables", "Local variables", "Static variables"], correct: 0, difficulty: "medium" },
            { question: "Which data type stores decimal numbers?", options: ["Float", "Integer", "String", "Boolean"], correct: 0, difficulty: "medium" }
        ]
    },

    // Grade 8 Completion Medium Questions
    {
        grade: 8,
        questions: [
            { question: "What is the difference between circuit switching and packet switching?", options: ["Circuit switching reserves path, packet switching doesn't", "Packet switching reserves path, circuit switching doesn't", "Both reserve paths", "Neither reserves paths"], correct: 0, difficulty: "medium" },
            { question: "Which protocol is used for secure web browsing?", options: ["HTTPS", "HTTP", "FTP", "SMTP"], correct: 0, difficulty: "medium" },
            { question: "What is a gateway in networking?", options: ["Connects different networks", "Same network device", "Network protocol", "Network address"], correct: 0, difficulty: "medium" },
            { question: "Which cloud deployment model is hybrid?", options: ["Hybrid Cloud", "Public Cloud", "Private Cloud", "Community Cloud"], correct: 0, difficulty: "medium" },
            { question: "What is containerization technology?", options: ["Packaging applications with dependencies", "Creating virtual machines", "Installing software", "Running programs"], correct: 0, difficulty: "medium" },
            { question: "Which HTML element is block-level?", options: ["<div>", "<span>", "<a>", "<img>"], correct: 0, difficulty: "medium" },
            { question: "What is CSS specificity?", options: ["Rule priority", "Rule order", "Rule name", "Rule type"], correct: 0, difficulty: "medium" },
            { question: "Which algorithm has O(n log n) complexity?", options: ["Merge Sort", "Bubble Sort", "Selection Sort", "Insertion Sort"], correct: 0, difficulty: "medium" },
            { question: "What is iteration in programming?", options: ["Repeating code", "Writing code", "Deleting code", "Moving code"], correct: 0, difficulty: "medium" },
            { question: "Which data structure is dynamic?", options: ["Linked List", "Array", "Stack", "Queue"], correct: 0, difficulty: "medium" }
        ]
    },

    // Grade 9 Completion Medium Questions
    {
        grade: 9,
        questions: [
            { question: "What is the difference between deep learning and traditional machine learning?", options: ["Deep learning uses neural networks", "Traditional ML uses neural networks", "Both use neural networks", "Neither uses neural networks"], correct: 0, difficulty: "medium" },
            { question: "Which Python data structure is unordered and mutable?", options: ["Set", "List", "Tuple", "Dictionary"], correct: 0, difficulty: "medium" },
            { question: "What is abstraction in object-oriented programming?", options: ["Hiding complexity", "Showing complexity", "Creating complexity", "Removing complexity"], correct: 0, difficulty: "medium" },
            { question: "Which networking device operates at Layer 1?", options: ["Hub", "Switch", "Router", "Gateway"], correct: 0, difficulty: "medium" },
            { question: "What is symmetric encryption?", options: ["Same key for encryption and decryption", "Different keys", "No keys", "Random keys"], correct: 0, difficulty: "medium" },
            { question: "Which database type is relational?", options: ["MySQL", "MongoDB", "Redis", "Cassandra"], correct: 0, difficulty: "medium" },
            { question: "What is a transaction in databases?", options: ["Group of operations", "Single operation", "Database type", "Query language"], correct: 0, difficulty: "medium" },
            { question: "Which attack floods servers with traffic?", options: ["DDoS", "SQL Injection", "Phishing", "XSS"], correct: 0, difficulty: "medium" },
            { question: "What is two-factor authentication?", options: ["Two-step verification", "Single verification", "No verification", "Random verification"], correct: 0, difficulty: "medium" },
            { question: "Which protocol is used for email retrieval?", options: ["POP3", "HTTP", "FTP", "SSH"], correct: 0, difficulty: "medium" }
        ]
    },

    // Grade 11 Completion Medium Questions
    {
        grade: 11,
        questions: [
            { question: "What is the difference between callbacks and promises?", options: ["Promises are more modern", "Callbacks are more modern", "Both are same", "Both are different"], correct: 0, difficulty: "medium" },
            { question: "Which CSS property creates flexbox layout?", options: ["display: flex", "display: grid", "display: block", "display: inline"], correct: 0, difficulty: "medium" },
            { question: "What is hoisting in JavaScript?", options: ["Moving declarations to top", "Moving functions to bottom", "Deleting variables", "Creating variables"], correct: 0, difficulty: "medium" },
            { question: "Which sorting algorithm is divide and conquer?", options: ["Merge Sort", "Bubble Sort", "Selection Sort", "Insertion Sort"], correct: 0, difficulty: "medium" },
            { question: "What is method overriding?", options: ["Redefining parent method", "Creating new method", "Deleting method", "Hiding method"], correct: 0, difficulty: "medium" },
            { question: "Which design pattern is structural?", options: ["Adapter", "Singleton", "Observer", "Factory"], correct: 0, difficulty: "medium" },
            { question: "What is dependency injection?", options: ["Providing dependencies externally", "Creating dependencies", "Deleting dependencies", "Hiding dependencies"], correct: 0, difficulty: "medium" },
            { question: "Which HTTP method creates new resources?", options: ["POST", "GET", "PUT", "DELETE"], correct: 0, difficulty: "medium" },
            { question: "What is microservices architecture?", options: ["Small independent services", "Large monolithic service", "Single service", "No services"], correct: 0, difficulty: "medium" },
            { question: "Which protocol is used for secure shell access?", options: ["SSH", "HTTP", "FTP", "SMTP"], correct: 0, difficulty: "medium" }
        ]
    }
];

async function addCompletionMediumQuestions() {
    try {
        console.log('Starting to add completion medium questions...');
        let totalAdded = 0;

        for (const gradeData of completionMediumQuestions) {
            console.log(`\nAdding completion medium questions for Grade ${gradeData.grade}...`);
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

            console.log(`✅ Added ${gradeAdded} completion medium questions for Grade ${gradeData.grade}`);
        }

        console.log(`\n🎉 Successfully added ${totalAdded} completion medium questions total!`);
        await showFinalStatistics();
        
    } catch (error) {
        console.error('Error adding completion medium questions:', error);
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
addCompletionMediumQuestions();
