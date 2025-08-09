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
    console.log('📚 Adding comprehensive questions for all grades...\n');
    
    // Add questions
    addComprehensiveQuestions();
});

// Question data for each grade
const gradeQuestions = {
    6: [
        // Parts of a Computer
        {
            question: "What does CPU stand for?",
            options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Unit", "Computer Processing Unit"],
            correct: 0,
            difficulty: "basic"
        },
        {
            question: "Which device is used to input text into a computer?",
            options: ["Monitor", "Keyboard", "Speaker", "Printer"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is the main function of RAM?",
            options: ["To store data permanently", "To process calculations", "To temporarily store data while computer is running", "To display images"],
            correct: 2,
            difficulty: "basic"
        },
        {
            question: "Which of these is an output device?",
            options: ["Keyboard", "Mouse", "Monitor", "Scanner"],
            correct: 2,
            difficulty: "basic"
        },
        {
            question: "What is the purpose of a mouse?",
            options: ["To type text", "To point and click on screen", "To print documents", "To store files"],
            correct: 1,
            difficulty: "basic"
        },
        // Input & Output Devices
        {
            question: "Which device is used to scan documents?",
            options: ["Printer", "Scanner", "Speaker", "Keyboard"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What does a printer do?",
            options: ["Displays images", "Produces hard copies of documents", "Stores data", "Connects to internet"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "Which device is used to hear sound from computer?",
            options: ["Monitor", "Speaker", "Keyboard", "Mouse"],
            correct: 1,
            difficulty: "basic"
        },
        // Types of Software
        {
            question: "What is system software?",
            options: ["Games and applications", "Operating system and utilities", "Word processors", "Web browsers"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "Which is an example of application software?",
            options: ["Windows", "Microsoft Word", "BIOS", "Device drivers"],
            correct: 1,
            difficulty: "basic"
        },
        // Storage Devices
        {
            question: "What is a USB drive used for?",
            options: ["To display images", "To store and transfer data", "To type text", "To connect to internet"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "Which storage device is portable?",
            options: ["Hard disk", "USB drive", "RAM", "ROM"],
            correct: 1,
            difficulty: "basic"
        },
        // Desktop Elements
        {
            question: "What are icons on desktop?",
            options: ["Small pictures representing programs", "Text files", "Folders only", "System files"],
            correct: 0,
            difficulty: "basic"
        },
        {
            question: "Where is the taskbar usually located?",
            options: ["Top of screen", "Bottom of screen", "Left side", "Right side"],
            correct: 1,
            difficulty: "basic"
        },
        // Keyboard Shortcuts
        {
            question: "What does Ctrl+C do?",
            options: ["Copy", "Cut", "Paste", "Save"],
            correct: 0,
            difficulty: "basic"
        },
        {
            question: "What does Ctrl+V do?",
            options: ["Copy", "Cut", "Paste", "Undo"],
            correct: 2,
            difficulty: "basic"
        },
        // Uses of Computers
        {
            question: "How are computers used in schools?",
            options: ["Only for games", "For learning, research, and administration", "Only for typing", "Only for internet"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What does WWW stand for?",
            options: ["World Wide Web", "World Web Wide", "Wide World Web", "Web World Wide"],
            correct: 0,
            difficulty: "basic"
        }
    ],
    7: [
        // Types of Computers
        {
            question: "Which type of computer is portable?",
            options: ["Desktop", "Laptop", "Supercomputer", "Mainframe"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is a supercomputer used for?",
            options: ["Basic word processing", "Complex scientific calculations", "Playing games", "Browsing internet"],
            correct: 1,
            difficulty: "basic"
        },
        // Operating Systems
        {
            question: "Which is an example of an operating system?",
            options: ["Microsoft Word", "Windows", "Google Chrome", "Adobe Photoshop"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is Linux?",
            options: ["A web browser", "An operating system", "A word processor", "A game"],
            correct: 1,
            difficulty: "basic"
        },
        // Internet & Web Browsers
        {
            question: "What is a web browser?",
            options: ["A search engine", "Software to access websites", "An email program", "A word processor"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "Which is a popular web browser?",
            options: ["Microsoft Word", "Google Chrome", "Adobe Reader", "Windows Media Player"],
            correct: 1,
            difficulty: "basic"
        },
        // Email Basics
        {
            question: "What is email?",
            options: ["A type of computer", "Electronic mail", "A web browser", "A game"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What symbol is used in email addresses?",
            options: ["@", "#", "$", "%"],
            correct: 0,
            difficulty: "basic"
        },
        // File Extensions
        {
            question: "What does .jpg extension indicate?",
            options: ["Text file", "Image file", "Video file", "Audio file"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What does .mp3 extension indicate?",
            options: ["Image file", "Video file", "Audio file", "Document file"],
            correct: 2,
            difficulty: "basic"
        },
        // Cyber Safety
        {
            question: "Why should you use strong passwords?",
            options: ["To make login slower", "To protect your account from hackers", "To remember easily", "To look professional"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is phishing?",
            options: ["A type of fish", "A cyber attack to steal information", "A computer game", "A type of software"],
            correct: 1,
            difficulty: "basic"
        },
        // Binary Numbers
        {
            question: "What is the binary number system?",
            options: ["Base 10 system", "Base 2 system using 0 and 1", "Base 16 system", "Base 8 system"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What does 1010 represent in binary?",
            options: ["5", "10", "15", "20"],
            correct: 1,
            difficulty: "basic"
        }
    ],
    8: [
        // Computer Memory
        {
            question: "What is RAM?",
            options: ["Read Access Memory", "Random Access Memory", "Read Only Memory", "Random Only Memory"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is ROM?",
            options: ["Read Only Memory", "Random Access Memory", "Read Access Memory", "Random Only Memory"],
            correct: 0,
            difficulty: "basic"
        },
        // Networking Basics
        {
            question: "What is an IP address?",
            options: ["Internet Protocol address", "Internet Password", "Internet Program", "Internet Port"],
            correct: 0,
            difficulty: "basic"
        },
        {
            question: "What is a MAC address?",
            options: ["Media Access Control address", "Memory Access Control", "Main Access Control", "Media Access Code"],
            correct: 0,
            difficulty: "basic"
        },
        // Cloud Computing
        {
            question: "What is cloud computing?",
            options: ["Computing using clouds", "Storing data on remote servers", "Using only local storage", "Playing games online"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is cloud storage?",
            options: ["Local hard drive storage", "Online storage service", "RAM storage", "ROM storage"],
            correct: 1,
            difficulty: "basic"
        },
        // HTML Basics
        {
            question: "What does HTML stand for?",
            options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink Text Markup Language"],
            correct: 0,
            difficulty: "basic"
        },
        {
            question: "Which HTML tag is used for headings?",
            options: ["<p>", "<h1>", "<div>", "<span>"],
            correct: 1,
            difficulty: "basic"
        },
        // Flowcharts & Algorithms
        {
            question: "What is an algorithm?",
            options: ["A computer program", "A step-by-step problem-solving procedure", "A type of software", "A hardware component"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is a flowchart?",
            options: ["A type of chart", "A diagram showing algorithm steps", "A computer program", "A data structure"],
            correct: 1,
            difficulty: "basic"
        },
        // Cyber Ethics
        {
            question: "What is cyber ethics?",
            options: ["Using computers", "Moral principles for internet use", "Playing games online", "Sending emails"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "Why is it important to respect others online?",
            options: ["To avoid getting banned", "To maintain positive digital environment", "To get more friends", "To avoid viruses"],
            correct: 1,
            difficulty: "basic"
        },
        // Database Introduction
        {
            question: "What is a database?",
            options: ["A collection of organized data", "A type of computer", "A software program", "A network connection"],
            correct: 0,
            difficulty: "basic"
        },
        {
            question: "What is the main purpose of a database?",
            options: ["To play games", "To store and retrieve data efficiently", "To browse internet", "To create documents"],
            correct: 1,
            difficulty: "basic"
        },
        // Open Source vs Proprietary
        {
            question: "What is open source software?",
            options: ["Free software with source code available", "Expensive software", "Hardware component", "Operating system"],
            correct: 0,
            difficulty: "basic"
        },
        {
            question: "What is proprietary software?",
            options: ["Free software", "Software owned by a company", "Open source software", "Hardware"],
            correct: 1,
            difficulty: "basic"
        }
    ],
    9: [
        // Computer Architecture
        {
            question: "What is ALU in computer architecture?",
            options: ["Arithmetic Logic Unit", "Access Logic Unit", "Advanced Logic Unit", "Application Logic Unit"],
            correct: 0,
            difficulty: "basic"
        },
        {
            question: "What is CU in computer architecture?",
            options: ["Control Unit", "Central Unit", "Computer Unit", "Calculation Unit"],
            correct: 0,
            difficulty: "basic"
        },
        // Number Systems
        {
            question: "What is the decimal equivalent of binary 1101?",
            options: ["10", "11", "12", "13"],
            correct: 3,
            difficulty: "basic"
        },
        {
            question: "What is hexadecimal number system?",
            options: ["Base 2 system", "Base 10 system", "Base 16 system", "Base 8 system"],
            correct: 2,
            difficulty: "basic"
        },
        // Boolean Logic
        {
            question: "What is Boolean logic?",
            options: ["A type of mathematics", "Logic using true/false values", "A programming language", "A computer component"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is the result of TRUE AND FALSE?",
            options: ["TRUE", "FALSE", "ERROR", "UNDEFINED"],
            correct: 1,
            difficulty: "basic"
        },
        // Operating Systems
        {
            question: "What is the kernel of an operating system?",
            options: ["The user interface", "The core component managing hardware", "A type of software", "A hardware component"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is multitasking?",
            options: ["Running multiple programs simultaneously", "Using multiple computers", "Having multiple users", "Using multiple keyboards"],
            correct: 0,
            difficulty: "basic"
        },
        // Software Classification
        {
            question: "What is system software?",
            options: ["Software that manages hardware", "Application software", "Games", "Web browsers"],
            correct: 0,
            difficulty: "basic"
        },
        {
            question: "What is application software?",
            options: ["Operating system", "Software for specific tasks", "Hardware drivers", "BIOS"],
            correct: 1,
            difficulty: "basic"
        },
        // Networking Fundamentals
        {
            question: "What is TCP/IP?",
            options: ["A type of computer", "Internet communication protocol", "A software program", "A hardware component"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is DNS?",
            options: ["Domain Name System", "Data Network System", "Digital Network Service", "Domain Network Service"],
            correct: 0,
            difficulty: "basic"
        },
        // Internet Technologies
        {
            question: "What does HTTP stand for?",
            options: ["Hyper Text Transfer Protocol", "High Tech Transfer Protocol", "Home Tool Transfer Protocol", "Hyperlink Text Transfer Protocol"],
            correct: 0,
            difficulty: "basic"
        },
        {
            question: "What is a URL?",
            options: ["Uniform Resource Locator", "Universal Resource Link", "Uniform Resource Link", "Universal Resource Locator"],
            correct: 0,
            difficulty: "basic"
        },
        // Cybersecurity
        {
            question: "What is encryption?",
            options: ["Converting data into unreadable format", "Deleting data", "Copying data", "Moving data"],
            correct: 0,
            difficulty: "basic"
        },
        {
            question: "What is a firewall?",
            options: ["A physical wall", "Security system for networks", "A type of software", "A hardware component"],
            correct: 1,
            difficulty: "basic"
        },
        // Database Concepts
        {
            question: "What is a table in database?",
            options: ["A piece of furniture", "Collection of related data in rows and columns", "A type of software", "A hardware component"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is SQL?",
            options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"],
            correct: 0,
            difficulty: "basic"
        },
        // Programming Fundamentals
        {
            question: "What is a variable in programming?",
            options: ["A type of computer", "A container for storing data", "A program", "A hardware component"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is a loop in programming?",
            options: ["A type of data", "Repeating a set of instructions", "A variable", "A function"],
            correct: 1,
            difficulty: "basic"
        },
        // Digital Citizenship
        {
            question: "What is digital citizenship?",
            options: ["Using computers", "Responsible use of technology", "Playing games", "Sending emails"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "Why is digital literacy important?",
            options: ["To play games", "To navigate digital world effectively", "To avoid viruses", "To get more friends"],
            correct: 1,
            difficulty: "basic"
        }
    ],
    11: [
        // Python Programming
        {
            question: "What is Python?",
            options: ["A snake", "A programming language", "A type of computer", "A software program"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is a variable in Python?",
            options: ["A container for storing data", "A type of function", "A loop", "A condition"],
            correct: 0,
            difficulty: "basic"
        },
        // Data Types
        {
            question: "What is an integer in Python?",
            options: ["A whole number", "A decimal number", "A text", "A list"],
            correct: 0,
            difficulty: "basic"
        },
        {
            question: "What is a string in Python?",
            options: ["A number", "A sequence of characters", "A list", "A function"],
            correct: 1,
            difficulty: "basic"
        },
        // Control Structures
        {
            question: "What is an if statement?",
            options: ["A loop", "A conditional statement", "A function", "A variable"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is a for loop?",
            options: ["A conditional statement", "A loop that repeats for a specific number of times", "A function", "A variable"],
            correct: 1,
            difficulty: "basic"
        },
        // Functions
        {
            question: "What is a function in Python?",
            options: ["A variable", "A reusable block of code", "A loop", "A condition"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is the purpose of a function?",
            options: ["To store data", "To organize and reuse code", "To create loops", "To define variables"],
            correct: 1,
            difficulty: "basic"
        },
        // Lists and Tuples
        {
            question: "What is a list in Python?",
            options: ["A single value", "An ordered collection of items", "A function", "A variable"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is a tuple in Python?",
            options: ["An immutable list", "A function", "A variable", "A loop"],
            correct: 0,
            difficulty: "basic"
        },
        // Dictionaries
        {
            question: "What is a dictionary in Python?",
            options: ["A book", "A key-value pair collection", "A list", "A function"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "How are dictionaries accessed?",
            options: ["By index", "By key", "By value", "By position"],
            correct: 1,
            difficulty: "basic"
        },
        // String Manipulation
        {
            question: "What is string concatenation?",
            options: ["Joining strings together", "Splitting strings", "Converting strings", "Deleting strings"],
            correct: 0,
            difficulty: "basic"
        },
        {
            question: "What method is used to convert string to uppercase?",
            options: ["lower()", "upper()", "title()", "capitalize()"],
            correct: 1,
            difficulty: "basic"
        },
        // File Handling
        {
            question: "What is file handling?",
            options: ["Creating files", "Reading and writing files", "Deleting files", "Moving files"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What mode opens a file for reading?",
            options: ["'w'", "'r'", "'a'", "'x'"],
            correct: 1,
            difficulty: "basic"
        },
        // Data Representation
        {
            question: "What is ASCII?",
            options: ["A programming language", "Character encoding standard", "A data type", "A function"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is binary representation?",
            options: ["Base 2 number system", "Base 10 number system", "Base 16 number system", "Base 8 number system"],
            correct: 0,
            difficulty: "basic"
        },
        // Boolean Algebra
        {
            question: "What is Boolean algebra?",
            options: ["A type of mathematics", "Algebra dealing with true/false values", "A programming language", "A data structure"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is the result of NOT TRUE?",
            options: ["TRUE", "FALSE", "ERROR", "UNDEFINED"],
            correct: 1,
            difficulty: "basic"
        },
        // SQL & RDBMS
        {
            question: "What is RDBMS?",
            options: ["Relational Database Management System", "Random Database Management System", "Relational Data Management System", "Random Data Management System"],
            correct: 0,
            difficulty: "basic"
        },
        {
            question: "What is a primary key?",
            options: ["Any column", "Unique identifier for a table", "A foreign key", "A data type"],
            correct: 1,
            difficulty: "basic"
        },
        // Cyber Safety & Ethics
        {
            question: "What is ethical hacking?",
            options: ["Illegal hacking", "Authorized security testing", "Creating viruses", "Stealing data"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is data privacy?",
            options: ["Keeping data secret", "Protecting personal information", "Deleting data", "Sharing data"],
            correct: 1,
            difficulty: "basic"
        },
        // Networking Fundamentals
        {
            question: "What is a protocol in networking?",
            options: ["A type of computer", "Rules for data communication", "A software program", "A hardware component"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is IP addressing?",
            options: ["Giving names to computers", "Assigning unique addresses to devices", "Creating passwords", "Installing software"],
            correct: 1,
            difficulty: "basic"
        },
        // Societal Impact
        {
            question: "What is digital divide?",
            options: ["A type of computer", "Gap between those with and without technology access", "A software program", "A network protocol"],
            correct: 1,
            difficulty: "basic"
        },
        {
            question: "What is e-waste?",
            options: ["Electronic waste", "Email waste", "Energy waste", "Environment waste"],
            correct: 0,
            difficulty: "basic"
        }
    ]
};

async function addComprehensiveQuestions() {
    try {
        console.log('📚 ADDING COMPREHENSIVE QUESTIONS');
        console.log('='.repeat(60));

        let totalAdded = 0;

        for (const [grade, questions] of Object.entries(gradeQuestions)) {
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
