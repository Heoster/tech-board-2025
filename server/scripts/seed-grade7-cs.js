require('dotenv').config();
const database = require('../config/database');

const grade7CSQuestions = [
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'In the binary system, what is the decimal equivalent of 1101₂?',
        options: [
            { text: '11', is_correct: false },
            { text: '12', is_correct: false },
            { text: '13', is_correct: true },
            { text: '14', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'Which symbol is used to begin an HTML tag?',
        options: [
            { text: '{', is_correct: false },
            { text: '(', is_correct: false },
            { text: '<', is_correct: true },
            { text: '[', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'A sequence of steps to solve a problem is called a(n):',
        options: [
            { text: 'Function', is_correct: false },
            { text: 'Algorithm', is_correct: true },
            { text: 'Loop', is_correct: false },
            { text: 'Variable', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'In Scratch, which block repeats actions a set number of times?',
        options: [
            { text: 'if-then', is_correct: false },
            { text: 'repeat', is_correct: true },
            { text: 'forever', is_correct: false },
            { text: 'broadcast', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'What does CSS stand for in web design?',
        options: [
            { text: 'Computer Style Sheets', is_correct: false },
            { text: 'Cascading Style Sheets', is_correct: true },
            { text: 'Creative Style System', is_correct: false },
            { text: 'Cascading Script Styles', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'Which operator in a spreadsheet adds two cells?',
        options: [
            { text: '-', is_correct: false },
            { text: '*', is_correct: false },
            { text: '+', is_correct: true },
            { text: '/', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'In a database table, a single row is called a:',
        options: [
            { text: 'Field', is_correct: false },
            { text: 'Record', is_correct: true },
            { text: 'Cell', is_correct: false },
            { text: 'Query', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'An IP address uniquely identifies a device on a:',
        options: [
            { text: 'Spreadsheet', is_correct: false },
            { text: 'Database', is_correct: false },
            { text: 'Network', is_correct: true },
            { text: 'Website', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'Which file format is typically used for high-quality photographs on the web?',
        options: [
            { text: '.txt', is_correct: false },
            { text: '.mp4', is_correct: false },
            { text: '.jpeg', is_correct: true },
            { text: '.exe', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'What is phishing?',
        options: [
            { text: 'Testing software', is_correct: false },
            { text: 'Sending fraudulent emails', is_correct: true },
            { text: 'Sorting database records', is_correct: false },
            { text: 'Writing HTML code', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'Which of these is a looping structure in many programming languages?',
        options: [
            { text: 'select', is_correct: false },
            { text: 'join', is_correct: false },
            { text: 'while', is_correct: true },
            { text: 'print', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'advanced',
        question_text: 'To make text bold in HTML, you use the <strong> tag or the <b> tag. Which is more semantically correct?',
        options: [
            { text: '<b>', is_correct: false },
            { text: '<strong>', is_correct: true },
            { text: '<em>', is_correct: false },
            { text: '<i>', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What does the function SUM(A1:A5) do in a spreadsheet?',
        options: [
            { text: 'Finds average', is_correct: false },
            { text: 'Counts cells', is_correct: false },
            { text: 'Adds values', is_correct: true },
            { text: 'Sorts data', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'Which component routes data packets across networks?',
        options: [
            { text: 'Switch', is_correct: false },
            { text: 'Router', is_correct: true },
            { text: 'Modem', is_correct: false },
            { text: 'Hub', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'In binary, how many bits make up one byte?',
        options: [
            { text: '2', is_correct: false },
            { text: '4', is_correct: false },
            { text: '8', is_correct: true },
            { text: '16', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'Which HTML tag creates a hyperlink?',
        options: [
            { text: '<img>', is_correct: false },
            { text: '<a>', is_correct: true },
            { text: '<link>', is_correct: false },
            { text: '<href>', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'A flowchart shape with a diamond represents:',
        options: [
            { text: 'Start/End', is_correct: false },
            { text: 'Process', is_correct: false },
            { text: 'Decision', is_correct: true },
            { text: 'Input/Output', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'In Scratch, which block detects collisions with sprites or the edge?',
        options: [
            { text: 'sensing', is_correct: true },
            { text: 'motion', is_correct: false },
            { text: 'looks', is_correct: false },
            { text: 'control', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What is the extension for an HTML file?',
        options: [
            { text: '.html', is_correct: true },
            { text: '.doc', is_correct: false },
            { text: '.xlsx', is_correct: false },
            { text: '.exe', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'Which spreadsheet function returns the highest value in a range?',
        options: [
            { text: 'MIN()', is_correct: false },
            { text: 'MAX()', is_correct: true },
            { text: 'AVG()', is_correct: false },
            { text: 'COUNT()', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'advanced',
        question_text: 'A primary key in a database table must be:',
        options: [
            { text: 'Nullable', is_correct: false },
            { text: 'Unique', is_correct: true },
            { text: 'Text only', is_correct: false },
            { text: 'Numeric only', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'Which protocol is used to retrieve email from a server?',
        options: [
            { text: 'HTTP', is_correct: false },
            { text: 'SMTP', is_correct: false },
            { text: 'POP3', is_correct: true },
            { text: 'FTP', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'MP3 is a file format for:',
        options: [
            { text: 'Images', is_correct: false },
            { text: 'Audio', is_correct: true },
            { text: 'Documents', is_correct: false },
            { text: 'Software', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'In HTML, <ul> defines a:',
        options: [
            { text: 'Underlined text', is_correct: false },
            { text: 'Unordered list', is_correct: true },
            { text: 'User link', is_correct: false },
            { text: 'Upload button', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'A loop that never ends is called a:',
        options: [
            { text: 'Infinite loop', is_correct: true },
            { text: 'Nested loop', is_correct: false },
            { text: 'Conditional loop', is_correct: false },
            { text: 'Finite loop', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'Which tag in HTML creates a table row?',
        options: [
            { text: '<tr>', is_correct: true },
            { text: '<td>', is_correct: false },
            { text: '<th>', is_correct: false },
            { text: '<table>', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'What is the decimal value of the hexadecimal number A?',
        options: [
            { text: '8', is_correct: false },
            { text: '9', is_correct: false },
            { text: '10', is_correct: true },
            { text: '11', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'A network with a small geographic area, like a single building, is called a:',
        options: [
            { text: 'WAN', is_correct: false },
            { text: 'LAN', is_correct: true },
            { text: 'MAN', is_correct: false },
            { text: 'PAN', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'The tag <img src="image.jpg" alt="desc"> in HTML provides:',
        options: [
            { text: 'Video embedding', is_correct: false },
            { text: 'Image source and description', is_correct: true },
            { text: 'Audio playback', is_correct: false },
            { text: 'Link to another page', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'Which spreadsheet feature arranges data in a specified order?',
        options: [
            { text: 'Sort', is_correct: true },
            { text: 'Filter', is_correct: false },
            { text: 'Chart', is_correct: false },
            { text: 'Formula', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'In a database, a query is used to:',
        options: [
            { text: 'Add new tables', is_correct: false },
            { text: 'Retrieve specific data', is_correct: true },
            { text: 'Change the interface', is_correct: false },
            { text: 'Delete the program', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'Which protocol secures web traffic with encryption?',
        options: [
            { text: 'HTTP', is_correct: false },
            { text: 'HTTPS', is_correct: true },
            { text: 'FTP', is_correct: false },
            { text: 'SMTP', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'A .png file differs from a .jpeg because PNG supports:',
        options: [
            { text: 'Animation', is_correct: false },
            { text: 'Transparent backgrounds', is_correct: true },
            { text: 'Video streaming', is_correct: false },
            { text: 'Executable code', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'In Scratch, which category holds the "move 10 steps" block?',
        options: [
            { text: 'Looks', is_correct: false },
            { text: 'Sound', is_correct: false },
            { text: 'Motion', is_correct: true },
            { text: 'Data', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'Which HTML element is used to group form controls?',
        options: [
            { text: '<fieldset>', is_correct: true },
            { text: '<div>', is_correct: false },
            { text: '<span>', is_correct: false },
            { text: '<form>', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'advanced',
        question_text: 'What is the purpose of the VLOOKUP function in spreadsheets?',
        options: [
            { text: 'Vertical sort', is_correct: false },
            { text: 'Find data in a column', is_correct: true },
            { text: 'Calculate sum', is_correct: false },
            { text: 'Create charts', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'Which device converts digital signals to analog for phone lines?',
        options: [
            { text: 'Switch', is_correct: false },
            { text: 'Router', is_correct: false },
            { text: 'Modem', is_correct: true },
            { text: 'Bridge', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'A flowchart oval shape indicates:',
        options: [
            { text: 'Input/Output', is_correct: false },
            { text: 'Process', is_correct: false },
            { text: 'Start/End', is_correct: true },
            { text: 'Decision', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'Which tag sets the title shown on the browser tab?',
        options: [
            { text: '<head>', is_correct: false },
            { text: '<title>', is_correct: true },
            { text: '<meta>', is_correct: false },
            { text: '<header>', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'advanced',
        question_text: 'In a database, a foreign key establishes a relationship between two:',
        options: [
            { text: 'Records', is_correct: false },
            { text: 'Tables', is_correct: true },
            { text: 'Fields', is_correct: false },
            { text: 'Queries', is_correct: false }
        ]
    }
];

async function seedGrade7CS() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('Starting Grade 7 Computer Science questions seeding...');

        // Insert Grade 7 CS questions
        for (const questionData of grade7CSQuestions) {
            const questionId = await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                    [questionData.grade, questionData.difficulty, questionData.question_text],
                    function (err) {
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
                        function (err) {
                            if (err) reject(err);
                            else resolve();
                        }
                    );
                });
            }
        }

        console.log(`Successfully added ${grade7CSQuestions.length} Grade 7 Computer Science questions!`);
        console.log('Question distribution:');

        const basicCount = grade7CSQuestions.filter(q => q.difficulty === 'basic').length;
        const mediumCount = grade7CSQuestions.filter(q => q.difficulty === 'medium').length;
        const advancedCount = grade7CSQuestions.filter(q => q.difficulty === 'advanced').length;

        console.log(`- Basic: ${basicCount} questions`);
        console.log(`- Medium: ${mediumCount} questions`);
        console.log(`- Advanced: ${advancedCount} questions`);

    } catch (error) {
        console.error('Error seeding Grade 7 CS questions:', error);
    } finally {
        await database.close();
    }
}

// Run seeding if this file is executed directly
if (require.main === module) {
    seedGrade7CS();
}

module.exports = seedGrade7CS;