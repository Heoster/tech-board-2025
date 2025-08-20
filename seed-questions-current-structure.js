const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'server/database/mcq_system.db');

// Comprehensive question templates for each grade
const questionTemplates = {
    6: [
        { q: "What is the main function of a computer's CPU?", opts: ["Process data and instructions", "Store files permanently", "Display images", "Connect to internet"], correct: 0, difficulty: "basic" },
        { q: "Which device is used to input text into a computer?", opts: ["Monitor", "Keyboard", "Speaker", "Printer"], correct: 1, difficulty: "basic" },
        { q: "What does RAM stand for?", opts: ["Random Access Memory", "Read Access Memory", "Rapid Access Memory", "Real Access Memory"], correct: 0, difficulty: "basic" },
        { q: "Which is an example of system software?", opts: ["Microsoft Word", "Operating System", "Calculator", "Web Browser"], correct: 1, difficulty: "basic" },
        { q: "What is the purpose of a computer mouse?", opts: ["Type text", "Point and click", "Store data", "Play sounds"], correct: 1, difficulty: "basic" },
        { q: "Which storage device has the largest capacity?", opts: ["Floppy disk", "CD-ROM", "Hard disk", "USB flash drive"], correct: 2, difficulty: "medium" },
        { q: "What is the binary system based on?", opts: ["Base 8", "Base 10", "Base 2", "Base 16"], correct: 2, difficulty: "medium" },
        { q: "Which component connects all parts of a computer?", opts: ["CPU", "RAM", "Motherboard", "Hard disk"], correct: 2, difficulty: "medium" },
        { q: "What does GUI stand for?", opts: ["General User Interface", "Graphical User Interface", "Global User Interface", "Generic User Interface"], correct: 1, difficulty: "advanced" },
        { q: "Which programming concept involves step-by-step instructions?", opts: ["Variables", "Algorithms", "Functions", "Loops"], correct: 1, difficulty: "advanced" }
    ],
    7: [
        { q: "What does HTML stand for?", opts: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyper Transfer Markup Language"], correct: 0, difficulty: "basic" },
        { q: "Which protocol is used for sending emails?", opts: ["HTTP", "FTP", "SMTP", "TCP"], correct: 2, difficulty: "basic" },
        { q: "What is the main purpose of an operating system?", opts: ["Browse the internet", "Manage computer resources", "Create documents", "Play games"], correct: 1, difficulty: "basic" },
        { q: "Which HTML tag is used to create a paragraph?", opts: ["<p>", "<paragraph>", "<text>", "<para>"], correct: 0, difficulty: "basic" },
        { q: "What is a strong password characteristic?", opts: ["Short and simple", "Contains personal info", "Mix of letters, numbers, symbols", "Easy to remember"], correct: 2, difficulty: "basic" },
        { q: "Which network topology connects all devices to a central hub?", opts: ["Ring", "Star", "Bus", "Mesh"], correct: 1, difficulty: "medium" },
        { q: "What is the purpose of a web browser?", opts: ["Edit documents", "Access websites", "Send emails", "Store files"], correct: 1, difficulty: "medium" },
        { q: "Which file format is commonly used for images?", opts: [".txt", ".doc", ".jpg", ".exe"], correct: 2, difficulty: "medium" },
        { q: "What is cloud computing?", opts: ["Local storage", "Internet-based computing", "Offline processing", "Hardware installation"], correct: 1, difficulty: "advanced" },
        { q: "Which programming language is primarily used for web styling?", opts: ["HTML", "CSS", "JavaScript", "Python"], correct: 1, difficulty: "advanced" }
    ],
    8: [
        { q: "What is CSS used for?", opts: ["Database management", "Styling web pages", "Programming logic", "Network security"], correct: 1, difficulty: "basic" },
        { q: "Which Python function displays output?", opts: ["input()", "print()", "show()", "display()"], correct: 1, difficulty: "basic" },
        { q: "What is a database primary key?", opts: ["First column", "Unique identifier", "Largest value", "Text field"], correct: 1, difficulty: "basic" },
        { q: "Which tag creates a hyperlink in HTML?", opts: ["<link>", "<a>", "<url>", "<href>"], correct: 1, difficulty: "basic" },
        { q: "What is the purpose of a firewall?", opts: ["Speed up internet", "Block unauthorized access", "Store passwords", "Create backups"], correct: 1, difficulty: "basic" },
        { q: "What is the binary representation of decimal 8?", opts: ["1000", "1010", "1100", "1001"], correct: 0, difficulty: "medium" },
        { q: "Which data type stores whole numbers in programming?", opts: ["String", "Boolean", "Integer", "Float"], correct: 2, difficulty: "medium" },
        { q: "What is a loop in programming?", opts: ["A bug", "Repeated execution", "A variable", "A function"], correct: 1, difficulty: "medium" },
        { q: "Which SQL command is used to retrieve data?", opts: ["INSERT", "UPDATE", "DELETE", "SELECT"], correct: 3, difficulty: "advanced" },
        { q: "What is object-oriented programming?", opts: ["Linear programming", "Programming with objects", "Database programming", "Web programming"], correct: 1, difficulty: "advanced" }
    ],
    9: [
        { q: "What is an algorithm?", opts: ["A programming language", "Step-by-step instructions", "A computer program", "A data structure"], correct: 1, difficulty: "basic" },
        { q: "Which sorting algorithm is most efficient for large datasets?", opts: ["Bubble Sort", "Selection Sort", "Quick Sort", "Insertion Sort"], correct: 2, difficulty: "basic" },
        { q: "What does SQL stand for?", opts: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"], correct: 0, difficulty: "basic" },
        { q: "What is the time complexity of binary search?", opts: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correct: 1, difficulty: "basic" },
        { q: "Which data structure uses LIFO principle?", opts: ["Queue", "Stack", "Array", "Linked List"], correct: 1, difficulty: "basic" },
        { q: "What is recursion in programming?", opts: ["A loop", "Function calling itself", "Error handling", "Variable declaration"], correct: 1, difficulty: "medium" },
        { q: "Which network protocol is used for web browsing?", opts: ["FTP", "SMTP", "HTTP", "TCP"], correct: 2, difficulty: "medium" },
        { q: "What is the purpose of version control?", opts: ["Speed up code", "Track code changes", "Compile programs", "Debug errors"], correct: 1, difficulty: "medium" },
        { q: "Which design pattern ensures only one instance of a class?", opts: ["Factory", "Observer", "Singleton", "Strategy"], correct: 2, difficulty: "advanced" },
        { q: "What is machine learning?", opts: ["Hardware repair", "AI that learns from data", "Network configuration", "Database design"], correct: 1, difficulty: "advanced" }
    ],
    11: [
        { q: "What is object-oriented programming?", opts: ["Linear programming", "Programming with objects and classes", "Database programming", "Web programming"], correct: 1, difficulty: "basic" },
        { q: "What is inheritance in OOP?", opts: ["Creating objects", "Acquiring properties from parent class", "Hiding data", "Calling methods"], correct: 1, difficulty: "basic" },
        { q: "Which HTTP method is used to update data?", opts: ["GET", "POST", "PUT", "DELETE"], correct: 2, difficulty: "basic" },
        { q: "What is database normalization?", opts: ["Making database faster", "Organizing data to reduce redundancy", "Creating backups", "Adding more tables"], correct: 1, difficulty: "basic" },
        { q: "What is the purpose of version control?", opts: ["Speed up code", "Track changes in code", "Compile programs", "Debug errors"], correct: 1, difficulty: "basic" },
        { q: "What is polymorphism in OOP?", opts: ["Multiple inheritance", "Objects taking multiple forms", "Data hiding", "Method overloading"], correct: 1, difficulty: "medium" },
        { q: "Which data structure is best for implementing a priority queue?", opts: ["Array", "Linked List", "Heap", "Stack"], correct: 2, difficulty: "medium" },
        { q: "What is the difference between TCP and UDP?", opts: ["Speed vs reliability", "Size vs complexity", "Local vs remote", "Wired vs wireless"], correct: 0, difficulty: "medium" },
        { q: "What is artificial intelligence?", opts: ["Fast computers", "Machines that simulate human intelligence", "Internet connectivity", "Database systems"], correct: 1, difficulty: "advanced" },
        { q: "Which algorithm is used in blockchain for consensus?", opts: ["Bubble Sort", "Binary Search", "Proof of Work", "Linear Search"], correct: 2, difficulty: "advanced" }
    ]
};

async function seedQuestions() {
    const db = new sqlite3.Database(dbPath);
    
    console.log('🗑️  Clearing existing questions...');
    
    // Clear existing questions
    await new Promise((resolve, reject) => {
        db.run('DELETE FROM questions', (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
    
    console.log('✅ Database cleared');
    
    const grades = [6, 7, 8, 9, 11];
    
    for (const grade of grades) {
        console.log(`\n🌱 Seeding Grade ${grade}...`);
        
        const templates = questionTemplates[grade];
        
        for (let i = 0; i < 300; i++) {
            const template = templates[i % templates.length];
            
            // Create unique question by adding variation
            const questionText = i < templates.length ? 
                template.q : 
                `${template.q} (Variation ${Math.floor(i / templates.length) + 1})`;
            
            // Create options JSON in the format expected by the current structure
            const optionsJson = JSON.stringify(template.opts.map((opt, index) => ({
                text: opt,
                isCorrect: index === template.correct
            })));
            
            // Insert question with JSON options
            await new Promise((resolve, reject) => {
                db.run('INSERT INTO questions (grade, difficulty, question_text, options) VALUES (?, ?, ?, ?)',
                    [grade, template.difficulty, questionText, optionsJson], function(err) {
                        if (err) reject(err);
                        else resolve(this.lastID);
                    });
            });
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
    
    let totalQuestions = 0;
    finalCounts.forEach(c => {
        console.log(`  Grade ${c.grade}: ${c.count} questions`);
        totalQuestions += c.count;
    });
    
    console.log(`\n🎯 Total Questions: ${totalQuestions}/1500`);
    
    db.close();
    console.log('\n🎉 Question seeding complete!');
}

seedQuestions().catch(console.error);