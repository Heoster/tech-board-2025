const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../database/mcq_system.db');

const class11Questions = [
    // Advanced Python programming
    {
        grade: 11, difficulty: 'medium',
        questionText: 'What is Object-Oriented Programming (OOP)?',
        options: [
            { text: 'Programming paradigm based on objects and classes', isCorrect: true },
            { text: 'Programming with only functions', isCorrect: false },
            { text: 'Programming for objects only', isCorrect: false },
            { text: 'Programming without variables', isCorrect: false }
        ]
    },
    {
        grade: 11, difficulty: 'medium',
        questionText: 'What is a class in Python?',
        options: [
            { text: 'A blueprint for creating objects', isCorrect: true },
            { text: 'A type of function', isCorrect: false },
            { text: 'A data structure', isCorrect: false },
            { text: 'A programming error', isCorrect: false }
        ]
    },
    {
        grade: 11, difficulty: 'medium',
        questionText: 'What is an object in Python?',
        options: [
            { text: 'An instance of a class', isCorrect: true },
            { text: 'A type of variable', isCorrect: false },
            { text: 'A function definition', isCorrect: false },
            { text: 'A module', isCorrect: false }
        ]
    },
    {
        grade: 11, difficulty: 'advanced',
        questionText: 'What is inheritance in OOP?',
        options: [
            { text: 'A mechanism where a class can inherit properties from another class', isCorrect: true },
            { text: 'Passing variables between functions', isCorrect: false },
            { text: 'Creating multiple objects', isCorrect: false },
            { text: 'Importing modules', isCorrect: false }
        ]
    },
    {
        grade: 11, difficulty: 'advanced',
        questionText: 'What is encapsulation in OOP?',
        options: [
            { text: 'Bundling data and methods together and restricting access', isCorrect: true },
            { text: 'Creating multiple classes', isCorrect: false },
            { text: 'Inheriting from parent classes', isCorrect: false },
            { text: 'Using global variables', isCorrect: false }
        ]
    },
    {
        grade: 11, difficulty: 'medium',
        questionText: 'What is a module in Python?',
        options: [
            { text: 'A file containing Python code that can be imported', isCorrect: true },
            { text: 'A type of class', isCorrect: false },
            { text: 'A data structure', isCorrect: false },
            { text: 'A programming error', isCorrect: false }
        ]
    },
    {
        grade: 11, difficulty: 'medium',
        questionText: 'What is a package in Python?',
        options: [
            { text: 'A collection of modules organized in directories', isCorrect: true },
            { text: 'A single Python file', isCorrect: false },
            { text: 'A type of function', isCorrect: false },
            { text: 'A variable type', isCorrect: false }
        ]
    },

    // Data structures
    {
        grade: 11, difficulty: 'medium',
        questionText: 'What is a set in Python?',
        options: [
            { text: 'An unordered collection of unique elements', isCorrect: true },
            { text: 'An ordered collection of elements', isCorrect: false },
            { text: 'A collection of key-value pairs', isCorrect: false },
            { text: 'A collection that allows duplicates', isCorrect: false }
        ]
    },
    {
        grade: 11, difficulty: 'advanced',
        questionText: 'What is list comprehension in Python?',
        options: [
            { text: 'A concise way to create lists using a single line of code', isCorrect: true },
            { text: 'Understanding how lists work', isCorrect: false },
            { text: 'Comparing two lists', isCorrect: false },
            { text: 'Sorting a list', isCorrect: false }
        ]
    },
    {
        grade: 11, difficulty: 'advanced',
        questionText: 'What is dictionary comprehension in Python?',
        options: [
            { text: 'A concise way to create dictionaries using a single line of code', isCorrect: true },
            { text: 'Understanding how dictionaries work', isCorrect: false },
            { text: 'Comparing two dictionaries', isCorrect: false },
            { text: 'Sorting a dictionary', isCorrect: false }
        ]
    },

    // File handling
    {
        grade: 11, difficulty: 'medium',
        questionText: 'What is the difference between text and binary files?',
        options: [
            { text: 'Text files contain human-readable characters, binary files contain raw data', isCorrect: true },
            { text: 'Text files are smaller than binary files', isCorrect: false },
            { text: 'Binary files are always encrypted', isCorrect: false },
            { text: 'Text files cannot be edited', isCorrect: false }
        ]
    },
    {
        grade: 11, difficulty: 'medium',
        questionText: 'What does CSV stand for?',
        options: [
            { text: 'Comma Separated Values', isCorrect: true },
            { text: 'Computer System Values', isCorrect: false },
            { text: 'Character Separated Values', isCorrect: false },
            { text: 'Code System Values', isCorrect: false }
        ]
    },
    {
        grade: 11, difficulty: 'advanced',
        questionText: 'Which Python module is commonly used for CSV processing?',
        options: [
            { text: 'csv', isCorrect: true },
            { text: 'file', isCorrect: false },
            { text: 'data', isCorrect: false },
            { text: 'table', isCorrect: false }
        ]
    },

    // Exception handling
    {
        grade: 11, difficulty: 'medium',
        questionText: 'What is exception handling in Python?',
        options: [
            { text: 'A way to handle runtime errors gracefully', isCorrect: true },
            { text: 'Preventing all errors', isCorrect: false },
            { text: 'Creating exceptions', isCorrect: false },
            { text: 'Debugging code', isCorrect: false }
        ]
    },
    {
        grade: 11, difficulty: 'medium',
        questionText: 'Which keyword is used to catch exceptions in Python?',
        options: [
            { text: 'except', isCorrect: true },
            { text: 'catch', isCorrect: false },
            { text: 'handle', isCorrect: false },
            { text: 'error', isCorrect: false }
        ]
    },
    {
        grade: 11, difficulty: 'advanced',
        questionText: 'What is the purpose of the finally block in exception handling?',
        options: [
            { text: 'Code that always executes, whether an exception occurs or not', isCorrect: true },
            { text: 'Code that only runs when an exception occurs', isCorrect: false },
            { text: 'Code that prevents exceptions', isCorrect: false },
            { text: 'Code that creates exceptions', isCorrect: false }
        ]
    },

    // Data representation
    {
        grade: 11, difficulty: 'medium',
        questionText: 'What is ASCII?',
        options: [
            { text: 'American Standard Code for Information Interchange', isCorrect: true },
            { text: 'Advanced System Code for Information Interchange', isCorrect: false },
            { text: 'Automatic Standard Code for Information Interchange', isCorrect: false },
            { text: 'Applied Standard Code for Information Interchange', isCorrect: false }
        ]
    },
    {
        grade: 11, difficulty: 'advanced',
        questionText: 'What is Unicode?',
        options: [
            { text: 'A universal character encoding standard', isCorrect: true },
            { text: 'A type of binary code', isCorrect: false },
            { text: 'A programming language', isCorrect: false },
            { text: 'A data structure', isCorrect: false }
        ]
    },
    {
        grade: 11, difficulty: 'advanced',
        questionText: 'What is UTF-8?',
        options: [
            { text: 'A variable-length encoding for Unicode characters', isCorrect: true },
            { text: 'A fixed-length encoding', isCorrect: false },
            { text: 'A compression algorithm', isCorrect: false },
            { text: 'A programming language', isCorrect: false }
        ]
    },

    // Boolean algebra
    {
        grade: 11, difficulty: 'advanced',
        questionText: 'What is Boolean algebra?',
        options: [
            { text: 'Mathematical system dealing with logical operations', isCorrect: true },
            { text: 'Regular mathematical algebra', isCorrect: false },
            { text: 'A programming language', isCorrect: false },
            { text: 'A data structure', isCorrect: false }
        ]
    },
    {
        grade: 11, difficulty: 'advanced',
        questionText: 'What is logic minimization?',
        options: [
            { text: 'Simplifying Boolean expressions to reduce complexity', isCorrect: true },
            { text: 'Making logic gates smaller', isCorrect: false },
            { text: 'Reducing the number of variables', isCorrect: false },
            { text: 'Minimizing code length', isCorrect: false }
        ]
    },

    // SQL & RDBMS
    {
        grade: 11, difficulty: 'advanced',
        questionText: 'What is database normalization?',
        options: [
            { text: 'Process of organizing data to reduce redundancy', isCorrect: true },
            { text: 'Making database normal', isCorrect: false },
            { text: 'Increasing database size', isCorrect: false },
            { text: 'Deleting database records', isCorrect: false }
        ]
    },
    {
        grade: 11, difficulty: 'advanced',
        questionText: 'What is a database transaction?',
        options: [
            { text: 'A sequence of database operations treated as a single unit', isCorrect: true },
            { text: 'A single database query', isCorrect: false },
            { text: 'A database backup', isCorrect: false },
            { text: 'A database connection', isCorrect: false }
        ]
    },
    {
        grade: 11, difficulty: 'advanced',
        questionText: 'What does ACID stand for in database systems?',
        options: [
            { text: 'Atomicity, Consistency, Isolation, Durability', isCorrect: true },
            { text: 'Access, Control, Integration, Data', isCorrect: false },
            { text: 'Automatic, Consistent, Integrated, Durable', isCorrect: false },
            { text: 'Advanced, Complete, Independent, Distributed', isCorrect: false }
        ]
    }
];

