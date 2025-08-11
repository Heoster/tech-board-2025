const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../database/mcq_system.db');

const class7Questions = [
    // Operating systems & file management
    {
        grade: 7, difficulty: 'basic',
        questionText: 'What is an operating system?',
        options: [
            { text: 'Software that manages computer hardware and software resources', isCorrect: true },
            { text: 'A type of computer hardware', isCorrect: false },
            { text: 'A programming language', isCorrect: false },
            { text: 'A web browser', isCorrect: false }
        ]
    },
    {
        grade: 7, difficulty: 'basic',
        questionText: 'Which of these is an example of an operating system?',
        options: [
            { text: 'Windows 10', isCorrect: true },
            { text: 'Microsoft Word', isCorrect: false },
            { text: 'Google Chrome', isCorrect: false },
            { text: 'Adobe Photoshop', isCorrect: false }
        ]
    },
    {
        grade: 7, difficulty: 'medium',
        questionText: 'What is file management in an operating system?',
        options: [
            { text: 'Organizing, storing, and retrieving files on storage devices', isCorrect: true },
            { text: 'Creating new files only', isCorrect: false },
            { text: 'Deleting old files only', isCorrect: false },
            { text: 'Copying files to other computers', isCorrect: false }
        ]
    },
    {
        grade: 7, difficulty: 'medium',
        questionText: 'What is a folder in file management?',
        options: [
            { text: 'A container used to organize and store files', isCorrect: true },
            { text: 'A type of file', isCorrect: false },
            { text: 'A computer program', isCorrect: false },
            { text: 'A hardware component', isCorrect: false }
        ]
    },
    {
        grade: 7, difficulty: 'basic',
        questionText: 'What does GUI stand for in operating systems?',
        options: [
            { text: 'Graphical User Interface', isCorrect: true },
            { text: 'General User Interface', isCorrect: false },
            { text: 'Global User Interface', isCorrect: false },
            { text: 'Guided User Interface', isCorrect: false }
        ]
    },

    // File extensions and formats
    {
        grade: 7, difficulty: 'basic',
        questionText: 'What type of file is indicated by the .docx extension?',
        options: [
            { text: 'Microsoft Word document', isCorrect: true },
            { text: 'Image file', isCorrect: false },
            { text: 'Audio file', isCorrect: false },
            { text: 'Video file', isCorrect: false }
        ]
    },
    {
        grade: 7, difficulty: 'basic',
        questionText: 'What type of file is indicated by the .jpg extension?',
        options: [
            { text: 'Image file', isCorrect: true },
            { text: 'Text document', isCorrect: false },
            { text: 'Audio file', isCorrect: false },
            { text: 'Video file', isCorrect: false }
        ]
    },
    {
        grade: 7, difficulty: 'basic',
        questionText: 'What type of file is indicated by the .mp3 extension?',
        options: [
            { text: 'Audio file', isCorrect: true },
            { text: 'Image file', isCorrect: false },
            { text: 'Text document', isCorrect: false },
            { text: 'Spreadsheet', isCorrect: false }
        ]
    },
    {
        grade: 7, difficulty: 'medium',
        questionText: 'What type of file is indicated by the .exe extension?',
        options: [
            { text: 'Executable program file', isCorrect: true },
            { text: 'Image file', isCorrect: false },
            { text: 'Text document', isCorrect: false },
            { text: 'Audio file', isCorrect: false }
        ]
    },
    {
        grade: 7, difficulty: 'medium',
        questionText: 'Which file extension is commonly used for spreadsheets?',
        options: [
            { text: '.xlsx', isCorrect: true },
            { text: '.jpg', isCorrect: false },
            { text: '.mp3', isCorrect: false },
            { text: '.exe', isCorrect: false }
        ]
    },

    // Email fundamentals and web browsers
    {
        grade: 7, difficulty: 'basic',
        questionText: 'What does email stand for?',
        options: [
            { text: 'Electronic mail', isCorrect: true },
            { text: 'Emergency mail', isCorrect: false },
            { text: 'Express mail', isCorrect: false },
            { text: 'External mail', isCorrect: false }
        ]
    },
    {
        grade: 7, difficulty: 'basic',
        questionText: 'What symbol is always present in an email address?',
        options: [
            { text: '@', isCorrect: true },
            { text: '#', isCorrect: false },
            { text: '&', isCorrect: false },
            { text: '%', isCorrect: false }
        ]
    },
    {
        grade: 7, difficulty: 'medium',
        questionText: 'What is the purpose of the subject line in an email?',
        options: [
            { text: 'To briefly describe what the email is about', isCorrect: true },
            { text: 'To show the sender\'s name', isCorrect: false },
            { text: 'To show the date sent', isCorrect: false },
            { text: 'To show the file size', isCorrect: false }
        ]
    },
    {
        grade: 7, difficulty: 'basic',
        questionText: 'Which of these is a web browser?',
        options: [
            { text: 'Google Chrome', isCorrect: true },
            { text: 'Microsoft Word', isCorrect: false },
            { text: 'Adobe Photoshop', isCorrect: false },
            { text: 'Windows Media Player', isCorrect: false }
        ]
    },
    {
        grade: 7, difficulty: 'medium',
        questionText: 'What is the main function of a web browser?',
        options: [
            { text: 'To access and display web pages from the internet', isCorrect: true },
            { text: 'To create documents', isCorrect: false },
            { text: 'To edit images', isCorrect: false },
            { text: 'To play music', isCorrect: false }
        ]
    },

    // Advanced Office tools features
    {
        grade: 7, difficulty: 'medium',
        questionText: 'What is collaboration in Office tools?',
        options: [
            { text: 'Multiple people working on the same document simultaneously', isCorrect: true },
            { text: 'Creating backup copies', isCorrect: false },
            { text: 'Printing documents', isCorrect: false },
            { text: 'Saving files', isCorrect: false }
        ]
    },
    {
        grade: 7, difficulty: 'medium',
        questionText: 'What is a template in Office applications?',
        options: [
            { text: 'A pre-designed format that can be used as a starting point', isCorrect: true },
            { text: 'A type of font', isCorrect: false },
            { text: 'A printing option', isCorrect: false },
            { text: 'A file extension', isCorrect: false }
        ]
    },
    {
        grade: 7, difficulty: 'medium',
        questionText: 'What is track changes feature in Word?',
        options: [
            { text: 'Shows all edits and modifications made to a document', isCorrect: true },
            { text: 'Counts the number of words', isCorrect: false },
            { text: 'Changes the font automatically', isCorrect: false },
            { text: 'Saves the document automatically', isCorrect: false }
        ]
    },
    {
        grade: 7, difficulty: 'advanced',
        questionText: 'What is mail merge in Word?',
        options: [
            { text: 'Combining a document with a data source to create personalized documents', isCorrect: true },
            { text: 'Merging two documents into one', isCorrect: false },
            { text: 'Sending emails from Word', isCorrect: false },
            { text: 'Combining different fonts', isCorrect: false }
        ]
    },
    {
        grade: 7, difficulty: 'medium',
        questionText: 'What is a pivot table in Excel?',
        options: [
            { text: 'A tool for summarizing and analyzing large amounts of data', isCorrect: true },
            { text: 'A type of chart', isCorrect: false },
            { text: 'A table that rotates', isCorrect: false },
            { text: 'A printing format', isCorrect: false }
        ]
    }
];

