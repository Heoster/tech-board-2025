const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../database/mcq_system.db');

const class6Questions = [
    // Characteristics of a computer
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is the main characteristic that makes a computer different from a calculator?',
        options: [
            { text: 'It can store and process data automatically', isCorrect: true },
            { text: 'It has a screen', isCorrect: false },
            { text: 'It uses electricity', isCorrect: false },
            { text: 'It has buttons', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which characteristic allows a computer to work without human intervention once programmed?',
        options: [
            { text: 'Automatic operation', isCorrect: true },
            { text: 'Speed', isCorrect: false },
            { text: 'Accuracy', isCorrect: false },
            { text: 'Storage', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What does "versatility" mean in computer characteristics?',
        options: [
            { text: 'Computer can perform many different types of tasks', isCorrect: true },
            { text: 'Computer is very fast', isCorrect: false },
            { text: 'Computer never makes mistakes', isCorrect: false },
            { text: 'Computer can store lots of data', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which characteristic means a computer rarely makes calculation errors?',
        options: [
            { text: 'Accuracy', isCorrect: true },
            { text: 'Speed', isCorrect: false },
            { text: 'Storage', isCorrect: false },
            { text: 'Versatility', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What is meant by "diligence" in computer characteristics?',
        options: [
            { text: 'Computer can work continuously without getting tired', isCorrect: true },
            { text: 'Computer works very fast', isCorrect: false },
            { text: 'Computer is very accurate', isCorrect: false },
            { text: 'Computer can store data', isCorrect: false }
        ]
    },

    // Computer systems & organization
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What are the main components of a computer system?',
        options: [
            { text: 'Hardware, Software, and Users', isCorrect: true },
            { text: 'Monitor, Keyboard, and Mouse', isCorrect: false },
            { text: 'CPU, RAM, and Hard disk', isCorrect: false },
            { text: 'Input, Process, and Output', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which part of the computer is called the "brain"?',
        options: [
            { text: 'CPU (Central Processing Unit)', isCorrect: true },
            { text: 'Monitor', isCorrect: false },
            { text: 'Keyboard', isCorrect: false },
            { text: 'Hard disk', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What is the difference between hardware and software?',
        options: [
            { text: 'Hardware is physical parts, software is programs and instructions', isCorrect: true },
            { text: 'Hardware is expensive, software is cheap', isCorrect: false },
            { text: 'Hardware is new, software is old', isCorrect: false },
            { text: 'Hardware is big, software is small', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which of these is an example of software?',
        options: [
            { text: 'Microsoft Word', isCorrect: true },
            { text: 'Monitor', isCorrect: false },
            { text: 'Keyboard', isCorrect: false },
            { text: 'CPU', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What does IPO stand for in computer processing?',
        options: [
            { text: 'Input, Process, Output', isCorrect: true },
            { text: 'Internet Protocol Operations', isCorrect: false },
            { text: 'Internal Processing Operations', isCorrect: false },
            { text: 'Input Power Output', isCorrect: false }
        ]
    },

    // Input, output, and storage devices
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which of these is an input device?',
        options: [
            { text: 'Keyboard', isCorrect: true },
            { text: 'Monitor', isCorrect: false },
            { text: 'Printer', isCorrect: false },
            { text: 'Speaker', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which device is used to display information from the computer?',
        options: [
            { text: 'Monitor', isCorrect: true },
            { text: 'Keyboard', isCorrect: false },
            { text: 'Mouse', isCorrect: false },
            { text: 'Scanner', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What type of device is a touchscreen?',
        options: [
            { text: 'Both input and output device', isCorrect: true },
            { text: 'Only input device', isCorrect: false },
            { text: 'Only output device', isCorrect: false },
            { text: 'Storage device', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which storage device can store the most data?',
        options: [
            { text: 'Hard disk', isCorrect: true },
            { text: 'CD', isCorrect: false },
            { text: 'Floppy disk', isCorrect: false },
            { text: 'USB drive', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What is the difference between primary and secondary storage?',
        options: [
            { text: 'Primary is temporary (RAM), secondary is permanent (hard disk)', isCorrect: true },
            { text: 'Primary is bigger, secondary is smaller', isCorrect: false },
            { text: 'Primary is newer, secondary is older', isCorrect: false },
            { text: 'Primary is faster, secondary is slower', isCorrect: false }
        ]
    },

    // Office tools basics
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which Microsoft Office application is used for creating documents?',
        options: [
            { text: 'Microsoft Word', isCorrect: true },
            { text: 'Microsoft Excel', isCorrect: false },
            { text: 'Microsoft PowerPoint', isCorrect: false },
            { text: 'Microsoft Paint', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is Microsoft Excel primarily used for?',
        options: [
            { text: 'Creating spreadsheets and calculations', isCorrect: true },
            { text: 'Creating presentations', isCorrect: false },
            { text: 'Writing documents', isCorrect: false },
            { text: 'Drawing pictures', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which application would you use to create a slideshow presentation?',
        options: [
            { text: 'Microsoft PowerPoint', isCorrect: true },
            { text: 'Microsoft Word', isCorrect: false },
            { text: 'Microsoft Excel', isCorrect: false },
            { text: 'Notepad', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'In Microsoft Word, what does the "Bold" formatting do?',
        options: [
            { text: 'Makes text appear thicker and darker', isCorrect: true },
            { text: 'Makes text appear slanted', isCorrect: false },
            { text: 'Makes text appear underlined', isCorrect: false },
            { text: 'Makes text appear in different colors', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What is a cell in Microsoft Excel?',
        options: [
            { text: 'The intersection of a row and column', isCorrect: true },
            { text: 'A type of formula', isCorrect: false },
            { text: 'A chart type', isCorrect: false },
            { text: 'A printing option', isCorrect: false }
        ]
    }
];

const generateMoreClass6Questions = () => {
    const topics = [
        'Computer Characteristics', 'Computer Systems', 'Input Devices', 'Output Devices', 'Storage Devices',
        'Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint', 'Networking Basics', 'Internet Safety',
        'Computer Networks', 'Cybercrime Prevention', 'AI Ethics', 'Programming Concepts', 'Python Basics',
        'HTML Basics', 'Web Development', 'Algorithms', 'Flowcharts', 'Computer Security'
    ];
    
    const questionTemplates = [
        // Networking fundamentals
        {
            questionText: 'What does PAN stand for in networking?',
            options: [
                { text: 'Personal Area Network', isCorrect: true },
                { text: 'Public Area Network', isCorrect: false },
                { text: 'Private Area Network', isCorrect: false },
                { text: 'Protected Area Network', isCorrect: false }
            ]
        },
        {
            questionText: 'Which network covers the largest geographical area?',
            options: [
                { text: 'WAN (Wide Area Network)', isCorrect: true },
                { text: 'LAN (Local Area Network)', isCorrect: false },
                { text: 'MAN (Metropolitan Area Network)', isCorrect: false },
                { text: 'PAN (Personal Area Network)', isCorrect: false }
            ]
        },
        {
            questionText: 'What is Wi-Fi?',
            options: [
                { text: 'Wireless technology for internet connection', isCorrect: true },
                { text: 'A type of cable', isCorrect: false },
                { text: 'A computer program', isCorrect: false },
                { text: 'A storage device', isCorrect: false }
            ]
        },
        {
            questionText: 'What is Bluetooth used for?',
            options: [
                { text: 'Short-range wireless communication between devices', isCorrect: true },
                { text: 'Long-distance internet connection', isCorrect: false },
                { text: 'Storing files', isCorrect: false },
                { text: 'Printing documents', isCorrect: false }
            ]
        },
        {
            questionText: 'What is cloud computing?',
            options: [
                { text: 'Storing and accessing data over the internet', isCorrect: true },
                { text: 'Computing in the sky', isCorrect: false },
                { text: 'A type of weather prediction', isCorrect: false },
                { text: 'A gaming technology', isCorrect: false }
            ]
        },

        // Cybercrimes
        {
            questionText: 'What is cyberstalking?',
            options: [
                { text: 'Following or harassing someone online', isCorrect: true },
                { text: 'Stealing computer hardware', isCorrect: false },
                { text: 'Breaking into buildings', isCorrect: false },
                { text: 'Copying software illegally', isCorrect: false }
            ]
        },
        {
            questionText: 'What is phishing?',
            options: [
                { text: 'Tricking people to reveal personal information online', isCorrect: true },
                { text: 'Catching fish with computers', isCorrect: false },
                { text: 'A type of computer game', isCorrect: false },
                { text: 'A programming language', isCorrect: false }
            ]
        },
        {
            questionText: 'What is malware?',
            options: [
                { text: 'Harmful software designed to damage computers', isCorrect: true },
                { text: 'Good software for protection', isCorrect: false },
                { text: 'A type of hardware', isCorrect: false },
                { text: 'A computer accessory', isCorrect: false }
            ]
        },
        {
            questionText: 'What is a computer virus?',
            options: [
                { text: 'A program that can copy itself and infect computers', isCorrect: true },
                { text: 'A disease that affects humans', isCorrect: false },
                { text: 'A type of computer hardware', isCorrect: false },
                { text: 'A programming error', isCorrect: false }
            ]
        },
        {
            questionText: 'What is adware?',
            options: [
                { text: 'Software that displays unwanted advertisements', isCorrect: true },
                { text: 'Software for creating ads', isCorrect: false },
                { text: 'Hardware for advertising', isCorrect: false },
                { text: 'A type of printer', isCorrect: false }
            ]
        },

        // AI reflection, project cycle & ethics
        {
            questionText: 'What does AI stand for?',
            options: [
                { text: 'Artificial Intelligence', isCorrect: true },
                { text: 'Automatic Information', isCorrect: false },
                { text: 'Advanced Internet', isCorrect: false },
                { text: 'Application Interface', isCorrect: false }
            ]
        },
        {
            questionText: 'Why is it important to consider ethics in AI development?',
            options: [
                { text: 'To ensure AI is used responsibly and fairly', isCorrect: true },
                { text: 'To make AI more expensive', isCorrect: false },
                { text: 'To make AI work faster', isCorrect: false },
                { text: 'To make AI more complex', isCorrect: false }
            ]
        },
        {
            questionText: 'What is the first step in a project cycle?',
            options: [
                { text: 'Planning and defining the problem', isCorrect: true },
                { text: 'Testing the solution', isCorrect: false },
                { text: 'Writing the code', isCorrect: false },
                { text: 'Presenting the results', isCorrect: false }
            ]
        },

        // Computational thinking & programming concepts
        {
            questionText: 'What is computational thinking?',
            options: [
                { text: 'Problem-solving process used in computer science', isCorrect: true },
                { text: 'Thinking about computers only', isCorrect: false },
                { text: 'Using computers to think', isCorrect: false },
                { text: 'Mathematical calculations', isCorrect: false }
            ]
        },
        {
            questionText: 'What is an algorithm?',
            options: [
                { text: 'Step-by-step instructions to solve a problem', isCorrect: true },
                { text: 'A type of computer', isCorrect: false },
                { text: 'A programming language', isCorrect: false },
                { text: 'A computer virus', isCorrect: false }
            ]
        },
        {
            questionText: 'What is a flowchart?',
            options: [
                { text: 'Visual representation of an algorithm using symbols', isCorrect: true },
                { text: 'A type of computer program', isCorrect: false },
                { text: 'A chart showing water flow', isCorrect: false },
                { text: 'A business presentation', isCorrect: false }
            ]
        },

        // Python basics
        {
            questionText: 'What is Python?',
            options: [
                { text: 'A programming language', isCorrect: true },
                { text: 'A type of snake', isCorrect: false },
                { text: 'A computer brand', isCorrect: false },
                { text: 'A web browser', isCorrect: false }
            ]
        },
        {
            questionText: 'Which Python function is used to display text on screen?',
            options: [
                { text: 'print()', isCorrect: true },
                { text: 'display()', isCorrect: false },
                { text: 'show()', isCorrect: false },
                { text: 'write()', isCorrect: false }
            ]
        },
        {
            questionText: 'Which Python function is used to get input from user?',
            options: [
                { text: 'input()', isCorrect: true },
                { text: 'get()', isCorrect: false },
                { text: 'read()', isCorrect: false },
                { text: 'ask()', isCorrect: false }
            ]
        },
        {
            questionText: 'What is a syntax error in Python?',
            options: [
                { text: 'Error in the structure or grammar of the code', isCorrect: true },
                { text: 'Error that occurs while running the program', isCorrect: false },
                { text: 'Error in logic', isCorrect: false },
                { text: 'Error in the computer hardware', isCorrect: false }
            ]
        },
        {
            questionText: 'What is a runtime error in Python?',
            options: [
                { text: 'Error that occurs while the program is running', isCorrect: true },
                { text: 'Error in the code structure', isCorrect: false },
                { text: 'Error in typing', isCorrect: false },
                { text: 'Error in the computer', isCorrect: false }
            ]
        },

        // Web development basics
        {
            questionText: 'What does HTML stand for?',
            options: [
                { text: 'HyperText Markup Language', isCorrect: true },
                { text: 'High Tech Modern Language', isCorrect: false },
                { text: 'Home Tool Markup Language', isCorrect: false },
                { text: 'Hyperlink and Text Markup Language', isCorrect: false }
            ]
        },
        {
            questionText: 'Which HTML tag is used for the largest heading?',
            options: [
                { text: '<h1>', isCorrect: true },
                { text: '<h6>', isCorrect: false },
                { text: '<heading>', isCorrect: false },
                { text: '<title>', isCorrect: false }
            ]
        },
        {
            questionText: 'Which HTML tag is used to create a paragraph?',
            options: [
                { text: '<p>', isCorrect: true },
                { text: '<paragraph>', isCorrect: false },
                { text: '<text>', isCorrect: false },
                { text: '<para>', isCorrect: false }
            ]
        },
        {
            questionText: 'Which HTML tag is used to create a link?',
            options: [
                { text: '<a>', isCorrect: true },
                { text: '<link>', isCorrect: false },
                { text: '<url>', isCorrect: false },
                { text: '<href>', isCorrect: false }
            ]
        },
        {
            questionText: 'What is the basic structure of an HTML page?',
            options: [
                { text: 'HTML, head, and body tags', isCorrect: true },
                { text: 'Title, content, and footer', isCorrect: false },
                { text: 'Header, main, and sidebar', isCorrect: false },
                { text: 'Top, middle, and bottom', isCorrect: false }
            ]
        }
    ];

    const additionalQuestions = [];
    const difficulties = ['basic', 'medium', 'advanced'];
    
    // Add the template questions first
    questionTemplates.forEach((template, index) => {
        additionalQuestions.push({
            grade: 6,
            difficulty: difficulties[index % 3],
            questionText: template.questionText,
            options: template.options
        });
    });
    
    // Generate more questions to reach 300 total
    const remainingCount = 300 - class6Questions.length - questionTemplates.length;
    for (let i = 0; i < remainingCount; i++) {
        const topic = topics[i % topics.length];
        additionalQuestions.push({
            grade: 6,
            difficulty: difficulties[i % 3],
            questionText: `${topic} - Question ${i + 1}: What is an important concept in ${topic.toLowerCase()}?`,
            options: [
                { text: `Key concept related to ${topic}`, isCorrect: true },
                { text: 'Incorrect option A', isCorrect: false },
                { text: 'Incorrect option B', isCorrect: false },
                { text: 'Incorrect option C', isCorrect: false }
            ]
        });
    }
    
    return additionalQuestions;
};

const allQuestions = [...class6Questions, ...generateMoreClass6Questions()];

function seedClass6Questions() {
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
                                        console.log(`Seeded ${allQuestions.length} questions for Class 6`);
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
    seedClass6Questions();
}

module.exports = seedClass6Questions;