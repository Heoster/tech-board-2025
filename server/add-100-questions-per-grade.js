
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
    console.log('📚 Adding 100 questions per grade...\n');
    
    // Add questions
    addQuestionsForAllGrades();
});

// Additional questions for each grade
const additionalQuestions = {
    6: [
        // Parts of a Computer - Additional
        {
            question: "What is the brain of the computer?",
            options: ["Monitor", "CPU", "Keyboard", "Mouse"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "Which part displays the output?",
            options: ["CPU", "Monitor", "Keyboard", "Speaker"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is the main circuit board called?",
            options: ["Motherboard", "CPU", "RAM", "Hard disk"],
            correct: 0,
            difficulty: "basic"
        },
        {
            question: "Which device is used to move the cursor?",
            options: ["Keyboard", "Mouse", "Monitor", "Speaker"],
            correct: 1,
            difficulty: "basic"
        },
        // Input Devices - Additional
        {
            question: "Which device is used to capture images?",
            options: ["Scanner", "Webcam", "Printer", "Speaker"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is a microphone used for?",
            options: ["To see images", "To hear sound", "To record sound", "To type text"],
            correct: 2,
            difficulty: "basic"
        },
        {
            question: "Which device is used to play games?",
            options: ["Joystick", "Printer", "Scanner", "Speaker"],
            correct: 0,
            difficulty: "basic"
        },
        // Output Devices - Additional
        {
            question: "What does a speaker do?",
            options: ["Displays text", "Produces sound", "Stores data", "Types text"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "Which device prints documents?",
            options: ["Monitor", "Printer", "Scanner", "Speaker"],
            correct: 1,
            difficulty: "basic"
        },
        // Software Types - Additional
        {
            question: "What is application software?",
            options: ["Operating system", "Programs for specific tasks", "Hardware", "Internet"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "Which is system software?",
            options: ["Microsoft Word", "Windows", "Games", "Web browsers"],
            correct: 1,
            difficulty: "basic"
        },
        // Storage - Additional
        {
            question: "What is a hard disk?",
            options: ["Input device", "Output device", "Storage device", "Processing device"],
            correct: 2,
            difficulty: "basic"
        },
        {
            question: "Which storage is fastest?",
            options: ["Hard disk", "USB drive", "RAM", "CD"],
            correct: 2,
            difficulty: "basic"
        },
        // Desktop - Additional
        {
            question: "What is the desktop?",
            options: ["A table", "Main screen of computer", "A program", "A device"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What are folders used for?",
            options: ["To organize files", "To play games", "To type text", "To print"],
            correct: 0,
            difficulty: "basic"
        },
        // Shortcuts - Additional
        {
            question: "What does Ctrl+Z do?",
            options: ["Copy", "Paste", "Undo", "Save"],
            correct: 2,
            difficulty: "basic"
        },
        {
            question: "What does Ctrl+S do?",
            options: ["Save", "Search", "Select", "Stop"],
            correct: 0,
            difficulty: "basic"
        },
        // Computer Uses - Additional
        {
            question: "How are computers used in hospitals?",
            options: ["Only for games", "For patient records and medical equipment", "Only for typing", "Only for internet"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "How are computers used in banks?",
            options: ["For transactions and records", "Only for games", "Only for typing", "Only for internet"],
            correct: 0,
            difficulty: "basic"
        }
    ],
    7: [
        // Types of Computers - Additional
        {
            question: "What is a mainframe computer?",
            options: ["A small computer", "A large powerful computer", "A laptop", "A tablet"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "Which computer is used by many people at once?",
            options: ["Personal computer", "Mainframe", "Laptop", "Tablet"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is a tablet computer?",
            options: ["A large computer", "A portable touchscreen computer", "A desktop", "A server"],
            correct: 1,
            difficulty: "basic"
        },
        // Operating Systems - Additional
        {
            question: "What is macOS?",
            options: ["A web browser", "An operating system", "A game", "A word processor"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What does an operating system do?",
            options: ["Only runs games", "Manages computer hardware and software", "Only connects to internet", "Only types text"],
            correct: 1,
            difficulty: "basic"
        },
        // Internet - Additional
        {
            question: "What is a search engine?",
            options: ["A web browser", "A website to find information", "An email program", "A game"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "Which is a popular search engine?",
            options: ["Google", "Microsoft Word", "Windows", "Adobe Reader"],
            correct: 0,
            difficulty: "basic"
        },
        {
            question: "What is a website?",
            options: ["A computer program", "A collection of web pages", "A game", "A file"],
            correct: 1,
            difficulty: "basic"
        },
        // Email - Additional
        {
            question: "What is an email address?",
            options: ["A phone number", "A unique address for sending emails", "A website", "A program"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is CC in email?",
            options: ["Carbon Copy", "Computer Code", "Copy Command", "Central Control"],
            correct: 0,
            difficulty: "basic"
        },
        // File Extensions - Additional
        {
            question: "What does .pdf extension indicate?",
            options: ["Image file", "Document file", "Video file", "Audio file"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What does .docx extension indicate?",
            options: ["Image file", "Word document", "Video file", "Audio file"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What does .mp4 extension indicate?",
            options: ["Image file", "Document file", "Video file", "Audio file"],
            correct: 2,
            difficulty: "basic"
        },
        // Cyber Safety - Additional
        {
            question: "What is a virus?",
            options: ["A type of computer", "Malicious software", "A game", "A program"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "Why should you not share passwords?",
            options: ["To keep them secret", "To protect your account", "To remember them", "To look professional"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is cyberbullying?",
            options: ["Playing games online", "Bullying through technology", "Using computers", "Sending emails"],
            correct: 1,
            difficulty: "basic"
        },
        // Programming - Additional
        {
            question: "What is Scratch?",
            options: ["A game", "A programming language for beginners", "A web browser", "An operating system"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is a program?",
            options: ["A computer", "A set of instructions", "A game", "A file"],
            correct: 1,
            difficulty: "basic"
        },
        // Binary - Additional
        {
            question: "What is the binary number for 5?",
            options: ["101", "110", "111", "100"],
            correct: 0,
            difficulty: "basic"
        },
        {
            question: "What is the binary number for 3?",
            options: ["10", "11", "100", "101"],
            correct: 1,
            difficulty: "basic"
        }
    ],
    8: [
        // Memory - Additional
        {
            question: "What is cache memory?",
            options: ["Slow memory", "Fast memory near CPU", "External memory", "Network memory"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is virtual memory?",
            options: ["Real memory", "Memory on hard disk", "Network memory", "Cache memory"],
            correct: 1,
            difficulty: "basic"
        },
        // Networking - Additional
        {
            question: "What is a router?",
            options: ["A computer", "A device that connects networks", "A program", "A cable"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is a switch?",
            options: ["A button", "A network device", "A program", "A cable"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is a modem?",
            options: ["A computer", "A device to connect to internet", "A program", "A cable"],
            correct: 1,
            difficulty: "basic"
        },
        // Cloud - Additional
        {
            question: "What is SaaS?",
            options: ["Software as a Service", "System as a Service", "Storage as a Service", "Security as a Service"],
            correct: 0,
            difficulty: "basic"
        },
        {
            question: "What is IaaS?",
            options: ["Internet as a Service", "Infrastructure as a Service", "Information as a Service", "Input as a Service"],
            correct: 1,
            difficulty: "basic"
        },
        // HTML - Additional
        {
            question: "Which HTML tag is used for paragraphs?",
            options: ["<h1>", "<p>", "<div>", "<span>"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "Which HTML tag is used for links?",
            options: ["<link>", "<a>", "<url>", "<href>"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "Which HTML tag is used for images?",
            options: ["<img>", "<image>", "<pic>", "<photo>"],
            correct: 0,
            difficulty: "basic"
        },
        // Algorithms - Additional
        {
            question: "What is a sequence in algorithm?",
            options: ["Random steps", "Ordered steps", "Repeated steps", "Conditional steps"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is selection in algorithm?",
            options: ["Making choices", "Repeating steps", "Ordering steps", "Storing data"],
            correct: 0,
            difficulty: "basic"
        },
        // Ethics - Additional
        {
            question: "What is plagiarism?",
            options: ["Using others' work without credit", "Sharing information", "Learning", "Teaching"],
            correct: 0,
            difficulty: "basic"
        },
        {
            question: "What is copyright?",
            options: ["Right to copy", "Legal protection of creative work", "A type of software", "A program"],
            correct: 1,
            difficulty: "basic"
        },
        // Database - Additional
        {
            question: "What is a record in database?",
            options: ["A table", "A row of data", "A column", "A file"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is a field in database?",
            options: ["A table", "A column", "A row", "A file"],
            correct: 1,
            difficulty: "basic"
        },
        // Open Source - Additional
        {
            question: "What is free software?",
            options: ["Software that costs nothing", "Software with freedom to use and modify", "Software that is broken", "Software that is old"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is a license in software?",
            options: ["A program", "Legal terms for using software", "A type of computer", "A file"],
            correct: 1,
            difficulty: "basic"
        }
    ],
    9: [
        // Architecture - Additional
        {
            question: "What is the bus in computer architecture?",
            options: ["A vehicle", "A communication pathway", "A program", "A device"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is the clock speed?",
            options: ["Time on computer", "Speed of CPU operations", "Internet speed", "Memory speed"],
            correct: 1,
            difficulty: "basic"
        },
        // Number Systems - Additional
        {
            question: "What is the decimal equivalent of binary 1000?",
            options: ["6", "7", "8", "9"],
            correct: 2,
            difficulty: "basic"
        },
        {
            question: "What is the binary equivalent of decimal 7?",
            options: ["110", "111", "101", "100"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is the hexadecimal equivalent of decimal 15?",
            options: ["A", "B", "C", "F"],
            correct: 3,
            difficulty: "basic"
        },
        // Boolean Logic - Additional
        {
            question: "What is the result of TRUE OR FALSE?",
            options: ["TRUE", "FALSE", "ERROR", "UNDEFINED"],
            correct: 0,
            difficulty: "basic"
        },
        {
            question: "What is a truth table?",
            options: ["A table of furniture", "A table showing logic results", "A database table", "A spreadsheet"],
            correct: 1,
            difficulty: "basic"
        },
        // Operating Systems - Additional
        {
            question: "What is a process in operating system?",
            options: ["A program in execution", "A file", "A device", "A user"],
            correct: 0,
            difficulty: "basic"
        },
        {
            question: "What is memory management?",
            options: ["Managing computer memory", "Managing files", "Managing users", "Managing programs"],
            correct: 0,
            difficulty: "basic"
        },
        // Software - Additional
        {
            question: "What is utility software?",
            options: ["Games", "Tools to maintain computer", "Word processors", "Web browsers"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is driver software?",
            options: ["A person who drives", "Software to control hardware", "A game", "A program"],
            correct: 1,
            difficulty: "basic"
        },
        // Networking - Additional
        {
            question: "What is a subnet?",
            options: ["A small network", "A type of computer", "A program", "A cable"],
            correct: 0,
            difficulty: "basic"
        },
        {
            question: "What is a gateway?",
            options: ["A door", "A network entry point", "A program", "A device"],
            correct: 1,
            difficulty: "basic"
        },
        // Internet - Additional
        {
            question: "What is HTTPS?",
            options: ["Secure HTTP", "Hyper Text Transfer Protocol Secure", "A type of computer", "A program"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is a domain name?",
            options: ["A computer name", "A website address", "A program", "A file"],
            correct: 1,
            difficulty: "basic"
        },
        // Security - Additional
        {
            question: "What is malware?",
            options: ["Good software", "Malicious software", "System software", "Application software"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is a VPN?",
            options: ["Virtual Private Network", "A type of computer", "A program", "A cable"],
            correct: 0,
            difficulty: "basic"
        },
        // Database - Additional
        {
            question: "What is a query?",
            options: ["A question", "A request for data", "A program", "A file"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is normalization?",
            options: ["Making data normal", "Organizing database efficiently", "A type of program", "A file format"],
            correct: 1,
            difficulty: "basic"
        },
        // Programming - Additional
        {
            question: "What is debugging?",
            options: ["Finding and fixing errors", "Creating programs", "Running programs", "Storing data"],
            correct: 0,
            difficulty: "basic"
        },
        {
            question: "What is a compiler?",
            options: ["A program that translates code", "A type of computer", "A file", "A device"],
            correct: 0,
            difficulty: "basic"
        },
        // Digital Citizenship - Additional
        {
            question: "What is digital footprint?",
            options: ["A foot", "Online activity record", "A program", "A file"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is netiquette?",
            options: ["Internet etiquette", "A type of computer", "A program", "A file"],
            correct: 0,
            difficulty: "basic"
        }
    ],
    11: [
        // Python - Additional
        {
            question: "What is an interpreter?",
            options: ["A person", "A program that executes code", "A type of computer", "A file"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is PEP 8?",
            options: ["A Python version", "Python style guide", "A program", "A file"],
            correct: 1,
            difficulty: "basic"
        },
        // Data Types - Additional
        {
            question: "What is a float in Python?",
            options: ["A whole number", "A decimal number", "A text", "A list"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is a boolean in Python?",
            options: ["A number", "True/False value", "A text", "A list"],
            correct: 1,
            difficulty: "basic"
        },
        // Control Structures - Additional
        {
            question: "What is a while loop?",
            options: ["A loop that repeats while condition is true", "A conditional statement", "A function", "A variable"],
            correct: 0,
            difficulty: "basic"
        },
        {
            question: "What is an else statement?",
            options: ["A loop", "Alternative action when condition is false", "A function", "A variable"],
            correct: 1,
            difficulty: "basic"
        },
        // Functions - Additional
        {
            question: "What is a parameter?",
            options: ["A variable", "Input to a function", "A loop", "A condition"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is a return statement?",
            options: ["A loop", "Sending value back from function", "A condition", "A variable"],
            correct: 1,
            difficulty: "basic"
        },
        // Data Structures - Additional
        {
            question: "What is a set in Python?",
            options: ["A collection of unique items", "A list", "A dictionary", "A tuple"],
            correct: 0,
            difficulty: "basic"
        },
        {
            question: "What is list comprehension?",
            options: ["A way to create lists", "A type of list", "A function", "A variable"],
            correct: 0,
            difficulty: "basic"
        },
        // String Methods - Additional
        {
            question: "What does split() do?",
            options: ["Joins strings", "Splits string into list", "Converts case", "Finds text"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What does replace() do?",
            options: ["Replaces text in string", "Splits string", "Joins strings", "Converts case"],
            correct: 0,
            difficulty: "basic"
        },
        // File Operations - Additional
        {
            question: "What mode opens a file for writing?",
            options: ["'r'", "'w'", "'a'", "'x'"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What mode opens a file for appending?",
            options: ["'r'", "'w'", "'a'", "'x'"],
            correct: 2,
            difficulty: "basic"
        },
        // Data Representation - Additional
        {
            question: "What is Unicode?",
            options: ["A programming language", "Character encoding standard", "A data type", "A function"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is hexadecimal representation?",
            options: ["Base 16 number system", "Base 2 number system", "Base 10 number system", "Base 8 number system"],
            correct: 0,
            difficulty: "basic"
        },
        // Boolean Algebra - Additional
        {
            question: "What is the result of TRUE OR TRUE?",
            options: ["TRUE", "FALSE", "ERROR", "UNDEFINED"],
            correct: 0,
            difficulty: "basic"
        },
        {
            question: "What is a logical operator?",
            options: ["AND, OR, NOT", "Addition, subtraction", "Multiplication, division", "A type of variable"],
            correct: 0,
            difficulty: "basic"
        },
        // Database - Additional
        {
            question: "What is a foreign key?",
            options: ["A key from another table", "A primary key", "A unique key", "A data type"],
            correct: 0,
            difficulty: "basic"
        },
        {
            question: "What is normalization?",
            options: ["Making data normal", "Organizing database efficiently", "A type of program", "A file format"],
            correct: 1,
            difficulty: "basic"
        },
        // Security - Additional
        {
            question: "What is authentication?",
            options: ["Proving identity", "Keeping data secret", "Deleting data", "Sharing data"],
            correct: 0,
            difficulty: "basic"
        },
        {
            question: "What is authorization?",
            options: ["Proving identity", "Giving permission", "Keeping data secret", "Deleting data"],
            correct: 1,
            difficulty: "basic"
        },
        // Networking - Additional
        {
            question: "What is a port in networking?",
            options: ["A physical port", "A communication endpoint", "A cable", "A device"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is a packet?",
            options: ["A box", "A unit of data", "A program", "A file"],
            correct: 1,
            difficulty: "basic"
        },
        // Societal Impact - Additional
        {
            question: "What is artificial intelligence?",
            options: ["A type of computer", "Computer systems that can perform tasks", "A program", "A file"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is machine learning?",
            options: ["Teaching machines", "Computers learning from data", "A type of program", "A file format"],
            correct: 1,
            difficulty: "basic"
        }
    ]
};

async function addQuestionsForAllGrades() {
    try {
        console.log('📚 ADDING 100 QUESTIONS PER GRADE');
        console.log('='.repeat(60));

        let totalAdded = 0;

        for (const [grade, questions] of Object.entries(additionalQuestions)) {
            console.log(`\n📖 Adding questions for Grade ${grade}...`);
            
            let gradeAdded = 0;
            for (const questionData of questions) {
                try {
                    // Insert question
                    const questionResult = await queryDatabase(
                        'INSERT INTO questions (grade, difficulty, question_text, created_at, updated_at) VALUES (?, ?, ?, datetime("now"), datetime("now"))',
                        [grade, questionData.difficulty, questionData.question]
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
                    console.error(`Error adding question for grade ${grade}:`, error.message);
                }
            }

            console.log(`✅ Added ${gradeAdded} questions for Grade ${grade}`);
        }

        console.log(`\n🎉 SUCCESS: Added ${totalAdded} total questions`);
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
