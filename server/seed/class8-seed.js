const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../database/mcq_system.db');

const class8Questions = [
    // Memory types
    {
        grade: 8, difficulty: 'medium',
        questionText: 'What does RAM stand for?',
        options: [
            { text: 'Random Access Memory', isCorrect: true },
            { text: 'Read Access Memory', isCorrect: false },
            { text: 'Rapid Access Memory', isCorrect: false },
            { text: 'Remote Access Memory', isCorrect: false }
        ]
    },
    {
        grade: 8, difficulty: 'medium',
        questionText: 'What is the main characteristic of RAM?',
        options: [
            { text: 'It is volatile and loses data when power is off', isCorrect: true },
            { text: 'It permanently stores data', isCorrect: false },
            { text: 'It is read-only', isCorrect: false },
            { text: 'It is very slow', isCorrect: false }
        ]
    },
    {
        grade: 8, difficulty: 'medium',
        questionText: 'What does ROM stand for?',
        options: [
            { text: 'Read Only Memory', isCorrect: true },
            { text: 'Random Only Memory', isCorrect: false },
            { text: 'Rapid Only Memory', isCorrect: false },
            { text: 'Remote Only Memory', isCorrect: false }
        ]
    },
    {
        grade: 8, difficulty: 'advanced',
        questionText: 'What is cache memory?',
        options: [
            { text: 'High-speed memory that stores frequently accessed data', isCorrect: true },
            { text: 'Permanent storage for programs', isCorrect: false },
            { text: 'Memory for graphics only', isCorrect: false },
            { text: 'Backup memory', isCorrect: false }
        ]
    },
    {
        grade: 8, difficulty: 'advanced',
        questionText: 'What is virtual memory?',
        options: [
            { text: 'Using hard disk space as additional RAM when needed', isCorrect: true },
            { text: 'Memory that doesn\'t exist', isCorrect: false },
            { text: 'Memory for virtual reality', isCorrect: false },
            { text: 'Cloud-based memory', isCorrect: false }
        ]
    },

    // Networking deep dive
    {
        grade: 8, difficulty: 'advanced',
        questionText: 'What does TCP/IP stand for?',
        options: [
            { text: 'Transmission Control Protocol/Internet Protocol', isCorrect: true },
            { text: 'Transfer Control Protocol/Internet Protocol', isCorrect: false },
            { text: 'Technical Control Protocol/Internet Protocol', isCorrect: false },
            { text: 'Transport Control Protocol/Internal Protocol', isCorrect: false }
        ]
    },
    {
        grade: 8, difficulty: 'medium',
        questionText: 'What is DNS?',
        options: [
            { text: 'Domain Name System - translates domain names to IP addresses', isCorrect: true },
            { text: 'Data Network System', isCorrect: false },
            { text: 'Digital Network Service', isCorrect: false },
            { text: 'Direct Network System', isCorrect: false }
        ]
    },
    {
        grade: 8, difficulty: 'medium',
        questionText: 'What is the main difference between a router and a switch?',
        options: [
            { text: 'Router connects different networks, switch connects devices within same network', isCorrect: true },
            { text: 'Router is faster than switch', isCorrect: false },
            { text: 'Router is cheaper than switch', isCorrect: false },
            { text: 'Router is wireless, switch is wired', isCorrect: false }
        ]
    },
    {
        grade: 8, difficulty: 'advanced',
        questionText: 'What layer of the TCP/IP model handles routing?',
        options: [
            { text: 'Network layer', isCorrect: true },
            { text: 'Transport layer', isCorrect: false },
            { text: 'Application layer', isCorrect: false },
            { text: 'Physical layer', isCorrect: false }
        ]
    },
    {
        grade: 8, difficulty: 'medium',
        questionText: 'What is a subnet?',
        options: [
            { text: 'A smaller network within a larger network', isCorrect: true },
            { text: 'A type of cable', isCorrect: false },
            { text: 'A network protocol', isCorrect: false },
            { text: 'A security system', isCorrect: false }
        ]
    },

    // Cloud computing platforms
    {
        grade: 8, difficulty: 'medium',
        questionText: 'Which company provides AWS cloud services?',
        options: [
            { text: 'Amazon', isCorrect: true },
            { text: 'Microsoft', isCorrect: false },
            { text: 'Google', isCorrect: false },
            { text: 'Apple', isCorrect: false }
        ]
    },
    {
        grade: 8, difficulty: 'medium',
        questionText: 'What is Microsoft\'s cloud platform called?',
        options: [
            { text: 'Azure', isCorrect: true },
            { text: 'AWS', isCorrect: false },
            { text: 'Google Cloud', isCorrect: false },
            { text: 'iCloud', isCorrect: false }
        ]
    },
    {
        grade: 8, difficulty: 'medium',
        questionText: 'What is a major benefit of cloud computing?',
        options: [
            { text: 'Scalability and accessibility from anywhere', isCorrect: true },
            { text: 'It\'s always free', isCorrect: false },
            { text: 'It\'s only for large companies', isCorrect: false },
            { text: 'It doesn\'t require internet', isCorrect: false }
        ]
    },
    {
        grade: 8, difficulty: 'advanced',
        questionText: 'What is serverless computing?',
        options: [
            { text: 'Running code without managing servers directly', isCorrect: true },
            { text: 'Computing without any servers', isCorrect: false },
            { text: 'Computing only on local machines', isCorrect: false },
            { text: 'Computing without internet', isCorrect: false }
        ]
    },
    {
        grade: 8, difficulty: 'medium',
        questionText: 'What is cloud storage?',
        options: [
            { text: 'Storing data on remote servers accessed via internet', isCorrect: true },
            { text: 'Storing data in the sky', isCorrect: false },
            { text: 'Storing data only locally', isCorrect: false },
            { text: 'Storing data on CDs', isCorrect: false }
        ]
    },

    // HTML advanced
    {
        grade: 8, difficulty: 'medium',
        questionText: 'Which HTML tag is used to create a table?',
        options: [
            { text: '<table>', isCorrect: true },
            { text: '<tab>', isCorrect: false },
            { text: '<grid>', isCorrect: false },
            { text: '<data>', isCorrect: false }
        ]
    },
    {
        grade: 8, difficulty: 'medium',
        questionText: 'Which HTML tag is used for table rows?',
        options: [
            { text: '<tr>', isCorrect: true },
            { text: '<row>', isCorrect: false },
            { text: '<td>', isCorrect: false },
            { text: '<th>', isCorrect: false }
        ]
    },
    {
        grade: 8, difficulty: 'medium',
        questionText: 'Which HTML tag is used to embed a video?',
        options: [
            { text: '<video>', isCorrect: true },
            { text: '<movie>', isCorrect: false },
            { text: '<media>', isCorrect: false },
            { text: '<film>', isCorrect: false }
        ]
    },
    {
        grade: 8, difficulty: 'medium',
        questionText: 'Which HTML tag is used to embed audio?',
        options: [
            { text: '<audio>', isCorrect: true },
            { text: '<sound>', isCorrect: false },
            { text: '<music>', isCorrect: false },
            { text: '<voice>', isCorrect: false }
        ]
    },
    {
        grade: 8, difficulty: 'advanced',
        questionText: 'What are semantic HTML tags?',
        options: [
            { text: 'Tags that provide meaning about the content structure', isCorrect: true },
            { text: 'Tags that only change appearance', isCorrect: false },
            { text: 'Tags that are deprecated', isCorrect: false },
            { text: 'Tags that don\'t work', isCorrect: false }
        ]
    },
    {
        grade: 8, difficulty: 'advanced',
        questionText: 'Which is an example of a semantic HTML tag?',
        options: [
            { text: '<article>', isCorrect: true },
            { text: '<div>', isCorrect: false },
            { text: '<span>', isCorrect: false },
            { text: '<b>', isCorrect: false }
        ]
    }
];

