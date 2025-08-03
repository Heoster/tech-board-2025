require('dotenv').config();
const database = require('../config/database');

const grade6AdditionalQuestions = [
    // Computer History & Basics
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Who is known as the father of computers?',
        options: [
            { text: 'Charles Babbage', is_correct: true },
            { text: 'Bill Gates', is_correct: false },
            { text: 'Steve Jobs', is_correct: false },
            { text: 'Mark Zuckerberg', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What does WWW stand for?',
        options: [
            { text: 'World Wide Web', is_correct: true },
            { text: 'World Wide Window', is_correct: false },
            { text: 'World Wide Work', is_correct: false },
            { text: 'World Wide Wire', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which company created Windows operating system?',
        options: [
            { text: 'Apple', is_correct: false },
            { text: 'Microsoft', is_correct: true },
            { text: 'Google', is_correct: false },
            { text: 'IBM', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is the main circuit board of a computer called?',
        options: [
            { text: 'Motherboard', is_correct: true },
            { text: 'Fatherboard', is_correct: false },
            { text: 'Mainboard', is_correct: false },
            { text: 'Chipboard', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'medium',
        question_text: 'Which of these is NOT an input device?',
        options: [
            { text: 'Keyboard', is_correct: false },
            { text: 'Mouse', is_correct: false },
            { text: 'Monitor', is_correct: true },
            { text: 'Microphone', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What does USB stand for?',
        options: [
            { text: 'Universal Serial Bus', is_correct: true },
            { text: 'Universal System Bus', is_correct: false },
            { text: 'United Serial Bus', is_correct: false },
            { text: 'Universal Storage Bus', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which key is used to delete characters to the left of the cursor?',
        options: [
            { text: 'Delete', is_correct: false },
            { text: 'Backspace', is_correct: true },
            { text: 'Enter', is_correct: false },
            { text: 'Space', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is the brain of the computer called?',
        options: [
            { text: 'CPU', is_correct: true },
            { text: 'RAM', is_correct: false },
            { text: 'Hard Drive', is_correct: false },
            { text: 'Monitor', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'medium',
        question_text: 'Which of these is a web browser?',
        options: [
            { text: 'Microsoft Word', is_correct: false },
            { text: 'Google Chrome', is_correct: true },
            { text: 'Adobe Photoshop', is_correct: false },
            { text: 'Windows Media Player', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What does RAM stand for?',
        options: [
            { text: 'Random Access Memory', is_correct: true },
            { text: 'Read Access Memory', is_correct: false },
            { text: 'Rapid Access Memory', is_correct: false },
            { text: 'Real Access Memory', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device is used to point and click on the computer screen?',
        options: [
            { text: 'Keyboard', is_correct: false },
            { text: 'Mouse', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'Speaker', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is the full form of CD?',
        options: [
            { text: 'Compact Disk', is_correct: true },
            { text: 'Computer Disk', is_correct: false },
            { text: 'Central Disk', is_correct: false },
            { text: 'Common Disk', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'medium',
        question_text: 'Which of these is NOT an operating system?',
        options: [
            { text: 'Windows', is_correct: false },
            { text: 'macOS', is_correct: false },
            { text: 'Linux', is_correct: false },
            { text: 'Microsoft Office', is_correct: true }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is the smallest unit of data in a computer?',
        options: [
            { text: 'Bit', is_correct: true },
            { text: 'Byte', is_correct: false },
            { text: 'Kilobyte', is_correct: false },
            { text: 'Megabyte', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which key combination is used to copy text?',
        options: [
            { text: 'Ctrl + C', is_correct: true },
            { text: 'Ctrl + V', is_correct: false },
            { text: 'Ctrl + X', is_correct: false },
            { text: 'Ctrl + Z', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What does PDF stand for?',
        options: [
            { text: 'Portable Document Format', is_correct: true },
            { text: 'Personal Document Format', is_correct: false },
            { text: 'Public Document Format', is_correct: false },
            { text: 'Private Document Format', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'medium',
        question_text: 'Which of these is a search engine?',
        options: [
            { text: 'Facebook', is_correct: false },
            { text: 'Google', is_correct: true },
            { text: 'Instagram', is_correct: false },
            { text: 'WhatsApp', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is the extension of a Microsoft Word document?',
        options: [
            { text: '.doc or .docx', is_correct: true },
            { text: '.txt', is_correct: false },
            { text: '.pdf', is_correct: false },
            { text: '.jpg', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device is used to hear sound from the computer?',
        options: [
            { text: 'Monitor', is_correct: false },
            { text: 'Keyboard', is_correct: false },
            { text: 'Speaker', is_correct: true },
            { text: 'Mouse', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What does Wi-Fi stand for?',
        options: [
            { text: 'Wireless Fidelity', is_correct: true },
            { text: 'Wide Fidelity', is_correct: false },
            { text: 'Wire Fidelity', is_correct: false },
            { text: 'World Fidelity', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'medium',
        question_text: 'Which of these is used to protect a computer from viruses?',
        options: [
            { text: 'Antivirus software', is_correct: true },
            { text: 'Web browser', is_correct: false },
            { text: 'Media player', is_correct: false },
            { text: 'Text editor', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is the function of the Enter key?',
        options: [
            { text: 'To move to the next line', is_correct: true },
            { text: 'To delete text', is_correct: false },
            { text: 'To copy text', is_correct: false },
            { text: 'To close programs', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which of these is a social media platform?',
        options: [
            { text: 'Microsoft Word', is_correct: false },
            { text: 'Facebook', is_correct: true },
            { text: 'Windows', is_correct: false },
            { text: 'Adobe Reader', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'medium',
        question_text: 'What is malware?',
        options: [
            { text: 'Good software', is_correct: false },
            { text: 'Harmful software', is_correct: true },
            { text: 'Free software', is_correct: false },
            { text: 'Educational software', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which key is used to make letters uppercase?',
        options: [
            { text: 'Shift', is_correct: true },
            { text: 'Ctrl', is_correct: false },
            { text: 'Alt', is_correct: false },
            { text: 'Tab', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What does email stand for?',
        options: [
            { text: 'Electronic mail', is_correct: true },
            { text: 'Emergency mail', is_correct: false },
            { text: 'Express mail', is_correct: false },
            { text: 'External mail', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'medium',
        question_text: 'Which of these is NOT a computer virus?',
        options: [
            { text: 'Trojan', is_correct: false },
            { text: 'Worm', is_correct: false },
            { text: 'Firewall', is_correct: true },
            { text: 'Malware', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is the function of Ctrl + V?',
        options: [
            { text: 'Copy', is_correct: false },
            { text: 'Paste', is_correct: true },
            { text: 'Cut', is_correct: false },
            { text: 'Undo', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device stores data permanently?',
        options: [
            { text: 'RAM', is_correct: false },
            { text: 'Hard Drive', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'Keyboard', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'advanced',
        question_text: 'What is cloud storage?',
        options: [
            { text: 'Storage in the sky', is_correct: false },
            { text: 'Online storage service', is_correct: true },
            { text: 'Weather storage', is_correct: false },
            { text: 'Air storage', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which program is used to browse the internet?',
        options: [
            { text: 'Web browser', is_correct: true },
            { text: 'Text editor', is_correct: false },
            { text: 'Calculator', is_correct: false },
            { text: 'Paint', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What does URL stand for?',
        options: [
            { text: 'Uniform Resource Locator', is_correct: true },
            { text: 'Universal Resource Locator', is_correct: false },
            { text: 'United Resource Locator', is_correct: false },
            { text: 'Unique Resource Locator', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'medium',
        question_text: 'Which of these is a programming language?',
        options: [
            { text: 'HTML', is_correct: false },
            { text: 'Scratch', is_correct: true },
            { text: 'Windows', is_correct: false },
            { text: 'Chrome', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is a pixel?',
        options: [
            { text: 'A small dot on the screen', is_correct: true },
            { text: 'A type of computer', is_correct: false },
            { text: 'A software program', is_correct: false },
            { text: 'A keyboard key', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which key is used to delete characters to the right of the cursor?',
        options: [
            { text: 'Backspace', is_correct: false },
            { text: 'Delete', is_correct: true },
            { text: 'Enter', is_correct: false },
            { text: 'Space', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'medium',
        question_text: 'What is a computer network?',
        options: [
            { text: 'A single computer', is_correct: false },
            { text: 'Connected computers that can share resources', is_correct: true },
            { text: 'A computer game', is_correct: false },
            { text: 'A computer program', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What does GPS stand for?',
        options: [
            { text: 'Global Positioning System', is_correct: true },
            { text: 'General Positioning System', is_correct: false },
            { text: 'Global Processing System', is_correct: false },
            { text: 'General Processing System', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'advanced',
        question_text: 'What is artificial intelligence?',
        options: [
            { text: 'Fake intelligence', is_correct: false },
            { text: 'Computer systems that can perform tasks requiring human intelligence', is_correct: true },
            { text: 'Natural intelligence', is_correct: false },
            { text: 'Human intelligence', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which of these is used to type numbers quickly?',
        options: [
            { text: 'Function keys', is_correct: false },
            { text: 'Number pad', is_correct: true },
            { text: 'Arrow keys', is_correct: false },
            { text: 'Space bar', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is a desktop in computing?',
        options: [
            { text: 'The main screen with icons', is_correct: true },
            { text: 'A type of computer', is_correct: false },
            { text: 'A wooden table', is_correct: false },
            { text: 'A software program', is_correct: false }
        ]
    }
    // Add more questions to reach approximately 40 total for Grade 6
];

async function seedGrade6Additional() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('Starting Grade 6 additional questions seeding...');

        let addedCount = 0;
        let basicCount = 0;
        let mediumCount = 0;
        let advancedCount = 0;

        for (const questionData of grade6AdditionalQuestions) {
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

        console.log(`Successfully added ${addedCount} additional Grade 6 questions!`);
        console.log('Difficulty distribution:');
        console.log(`- Basic: ${basicCount} questions`);
        console.log(`- Medium: ${mediumCount} questions`);
        console.log(`- Advanced: ${advancedCount} questions`);

    } catch (error) {
        console.error('Error seeding Grade 6 additional questions:', error);
    } finally {
        await database.close();
    }
}

if (require.main === module) {
    seedGrade6Additional();
}

module.exports = { seedGrade6Additional };