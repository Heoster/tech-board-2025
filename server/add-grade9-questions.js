const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database path
const dbPath = path.join(__dirname, 'database', 'mcq_system.db');

// Connect to database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Database connection error:', err.message);
        return;
    }
    console.log('✅ Connected to the database');
});

console.log('📝 ADDING GRADE 9 QUESTIONS');
console.log('============================\n');

// Grade 9 questions with different difficulty levels
const grade9Questions = [
    // Basic Questions (60% - 12 questions)
    {
        question_text: "What is the primary function of RAM in a computer?",
        difficulty: "basic",
        options: [
            { text: "Permanent storage", is_correct: false },
            { text: "Temporary storage for running programs", is_correct: true },
            { text: "Processing calculations", is_correct: false },
            { text: "Display output", is_correct: false }
        ]
    },
    {
        question_text: "Which programming language is known for its simplicity and readability?",
        difficulty: "basic",
        options: [
            { text: "Python", is_correct: true },
            { text: "Assembly", is_correct: false },
            { text: "Machine code", is_correct: false },
            { text: "Binary", is_correct: false }
        ]
    },
    {
        question_text: "What does CPU stand for?",
        difficulty: "basic",
        options: [
            { text: "Central Processing Unit", is_correct: true },
            { text: "Computer Personal Unit", is_correct: false },
            { text: "Central Program Utility", is_correct: false },
            { text: "Computer Processing Unit", is_correct: false }
        ]
    },
    {
        question_text: "Which of the following is an input device?",
        difficulty: "basic",
        options: [
            { text: "Monitor", is_correct: false },
            { text: "Printer", is_correct: false },
            { text: "Keyboard", is_correct: true },
            { text: "Speaker", is_correct: false }
        ]
    },
    {
        question_text: "What is the main purpose of an operating system?",
        difficulty: "basic",
        options: [
            { text: "To play games", is_correct: false },
            { text: "To manage hardware and software resources", is_correct: true },
            { text: "To connect to the internet", is_correct: false },
            { text: "To store files", is_correct: false }
        ]
    },
    {
        question_text: "Which file extension is typically used for images?",
        difficulty: "basic",
        options: [
            { text: ".txt", is_correct: false },
            { text: ".jpg", is_correct: true },
            { text: ".doc", is_correct: false },
            { text: ".exe", is_correct: false }
        ]
    },
    {
        question_text: "What is a web browser?",
        difficulty: "basic",
        options: [
            { text: "A computer virus", is_correct: false },
            { text: "A software to access websites", is_correct: true },
            { text: "A type of printer", is_correct: false },
            { text: "A storage device", is_correct: false }
        ]
    },
    {
        question_text: "Which of these is a programming concept?",
        difficulty: "basic",
        options: [
            { text: "Variable", is_correct: true },
            { text: "Voltage", is_correct: false },
            { text: "Velocity", is_correct: false },
            { text: "Volume", is_correct: false }
        ]
    },
    {
        question_text: "What does HTML stand for?",
        difficulty: "basic",
        options: [
            { text: "HyperText Markup Language", is_correct: true },
            { text: "High Tech Modern Language", is_correct: false },
            { text: "Home Tool Markup Language", is_correct: false },
            { text: "Hyperlink Text Management Language", is_correct: false }
        ]
    },
    {
        question_text: "Which device connects computers to the internet?",
        difficulty: "basic",
        options: [
            { text: "Modem", is_correct: true },
            { text: "Monitor", is_correct: false },
            { text: "Mouse", is_correct: false },
            { text: "Microphone", is_correct: false }
        ]
    },
    {
        question_text: "What is the purpose of a firewall?",
        difficulty: "basic",
        options: [
            { text: "To speed up the computer", is_correct: false },
            { text: "To protect against unauthorized access", is_correct: true },
            { text: "To store files", is_correct: false },
            { text: "To display graphics", is_correct: false }
        ]
    },
    {
        question_text: "Which programming structure is used for decision making?",
        difficulty: "basic",
        options: [
            { text: "Loop", is_correct: false },
            { text: "If statement", is_correct: true },
            { text: "Variable", is_correct: false },
            { text: "Function", is_correct: false }
        ]
    },

    // Medium Questions (30% - 6 questions)
    {
        question_text: "What is the difference between RAM and ROM?",
        difficulty: "medium",
        options: [
            { text: "RAM is faster than ROM", is_correct: false },
            { text: "RAM is volatile, ROM is non-volatile", is_correct: true },
            { text: "ROM is larger than RAM", is_correct: false },
            { text: "They are the same thing", is_correct: false }
        ]
    },
    {
        question_text: "What is object-oriented programming?",
        difficulty: "medium",
        options: [
            { text: "A programming paradigm based on objects", is_correct: true },
            { text: "A type of computer hardware", is_correct: false },
            { text: "A web development tool", is_correct: false },
            { text: "A database management system", is_correct: false }
        ]
    },
    {
        question_text: "What is the purpose of CSS in web development?",
        difficulty: "medium",
        options: [
            { text: "To create animations", is_correct: false },
            { text: "To style and format web pages", is_correct: true },
            { text: "To process data", is_correct: false },
            { text: "To connect to databases", is_correct: false }
        ]
    },
    {
        question_text: "What is a database?",
        difficulty: "medium",
        options: [
            { text: "A collection of organized data", is_correct: true },
            { text: "A type of computer virus", is_correct: false },
            { text: "A programming language", is_correct: false },
            { text: "A hardware component", is_correct: false }
        ]
    },
    {
        question_text: "What is the purpose of an algorithm?",
        difficulty: "medium",
        options: [
            { text: "To make computers faster", is_correct: false },
            { text: "To solve problems step by step", is_correct: true },
            { text: "To create graphics", is_correct: false },
            { text: "To store files", is_correct: false }
        ]
    },
    {
        question_text: "What is cloud computing?",
        difficulty: "medium",
        options: [
            { text: "Computing using remote servers over the internet", is_correct: true },
            { text: "A type of computer hardware", is_correct: false },
            { text: "A programming language", is_correct: false },
            { text: "A security software", is_correct: false }
        ]
    },

    // Advanced Questions (10% - 2 questions)
    {
        question_text: "What is the time complexity of binary search?",
        difficulty: "advanced",
        options: [
            { text: "O(1)", is_correct: false },
            { text: "O(log n)", is_correct: true },
            { text: "O(n)", is_correct: false },
            { text: "O(n²)", is_correct: false }
        ]
    },
    {
        question_text: "What is the purpose of a virtual machine?",
        difficulty: "advanced",
        options: [
            { text: "To run multiple operating systems on one computer", is_correct: true },
            { text: "To make the computer faster", is_correct: false },
            { text: "To store more data", is_correct: false },
            { text: "To connect to the internet", is_correct: false }
        ]
    }
];

