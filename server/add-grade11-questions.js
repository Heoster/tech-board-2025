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

const grade11Questions = [
    // HTML Tags
    { question: "What HTML tag is used to create a hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], correct: 1, difficulty: "basic" },
    { question: "Which HTML tag is used to define a paragraph?", options: ["<p>", "<para>", "<text>", "<div>"], correct: 0, difficulty: "basic" },
    { question: "What is the correct HTML tag for the largest heading?", options: ["<h1>", "<heading>", "<head>", "<title>"], correct: 0, difficulty: "basic" },
    { question: "Which HTML tag is used to make text bold?", options: ["<bold>", "<b>", "<strong>", "<em>"], correct: 1, difficulty: "basic" },
    { question: "What HTML tag is used to create an unordered list?", options: ["<ul>", "<ol>", "<li>", "<list>"], correct: 0, difficulty: "basic" },

    // HTML Forms
    { question: "What HTML tag is used to create a form?", options: ["<form>", "<input>", "<submit>", "<action>"], correct: 0, difficulty: "basic" },
    { question: "Which input type is used for text input?", options: ["text", "string", "input", "type"], correct: 0, difficulty: "basic" },
    { question: "What input type is used for password fields?", options: ["password", "secret", "hidden", "secure"], correct: 0, difficulty: "basic" },
    { question: "Which input type is used for email addresses?", options: ["email", "mail", "address", "contact"], correct: 0, difficulty: "basic" },
    { question: "What input type is used for numbers?", options: ["number", "integer", "numeric", "digit"], correct: 0, difficulty: "basic" },

    // HTML Tables
    { question: "What HTML tag is used to create a table?", options: ["<table>", "<grid>", "<matrix>", "<chart>"], correct: 0, difficulty: "basic" },
    { question: "Which HTML tag is used to create a table row?", options: ["<tr>", "<row>", "<td>", "<table-row>"], correct: 0, difficulty: "basic" },
    { question: "What HTML tag is used to create a table cell?", options: ["<td>", "<cell>", "<data>", "<table-cell>"], correct: 0, difficulty: "basic" },
    { question: "Which HTML tag is used to create a table header?", options: ["<th>", "<header>", "<thead>", "<table-header>"], correct: 0, difficulty: "basic" },
    { question: "What HTML tag is used to group table headers?", options: ["<thead>", "<header>", "<th>", "<group>"], correct: 0, difficulty: "basic" },

    // Multimedia Embedding
    { question: "What HTML tag is used to embed images?", options: ["<img>", "<image>", "<picture>", "<photo>"], correct: 0, difficulty: "basic" },
    { question: "Which attribute is required for the img tag?", options: ["src", "alt", "href", "link"], correct: 0, difficulty: "basic" },
    { question: "What HTML tag is used to embed videos?", options: ["<video>", "<movie>", "<media>", "<clip>"], correct: 0, difficulty: "basic" },
    { question: "Which HTML tag is used to embed audio?", options: ["<audio>", "<sound>", "<music>", "<track>"], correct: 0, difficulty: "basic" },
    { question: "What HTML tag is used to embed external content?", options: ["<iframe>", "<embed>", "<object>", "<frame>"], correct: 0, difficulty: "basic" },

    // CSS Styling
    { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"], correct: 0, difficulty: "basic" },
    { question: "Which CSS property is used to change text color?", options: ["color", "text-color", "font-color", "foreground"], correct: 0, difficulty: "basic" },
    { question: "What CSS property is used to change background color?", options: ["background-color", "bg-color", "color", "back-color"], correct: 0, difficulty: "basic" },
    { question: "Which CSS property is used to change font size?", options: ["font-size", "size", "text-size", "font"], correct: 0, difficulty: "basic" },
    { question: "What CSS property is used to change font family?", options: ["font-family", "family", "font", "typeface"], correct: 0, difficulty: "basic" },

    // CSS Formatting
    { question: "What CSS property is used to change element width?", options: ["width", "size", "dimension", "scale"], correct: 0, difficulty: "basic" },
    { question: "Which CSS property is used to change element height?", options: ["height", "size", "dimension", "scale"], correct: 0, difficulty: "basic" },
    { question: "What CSS property is used to change element position?", options: ["position", "place", "location", "site"], correct: 0, difficulty: "basic" },
    { question: "Which CSS property is used to change element display?", options: ["display", "show", "visible", "appear"], correct: 0, difficulty: "basic" },
    { question: "What CSS property is used to add shadows?", options: ["box-shadow", "shadow", "drop-shadow", "glow"], correct: 0, difficulty: "basic" },

    // Web Page Creation
    { question: "What is the basic structure of an HTML document?", options: ["<!DOCTYPE html><html><head><body>", "<html><head><body>", "<!DOCTYPE><html>", "<document><html>"], correct: 0, difficulty: "basic" },
    { question: "Which HTML tag contains the page title?", options: ["<title>", "<head>", "<header>", "<name>"], correct: 0, difficulty: "basic" },
    { question: "What HTML tag is used to link CSS files?", options: ["<link>", "<style>", "<css>", "<stylesheet>"], correct: 0, difficulty: "basic" },
    { question: "Which HTML tag is used to include JavaScript?", options: ["<script>", "<js>", "<javascript>", "<code>"], correct: 0, difficulty: "basic" },
    { question: "What HTML tag is used to define the main content?", options: ["<main>", "<content>", "<body>", "<section>"], correct: 0, difficulty: "basic" },

    // Project Work
    { question: "What is the first step in web development project planning?", options: ["Requirements gathering", "Design", "Coding", "Testing"], correct: 0, difficulty: "basic" },
    { question: "Which phase involves creating wireframes?", options: ["Design", "Planning", "Development", "Testing"], correct: 0, difficulty: "basic" },
    { question: "What is a wireframe in web design?", options: ["A basic layout sketch", "A final design", "A color scheme", "A font choice"], correct: 0, difficulty: "basic" },
    { question: "Which tool is commonly used for web design?", options: ["Adobe Photoshop", "Microsoft Word", "Notepad", "Calculator"], correct: 0, difficulty: "basic" },
    { question: "What is responsive design?", options: ["Design that adapts to different screen sizes", "Fast loading design", "Colorful design", "Simple design"], correct: 0, difficulty: "basic" },

    // Computer Systems & Organization
    { question: "What is the main component of a computer system?", options: ["CPU", "Monitor", "Keyboard", "Mouse"], correct: 0, difficulty: "basic" },
    { question: "Which component stores data temporarily?", options: ["RAM", "Hard Drive", "CPU", "Motherboard"], correct: 0, difficulty: "basic" },
    { question: "What is the function of the motherboard?", options: ["Connects all components", "Displays images", "Types text", "Plays sound"], correct: 0, difficulty: "basic" },
    { question: "Which component processes graphics?", options: ["GPU", "CPU", "RAM", "Hard Drive"], correct: 0, difficulty: "basic" },
    { question: "What is the purpose of the power supply?", options: ["Provides electricity", "Stores data", "Displays images", "Types text"], correct: 0, difficulty: "basic" },

    // Computational Thinking & Programming
    { question: "What is computational thinking?", options: ["Problem-solving approach", "Computer programming", "Hardware design", "Software installation"], correct: 0, difficulty: "basic" },
    { question: "Which step involves breaking down problems?", options: ["Decomposition", "Pattern recognition", "Abstraction", "Algorithm design"], correct: 0, difficulty: "basic" },
    { question: "What is pattern recognition in computational thinking?", options: ["Finding similarities", "Breaking problems", "Creating solutions", "Testing programs"], correct: 0, difficulty: "basic" },
    { question: "Which step involves removing unnecessary details?", options: ["Abstraction", "Decomposition", "Pattern recognition", "Algorithm design"], correct: 0, difficulty: "basic" },
    { question: "What is algorithm design?", options: ["Creating step-by-step solutions", "Writing code", "Testing programs", "Installing software"], correct: 0, difficulty: "basic" },

    // Additional HTML/CSS Questions
    { question: "What is the purpose of the alt attribute in img tags?", options: ["Alternative text for accessibility", "Image alignment", "Image size", "Image source"], correct: 0, difficulty: "basic" },
    { question: "Which CSS selector targets elements by class?", options: [".classname", "#idname", "element", "*"], correct: 0, difficulty: "basic" },
    { question: "What is the purpose of CSS media queries?", options: ["Responsive design", "Color changes", "Font changes", "Layout changes"], correct: 0, difficulty: "basic" },
    { question: "Which HTML tag is used for semantic markup?", options: ["<section>", "<div>", "<span>", "<p>"], correct: 0, difficulty: "basic" },
    { question: "What is the purpose of CSS flexbox?", options: ["Layout management", "Color management", "Font management", "Image management"], correct: 0, difficulty: "basic" },

    // Advanced Programming Concepts
    { question: "What is debugging in programming?", options: ["Finding and fixing errors", "Writing code", "Testing programs", "Installing software"], correct: 0, difficulty: "basic" },
    { question: "Which programming concept uses true/false values?", options: ["Boolean", "Integer", "String", "Float"], correct: 0, difficulty: "basic" },
    { question: "What is an array in programming?", options: ["Collection of data", "Single value", "Function", "Variable"], correct: 0, difficulty: "basic" },
    { question: "Which programming concept uses key-value pairs?", options: ["Object", "Array", "Function", "Variable"], correct: 0, difficulty: "basic" },
    { question: "What is recursion in programming?", options: ["Function calling itself", "Loop repetition", "Condition checking", "Data storage"], correct: 0, difficulty: "basic" }
];

async function addGrade11Questions() {
    try {
        console.log('Starting to add Grade 11 questions...');
        let addedCount = 0;

        for (const questionData of grade11Questions) {
            try {
                // Insert question
                const questionResult = await queryDatabase(
                    'INSERT INTO questions (grade, difficulty, question_text, created_at, updated_at) VALUES (?, ?, ?, datetime("now"), datetime("now"))',
                    [11, questionData.difficulty, questionData.question]
                );
                
                const questionId = questionResult.lastID;
                
                // Insert options
                for (let i = 0; i < questionData.options.length; i++) {
                    await queryDatabase(
                        'INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                        [questionId, questionData.options[i], i === questionData.correct ? 1 : 0, i + 1]
                    );
                }
                
                addedCount++;
                if (addedCount % 10 === 0) {
                    console.log(`Added ${addedCount} questions so far...`);
                }
            } catch (error) {
                console.error(`Error adding question "${questionData.question}":`, error.message);
            }
        }

        console.log(`\n✅ Successfully added ${addedCount} questions for Grade 11!`);
        await showFinalStatistics();
        
    } catch (error) {
        console.error('Error adding Grade 11 questions:', error);
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
        
        const grade11Count = await queryDatabase("SELECT COUNT(*) as count FROM questions WHERE grade = 11");
        console.log(`Grade 11 Questions: ${grade11Count[0].count} (Target: 150+)`);
        
        const totalOptions = await queryDatabase("SELECT COUNT(*) as count FROM options");
        console.log(`Total Options: ${totalOptions[0].count}`);
        
        const gradeDistribution = await queryDatabase(`
            SELECT grade, COUNT(*) as count 
            FROM questions 
            GROUP BY grade 
            ORDER BY grade
        `);
        
        console.log('\nGrade Distribution:');
        gradeDistribution.forEach(row => {
            console.log(`Grade ${row.grade}: ${row.count} questions`);
        });
        
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
addGrade11Questions();
