#!/usr/bin/env node

/**
 * Complete Questions Seeder
 * Seeds 30+ questions per grade to ensure quiz generation works
 */

const database = require('../config/database');

const completeQuestions = {
    6: [
        // Basic Computer Knowledge
        { question: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Unit", "Computer Processing Unit"], correct: 0, difficulty: "basic" },
        { question: "Which device is used to input text into a computer?", options: ["Monitor", "Keyboard", "Speaker", "Printer"], correct: 1, difficulty: "basic" },
        { question: "What is the main function of RAM?", options: ["Store data permanently", "Store data temporarily", "Display images", "Connect to internet"], correct: 1, difficulty: "basic" },
        { question: "Which of these is an operating system?", options: ["Microsoft Word", "Windows", "Google Chrome", "Adobe Photoshop"], correct: 1, difficulty: "basic" },
        { question: "What does WWW stand for?", options: ["World Wide Web", "World Wide Work", "Web Wide World", "Wide World Web"], correct: 0, difficulty: "basic" },
        { question: "Which part of the computer is called the 'brain'?", options: ["Monitor", "Keyboard", "CPU", "Mouse"], correct: 2, difficulty: "basic" },
        { question: "What is a mouse used for?", options: ["Typing text", "Pointing and clicking", "Playing sounds", "Storing data"], correct: 1, difficulty: "basic" },
        { question: "Which key is used to delete characters?", options: ["Enter", "Shift", "Backspace", "Ctrl"], correct: 2, difficulty: "basic" },
        { question: "What is software?", options: ["Physical parts of computer", "Programs and applications", "Computer screen", "Keyboard and mouse"], correct: 1, difficulty: "basic" },
        { question: "Which device shows the output of a computer?", options: ["Keyboard", "Mouse", "Monitor", "CPU"], correct: 2, difficulty: "basic" },
        { question: "What is hardware?", options: ["Computer programs", "Physical parts of computer", "Internet connection", "Computer games"], correct: 1, difficulty: "basic" },
        { question: "Which storage device is removable?", options: ["Hard disk", "RAM", "USB drive", "CPU"], correct: 2, difficulty: "basic" },
        { question: "What does 'Save' mean in computer terms?", options: ["Delete file", "Store file permanently", "Print file", "Close file"], correct: 1, difficulty: "basic" },
        { question: "Which program is used to browse the internet?", options: ["Calculator", "Web browser", "Paint", "Notepad"], correct: 1, difficulty: "basic" },
        { question: "What is an icon?", options: ["A type of computer", "A small picture representing a program", "A computer virus", "A type of keyboard"], correct: 1, difficulty: "basic" },
        { question: "Which key combination is used to copy text?", options: ["Ctrl + C", "Ctrl + V", "Ctrl + X", "Ctrl + Z"], correct: 0, difficulty: "basic" },
        { question: "What is a file?", options: ["A computer virus", "A collection of data with a name", "A type of hardware", "A computer game"], correct: 1, difficulty: "basic" },
        { question: "Which device is used to print documents?", options: ["Monitor", "Speaker", "Printer", "Scanner"], correct: 2, difficulty: "basic" },
        { question: "What is the desktop in a computer?", options: ["The physical table", "The main screen with icons", "The keyboard", "The mouse pad"], correct: 1, difficulty: "basic" },
        { question: "Which button is used to start the computer?", options: ["Reset button", "Power button", "Enter key", "Space bar"], correct: 1, difficulty: "basic" },
        { question: "What is a folder?", options: ["A type of file", "A container for organizing files", "A computer program", "A hardware component"], correct: 1, difficulty: "basic" },
        { question: "Which key is used to make capital letters?", options: ["Ctrl", "Alt", "Shift", "Tab"], correct: 2, difficulty: "basic" },
        { question: "What does 'double-click' mean?", options: ["Click once slowly", "Click twice quickly", "Hold the mouse button", "Move the mouse"], correct: 1, difficulty: "basic" },
        { question: "Which part stores data permanently?", options: ["RAM", "Hard disk", "CPU", "Monitor"], correct: 1, difficulty: "basic" },
        { question: "What is a computer virus?", options: ["A helpful program", "A harmful program", "A type of hardware", "A computer game"], correct: 1, difficulty: "basic" },
        { question: "Which device converts printed text to digital form?", options: ["Printer", "Scanner", "Monitor", "Speaker"], correct: 1, difficulty: "basic" },
        { question: "What does 'boot' mean in computer terms?", options: ["Shut down computer", "Start up computer", "Install software", "Delete files"], correct: 1, difficulty: "basic" },
        { question: "Which memory is faster?", options: ["Hard disk", "CD-ROM", "RAM", "USB drive"], correct: 2, difficulty: "basic" },
        { question: "What is multitasking?", options: ["Using one program", "Using multiple programs simultaneously", "Turning off computer", "Installing software"], correct: 1, difficulty: "basic" },
        { question: "Which key opens the Start menu in Windows?", options: ["Ctrl key", "Alt key", "Windows key", "Shift key"], correct: 2, difficulty: "basic" }
    ],
    7: [
        // Web and Internet Basics
        { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyper Transfer Markup Language"], correct: 0, difficulty: "basic" },
        { question: "Which programming language is known for web development?", options: ["HTML", "Python", "Java", "C++"], correct: 0, difficulty: "basic" },
        { question: "What is a browser?", options: ["A type of computer", "Software to access websites", "A programming language", "A type of printer"], correct: 1, difficulty: "basic" },
        { question: "What does URL stand for?", options: ["Universal Resource Locator", "Uniform Resource Locator", "Universal Reference Link", "Uniform Reference Locator"], correct: 1, difficulty: "basic" },
        { question: "Which of these is a search engine?", options: ["Facebook", "Google", "Microsoft Word", "Windows"], correct: 1, difficulty: "basic" },
        { question: "What is an email?", options: ["Electronic mail", "Emergency mail", "Express mail", "External mail"], correct: 0, difficulty: "basic" },
        { question: "Which protocol is used for web pages?", options: ["FTP", "HTTP", "SMTP", "POP"], correct: 1, difficulty: "basic" },
        { question: "What is a website?", options: ["A computer program", "A collection of web pages", "A type of hardware", "A computer virus"], correct: 1, difficulty: "basic" },
        { question: "Which key combination is used to paste text?", options: ["Ctrl + C", "Ctrl + V", "Ctrl + X", "Ctrl + Z"], correct: 1, difficulty: "basic" },
        { question: "What is a hyperlink?", options: ["A type of computer", "A clickable link to another page", "A programming language", "A computer virus"], correct: 1, difficulty: "basic" },
        { question: "Which file format is used for images?", options: ["TXT", "DOC", "JPG", "EXE"], correct: 2, difficulty: "basic" },
        { question: "What is downloading?", options: ["Uploading files", "Getting files from internet", "Deleting files", "Creating files"], correct: 1, difficulty: "basic" },
        { question: "Which social media platform uses 'tweets'?", options: ["Facebook", "Instagram", "Twitter", "LinkedIn"], correct: 2, difficulty: "basic" },
        { question: "What is a password?", options: ["A secret code for access", "A type of software", "A computer component", "A file format"], correct: 0, difficulty: "basic" },
        { question: "Which key is used to refresh a web page?", options: ["F1", "F5", "F10", "F12"], correct: 1, difficulty: "basic" },
        { question: "What is spam in email?", options: ["Important messages", "Unwanted messages", "Deleted messages", "Sent messages"], correct: 1, difficulty: "basic" },
        { question: "Which domain extension is for commercial websites?", options: [".gov", ".edu", ".com", ".org"], correct: 2, difficulty: "basic" },
        { question: "What is a cookie in web terms?", options: ["A type of food", "A small data file", "A computer virus", "A web browser"], correct: 1, difficulty: "basic" },
        { question: "Which protocol is secure for web browsing?", options: ["HTTP", "HTTPS", "FTP", "SMTP"], correct: 1, difficulty: "basic" },
        { question: "What is a blog?", options: ["A computer program", "An online journal or diary", "A type of hardware", "A computer game"], correct: 1, difficulty: "basic" },
        { question: "Which key combination opens a new tab?", options: ["Ctrl + N", "Ctrl + T", "Ctrl + O", "Ctrl + S"], correct: 1, difficulty: "basic" },
        { question: "What is Wi-Fi?", options: ["A type of cable", "Wireless internet connection", "A computer program", "A type of monitor"], correct: 1, difficulty: "basic" },
        { question: "Which file format is used for documents?", options: ["JPG", "MP3", "DOC", "EXE"], correct: 2, difficulty: "basic" },
        { question: "What is cloud storage?", options: ["Storage in the sky", "Online storage service", "A type of hard disk", "A computer program"], correct: 1, difficulty: "basic" },
        { question: "Which key combination closes a tab?", options: ["Ctrl + W", "Ctrl + Q", "Ctrl + E", "Ctrl + R"], correct: 0, difficulty: "basic" },
        { question: "What is a firewall?", options: ["A physical wall", "Security software", "A type of virus", "A web browser"], correct: 1, difficulty: "basic" },
        { question: "Which company created the Windows operating system?", options: ["Apple", "Google", "Microsoft", "IBM"], correct: 2, difficulty: "basic" },
        { question: "What is bandwidth?", options: ["Width of computer", "Internet speed capacity", "Screen resolution", "Hard disk space"], correct: 1, difficulty: "basic" },
        { question: "Which key combination selects all text?", options: ["Ctrl + A", "Ctrl + S", "Ctrl + D", "Ctrl + F"], correct: 0, difficulty: "basic" },
        { question: "What is malware?", options: ["Good software", "Malicious software", "System software", "Gaming software"], correct: 1, difficulty: "basic" }
    ],
    8: [
        // Programming and Logic
        { question: "What is an algorithm?", options: ["A type of computer", "A step-by-step procedure to solve a problem", "A programming language", "A type of software"], correct: 1, difficulty: "basic" },
        { question: "Which HTML tag is used for creating a hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], correct: 1, difficulty: "medium" },
        { question: "What is the binary representation of decimal number 5?", options: ["101", "110", "111", "100"], correct: 0, difficulty: "medium" },
        { question: "Which protocol is used for secure web browsing?", options: ["HTTP", "HTTPS", "FTP", "SMTP"], correct: 1, difficulty: "medium" },
        { question: "What is a loop in programming?", options: ["A type of error", "A repeated execution of code", "A programming language", "A type of variable"], correct: 1, difficulty: "basic" },
        { question: "Which number system uses only 0 and 1?", options: ["Decimal", "Binary", "Hexadecimal", "Octal"], correct: 1, difficulty: "basic" },
        { question: "What is a variable in programming?", options: ["A constant value", "A storage location with a name", "A type of loop", "A programming error"], correct: 1, difficulty: "basic" },
        { question: "Which tag is used for the largest heading in HTML?", options: ["<h6>", "<h3>", "<h1>", "<header>"], correct: 2, difficulty: "medium" },
        { question: "What does CSS stand for?", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"], correct: 1, difficulty: "basic" },
        { question: "Which symbol is used for comments in most programming languages?", options: ["#", "//", "/*", "All of the above"], correct: 3, difficulty: "medium" },
        { question: "What is debugging?", options: ["Writing code", "Finding and fixing errors", "Running programs", "Designing interfaces"], correct: 1, difficulty: "basic" },
        { question: "Which data type stores whole numbers?", options: ["Float", "String", "Integer", "Boolean"], correct: 2, difficulty: "basic" },
        { question: "What is the result of 8 in binary?", options: ["1000", "1001", "1010", "1100"], correct: 0, difficulty: "medium" },
        { question: "Which HTML tag is used for line breaks?", options: ["<break>", "<br>", "<lb>", "<newline>"], correct: 1, difficulty: "medium" },
        { question: "What is a function in programming?", options: ["A type of variable", "A reusable block of code", "A programming error", "A data type"], correct: 1, difficulty: "basic" },
        { question: "Which operator is used for assignment in most languages?", options: ["==", "=", "!=", "<="], correct: 1, difficulty: "basic" },
        { question: "What does IP stand for?", options: ["Internet Protocol", "Internal Program", "Input Process", "Information Package"], correct: 0, difficulty: "basic" },
        { question: "Which HTML tag is used for creating lists?", options: ["<list>", "<ul>", "<menu>", "<items>"], correct: 1, difficulty: "medium" },
        { question: "What is a compiler?", options: ["A text editor", "A program that translates code", "A web browser", "A database"], correct: 1, difficulty: "medium" },
        { question: "Which data type stores true/false values?", options: ["Integer", "String", "Float", "Boolean"], correct: 3, difficulty: "basic" },
        { question: "What is the decimal value of binary 1010?", options: ["8", "10", "12", "14"], correct: 1, difficulty: "medium" },
        { question: "Which HTML attribute specifies the destination of a link?", options: ["src", "href", "link", "url"], correct: 1, difficulty: "medium" },
        { question: "What is pseudocode?", options: ["Real programming code", "Fake code", "Algorithm written in plain language", "Error messages"], correct: 2, difficulty: "basic" },
        { question: "Which symbol represents logical AND in most languages?", options: ["&", "&&", "AND", "All of the above"], correct: 3, difficulty: "medium" },
        { question: "What is a syntax error?", options: ["Logic error", "Runtime error", "Grammar error in code", "Memory error"], correct: 2, difficulty: "basic" },
        { question: "Which HTML tag is used for creating tables?", options: ["<table>", "<tab>", "<grid>", "<data>"], correct: 0, difficulty: "medium" },
        { question: "What is an IDE?", options: ["Internet Development Environment", "Integrated Development Environment", "Internal Data Exchange", "Interactive Design Editor"], correct: 1, difficulty: "basic" },
        { question: "Which loop executes at least once?", options: ["for loop", "while loop", "do-while loop", "if statement"], correct: 2, difficulty: "medium" },
        { question: "What is the purpose of indentation in programming?", options: ["Make code look pretty", "Improve readability and structure", "Reduce file size", "Increase speed"], correct: 1, difficulty: "basic" },
        { question: "Which HTML tag is used for creating forms?", options: ["<form>", "<input>", "<field>", "<data>"], correct: 0, difficulty: "medium" }
    ],
    9: [
        // Advanced Programming and Data Structures
        { question: "What is object-oriented programming?", options: ["Programming with objects and classes", "Programming with only functions", "Programming with databases", "Programming with graphics"], correct: 0, difficulty: "medium" },
        { question: "Which data structure follows LIFO principle?", options: ["Queue", "Stack", "Array", "Tree"], correct: 1, difficulty: "medium" },
        { question: "What does SQL stand for?", options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"], correct: 0, difficulty: "basic" },
        { question: "Which sorting algorithm has the best average time complexity?", options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"], correct: 1, difficulty: "advanced" },
        { question: "What is a database?", options: ["A collection of organized data", "A type of software", "A programming language", "A computer component"], correct: 0, difficulty: "basic" },
        { question: "Which data structure follows FIFO principle?", options: ["Stack", "Queue", "Array", "Tree"], correct: 1, difficulty: "medium" },
        { question: "What is inheritance in OOP?", options: ["Creating new objects", "Acquiring properties from parent class", "Deleting objects", "Copying objects"], correct: 1, difficulty: "medium" },
        { question: "Which search algorithm is most efficient for sorted arrays?", options: ["Linear Search", "Binary Search", "Jump Search", "Exponential Search"], correct: 1, difficulty: "medium" },
        { question: "What is encapsulation in OOP?", options: ["Hiding internal details", "Creating multiple objects", "Inheriting properties", "Overriding methods"], correct: 0, difficulty: "medium" },
        { question: "Which time complexity is considered most efficient?", options: ["O(n²)", "O(n log n)", "O(log n)", "O(n!)"], correct: 2, difficulty: "advanced" },
        { question: "What is polymorphism in OOP?", options: ["Having multiple forms", "Creating objects", "Deleting objects", "Copying data"], correct: 0, difficulty: "medium" },
        { question: "Which data structure is used for recursion?", options: ["Queue", "Array", "Stack", "Tree"], correct: 2, difficulty: "medium" },
        { question: "What is a primary key in databases?", options: ["First column", "Unique identifier", "Largest value", "Most important data"], correct: 1, difficulty: "basic" },
        { question: "Which algorithm is used for finding shortest path?", options: ["Bubble Sort", "Dijkstra's Algorithm", "Binary Search", "Quick Sort"], correct: 1, difficulty: "advanced" },
        { question: "What is normalization in databases?", options: ["Making data normal", "Organizing data efficiently", "Deleting duplicate data", "Sorting data"], correct: 1, difficulty: "medium" },
        { question: "Which tree traversal visits root first?", options: ["Inorder", "Preorder", "Postorder", "Level order"], correct: 1, difficulty: "medium" },
        { question: "What is a foreign key?", options: ["Key from another country", "Reference to primary key", "Encrypted key", "Backup key"], correct: 1, difficulty: "basic" },
        { question: "Which complexity represents linear growth?", options: ["O(1)", "O(n)", "O(n²)", "O(log n)"], correct: 1, difficulty: "medium" },
        { question: "What is abstraction in OOP?", options: ["Making things concrete", "Hiding complex implementation", "Creating objects", "Deleting data"], correct: 1, difficulty: "medium" },
        { question: "Which data structure allows insertion at both ends?", options: ["Stack", "Queue", "Deque", "Array"], correct: 2, difficulty: "medium" },
        { question: "What is a hash table?", options: ["A dining table", "Data structure using hash function", "A type of array", "A sorting algorithm"], correct: 1, difficulty: "medium" },
        { question: "Which join returns all records from both tables?", options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"], correct: 3, difficulty: "medium" },
        { question: "What is recursion?", options: ["Function calling itself", "Loop execution", "Variable declaration", "Object creation"], correct: 0, difficulty: "basic" },
        { question: "Which algorithm is divide and conquer?", options: ["Bubble Sort", "Merge Sort", "Selection Sort", "Insertion Sort"], correct: 1, difficulty: "medium" },
        { question: "What is a linked list?", options: ["Array of links", "Dynamic data structure", "Static array", "Hash table"], correct: 1, difficulty: "basic" },
        { question: "Which SQL command is used to retrieve data?", options: ["INSERT", "UPDATE", "DELETE", "SELECT"], correct: 3, difficulty: "basic" },
        { question: "What is the space complexity of merge sort?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], correct: 2, difficulty: "advanced" },
        { question: "Which tree is always balanced?", options: ["Binary Tree", "AVL Tree", "Binary Search Tree", "Complete Tree"], correct: 1, difficulty: "advanced" },
        { question: "What is a constructor in OOP?", options: ["Destructor method", "Special method to create objects", "Method to delete objects", "Method to copy objects"], correct: 1, difficulty: "basic" },
        { question: "Which graph algorithm finds minimum spanning tree?", options: ["Dijkstra's", "Kruskal's", "DFS", "BFS"], correct: 1, difficulty: "advanced" }
    ],
    11: [
        // AI, ML, and Emerging Technologies
        { question: "What is artificial intelligence?", options: ["Computer systems that can perform tasks requiring human intelligence", "A programming language", "A type of database", "A computer component"], correct: 0, difficulty: "basic" },
        { question: "Which technology is used for machine learning?", options: ["Neural Networks", "HTML", "CSS", "SQL"], correct: 0, difficulty: "medium" },
        { question: "What is cloud computing?", options: ["Computing using internet-based services", "Computing with clouds", "A type of software", "A programming language"], correct: 0, difficulty: "basic" },
        { question: "Which protocol is commonly used in IoT devices?", options: ["HTTP", "MQTT", "FTP", "SMTP"], correct: 1, difficulty: "advanced" },
        { question: "What is blockchain technology?", options: ["A distributed ledger technology", "A programming language", "A type of database", "A web browser"], correct: 0, difficulty: "medium" },
        { question: "Which type of learning uses labeled data?", options: ["Unsupervised Learning", "Supervised Learning", "Reinforcement Learning", "Deep Learning"], correct: 1, difficulty: "medium" },
        { question: "What is Big Data?", options: ["Large files", "Extremely large datasets", "Big computers", "Large programs"], correct: 1, difficulty: "basic" },
        { question: "Which algorithm is used for recommendation systems?", options: ["Bubble Sort", "Collaborative Filtering", "Binary Search", "Quick Sort"], correct: 1, difficulty: "medium" },
        { question: "What is cybersecurity?", options: ["Computer games", "Protection of digital systems", "Internet browsing", "Software development"], correct: 1, difficulty: "basic" },
        { question: "Which technology enables virtual reality?", options: ["2D Graphics", "3D Graphics and Sensors", "Text Processing", "Database Management"], correct: 1, difficulty: "medium" },
        { question: "What is data mining?", options: ["Mining for data underground", "Extracting patterns from data", "Storing data", "Deleting data"], correct: 1, difficulty: "basic" },
        { question: "Which network topology connects all devices to a central hub?", options: ["Ring", "Star", "Bus", "Mesh"], correct: 1, difficulty: "medium" },
        { question: "What is quantum computing?", options: ["Very fast traditional computing", "Computing using quantum mechanics", "Cloud computing", "Mobile computing"], correct: 1, difficulty: "advanced" },
        { question: "Which encryption method uses two keys?", options: ["Symmetric", "Asymmetric", "Hash", "Caesar"], correct: 1, difficulty: "medium" },
        { question: "What is the Internet of Things (IoT)?", options: ["Internet for things", "Connected everyday objects", "Online shopping", "Social media"], correct: 1, difficulty: "basic" },
        { question: "Which AI technique mimics human brain?", options: ["Decision Trees", "Neural Networks", "Linear Regression", "Clustering"], correct: 1, difficulty: "medium" },
        { question: "What is edge computing?", options: ["Computing at network edges", "Computing on the edge", "Dangerous computing", "Old computing"], correct: 0, difficulty: "medium" },
        { question: "Which technology is used for cryptocurrency?", options: ["Blockchain", "HTML", "CSS", "SQL"], correct: 0, difficulty: "basic" },
        { question: "What is natural language processing?", options: ["Processing natural languages", "AI understanding human language", "Speaking naturally", "Language translation"], correct: 1, difficulty: "medium" },
        { question: "Which model is used for deep learning?", options: ["Linear Model", "Neural Network", "Decision Tree", "K-Means"], correct: 1, difficulty: "medium" },
        { question: "What is augmented reality?", options: ["Virtual world", "Enhanced real world with digital info", "Computer games", "Internet browsing"], correct: 1, difficulty: "basic" },
        { question: "Which technology enables autonomous vehicles?", options: ["GPS only", "AI and Sensors", "Manual control", "Radio waves"], correct: 1, difficulty: "medium" },
        { question: "What is biometric authentication?", options: ["Password authentication", "Authentication using biological traits", "Token authentication", "PIN authentication"], correct: 1, difficulty: "basic" },
        { question: "Which cloud service model provides infrastructure?", options: ["SaaS", "PaaS", "IaaS", "DaaS"], correct: 2, difficulty: "medium" },
        { question: "What is machine learning?", options: ["Machines learning to work", "Algorithms that improve with experience", "Teaching machines manually", "Machine maintenance"], correct: 1, difficulty: "basic" },
        { question: "Which technology is used for facial recognition?", options: ["Computer Vision", "Audio Processing", "Text Analysis", "Database Queries"], correct: 0, difficulty: "medium" },
        { question: "What is 5G technology?", options: ["5th generation mobile network", "5 gigabyte storage", "5 computers connected", "5th programming language"], correct: 0, difficulty: "basic" },
        { question: "Which AI application can generate human-like text?", options: ["Image Recognition", "Natural Language Generation", "Speech Recognition", "Computer Vision"], correct: 1, difficulty: "medium" },
        { question: "What is digital transformation?", options: ["Converting analog to digital", "Integrating digital technology into business", "Digital photography", "Digital art"], correct: 1, difficulty: "basic" },
        { question: "Which technology is used for smart homes?", options: ["IoT", "HTML", "CSS", "SQL"], correct: 0, difficulty: "basic" }
    ]
};

async function seedCompleteQuestions() {
    console.log('🌱 Seeding Complete Questions Database...');
    console.log('=====================================');

    try {
        await database.connect();
        const db = database.getDb();

        // Clear existing data
        console.log('🧹 Clearing existing data...');
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM responses', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM quizzes', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
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

        let totalQuestions = 0;
        let totalOptions = 0;

        for (const [grade, questions] of Object.entries(completeQuestions)) {
            console.log(`\n📚 Seeding Grade ${grade} questions...`);
            
            for (const questionData of questions) {
                // Insert question
                const questionId = await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                        [parseInt(grade), questionData.difficulty, questionData.question],
                        function(err) {
                            if (err) reject(err);
                            else resolve(this.lastID);
                        }
                    );
                });

                // Insert options
                for (let i = 0; i < questionData.options.length; i++) {
                    const optionText = questionData.options[i];
                    const isCorrect = i === questionData.correct;
                    
                    await new Promise((resolve, reject) => {
                        db.run(
                            'INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                            [questionId, optionText, isCorrect, i + 1],
                            (err) => {
                                if (err) reject(err);
                                else resolve();
                            }
                        );
                    });
                    totalOptions++;
                }

                totalQuestions++;
            }
            
            console.log(`   ✅ Added ${questions.length} questions for Grade ${grade}`);
        }

        console.log('\n🎉 Complete Questions Seeding Finished!');
        console.log(`   📊 Total Questions: ${totalQuestions}`);
        console.log(`   📊 Total Options: ${totalOptions}`);
        console.log(`   📊 Average Options per Question: ${(totalOptions / totalQuestions).toFixed(1)}`);

        // Verify seeding
        const verification = await new Promise((resolve, reject) => {
            db.all(
                `SELECT grade, COUNT(*) as count, 
                        SUM(CASE WHEN difficulty = 'basic' THEN 1 ELSE 0 END) as basic,
                        SUM(CASE WHEN difficulty = 'medium' THEN 1 ELSE 0 END) as medium,
                        SUM(CASE WHEN difficulty = 'advanced' THEN 1 ELSE 0 END) as advanced
                 FROM questions GROUP BY grade ORDER BY grade`,
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });

        console.log('\n📈 Question Distribution:');
        verification.forEach(row => {
            console.log(`   Grade ${row.grade}: ${row.count} questions (${row.basic} basic, ${row.medium} medium, ${row.advanced} advanced)`);
        });

        console.log('\n✅ Database ready for quiz generation!');
        console.log('   🎯 Each grade has 30 questions (minimum 25 needed for quiz)');
        console.log('   🎯 All questions have exactly 4 options each');
        console.log('   🎯 Each question has exactly 1 correct answer');

        await database.close();
        process.exit(0);

    } catch (error) {
        console.error('❌ Error seeding questions:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    seedCompleteQuestions();
}

module.exports = { seedCompleteQuestions };