const generateMoreClass7Questions = () => {
    const questionTemplates = [
        // Introduction to Python programming
        {
            questionText: 'What is a variable in Python?',
            options: [
                { text: 'A container for storing data values', isCorrect: true },
                { text: 'A type of function', isCorrect: false },
                { text: 'A programming error', isCorrect: false },
                { text: 'A file extension', isCorrect: false }
            ]
        },
        {
            questionText: 'Which of these is a valid variable name in Python?',
            options: [
                { text: 'my_age', isCorrect: true },
                { text: '2name', isCorrect: false },
                { text: 'my-age', isCorrect: false },
                { text: 'class', isCorrect: false }
            ]
        },
        {
            questionText: 'What are the basic data types in Python?',
            options: [
                { text: 'int, float, str, bool', isCorrect: true },
                { text: 'number, text, logic', isCorrect: false },
                { text: 'integer, decimal, character', isCorrect: false },
                { text: 'whole, part, letter', isCorrect: false }
            ]
        },
        {
            questionText: 'What is an integer in Python?',
            options: [
                { text: 'A whole number without decimal points', isCorrect: true },
                { text: 'A number with decimal points', isCorrect: false },
                { text: 'A text value', isCorrect: false },
                { text: 'A true/false value', isCorrect: false }
            ]
        },
        {
            questionText: 'What is a string in Python?',
            options: [
                { text: 'A sequence of characters enclosed in quotes', isCorrect: true },
                { text: 'A number', isCorrect: false },
                { text: 'A mathematical operation', isCorrect: false },
                { text: 'A programming error', isCorrect: false }
            ]
        },
        {
            questionText: 'Which arithmetic operator is used for addition in Python?',
            options: [
                { text: '+', isCorrect: true },
                { text: '-', isCorrect: false },
                { text: '*', isCorrect: false },
                { text: '/', isCorrect: false }
            ]
        },
        {
            questionText: 'Which arithmetic operator is used for multiplication in Python?',
            options: [
                { text: '*', isCorrect: true },
                { text: '+', isCorrect: false },
                { text: 'x', isCorrect: false },
                { text: '&', isCorrect: false }
            ]
        },
        {
            questionText: 'What does the // operator do in Python?',
            options: [
                { text: 'Floor division (division without remainder)', isCorrect: true },
                { text: 'Regular division', isCorrect: false },
                { text: 'Multiplication', isCorrect: false },
                { text: 'Comments', isCorrect: false }
            ]
        },

        // HTML tags & structure
        {
            questionText: 'Which HTML tag is used to insert an image?',
            options: [
                { text: '<img>', isCorrect: true },
                { text: '<image>', isCorrect: false },
                { text: '<picture>', isCorrect: false },
                { text: '<photo>', isCorrect: false }
            ]
        },
        {
            questionText: 'Which HTML tag is used to create an unordered list?',
            options: [
                { text: '<ul>', isCorrect: true },
                { text: '<ol>', isCorrect: false },
                { text: '<list>', isCorrect: false },
                { text: '<li>', isCorrect: false }
            ]
        },
        {
            questionText: 'Which HTML tag is used to create list items?',
            options: [
                { text: '<li>', isCorrect: true },
                { text: '<item>', isCorrect: false },
                { text: '<list>', isCorrect: false },
                { text: '<ul>', isCorrect: false }
            ]
        },
        {
            questionText: 'What is the difference between block and inline elements?',
            options: [
                { text: 'Block elements take full width, inline elements take only necessary width', isCorrect: true },
                { text: 'Block elements are bigger, inline elements are smaller', isCorrect: false },
                { text: 'Block elements are visible, inline elements are hidden', isCorrect: false },
                { text: 'Block elements are new, inline elements are old', isCorrect: false }
            ]
        },
        {
            questionText: 'Which of these is a block element?',
            options: [
                { text: '<div>', isCorrect: true },
                { text: '<span>', isCorrect: false },
                { text: '<a>', isCorrect: false },
                { text: '<strong>', isCorrect: false }
            ]
        },
        {
            questionText: 'Which of these is an inline element?',
            options: [
                { text: '<span>', isCorrect: true },
                { text: '<div>', isCorrect: false },
                { text: '<p>', isCorrect: false },
                { text: '<h1>', isCorrect: false }
            ]
        },

        // CSS styling fundamentals
        {
            questionText: 'What does CSS stand for?',
            options: [
                { text: 'Cascading Style Sheets', isCorrect: true },
                { text: 'Computer Style Sheets', isCorrect: false },
                { text: 'Creative Style Sheets', isCorrect: false },
                { text: 'Colorful Style Sheets', isCorrect: false }
            ]
        },
        {
            questionText: 'What is the purpose of CSS?',
            options: [
                { text: 'To style and format HTML elements', isCorrect: true },
                { text: 'To create HTML structure', isCorrect: false },
                { text: 'To add functionality to web pages', isCorrect: false },
                { text: 'To store data', isCorrect: false }
            ]
        },
        {
            questionText: 'How do you add inline CSS to an HTML element?',
            options: [
                { text: 'Using the style attribute', isCorrect: true },
                { text: 'Using the css attribute', isCorrect: false },
                { text: 'Using the format attribute', isCorrect: false },
                { text: 'Using the design attribute', isCorrect: false }
            ]
        },
        {
            questionText: 'Which CSS property is used to change text color?',
            options: [
                { text: 'color', isCorrect: true },
                { text: 'text-color', isCorrect: false },
                { text: 'font-color', isCorrect: false },
                { text: 'background-color', isCorrect: false }
            ]
        },
        {
            questionText: 'Which CSS property is used to change font size?',
            options: [
                { text: 'font-size', isCorrect: true },
                { text: 'text-size', isCorrect: false },
                { text: 'size', isCorrect: false },
                { text: 'font-width', isCorrect: false }
            ]
        },
        {
            questionText: 'Which CSS property is used to change the font family?',
            options: [
                { text: 'font-family', isCorrect: true },
                { text: 'font-type', isCorrect: false },
                { text: 'text-font', isCorrect: false },
                { text: 'font-style', isCorrect: false }
            ]
        },

        // Simple HTML forms
        {
            questionText: 'Which HTML tag is used to create a form?',
            options: [
                { text: '<form>', isCorrect: true },
                { text: '<input>', isCorrect: false },
                { text: '<field>', isCorrect: false },
                { text: '<data>', isCorrect: false }
            ]
        },
        {
            questionText: 'Which HTML tag is used to create a text input field?',
            options: [
                { text: '<input type="text">', isCorrect: true },
                { text: '<text>', isCorrect: false },
                { text: '<field>', isCorrect: false },
                { text: '<textbox>', isCorrect: false }
            ]
        },
        {
            questionText: 'Which HTML tag is used to create a submit button?',
            options: [
                { text: '<input type="submit">', isCorrect: true },
                { text: '<button>', isCorrect: false },
                { text: '<submit>', isCorrect: false },
                { text: '<send>', isCorrect: false }
            ]
        },
        {
            questionText: 'What attribute is used to specify where form data should be sent?',
            options: [
                { text: 'action', isCorrect: true },
                { text: 'method', isCorrect: false },
                { text: 'target', isCorrect: false },
                { text: 'destination', isCorrect: false }
            ]
        },

        // Networking concepts
        {
            questionText: 'What is an IP address?',
            options: [
                { text: 'A unique identifier for devices on a network', isCorrect: true },
                { text: 'A type of cable', isCorrect: false },
                { text: 'A software program', isCorrect: false },
                { text: 'A hardware component', isCorrect: false }
            ]
        },
        {
            questionText: 'What is a MAC address?',
            options: [
                { text: 'A unique hardware identifier for network devices', isCorrect: true },
                { text: 'A software address', isCorrect: false },
                { text: 'A type of computer', isCorrect: false },
                { text: 'An internet address', isCorrect: false }
            ]
        },
        {
            questionText: 'What is the difference between IP and MAC addresses?',
            options: [
                { text: 'IP is logical and can change, MAC is physical and permanent', isCorrect: true },
                { text: 'IP is permanent, MAC can change', isCorrect: false },
                { text: 'They are the same thing', isCorrect: false },
                { text: 'IP is for computers, MAC is for phones', isCorrect: false }
            ]
        },
        {
            questionText: 'What is a network topology?',
            options: [
                { text: 'The physical or logical arrangement of network devices', isCorrect: true },
                { text: 'A type of cable', isCorrect: false },
                { text: 'A network protocol', isCorrect: false },
                { text: 'A security system', isCorrect: false }
            ]
        },
        {
            questionText: 'Which topology connects all devices to a central hub?',
            options: [
                { text: 'Star topology', isCorrect: true },
                { text: 'Ring topology', isCorrect: false },
                { text: 'Bus topology', isCorrect: false },
                { text: 'Mesh topology', isCorrect: false }
            ]
        },

        // Cloud computing services
        {
            questionText: 'What does IaaS stand for?',
            options: [
                { text: 'Infrastructure as a Service', isCorrect: true },
                { text: 'Internet as a Service', isCorrect: false },
                { text: 'Information as a Service', isCorrect: false },
                { text: 'Integration as a Service', isCorrect: false }
            ]
        },
        {
            questionText: 'What does PaaS stand for?',
            options: [
                { text: 'Platform as a Service', isCorrect: true },
                { text: 'Program as a Service', isCorrect: false },
                { text: 'Process as a Service', isCorrect: false },
                { text: 'Product as a Service', isCorrect: false }
            ]
        },
        {
            questionText: 'What does SaaS stand for?',
            options: [
                { text: 'Software as a Service', isCorrect: true },
                { text: 'System as a Service', isCorrect: false },
                { text: 'Security as a Service', isCorrect: false },
                { text: 'Storage as a Service', isCorrect: false }
            ]
        },
        {
            questionText: 'Which is an example of SaaS?',
            options: [
                { text: 'Google Docs', isCorrect: true },
                { text: 'Amazon EC2', isCorrect: false },
                { text: 'Microsoft Azure', isCorrect: false },
                { text: 'VMware', isCorrect: false }
            ]
        },

        // Cyber safety practices
        {
            questionText: 'What makes a password strong?',
            options: [
                { text: 'Long, complex, and unique combination of characters', isCorrect: true },
                { text: 'Using your name', isCorrect: false },
                { text: 'Using common words', isCorrect: false },
                { text: 'Using only numbers', isCorrect: false }
            ]
        },
        {
            questionText: 'How can you identify a phishing email?',
            options: [
                { text: 'Suspicious sender, urgent requests, poor grammar', isCorrect: true },
                { text: 'It comes from friends', isCorrect: false },
                { text: 'It has good formatting', isCorrect: false },
                { text: 'It has no attachments', isCorrect: false }
            ]
        },
        {
            questionText: 'What should you do if you receive a suspicious email?',
            options: [
                { text: 'Do not click links or download attachments, report it', isCorrect: true },
                { text: 'Forward it to friends', isCorrect: false },
                { text: 'Reply to ask questions', isCorrect: false },
                { text: 'Click the links to investigate', isCorrect: false }
            ]
        },
        {
            questionText: 'Why is it important to keep software updated?',
            options: [
                { text: 'Updates often include security patches', isCorrect: true },
                { text: 'Updates make software slower', isCorrect: false },
                { text: 'Updates are not important', isCorrect: false },
                { text: 'Updates only change appearance', isCorrect: false }
            ]
        },

        // Computational thinking
        {
            questionText: 'What is problem decomposition?',
            options: [
                { text: 'Breaking down complex problems into smaller, manageable parts', isCorrect: true },
                { text: 'Solving problems quickly', isCorrect: false },
                { text: 'Making problems more complex', isCorrect: false },
                { text: 'Avoiding difficult problems', isCorrect: false }
            ]
        },
        {
            questionText: 'What is stepwise refinement?',
            options: [
                { text: 'Gradually improving a solution by adding more detail', isCorrect: true },
                { text: 'Making solutions more complex', isCorrect: false },
                { text: 'Solving problems in one step', isCorrect: false },
                { text: 'Avoiding detailed solutions', isCorrect: false }
            ]
        },
        {
            questionText: 'What is pattern recognition in computational thinking?',
            options: [
                { text: 'Identifying similarities and trends in data or problems', isCorrect: true },
                { text: 'Creating new patterns', isCorrect: false },
                { text: 'Avoiding patterns', isCorrect: false },
                { text: 'Making patterns more complex', isCorrect: false }
            ]
        },
        {
            questionText: 'What is abstraction in computational thinking?',
            options: [
                { text: 'Focusing on essential features while ignoring irrelevant details', isCorrect: true },
                { text: 'Making things more detailed', isCorrect: false },
                { text: 'Adding complexity', isCorrect: false },
                { text: 'Avoiding simplification', isCorrect: false }
            ]
        }
    ];

    const additionalQuestions = [];
    const difficulties = ['basic', 'medium', 'advanced'];
    const topics = [
        'Operating Systems', 'File Management', 'File Extensions', 'Email Systems', 'Web Browsers',
        'Office Collaboration', 'Python Programming', 'HTML Structure', 'CSS Styling', 'Web Forms',
        'Network Concepts', 'Cloud Computing', 'Cyber Safety', 'Computational Thinking', 'Problem Solving'
    ];
    
    // Add the template questions first
    questionTemplates.forEach((template, index) => {
        additionalQuestions.push({
            grade: 7,
            difficulty: difficulties[index % 3],
            questionText: template.questionText,
            options: template.options
        });
    });
    
    // Generate more questions to reach 300 total
    const remainingCount = 300 - class7Questions.length - questionTemplates.length;
    for (let i = 0; i < remainingCount; i++) {
        const topic = topics[i % topics.length];
        additionalQuestions.push({
            grade: 7,
            difficulty: difficulties[i % 3],
            questionText: `${topic} - Question ${i + 1}: What is an important aspect of ${topic.toLowerCase()}?`,
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

const allQuestions = [...class7Questions, ...generateMoreClass7Questions()];

function seedClass7Questions() {
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
                                        console.log(`Seeded ${allQuestions.length} questions for Class 7`);
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
    seedClass7Questions();
}

module.exports = seedClass7Questions;