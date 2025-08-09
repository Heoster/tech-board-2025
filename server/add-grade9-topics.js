const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database path
const dbPath = path.join(__dirname, '..', 'database', 'mcq_system.db');

// Connect to database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return;
    }
    console.log('✅ Connected to SQLite database');
    console.log('📚 Adding Grade 9 questions...\n');
    
    // Add questions
    addGrade9Questions();
});

// Grade 9 questions based on specified topics
const grade9Questions = [
    // AI Reflection, Project Cycle & Ethics
    {
        question: "What is AI Reflection in project development?",
        options: ["Looking at AI images", "Analyzing AI performance and learning from it", "Using AI tools", "Creating AI programs"],
        correct: 1,
        difficulty: "basic"
    },
    {
        question: "What is the first stage of the project cycle?",
        options: ["Implementation", "Planning", "Evaluation", "Testing"],
        correct: 1,
        difficulty: "basic"
    },
    {
        question: "What is project ethics?",
        options: ["Making projects look good", "Following moral principles in project development", "Completing projects quickly", "Using expensive tools"],
        correct: 1,
        difficulty: "basic"
    },
    // Python Programming
    {
        question: "What is a variable in Python?",
        options: ["A container for storing data", "A type of function", "A loop", "A condition"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is a function in Python?",
        options: ["A variable", "A reusable block of code", "A loop", "A condition"],
        correct: 1,
        difficulty: "basic"
    },
    {
        question: "What is a list in Python?",
        options: ["A single value", "An ordered collection of items", "A function", "A variable"],
        correct: 1,
        difficulty: "basic"
    },
    // Office Tools
    {
        question: "What is Microsoft Word used for?",
        options: ["Creating spreadsheets", "Creating documents", "Creating presentations", "Creating databases"],
        correct: 1,
        difficulty: "basic"
    },
    {
        question: "What is Microsoft Excel used for?",
        options: ["Creating documents", "Creating spreadsheets", "Creating presentations", "Creating databases"],
        correct: 1,
        difficulty: "basic"
    },
    {
        question: "What is Microsoft PowerPoint used for?",
        options: ["Creating documents", "Creating spreadsheets", "Creating presentations", "Creating databases"],
        correct: 2,
        difficulty: "basic"
    },
    // Networking
    {
        question: "What does PAN stand for?",
        options: ["Personal Area Network", "Public Area Network", "Private Area Network", "Portable Area Network"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What does LAN stand for?",
        options: ["Local Area Network", "Large Area Network", "Limited Area Network", "Long Area Network"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What does MAN stand for?",
        options: ["Metropolitan Area Network", "Major Area Network", "Medium Area Network", "Mobile Area Network"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What does WAN stand for?",
        options: ["Wide Area Network", "World Area Network", "Wireless Area Network", "Web Area Network"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What does Wi-Fi stand for?",
        options: ["Wireless Fidelity", "Wired Fidelity", "World Fidelity", "Web Fidelity"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is Bluetooth used for?",
        options: ["Short-range wireless communication", "Long-range wireless communication", "Wired communication", "Satellite communication"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is cloud computing?",
        options: ["Computing using clouds", "Storing data on remote servers", "Using only local storage", "Playing games online"],
        correct: 1,
        difficulty: "basic"
    },
    // Computer Characteristics
    {
        question: "What is speed as a computer characteristic?",
        options: ["How fast computer processes data", "How big computer is", "How much computer costs", "How heavy computer is"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is accuracy as a computer characteristic?",
        options: ["Computer makes no mistakes", "Computer is always right", "Computer processes data without errors", "Computer is perfect"],
        correct: 2,
        difficulty: "basic"
    },
    {
        question: "What is diligence as a computer characteristic?",
        options: ["Computer works without getting tired", "Computer is always working", "Computer never stops", "Computer is reliable"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is versatility as a computer characteristic?",
        options: ["Computer can do many tasks", "Computer is flexible", "Computer can change", "Computer is adaptable"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is storage as a computer characteristic?",
        options: ["Computer can store large amounts of data", "Computer has memory", "Computer saves files", "Computer remembers things"],
        correct: 0,
        difficulty: "basic"
    },
    // Cybercrimes
    {
        question: "What is cyberstalking?",
        options: ["Following someone online", "Harassing someone through technology", "Playing games online", "Using social media"],
        correct: 1,
        difficulty: "basic"
    },
    {
        question: "What is phishing?",
        options: ["A type of fish", "A cyber attack to steal information", "A computer game", "A type of software"],
        correct: 1,
        difficulty: "basic"
    },
    {
        question: "What is malware?",
        options: ["Good software", "Malicious software", "System software", "Application software"],
        correct: 1,
        difficulty: "basic"
    },
    {
        question: "What is a computer virus?",
        options: ["A type of malware", "A type of bacteria", "A type of software", "A type of hardware"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is adware?",
        options: ["Software that shows unwanted ads", "Software that protects from ads", "Software that blocks ads", "Software that creates ads"],
        correct: 0,
        difficulty: "basic"
    }
];

async function addGrade9Questions() {
    try {
        console.log('📚 ADDING GRADE 9 QUESTIONS');
        console.log('='.repeat(60));

        let totalAdded = 0;

        for (const questionData of grade9Questions) {
            try {
                // Insert question
                const questionResult = await queryDatabase(
                    'INSERT INTO questions (grade, difficulty, question_text, created_at, updated_at) VALUES (?, ?, ?, datetime("now"), datetime("now"))',
                    [9, questionData.difficulty, questionData.question]
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

            } catch (error) {
                console.error(`Error adding question:`, error.message);
            }
        }

        console.log(`\n🎉 SUCCESS: Added ${totalAdded} questions for Grade 9`);
        await showFinalStatistics();

    } catch (error) {
        console.error('Error adding questions:', error);
    } finally {
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('\n✅ Database connection closed');
            }
        });
    }
}

async function showFinalStatistics() {
    console.log('\n📊 FINAL DATABASE STATISTICS');
    console.log('='.repeat(60));

    try {
        // Total questions
        const totalQuestions = await queryDatabase("SELECT COUNT(*) as count FROM questions");
        console.log(`📚 Total Questions: ${totalQuestions[0].count}`);

        // Questions by grade
        const questionsByGrade = await queryDatabase(`
            SELECT grade, COUNT(*) as count 
            FROM questions 
            GROUP BY grade 
            ORDER BY grade
        `);
        console.log('\n📚 Questions by Grade:');
        questionsByGrade.forEach(row => {
            console.log(`   Grade ${row.grade}: ${row.count} questions`);
        });

        // Questions by difficulty
        const questionsByDifficulty = await queryDatabase(`
            SELECT difficulty, COUNT(*) as count 
            FROM questions 
            GROUP BY difficulty 
            ORDER BY difficulty
        `);
        console.log('\n📊 Questions by Difficulty:');
        questionsByDifficulty.forEach(row => {
            console.log(`   ${row.difficulty}: ${row.count} questions`);
        });

        // Total options
        const totalOptions = await queryDatabase("SELECT COUNT(*) as count FROM options");
        console.log(`\n🔘 Total Options: ${totalOptions[0].count}`);

    } catch (error) {
        console.error('Error generating final statistics:', error.message);
    }
}

function queryDatabase(sql, params = []) {
    return new Promise((resolve, reject) => {
        if (sql.trim().toUpperCase().startsWith('INSERT')) {
            // For insert operations
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
