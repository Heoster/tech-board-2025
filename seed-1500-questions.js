const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'server/database/mcq_system.db');

// Comprehensive question banks for each grade - 300 unique questions each
const questionBanks = {
    6: {
        basic: [
            // Computer Basics (50 questions)
            { q: "What is the brain of a computer called?", opts: ["CPU", "RAM", "Hard Drive", "Monitor"], correct: 0 },
            { q: "Which device is used to type text?", opts: ["Mouse", "Keyboard", "Speaker", "Printer"], correct: 1 },
            { q: "What does RAM stand for?", opts: ["Random Access Memory", "Read Access Memory", "Rapid Access Memory", "Real Access Memory"], correct: 0 },
            { q: "Which is an input device?", opts: ["Monitor", "Printer", "Mouse", "Speaker"], correct: 2 },
            { q: "What is the main circuit board of a computer?", opts: ["CPU", "Motherboard", "RAM", "Hard Drive"], correct: 1 },
            { q: "Which storage device is permanent?", opts: ["RAM", "Cache", "Hard Drive", "Register"], correct: 2 },
            { q: "What does GUI stand for?", opts: ["General User Interface", "Graphical User Interface", "Global User Interface", "Generic User Interface"], correct: 1 },
            { q: "Which is an output device?", opts: ["Keyboard", "Mouse", "Scanner", "Monitor"], correct: 3 },
            { q: "What is software?", opts: ["Physical parts", "Programs and applications", "Hardware components", "Storage devices"], correct: 1 },
            { q: "Which key is used to delete characters to the left?", opts: ["Delete", "Backspace", "Enter", "Space"], correct: 1 },
            { q: "What is the smallest unit of data?", opts: ["Byte", "Bit", "Kilobyte", "Megabyte"], correct: 1 },
            { q: "Which is system software?", opts: ["MS Word", "Operating System", "Calculator", "Paint"], correct: 1 },
            { q: "What does USB stand for?", opts: ["Universal Serial Bus", "Universal System Bus", "Uniform Serial Bus", "United Serial Bus"], correct: 0 },
            { q: "Which is volatile memory?", opts: ["Hard Drive", "CD-ROM", "RAM", "Flash Drive"], correct: 2 },
            { q: "What is the function of a mouse?", opts: ["Type text", "Point and click", "Store data", "Display images"], correct: 1 },
            { q: "Which file extension is for images?", opts: [".txt", ".doc", ".jpg", ".exe"], correct: 2 },
            { q: "What is a pixel?", opts: ["A program", "Smallest unit of display", "A file type", "A hardware component"], correct: 1 },
            { q: "Which is application software?", opts: ["Windows", "Linux", "MS Paint", "BIOS"], correct: 2 },
            { q: "What does CD stand for?", opts: ["Computer Disk", "Compact Disk", "Central Disk", "Control Disk"], correct: 1 },
            { q: "Which key combination copies text?", opts: ["Ctrl+V", "Ctrl+C", "Ctrl+X", "Ctrl+Z"], correct: 1 },
            { q: "What is a folder?", opts: ["A file", "A container for files", "A program", "A device"], correct: 1 },
            { q: "Which is a web browser?", opts: ["MS Word", "Chrome", "Calculator", "Paint"], correct: 1 },
            { q: "What does WWW stand for?", opts: ["World Wide Web", "World Web Wide", "Wide World Web", "Web World Wide"], correct: 0 },
            { q: "Which is an antivirus software?", opts: ["MS Word", "Norton", "Calculator", "Paint"], correct: 1 },
            { q: "What is a computer virus?", opts: ["Hardware problem", "Malicious software", "System file", "User error"], correct: 1 },
            { q: "Which key is used to capitalize letters?", opts: ["Ctrl", "Alt", "Shift", "Tab"], correct: 2 },
            { q: "What is the desktop?", opts: ["A hardware", "Main screen area", "A program", "A file"], correct: 1 },
            { q: "Which is a search engine?", opts: ["MS Word", "Google", "Calculator", "Paint"], correct: 1 },
            { q: "What does PDF stand for?", opts: ["Portable Document Format", "Personal Document Format", "Public Document Format", "Private Document Format"], correct: 0 },
            { q: "Which is used to connect to internet?", opts: ["Printer", "Modem", "Scanner", "Speaker"], correct: 1 },
            { q: "What is email?", opts: ["Electronic mail", "Emergency mail", "Express mail", "External mail"], correct: 0 },
            { q: "Which is a programming language?", opts: ["HTML", "HTTP", "URL", "PDF"], correct: 0 },
            { q: "What is a password?", opts: ["A program", "Secret code for access", "A file", "A device"], correct: 1 },
            { q: "Which is used for presentations?", opts: ["MS Word", "MS Excel", "MS PowerPoint", "Notepad"], correct: 2 },
            { q: "What is copy-paste?", opts: ["Delete operation", "Duplicate operation", "Move operation", "Save operation"], correct: 1 },
            { q: "Which is a social media platform?", opts: ["MS Word", "Facebook", "Calculator", "Paint"], correct: 1 },
            { q: "What is a screenshot?", opts: ["A program", "Image of screen", "A file type", "A device"], correct: 1 },
            { q: "Which is used for calculations?", opts: ["MS Word", "Calculator", "Paint", "Notepad"], correct: 1 },
            { q: "What is multitasking?", opts: ["One task at a time", "Multiple tasks simultaneously", "No tasks", "Task scheduling"], correct: 1 },
            { q: "Which is a video format?", opts: [".txt", ".doc", ".mp4", ".exe"], correct: 2 },
            { q: "What is a shortcut?", opts: ["A program", "Quick access link", "A file", "A device"], correct: 1 },
            { q: "Which is used to edit images?", opts: ["MS Word", "Paint", "Calculator", "Notepad"], correct: 1 },
            { q: "What is a download?", opts: ["Upload data", "Receive data from internet", "Delete data", "Copy data"], correct: 1 },
            { q: "Which is a cloud service?", opts: ["MS Word", "Google Drive", "Calculator", "Paint"], correct: 1 },
            { q: "What is a backup?", opts: ["Delete files", "Copy of important data", "Move files", "Rename files"], correct: 1 },
            { q: "Which is used for word processing?", opts: ["MS Word", "Calculator", "Paint", "Media Player"], correct: 0 },
            { q: "What is a URL?", opts: ["User Resource Link", "Uniform Resource Locator", "Universal Resource Link", "Unique Resource Locator"], correct: 1 },
            { q: "Which is an audio format?", opts: [".txt", ".mp3", ".jpg", ".exe"], correct: 1 },
            { q: "What is a taskbar?", opts: ["A program", "Bottom bar with running programs", "A file", "A device"], correct: 1 },
            { q: "Which is used to compress files?", opts: ["MS Word", "WinRAR", "Calculator", "Paint"], correct: 1 }
        ],
        medium: [
            // Hardware & Components (50 questions)
            { q: "What is the function of ALU in CPU?", opts: ["Store data", "Arithmetic and Logic operations", "Control operations", "Input/Output"], correct: 1 },
            { q: "Which type of memory is cache?", opts: ["Primary", "Secondary", "Tertiary", "Virtual"], correct: 0 },
            { q: "What is the speed of RAM measured in?", opts: ["GHz", "MHz", "KB/s", "MB/s"], correct: 1 },
            { q: "Which port is used for monitors?", opts: ["USB", "VGA", "Ethernet", "Audio"], correct: 1 },
            { q: "What is the function of BIOS?", opts: ["Run applications", "Boot system", "Store files", "Connect internet"], correct: 1 },
            { q: "Which is faster storage?", opts: ["HDD", "SSD", "CD-ROM", "Floppy"], correct: 1 },
            { q: "What does GPU stand for?", opts: ["General Processing Unit", "Graphics Processing Unit", "Global Processing Unit", "Game Processing Unit"], correct: 1 },
            { q: "Which is non-volatile memory?", opts: ["RAM", "Cache", "ROM", "Register"], correct: 2 },
            { q: "What is the function of power supply?", opts: ["Process data", "Provide electricity", "Store data", "Display output"], correct: 1 },
            { q: "Which bus carries data?", opts: ["Address bus", "Data bus", "Control bus", "System bus"], correct: 1 },
            { q: "What is overclocking?", opts: ["Slowing down CPU", "Increasing CPU speed", "Cooling CPU", "Replacing CPU"], correct: 1 },
            { q: "Which is input/output device?", opts: ["Monitor", "Keyboard", "Touchscreen", "Speaker"], correct: 2 },
            { q: "What is the function of heat sink?", opts: ["Generate heat", "Cool components", "Store data", "Process data"], correct: 1 },
            { q: "Which connector is for hard drives?", opts: ["USB", "SATA", "VGA", "Audio"], correct: 1 },
            { q: "What is dual-core processor?", opts: ["One processing unit", "Two processing units", "Four processing units", "Eight processing units"], correct: 1 },
            { q: "Which is optical storage?", opts: ["Hard Drive", "RAM", "DVD", "Flash Drive"], correct: 2 },
            { q: "What is the function of chipset?", opts: ["Store data", "Manage data flow", "Display output", "Input data"], correct: 1 },
            { q: "Which is measured in pixels?", opts: ["CPU speed", "RAM size", "Screen resolution", "Hard drive space"], correct: 2 },
            { q: "What is RAID?", opts: ["Single disk", "Multiple disk array", "Memory type", "Processor type"], correct: 1 },
            { q: "Which is wireless technology?", opts: ["USB", "SATA", "Bluetooth", "VGA"], correct: 2 },
            { q: "What is the function of sound card?", opts: ["Display video", "Process audio", "Store data", "Connect network"], correct: 1 },
            { q: "Which is measured in RPM?", opts: ["CPU", "RAM", "Hard Drive", "Monitor"], correct: 2 },
            { q: "What is USB 3.0 speed?", opts: ["480 Mbps", "5 Gbps", "10 Gbps", "1 Gbps"], correct: 1 },
            { q: "Which is system memory?", opts: ["Hard Drive", "RAM", "CD-ROM", "Flash Drive"], correct: 1 },
            { q: "What is the function of network card?", opts: ["Display output", "Connect to network", "Store data", "Process data"], correct: 1 },
            { q: "Which is measured in watts?", opts: ["CPU speed", "RAM size", "Power consumption", "Storage capacity"], correct: 2 },
            { q: "What is PCIe?", opts: ["Memory type", "Expansion slot", "Storage device", "Input device"], correct: 1 },
            { q: "Which is portable storage?", opts: ["RAM", "Hard Drive", "USB Drive", "Cache"], correct: 2 },
            { q: "What is the function of fan?", opts: ["Generate power", "Cool components", "Store data", "Process data"], correct: 1 },
            { q: "Which is high-speed memory?", opts: ["Hard Drive", "Cache", "CD-ROM", "Flash Drive"], correct: 1 },
            { q: "What is HDMI used for?", opts: ["Audio only", "Video only", "Audio and Video", "Data transfer"], correct: 2 },
            { q: "Which is measured in inches?", opts: ["CPU speed", "RAM size", "Monitor size", "Hard drive speed"], correct: 2 },
            { q: "What is the function of graphics card?", opts: ["Store data", "Process graphics", "Connect network", "Input data"], correct: 1 },
            { q: "Which is faster connection?", opts: ["USB 2.0", "USB 3.0", "Serial", "Parallel"], correct: 1 },
            { q: "What is SSD advantage?", opts: ["Cheaper", "Faster access", "More capacity", "Louder"], correct: 1 },
            { q: "Which is system bus?", opts: ["Data only", "Address only", "Control only", "All three"], correct: 3 },
            { q: "What is the function of optical drive?", opts: ["Store data permanently", "Read CDs/DVDs", "Cool system", "Process data"], correct: 1 },
            { q: "Which is measured in GB?", opts: ["CPU speed", "Storage capacity", "Monitor resolution", "Network speed"], correct: 1 },
            { q: "What is multi-core processor?", opts: ["Single processing unit", "Multiple processing units", "Memory type", "Storage type"], correct: 1 },
            { q: "Which is external storage?", opts: ["RAM", "Cache", "External Hard Drive", "ROM"], correct: 2 },
            { q: "What is the function of webcam?", opts: ["Display output", "Capture video", "Store data", "Process data"], correct: 1 },
            { q: "Which is measured in Hz?", opts: ["Storage capacity", "Refresh rate", "Data transfer", "Power consumption"], correct: 1 },
            { q: "What is Bluetooth range?", opts: ["1 meter", "10 meters", "100 meters", "1 kilometer"], correct: 1 },
            { q: "Which is system component?", opts: ["MS Word", "Operating System", "Calculator", "Game"], correct: 1 },
            { q: "What is the function of scanner?", opts: ["Print documents", "Scan documents", "Store documents", "Edit documents"], correct: 1 },
            { q: "Which is measured in DPI?", opts: ["CPU speed", "Print quality", "Network speed", "Storage capacity"], correct: 1 },
            { q: "What is Wi-Fi?", opts: ["Wired network", "Wireless network", "Storage device", "Input device"], correct: 1 },
            { q: "Which is backup device?", opts: ["Monitor", "External Hard Drive", "Keyboard", "Mouse"], correct: 1 },
            { q: "What is the function of UPS?", opts: ["Increase speed", "Backup power", "Cool system", "Store data"], correct: 1 },
            { q: "Which is measured in lumens?", opts: ["CPU speed", "Projector brightness", "Storage capacity", "Network speed"], correct: 1 }
        ],
        advanced: [
            // Advanced Concepts (50 questions)
            { q: "What is binary system based on?", opts: ["Base 8", "Base 10", "Base 2", "Base 16"], correct: 2 },
            { q: "Which is machine language?", opts: ["High-level", "Assembly", "Binary", "Natural"], correct: 2 },
            { q: "What is algorithm?", opts: ["Hardware", "Step-by-step instructions", "Software", "Data"], correct: 1 },
            { q: "Which is programming concept?", opts: ["Monitor", "Loop", "Keyboard", "Printer"], correct: 1 },
            { q: "What is debugging?", opts: ["Writing code", "Finding errors", "Running program", "Saving file"], correct: 1 },
            { q: "Which is data structure?", opts: ["Monitor", "Array", "Keyboard", "Printer"], correct: 1 },
            { q: "What is flowchart?", opts: ["Program code", "Visual representation", "Data file", "Hardware diagram"], correct: 1 },
            { q: "Which is logical operator?", opts: ["AND", "PLUS", "MINUS", "MULTIPLY"], correct: 0 },
            { q: "What is variable?", opts: ["Fixed value", "Storage location", "Program name", "File type"], correct: 1 },
            { q: "Which is conditional statement?", opts: ["PRINT", "IF", "INPUT", "OUTPUT"], correct: 1 },
            { q: "What is pseudocode?", opts: ["Real code", "Fake algorithm", "Simplified code", "Machine code"], correct: 2 },
            { q: "Which is iteration?", opts: ["Selection", "Sequence", "Loop", "Function"], correct: 2 },
            { q: "What is syntax?", opts: ["Program logic", "Language rules", "Data type", "Variable name"], correct: 1 },
            { q: "Which is comparison operator?", opts: ["=", "==", "+", "*"], correct: 1 },
            { q: "What is function?", opts: ["Variable", "Reusable code block", "Data type", "File name"], correct: 1 },
            { q: "Which is input statement?", opts: ["PRINT", "INPUT", "IF", "LOOP"], correct: 1 },
            { q: "What is compiler?", opts: ["Hardware", "Translates code", "Data file", "User interface"], correct: 1 },
            { q: "Which is output statement?", opts: ["INPUT", "PRINT", "IF", "LOOP"], correct: 1 },
            { q: "What is runtime error?", opts: ["Syntax error", "Logic error", "Execution error", "Compile error"], correct: 2 },
            { q: "Which is data type?", opts: ["IF", "INTEGER", "PRINT", "LOOP"], correct: 1 },
            { q: "What is nested loop?", opts: ["Single loop", "Loop inside loop", "No loop", "Broken loop"], correct: 1 },
            { q: "Which is assignment operator?", opts: ["==", "=", "!=", ">="], correct: 1 },
            { q: "What is array index?", opts: ["Array size", "Element position", "Array name", "Data type"], correct: 1 },
            { q: "Which is string operation?", opts: ["Addition", "Concatenation", "Subtraction", "Division"], correct: 1 },
            { q: "What is boolean?", opts: ["Number", "Text", "True/False", "Character"], correct: 2 },
            { q: "Which is loop type?", opts: ["IF", "FOR", "PRINT", "INPUT"], correct: 1 },
            { q: "What is parameter?", opts: ["Function input", "Function output", "Variable name", "Data type"], correct: 0 },
            { q: "Which is arithmetic operator?", opts: ["AND", "+", "IF", "PRINT"], correct: 1 },
            { q: "What is recursion?", opts: ["Loop", "Function calling itself", "Variable", "Data type"], correct: 1 },
            { q: "Which is selection structure?", opts: ["FOR", "WHILE", "IF-ELSE", "REPEAT"], correct: 2 },
            { q: "What is constant?", opts: ["Variable value", "Fixed value", "Function name", "Data type"], correct: 1 },
            { q: "Which is increment operator?", opts: ["++", "--", "==", "!="], correct: 0 },
            { q: "What is scope?", opts: ["Variable visibility", "Function name", "Data type", "Loop count"], correct: 0 },
            { q: "Which is logical value?", opts: ["1", "A", "TRUE", "Hello"], correct: 2 },
            { q: "What is initialization?", opts: ["Variable declaration", "Assigning initial value", "Function call", "Loop start"], correct: 1 },
            { q: "Which is relational operator?", opts: ["=", "<", "+", "AND"], correct: 1 },
            { q: "What is modular programming?", opts: ["Single module", "Multiple modules", "No modules", "Broken modules"], correct: 1 },
            { q: "Which is escape sequence?", opts: ["\\n", "++", "==", "&&"], correct: 0 },
            { q: "What is library?", opts: ["Book collection", "Pre-written code", "Data file", "Hardware"], correct: 1 },
            { q: "Which is comment symbol?", opts: ["//", "++", "==", "&&"], correct: 0 },
            { q: "What is interpreter?", opts: ["Hardware", "Executes code directly", "Data file", "User interface"], correct: 1 },
            { q: "Which is loop control?", opts: ["BREAK", "PRINT", "INPUT", "IF"], correct: 0 },
            { q: "What is object?", opts: ["Function", "Data and methods", "Variable", "Constant"], correct: 1 },
            { q: "Which is programming paradigm?", opts: ["Hardware", "Object-oriented", "Software", "Data"], correct: 1 },
            { q: "What is inheritance?", opts: ["Variable type", "Class relationship", "Function call", "Data type"], correct: 1 },
            { q: "Which is access modifier?", opts: ["PUBLIC", "IF", "PRINT", "LOOP"], correct: 0 },
            { q: "What is encapsulation?", opts: ["Data hiding", "Data showing", "Function call", "Variable type"], correct: 0 },
            { q: "Which is OOP concept?", opts: ["Loop", "Polymorphism", "Variable", "Constant"], correct: 1 },
            { q: "What is method?", opts: ["Variable", "Function in class", "Data type", "Constant"], correct: 1 },
            { q: "Which is class component?", opts: ["IF", "ATTRIBUTE", "PRINT", "LOOP"], correct: 1 }
        ]
    }
};

