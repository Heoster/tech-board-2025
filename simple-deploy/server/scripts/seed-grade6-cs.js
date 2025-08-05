require('dotenv').config();
const database = require('../config/database');

const grade6CSQuestions = [
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which part of the computer interprets and executes instructions?',
        options: [
            { text: 'Monitor', is_correct: false },
            { text: 'CPU', is_correct: true },
            { text: 'Keyboard', is_correct: false },
            { text: 'Mouse', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which of these is an example of application software?',
        options: [
            { text: 'Operating system', is_correct: false },
            { text: 'Word processor', is_correct: true },
            { text: 'BIOS', is_correct: false },
            { text: 'Device driver', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device is used to input text into a computer?',
        options: [
            { text: 'Speaker', is_correct: false },
            { text: 'Keyboard', is_correct: true },
            { text: 'Printer', is_correct: false },
            { text: 'Monitor', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'medium',
        question_text: 'What does RAM stand for?',
        options: [
            { text: 'Read Access Memory', is_correct: false },
            { text: 'Random Access Memory', is_correct: true },
            { text: 'Run After Memory', is_correct: false },
            { text: 'Real-time Access Module', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which storage device is removable and portable?',
        options: [
            { text: 'Internal hard disk', is_correct: false },
            { text: 'SSD', is_correct: false },
            { text: 'USB flash drive', is_correct: true },
            { text: 'Motherboard', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'medium',
        question_text: 'Which software controls the computer\'s hardware?',
        options: [
            { text: 'Antivirus', is_correct: false },
            { text: 'Spreadsheet', is_correct: false },
            { text: 'Operating system', is_correct: true },
            { text: 'Presentation software', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which of these is an output device?',
        options: [
            { text: 'Mouse', is_correct: false },
            { text: 'Scanner', is_correct: false },
            { text: 'Monitor', is_correct: true },
            { text: 'Microphone', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Booting a computer means:',
        options: [
            { text: 'Turning off the monitor', is_correct: false },
            { text: 'Starting the computer', is_correct: true },
            { text: 'Installing software', is_correct: false },
            { text: 'Connecting peripherals', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which key combination is used to copy selected text?',
        options: [
            { text: 'Ctrl + V', is_correct: false },
            { text: 'Ctrl + X', is_correct: false },
            { text: 'Ctrl + C', is_correct: true },
            { text: 'Ctrl + Z', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which file extension is commonly used for Word documents?',
        options: [
            { text: '.txt', is_correct: false },
            { text: '.docx', is_correct: true },
            { text: '.jpg', is_correct: false },
            { text: '.ppt', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which of these is a web browser?',
        options: [
            { text: 'Photoshop', is_correct: false },
            { text: 'Chrome', is_correct: true },
            { text: 'Windows', is_correct: false },
            { text: 'Excel', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'medium',
        question_text: 'What does URL stand for?',
        options: [
            { text: 'Uniform Resource Locator', is_correct: true },
            { text: 'Unique Reference Link', is_correct: false },
            { text: 'Universal Routing Link', is_correct: false },
            { text: 'User Resource Locator', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which key is used to delete the character to the right of the cursor?',
        options: [
            { text: 'Backspace', is_correct: false },
            { text: 'Delete', is_correct: true },
            { text: 'Enter', is_correct: false },
            { text: 'Tab', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'medium',
        question_text: 'Which of these protects a computer from viruses?',
        options: [
            { text: 'Firewall', is_correct: false },
            { text: 'Antivirus software', is_correct: true },
            { text: 'Hard drive', is_correct: false },
            { text: 'Monitor', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'The primary purpose of a spreadsheet program is to:',
        options: [
            { text: 'Edit photos', is_correct: false },
            { text: 'Manage databases', is_correct: false },
            { text: 'Perform calculations', is_correct: true },
            { text: 'Write essays', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device converts digital signals to audio?',
        options: [
            { text: 'Microphone', is_correct: false },
            { text: 'Monitor', is_correct: false },
            { text: 'Speaker', is_correct: true },
            { text: 'Keyboard', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'medium',
        question_text: 'Which of these is NOT part of a URL?',
        options: [
            { text: 'Protocol', is_correct: false },
            { text: 'Domain name', is_correct: false },
            { text: 'File path', is_correct: false },
            { text: 'Mouse pointer', is_correct: true }
        ]
    },
    {
        grade: 6,
        difficulty: 'medium',
        question_text: 'Which operating system is open-source?',
        options: [
            { text: 'Windows 10', is_correct: false },
            { text: 'macOS', is_correct: false },
            { text: 'Linux', is_correct: true },
            { text: 'iOS', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is the function of the Recycle Bin (Trash)?',
        options: [
            { text: 'Store running programs', is_correct: false },
            { text: 'Temporarily hold deleted files', is_correct: true },
            { text: 'Backup system files', is_correct: false },
            { text: 'Manage user accounts', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'advanced',
        question_text: 'Which protocol is used to send email?',
        options: [
            { text: 'HTTP', is_correct: false },
            { text: 'FTP', is_correct: false },
            { text: 'SMTP', is_correct: true },
            { text: 'DNS', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is the shortcut for "Save" in most programs?',
        options: [
            { text: 'Ctrl + S', is_correct: true },
            { text: 'Ctrl + P', is_correct: false },
            { text: 'Ctrl + A', is_correct: false },
            { text: 'Ctrl + F', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'medium',
        question_text: 'Which of these is a vector graphics editor?',
        options: [
            { text: 'MS Paint', is_correct: false },
            { text: 'Adobe Illustrator', is_correct: true },
            { text: 'VLC Media Player', is_correct: false },
            { text: 'Notepad', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which key moves the cursor to the beginning of the line?',
        options: [
            { text: 'Home', is_correct: true },
            { text: 'End', is_correct: false },
            { text: 'Page Up', is_correct: false },
            { text: 'Page Down', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'medium',
        question_text: 'What does DPI stand for in printing?',
        options: [
            { text: 'Dots Per Inch', is_correct: true },
            { text: 'Data Processing Index', is_correct: false },
            { text: 'Digital Print Information', is_correct: false },
            { text: 'Device Pixel Interface', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device reads printed text and converts it into digital form?',
        options: [
            { text: 'Printer', is_correct: false },
            { text: 'Scanner', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'Speaker', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which of these is used to organize files on a computer?',
        options: [
            { text: 'Folders', is_correct: true },
            { text: 'Tiles', is_correct: false },
            { text: 'Layers', is_correct: false },
            { text: 'Frames', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'advanced',
        question_text: 'What is phishing?',
        options: [
            { text: 'A coding error', is_correct: false },
            { text: 'Unauthorized copying', is_correct: false },
            { text: 'Fraudulent email activity', is_correct: true },
            { text: 'Network troubleshooting', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which key combination undoes the last action?',
        options: [
            { text: 'Ctrl + Y', is_correct: false },
            { text: 'Ctrl + Z', is_correct: true },
            { text: 'Ctrl + D', is_correct: false },
            { text: 'Ctrl + R', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'medium',
        question_text: 'Which of these is an example of cloud storage?',
        options: [
            { text: 'USB drive', is_correct: false },
            { text: 'Google Drive', is_correct: true },
            { text: 'DVD-ROM', is_correct: false },
            { text: 'Floppy disk', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'medium',
        question_text: 'HTTPS means the connection is:',
        options: [
            { text: 'Unencrypted', is_correct: false },
            { text: 'Hypertext Secure', is_correct: false },
            { text: 'Encrypted', is_correct: true },
            { text: 'Hosted locally', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which menu in a word processor helps change page layout?',
        options: [
            { text: 'File', is_correct: false },
            { text: 'Edit', is_correct: false },
            { text: 'View', is_correct: false },
            { text: 'Format', is_correct: true }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device would you use to create a hard copy of a document?',
        options: [
            { text: 'Projector', is_correct: false },
            { text: 'Speaker', is_correct: false },
            { text: 'Printer', is_correct: true },
            { text: 'Monitor', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'In file names, the dot (.) separates the name and the:',
        options: [
            { text: 'Folder', is_correct: false },
            { text: 'Extension', is_correct: true },
            { text: 'Protocol', is_correct: false },
            { text: 'Directory', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which of these is NOT an email client?',
        options: [
            { text: 'Outlook', is_correct: false },
            { text: 'Thunderbird', is_correct: false },
            { text: 'Gmail', is_correct: false },
            { text: 'VLC', is_correct: true }
        ]
    },
    {
        grade: 6,
        difficulty: 'medium',
        question_text: 'What does GUI stand for?',
        options: [
            { text: 'Graphical User Interface', is_correct: true },
            { text: 'General User Input', is_correct: false },
            { text: 'Global Universal Internet', is_correct: false },
            { text: 'Graphic Utility Icon', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'advanced',
        question_text: 'Which component stores BIOS settings?',
        options: [
            { text: 'RAM', is_correct: false },
            { text: 'ROM', is_correct: true },
            { text: 'Cache', is_correct: false },
            { text: 'GPU', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'A modem is used to connect to the:',
        options: [
            { text: 'Printer', is_correct: false },
            { text: 'Internet', is_correct: true },
            { text: 'Keyboard', is_correct: false },
            { text: 'Monitor', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which of these is a presentation program?',
        options: [
            { text: 'MS Word', is_correct: false },
            { text: 'MS Excel', is_correct: false },
            { text: 'MS PowerPoint', is_correct: true },
            { text: 'MS OneNote', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'advanced',
        question_text: 'Which key combination opens Task Manager in Windows?',
        options: [
            { text: 'Ctrl + Shift + Esc', is_correct: false },
            { text: 'Ctrl + Alt + Del', is_correct: false },
            { text: 'Alt + F4', is_correct: false },
            { text: 'Both a and b', is_correct: true }
        ]
    },
    {
        grade: 6,
        difficulty: 'medium',
        question_text: 'What is the main circuit board inside a computer called?',
        options: [
            { text: 'Hard drive', is_correct: false },
            { text: 'Motherboard', is_correct: true },
            { text: 'Power supply', is_correct: false },
            { text: 'Expansion card', is_correct: false }
        ]
    }
];

async function seedGrade6CS() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('Starting Grade 6 Computer Science questions seeding...');

        // Insert Grade 6 CS questions
        for (const questionData of grade6CSQuestions) {
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

        console.log(`Successfully added ${grade6CSQuestions.length} Grade 6 Computer Science questions!`);
        console.log('Question distribution:');
        
        const basicCount = grade6CSQuestions.filter(q => q.difficulty === 'basic').length;
        const mediumCount = grade6CSQuestions.filter(q => q.difficulty === 'medium').length;
        const advancedCount = grade6CSQuestions.filter(q => q.difficulty === 'advanced').length;
        
        console.log(`- Basic: ${basicCount} questions`);
        console.log(`- Medium: ${mediumCount} questions`);
        console.log(`- Advanced: ${advancedCount} questions`);

    } catch (error) {
        console.error('Error seeding Grade 6 CS questions:', error);
    } finally {
        await database.close();
    }
}

// Run seeding if this file is executed directly
if (require.main === module) {
    seedGrade6CS();
}

module.exports = seedGrade6CS;