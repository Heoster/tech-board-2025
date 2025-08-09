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
    console.log('📚 Adding final Grade 9 questions...\n');
    
    // Add questions
    addFinalGrade9Questions();
});

// Final Grade 9 questions to reach 150+
const finalGrade9Questions = [
    // Additional AI Reflection & Project Cycle
    {
        question: "What is project maintenance?",
        options: ["Keeping projects clean", "Updating and supporting projects after completion", "Throwing away projects", "Ignoring projects"],
        correct: 1,
        difficulty: "basic"
    },
    {
        question: "What is project evaluation?",
        options: ["Finding mistakes", "Assessing project success and learning for future", "Criticizing work", "Finishing quickly"],
        correct: 1,
        difficulty: "basic"
    },
    {
        question: "What is project planning?",
        options: ["Making plans", "Defining project goals and creating roadmap", "Starting work", "Finishing work"],
        correct: 1,
        difficulty: "basic"
    },
    // Additional Python Programming
    {
        question: "What is a comment in Python?",
        options: ["A note in code", "A type of variable", "A function", "A loop"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is indentation in Python?",
        options: ["Spacing at start of lines", "A type of variable", "A function", "A loop"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is a module in Python?",
        options: ["A file with Python code", "A type of variable", "A function", "A loop"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is import in Python?",
        options: ["Bringing in modules", "A type of variable", "A function", "A loop"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is print() in Python?",
        options: ["A function to display output", "A type of variable", "A loop", "A condition"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is input() in Python?",
        options: ["A function to get user input", "A type of variable", "A loop", "A condition"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is len() in Python?",
        options: ["A function to get length", "A type of variable", "A loop", "A condition"],
        correct: 0,
        difficulty: "basic"
    },
    // Additional Office Tools
    {
        question: "What is a macro in Office?",
        options: ["Automated sequence of actions", "A type of document", "A type of template", "A type of theme"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is track changes in Word?",
        options: ["Following changes", "Recording edits and modifications", "Making changes", "Deleting changes"],
        correct: 1,
        difficulty: "basic"
    },
    {
        question: "What is spell check?",
        options: ["Checking spelling", "Finding and correcting spelling errors", "Writing words", "Reading words"],
        correct: 1,
        difficulty: "basic"
    },
    {
        question: "What is grammar check?",
        options: ["Checking grammar", "Finding and correcting grammar errors", "Writing sentences", "Reading sentences"],
        correct: 1,
        difficulty: "basic"
    },
    {
        question: "What is auto-save?",
        options: ["Automatic saving", "Saving documents automatically", "Manual saving", "Forced saving"],
        correct: 1,
        difficulty: "basic"
    },
    // Additional Networking
    {
        question: "What is a network protocol?",
        options: ["Rules for communication", "A type of cable", "A type of device", "A type of software"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is IP address?",
        options: ["Unique identifier for devices", "A type of cable", "A type of device", "A type of software"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is DNS?",
        options: ["Domain Name System", "Data Network System", "Digital Network Service", "Domain Network Service"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is a firewall?",
        options: ["Security system for networks", "A type of cable", "A type of device", "A type of software"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is a VPN?",
        options: ["Virtual Private Network", "A type of cable", "A type of device", "A type of software"],
        correct: 0,
        difficulty: "basic"
    },
    // Additional Computer Characteristics
    {
        question: "What is multitasking as a computer characteristic?",
        options: ["Doing multiple tasks", "Running multiple programs simultaneously", "Working fast", "Being efficient"],
        correct: 1,
        difficulty: "basic"
    },
    {
        question: "What is real-time processing?",
        options: ["Processing immediately", "Processing data as it happens", "Fast processing", "Quick processing"],
        correct: 1,
        difficulty: "basic"
    },
    {
        question: "What is batch processing?",
        options: ["Processing in groups", "Processing multiple tasks together", "Group processing", "Bulk processing"],
        correct: 1,
        difficulty: "basic"
    },
    {
        question: "What is interactive processing?",
        options: ["User interaction", "Processing with user input", "Two-way processing", "Responsive processing"],
        correct: 1,
        difficulty: "basic"
    },
    {
        question: "What is distributed processing?",
        options: ["Spread processing", "Processing across multiple computers", "Network processing", "Shared processing"],
        correct: 1,
        difficulty: "basic"
    },
    // Additional Cybercrimes
    {
        question: "What is social engineering?",
        options: ["Social skills", "Manipulating people to get information", "Social media", "Social networking"],
        correct: 1,
        difficulty: "basic"
    },
    {
        question: "What is pretexting?",
        options: ["Making excuses", "Creating fake scenarios to get information", "Lying", "Deceiving"],
        correct: 1,
        difficulty: "basic"
    },
    {
        question: "What is baiting?",
        options: ["Using bait", "Leaving infected devices to spread malware", "Fishing", "Trapping"],
        correct: 1,
        difficulty: "basic"
    },
    {
        question: "What is quid pro quo?",
        options: ["Exchange", "Offering service in exchange for information", "Trading", "Bargaining"],
        correct: 1,
        difficulty: "basic"
    },
    {
        question: "What is tailgating?",
        options: ["Following closely", "Following someone into restricted areas", "Chasing", "Pursuing"],
        correct: 1,
        difficulty: "basic"
    }
];

async function addFinalGrade9Questions() {
    try {
        console.log('📚 ADDING FINAL GRADE 9 QUESTIONS');
        console.log('='.repeat(60));

        let totalAdded = 0;

        for (const questionData of finalGrade9Questions) {
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

        console.log(`\n🎉 SUCCESS: Added ${totalAdded} final questions for Grade 9`);
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

        // Grade 9 specific count
        const grade9Count = await queryDatabase("SELECT COUNT(*) as count FROM questions WHERE grade = 9");
        console.log(`\n🎯 Grade 9 Questions: ${grade9Count[0].count} (Target: 150+)`);

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