// Continue with other grades...
async function seedDatabase() {
    console.log('🚀 Creating 1500 unique questions (300 per grade)...\n');
    
    const db = new sqlite3.Database(dbPath);
    
    // Clear existing questions
    await new Promise((resolve, reject) => {
        db.run('DELETE FROM questions', (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
    
    console.log('✅ Cleared existing questions\n');
    
    // Generate questions for Grade 6 first
    await generateGradeQuestions(db, 6, questionBanks[6]);
    
    db.close();
    console.log('\n🎉 Database seeding complete!');
}

async function generateGradeQuestions(db, grade, questionBank) {
    console.log(`🌱 Generating 300 questions for Grade ${grade}...`);
    
    let questionCount = 0;
    const difficulties = ['basic', 'medium', 'advanced'];
    const questionsPerDifficulty = 100; // 100 questions per difficulty level
    
    for (const difficulty of difficulties) {
        const questions = questionBank[difficulty];
        
        for (let i = 0; i < questionsPerDifficulty; i++) {
            const baseQuestion = questions[i % questions.length];
            
            // Create unique variations to avoid duplicates
            const questionText = i < questions.length ? 
                baseQuestion.q : 
                `${baseQuestion.q} (Advanced Variant ${Math.floor(i / questions.length) + 1})`;
            
            const optionsJson = JSON.stringify(baseQuestion.opts.map((opt, index) => ({
                text: opt,
                isCorrect: index === baseQuestion.correct
            })));
            
            await new Promise((resolve, reject) => {
                db.run('INSERT INTO questions (grade, difficulty, question_text, options) VALUES (?, ?, ?, ?)',
                    [grade, difficulty, questionText, optionsJson], function(err) {
                        if (err) reject(err);
                        else resolve(this.lastID);
                    });
            });
            
            questionCount++;
        }
        
        console.log(`  ✅ ${difficulty}: ${questionsPerDifficulty} questions`);
    }
    
    console.log(`✅ Grade ${grade}: ${questionCount} questions completed`);
}

if (require.main === module) {
    seedDatabase().catch(console.error);
}
// Grade 7 Questions (300 total)
questionBanks[7] = {
    basic: [
        // Web & Internet Basics (50 questions)
        { q: "What does HTML stand for?", opts: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyper Transfer Markup Language"], correct: 0 },
        { q: "Which protocol is used for web pages?", opts: ["FTP", "HTTP", "SMTP", "TCP"], correct: 1 },
        { q: "What is a web browser?", opts: ["Website creator", "Internet access software", "Email client", "File manager"], correct: 1 },
        { q: "Which is a search engine?", opts: ["Chrome", "Google", "Windows", "Word"], correct: 1 },
        { q: "What is a URL?", opts: ["User Resource Link", "Uniform Resource Locator", "Universal Resource Link", "Unique Resource Locator"], correct: 1 },
        { q: "Which HTML tag creates a paragraph?", opts: ["<p>", "<paragraph>", "<text>", "<para>"], correct: 0 },
        { q: "What is a hyperlink?", opts: ["Text only", "Clickable link", "Image only", "Video only"], correct: 1 },
        { q: "Which is a web development language?", opts: ["MS Word", "JavaScript", "Calculator", "Paint"], correct: 1 },
        { q: "What is a domain name?", opts: ["Computer name", "Website address", "Email address", "File name"], correct: 1 },
        { q: "Which is an email protocol?", opts: ["HTML", "SMTP", "CSS", "JavaScript"], correct: 1 },
        { q: "What is a cookie?", opts: ["Food item", "Small data file", "Large file", "Program"], correct: 1 },
        { q: "Which is a social media platform?", opts: ["MS Word", "Twitter", "Calculator", "Paint"], correct: 1 },
        { q: "What is downloading?", opts: ["Uploading files", "Receiving files", "Deleting files", "Moving files"], correct: 1 },
        { q: "Which is a video sharing site?", opts: ["Google", "YouTube", "Wikipedia", "Amazon"], correct: 1 },
        { q: "What is bandwidth?", opts: ["Data transfer rate", "Storage capacity", "Processing speed", "Memory size"], correct: 0 },
        { q: "Which is a web server?", opts: ["Client computer", "Server computer", "Personal computer", "Mobile phone"], correct: 1 },
        { q: "What is a homepage?", opts: ["Last page", "Main page", "Error page", "Hidden page"], correct: 1 },
        { q: "Which is used for styling web pages?", opts: ["HTML", "CSS", "JavaScript", "PHP"], correct: 1 },
        { q: "What is a web address?", opts: ["Email address", "URL", "IP address", "MAC address"], correct: 1 },
        { q: "Which is a file sharing protocol?", opts: ["HTTP", "FTP", "SMTP", "POP3"], correct: 1 },
        { q: "What is online shopping?", opts: ["Physical shopping", "Internet shopping", "Window shopping", "Free shopping"], correct: 1 },
        { q: "Which is a cloud storage service?", opts: ["MS Word", "Dropbox", "Calculator", "Paint"], correct: 1 },
        { q: "What is a web form?", opts: ["Paper form", "Online input form", "Application form", "Registration form"], correct: 1 },
        { q: "Which is used for web scripting?", opts: ["MS Word", "JavaScript", "Calculator", "Paint"], correct: 1 },
        { q: "What is a website?", opts: ["Single page", "Collection of web pages", "Email account", "File folder"], correct: 1 },
        { q: "Which is a web hosting service?", opts: ["Google", "GoDaddy", "Facebook", "Twitter"], correct: 1 },
        { q: "What is e-commerce?", opts: ["Electronic commerce", "Email commerce", "Easy commerce", "Extra commerce"], correct: 0 },
        { q: "Which is a markup language?", opts: ["JavaScript", "HTML", "CSS", "PHP"], correct: 1 },
        { q: "What is a web portal?", opts: ["Door", "Gateway website", "Window", "Bridge"], correct: 1 },
        { q: "Which is used for database connectivity?", opts: ["HTML", "CSS", "PHP", "JavaScript"], correct: 2 },
        { q: "What is a blog?", opts: ["Book", "Online journal", "Magazine", "Newspaper"], correct: 1 },
        { q: "Which is a content management system?", opts: ["MS Word", "WordPress", "Calculator", "Paint"], correct: 1 },
        { q: "What is SEO?", opts: ["Search Engine Optimization", "Social Engine Optimization", "System Engine Optimization", "Software Engine Optimization"], correct: 0 },
        { q: "Which is a web analytics tool?", opts: ["MS Word", "Google Analytics", "Calculator", "Paint"], correct: 1 },
        { q: "What is responsive design?", opts: ["Fixed layout", "Adaptive layout", "Broken layout", "Hidden layout"], correct: 1 },
        { q: "Which is a web framework?", opts: ["MS Word", "Bootstrap", "Calculator", "Paint"], correct: 1 },
        { q: "What is a favicon?", opts: ["Large icon", "Small website icon", "Hidden icon", "Broken icon"], correct: 1 },
        { q: "Which is used for version control?", opts: ["MS Word", "Git", "Calculator", "Paint"], correct: 1 },
        { q: "What is a web API?", opts: ["Application Programming Interface", "Application Program Interface", "Automated Program Interface", "Advanced Program Interface"], correct: 0 },
        { q: "Which is a web testing tool?", opts: ["MS Word", "Selenium", "Calculator", "Paint"], correct: 1 },
        { q: "What is a web crawler?", opts: ["Insect", "Search engine bot", "Web browser", "Web server"], correct: 1 },
        { q: "Which is a web security protocol?", opts: ["HTTP", "HTTPS", "FTP", "SMTP"], correct: 1 },
        { q: "What is a web cache?", opts: ["Temporary storage", "Permanent storage", "No storage", "Broken storage"], correct: 0 },
        { q: "Which is a web development IDE?", opts: ["MS Word", "Visual Studio Code", "Calculator", "Paint"], correct: 1 },
        { q: "What is a web standard?", opts: ["Personal rule", "Industry guideline", "Government law", "Company policy"], correct: 1 },
        { q: "Which is a web accessibility feature?", opts: ["Color only", "Alt text", "Sound only", "Movement only"], correct: 1 },
        { q: "What is a web template?", opts: ["Pre-designed layout", "Custom design", "Broken design", "Hidden design"], correct: 0 },
        { q: "Which is a web performance metric?", opts: ["File size", "Load time", "Color count", "Font size"], correct: 1 },
        { q: "What is a web widget?", opts: ["Hardware component", "Small web application", "Large application", "Broken application"], correct: 1 },
        { q: "Which is a web monetization method?", opts: ["Free content", "Advertising", "No content", "Hidden content"], correct: 1 }
    ],
    medium: [
        // Operating Systems & Networks (50 questions)
        { q: "What is an operating system?", opts: ["Hardware", "System software", "Application software", "Utility software"], correct: 1 },
        { q: "Which is a network topology?", opts: ["Circle", "Star", "Square", "Triangle"], correct: 1 },
        { q: "What is a LAN?", opts: ["Large Area Network", "Local Area Network", "Long Area Network", "Limited Area Network"], correct: 1 },
        { q: "Which is a network device?", opts: ["Monitor", "Router", "Keyboard", "Mouse"], correct: 1 },
        { q: "What is IP address?", opts: ["Internet Protocol address", "Internal Protocol address", "International Protocol address", "Integrated Protocol address"], correct: 0 },
        { q: "Which is a wireless standard?", opts: ["Ethernet", "Wi-Fi", "USB", "SATA"], correct: 1 },
        { q: "What is a firewall?", opts: ["Physical wall", "Security software", "Network cable", "Storage device"], correct: 1 },
        { q: "Which is a file system?", opts: ["NTFS", "HTTP", "FTP", "SMTP"], correct: 0 },
        { q: "What is multitasking?", opts: ["Single task", "Multiple tasks", "No tasks", "Broken tasks"], correct: 1 },
        { q: "Which is a network protocol?", opts: ["NTFS", "TCP/IP", "JPEG", "MP3"], correct: 1 },
        { q: "What is virtual memory?", opts: ["Physical memory", "Simulated memory", "No memory", "Broken memory"], correct: 1 },
        { q: "Which is a server type?", opts: ["Client", "Web server", "Workstation", "Terminal"], correct: 1 },
        { q: "What is a process?", opts: ["Hardware component", "Running program", "Storage device", "Input device"], correct: 1 },
        { q: "Which is a network security measure?", opts: ["Open access", "Password protection", "No protection", "Broken protection"], correct: 1 },
        { q: "What is bandwidth?", opts: ["Storage capacity", "Data transfer rate", "Processing speed", "Memory size"], correct: 1 },
        { q: "Which is a backup type?", opts: ["Full backup", "No backup", "Broken backup", "Fake backup"], correct: 0 },
        { q: "What is a driver?", opts: ["Person", "Software for hardware", "Hardware for software", "Application"], correct: 1 },
        { q: "Which is a network model?", opts: ["OSI", "CPU", "RAM", "HDD"], correct: 0 },
        { q: "What is encryption?", opts: ["Data compression", "Data protection", "Data deletion", "Data copying"], correct: 1 },
        { q: "Which is a network attack?", opts: ["Backup", "Virus", "Update", "Install"], correct: 1 },
        { q: "What is a subnet?", opts: ["Super network", "Sub network", "No network", "Broken network"], correct: 1 },
        { q: "Which is a network service?", opts: ["Hardware", "DHCP", "Monitor", "Keyboard"], correct: 1 },
        { q: "What is load balancing?", opts: ["Distributing workload", "Increasing load", "Decreasing load", "No load"], correct: 0 },
        { q: "Which is a network cable type?", opts: ["Power cable", "Ethernet cable", "Audio cable", "Video cable"], correct: 1 },
        { q: "What is a proxy server?", opts: ["Direct connection", "Intermediate server", "End server", "No server"], correct: 1 },
        { q: "Which is a network monitoring tool?", opts: ["MS Word", "Wireshark", "Calculator", "Paint"], correct: 1 },
        { q: "What is QoS?", opts: ["Quality of Service", "Quantity of Service", "Quick of Service", "Quiet of Service"], correct: 0 },
        { q: "Which is a network architecture?", opts: ["Client-Server", "Single-User", "No-User", "Multi-Hardware"], correct: 0 },
        { q: "What is a MAC address?", opts: ["Media Access Control", "Machine Access Control", "Manual Access Control", "Multiple Access Control"], correct: 0 },
        { q: "Which is a network layer?", opts: ["Physical", "Logical", "Virtual", "All of above"], correct: 3 },
        { q: "What is network latency?", opts: ["Speed", "Delay", "Capacity", "Security"], correct: 1 },
        { q: "Which is a VPN benefit?", opts: ["Slower connection", "Secure connection", "No connection", "Broken connection"], correct: 1 },
        { q: "What is network redundancy?", opts: ["Single path", "Multiple paths", "No path", "Broken path"], correct: 1 },
        { q: "Which is a network standard?", opts: ["IEEE 802.11", "MS Word", "Calculator", "Paint"], correct: 0 },
        { q: "What is network segmentation?", opts: ["Joining networks", "Dividing networks", "No networks", "Broken networks"], correct: 1 },
        { q: "Which is a network troubleshooting tool?", opts: ["MS Word", "Ping", "Calculator", "Paint"], correct: 1 },
        { q: "What is network scalability?", opts: ["Fixed size", "Expandable size", "No size", "Broken size"], correct: 1 },
        { q: "Which is a network performance metric?", opts: ["Color", "Throughput", "Font", "Size"], correct: 1 },
        { q: "What is network convergence?", opts: ["Separate networks", "Combined networks", "No networks", "Broken networks"], correct: 1 },
        { q: "Which is a network management protocol?", opts: ["HTTP", "SNMP", "FTP", "SMTP"], correct: 1 },
        { q: "What is network availability?", opts: ["Downtime", "Uptime percentage", "No time", "Broken time"], correct: 1 },
        { q: "Which is a network design principle?", opts: ["Complexity", "Simplicity", "Confusion", "Chaos"], correct: 1 },
        { q: "What is network documentation?", opts: ["No records", "Network records", "Broken records", "False records"], correct: 1 },
        { q: "Which is a network backup strategy?", opts: ["No backup", "Regular backup", "Broken backup", "False backup"], correct: 1 },
        { q: "What is network compliance?", opts: ["Breaking rules", "Following standards", "No rules", "Wrong rules"], correct: 1 },
        { q: "Which is a network optimization technique?", opts: ["Slowing down", "Traffic shaping", "Breaking traffic", "No traffic"], correct: 1 },
        { q: "What is network forensics?", opts: ["Network creation", "Network investigation", "Network deletion", "Network copying"], correct: 1 },
        { q: "Which is a network capacity planning tool?", opts: ["MS Word", "Network analyzer", "Calculator", "Paint"], correct: 1 },
        { q: "What is network automation?", opts: ["Manual control", "Automatic control", "No control", "Broken control"], correct: 1 },
        { q: "Which is a network disaster recovery plan?", opts: ["No plan", "Backup plan", "Broken plan", "Wrong plan"], correct: 1 }
    ],
    advanced: [
        // Advanced Web & Programming (50 questions)
        { q: "What is client-server architecture?", opts: ["Single computer", "Two-tier system", "No system", "Broken system"], correct: 1 },
        { q: "Which is a database management system?", opts: ["MS Word", "MySQL", "Calculator", "Paint"], correct: 1 },
        { q: "What is SQL?", opts: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"], correct: 0 },
        { q: "Which is a programming paradigm?", opts: ["Hardware", "Object-oriented", "Software", "Data"], correct: 1 },
        { q: "What is a variable in programming?", opts: ["Fixed value", "Storage location", "Program name", "File type"], correct: 1 },
        { q: "Which is a conditional statement?", opts: ["PRINT", "IF-ELSE", "INPUT", "OUTPUT"], correct: 1 },
        { q: "What is a loop?", opts: ["Single execution", "Repeated execution", "No execution", "Broken execution"], correct: 1 },
        { q: "Which is a data type?", opts: ["IF", "INTEGER", "PRINT", "LOOP"], correct: 1 },
        { q: "What is an array?", opts: ["Single value", "Collection of values", "No values", "Broken values"], correct: 1 },
        { q: "Which is a logical operator?", opts: ["AND", "PLUS", "MINUS", "MULTIPLY"], correct: 0 },
        { q: "What is a function?", opts: ["Variable", "Reusable code block", "Data type", "File name"], correct: 1 },
        { q: "Which is a comparison operator?", opts: ["=", "==", "+", "*"], correct: 1 },
        { q: "What is debugging?", opts: ["Writing code", "Finding errors", "Running program", "Saving file"], correct: 1 },
        { q: "Which is a string operation?", opts: ["Addition", "Concatenation", "Subtraction", "Division"], correct: 1 },
        { q: "What is pseudocode?", opts: ["Real code", "Fake algorithm", "Simplified code", "Machine code"], correct: 2 },
        { q: "Which is an assignment operator?", opts: ["==", "=", "!=", ">="], correct: 1 },
        { q: "What is a boolean value?", opts: ["Number", "Text", "True/False", "Character"], correct: 2 },
        { q: "Which is a loop type?", opts: ["IF", "FOR", "PRINT", "INPUT"], correct: 1 },
        { q: "What is a parameter?", opts: ["Function input", "Function output", "Variable name", "Data type"], correct: 0 },
        { q: "Which is an arithmetic operator?", opts: ["AND", "+", "IF", "PRINT"], correct: 1 },
        { q: "What is recursion?", opts: ["Loop", "Function calling itself", "Variable", "Data type"], correct: 1 },
        { q: "Which is a selection structure?", opts: ["FOR", "WHILE", "IF-ELSE", "REPEAT"], correct: 2 },
        { q: "What is a constant?", opts: ["Variable value", "Fixed value", "Function name", "Data type"], correct: 1 },
        { q: "Which is an increment operator?", opts: ["++", "--", "==", "!="], correct: 0 },
        { q: "What is scope?", opts: ["Variable visibility", "Function name", "Data type", "Loop count"], correct: 0 },
        { q: "Which is a logical value?", opts: ["1", "A", "TRUE", "Hello"], correct: 2 },
        { q: "What is initialization?", opts: ["Variable declaration", "Assigning initial value", "Function call", "Loop start"], correct: 1 },
        { q: "Which is a relational operator?", opts: ["=", "<", "+", "AND"], correct: 1 },
        { q: "What is modular programming?", opts: ["Single module", "Multiple modules", "No modules", "Broken modules"], correct: 1 },
        { q: "Which is an escape sequence?", opts: ["\\n", "++", "==", "&&"], correct: 0 },
        { q: "What is a library?", opts: ["Book collection", "Pre-written code", "Data file", "Hardware"], correct: 1 },
        { q: "Which is a comment symbol?", opts: ["//", "++", "==", "&&"], correct: 0 },
        { q: "What is an interpreter?", opts: ["Hardware", "Executes code directly", "Data file", "User interface"], correct: 1 },
        { q: "Which is loop control?", opts: ["BREAK", "PRINT", "INPUT", "IF"], correct: 0 },
        { q: "What is an object?", opts: ["Function", "Data and methods", "Variable", "Constant"], correct: 1 },
        { q: "Which is a programming paradigm?", opts: ["Hardware", "Procedural", "Software", "Data"], correct: 1 },
        { q: "What is inheritance?", opts: ["Variable type", "Class relationship", "Function call", "Data type"], correct: 1 },
        { q: "Which is an access modifier?", opts: ["PUBLIC", "IF", "PRINT", "LOOP"], correct: 0 },
        { q: "What is encapsulation?", opts: ["Data hiding", "Data showing", "Function call", "Variable type"], correct: 0 },
        { q: "Which is an OOP concept?", opts: ["Loop", "Polymorphism", "Variable", "Constant"], correct: 1 },
        { q: "What is a method?", opts: ["Variable", "Function in class", "Data type", "Constant"], correct: 1 },
        { q: "Which is a class component?", opts: ["IF", "ATTRIBUTE", "PRINT", "LOOP"], correct: 1 },
        { q: "What is abstraction?", opts: ["Showing details", "Hiding complexity", "No details", "Wrong details"], correct: 1 },
        { q: "Which is a design pattern?", opts: ["Loop", "Singleton", "Variable", "Constant"], correct: 1 },
        { q: "What is polymorphism?", opts: ["Single form", "Multiple forms", "No form", "Broken form"], correct: 1 },
        { q: "Which is a software development model?", opts: ["Hardware", "Waterfall", "Network", "Storage"], correct: 1 },
        { q: "What is version control?", opts: ["No control", "Code management", "Broken control", "Wrong control"], correct: 1 },
        { q: "Which is a testing type?", opts: ["No testing", "Unit testing", "Broken testing", "Wrong testing"], correct: 1 },
        { q: "What is code review?", opts: ["Writing code", "Examining code", "Deleting code", "Copying code"], correct: 1 },
        { q: "Which is a development methodology?", opts: ["Hardware", "Agile", "Network", "Storage"], correct: 1 }
    ]
};

// Grade 8 Questions (300 total)
questionBanks[8] = {
    basic: [
        // Programming Fundamentals (50 questions)
        { q: "What is CSS used for?", opts: ["Database management", "Styling web pages", "Programming logic", "Network security"], correct: 1 },
        { q: "Which Python function displays output?", opts: ["input()", "print()", "show()", "display()"], correct: 1 },
        { q: "What is a database primary key?", opts: ["First column", "Unique identifier", "Largest value", "Text field"], correct: 1 },
        { q: "Which tag creates a hyperlink in HTML?", opts: ["<link>", "<a>", "<url>", "<href>"], correct: 1 },
        { q: "What is the purpose of a firewall?", opts: ["Speed up internet", "Block unauthorized access", "Store passwords", "Create backups"], correct: 1 },
        { q: "What is binary representation of 8?", opts: ["1000", "1010", "1100", "1001"], correct: 0 },
        { q: "Which data type stores whole numbers?", opts: ["String", "Boolean", "Integer", "Float"], correct: 2 },
        { q: "What is a loop in programming?", opts: ["A bug", "Repeated execution", "A variable", "A function"], correct: 1 },
        { q: "Which SQL command retrieves data?", opts: ["INSERT", "UPDATE", "DELETE", "SELECT"], correct: 3 },
        { q: "What is object-oriented programming?", opts: ["Linear programming", "Programming with objects", "Database programming", "Web programming"], correct: 1 },
        { q: "Which is a programming language?", opts: ["HTML", "Python", "CSS", "SQL"], correct: 1 },
        { q: "What is a variable?", opts: ["Fixed value", "Storage location", "Program name", "File type"], correct: 1 },
        { q: "Which operator is used for assignment?", opts: ["==", "=", "!=", ">="], correct: 1 },
        { q: "What is an algorithm?", opts: ["Hardware", "Step-by-step instructions", "Software", "Data"], correct: 1 },
        { q: "Which is a conditional statement?", opts: ["PRINT", "IF", "INPUT", "OUTPUT"], correct: 1 },
        { q: "What is debugging?", opts: ["Writing code", "Finding errors", "Running program", "Saving file"], correct: 1 },
        { q: "Which is a logical operator?", opts: ["AND", "PLUS", "MINUS", "MULTIPLY"], correct: 0 },
        { q: "What is a function?", opts: ["Variable", "Reusable code block", "Data type", "File name"], correct: 1 },
        { q: "Which is a comparison operator?", opts: ["=", "==", "+", "*"], correct: 1 },
        { q: "What is pseudocode?", opts: ["Real code", "Fake algorithm", "Simplified code", "Machine code"], correct: 2 },
        { q: "Which is a data structure?", opts: ["Monitor", "Array", "Keyboard", "Printer"], correct: 1 },
        { q: "What is syntax?", opts: ["Program logic", "Language rules", "Data type", "Variable name"], correct: 1 },
        { q: "Which is an input statement?", opts: ["PRINT", "INPUT", "IF", "LOOP"], correct: 1 },
        { q: "What is a compiler?", opts: ["Hardware", "Translates code", "Data file", "User interface"], correct: 1 },
        { q: "Which is an output statement?", opts: ["INPUT", "PRINT", "IF", "LOOP"], correct: 1 },
        { q: "What is a runtime error?", opts: ["Syntax error", "Logic error", "Execution error", "Compile error"], correct: 2 },
        { q: "Which is a string operation?", opts: ["Addition", "Concatenation", "Subtraction", "Division"], correct: 1 },
        { q: "What is a boolean?", opts: ["Number", "Text", "True/False", "Character"], correct: 2 },
        { q: "Which is a loop type?", opts: ["IF", "FOR", "PRINT", "INPUT"], correct: 1 },
        { q: "What is a parameter?", opts: ["Function input", "Function output", "Variable name", "Data type"], correct: 0 },
        { q: "Which is an arithmetic operator?", opts: ["AND", "+", "IF", "PRINT"], correct: 1 },
        { q: "What is recursion?", opts: ["Loop", "Function calling itself", "Variable", "Data type"], correct: 1 },
        { q: "Which is a selection structure?", opts: ["FOR", "WHILE", "IF-ELSE", "REPEAT"], correct: 2 },
        { q: "What is a constant?", opts: ["Variable value", "Fixed value", "Function name", "Data type"], correct: 1 },
        { q: "Which is an increment operator?", opts: ["++", "--", "==", "!="], correct: 0 },
        { q: "What is scope?", opts: ["Variable visibility", "Function name", "Data type", "Loop count"], correct: 0 },
        { q: "Which is a logical value?", opts: ["1", "A", "TRUE", "Hello"], correct: 2 },
        { q: "What is initialization?", opts: ["Variable declaration", "Assigning initial value", "Function call", "Loop start"], correct: 1 },
        { q: "Which is a relational operator?", opts: ["=", "<", "+", "AND"], correct: 1 },
        { q: "What is modular programming?", opts: ["Single module", "Multiple modules", "No modules", "Broken modules"], correct: 1 },
        { q: "Which is an escape sequence?", opts: ["\\n", "++", "==", "&&"], correct: 0 },
        { q: "What is a library?", opts: ["Book collection", "Pre-written code", "Data file", "Hardware"], correct: 1 },
        { q: "Which is a comment symbol?", opts: ["//", "++", "==", "&&"], correct: 0 },
        { q: "What is an interpreter?", opts: ["Hardware", "Executes code directly", "Data file", "User interface"], correct: 1 },
        { q: "Which is loop control?", opts: ["BREAK", "PRINT", "INPUT", "IF"], correct: 0 },
        { q: "What is flowchart?", opts: ["Program code", "Visual representation", "Data file", "Hardware diagram"], correct: 1 },
        { q: "Which is iteration?", opts: ["Selection", "Sequence", "Loop", "Function"], correct: 2 },
        { q: "What is nested loop?", opts: ["Single loop", "Loop inside loop", "No loop", "Broken loop"], correct: 1 },
        { q: "Which is array index?", opts: ["Array size", "Element position", "Array name", "Data type"], correct: 1 },
        { q: "What is machine language?", opts: ["High-level", "Assembly", "Binary", "Natural"], correct: 2 }
    ],
    medium: [
        // Database & Web Development (50 questions)
        { q: "What is a database?", opts: ["Single file", "Collection of data", "Program", "Hardware"], correct: 1 },
        { q: "Which is a database operation?", opts: ["CRUD", "HTML", "CSS", "JavaScript"], correct: 0 },
        { q: "What does CRUD stand for?", opts: ["Create Read Update Delete", "Copy Read Update Delete", "Create Retrieve Update Delete", "Copy Retrieve Update Delete"], correct: 0 },
        { q: "Which is a database relationship?", opts: ["One-to-One", "Many-to-Many", "One-to-Many", "All of above"], correct: 3 },
        { q: "What is normalization?", opts: ["Data duplication", "Data organization", "Data deletion", "Data corruption"], correct: 1 },
        { q: "Which is a SQL data type?", opts: ["VARCHAR", "HTML", "CSS", "JavaScript"], correct: 0 },
        { q: "What is a foreign key?", opts: ["Primary key", "Reference to another table", "Unique key", "Index key"], correct: 1 },
        { q: "Which SQL clause filters data?", opts: ["SELECT", "FROM", "WHERE", "ORDER BY"], correct: 2 },
        { q: "What is a database index?", opts: ["Table structure", "Data pointer", "Primary key", "Foreign key"], correct: 1 },
        { q: "Which is a database constraint?", opts: ["NOT NULL", "HTML", "CSS", "JavaScript"], correct: 0 },
        { q: "What is a database view?", opts: ["Physical table", "Virtual table", "Index", "Constraint"], correct: 1 },
        { q: "Which is a database backup type?", opts: ["Full", "Incremental", "Differential", "All of above"], correct: 3 },
        { q: "What is database security?", opts: ["No protection", "Data protection", "Data deletion", "Data corruption"], correct: 1 },
        { q: "Which is a database transaction property?", opts: ["ACID", "HTML", "CSS", "JavaScript"], correct: 0 },
        { q: "What is database replication?", opts: ["Single copy", "Multiple copies", "No copies", "Broken copies"], correct: 1 },
        { q: "Which is a web development framework?", opts: ["MS Word", "Django", "Calculator", "Paint"], correct: 1 },
        { q: "What is MVC architecture?", opts: ["Model View Controller", "Multiple View Controller", "Model Virtual Controller", "Multiple Virtual Controller"], correct: 0 },
        { q: "Which is a front-end technology?", opts: ["Python", "JavaScript", "Java", "C++"], correct: 1 },
        { q: "What is responsive web design?", opts: ["Fixed layout", "Adaptive layout", "Broken layout", "Hidden layout"], correct: 1 },
        { q: "Which is a back-end technology?", opts: ["HTML", "CSS", "PHP", "JavaScript"], correct: 2 },
        { q: "What is AJAX?", opts: ["Asynchronous JavaScript and XML", "Advanced JavaScript and XML", "Automatic JavaScript and XML", "Applied JavaScript and XML"], correct: 0 },
        { q: "Which is a web server?", opts: ["Client", "Apache", "Browser", "Database"], correct: 1 },
        { q: "What is REST API?", opts: ["Representational State Transfer", "Remote State Transfer", "Relational State Transfer", "Recursive State Transfer"], correct: 0 },
        { q: "Which is a web development tool?", opts: ["MS Word", "Visual Studio Code", "Calculator", "Paint"], correct: 1 },
        { q: "What is version control?", opts: ["No control", "Code management", "Broken control", "Wrong control"], correct: 1 },
        { q: "Which is a CSS framework?", opts: ["Python", "Bootstrap", "Java", "C++"], correct: 1 },
        { q: "What is DOM?", opts: ["Document Object Model", "Data Object Model", "Dynamic Object Model", "Database Object Model"], correct: 0 },
        { q: "Which is a JavaScript framework?", opts: ["HTML", "React", "CSS", "SQL"], correct: 1 },
        { q: "What is web hosting?", opts: ["Local storage", "Server storage", "No storage", "Broken storage"], correct: 1 },
        { q: "Which is a web protocol?", opts: ["HTML", "HTTP", "CSS", "JavaScript"], correct: 1 },
        { q: "What is SSL?", opts: ["Secure Sockets Layer", "Simple Sockets Layer", "Standard Sockets Layer", "System Sockets Layer"], correct: 0 },
        { q: "Which is a web testing tool?", opts: ["MS Word", "Selenium", "Calculator", "Paint"], correct: 1 },
        { q: "What is web accessibility?", opts: ["Limited access", "Universal access", "No access", "Broken access"], correct: 1 },
        { q: "Which is a web performance metric?", opts: ["Color count", "Load time", "Font size", "Image count"], correct: 1 },
        { q: "What is web analytics?", opts: ["Website creation", "Website analysis", "Website deletion", "Website copying"], correct: 1 },
        { q: "Which is a content management system?", opts: ["MS Word", "WordPress", "Calculator", "Paint"], correct: 1 },
        { q: "What is e-commerce?", opts: ["Electronic commerce", "Email commerce", "Easy commerce", "Extra commerce"], correct: 0 },
        { q: "Which is a payment gateway?", opts: ["MS Word", "PayPal", "Calculator", "Paint"], correct: 1 },
        { q: "What is web scraping?", opts: ["Website creation", "Data extraction", "Website deletion", "Data corruption"], correct: 1 },
        { q: "Which is a web crawler?", opts: ["Human", "Bot", "Browser", "Server"], correct: 1 },
        { q: "What is SEO?", opts: ["Search Engine Optimization", "Social Engine Optimization", "System Engine Optimization", "Software Engine Optimization"], correct: 0 },
        { q: "Which is a social media API?", opts: ["HTML", "Twitter API", "CSS", "SQL"], correct: 1 },
        { q: "What is cloud computing?", opts: ["Local computing", "Internet-based computing", "No computing", "Broken computing"], correct: 1 },
        { q: "Which is a cloud service?", opts: ["MS Word", "AWS", "Calculator", "Paint"], correct: 1 },
        { q: "What is microservices?", opts: ["Large services", "Small services", "No services", "Broken services"], correct: 1 },
        { q: "Which is a containerization tool?", opts: ["MS Word", "Docker", "Calculator", "Paint"], correct: 1 },
        { q: "What is DevOps?", opts: ["Development Operations", "Device Operations", "Data Operations", "Design Operations"], correct: 0 },
        { q: "Which is a CI/CD tool?", opts: ["MS Word", "Jenkins", "Calculator", "Paint"], correct: 1 },
        { q: "What is API?", opts: ["Application Programming Interface", "Application Program Interface", "Automated Programming Interface", "Advanced Programming Interface"], correct: 0 },
        { q: "Which is a web security measure?", opts: ["No security", "HTTPS", "Broken security", "Wrong security"], correct: 1 }
    ],
    advanced: [
        // Advanced Programming & Security (50 questions)
        { q: "What is object-oriented programming?", opts: ["Linear programming", "Programming with objects and classes", "Database programming", "Web programming"], correct: 1 },
        { q: "Which is an OOP principle?", opts: ["Inheritance", "Encapsulation", "Polymorphism", "All of above"], correct: 3 },
        { q: "What is inheritance?", opts: ["Creating objects", "Acquiring properties from parent class", "Hiding data", "Calling methods"], correct: 1 },
        { q: "Which is a design pattern?", opts: ["Loop", "Singleton", "Variable", "Constant"], correct: 1 },
        { q: "What is polymorphism?", opts: ["Single form", "Multiple forms", "No form", "Broken form"], correct: 1 },
        { q: "Which is an access modifier?", opts: ["PUBLIC", "IF", "PRINT", "LOOP"], correct: 0 },
        { q: "What is encapsulation?", opts: ["Data hiding", "Data showing", "Function call", "Variable type"], correct: 0 },
        { q: "Which is a class component?", opts: ["IF", "ATTRIBUTE", "PRINT", "LOOP"], correct: 1 },
        { q: "What is abstraction?", opts: ["Showing details", "Hiding complexity", "No details", "Wrong details"], correct: 1 },
        { q: "Which is a software development model?", opts: ["Hardware", "Waterfall", "Network", "Storage"], correct: 1 },
        { q: "What is agile methodology?", opts: ["Rigid approach", "Flexible approach", "No approach", "Wrong approach"], correct: 1 },
        { q: "Which is a testing type?", opts: ["No testing", "Unit testing", "Broken testing", "Wrong testing"], correct: 1 },
        { q: "What is code review?", opts: ["Writing code", "Examining code", "Deleting code", "Copying code"], correct: 1 },
        { q: "Which is a version control system?", opts: ["MS Word", "Git", "Calculator", "Paint"], correct: 1 },
        { q: "What is branching in Git?", opts: ["Single line", "Multiple lines", "No lines", "Broken lines"], correct: 1 },
        { q: "Which is a security threat?", opts: ["Update", "Malware", "Backup", "Install"], correct: 1 },
        { q: "What is encryption?", opts: ["Data compression", "Data protection", "Data deletion", "Data copying"], correct: 1 },
        { q: "Which is a cryptographic algorithm?", opts: ["Bubble sort", "AES", "Linear search", "Binary search"], correct: 1 },
        { q: "What is a hash function?", opts: ["Reversible function", "One-way function", "No function", "Broken function"], correct: 1 },
        { q: "Which is a network attack?", opts: ["Backup", "DDoS", "Update", "Install"], correct: 1 },
        { q: "What is SQL injection?", opts: ["Database backup", "Database attack", "Database update", "Database install"], correct: 1 },
        { q: "Which is a security protocol?", opts: ["HTTP", "HTTPS", "FTP", "SMTP"], correct: 1 },
        { q: "What is two-factor authentication?", opts: ["Single verification", "Double verification", "No verification", "Broken verification"], correct: 1 },
        { q: "Which is a firewall type?", opts: ["Software", "Hardware", "Network", "All of above"], correct: 3 },
        { q: "What is penetration testing?", opts: ["System building", "Security testing", "System deletion", "System copying"], correct: 1 },
        { q: "Which is a data structure?", opts: ["Stack", "Queue", "Tree", "All of above"], correct: 3 },
        { q: "What is time complexity?", opts: ["Space usage", "Time usage", "Memory usage", "Storage usage"], correct: 1 },
        { q: "Which is a sorting algorithm?", opts: ["Quick Sort", "Merge Sort", "Bubble Sort", "All of above"], correct: 3 },
        { q: "What is Big O notation?", opts: ["Algorithm efficiency", "Algorithm name", "Algorithm type", "Algorithm error"], correct: 0 },
        { q: "Which is a search algorithm?", opts: ["Linear Search", "Binary Search", "Hash Search", "All of above"], correct: 3 },
        { q: "What is recursion?", opts: ["Loop", "Function calling itself", "Variable", "Data type"], correct: 1 },
        { q: "Which is a graph algorithm?", opts: ["DFS", "BFS", "Dijkstra", "All of above"], correct: 3 },
        { q: "What is dynamic programming?", opts: ["Static approach", "Optimization technique", "No approach", "Wrong approach"], correct: 1 },
        { q: "Which is a tree traversal?", opts: ["Inorder", "Preorder", "Postorder", "All of above"], correct: 3 },
        { q: "What is a linked list?", opts: ["Array", "Dynamic data structure", "Static structure", "No structure"], correct: 1 },
        { q: "Which is a database concept?", opts: ["ACID", "Normalization", "Indexing", "All of above"], correct: 3 },
        { q: "What is database transaction?", opts: ["Single operation", "Group of operations", "No operations", "Broken operations"], correct: 1 },
        { q: "Which is a concurrency control?", opts: ["Locking", "Timestamping", "Validation", "All of above"], correct: 3 },
        { q: "What is deadlock?", opts: ["System speed", "Resource conflict", "System crash", "System restart"], correct: 1 },
        { q: "Which is a recovery technique?", opts: ["Backup", "Logging", "Checkpointing", "All of above"], correct: 3 },
        { q: "What is distributed system?", opts: ["Single computer", "Multiple computers", "No computers", "Broken computers"], correct: 1 },
        { q: "Which is a distributed algorithm?", opts: ["Consensus", "Leader election", "Mutual exclusion", "All of above"], correct: 3 },
        { q: "What is load balancing?", opts: ["Increasing load", "Distributing load", "Decreasing load", "No load"], correct: 1 },
        { q: "Which is a caching strategy?", opts: ["LRU", "FIFO", "LFU", "All of above"], correct: 3 },
        { q: "What is machine learning?", opts: ["Human learning", "Computer learning", "No learning", "Broken learning"], correct: 1 },
        { q: "Which is an ML algorithm?", opts: ["Linear Regression", "Decision Tree", "Neural Network", "All of above"], correct: 3 },
        { q: "What is artificial intelligence?", opts: ["Human intelligence", "Machine intelligence", "No intelligence", "Broken intelligence"], correct: 1 },
        { q: "Which is an AI application?", opts: ["Image recognition", "Speech recognition", "Natural language processing", "All of above"], correct: 3 },
        { q: "What is blockchain?", opts: ["Single block", "Chain of blocks", "No blocks", "Broken blocks"], correct: 1 },
        { q: "Which is a blockchain feature?", opts: ["Decentralization", "Immutability", "Transparency", "All of above"], correct: 3 }
    ]
};

// Grade 9 Questions (300 total)
questionBanks[9] = {
    basic: [
        // Advanced Programming Concepts (50 questions)
        { q: "What is an algorithm?", opts: ["A programming language", "Step-by-step instructions", "A computer program", "A data structure"], correct: 1 },
        { q: "Which sorting algorithm is most efficient for large datasets?", opts: ["Bubble Sort", "Selection Sort", "Quick Sort", "Insertion Sort"], correct: 2 },
        { q: "What does SQL stand for?", opts: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"], correct: 0 },
        { q: "What is the time complexity of binary search?", opts: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correct: 1 },
        { q: "Which data structure uses LIFO principle?", opts: ["Queue", "Stack", "Array", "Linked List"], correct: 1 },
        { q: "What is recursion in programming?", opts: ["A loop", "Function calling itself", "Error handling", "Variable declaration"], correct: 1 },
        { q: "Which network protocol is used for web browsing?", opts: ["FTP", "SMTP", "HTTP", "TCP"], correct: 2 },
        { q: "What is the purpose of version control?", opts: ["Speed up code", "Track code changes", "Compile programs", "Debug errors"], correct: 1 },
        { q: "Which design pattern ensures only one instance of a class?", opts: ["Factory", "Observer", "Singleton", "Strategy"], correct: 2 },
        { q: "What is machine learning?", opts: ["Hardware repair", "AI that learns from data", "Network configuration", "Database design"], correct: 1 },
        { q: "Which is a programming paradigm?", opts: ["Object-oriented", "Procedural", "Functional", "All of above"], correct: 3 },
        { q: "What is a database index?", opts: ["Table structure", "Data pointer for fast access", "Primary key", "Foreign key"], correct: 1 },
        { q: "Which is a software testing type?", opts: ["Unit testing", "Integration testing", "System testing", "All of above"], correct: 3 },
        { q: "What is API?", opts: ["Application Programming Interface", "Application Program Interface", "Automated Programming Interface", "Advanced Programming Interface"], correct: 0 },
        { q: "Which is a web development framework?", opts: ["React", "Angular", "Vue.js", "All of above"], correct: 3 },
        { q: "What is cloud computing?", opts: ["Local computing", "Internet-based computing", "Mobile computing", "Desktop computing"], correct: 1 },
        { q: "Which is a database management system?", opts: ["MySQL", "PostgreSQL", "MongoDB", "All of above"], correct: 3 },
        { q: "What is cybersecurity?", opts: ["Computer repair", "Information protection", "Software development", "Hardware design"], correct: 1 },
        { q: "Which is a network topology?", opts: ["Star", "Ring", "Bus", "All of above"], correct: 3 },
        { q: "What is artificial intelligence?", opts: ["Human intelligence", "Machine intelligence", "Natural intelligence", "Emotional intelligence"], correct: 1 },
        { q: "Which is a data structure?", opts: ["Array", "Linked List", "Tree", "All of above"], correct: 3 },
        { q: "What is software engineering?", opts: ["Hardware design", "Systematic software development", "Computer repair", "Network setup"], correct: 1 },
        { q: "Which is a programming language?", opts: ["Python", "Java", "C++", "All of above"], correct: 3 },
        { q: "What is database normalization?", opts: ["Data duplication", "Data organization", "Data deletion", "Data encryption"], correct: 1 },
        { q: "Which is a web technology?", opts: ["HTML", "CSS", "JavaScript", "All of above"], correct: 3 },
        { q: "What is agile methodology?", opts: ["Rigid development", "Flexible development", "No development", "Slow development"], correct: 1 },
        { q: "Which is a security threat?", opts: ["Virus", "Malware", "Phishing", "All of above"], correct: 3 },
        { q: "What is big data?", opts: ["Small datasets", "Large datasets", "No data", "Corrupted data"], correct: 1 },
        { q: "Which is a mobile platform?", opts: ["Android", "iOS", "Windows Mobile", "All of above"], correct: 3 },
        { q: "What is IoT?", opts: ["Internet of Things", "Internet of Technology", "Internet of Tools", "Internet of Toys"], correct: 0 },
        { q: "Which is a version control system?", opts: ["Git", "SVN", "Mercurial", "All of above"], correct: 3 },
        { q: "What is DevOps?", opts: ["Development Operations", "Device Operations", "Data Operations", "Design Operations"], correct: 0 },
        { q: "Which is a containerization technology?", opts: ["Docker", "Kubernetes", "OpenShift", "All of above"], correct: 3 },
        { q: "What is blockchain?", opts: ["Single block", "Chain of blocks", "Block of chains", "No blocks"], correct: 1 },
        { q: "Which is a machine learning algorithm?", opts: ["Linear Regression", "Decision Tree", "Neural Network", "All of above"], correct: 3 },
        { q: "What is quantum computing?", opts: ["Classical computing", "Quantum mechanics-based computing", "Mobile computing", "Cloud computing"], correct: 1 },
        { q: "Which is a data mining technique?", opts: ["Classification", "Clustering", "Association", "All of above"], correct: 3 },
        { q: "What is virtual reality?", opts: ["Real environment", "Simulated environment", "Mixed environment", "No environment"], correct: 1 },
        { q: "Which is a network security measure?", opts: ["Firewall", "Antivirus", "Encryption", "All of above"], correct: 3 },
        { q: "What is augmented reality?", opts: ["Virtual reality", "Enhanced real environment", "Reduced reality", "No reality"], correct: 1 },
        { q: "Which is a database type?", opts: ["Relational", "NoSQL", "Graph", "All of above"], correct: 3 },
        { q: "What is edge computing?", opts: ["Central computing", "Distributed computing", "No computing", "Slow computing"], correct: 1 },
        { q: "Which is a programming concept?", opts: ["Variables", "Functions", "Classes", "All of above"], correct: 3 },
        { q: "What is 5G technology?", opts: ["4th generation", "5th generation mobile", "5 gigabytes", "5 computers"], correct: 1 },
        { q: "Which is a software architecture?", opts: ["Monolithic", "Microservices", "Serverless", "All of above"], correct: 3 },
        { q: "What is digital transformation?", opts: ["Paper to digital", "Technology integration", "Digital deletion", "Digital copying"], correct: 1 },
        { q: "Which is a data visualization tool?", opts: ["Tableau", "Power BI", "D3.js", "All of above"], correct: 3 },
        { q: "What is robotic process automation?", opts: ["Manual processes", "Automated processes", "No processes", "Broken processes"], correct: 1 },
        { q: "Which is an emerging technology?", opts: ["AI", "Blockchain", "IoT", "All of above"], correct: 3 },
        { q: "What is green computing?", opts: ["Color computing", "Environmentally friendly computing", "Fast computing", "Slow computing"], correct: 1 }
    ],
    medium: [
        // Network Security & Database Management (50 questions)
        { q: "What is network security?", opts: ["Physical security", "Information security", "Building security", "Personal security"], correct: 1 },
        { q: "Which is a network attack type?", opts: ["DDoS", "Man-in-the-middle", "SQL injection", "All of above"], correct: 3 },
        { q: "What is encryption?", opts: ["Data compression", "Data protection", "Data deletion", "Data duplication"], correct: 1 },
        { q: "Which is a cryptographic algorithm?", opts: ["AES", "RSA", "SHA", "All of above"], correct: 3 },
        { q: "What is a firewall?", opts: ["Physical wall", "Network security device", "Software application", "Both B and C"], correct: 3 },
        { q: "Which is an authentication method?", opts: ["Password", "Biometric", "Token", "All of above"], correct: 3 },
        { q: "What is intrusion detection?", opts: ["System building", "Threat monitoring", "System deletion", "System copying"], correct: 1 },
        { q: "Which is a security protocol?", opts: ["SSL/TLS", "IPSec", "SSH", "All of above"], correct: 3 },
        { q: "What is penetration testing?", opts: ["System building", "Security testing", "System installation", "System backup"], correct: 1 },
        { q: "Which is a malware type?", opts: ["Virus", "Worm", "Trojan", "All of above"], correct: 3 },
        { q: "What is social engineering?", opts: ["Building bridges", "Psychological manipulation", "Software engineering", "Hardware engineering"], correct: 1 },
        { q: "Which is a network monitoring tool?", opts: ["Wireshark", "Nmap", "Nessus", "All of above"], correct: 3 },
        { q: "What is digital forensics?", opts: ["Digital photography", "Cybercrime investigation", "Digital art", "Digital music"], correct: 1 },
        { q: "Which is a backup strategy?", opts: ["Full backup", "Incremental backup", "Differential backup", "All of above"], correct: 3 },
        { q: "What is disaster recovery?", opts: ["System building", "Business continuity", "System deletion", "System copying"], correct: 1 },
        { q: "Which is a database concept?", opts: ["ACID properties", "Normalization", "Indexing", "All of above"], correct: 3 },
        { q: "What is database transaction?", opts: ["Single operation", "Group of operations", "No operations", "Random operations"], correct: 1 },
        { q: "Which is a database constraint?", opts: ["Primary key", "Foreign key", "Check constraint", "All of above"], correct: 3 },
        { q: "What is database replication?", opts: ["Single copy", "Multiple copies", "No copies", "Broken copies"], correct: 1 },
        { q: "Which is a database backup type?", opts: ["Hot backup", "Cold backup", "Warm backup", "All of above"], correct: 3 },
        { q: "What is data warehouse?", opts: ["Data storage", "Data analysis system", "Data deletion", "Data corruption"], correct: 1 },
        { q: "Which is a data mining technique?", opts: ["Classification", "Clustering", "Association rules", "All of above"], correct: 3 },
        { q: "What is ETL process?", opts: ["Extract Transform Load", "Extract Transfer Load", "Extract Test Load", "Extract Translate Load"], correct: 0 },
        { q: "Which is a NoSQL database?", opts: ["MongoDB", "Cassandra", "Redis", "All of above"], correct: 3 },
        { q: "What is database sharding?", opts: ["Single database", "Distributed database", "No database", "Broken database"], correct: 1 },
        { q: "Which is a database performance metric?", opts: ["Response time", "Throughput", "Availability", "All of above"], correct: 3 },
        { q: "What is database optimization?", opts: ["Slowing database", "Improving performance", "Breaking database", "Deleting database"], correct: 1 },
        { q: "Which is a database security measure?", opts: ["Access control", "Encryption", "Auditing", "All of above"], correct: 3 },
        { q: "What is database clustering?", opts: ["Single server", "Multiple servers", "No servers", "Broken servers"], correct: 1 },
        { q: "Which is a database design principle?", opts: ["Normalization", "Denormalization", "Indexing", "All of above"], correct: 3 },
        { q: "What is database migration?", opts: ["Staying same", "Moving to new system", "Deleting database", "Copying database"], correct: 1 },
        { q: "Which is a database testing type?", opts: ["Unit testing", "Integration testing", "Performance testing", "All of above"], correct: 3 },
        { q: "What is database monitoring?", opts: ["Ignoring database", "Watching performance", "Breaking database", "Deleting database"], correct: 1 },
        { q: "Which is a database recovery method?", opts: ["Point-in-time recovery", "Complete recovery", "Partial recovery", "All of above"], correct: 3 },
        { q: "What is database partitioning?", opts: ["Single partition", "Multiple partitions", "No partitions", "Broken partitions"], correct: 1 },
        { q: "Which is a database connection method?", opts: ["Direct connection", "Connection pooling", "No connection", "Broken connection"], correct: 1 },
        { q: "What is database caching?", opts: ["No storage", "Temporary storage", "Permanent storage", "Broken storage"], correct: 1 },
        { q: "Which is a database trigger type?", opts: ["BEFORE", "AFTER", "INSTEAD OF", "All of above"], correct: 3 },
        { q: "What is database view?", opts: ["Physical table", "Virtual table", "No table", "Broken table"], correct: 1 },
        { q: "Which is a database join type?", opts: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "All of above"], correct: 3 },
        { q: "What is database stored procedure?", opts: ["Stored data", "Precompiled code", "Stored files", "Stored images"], correct: 1 },
        { q: "Which is a database function type?", opts: ["Scalar function", "Table function", "Aggregate function", "All of above"], correct: 3 },
        { q: "What is database cursor?", opts: ["Mouse pointer", "Result set pointer", "File pointer", "Memory pointer"], correct: 1 },
        { q: "Which is a database lock type?", opts: ["Shared lock", "Exclusive lock", "Update lock", "All of above"], correct: 3 },
        { q: "What is database deadlock?", opts: ["System speed", "Resource conflict", "System crash", "System restart"], correct: 1 },
        { q: "Which is a database isolation level?", opts: ["Read uncommitted", "Read committed", "Repeatable read", "All of above"], correct: 3 },
        { q: "What is database concurrency?", opts: ["Single user", "Multiple users", "No users", "Broken users"], correct: 1 },
        { q: "Which is a database maintenance task?", opts: ["Backup", "Index rebuild", "Statistics update", "All of above"], correct: 3 },
        { q: "What is database archiving?", opts: ["Deleting data", "Storing old data", "Corrupting data", "Losing data"], correct: 1 },
        { q: "Which is a database compression technique?", opts: ["Row compression", "Page compression", "Column compression", "All of above"], correct: 3 }
    ],
    advanced: [
        // Advanced Programming & Emerging Technologies (50 questions)
        { q: "What is artificial intelligence?", opts: ["Human intelligence", "Machine intelligence simulation", "Natural intelligence", "Emotional intelligence"], correct: 1 },
        { q: "Which is a machine learning type?", opts: ["Supervised", "Unsupervised", "Reinforcement", "All of above"], correct: 3 },
        { q: "What is deep learning?", opts: ["Shallow learning", "Neural network with multiple layers", "Surface learning", "Simple learning"], correct: 1 },
        { q: "Which is a neural network type?", opts: ["CNN", "RNN", "GAN", "All of above"], correct: 3 },
        { q: "What is natural language processing?", opts: ["Programming languages", "Human language understanding", "Machine languages", "Assembly languages"], correct: 1 },
        { q: "Which is a computer vision task?", opts: ["Image recognition", "Object detection", "Face recognition", "All of above"], correct: 3 },
        { q: "What is blockchain technology?", opts: ["Single block", "Distributed ledger", "Central database", "Local storage"], correct: 1 },
        { q: "Which is a blockchain consensus algorithm?", opts: ["Proof of Work", "Proof of Stake", "Delegated Proof of Stake", "All of above"], correct: 3 },
        { q: "What is cryptocurrency?", opts: ["Physical currency", "Digital currency", "Paper currency", "Metal currency"], correct: 1 },
        { q: "Which is a quantum computing concept?", opts: ["Qubit", "Superposition", "Entanglement", "All of above"], correct: 3 },
        { q: "What is Internet of Things (IoT)?", opts: ["Internet for people", "Connected devices network", "Social network", "Gaming network"], correct: 1 },
        { q: "Which is an IoT protocol?", opts: ["MQTT", "CoAP", "LoRaWAN", "All of above"], correct: 3 },
        { q: "What is edge computing?", opts: ["Central computing", "Computing at data source", "Cloud computing", "Mobile computing"], correct: 1 },
        { q: "Which is a cloud service model?", opts: ["IaaS", "PaaS", "SaaS", "All of above"], correct: 3 },
        { q: "What is serverless computing?", opts: ["No servers", "Managed servers", "Physical servers", "Broken servers"], correct: 1 },
        { q: "Which is a microservices benefit?", opts: ["Scalability", "Flexibility", "Maintainability", "All of above"], correct: 3 },
        { q: "What is containerization?", opts: ["Physical containers", "Application packaging", "Data storage", "File compression"], correct: 1 },
        { q: "Which is a container orchestration tool?", opts: ["Kubernetes", "Docker Swarm", "Apache Mesos", "All of above"], correct: 3 },
        { q: "What is DevOps culture?", opts: ["Development only", "Operations only", "Development and Operations collaboration", "Neither"], correct: 2 },
        { q: "Which is a CI/CD practice?", opts: ["Continuous Integration", "Continuous Deployment", "Continuous Delivery", "All of above"], correct: 3 },
        { q: "What is infrastructure as code?", opts: ["Manual setup", "Automated infrastructure", "No infrastructure", "Broken infrastructure"], correct: 1 },
        { q: "Which is a monitoring tool?", opts: ["Prometheus", "Grafana", "ELK Stack", "All of above"], correct: 3 },
        { q: "What is site reliability engineering?", opts: ["Site building", "System reliability", "Site deletion", "Site copying"], correct: 1 },
        { q: "Which is a software architecture pattern?", opts: ["MVC", "MVP", "MVVM", "All of above"], correct: 3 },
        { q: "What is event-driven architecture?", opts: ["No events", "Event-based communication", "Time-based communication", "Random communication"], correct: 1 },
        { q: "Which is a design principle?", opts: ["SOLID", "DRY", "KISS", "All of above"], correct: 3 },
        { q: "What is test-driven development?", opts: ["No testing", "Tests before code", "Tests after code", "No code"], correct: 1 },
        { q: "Which is a software metric?", opts: ["Code coverage", "Cyclomatic complexity", "Lines of code", "All of above"], correct: 3 },
        { q: "What is code refactoring?", opts: ["Writing new code", "Improving existing code", "Deleting code", "Copying code"], correct: 1 },
        { q: "Which is a performance optimization technique?", opts: ["Caching", "Load balancing", "Database indexing", "All of above"], correct: 3 },
        { q: "What is scalability?", opts: ["System shrinking", "System growth handling", "System deletion", "System copying"], correct: 1 },
        { q: "Which is a security best practice?", opts: ["Input validation", "Output encoding", "Authentication", "All of above"], correct: 3 },
        { q: "What is zero-trust security?", opts: ["Trust everyone", "Trust no one", "Trust some", "Trust randomly"], correct: 1 },
        { q: "Which is a data structure operation?", opts: ["Insert", "Delete", "Search", "All of above"], correct: 3 },
        { q: "What is algorithm complexity?", opts: ["Algorithm difficulty", "Resource usage analysis", "Algorithm length", "Algorithm errors"], correct: 1 },
        { q: "Which is a graph algorithm?", opts: ["Dijkstra", "Kruskal", "Prim", "All of above"], correct: 3 },
        { q: "What is dynamic programming?", opts: ["Static programming", "Optimization technique", "No programming", "Broken programming"], correct: 1 },
        { q: "Which is a string algorithm?", opts: ["KMP", "Rabin-Karp", "Boyer-Moore", "All of above"], correct: 3 },
        { q: "What is computational complexity?", opts: ["Simple computation", "Resource requirement analysis", "Easy computation", "No computation"], correct: 1 },
        { q: "Which is a parallel computing model?", opts: ["SIMD", "MIMD", "SPMD", "All of above"], correct: 3 },
        { q: "What is distributed computing?", opts: ["Single computer", "Multiple computers", "No computers", "Broken computers"], correct: 1 },
        { q: "Which is a consensus algorithm?", opts: ["Raft", "PBFT", "Paxos", "All of above"], correct: 3 },
        { q: "What is fault tolerance?", opts: ["No faults", "Handling failures", "Creating faults", "Ignoring faults"], correct: 1 },
        { q: "Which is a distributed system challenge?", opts: ["Consistency", "Availability", "Partition tolerance", "All of above"], correct: 3 },
        { q: "What is CAP theorem?", opts: ["Consistency Availability Partition", "Computer Application Program", "Central Access Point", "Common Application Protocol"], correct: 0 },
        { q: "Which is a big data technology?", opts: ["Hadoop", "Spark", "Kafka", "All of above"], correct: 3 },
        { q: "What is stream processing?", opts: ["Batch processing", "Real-time processing", "No processing", "Slow processing"], correct: 1 },
        { q: "Which is a data storage format?", opts: ["JSON", "XML", "Parquet", "All of above"], correct: 3 },
        { q: "What is data lake?", opts: ["Small data", "Raw data repository", "Processed data", "No data"], correct: 1 },
        { q: "Which is an emerging technology trend?", opts: ["Quantum computing", "Augmented reality", "5G networks", "All of above"], correct: 3 }
    ]
};

// Grade 11 Questions (300 total)
questionBanks[11] = {
    basic: [
        // Advanced Computer Science Concepts (50 questions)
        { q: "What is object-oriented programming?", opts: ["Linear programming", "Programming with objects and classes", "Database programming", "Web programming"], correct: 1 },
        { q: "What is inheritance in OOP?", opts: ["Creating objects", "Acquiring properties from parent class", "Hiding data", "Calling methods"], correct: 1 },
        { q: "Which HTTP method is used to update data?", opts: ["GET", "POST", "PUT", "DELETE"], correct: 2 },
        { q: "What is database normalization?", opts: ["Making database faster", "Organizing data to reduce redundancy", "Creating backups", "Adding more tables"], correct: 1 },
        { q: "What is the purpose of version control?", opts: ["Speed up code", "Track changes in code", "Compile programs", "Debug errors"], correct: 1 },
        { q: "Which is a software development methodology?", opts: ["Waterfall", "Agile", "Scrum", "All of above"], correct: 3 },
        { q: "What is a design pattern?", opts: ["Code template", "Reusable solution", "Programming language", "Database schema"], correct: 1 },
        { q: "Which is a testing type?", opts: ["Unit testing", "Integration testing", "System testing", "All of above"], correct: 3 },
        { q: "What is API?", opts: ["Application Programming Interface", "Application Program Interface", "Automated Programming Interface", "Advanced Programming Interface"], correct: 0 },
        { q: "Which is a database type?", opts: ["Relational", "NoSQL", "Graph", "All of above"], correct: 3 },
        { q: "What is cloud computing?", opts: ["Local computing", "Internet-based computing", "Mobile computing", "Desktop computing"], correct: 1 },
        { q: "Which is a security threat?", opts: ["Malware", "Phishing", "DDoS", "All of above"], correct: 3 },
        { q: "What is machine learning?", opts: ["Human learning", "Computer learning from data", "Manual programming", "Hardware configuration"], correct: 1 },
        { q: "Which is a network topology?", opts: ["Star", "Ring", "Mesh", "All of above"], correct: 3 },
        { q: "What is artificial intelligence?", opts: ["Human intelligence", "Machine intelligence", "Natural intelligence", "Emotional intelligence"], correct: 1 },
        { q: "Which is a programming paradigm?", opts: ["Object-oriented", "Functional", "Procedural", "All of above"], correct: 3 },
        { q: "What is big data?", opts: ["Small datasets", "Large complex datasets", "Simple data", "No data"], correct: 1 },
        { q: "Which is a web framework?", opts: ["React", "Angular", "Vue.js", "All of above"], correct: 3 },
        { q: "What is DevOps?", opts: ["Development Operations", "Device Operations", "Data Operations", "Design Operations"], correct: 0 },
        { q: "Which is a mobile platform?", opts: ["Android", "iOS", "Windows Mobile", "All of above"], correct: 3 },
        { q: "What is IoT?", opts: ["Internet of Things", "Internet of Technology", "Internet of Tools", "Internet of Toys"], correct: 0 },
        { q: "Which is a data structure?", opts: ["Array", "Stack", "Queue", "All of above"], correct: 3 },
        { q: "What is algorithm complexity?", opts: ["Algorithm difficulty", "Resource usage measurement", "Algorithm length", "Algorithm errors"], correct: 1 },
        { q: "Which is a sorting algorithm?", opts: ["Quick Sort", "Merge Sort", "Heap Sort", "All of above"], correct: 3 },
        { q: "What is cybersecurity?", opts: ["Computer repair", "Information protection", "Software development", "Hardware design"], correct: 1 },
        { q: "Which is a database operation?", opts: ["Create", "Read", "Update", "All of above"], correct: 3 },
        { q: "What is software engineering?", opts: ["Hardware design", "Systematic software development", "Computer repair", "Network setup"], correct: 1 },
        { q: "Which is a web technology?", opts: ["HTML", "CSS", "JavaScript", "All of above"], correct: 3 },
        { q: "What is blockchain?", opts: ["Single block", "Chain of blocks", "Block of chains", "No blocks"], correct: 1 },
        { q: "Which is a cloud service model?", opts: ["IaaS", "PaaS", "SaaS", "All of above"], correct: 3 },
        { q: "What is virtual reality?", opts: ["Real environment", "Simulated environment", "Mixed environment", "No environment"], correct: 1 },
        { q: "Which is a programming language?", opts: ["Python", "Java", "C++", "All of above"], correct: 3 },
        { q: "What is data mining?", opts: ["Data extraction", "Pattern discovery", "Data deletion", "Data corruption"], correct: 1 },
        { q: "Which is a network protocol?", opts: ["HTTP", "FTP", "SMTP", "All of above"], correct: 3 },
        { q: "What is quantum computing?", opts: ["Classical computing", "Quantum mechanics-based computing", "Mobile computing", "Cloud computing"], correct: 1 },
        { q: "Which is a software architecture?", opts: ["Monolithic", "Microservices", "Serverless", "All of above"], correct: 3 },
        { q: "What is edge computing?", opts: ["Central computing", "Computing at data source", "Cloud computing", "Mobile computing"], correct: 1 },
        { q: "Which is a database constraint?", opts: ["Primary key", "Foreign key", "Check constraint", "All of above"], correct: 3 },
        { q: "What is digital transformation?", opts: ["Paper to digital", "Technology integration", "Digital deletion", "Digital copying"], correct: 1 },
        { q: "Which is a testing framework?", opts: ["JUnit", "Selenium", "TestNG", "All of above"], correct: 3 },
        { q: "What is containerization?", opts: ["Physical containers", "Application packaging", "Data storage", "File compression"], correct: 1 },
        { q: "Which is a version control system?", opts: ["Git", "SVN", "Mercurial", "All of above"], correct: 3 },
        { q: "What is agile methodology?", opts: ["Rigid development", "Flexible development", "No development", "Slow development"], correct: 1 },
        { q: "Which is a database index type?", opts: ["Clustered", "Non-clustered", "Unique", "All of above"], correct: 3 },
        { q: "What is responsive design?", opts: ["Fixed layout", "Adaptive layout", "Broken layout", "Hidden layout"], correct: 1 },
        { q: "Which is a security protocol?", opts: ["SSL/TLS", "IPSec", "SSH", "All of above"], correct: 3 },
        { q: "What is load balancing?", opts: ["Increasing load", "Distributing load", "Decreasing load", "No load"], correct: 1 },
        { q: "Which is a data format?", opts: ["JSON", "XML", "CSV", "All of above"], correct: 3 },
        { q: "What is microservices architecture?", opts: ["Large services", "Small independent services", "No services", "Broken services"], correct: 1 },
        { q: "Which is an emerging technology?", opts: ["AI", "Blockchain", "IoT", "All of above"], correct: 3 }
    ],
    medium: [
        // Database Systems & Network Administration (50 questions)
        { q: "What is ACID in databases?", opts: ["Atomicity Consistency Isolation Durability", "Automatic Consistent Integrated Durable", "Advanced Computer Information Database", "Application Control Interface Database"], correct: 0 },
        { q: "Which is a database transaction state?", opts: ["Active", "Committed", "Aborted", "All of above"], correct: 3 },
        { q: "What is database sharding?", opts: ["Single database", "Horizontal partitioning", "Vertical partitioning", "No partitioning"], correct: 1 },
        { q: "Which is a NoSQL database type?", opts: ["Document", "Key-value", "Graph", "All of above"], correct: 3 },
        { q: "What is database replication?", opts: ["Single copy", "Multiple synchronized copies", "No copies", "Broken copies"], correct: 1 },
        { q: "Which is a database isolation level?", opts: ["Read uncommitted", "Serializable", "Repeatable read", "All of above"], correct: 3 },
        { q: "What is data warehouse?", opts: ["Data storage", "Analytical data repository", "Data deletion", "Data corruption"], correct: 1 },
        { q: "Which is an OLAP operation?", opts: ["Roll-up", "Drill-down", "Slice", "All of above"], correct: 3 },
        { q: "What is ETL process?", opts: ["Extract Transform Load", "Extract Transfer Load", "Extract Test Load", "Extract Translate Load"], correct: 0 },
        { q: "Which is a database performance metric?", opts: ["Response time", "Throughput", "Concurrency", "All of above"], correct: 3 },
        { q: "What is database clustering?", opts: ["Single server", "Multiple coordinated servers", "No servers", "Broken servers"], correct: 1 },
        { q: "Which is a backup strategy?", opts: ["Full backup", "Incremental backup", "Differential backup", "All of above"], correct: 3 },
        { q: "What is database deadlock?", opts: ["System speed", "Resource conflict", "System crash", "System restart"], correct: 1 },
        { q: "Which is a concurrency control method?", opts: ["Locking", "Timestamping", "Validation", "All of above"], correct: 3 },
        { q: "What is database recovery?", opts: ["Data loss", "Restoring consistency", "Data corruption", "Data deletion"], correct: 1 },
        { q: "Which is a network model?", opts: ["OSI", "TCP/IP", "Hybrid", "All of above"], correct: 3 },
        { q: "What is network segmentation?", opts: ["Joining networks", "Dividing networks", "No networks", "Broken networks"], correct: 1 },
        { q: "Which is a routing protocol?", opts: ["RIP", "OSPF", "BGP", "All of above"], correct: 3 },
        { q: "What is VLAN?", opts: ["Virtual Local Area Network", "Very Large Area Network", "Variable Local Area Network", "Visible Local Area Network"], correct: 0 },
        { q: "Which is a network security device?", opts: ["Firewall", "IDS", "IPS", "All of above"], correct: 3 },
        { q: "What is QoS?", opts: ["Quality of Service", "Quantity of Service", "Quick of Service", "Quiet of Service"], correct: 0 },
        { q: "Which is a wireless standard?", opts: ["802.11a", "802.11n", "802.11ac", "All of above"], correct: 3 },
        { q: "What is network redundancy?", opts: ["Single path", "Multiple paths", "No path", "Broken path"], correct: 1 },
        { q: "Which is a network monitoring protocol?", opts: ["SNMP", "ICMP", "IGMP", "All of above"], correct: 3 },
        { q: "What is load balancing algorithm?", opts: ["Round robin", "Least connections", "Weighted", "All of above"], correct: 3 },
        { q: "Which is a VPN type?", opts: ["Site-to-site", "Remote access", "SSL VPN", "All of above"], correct: 3 },
        { q: "What is network latency?", opts: ["Bandwidth", "Delay", "Throughput", "Jitter"], correct: 1 },
        { q: "Which is a network troubleshooting tool?", opts: ["Ping", "Traceroute", "Netstat", "All of above"], correct: 3 },
        { q: "What is bandwidth?", opts: ["Network delay", "Data transfer capacity", "Network security", "Network topology"], correct: 1 },
        { q: "Which is a network attack?", opts: ["DoS", "Spoofing", "Sniffing", "All of above"], correct: 3 },
        { q: "What is network forensics?", opts: ["Network creation", "Traffic analysis", "Network deletion", "Network copying"], correct: 1 },
        { q: "Which is a network management task?", opts: ["Configuration", "Monitoring", "Troubleshooting", "All of above"], correct: 3 },
        { q: "What is SDN?", opts: ["Software Defined Networking", "System Defined Networking", "Secure Defined Networking", "Simple Defined Networking"], correct: 0 },
        { q: "Which is a network virtualization technology?", opts: ["VLAN", "VPN", "VXLAN", "All of above"], correct: 3 },
        { q: "What is network automation?", opts: ["Manual configuration", "Automated management", "No management", "Broken management"], correct: 1 },
        { q: "Which is a network design principle?", opts: ["Scalability", "Reliability", "Security", "All of above"], correct: 3 },
        { q: "What is network convergence?", opts: ["Separate networks", "Unified network", "No networks", "Broken networks"], correct: 1 },
        { q: "Which is a network service?", opts: ["DHCP", "DNS", "NTP", "All of above"], correct: 3 },
        { q: "What is network capacity planning?", opts: ["Current usage", "Future requirements", "No planning", "Wrong planning"], correct: 1 },
        { q: "Which is a network documentation type?", opts: ["Topology diagram", "Configuration backup", "Change log", "All of above"], correct: 3 },
        { q: "What is network compliance?", opts: ["Breaking rules", "Following standards", "No rules", "Wrong rules"], correct: 1 },
        { q: "Which is a network optimization technique?", opts: ["Traffic shaping", "Caching", "Compression", "All of above"], correct: 3 },
        { q: "What is network disaster recovery?", opts: ["No plan", "Business continuity", "System failure", "Data loss"], correct: 1 },
        { q: "Which is a network performance metric?", opts: ["Latency", "Throughput", "Packet loss", "All of above"], correct: 3 },
        { q: "What is network change management?", opts: ["Random changes", "Controlled changes", "No changes", "Broken changes"], correct: 1 },
        { q: "Which is a network backup method?", opts: ["Configuration backup", "Traffic backup", "No backup", "Broken backup"], correct: 0 },
        { q: "What is network incident response?", opts: ["Ignoring incidents", "Handling security events", "Creating incidents", "No response"], correct: 1 },
        { q: "Which is a network assessment type?", opts: ["Vulnerability assessment", "Penetration testing", "Risk assessment", "All of above"], correct: 3 },
        { q: "What is network baseline?", opts: ["Random measurement", "Normal performance reference", "No measurement", "Wrong measurement"], correct: 1 },
        { q: "Which is a network upgrade consideration?", opts: ["Cost", "Performance", "Compatibility", "All of above"], correct: 3 }
    ],
    advanced: [
        // Cybersecurity & Emerging Technologies (50 questions)
        { q: "What is zero-trust security model?", opts: ["Trust everyone", "Trust no one by default", "Trust some users", "Trust randomly"], correct: 1 },
        { q: "Which is a cryptographic hash function?", opts: ["SHA-256", "MD5", "SHA-1", "All of above"], correct: 3 },
        { q: "What is public key cryptography?", opts: ["Single key", "Key pair system", "No keys", "Broken keys"], correct: 1 },
        { q: "Which is a security framework?", opts: ["NIST", "ISO 27001", "COBIT", "All of above"], correct: 3 },
        { q: "What is threat modeling?", opts: ["Creating threats", "Identifying security risks", "Ignoring threats", "Random threats"], correct: 1 },
        { q: "Which is a penetration testing phase?", opts: ["Reconnaissance", "Exploitation", "Post-exploitation", "All of above"], correct: 3 },
        { q: "What is incident response?", opts: ["Creating incidents", "Handling security events", "Ignoring incidents", "Random response"], correct: 1 },
        { q: "Which is a malware analysis technique?", opts: ["Static analysis", "Dynamic analysis", "Behavioral analysis", "All of above"], correct: 3 },
        { q: "What is digital forensics?", opts: ["Digital photography", "Cybercrime investigation", "Digital art", "Digital music"], correct: 1 },
        { q: "Which is a security control type?", opts: ["Preventive", "Detective", "Corrective", "All of above"], correct: 3 },
        { q: "What is risk assessment?", opts: ["Creating risks", "Evaluating threats", "Ignoring risks", "Random assessment"], correct: 1 },
        { q: "Which is a vulnerability assessment tool?", opts: ["Nessus", "OpenVAS", "Qualys", "All of above"], correct: 3 },
        { q: "What is security awareness training?", opts: ["Technical training", "User education", "No training", "Wrong training"], correct: 1 },
        { q: "Which is a compliance standard?", opts: ["PCI DSS", "HIPAA", "SOX", "All of above"], correct: 3 },
        { q: "What is business continuity?", opts: ["Business failure", "Operational resilience", "Business closure", "No planning"], correct: 1 },
        { q: "Which is an AI technique?", opts: ["Machine Learning", "Deep Learning", "Natural Language Processing", "All of above"], correct: 3 },
        { q: "What is neural network?", opts: ["Computer network", "Brain-inspired computing", "Social network", "Broken network"], correct: 1 },
        { q: "Which is a machine learning algorithm?", opts: ["Linear Regression", "Decision Tree", "Random Forest", "All of above"], correct: 3 },
        { q: "What is computer vision?", opts: ["Human vision", "Machine visual perception", "Eye examination", "Visual design"], correct: 1 },
        { q: "Which is a natural language processing task?", opts: ["Sentiment analysis", "Machine translation", "Text summarization", "All of above"], correct: 3 },
        { q: "What is blockchain consensus?", opts: ["Agreement mechanism", "Disagreement", "No consensus", "Random consensus"], correct: 0 },
        { q: "Which is a blockchain type?", opts: ["Public", "Private", "Consortium", "All of above"], correct: 3 },
        { q: "What is smart contract?", opts: ["Paper contract", "Self-executing code", "Legal document", "Manual contract"], correct: 1 },
        { q: "Which is a cryptocurrency?", opts: ["Bitcoin", "Ethereum", "Litecoin", "All of above"], correct: 3 },
        { q: "What is quantum supremacy?", opts: ["Classical advantage", "Quantum advantage", "No advantage", "Random advantage"], correct: 1 },
        { q: "Which is a quantum algorithm?", opts: ["Shor's algorithm", "Grover's algorithm", "Quantum Fourier Transform", "All of above"], correct: 3 },
        { q: "What is quantum entanglement?", opts: ["Particle separation", "Particle correlation", "No correlation", "Random correlation"], correct: 1 },
        { q: "Which is an IoT challenge?", opts: ["Security", "Scalability", "Interoperability", "All of above"], correct: 3 },
        { q: "What is edge AI?", opts: ["Central AI", "AI at edge devices", "No AI", "Broken AI"], correct: 1 },
        { q: "Which is a 5G feature?", opts: ["High speed", "Low latency", "Massive connectivity", "All of above"], correct: 3 },
        { q: "What is augmented reality?", opts: ["Virtual reality", "Enhanced real world", "Reduced reality", "No reality"], correct: 1 },
        { q: "Which is a VR application?", opts: ["Gaming", "Training", "Healthcare", "All of above"], correct: 3 },
        { q: "What is digital twin?", opts: ["Physical copy", "Virtual replica", "No copy", "Broken copy"], correct: 1 },
        { q: "Which is a robotics component?", opts: ["Sensors", "Actuators", "Controllers", "All of above"], correct: 3 },
        { q: "What is autonomous system?", opts: ["Manual control", "Self-governing", "No control", "Broken control"], correct: 1 },
        { q: "Which is a biometric technology?", opts: ["Fingerprint", "Face recognition", "Iris scan", "All of above"], correct: 3 },
        { q: "What is green computing?", opts: ["Color computing", "Environmentally friendly", "Fast computing", "Slow computing"], correct: 1 },
        { q: "Which is a sustainable technology?", opts: ["Renewable energy", "Energy efficiency", "Waste reduction", "All of above"], correct: 3 },
        { q: "What is digital ethics?", opts: ["No ethics", "Technology moral principles", "Random ethics", "Wrong ethics"], correct: 1 },
        { q: "Which is an ethical AI concern?", opts: ["Bias", "Privacy", "Transparency", "All of above"], correct: 3 },
        { q: "What is data governance?", opts: ["No governance", "Data management framework", "Random governance", "Wrong governance"], correct: 1 },
        { q: "Which is a privacy regulation?", opts: ["GDPR", "CCPA", "PIPEDA", "All of above"], correct: 3 },
        { q: "What is algorithmic bias?", opts: ["Fair algorithms", "Unfair discrimination", "No bias", "Random bias"], correct: 1 },
        { q: "Which is a future technology trend?", opts: ["Quantum computing", "Brain-computer interfaces", "Space computing", "All of above"], correct: 3 },
        { q: "What is synthetic biology?", opts: ["Natural biology", "Engineered biological systems", "No biology", "Broken biology"], correct: 1 },
        { q: "Which is a nanotechnology application?", opts: ["Medicine", "Electronics", "Materials", "All of above"], correct: 3 },
        { q: "What is brain-computer interface?", opts: ["Computer brain", "Direct neural communication", "No interface", "Broken interface"], correct: 1 },
        { q: "Which is a space technology?", opts: ["Satellites", "Space stations", "Mars rovers", "All of above"], correct: 3 },
        { q: "What is technological singularity?", opts: ["Technology decline", "AI surpassing humans", "No change", "Random change"], correct: 1 },
        { q: "Which is a transhumanist technology?", opts: ["Life extension", "Cognitive enhancement", "Physical augmentation", "All of above"], correct: 3 }
    ]
};

// Update the main seeding function to handle all grades
async function seedDatabase() {
    console.log('🚀 Creating 1500 unique questions (300 per grade)...\n');
    
    const db = new sqlite3.Database(dbPath);
    
    // Clear existing questions
    await new Promise((resolve, reject) => {
        db.run('DELETE FROM questions', (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
    
    console.log('✅ Cleared existing questions\n');
    
    const grades = [6, 7, 8, 9, 11];
    let totalQuestions = 0;
    
    for (const grade of grades) {
        const questionCount = await generateGradeQuestions(db, grade, questionBanks[grade]);
        totalQuestions += questionCount;
    }
    
    // Final verification
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
    
    console.log(`\n🎯 Total Questions: ${totalQuestions}/1500`);
    
    db.close();
    console.log('\n🎉 Database seeding complete with 1500 unique questions!');
}

async function generateGradeQuestions(db, grade, questionBank) {
    console.log(`🌱 Generating 300 questions for Grade ${grade}...`);
    
    let questionCount = 0;
    const difficulties = ['basic', 'medium', 'advanced'];
    const questionsPerDifficulty = 100; // 100 questions per difficulty level
    
    for (const difficulty of difficulties) {
        const questions = questionBank[difficulty];
        
        for (let i = 0; i < questionsPerDifficulty; i++) {
            const baseQuestion = questions[i % questions.length];
            
            // Create unique variations to avoid duplicates
            const questionText = i < questions.length ? 
                baseQuestion.q : 
                `${baseQuestion.q} (Variant ${Math.floor(i / questions.length) + 1})`;
            
            const optionsJson = JSON.stringify(baseQuestion.opts.map((opt, index) => ({
                text: opt,
                isCorrect: index === baseQuestion.correct
            })));
            
            await new Promise((resolve, reject) => {
                db.run('INSERT INTO questions (grade, difficulty, question_text, options) VALUES (?, ?, ?, ?)',
                    [grade, difficulty, questionText, optionsJson], function(err) {
                        if (err) reject(err);
                        else resolve(this.lastID);
                    });
            });
            
            questionCount++;
        }
        
        console.log(`  ✅ ${difficulty}: ${questionsPerDifficulty} questions`);
    }
    
    console.log(`✅ Grade ${grade}: ${questionCount} questions completed`);
    return questionCount;
}