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

const grade8Questions = [
    // Computer Memory
    { question: "What does RAM stand for?", options: ["Random Access Memory", "Read Access Memory", "Random Available Memory", "Read Available Memory"], correct: 0, difficulty: "basic" },
    { question: "What does ROM stand for?", options: ["Read Only Memory", "Random Only Memory", "Read Open Memory", "Random Open Memory"], correct: 0, difficulty: "basic" },
    { question: "Which type of memory is volatile?", options: ["RAM", "ROM", "Hard Drive", "SSD"], correct: 0, difficulty: "basic" },
    { question: "Which type of memory is non-volatile?", options: ["ROM", "RAM", "Cache", "Virtual Memory"], correct: 0, difficulty: "basic" },
    { question: "What happens to RAM when the computer is turned off?", options: ["Data is lost", "Data is saved", "Data is moved to ROM", "Data is backed up"], correct: 0, difficulty: "basic" },
    { question: "What is cache memory?", options: ["Fast temporary storage", "Slow permanent storage", "External storage", "Network storage"], correct: 0, difficulty: "basic" },
    { question: "Where is cache memory located?", options: ["Close to CPU", "Far from CPU", "In hard drive", "In network"], correct: 0, difficulty: "basic" },
    { question: "What is virtual memory?", options: ["Using hard drive as RAM", "Using RAM as hard drive", "Using cache as RAM", "Using ROM as RAM"], correct: 0, difficulty: "basic" },
    { question: "Why is virtual memory used?", options: ["When RAM is full", "When hard drive is full", "When cache is full", "When ROM is full"], correct: 0, difficulty: "basic" },
    { question: "Which memory type is fastest?", options: ["Cache", "RAM", "ROM", "Hard Drive"], correct: 0, difficulty: "basic" },

    // RAM vs ROM
    { question: "Which memory can be written to and read from?", options: ["RAM", "ROM", "Both RAM and ROM", "Neither RAM nor ROM"], correct: 0, difficulty: "basic" },
    { question: "Which memory is used to store BIOS?", options: ["ROM", "RAM", "Cache", "Virtual Memory"], correct: 0, difficulty: "basic" },
    { question: "Which memory is used for running programs?", options: ["RAM", "ROM", "Cache", "Hard Drive"], correct: 0, difficulty: "basic" },
    { question: "Which memory is permanent?", options: ["ROM", "RAM", "Cache", "Virtual Memory"], correct: 0, difficulty: "basic" },
    { question: "Which memory is temporary?", options: ["RAM", "ROM", "Hard Drive", "SSD"], correct: 0, difficulty: "basic" },

    // Networking Basics
    { question: "What does LAN stand for?", options: ["Local Area Network", "Large Area Network", "Long Area Network", "Limited Area Network"], correct: 0, difficulty: "basic" },
    { question: "What does WAN stand for?", options: ["Wide Area Network", "World Area Network", "Web Area Network", "Wireless Area Network"], correct: 0, difficulty: "basic" },
    { question: "Which network covers a small area?", options: ["LAN", "WAN", "MAN", "PAN"], correct: 0, difficulty: "basic" },
    { question: "Which network covers a large area?", options: ["WAN", "LAN", "MAN", "PAN"], correct: 0, difficulty: "basic" },
    { question: "What is an IP address?", options: ["Internet Protocol address", "Internet Provider address", "Internet Port address", "Internet Path address"], correct: 0, difficulty: "basic" },
    { question: "What is a MAC address?", options: ["Media Access Control address", "Memory Access Control address", "Main Access Control address", "Mode Access Control address"], correct: 0, difficulty: "basic" },
    { question: "Which address is unique to each device?", options: ["MAC address", "IP address", "Both", "Neither"], correct: 0, difficulty: "basic" },
    { question: "What is the purpose of an IP address?", options: ["Identify devices on network", "Identify devices on internet", "Both", "Neither"], correct: 0, difficulty: "basic" },
    { question: "What is a router?", options: ["Network device that forwards data", "Storage device", "Processing device", "Display device"], correct: 0, difficulty: "basic" },
    { question: "What is a switch?", options: ["Network device that connects devices", "Storage device", "Processing device", "Display device"], correct: 0, difficulty: "basic" },

    // Cloud Computing
    { question: "What is cloud computing?", options: ["Computing over the internet", "Computing on local devices", "Computing in space", "Computing underwater"], correct: 0, difficulty: "basic" },
    { question: "What is cloud storage?", options: ["Storage over the internet", "Storage on local devices", "Storage in space", "Storage underwater"], correct: 0, difficulty: "basic" },
    { question: "Which is an example of cloud storage?", options: ["Google Drive", "Local hard drive", "USB drive", "CD-ROM"], correct: 0, difficulty: "basic" },
    { question: "What is the advantage of cloud storage?", options: ["Access from anywhere", "Faster access", "Cheaper storage", "All of the above"], correct: 3, difficulty: "basic" },
    { question: "Which cloud service is by Google?", options: ["Google Drive", "OneDrive", "Dropbox", "iCloud"], correct: 0, difficulty: "basic" },
    { question: "Which cloud service is by Microsoft?", options: ["OneDrive", "Google Drive", "Dropbox", "iCloud"], correct: 0, difficulty: "basic" },
    { question: "What is SaaS?", options: ["Software as a Service", "Storage as a Service", "System as a Service", "Server as a Service"], correct: 0, difficulty: "basic" },
    { question: "What is IaaS?", options: ["Infrastructure as a Service", "Internet as a Service", "Information as a Service", "Interface as a Service"], correct: 0, difficulty: "basic" },
    { question: "What is PaaS?", options: ["Platform as a Service", "Program as a Service", "Process as a Service", "Protocol as a Service"], correct: 0, difficulty: "basic" },

    // HTML Basics
    { question: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Markup Language", "HyperText Makeup Language", "HighText Makeup Language"], correct: 0, difficulty: "basic" },
    { question: "What is the basic structure of an HTML document?", options: ["<!DOCTYPE html><html><head><body>", "<html><head><body>", "<!DOCTYPE><html>", "<document><html>"], correct: 0, difficulty: "basic" },
    { question: "Which HTML tag contains the page title?", options: ["<title>", "<head>", "<header>", "<name>"], correct: 0, difficulty: "basic" },
    { question: "Which HTML tag is used for paragraphs?", options: ["<p>", "<para>", "<text>", "<div>"], correct: 0, difficulty: "basic" },
    { question: "Which HTML tag is used for headings?", options: ["<h1> to <h6>", "<head>", "<header>", "<title>"], correct: 0, difficulty: "basic" },
    { question: "Which HTML tag is used for links?", options: ["<a>", "<link>", "<href>", "<url>"], correct: 0, difficulty: "basic" },
    { question: "Which HTML tag is used for images?", options: ["<img>", "<image>", "<picture>", "<photo>"], correct: 0, difficulty: "basic" },
    { question: "Which HTML tag is used for lists?", options: ["<ul> and <ol>", "<list>", "<item>", "<li>"], correct: 0, difficulty: "basic" },
    { question: "Which HTML tag is used for line breaks?", options: ["<br>", "<break>", "<lb>", "<newline>"], correct: 0, difficulty: "basic" },
    { question: "Which HTML tag is used for bold text?", options: ["<b> or <strong>", "<bold>", "<heavy>", "<dark>"], correct: 0, difficulty: "basic" },

    // Simple Algorithms & Flowcharts
    { question: "What is an algorithm?", options: ["Step-by-step problem solving", "Computer program", "Mathematical formula", "Random process"], correct: 0, difficulty: "basic" },
    { question: "What is a flowchart?", options: ["Visual representation of algorithm", "Computer program", "Mathematical formula", "Random process"], correct: 0, difficulty: "basic" },
    { question: "What shape represents start/end in flowchart?", options: ["Oval", "Rectangle", "Diamond", "Circle"], correct: 0, difficulty: "basic" },
    { question: "What shape represents process in flowchart?", options: ["Rectangle", "Oval", "Diamond", "Circle"], correct: 0, difficulty: "basic" },
    { question: "What shape represents decision in flowchart?", options: ["Diamond", "Rectangle", "Oval", "Circle"], correct: 0, difficulty: "basic" },
    { question: "What is the first step in problem solving?", options: ["Understand the problem", "Write code", "Test the solution", "Deploy the solution"], correct: 0, difficulty: "basic" },
    { question: "What is the last step in problem solving?", options: ["Test and verify", "Understand the problem", "Write code", "Deploy the solution"], correct: 0, difficulty: "basic" },
    { question: "What is pseudocode?", options: ["Informal program description", "Computer program", "Mathematical formula", "Random process"], correct: 0, difficulty: "basic" },
    { question: "What is the purpose of algorithms?", options: ["Solve problems efficiently", "Make computers faster", "Save memory", "All of the above"], correct: 3, difficulty: "basic" },
    { question: "What is the purpose of flowcharts?", options: ["Visualize algorithms", "Make programs faster", "Save memory", "All of the above"], correct: 0, difficulty: "basic" },

    // Cyber Ethics & Digital Footprint
    { question: "What is cyber ethics?", options: ["Ethical behavior online", "Computer programming", "Internet security", "Data storage"], correct: 0, difficulty: "basic" },
    { question: "What is a digital footprint?", options: ["Online activity trail", "Computer virus", "Internet connection", "Data backup"], correct: 0, difficulty: "basic" },
    { question: "What should you do with personal information online?", options: ["Keep it private", "Share with everyone", "Ignore it", "Delete it"], correct: 0, difficulty: "basic" },
    { question: "What is cyberbullying?", options: ["Online harassment", "Computer virus", "Internet error", "Data loss"], correct: 0, difficulty: "basic" },
    { question: "What should you do if you see cyberbullying?", options: ["Report it", "Ignore it", "Join in", "Share it"], correct: 0, difficulty: "basic" },
    { question: "What is plagiarism?", options: ["Copying someone else's work", "Creating original work", "Sharing information", "Learning online"], correct: 0, difficulty: "basic" },
    { question: "What should you do before sharing information online?", options: ["Verify it", "Ignore it", "Share immediately", "Delete it"], correct: 0, difficulty: "basic" },
    { question: "What is responsible internet use?", options: ["Being respectful online", "Using internet all day", "Ignoring others", "Sharing everything"], correct: 0, difficulty: "basic" },
    { question: "What is online privacy?", options: ["Keeping personal information safe", "Sharing everything", "Ignoring security", "Using public computers"], correct: 0, difficulty: "basic" },
    { question: "What should you do with strong passwords?", options: ["Keep them safe", "Share with friends", "Write them down publicly", "Use simple ones"], correct: 0, difficulty: "basic" },

    // Introduction to Databases
    { question: "What is a database?", options: ["Organized collection of data", "Computer program", "Internet website", "Storage device"], correct: 0, difficulty: "basic" },
    { question: "What is a table in a database?", options: ["Collection of related data", "Computer screen", "Internet page", "Storage file"], correct: 0, difficulty: "basic" },
    { question: "What is a record in a database?", options: ["Row of data", "Column of data", "Table of data", "File of data"], correct: 0, difficulty: "basic" },
    { question: "What is a field in a database?", options: ["Column of data", "Row of data", "Table of data", "File of data"], correct: 0, difficulty: "basic" },
    { question: "What is a primary key?", options: ["Unique identifier", "Data type", "Table name", "Field name"], correct: 0, difficulty: "basic" },
    { question: "What is SQL?", options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"], correct: 0, difficulty: "basic" },
    { question: "What is the purpose of a database?", options: ["Store and retrieve data", "Play games", "Send emails", "Browse internet"], correct: 0, difficulty: "basic" },
    { question: "What is data integrity?", options: ["Accuracy of data", "Speed of data", "Size of data", "Type of data"], correct: 0, difficulty: "basic" },
    { question: "What is a query?", options: ["Request for data", "Type of data", "Name of table", "Name of field"], correct: 0, difficulty: "basic" },
    { question: "What is normalization?", options: ["Organizing data efficiently", "Making data bigger", "Making data smaller", "Deleting data"], correct: 0, difficulty: "basic" },

    // Open Source vs Proprietary Software
    { question: "What is open source software?", options: ["Software with public source code", "Free software", "Expensive software", "Simple software"], correct: 0, difficulty: "basic" },
    { question: "What is proprietary software?", options: ["Software with private source code", "Free software", "Open software", "Simple software"], correct: 0, difficulty: "basic" },
    { question: "Which software can be modified by users?", options: ["Open source", "Proprietary", "Both", "Neither"], correct: 0, difficulty: "basic" },
    { question: "Which software is usually free?", options: ["Open source", "Proprietary", "Both", "Neither"], correct: 0, difficulty: "basic" },
    { question: "Which is an example of open source software?", options: ["Linux", "Windows", "macOS", "iOS"], correct: 0, difficulty: "basic" },
    { question: "Which is an example of proprietary software?", options: ["Windows", "Linux", "Ubuntu", "Firefox"], correct: 0, difficulty: "basic" },
    { question: "What is the advantage of open source software?", options: ["Community development", "Lower cost", "More customization", "All of the above"], correct: 3, difficulty: "basic" },
    { question: "What is the advantage of proprietary software?", options: ["Professional support", "Better security", "Easier to use", "All of the above"], correct: 3, difficulty: "basic" },
    { question: "What is a license in software?", options: ["Permission to use software", "Software cost", "Software name", "Software type"], correct: 0, difficulty: "basic" },
    { question: "What is the GPL license?", options: ["GNU General Public License", "General Public License", "Global Public License", "General Private License"], correct: 0, difficulty: "basic" },

    // Additional Computer Memory Questions
    { question: "What is the main memory of a computer?", options: ["RAM", "ROM", "Hard Drive", "SSD"], correct: 0, difficulty: "basic" },
    { question: "What is the boot memory of a computer?", options: ["ROM", "RAM", "Hard Drive", "SSD"], correct: 0, difficulty: "basic" },
    { question: "What is memory hierarchy?", options: ["Different levels of memory", "Memory types", "Memory sizes", "Memory speeds"], correct: 0, difficulty: "basic" },
    { question: "What is memory capacity?", options: ["Amount of data memory can hold", "Speed of memory", "Type of memory", "Location of memory"], correct: 0, difficulty: "basic" },
    { question: "What is memory speed?", options: ["How fast memory can be accessed", "Size of memory", "Type of memory", "Location of memory"], correct: 0, difficulty: "basic" },

    // Additional Networking Questions
    { question: "What is a network?", options: ["Connected computers", "Single computer", "Internet connection", "Software program"], correct: 0, difficulty: "basic" },
    { question: "What is a server?", options: ["Computer that provides services", "Computer that uses services", "Network device", "Storage device"], correct: 0, difficulty: "basic" },
    { question: "What is a client?", options: ["Computer that uses services", "Computer that provides services", "Network device", "Storage device"], correct: 0, difficulty: "basic" },
    { question: "What is bandwidth?", options: ["Data transfer capacity", "Network speed", "Internet connection", "Computer memory"], correct: 0, difficulty: "basic" },
    { question: "What is latency?", options: ["Delay in data transmission", "Speed of data transmission", "Amount of data", "Type of data"], correct: 0, difficulty: "basic" },

    // Additional Cloud Computing Questions
    { question: "What is scalability in cloud computing?", options: ["Ability to grow or shrink", "Speed of service", "Cost of service", "Type of service"], correct: 0, difficulty: "basic" },
    { question: "What is elasticity in cloud computing?", options: ["Automatic scaling", "Manual scaling", "Fixed scaling", "No scaling"], correct: 0, difficulty: "basic" },
    { question: "What is a cloud provider?", options: ["Company that offers cloud services", "Cloud user", "Cloud device", "Cloud software"], correct: 0, difficulty: "basic" },
    { question: "What is a cloud user?", options: ["Person using cloud services", "Cloud provider", "Cloud device", "Cloud software"], correct: 0, difficulty: "basic" },
    { question: "What is cloud security?", options: ["Protection of cloud data", "Cloud speed", "Cloud cost", "Cloud type"], correct: 0, difficulty: "basic" },

    // Additional HTML Questions
    { question: "What is the purpose of HTML?", options: ["Structure web pages", "Style web pages", "Program web pages", "Host web pages"], correct: 0, difficulty: "basic" },
    { question: "What is a web browser?", options: ["Program to view web pages", "Web page", "Web server", "Web address"], correct: 0, difficulty: "basic" },
    { question: "What is a web server?", options: ["Computer that hosts websites", "Web browser", "Web page", "Web address"], correct: 0, difficulty: "basic" },
    { question: "What is a URL?", options: ["Web address", "Web page", "Web browser", "Web server"], correct: 0, difficulty: "basic" },
    { question: "What is HTTP?", options: ["Protocol for web communication", "Web address", "Web page", "Web browser"], correct: 0, difficulty: "basic" },

    // Additional Algorithm Questions
    { question: "What is a sequence in algorithms?", options: ["Ordered steps", "Random steps", "Repeated steps", "Conditional steps"], correct: 0, difficulty: "basic" },
    { question: "What is selection in algorithms?", options: ["Making decisions", "Repeating steps", "Ordering steps", "Random steps"], correct: 0, difficulty: "basic" },
    { question: "What is iteration in algorithms?", options: ["Repeating steps", "Making decisions", "Ordering steps", "Random steps"], correct: 0, difficulty: "basic" },
    { question: "What is a variable in algorithms?", options: ["Storage for data", "Type of data", "Name of data", "Size of data"], correct: 0, difficulty: "basic" },
    { question: "What is a constant in algorithms?", options: ["Fixed value", "Changing value", "Type of value", "Name of value"], correct: 0, difficulty: "basic" },

    // Additional Cyber Ethics Questions
    { question: "What is digital citizenship?", options: ["Responsible online behavior", "Online shopping", "Online gaming", "Online learning"], correct: 0, difficulty: "basic" },
    { question: "What is online safety?", options: ["Protecting yourself online", "Using internet", "Sharing information", "Playing games"], correct: 0, difficulty: "basic" },
    { question: "What is digital literacy?", options: ["Ability to use digital technology", "Reading online", "Writing online", "Playing online"], correct: 0, difficulty: "basic" },
    { question: "What is information literacy?", options: ["Finding and evaluating information", "Reading information", "Writing information", "Sharing information"], correct: 0, difficulty: "basic" },
    { question: "What is media literacy?", options: ["Understanding media messages", "Watching media", "Creating media", "Sharing media"], correct: 0, difficulty: "basic" },

    // Additional Database Questions
    { question: "What is a database management system?", options: ["Software to manage databases", "Database type", "Database name", "Database size"], correct: 0, difficulty: "basic" },
    { question: "What is data redundancy?", options: ["Duplicate data", "Missing data", "Correct data", "Wrong data"], correct: 0, difficulty: "basic" },
    { question: "What is data consistency?", options: ["Uniform data format", "Data size", "Data type", "Data name"], correct: 0, difficulty: "basic" },
    { question: "What is a foreign key?", options: ["Reference to another table", "Primary key", "Data type", "Field name"], correct: 0, difficulty: "basic" },
    { question: "What is indexing?", options: ["Faster data retrieval", "Data storage", "Data backup", "Data deletion"], correct: 0, difficulty: "basic" },

    // Additional Software Questions
    { question: "What is freeware?", options: ["Free proprietary software", "Open source software", "Expensive software", "Simple software"], correct: 0, difficulty: "basic" },
    { question: "What is shareware?", options: ["Trial software", "Free software", "Open software", "Simple software"], correct: 0, difficulty: "basic" },
    { question: "What is malware?", options: ["Harmful software", "Good software", "Free software", "Open software"], correct: 0, difficulty: "basic" },
    { question: "What is spyware?", options: ["Software that spies", "Security software", "Free software", "Open software"], correct: 0, difficulty: "basic" },
    { question: "What is adware?", options: ["Software with ads", "Security software", "Free software", "Open software"], correct: 0, difficulty: "basic" }
];

async function addGrade8Questions() {
    try {
        console.log('Starting to add Grade 8 questions...');
        let addedCount = 0;

        for (const questionData of grade8Questions) {
            try {
                // Insert question
                const questionResult = await queryDatabase(
                    'INSERT INTO questions (grade, difficulty, question_text, created_at, updated_at) VALUES (?, ?, ?, datetime("now"), datetime("now"))',
                    [8, questionData.difficulty, questionData.question]
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

        console.log(`\n✅ Successfully added ${addedCount} questions for Grade 8!`);
        await showFinalStatistics();
        
    } catch (error) {
        console.error('Error adding Grade 8 questions:', error);
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
        
        const grade8Count = await queryDatabase("SELECT COUNT(*) as count FROM questions WHERE grade = 8");
        console.log(`Grade 8 Questions: ${grade8Count[0].count} (Target: 150+)`);
        
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
addGrade8Questions();
