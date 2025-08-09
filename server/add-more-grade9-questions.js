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
    console.log('📚 Adding more Grade 9 questions...\n');
    
    // Add questions
    addMoreGrade9Questions();
});

// Additional Grade 9 questions
const additionalGrade9Questions = [
    // More AI Reflection & Project Cycle
    {
        question: "What is the second stage of the project cycle?",
        options: ["Planning", "Analysis", "Design", "Implementation"],
        correct: 2,
        difficulty: "basic"
    },
    {
        question: "What is the third stage of the project cycle?",
        options: ["Planning", "Design", "Implementation", "Testing"],
        correct: 2,
        difficulty: "basic"
    },
    {
        question: "What is the fourth stage of the project cycle?",
        options: ["Design", "Implementation", "Testing", "Evaluation"],
        correct: 2,
        difficulty: "basic"
    },
    {
        question: "What is the fifth stage of the project cycle?",
        options: ["Implementation", "Testing", "Evaluation", "Maintenance"],
        correct: 2,
        difficulty: "basic"
    },
    {
        question: "What is project documentation?",
        options: ["Writing about projects", "Recording project details and processes", "Taking photos", "Making videos"],
        correct: 1,
        difficulty: "basic"
    },
    // More Python Programming
    {
        question: "What is a string in Python?",
        options: ["A number", "A sequence of characters", "A list", "A function"],
        correct: 1,
        difficulty: "basic"
    },
    {
        question: "What is an integer in Python?",
        options: ["A whole number", "A decimal number", "A text", "A list"],
        correct: 0,
        difficulty: "basic"
    },
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
    {
        question: "What is a tuple in Python?",
        options: ["An immutable list", "A function", "A variable", "A loop"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is a dictionary in Python?",
        options: ["A book", "A key-value pair collection", "A list", "A function"],
        correct: 1,
        difficulty: "basic"
    },
    {
        question: "What is a set in Python?",
        options: ["A collection of unique items", "A list", "A dictionary", "A tuple"],
        correct: 0,
        difficulty: "basic"
    },
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
    // More Office Tools
    {
        question: "What is a template in Word?",
        options: ["A pre-designed document", "A type of font", "A color scheme", "A page layout"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is formatting in Word?",
        options: ["Changing text appearance", "Saving documents", "Printing documents", "Creating tables"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is a header in Word?",
        options: ["Text at top of page", "Text at bottom of page", "Text in middle", "Text on side"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is a footer in Word?",
        options: ["Text at top of page", "Text at bottom of page", "Text in middle", "Text on side"],
        correct: 1,
        difficulty: "basic"
    },
    {
        question: "What is a table in Word?",
        options: ["Organized data in rows and columns", "A type of chart", "A type of graph", "A type of image"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is a cell in Excel?",
        options: ["A box in spreadsheet", "A type of chart", "A formula", "A function"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is a formula in Excel?",
        options: ["A calculation", "A type of cell", "A chart", "A function"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is a function in Excel?",
        options: ["A pre-built formula", "A type of cell", "A chart", "A calculation"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is SUM function used for?",
        options: ["Adding numbers", "Multiplying numbers", "Dividing numbers", "Subtracting numbers"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is a chart in Excel?",
        options: ["Visual representation of data", "A type of cell", "A type of formula", "A type of function"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is a slide in PowerPoint?",
        options: ["A single page", "A type of animation", "A template", "A theme"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is a template in PowerPoint?",
        options: ["A pre-designed presentation", "A type of slide", "A color scheme", "An animation"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is animation in PowerPoint?",
        options: ["Moving text or objects", "A type of slide", "A template", "A theme"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is a theme in PowerPoint?",
        options: ["A color and design scheme", "A type of slide", "An animation", "A template"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is mail merge in Word?",
        options: ["Creating personalized documents", "A type of template", "A type of table", "A type of chart"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is conditional formatting in Excel?",
        options: ["Formatting based on conditions", "A type of formula", "A type of function", "A type of chart"],
        correct: 0,
        difficulty: "basic"
    },
    // More Networking
    {
        question: "What is a PAN used for?",
        options: ["Connecting devices around a person", "Connecting cities", "Connecting countries", "Connecting buildings"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "Which technology is commonly used in PAN?",
        options: ["Bluetooth", "Wi-Fi", "Ethernet", "Fiber optic"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is the range of a typical PAN?",
        options: ["1-10 meters", "100-1000 meters", "1-10 kilometers", "100-1000 kilometers"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is a LAN used for?",
        options: ["Connecting devices in a small area", "Connecting cities", "Connecting countries", "Connecting continents"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is the typical range of a LAN?",
        options: ["1-10 meters", "100-1000 meters", "1-10 kilometers", "100-1000 kilometers"],
        correct: 1,
        difficulty: "basic"
    },
    {
        question: "Which device is commonly used in LAN?",
        options: ["Switch", "Satellite", "Modem", "Router"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is Ethernet used for?",
        options: ["LAN connections", "Internet connections", "Satellite connections", "Mobile connections"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is a MAN used for?",
        options: ["Connecting a city", "Connecting a room", "Connecting a country", "Connecting a continent"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is the typical range of a MAN?",
        options: ["1-10 meters", "100-1000 meters", "1-10 kilometers", "100-1000 kilometers"],
        correct: 2,
        difficulty: "basic"
    },
    {
        question: "Which technology is commonly used in MAN?",
        options: ["Fiber optic", "Bluetooth", "Wi-Fi", "Satellite"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is a WAN used for?",
        options: ["Connecting large geographical areas", "Connecting a room", "Connecting a building", "Connecting a city"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is the Internet an example of?",
        options: ["LAN", "MAN", "WAN", "PAN"],
        correct: 2,
        difficulty: "basic"
    },
    {
        question: "Which technology is commonly used in WAN?",
        options: ["Satellite", "Bluetooth", "Wi-Fi", "Ethernet"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is a Wi-Fi router?",
        options: ["Device that provides wireless internet", "Device that provides wired internet", "Device that provides satellite internet", "Device that provides mobile internet"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is a Wi-Fi hotspot?",
        options: ["A location with wireless internet", "A type of router", "A type of cable", "A type of modem"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is Wi-Fi security?",
        options: ["Protecting wireless network", "Protecting wired network", "Protecting satellite network", "Protecting mobile network"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is the typical range of Bluetooth?",
        options: ["1-10 meters", "100-1000 meters", "1-10 kilometers", "100-1000 kilometers"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "Which devices commonly use Bluetooth?",
        options: ["Headphones", "Servers", "Routers", "Satellites"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is Bluetooth pairing?",
        options: ["Connecting two devices", "Disconnecting devices", "Updating devices", "Charging devices"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is cloud storage?",
        options: ["Local hard drive storage", "Online storage service", "RAM storage", "ROM storage"],
        correct: 1,
        difficulty: "basic"
    },
    {
        question: "What is SaaS?",
        options: ["Software as a Service", "System as a Service", "Storage as a Service", "Security as a Service"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is IaaS?",
        options: ["Infrastructure as a Service", "Internet as a Service", "Information as a Service", "Input as a Service"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is PaaS?",
        options: ["Platform as a Service", "Program as a Service", "Process as a Service", "Protocol as a Service"],
        correct: 0,
        difficulty: "basic"
    },
    // More Computer Characteristics
    {
        question: "What is automation as a computer characteristic?",
        options: ["Computer can work automatically", "Computer is automatic", "Computer works alone", "Computer is self-operating"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is reliability as a computer characteristic?",
        options: ["Computer is dependable", "Computer is reliable", "Computer works consistently", "Computer is trustworthy"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is scalability as a computer characteristic?",
        options: ["Computer can grow", "Computer can expand", "Computer can handle more work", "Computer can increase capacity"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is connectivity as a computer characteristic?",
        options: ["Computer can connect to others", "Computer is connected", "Computer can network", "Computer can communicate"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is accessibility as a computer characteristic?",
        options: ["Computer is easy to use", "Computer is accessible", "Computer is available", "Computer is reachable"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is efficiency as a computer characteristic?",
        options: ["Computer works quickly and effectively", "Computer is fast", "Computer is quick", "Computer is speedy"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is consistency as a computer characteristic?",
        options: ["Computer works the same way every time", "Computer is consistent", "Computer is reliable", "Computer is dependable"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is precision as a computer characteristic?",
        options: ["Computer is very accurate", "Computer is precise", "Computer is exact", "Computer is perfect"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is memory as a computer characteristic?",
        options: ["Computer can remember information", "Computer has memory", "Computer stores data", "Computer recalls data"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is processing as a computer characteristic?",
        options: ["Computer can process data", "Computer processes information", "Computer handles data", "Computer works with data"],
        correct: 0,
        difficulty: "basic"
    },
    // More Cybercrimes
    {
        question: "What is online harassment?",
        options: ["Bullying someone online", "Playing games online", "Using social media", "Sending emails"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is digital harassment?",
        options: ["Harassment through digital means", "Using digital devices", "Playing digital games", "Using digital tools"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What should you do if you're cyberstalked?",
        options: ["Ignore it", "Report to authorities", "Fight back online", "Delete your accounts"],
        correct: 1,
        difficulty: "basic"
    },
    {
        question: "What is the impact of cyberstalking?",
        options: ["Mental and emotional harm", "Physical harm", "Financial gain", "Social benefit"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is a phishing email?",
        options: ["A fake email to steal information", "A regular email", "A spam email", "A virus email"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is a phishing website?",
        options: ["A fake website to steal information", "A regular website", "A secure website", "A virus website"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What information do phishers try to steal?",
        options: ["Passwords and personal data", "Games", "Music", "Photos"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "How can you identify phishing?",
        options: ["Check email address and links", "Ignore all emails", "Click all links", "Share all information"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is a computer virus?",
        options: ["A type of malware", "A type of bacteria", "A type of software", "A type of hardware"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is spyware?",
        options: ["Software that spies on users", "Software that protects users", "Software that helps users", "Software that educates users"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is ransomware?",
        options: ["Software that demands payment", "Software that protects data", "Software that encrypts data", "Software that deletes data"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is identity theft?",
        options: ["Stealing someone's personal information", "Stealing someone's computer", "Stealing someone's money", "Stealing someone's files"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is data breach?",
        options: ["Unauthorized access to data", "Authorized access to data", "Creating data", "Deleting data"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is cyberbullying?",
        options: ["Bullying through technology", "Bullying in person", "Playing games", "Using social media"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is online fraud?",
        options: ["Deception for financial gain", "Playing games online", "Using social media", "Sending emails"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is digital piracy?",
        options: ["Illegal copying of digital content", "Legal copying of digital content", "Creating digital content", "Sharing digital content"],
        correct: 0,
        difficulty: "basic"
    }
];

async function addMoreGrade9Questions() {
    try {
        console.log('📚 ADDING MORE GRADE 9 QUESTIONS');
        console.log('='.repeat(60));

        let totalAdded = 0;

        for (const questionData of additionalGrade9Questions) {
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

        console.log(`\n🎉 SUCCESS: Added ${totalAdded} more questions for Grade 9`);
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
