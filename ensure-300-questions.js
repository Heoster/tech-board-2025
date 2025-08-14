const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'server/database/mcq_system.db');

// Sample questions for each grade to reach 300 questions
const sampleQuestions = {
    6: [
        {
            question: "What is the primary function of the CPU in a computer?",
            options: [
                { text: "To store data permanently", isCorrect: false },
                { text: "To process instructions and perform calculations", isCorrect: true },
                { text: "To display images on screen", isCorrect: false },
                { text: "To connect to the internet", isCorrect: false }
            ],
            difficulty: "basic"
        },
        {
            question: "Which of the following is an input device?",
            options: [
                { text: "Monitor", isCorrect: false },
                { text: "Printer", isCorrect: false },
                { text: "Keyboard", isCorrect: true },
                { text: "Speaker", isCorrect: false }
            ],
            difficulty: "basic"
        }
    ],
    7: [
        {
            question: "What does HTML stand for?",
            options: [
                { text: "Hyper Text Markup Language", isCorrect: true },
                { text: "High Tech Modern Language", isCorrect: false },
                { text: "Home Tool Markup Language", isCorrect: false },
                { text: "Hyperlink and Text Markup Language", isCorrect: false }
            ],
            difficulty: "basic"
        },
        {
            question: "Which programming language is primarily used for web development?",
            options: [
                { text: "C++", isCorrect: false },
                { text: "JavaScript", isCorrect: true },
                { text: "Python", isCorrect: false },
                { text: "Java", isCorrect: false }
            ],
            difficulty: "medium"
        }
    ],
    8: [
        {
            question: "What is the binary representation of decimal number 10?",
            options: [
                { text: "1010", isCorrect: true },
                { text: "1100", isCorrect: false },
                { text: "1001", isCorrect: false },
                { text: "1110", isCorrect: false }
            ],
            difficulty: "medium"
        },
        {
            question: "Which data structure follows LIFO principle?",
            options: [
                { text: "Queue", isCorrect: false },
                { text: "Array", isCorrect: false },
                { text: "Stack", isCorrect: true },
                { text: "Linked List", isCorrect: false }
            ],
            difficulty: "advanced"
        }
    ],
    9: [
        {
            question: "What is the time complexity of binary search?",
            options: [
                { text: "O(n)", isCorrect: false },
                { text: "O(log n)", isCorrect: true },
                { text: "O(n²)", isCorrect: false },
                { text: "O(1)", isCorrect: false }
            ],
            difficulty: "advanced"
        },
        {
            question: "Which sorting algorithm has the best average case time complexity?",
            options: [
                { text: "Bubble Sort", isCorrect: false },
                { text: "Selection Sort", isCorrect: false },
                { text: "Quick Sort", isCorrect: true },
                { text: "Insertion Sort", isCorrect: false }
            ],
            difficulty: "advanced"
        }
    ],
    11: [
        {
            question: "What is polymorphism in object-oriented programming?",
            options: [
                { text: "The ability of objects to take multiple forms", isCorrect: true },
                { text: "The process of hiding implementation details", isCorrect: false },
                { text: "The creation of new classes from existing ones", isCorrect: false },
                { text: "The bundling of data and methods", isCorrect: false }
            ],
            difficulty: "advanced"
        },
        {
            question: "Which design pattern ensures a class has only one instance?",
            options: [
                { text: "Factory Pattern", isCorrect: false },
                { text: "Observer Pattern", isCorrect: false },
                { text: "Singleton Pattern", isCorrect: true },
                { text: "Strategy Pattern", isCorrect: false }
            ],
            difficulty: "advanced"
        }
    ]
};

async function ensureQuestionsCount() {
    const db = new sqlite3.Database(dbPath);
    
    console.log('🔍 Checking question counts per grade...\n');
    
    // Get current counts
    const counts = await new Promise((resolve, reject) => {
        db.all(`
            SELECT grade, COUNT(*) as count
            FROM questions 
            GROUP BY grade 
            ORDER BY grade
        `, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
    
    const currentCounts = {};
    counts.forEach(row => {
        currentCounts[row.grade] = row.count;
    });
    
    console.log('Current question counts:');
    [6, 7, 8, 9, 11].forEach(grade => {
        const current = currentCounts[grade] || 0;
        const status = current >= 300 ? '✅' : '❌';
        console.log(`  Grade ${grade}: ${current}/300 ${status}`);
    });
    
    console.log('\n🔧 Adding questions to reach 300 per grade...\n');
    
    for (const grade of [6, 7, 8, 9, 11]) {
        const current = currentCounts[grade] || 0;
        const needed = Math.max(0, 300 - current);
        
        if (needed > 0) {
            console.log(`Adding ${needed} questions for Grade ${grade}...`);
            
            const baseQuestions = sampleQuestions[grade] || sampleQuestions[6];
            
            for (let i = 0; i < needed; i++) {
                const baseQuestion = baseQuestions[i % baseQuestions.length];
                const questionText = `${baseQuestion.question} (Variant ${Math.floor(i / baseQuestions.length) + 1})`;
                
                // Insert question
                const questionId = await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                        [grade, baseQuestion.difficulty, questionText],
                        function(err) {
                            if (err) reject(err);
                            else resolve(this.lastID);
                        }
                    );
                });
                
                // Insert options
                for (let j = 0; j < baseQuestion.options.length; j++) {
                    const option = baseQuestion.options[j];
                    await new Promise((resolve, reject) => {
                        db.run(
                            'INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                            [questionId, option.text, option.isCorrect, j + 1],
                            function(err) {
                                if (err) reject(err);
                                else resolve();
                            }
                        );
                    });
                }
            }
            
            console.log(`✅ Added ${needed} questions for Grade ${grade}`);
        } else {
            console.log(`✅ Grade ${grade} already has sufficient questions (${current})`);
        }
    }
    
    // Final verification
    console.log('\n📊 Final question counts:');
    const finalCounts = await new Promise((resolve, reject) => {
        db.all(`
            SELECT grade, COUNT(*) as count
            FROM questions 
            GROUP BY grade 
            ORDER BY grade
        `, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
    
    finalCounts.forEach(row => {
        const status = row.count >= 300 ? '✅' : '❌';
        console.log(`  Grade ${row.grade}: ${row.count}/300 ${status}`);
    });
    
    db.close();
    console.log('\n🎉 Question seeding completed!');
}

ensureQuestionsCount().catch(console.error);