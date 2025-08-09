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
    console.log('📚 Adding 150 Grade 9 questions...\n');
    
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
        question: "What is the final stage of the project cycle?",
        options: ["Planning", "Implementation", "Evaluation", "Design"],
        correct: 2,
        difficulty: "basic"
    },
    {
        question: "What is project ethics?",
        options: ["Making projects look good", "Following moral principles in project development", "Completing projects quickly", "Using expensive tools"],
        correct: 1,
        difficulty: "basic"
    },
    {
        question: "What is the purpose of project evaluation?",
        options: ["To find mistakes", "To assess project success and learn for future", "To criticize work", "To finish quickly"],
        correct: 1,
        difficulty: "basic"
    },
    // Python Programming - Basic
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
    // Python Control Structures
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
    // Python Functions
    {
        question: "What is a function in Python?",
        options: ["A variable", "A reusable block of code", "A loop", "A condition"],
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
    // Python Data Structures
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
    {
        question: "What is a dictionary in Python?",
        options: ["A book", "A key-value pair collection", "A list", "A function"],
        correct: 1,
        difficulty: "basic"
    },
    // Office Tools - Word Processing
    {
        question: "What is Microsoft Word used for?",
        options: ["Creating spreadsheets", "Creating documents", "Creating presentations", "Creating databases"],
        correct: 1,
        difficulty: "basic"
    },
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
    // Office Tools - Spreadsheets
    {
        question: "What is Microsoft Excel used for?",
        options: ["Creating documents", "Creating spreadsheets", "Creating presentations", "Creating databases"],
        correct: 1,
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
    // Office Tools - Presentations
    {
        question: "What is Microsoft PowerPoint used for?",
        options: ["Creating documents", "Creating spreadsheets", "Creating presentations", "Creating databases"],
        correct: 2,
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
    // Networking - PAN
    {
        question: "What does PAN stand for?",
        options: ["Personal Area Network", "Public Area Network", "Private Area Network", "Portable Area Network"],
        correct: 0,
        difficulty: "basic"
    },
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
        question: "Which device is commonly connected in a PAN?",
        options: ["Smartphone", "Server", "Router", "Satellite"],
        correct: 0,
        difficulty: "basic"
    },
    // Networking - LAN
    {
        question: "What does LAN stand for?",
        options: ["Local Area Network", "Large Area Network", "Limited Area Network", "Long Area Network"],
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
    // Networking - MAN
    {
        question: "What does MAN stand for?",
        options: ["Metropolitan Area Network", "Major Area Network", "Medium Area Network", "Mobile Area Network"],
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
        question: "What connects multiple LANs in a MAN?",
        options: ["Routers", "Switches", "Hubs", "Modems"],
        correct: 0,
        difficulty: "basic"
    },
    // Networking - WAN
    {
        question: "What does WAN stand for?",
        options: ["Wide Area Network", "World Area Network", "Wireless Area Network", "Web Area Network"],
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
        question: "What connects different cities in a WAN?",
        options: ["Telecommunication lines", "Bluetooth", "Wi-Fi", "Ethernet cables"],
        correct: 0,
        difficulty: "basic"
    },
    // Networking - Wi-Fi
    {
        question: "What does Wi-Fi stand for?",
        options: ["Wireless Fidelity", "Wired Fidelity", "World Fidelity", "Web Fidelity"],
        correct: 0,
        difficulty: "basic"
    },
    {
        question: "What is Wi-Fi used for?",
        options: ["Wireless internet connection", "Wired internet connection", "Satellite connection", "Mobile connection"],
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
    // Networking - Bluetooth
    {
        question: "What is Bluetooth used for?",
        options: ["Short-range wireless communication", "Long-range wireless communication", "Wired communication", "Satellite communication"],
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
        question: "What is Bluetooth tethering?",
        options: ["Sharing internet connection", "Sharing files", "Sharing music", "Sharing photos"],
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
    // Characteristics of a Computer
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
    // Cybercrimes - Stalking
    {
        question: "What is cyberstalking?",
        options: ["Following someone online", "Harassing someone through technology", "Playing games online", "Using social media"],
        correct: 1,
        difficulty: "basic"
    },
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
    // Cybercrimes - Phishing
    {
        question: "What is phishing?",
        options: ["A type of fish", "A cyber attack to steal information", "A computer game", "A type of software"],
        correct: 1,
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
    // Cybercrimes - Malware
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
    // Additional Python Questions
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
    // Additional Office Tools Questions
    {
        question: "What is a table in Word?",
        options: ["Organized data in rows and columns", "A type of chart", "A type of graph", "A type of image"],
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
        question: "What is a macro in Office?",
        options: ["Automated sequence of actions", "A type of document", "A type of template", "A type of theme"],
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
    // Additional Networking Questions
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
    // Additional Cybercrime Questions
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

async function addGrade9Questions() {
    try {
        console.log('📚 ADDING 150 GRADE 9 QUESTIONS');
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