async function addQuestions() {
    let addedCount = 0;
    
    for (const questionData of grade9Questions) {
        try {
            // Insert question
            const questionId = await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO questions (question_text, grade, difficulty) VALUES (?, ?, ?)',
                    [questionData.question_text, 9, questionData.difficulty],
                    function(err) {
                        if (err) reject(err);
                        else resolve(this.lastID);
                    }
                );
            });

            // Insert options
            for (let i = 0; i < questionData.options.length; i++) {
                const option = questionData.options[i];
                await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT INTO options (question_id, option_text, option_order, is_correct) VALUES (?, ?, ?, ?)',
                        [questionId, option.text, i + 1, option.is_correct ? 1 : 0],
                        function(err) {
                            if (err) reject(err);
                            else resolve();
                        }
                    );
                });
            }

            console.log(`✅ Added question: ${questionData.question_text.substring(0, 50)}...`);
            addedCount++;

        } catch (error) {
            console.error(`❌ Error adding question: ${error.message}`);
        }
    }

    console.log(`\n🎯 SUMMARY: Added ${addedCount} questions for Grade 9`);
    
    // Close database
    db.close((err) => {
        if (err) {
            console.error('❌ Error closing database:', err.message);
        } else {
            console.log('✅ Database connection closed');
        }
    });
}

// Run the script
addQuestions();