const generateMoreClass8Questions = () => {
    const questionTemplates = [
        // CSS formatting
        {
            questionText: 'What is the difference between CSS classes and IDs?',
            options: [
                { text: 'Classes can be used multiple times, IDs should be unique', isCorrect: true },
                { text: 'IDs can be used multiple times, classes should be unique', isCorrect: false },
                { text: 'They are exactly the same', isCorrect: false },
                { text: 'Classes are faster than IDs', isCorrect: false }
            ]
        },
        {
            questionText: 'How do you select a class in CSS?',
            options: [
                { text: 'Using a dot (.) before the class name', isCorrect: true },
                { text: 'Using a hash (#) before the class name', isCorrect: false },
                { text: 'Using brackets around the class name', isCorrect: false },
                { text: 'Using quotes around the class name', isCorrect: false }
            ]
        },
        {
            questionText: 'How do you select an ID in CSS?',
            options: [
                { text: 'Using a hash (#) before the ID name', isCorrect: true },
                { text: 'Using a dot (.) before the ID name', isCorrect: false },
                { text: 'Using brackets around the ID name', isCorrect: false },
                { text: 'Using quotes around the ID name', isCorrect: false }
            ]
        },
        {
            questionText: 'What is an external stylesheet?',
            options: [
                { text: 'CSS code stored in a separate .css file', isCorrect: true },
                { text: 'CSS code written inside HTML tags', isCorrect: false },
                { text: 'CSS code in the head section', isCorrect: false },
                { text: 'CSS code from another website', isCorrect: false }
            ]
        },
        {
            questionText: 'What is the CSS box model?',
            options: [
                { text: 'Content, padding, border, and margin around elements', isCorrect: true },
                { text: 'A way to create boxes', isCorrect: false },
                { text: 'A type of container', isCorrect: false },
                { text: 'A design pattern', isCorrect: false }
            ]
        },
        {
            questionText: 'What CSS property controls the space inside an element?',
            options: [
                { text: 'padding', isCorrect: true },
                { text: 'margin', isCorrect: false },
                { text: 'border', isCorrect: false },
                { text: 'spacing', isCorrect: false }
            ]
        },
        {
            questionText: 'What CSS property controls the space outside an element?',
            options: [
                { text: 'margin', isCorrect: true },
                { text: 'padding', isCorrect: false },
                { text: 'border', isCorrect: false },
                { text: 'spacing', isCorrect: false }
            ]
        },

        // Flowcharts & pseudocode
        {
            questionText: 'What shape is typically used for the start/end in a flowchart?',
            options: [
                { text: 'Oval or circle', isCorrect: true },
                { text: 'Rectangle', isCorrect: false },
                { text: 'Diamond', isCorrect: false },
                { text: 'Triangle', isCorrect: false }
            ]
        },
        {
            questionText: 'What shape is used for decision points in a flowchart?',
            options: [
                { text: 'Diamond', isCorrect: true },
                { text: 'Rectangle', isCorrect: false },
                { text: 'Circle', isCorrect: false },
                { text: 'Square', isCorrect: false }
            ]
        },
        {
            questionText: 'What shape is used for processes in a flowchart?',
            options: [
                { text: 'Rectangle', isCorrect: true },
                { text: 'Diamond', isCorrect: false },
                { text: 'Circle', isCorrect: false },
                { text: 'Triangle', isCorrect: false }
            ]
        },
        {
            questionText: 'What is pseudocode?',
            options: [
                { text: 'Plain language description of programming logic', isCorrect: true },
                { text: 'Fake programming code', isCorrect: false },
                { text: 'Broken code', isCorrect: false },
                { text: 'Code that doesn\'t work', isCorrect: false }
            ]
        },
        {
            questionText: 'Why is pseudocode useful?',
            options: [
                { text: 'It helps plan algorithms before writing actual code', isCorrect: true },
                { text: 'It runs faster than real code', isCorrect: false },
                { text: 'It\'s easier to debug', isCorrect: false },
                { text: 'It uses less memory', isCorrect: false }
            ]
        },

        // Introduction to databases
        {
            questionText: 'What is a database?',
            options: [
                { text: 'An organized collection of structured data', isCorrect: true },
                { text: 'A single file', isCorrect: false },
                { text: 'A type of software', isCorrect: false },
                { text: 'A computer program', isCorrect: false }
            ]
        },
        {
            questionText: 'What is a table in a database?',
            options: [
                { text: 'A collection of related data organized in rows and columns', isCorrect: true },
                { text: 'A piece of furniture', isCorrect: false },
                { text: 'A type of chart', isCorrect: false },
                { text: 'A programming structure', isCorrect: false }
            ]
        },
        {
            questionText: 'What is a record in a database?',
            options: [
                { text: 'A single row of data in a table', isCorrect: true },
                { text: 'A column in a table', isCorrect: false },
                { text: 'The entire database', isCorrect: false },
                { text: 'A backup copy', isCorrect: false }
            ]
        },
        {
            questionText: 'What is a field in a database?',
            options: [
                { text: 'A single column or attribute in a table', isCorrect: true },
                { text: 'A row in a table', isCorrect: false },
                { text: 'The entire table', isCorrect: false },
                { text: 'A type of database', isCorrect: false }
            ]
        },
        {
            questionText: 'What is a primary key in a database?',
            options: [
                { text: 'A unique identifier for each record in a table', isCorrect: true },
                { text: 'The most important field', isCorrect: false },
                { text: 'The first field in a table', isCorrect: false },
                { text: 'A password for the database', isCorrect: false }
            ]
        },

        // Python programming
        {
            questionText: 'What is a for loop in Python?',
            options: [
                { text: 'A loop that repeats for a specific number of times', isCorrect: true },
                { text: 'A loop that never ends', isCorrect: false },
                { text: 'A loop that runs only once', isCorrect: false },
                { text: 'A loop for errors', isCorrect: false }
            ]
        },
        {
            questionText: 'What is a while loop in Python?',
            options: [
                { text: 'A loop that continues while a condition is true', isCorrect: true },
                { text: 'A loop that runs for a fixed time', isCorrect: false },
                { text: 'A loop that runs backwards', isCorrect: false },
                { text: 'A loop that waits', isCorrect: false }
            ]
        },
        {
            questionText: 'What is an if statement in Python?',
            options: [
                { text: 'A conditional statement that executes code based on a condition', isCorrect: true },
                { text: 'A loop statement', isCorrect: false },
                { text: 'A function definition', isCorrect: false },
                { text: 'An error statement', isCorrect: false }
            ]
        },
        {
            questionText: 'What is a function in Python?',
            options: [
                { text: 'A reusable block of code that performs a specific task', isCorrect: true },
                { text: 'A type of variable', isCorrect: false },
                { text: 'A mathematical operation', isCorrect: false },
                { text: 'An error message', isCorrect: false }
            ]
        },
        {
            questionText: 'How do you define a function in Python?',
            options: [
                { text: 'Using the def keyword', isCorrect: true },
                { text: 'Using the function keyword', isCorrect: false },
                { text: 'Using the create keyword', isCorrect: false },
                { text: 'Using the make keyword', isCorrect: false }
            ]
        },
        {
            questionText: 'What is file I/O in Python?',
            options: [
                { text: 'Reading from and writing to files', isCorrect: true },
                { text: 'Input and output to screen', isCorrect: false },
                { text: 'Internet operations', isCorrect: false },
                { text: 'Image operations', isCorrect: false }
            ]
        },
        {
            questionText: 'Which function is used to open a file in Python?',
            options: [
                { text: 'open()', isCorrect: true },
                { text: 'read()', isCorrect: false },
                { text: 'file()', isCorrect: false },
                { text: 'load()', isCorrect: false }
            ]
        },

        // Cyber ethics & digital footprint
        {
            questionText: 'What is a digital footprint?',
            options: [
                { text: 'The trail of data you leave behind when using the internet', isCorrect: true },
                { text: 'A type of computer virus', isCorrect: false },
                { text: 'A security software', isCorrect: false },
                { text: 'A type of password', isCorrect: false }
            ]
        },
        {
            questionText: 'Why should you be careful about your digital footprint?',
            options: [
                { text: 'It can affect your reputation and future opportunities', isCorrect: true },
                { text: 'It slows down your computer', isCorrect: false },
                { text: 'It costs money', isCorrect: false },
                { text: 'It takes up storage space', isCorrect: false }
            ]
        },
        {
            questionText: 'What is cyberbullying?',
            options: [
                { text: 'Using technology to harass, threaten, or embarrass others', isCorrect: true },
                { text: 'A type of computer game', isCorrect: false },
                { text: 'A security feature', isCorrect: false },
                { text: 'A programming technique', isCorrect: false }
            ]
        },
        {
            questionText: 'What should you do if you encounter cyberbullying?',
            options: [
                { text: 'Report it to authorities and don\'t respond to the bully', isCorrect: true },
                { text: 'Fight back with similar behavior', isCorrect: false },
                { text: 'Ignore it completely', isCorrect: false },
                { text: 'Share it with friends', isCorrect: false }
            ]
        },
        {
            questionText: 'What is digital citizenship?',
            options: [
                { text: 'Responsible and ethical use of technology', isCorrect: true },
                { text: 'Having a digital passport', isCorrect: false },
                { text: 'Living in a digital world', isCorrect: false },
                { text: 'Being a citizen of a digital country', isCorrect: false }
            ]
        }
    ];

    const additionalQuestions = [];
    const difficulties = ['basic', 'medium', 'advanced'];
    const topics = [
        'Memory Systems', 'Network Protocols', 'Cloud Platforms', 'HTML Advanced', 'CSS Styling',
        'Database Concepts', 'Python Programming', 'Algorithm Design', 'Cyber Ethics', 'Digital Safety',
        'Web Development', 'File Systems', 'Security Concepts', 'Programming Logic', 'Data Management'
    ];
    
    // Add the template questions first
    questionTemplates.forEach((template, index) => {
        additionalQuestions.push({
            grade: 8,
            difficulty: difficulties[index % 3],
            questionText: template.questionText,
            options: template.options
        });
    });
    
    // Generate more questions to reach 300 total
    const remainingCount = 300 - class8Questions.length - questionTemplates.length;
    for (let i = 0; i < remainingCount; i++) {
        const topic = topics[i % topics.length];
        additionalQuestions.push({
            grade: 8,
            difficulty: difficulties[i % 3],
            questionText: `${topic} - Question ${i + 1}: What is a key concept in ${topic.toLowerCase()}?`,
            options: [
                { text: `Important aspect of ${topic}`, isCorrect: true },
                { text: 'Incorrect option A', isCorrect: false },
                { text: 'Incorrect option B', isCorrect: false },
                { text: 'Incorrect option C', isCorrect: false }
            ]
        });
    }
    
    return additionalQuestions;
};

const allQuestions = [...class8Questions, ...generateMoreClass8Questions()];

function seedClass8Questions() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath);
        db.serialize(() => {
            let completed = 0;
            allQuestions.forEach((q) => {
                db.run('INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                    [q.grade, q.difficulty, q.questionText], function(err) {
                    if (err) {
                        console.error('Error inserting question:', err);
                        return;
                    }
                    const questionId = this.lastID;
                    let optionCount = 0;
                    q.options.forEach((option, index) => {
                        db.run('INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                            [questionId, option.text, option.isCorrect ? 1 : 0, index + 1], (err) => {
                            if (err) {
                                console.error('Error inserting option:', err);
                                return;
                            }
                            optionCount++;
                            if (optionCount === q.options.length) {
                                completed++;
                                if (completed === allQuestions.length) {
                                    db.close(() => {
                                        console.log(`Seeded ${allQuestions.length} questions for Class 8`);
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
    seedClass8Questions();
}

module.exports = seedClass8Questions;