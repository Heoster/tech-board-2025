require('dotenv').config();
const database = require('../config/database');

const grade11AdditionalQuestions = [
    // Section 1: HTML Basics (10 Questions) - Additional detailed ones
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What does HTML stand for?',
        options: [
            { text: 'Hyperlinks and Text Markup Language', is_correct: false },
            { text: 'Hyper Text Markup Language', is_correct: true },
            { text: 'High-Level Text Machine Language', is_correct: false },
            { text: 'Home Tool Markup Language', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Which tag is used to create a hyperlink?',
        options: [
            { text: '<link>', is_correct: false },
            { text: '<a>', is_correct: true },
            { text: '<hl>', is_correct: false },
            { text: '<url>', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What is the correct HTML tag for the largest heading?',
        options: [
            { text: '<h6>', is_correct: false },
            { text: '<head>', is_correct: false },
            { text: '<h1>', is_correct: true },
            { text: '<heading>', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Which tag inserts a line break?',
        options: [
            { text: '<lb>', is_correct: false },
            { text: '<br>', is_correct: true },
            { text: '<break>', is_correct: false },
            { text: '<line>', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'The <body> tag in HTML defines:',
        options: [
            { text: 'The browser\'s title', is_correct: false },
            { text: 'The main content of the document', is_correct: true },
            { text: 'The header section', is_correct: false },
            { text: 'A footnote', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'Which attribute is used to provide a unique name to an HTML element?',
        options: [
            { text: 'class', is_correct: false },
            { text: 'id', is_correct: true },
            { text: 'name', is_correct: false },
            { text: 'type', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What does the <img> tag represent?',
        options: [
            { text: 'Italic text', is_correct: false },
            { text: 'An image', is_correct: true },
            { text: 'A link', is_correct: false },
            { text: 'A paragraph', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Which tag creates a numbered list?',
        options: [
            { text: '<dl>', is_correct: false },
            { text: '<ul>', is_correct: false },
            { text: '<ol>', is_correct: true },
            { text: '<list>', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'The correct HTML structure is:',
        options: [
            { text: '<html><head><body></head></body></html>', is_correct: false },
            { text: '<html><head></head><body></body></html>', is_correct: true },
            { text: '<head><html><body></body></html></head>', is_correct: false },
            { text: '<body><head></head><html></html></body>', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Which tag is used to define a table row?',
        options: [
            { text: '<td>', is_correct: false },
            { text: '<tr>', is_correct: true },
            { text: '<table>', is_correct: false },
            { text: '<th>', is_correct: false }
        ]
    },

    // Section 2: Number Systems (10 Questions) - Additional detailed ones
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'The binary number 1010 equals which decimal number?',
        options: [
            { text: '8', is_correct: false },
            { text: '9', is_correct: false },
            { text: '10', is_correct: true },
            { text: '11', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'How many bits make a byte?',
        options: [
            { text: '4', is_correct: false },
            { text: '8', is_correct: true },
            { text: '16', is_correct: false },
            { text: '32', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'The hexadecimal digit \'F\' represents which decimal value?',
        options: [
            { text: '10', is_correct: false },
            { text: '12', is_correct: false },
            { text: '15', is_correct: true },
            { text: '16', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What is the decimal equivalent of binary 1111?',
        options: [
            { text: '10', is_correct: false },
            { text: '12', is_correct: false },
            { text: '15', is_correct: true },
            { text: '16', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Which number system uses base-8?',
        options: [
            { text: 'Binary', is_correct: false },
            { text: 'Decimal', is_correct: false },
            { text: 'Octal', is_correct: true },
            { text: 'Hexadecimal', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'Convert decimal 16 to binary:',
        options: [
            { text: '1000', is_correct: false },
            { text: '10000', is_correct: true },
            { text: '1100', is_correct: false },
            { text: '1010', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'The binary addition 101 + 010 = ?',
        options: [
            { text: '111', is_correct: true },
            { text: '110', is_correct: false },
            { text: '1001', is_correct: false },
            { text: '1010', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Which is NOT a binary number?',
        options: [
            { text: '101', is_correct: false },
            { text: '1101', is_correct: false },
            { text: '123', is_correct: true },
            { text: '0', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What does the bit represent in computing?',
        options: [
            { text: 'A text character', is_correct: false },
            { text: 'The smallest unit of data (0 or 1)', is_correct: true },
            { text: 'An image pixel', is_correct: false },
            { text: 'A sound wave', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'How is decimal 5 represented in binary?',
        options: [
            { text: '100', is_correct: false },
            { text: '101', is_correct: true },
            { text: '110', is_correct: false },
            { text: '111', is_correct: false }
        ]
    },

    // Section 3: Operating Systems (10 Questions) - Additional detailed ones
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'The main function of an OS is to:',
        options: [
            { text: 'Manage hardware and software resources', is_correct: true },
            { text: 'Create websites', is_correct: false },
            { text: 'Design graphics', is_correct: false },
            { text: 'Write Python code', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Which is NOT an operating system?',
        options: [
            { text: 'Windows', is_correct: false },
            { text: 'Linux', is_correct: false },
            { text: 'MS Office', is_correct: true },
            { text: 'macOS', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'What is the role of the kernel in an OS?',
        options: [
            { text: 'Core component managing system operations', is_correct: true },
            { text: 'User interface design', is_correct: false },
            { text: 'Internet browsing', is_correct: false },
            { text: 'Game development', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Which OS is open-source?',
        options: [
            { text: 'Windows', is_correct: false },
            { text: 'Linux', is_correct: true },
            { text: 'macOS', is_correct: false },
            { text: 'iOS', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'GUI stands for:',
        options: [
            { text: 'Graphical User Interface', is_correct: true },
            { text: 'General Utility Interface', is_correct: false },
            { text: 'Global User Interaction', is_correct: false },
            { text: 'Graphics Unit Integration', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'Which OS feature allows multiple programs to run simultaneously?',
        options: [
            { text: 'Multitasking', is_correct: true },
            { text: 'Booting', is_correct: false },
            { text: 'Formatting', is_correct: false },
            { text: 'Debugging', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'The "Task Manager" is used to:',
        options: [
            { text: 'Monitor running applications', is_correct: true },
            { text: 'Create documents', is_correct: false },
            { text: 'Edit photos', is_correct: false },
            { text: 'Browse the web', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Which is a mobile OS?',
        options: [
            { text: 'Windows 10', is_correct: false },
            { text: 'Android', is_correct: true },
            { text: 'Linux', is_correct: false },
            { text: 'macOS', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What does "OS" stand for?',
        options: [
            { text: 'Operating System', is_correct: true },
            { text: 'Output Source', is_correct: false },
            { text: 'Optical Sensor', is_correct: false },
            { text: 'Online Service', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'The first step when a computer starts is called:',
        options: [
            { text: 'Booting', is_correct: true },
            { text: 'Debugging', is_correct: false },
            { text: 'Formatting', is_correct: false },
            { text: 'Installing', is_correct: false }
        ]
    },

    // Section 4: Networking (10 Questions) - Additional detailed ones
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What does LAN stand for?',
        options: [
            { text: 'Local Area Network', is_correct: true },
            { text: 'Large Access Network', is_correct: false },
            { text: 'Linked Area Nodes', is_correct: false },
            { text: 'Longitudinal Analog Net', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'A router\'s primary function is to:',
        options: [
            { text: 'Connect multiple networks', is_correct: true },
            { text: 'Store files', is_correct: false },
            { text: 'Display graphics', is_correct: false },
            { text: 'Process text', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Which device connects computers in a LAN?',
        options: [
            { text: 'Switch', is_correct: true },
            { text: 'Printer', is_correct: false },
            { text: 'Monitor', is_correct: false },
            { text: 'Speaker', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'The unique identifier for a device on a network is called:',
        options: [
            { text: 'IP Address', is_correct: true },
            { text: 'MAC Address', is_correct: false },
            { text: 'URL', is_correct: false },
            { text: 'HTML', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Which network type covers the largest geographical area?',
        options: [
            { text: 'LAN', is_correct: false },
            { text: 'WAN', is_correct: true },
            { text: 'PAN', is_correct: false },
            { text: 'MAN', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What does Wi-Fi stand for?',
        options: [
            { text: 'Wireless Fidelity', is_correct: true },
            { text: 'Wired Fiber', is_correct: false },
            { text: 'Wide Format', is_correct: false },
            { text: 'Wireless Focus', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Which protocol is used for web browsing?',
        options: [
            { text: 'FTP', is_correct: false },
            { text: 'HTTP', is_correct: true },
            { text: 'SMTP', is_correct: false },
            { text: 'TCP', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'A firewall is used to:',
        options: [
            { text: 'Block unauthorized access', is_correct: true },
            { text: 'Increase internet speed', is_correct: false },
            { text: 'Store backups', is_correct: false },
            { text: 'Print documents', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Which cable type is commonly used in wired networks?',
        options: [
            { text: 'Ethernet', is_correct: true },
            { text: 'HDMI', is_correct: false },
            { text: 'USB', is_correct: false },
            { text: 'VGA', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What does DNS stand for?',
        options: [
            { text: 'Domain Name System', is_correct: true },
            { text: 'Data Network Service', is_correct: false },
            { text: 'Digital Naming Standard', is_correct: false },
            { text: 'Dynamic Node Setup', is_correct: false }
        ]
    },

    // Section 5: Python Programming (15 Questions) - Additional detailed ones
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Which Python function displays output?',
        options: [
            { text: 'input()', is_correct: false },
            { text: 'print()', is_correct: true },
            { text: 'output()', is_correct: false },
            { text: 'display()', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What is the output of print(5 + 3)?',
        options: [
            { text: '53', is_correct: false },
            { text: '8', is_correct: true },
            { text: 'Error', is_correct: false },
            { text: '"5+3"', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Which symbol is used for comments in Python?',
        options: [
            { text: '//', is_correct: false },
            { text: '#', is_correct: true },
            { text: '/*', is_correct: false },
            { text: '--', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What data type is x = "Hello"?',
        options: [
            { text: 'int', is_correct: false },
            { text: 'float', is_correct: false },
            { text: 'str', is_correct: true },
            { text: 'bool', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Which operator performs exponentiation?',
        options: [
            { text: '*', is_correct: false },
            { text: '/', is_correct: false },
            { text: '**', is_correct: true },
            { text: '%', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What does == compare?',
        options: [
            { text: 'Equality', is_correct: true },
            { text: 'Assignment', is_correct: false },
            { text: 'Greater than', is_correct: false },
            { text: 'Less than', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'Which loop repeats code a fixed number of times?',
        options: [
            { text: 'while', is_correct: false },
            { text: 'for', is_correct: true },
            { text: 'if', is_correct: false },
            { text: 'repeat', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What is the result of bool(0)?',
        options: [
            { text: 'True', is_correct: false },
            { text: 'False', is_correct: true },
            { text: '1', is_correct: false },
            { text: 'Error', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'Which function converts a string to an integer?',
        options: [
            { text: 'str()', is_correct: false },
            { text: 'float()', is_correct: false },
            { text: 'int()', is_correct: true },
            { text: 'bool()', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'What is the output of print(type(3.14))?',
        options: [
            { text: 'int', is_correct: false },
            { text: '<class \'float\'>', is_correct: true },
            { text: 'str', is_correct: false },
            { text: 'bool', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Which keyword defines a function?',
        options: [
            { text: 'func', is_correct: false },
            { text: 'method', is_correct: false },
            { text: 'def', is_correct: true },
            { text: 'function', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What does len("Python") return?',
        options: [
            { text: '5', is_correct: false },
            { text: '6', is_correct: true },
            { text: '7', is_correct: false },
            { text: 'Error', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'Which list operation adds an item?',
        options: [
            { text: '.remove()', is_correct: false },
            { text: '.append()', is_correct: true },
            { text: '.delete()', is_correct: false },
            { text: '.pop()', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'What is the output of "a" in "apple"?',
        options: [
            { text: '0', is_correct: false },
            { text: 'True', is_correct: true },
            { text: 'False', is_correct: false },
            { text: 'Error', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Which symbol starts a Python block?',
        options: [
            { text: '{ }', is_correct: false },
            { text: 'Indentation', is_correct: true },
            { text: '[ ]', is_correct: false },
            { text: '( )', is_correct: false }
        ]
    }
];

async function seedGrade11Additional100() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('Starting Grade 11 Additional questions seeding...');

        // Insert Grade 11 additional questions
        for (const questionData of grade11AdditionalQuestions) {
            const questionId = await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                    [questionData.grade, questionData.difficulty, questionData.question_text],
                    function(err) {
                        if (err) reject(err);
                        else resolve(this.lastID);
                    }
                );
            });

            // Insert options for this question
            for (let i = 0; i < questionData.options.length; i++) {
                const option = questionData.options[i];
                await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                        [questionId, option.text, option.is_correct, i + 1],
                        function(err) {
                            if (err) reject(err);
                            else resolve();
                        }
                    );
                });
            }
        }

        console.log(`Successfully added ${grade11AdditionalQuestions.length} Grade 11 Additional questions!`);
        console.log('Question categories:');
        console.log('- HTML Basics: 10 additional questions');
        console.log('- Number Systems: 10 additional questions');
        console.log('- Operating Systems: 10 additional questions');
        console.log('- Networking: 10 additional questions');
        console.log('- Python Programming: 15 additional questions');
        console.log(`Total: ${grade11AdditionalQuestions.length} questions added`);

        const basicCount = grade11AdditionalQuestions.filter(q => q.difficulty === 'basic').length;
        const mediumCount = grade11AdditionalQuestions.filter(q => q.difficulty === 'medium').length;
        const advancedCount = grade11AdditionalQuestions.filter(q => q.difficulty === 'advanced').length;
        
        console.log('Difficulty distribution:');
        console.log(`- Basic: ${basicCount} questions`);
        console.log(`- Medium: ${mediumCount} questions`);
        console.log(`- Advanced: ${advancedCount} questions`);

    } catch (error) {
        console.error('Error seeding Grade 11 Additional questions:', error);
    } finally {
        await database.close();
    }
}

// Run seeding if this file is executed directly
if (require.main === module) {
    seedGrade11Additional100();
}

module.exports = seedGrade11Additional100;