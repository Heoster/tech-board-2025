require('dotenv').config();
const database = require('../config/database');

const grade7AdditionalQuestions = [
    // Advanced Computer Concepts
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What is the difference between hardware and software?',
        options: [
            { text: 'Hardware is physical, software is programs', is_correct: true },
            { text: 'Hardware is programs, software is physical', is_correct: false },
            { text: 'They are the same thing', is_correct: false },
            { text: 'Hardware is newer than software', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'Which of these is a database software?',
        options: [
            { text: 'Microsoft Word', is_correct: false },
            { text: 'Microsoft Access', is_correct: true },
            { text: 'Microsoft Paint', is_correct: false },
            { text: 'Microsoft Calculator', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What does CTRL + A do?',
        options: [
            { text: 'Select all', is_correct: true },
            { text: 'Copy all', is_correct: false },
            { text: 'Delete all', is_correct: false },
            { text: 'Print all', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'What is a spreadsheet used for?',
        options: [
            { text: 'Writing letters', is_correct: false },
            { text: 'Organizing data in rows and columns', is_correct: true },
            { text: 'Drawing pictures', is_correct: false },
            { text: 'Playing games', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'Which file format is used for images?',
        options: [
            { text: '.txt', is_correct: false },
            { text: '.jpg', is_correct: true },
            { text: '.doc', is_correct: false },
            { text: '.exe', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'advanced',
        question_text: 'What is the purpose of a firewall?',
        options: [
            { text: 'To prevent fires in computers', is_correct: false },
            { text: 'To protect against unauthorized network access', is_correct: true },
            { text: 'To speed up internet', is_correct: false },
            { text: 'To save files', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What does CTRL + S do?',
        options: [
            { text: 'Save', is_correct: true },
            { text: 'Search', is_correct: false },
            { text: 'Select', is_correct: false },
            { text: 'Stop', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'What is a computer virus?',
        options: [
            { text: 'A helpful program', is_correct: false },
            { text: 'A malicious program that can damage files', is_correct: true },
            { text: 'A type of hardware', is_correct: false },
            { text: 'An internet connection', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'Which key combination opens the Task Manager in Windows?',
        options: [
            { text: 'Ctrl + Alt + Del', is_correct: true },
            { text: 'Ctrl + Shift + Esc', is_correct: false },
            { text: 'Alt + Tab', is_correct: false },
            { text: 'Ctrl + Alt + T', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'What is the purpose of defragmentation?',
        options: [
            { text: 'To delete files', is_correct: false },
            { text: 'To organize files for better performance', is_correct: true },
            { text: 'To create new files', is_correct: false },
            { text: 'To backup files', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What does CTRL + P do?',
        options: [
            { text: 'Paste', is_correct: false },
            { text: 'Print', is_correct: true },
            { text: 'Play', is_correct: false },
            { text: 'Pause', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'advanced',
        question_text: 'What is encryption?',
        options: [
            { text: 'Making data unreadable without a key', is_correct: true },
            { text: 'Deleting data', is_correct: false },
            { text: 'Copying data', is_correct: false },
            { text: 'Printing data', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'Which of these is a video file format?',
        options: [
            { text: '.mp4', is_correct: true },
            { text: '.txt', is_correct: false },
            { text: '.doc', is_correct: false },
            { text: '.exe', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'What is the difference between RAM and ROM?',
        options: [
            { text: 'RAM is temporary, ROM is permanent', is_correct: true },
            { text: 'RAM is permanent, ROM is temporary', is_correct: false },
            { text: 'They are the same', is_correct: false },
            { text: 'RAM is slower than ROM', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What does CTRL + F do?',
        options: [
            { text: 'Find/Search', is_correct: true },
            { text: 'Format', is_correct: false },
            { text: 'File', is_correct: false },
            { text: 'Font', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'What is a cookie in web browsing?',
        options: [
            { text: 'A type of food', is_correct: false },
            { text: 'A small file stored by websites', is_correct: true },
            { text: 'A computer virus', is_correct: false },
            { text: 'A type of software', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'Which program is used to compress files?',
        options: [
            { text: 'WinRAR', is_correct: true },
            { text: 'Microsoft Word', is_correct: false },
            { text: 'Paint', is_correct: false },
            { text: 'Calculator', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'advanced',
        question_text: 'What is bandwidth in networking?',
        options: [
            { text: 'The width of a cable', is_correct: false },
            { text: 'The amount of data that can be transmitted', is_correct: true },
            { text: 'The length of a network', is_correct: false },
            { text: 'The number of computers', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What does CTRL + Z do?',
        options: [
            { text: 'Undo', is_correct: true },
            { text: 'Redo', is_correct: false },
            { text: 'Zoom', is_correct: false },
            { text: 'Zero', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'What is a backup?',
        options: [
            { text: 'A copy of data for safety', is_correct: true },
            { text: 'A type of virus', is_correct: false },
            { text: 'A computer part', is_correct: false },
            { text: 'A software program', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'Which of these is an audio file format?',
        options: [
            { text: '.mp3', is_correct: true },
            { text: '.jpg', is_correct: false },
            { text: '.doc', is_correct: false },
            { text: '.exe', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'What is phishing?',
        options: [
            { text: 'A type of fishing', is_correct: false },
            { text: 'A cyber attack to steal personal information', is_correct: true },
            { text: 'A computer game', is_correct: false },
            { text: 'A type of software', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What does CTRL + N do?',
        options: [
            { text: 'New document/window', is_correct: true },
            { text: 'Navigate', is_correct: false },
            { text: 'Number', is_correct: false },
            { text: 'Name', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'advanced',
        question_text: 'What is a server?',
        options: [
            { text: 'A person who serves food', is_correct: false },
            { text: 'A computer that provides services to other computers', is_correct: true },
            { text: 'A type of software', is_correct: false },
            { text: 'A computer game', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'Which key is used to capitalize all letters while typing?',
        options: [
            { text: 'Caps Lock', is_correct: true },
            { text: 'Shift', is_correct: false },
            { text: 'Ctrl', is_correct: false },
            { text: 'Alt', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'What is a pixel?',
        options: [
            { text: 'A small picture element on screen', is_correct: true },
            { text: 'A type of computer', is_correct: false },
            { text: 'A software program', is_correct: false },
            { text: 'A keyboard key', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What does CTRL + O do?',
        options: [
            { text: 'Open', is_correct: true },
            { text: 'Options', is_correct: false },
            { text: 'Output', is_correct: false },
            { text: 'Order', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'What is spam in email?',
        options: [
            { text: 'A type of food', is_correct: false },
            { text: 'Unwanted or junk email', is_correct: true },
            { text: 'Important email', is_correct: false },
            { text: 'Email from friends', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'Which of these is a presentation software?',
        options: [
            { text: 'Microsoft PowerPoint', is_correct: true },
            { text: 'Microsoft Word', is_correct: false },
            { text: 'Microsoft Excel', is_correct: false },
            { text: 'Microsoft Paint', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'advanced',
        question_text: 'What is IP address?',
        options: [
            { text: 'Internet Protocol address - unique identifier for devices', is_correct: true },
            { text: 'Important Person address', is_correct: false },
            { text: 'Internet Phone address', is_correct: false },
            { text: 'Internal Program address', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What does F5 key do in most programs?',
        options: [
            { text: 'Refresh/Reload', is_correct: true },
            { text: 'Save', is_correct: false },
            { text: 'Print', is_correct: false },
            { text: 'Close', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'What is a download?',
        options: [
            { text: 'Sending files to internet', is_correct: false },
            { text: 'Receiving files from internet', is_correct: true },
            { text: 'Deleting files', is_correct: false },
            { text: 'Creating files', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'Which of these is used to edit photos?',
        options: [
            { text: 'Adobe Photoshop', is_correct: true },
            { text: 'Microsoft Word', is_correct: false },
            { text: 'Calculator', is_correct: false },
            { text: 'Notepad', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'What is multitasking in computers?',
        options: [
            { text: 'Running multiple programs at once', is_correct: true },
            { text: 'Using multiple keyboards', is_correct: false },
            { text: 'Having multiple monitors', is_correct: false },
            { text: 'Using multiple mice', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What does Alt + Tab do?',
        options: [
            { text: 'Switch between open programs', is_correct: true },
            { text: 'Close programs', is_correct: false },
            { text: 'Open new programs', is_correct: false },
            { text: 'Save programs', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'advanced',
        question_text: 'What is cloud computing?',
        options: [
            { text: 'Computing in the clouds', is_correct: false },
            { text: 'Using internet-based computing services', is_correct: true },
            { text: 'Weather prediction', is_correct: false },
            { text: 'Sky photography', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'Which of these is a text editor?',
        options: [
            { text: 'Notepad', is_correct: true },
            { text: 'Calculator', is_correct: false },
            { text: 'Paint', is_correct: false },
            { text: 'Media Player', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'What is a hyperlink?',
        options: [
            { text: 'A clickable link to another page or resource', is_correct: true },
            { text: 'A type of chain', is_correct: false },
            { text: 'A computer virus', is_correct: false },
            { text: 'A software program', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What does Ctrl + Home do?',
        options: [
            { text: 'Go to beginning of document', is_correct: true },
            { text: 'Go to end of document', is_correct: false },
            { text: 'Go to middle of document', is_correct: false },
            { text: 'Close document', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'What is a URL?',
        options: [
            { text: 'Uniform Resource Locator - web address', is_correct: true },
            { text: 'Universal Reading Language', is_correct: false },
            { text: 'User Registration Login', is_correct: false },
            { text: 'Unique Resource Library', is_correct: false }
        ]
    }
];

async function seedGrade7Additional() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('Starting Grade 7 additional questions seeding...');

        let addedCount = 0;
        let basicCount = 0;
        let mediumCount = 0;
        let advancedCount = 0;

        for (const questionData of grade7AdditionalQuestions) {
            const { grade, difficulty, question_text, options } = questionData;

            // Insert question
            const questionId = await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                    [grade, difficulty, question_text],
                    function(err) {
                        if (err) reject(err);
                        else resolve(this.lastID);
                    }
                );
            });

            // Insert options
            for (let i = 0; i < options.length; i++) {
                const option = options[i];
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

            addedCount++;
            if (difficulty === 'basic') basicCount++;
            else if (difficulty === 'medium') mediumCount++;
            else if (difficulty === 'advanced') advancedCount++;
        }

        console.log(`Successfully added ${addedCount} additional Grade 7 questions!`);
        console.log('Difficulty distribution:');
        console.log(`- Basic: ${basicCount} questions`);
        console.log(`- Medium: ${mediumCount} questions`);
        console.log(`- Advanced: ${advancedCount} questions`);

    } catch (error) {
        console.error('Error seeding Grade 7 additional questions:', error);
    } finally {
        await database.close();
    }
}

if (require.main === module) {
    seedGrade7Additional();
}

module.exports = { seedGrade7Additional };