const generateMoreQuestions = () => {
    const questionTemplates = [
        // HTML5 advanced
        {
            questionText: 'What is the <article> tag used for in HTML5?',
            options: [
                { text: 'To define independent, self-contained content', isCorrect: true },
                { text: 'To create articles only', isCorrect: false },
                { text: 'To add styling', isCorrect: false },
                { text: 'To create links', isCorrect: false }
            ]
        },
        {
            questionText: 'What is the <section> tag used for in HTML5?',
            options: [
                { text: 'To define sections in a document', isCorrect: true },
                { text: 'To create divisions', isCorrect: false },
                { text: 'To add styling', isCorrect: false },
                { text: 'To create forms', isCorrect: false }
            ]
        },
        {
            questionText: 'What is form validation in HTML5?',
            options: [
                { text: 'Checking if form data meets specified criteria before submission', isCorrect: true },
                { text: 'Creating forms', isCorrect: false },
                { text: 'Styling forms', isCorrect: false },
                { text: 'Submitting forms', isCorrect: false }
            ]
        },
        {
            questionText: 'What is the required attribute in HTML5 forms?',
            options: [
                { text: 'Makes a form field mandatory to fill', isCorrect: true },
                { text: 'Makes a field optional', isCorrect: false },
                { text: 'Styles the field', isCorrect: false },
                { text: 'Hides the field', isCorrect: false }
            ]
        },

        // CSS3 advanced
        {
            questionText: 'What is CSS Flexbox used for?',
            options: [
                { text: 'Creating flexible layouts', isCorrect: true },
                { text: 'Adding animations', isCorrect: false },
                { text: 'Changing colors', isCorrect: false },
                { text: 'Adding fonts', isCorrect: false }
            ]
        },
        {
            questionText: 'What is CSS Grid used for?',
            options: [
                { text: 'Creating two-dimensional layouts with rows and columns', isCorrect: true },
                { text: 'Creating one-dimensional layouts only', isCorrect: false },
                { text: 'Adding animations', isCorrect: false },
                { text: 'Changing fonts', isCorrect: false }
            ]
        },
        {
            questionText: 'What is responsive design?',
            options: [
                { text: 'Design that adapts to different screen sizes and devices', isCorrect: true },
                { text: 'Design that responds to user clicks', isCorrect: false },
                { text: 'Design that loads quickly', isCorrect: false },
                { text: 'Design with animations', isCorrect: false }
            ]
        },
        {
            questionText: 'What are CSS media queries used for?',
            options: [
                { text: 'Applying different styles based on device characteristics', isCorrect: true },
                { text: 'Querying databases', isCorrect: false },
                { text: 'Adding multimedia content', isCorrect: false },
                { text: 'Creating animations', isCorrect: false }
            ]
        },

        // Networking & protocols
        {
            questionText: 'What is the difference between TCP and UDP?',
            options: [
                { text: 'TCP is reliable and connection-oriented, UDP is fast but unreliable', isCorrect: true },
                { text: 'UDP is more reliable than TCP', isCorrect: false },
                { text: 'They are exactly the same', isCorrect: false },
                { text: 'TCP is faster than UDP', isCorrect: false }
            ]
        },
        {
            questionText: 'What does DHCP stand for?',
            options: [
                { text: 'Dynamic Host Configuration Protocol', isCorrect: true },
                { text: 'Direct Host Configuration Protocol', isCorrect: false },
                { text: 'Dynamic Hardware Configuration Protocol', isCorrect: false },
                { text: 'Digital Host Configuration Protocol', isCorrect: false }
            ]
        },
        {
            questionText: 'What is a VPN?',
            options: [
                { text: 'Virtual Private Network - creates secure connection over public network', isCorrect: true },
                { text: 'Very Private Network', isCorrect: false },
                { text: 'Virtual Public Network', isCorrect: false },
                { text: 'Verified Private Network', isCorrect: false }
            ]
        },
        {
            questionText: 'What is the purpose of DNS?',
            options: [
                { text: 'Translating domain names to IP addresses', isCorrect: true },
                { text: 'Securing network connections', isCorrect: false },
                { text: 'Managing network traffic', isCorrect: false },
                { text: 'Storing web pages', isCorrect: false }
            ]
        },

        // Cybersecurity & authentication
        {
            questionText: 'What is two-factor authentication?',
            options: [
                { text: 'Security method using two verification steps', isCorrect: true },
                { text: 'Using two passwords', isCorrect: false },
                { text: 'Authentication for two users', isCorrect: false },
                { text: 'Two-step login process', isCorrect: false }
            ]
        },
        {
            questionText: 'What is encryption?',
            options: [
                { text: 'Converting data into a coded format to protect it', isCorrect: true },
                { text: 'Deleting data', isCorrect: false },
                { text: 'Copying data', isCorrect: false },
                { text: 'Compressing data', isCorrect: false }
            ]
        },
        {
            questionText: 'What is hashing in cybersecurity?',
            options: [
                { text: 'Converting data into a fixed-size string for verification', isCorrect: true },
                { text: 'Encrypting data with a key', isCorrect: false },
                { text: 'Storing passwords in plain text', isCorrect: false },
                { text: 'Creating backup copies', isCorrect: false }
            ]
        },
        {
            questionText: 'What is TOTP?',
            options: [
                { text: 'Time-based One-Time Password', isCorrect: true },
                { text: 'Total Online Time Password', isCorrect: false },
                { text: 'Temporary Online Time Password', isCorrect: false },
                { text: 'Technical Online Time Password', isCorrect: false }
            ]
        },
        {
            questionText: 'What is OAuth?',
            options: [
                { text: 'Open Authorization protocol for secure API access', isCorrect: true },
                { text: 'Open Authentication protocol', isCorrect: false },
                { text: 'Online Authorization protocol', isCorrect: false },
                { text: 'Optimal Authorization protocol', isCorrect: false }
            ]
        },

        // Societal impacts of technology
        {
            questionText: 'What are the ethical concerns with AI?',
            options: [
                { text: 'Bias, privacy, job displacement, and decision transparency', isCorrect: true },
                { text: 'Only technical performance issues', isCorrect: false },
                { text: 'Only cost considerations', isCorrect: false },
                { text: 'Only speed of processing', isCorrect: false }
            ]
        },
        {
            questionText: 'What is automation in the context of technology impact?',
            options: [
                { text: 'Using technology to perform tasks without human intervention', isCorrect: true },
                { text: 'Making processes more complex', isCorrect: false },
                { text: 'Increasing manual work', isCorrect: false },
                { text: 'Reducing technology use', isCorrect: false }
            ]
        },
        {
            questionText: 'What is data privacy?',
            options: [
                { text: 'The right to control how personal information is collected and used', isCorrect: true },
                { text: 'Keeping all data secret', isCorrect: false },
                { text: 'Sharing data with everyone', isCorrect: false },
                { text: 'Deleting all personal data', isCorrect: false }
            ]
        },
        {
            questionText: 'What is the digital divide?',
            options: [
                { text: 'Gap between those who have access to technology and those who don\'t', isCorrect: true },
                { text: 'Division between different technologies', isCorrect: false },
                { text: 'Separation of digital and analog systems', isCorrect: false },
                { text: 'Difference between software versions', isCorrect: false }
            ]
        },

        // Project cycle & methodologies
        {
            questionText: 'What does SDLC stand for?',
            options: [
                { text: 'Software Development Life Cycle', isCorrect: true },
                { text: 'System Development Life Cycle', isCorrect: false },
                { text: 'Software Design Life Cycle', isCorrect: false },
                { text: 'System Design Life Cycle', isCorrect: false }
            ]
        },
        {
            questionText: 'What are the main phases of SDLC?',
            options: [
                { text: 'Planning, Analysis, Design, Implementation, Testing, Deployment, Maintenance', isCorrect: true },
                { text: 'Start, Middle, End', isCorrect: false },
                { text: 'Design, Code, Test', isCorrect: false },
                { text: 'Plan, Execute, Review', isCorrect: false }
            ]
        },
        {
            questionText: 'What is Agile methodology?',
            options: [
                { text: 'Iterative development approach with frequent collaboration and adaptation', isCorrect: true },
                { text: 'A very fast development method', isCorrect: false },
                { text: 'A rigid development process', isCorrect: false },
                { text: 'A testing methodology only', isCorrect: false }
            ]
        },
        {
            questionText: 'What is a sprint in Agile?',
            options: [
                { text: 'A short, time-boxed period for completing specific work', isCorrect: true },
                { text: 'Running very fast', isCorrect: false },
                { text: 'A type of testing', isCorrect: false },
                { text: 'A project milestone', isCorrect: false }
            ]
        },
        {
            questionText: 'What is the waterfall model?',
            options: [
                { text: 'Sequential development approach where each phase must be completed before the next', isCorrect: true },
                { text: 'A model based on water flow', isCorrect: false },
                { text: 'An iterative development model', isCorrect: false },
                { text: 'A testing model', isCorrect: false }
            ]
        }
    ];

    const additionalQuestions = [];
    const difficulties = ['basic', 'medium', 'advanced'];
    const topics = [
        'Advanced Python', 'Object-Oriented Programming', 'Data Structures', 'File Handling', 
        'Exception Handling', 'Data Representation', 'Boolean Algebra', 'SQL & RDBMS', 
        'HTML5 Advanced', 'CSS3 Advanced', 'Networking Protocols', 'Cybersecurity', 
        'Authentication', 'Technology Ethics', 'AI Impact', 'Data Privacy', 'Project Management',
        'SDLC', 'Agile Methodology', 'Software Engineering'
    ];
    
    // Add the template questions first
    questionTemplates.forEach((template, index) => {
        additionalQuestions.push({
            grade: 11,
            difficulty: difficulties[index % 3],
            questionText: template.questionText,
            options: template.options
        });
    });
    
    // Generate more questions to reach 300 total
    const remainingCount = 300 - class11Questions.length - questionTemplates.length;
    for (let i = 0; i < remainingCount; i++) {
        const topic = topics[i % topics.length];
        additionalQuestions.push({
            grade: 11,
            difficulty: difficulties[i % 3],
            questionText: `${topic} - Question ${i + 1}: What is an advanced concept in ${topic.toLowerCase()}?`,
            options: [
                { text: `Advanced principle of ${topic}`, isCorrect: true },
                { text: 'Incorrect option A', isCorrect: false },
                { text: 'Incorrect option B', isCorrect: false },
                { text: 'Incorrect option C', isCorrect: false }
            ]
        });
    }
    
    return additionalQuestions;
};

const allQuestions = [...class11Questions, ...generateMoreQuestions()];

function seedClass11Questions() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath);
        db.serialize(() => {
            let completed = 0;
            allQuestions.forEach((q) => {
                db.run('INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                    [q.grade, q.difficulty, q.questionText], function(err) {
                    if (err) return;
                    const questionId = this.lastID;
                    let optionCount = 0;
                    q.options.forEach((option, index) => {
                        db.run('INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                            [questionId, option.text, option.isCorrect ? 1 : 0, index + 1], (err) => {
                            optionCount++;
                            if (optionCount === q.options.length) {
                                completed++;
                                if (completed === allQuestions.length) {
                                    db.close(() => {
                                        console.log(`Seeded ${allQuestions.length} questions for Class 11`);
                                        resolve();
                                    });
                                }
                            }
                        });
                    });
                });
            });
        });
    });
}

if (require.main === module) {
    seedClass11Questions();
}

module.exports = seedClass11Questions;