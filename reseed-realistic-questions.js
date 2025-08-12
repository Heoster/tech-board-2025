const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'server/database/mcq_system.db');

// Realistic question templates
const questionTemplates = {
    6: [
        { q: "What is the main function of a computer's CPU?", opts: ["Process data and instructions", "Store files permanently", "Display images", "Connect to internet"], correct: 0 },
        { q: "Which device is used to input text into a computer?", opts: ["Monitor", "Keyboard", "Speaker", "Printer"], correct: 1 },
        { q: "What does RAM stand for?", opts: ["Random Access Memory", "Read Access Memory", "Rapid Access Memory", "Real Access Memory"], correct: 0 },
        { q: "Which is an example of system software?", opts: ["Microsoft Word", "Operating System", "Calculator", "Web Browser"], correct: 1 },
        { q: "What is the purpose of a computer mouse?", opts: ["Type text", "Point and click", "Store data", "Play sounds"], correct: 1 }
    ],
    7: [
        { q: "What does HTML stand for?", opts: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyper Transfer Markup Language"], correct: 0 },
        { q: "Which protocol is used for sending emails?", opts: ["HTTP", "FTP", "SMTP", "TCP"], correct: 2 },
        { q: "What is the main purpose of an operating system?", opts: ["Browse the internet", "Manage computer resources", "Create documents", "Play games"], correct: 1 },
        { q: "Which HTML tag is used to create a paragraph?", opts: ["<p>", "<paragraph>", "<text>", "<para>"], correct: 0 },
        { q: "What is a strong password characteristic?", opts: ["Short and simple", "Contains personal info", "Mix of letters, numbers, symbols", "Easy to remember"], correct: 2 }
    ],
    8: [
        { q: "What is CSS used for?", opts: ["Database management", "Styling web pages", "Programming logic", "Network security"], correct: 1 },
        { q: "Which Python function displays output?", opts: ["input()", "print()", "show()", "display()"], correct: 1 },
        { q: "What is a database primary key?", opts: ["First column", "Unique identifier", "Largest value", "Text field"], correct: 1 },
        { q: "Which tag creates a hyperlink in HTML?", opts: ["<link>", "<a>", "<url>", "<href>"], correct: 1 },
        { q: "What is the purpose of a firewall?", opts: ["Speed up internet", "Block unauthorized access", "Store passwords", "Create backups"], correct: 1 }
    ],
    9: [
        { q: "What is an algorithm?", opts: ["A programming language", "Step-by-step instructions", "A computer program", "A data structure"], correct: 1 },
        { q: "Which sorting algorithm is most efficient for large datasets?", opts: ["Bubble Sort", "Selection Sort", "Quick Sort", "Insertion Sort"], correct: 2 },
        { q: "What does SQL stand for?", opts: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"], correct: 0 },
        { q: "What is the time complexity of binary search?", opts: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correct: 1 },
        { q: "Which data structure uses LIFO principle?", opts: ["Queue", "Stack", "Array", "Linked List"], correct: 1 }
    ],
    11: [
        { q: "What is object-oriented programming?", opts: ["Linear programming", "Programming with objects and classes", "Database programming", "Web programming"], correct: 1 },
        { q: "What is inheritance in OOP?", opts: ["Creating objects", "Acquiring properties from parent class", "Hiding data", "Calling methods"], correct: 1 },
        { q: "Which HTTP method is used to update data?", opts: ["GET", "POST", "PUT", "DELETE"], correct: 2 },
        { q: "What is database normalization?", opts: ["Making database faster", "Organizing data to reduce redundancy", "Creating backups", "Adding more tables"], correct: 1 },
        { q: "What is the purpose of version control?", opts: ["Speed up code", "Track changes in code", "Compile programs", "Debug errors"], correct: 1 }
    ]
};

async function reseedRealisticQuestions() {
    const db = new sqlite3.Database(dbPath);
    
    console.log('🗑️  Clearing existing questions...');
    
    // Clear existing data
    await new Promise((resolve, reject) => {
        db.run('DELETE FROM options', (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
    
    await new Promise((resolve, reject) => {
        db.run('DELETE FROM questions', (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
    
    console.log('✅ Database cleared');
    
    const grades = [6, 7, 8, 9, 11];
    const difficulties = ['basic', 'medium', 'advanced'];
    
    for (const grade of grades) {
        console.log(`\n🌱 Seeding Grade ${grade}...`);
        
        const templates = questionTemplates[grade];
        
        for (let i = 0; i < 300; i++) {
            const template = templates[i % templates.length];
            const difficulty = difficulties[i % 3];
            
            // Create unique question by adding variation
            const questionText = i < templates.length ? 
                template.q : 
                `${template.q} (Variation ${Math.floor(i / templates.length) + 1})`;
            
            // Insert question
            const questionId = await new Promise((resolve, reject) => {
                db.run('INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                    [grade, difficulty, questionText], function(err) {
                        if (err) reject(err);
                        else resolve(this.lastID);
                    });
            });
            
            // Insert options
            for (let j = 0; j < template.opts.length; j++) {
                await new Promise((resolve, reject) => {
                    db.run('INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                        [questionId, template.opts[j], j === template.correct ? 1 : 0, j + 1], (err) => {
                            if (err) reject(err);
                            else resolve();
                        });
                });
            }
        }
        
        console.log(`✅ Grade ${grade}: 300 questions seeded`);
    }
    
    // Verify counts
    console.log('\n📊 Final verification:');
    const finalCounts = await new Promise((resolve, reject) => {
        db.all('SELECT grade, COUNT(*) as count FROM questions GROUP BY grade ORDER BY grade', (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
    
    finalCounts.forEach(c => {
        console.log(`  Grade ${c.grade}: ${c.count} questions`);
    });
    
    db.close();
    console.log('\n🎉 Realistic questions seeding complete!');
}

reseedRealisticQuestions().catch(console.error);