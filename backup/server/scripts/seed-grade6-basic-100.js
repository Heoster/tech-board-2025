require('dotenv').config();
const database = require('../config/database');

const grade6BasicQuestions = [
    // Types of Computers (10 questions)
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which of the following is a type of computer?',
        options: [
            { text: 'Monitor', is_correct: false },
            { text: 'Printer', is_correct: false },
            { text: 'Laptop', is_correct: true },
            { text: 'Mouse', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'A desktop computer is usually:',
        options: [
            { text: 'Carried in a bag', is_correct: false },
            { text: 'Fixed on a table', is_correct: true },
            { text: 'Worn like a watch', is_correct: false },
            { text: 'Attached to a phone', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which one is not a type of computer?',
        options: [
            { text: 'Tablet', is_correct: false },
            { text: 'Mouse', is_correct: true },
            { text: 'Smartphone', is_correct: false },
            { text: 'Laptop', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device is used to carry a computer in your hand?',
        options: [
            { text: 'Desktop', is_correct: false },
            { text: 'Tablet', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'CPU', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which computer is worn like a watch?',
        options: [
            { text: 'Laptop', is_correct: false },
            { text: 'Desktop', is_correct: false },
            { text: 'Smartwatch', is_correct: true },
            { text: 'Mouse', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which of these is the smallest computer?',
        options: [
            { text: 'Laptop', is_correct: false },
            { text: 'Smartphone', is_correct: true },
            { text: 'Desktop', is_correct: false },
            { text: 'Server', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which computer is used in offices and homes?',
        options: [
            { text: 'Desktop', is_correct: true },
            { text: 'Server', is_correct: false },
            { text: 'Smartwatch', is_correct: false },
            { text: 'Scanner', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which computer is best for gaming?',
        options: [
            { text: 'Smartwatch', is_correct: false },
            { text: 'Desktop', is_correct: true },
            { text: 'Printer', is_correct: false },
            { text: 'Keyboard', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device is used to display output?',
        options: [
            { text: 'Monitor', is_correct: true },
            { text: 'Mouse', is_correct: false },
            { text: 'CPU', is_correct: false },
            { text: 'Keyboard', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device is used to print documents?',
        options: [
            { text: 'Monitor', is_correct: false },
            { text: 'Printer', is_correct: true },
            { text: 'Mouse', is_correct: false },
            { text: 'Speaker', is_correct: false }
        ]
    },

    // Input and Output Devices (10 questions)
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which of the following is an input device?',
        options: [
            { text: 'Keyboard', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'Printer', is_correct: false },
            { text: 'Speaker', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device helps you hear sound?',
        options: [
            { text: 'Keyboard', is_correct: false },
            { text: 'Monitor', is_correct: false },
            { text: 'Speaker', is_correct: true },
            { text: 'Mouse', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device is used to type letters?',
        options: [
            { text: 'Keyboard', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'Printer', is_correct: false },
            { text: 'CPU', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device is used to move the cursor?',
        options: [
            { text: 'Mouse', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'Speaker', is_correct: false },
            { text: 'Printer', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which of these is an output device?',
        options: [
            { text: 'Mouse', is_correct: false },
            { text: 'Monitor', is_correct: true },
            { text: 'Keyboard', is_correct: false },
            { text: 'Scanner', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device is used to scan pictures?',
        options: [
            { text: 'Printer', is_correct: false },
            { text: 'Scanner', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'Mouse', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device shows the result of your work?',
        options: [
            { text: 'Monitor', is_correct: true },
            { text: 'Keyboard', is_correct: false },
            { text: 'Mouse', is_correct: false },
            { text: 'CPU', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device is used to record sound?',
        options: [
            { text: 'Microphone', is_correct: true },
            { text: 'Speaker', is_correct: false },
            { text: 'Monitor', is_correct: false },
            { text: 'Mouse', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device is used to print on paper?',
        options: [
            { text: 'Printer', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'Mouse', is_correct: false },
            { text: 'Keyboard', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device is used to take pictures into the computer?',
        options: [
            { text: 'Webcam', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'Speaker', is_correct: false },
            { text: 'CPU', is_correct: false }
        ]
    },

    // Parts of a Computer (10 questions)
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which part is called the brain of the computer?',
        options: [
            { text: 'CPU', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'Mouse', is_correct: false },
            { text: 'Keyboard', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which part displays images?',
        options: [
            { text: 'Monitor', is_correct: true },
            { text: 'CPU', is_correct: false },
            { text: 'Mouse', is_correct: false },
            { text: 'Keyboard', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which part helps you type?',
        options: [
            { text: 'Keyboard', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'CPU', is_correct: false },
            { text: 'Speaker', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which part helps you click and drag?',
        options: [
            { text: 'Mouse', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'CPU', is_correct: false },
            { text: 'Printer', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which part stores all the data?',
        options: [
            { text: 'Hard Disk', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'Mouse', is_correct: false },
            { text: 'Keyboard', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which part is used to listen to music?',
        options: [
            { text: 'Speaker', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'CPU', is_correct: false },
            { text: 'Mouse', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which part is used to cool the computer?',
        options: [
            { text: 'Fan', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'Mouse', is_correct: false },
            { text: 'Keyboard', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which part connects all other parts?',
        options: [
            { text: 'Motherboard', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'Mouse', is_correct: false },
            { text: 'Printer', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which part is used to show videos?',
        options: [
            { text: 'Monitor', is_correct: true },
            { text: 'Mouse', is_correct: false },
            { text: 'Keyboard', is_correct: false },
            { text: 'CPU', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which part is used to store files permanently?',
        options: [
            { text: 'Hard Disk', is_correct: true },
            { text: 'RAM', is_correct: false },
            { text: 'CPU', is_correct: false },
            { text: 'Monitor', is_correct: false }
        ]
    },

    // Software Basics (10 questions)
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is software?',
        options: [
            { text: 'A set of instructions', is_correct: true },
            { text: 'A hardware part', is_correct: false },
            { text: 'A printer', is_correct: false },
            { text: 'A mouse', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which of these is an example of software?',
        options: [
            { text: 'MS Word', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'Keyboard', is_correct: false },
            { text: 'CPU', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which software is used for typing documents?',
        options: [
            { text: 'MS Word', is_correct: true },
            { text: 'Paint', is_correct: false },
            { text: 'Calculator', is_correct: false },
            { text: 'Chrome', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which software is used for drawing?',
        options: [
            { text: 'Paint', is_correct: true },
            { text: 'Word', is_correct: false },
            { text: 'Excel', is_correct: false },
            { text: 'Notepad', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which software is used for calculations?',
        options: [
            { text: 'Calculator', is_correct: true },
            { text: 'Paint', is_correct: false },
            { text: 'Word', is_correct: false },
            { text: 'Chrome', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which software helps you browse the internet?',
        options: [
            { text: 'Chrome', is_correct: true },
            { text: 'Paint', is_correct: false },
            { text: 'Word', is_correct: false },
            { text: 'Excel', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which software is used to make presentations?',
        options: [
            { text: 'PowerPoint', is_correct: true },
            { text: 'Paint', is_correct: false },
            { text: 'Word', is_correct: false },
            { text: 'Excel', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which software is used to store data in tables?',
        options: [
            { text: 'Excel', is_correct: true },
            { text: 'Word', is_correct: false },
            { text: 'Paint', is_correct: false },
            { text: 'Chrome', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which software is used to write code?',
        options: [
            { text: 'Notepad', is_correct: true },
            { text: 'Paint', is_correct: false },
            { text: 'Word', is_correct: false },
            { text: 'Excel', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which software is used to play music?',
        options: [
            { text: 'Media Player', is_correct: true },
            { text: 'Paint', is_correct: false },
            { text: 'Word', is_correct: false },
            { text: 'Excel', is_correct: false }
        ]
    },

    // Internet and Safety (10 questions)
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is the internet?',
        options: [
            { text: 'A global network of computers', is_correct: true },
            { text: 'A type of software', is_correct: false },
            { text: 'A computer game', is_correct: false },
            { text: 'A printer', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which software is used to browse the internet?',
        options: [
            { text: 'Web browser', is_correct: true },
            { text: 'Calculator', is_correct: false },
            { text: 'Paint', is_correct: false },
            { text: 'Notepad', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What should you never share online?',
        options: [
            { text: 'Personal information', is_correct: true },
            { text: 'Favorite color', is_correct: false },
            { text: 'Favorite food', is_correct: false },
            { text: 'School name', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is a website?',
        options: [
            { text: 'A collection of web pages', is_correct: true },
            { text: 'A computer virus', is_correct: false },
            { text: 'A type of hardware', is_correct: false },
            { text: 'A printer setting', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What does WWW stand for?',
        options: [
            { text: 'World Wide Web', is_correct: true },
            { text: 'World Wide Window', is_correct: false },
            { text: 'World Web Window', is_correct: false },
            { text: 'Wide World Web', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which is a safe password?',
        options: [
            { text: 'MyName123!', is_correct: true },
            { text: '123', is_correct: false },
            { text: 'password', is_correct: false },
            { text: 'abc', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is email?',
        options: [
            { text: 'Electronic mail', is_correct: true },
            { text: 'Emergency mail', is_correct: false },
            { text: 'Express mail', is_correct: false },
            { text: 'Extra mail', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What should you do if you see inappropriate content online?',
        options: [
            { text: 'Tell an adult', is_correct: true },
            { text: 'Share it with friends', is_correct: false },
            { text: 'Download it', is_correct: false },
            { text: 'Print it', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is cyberbullying?',
        options: [
            { text: 'Bullying using technology', is_correct: true },
            { text: 'Playing computer games', is_correct: false },
            { text: 'Using the internet', is_correct: false },
            { text: 'Sending emails', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is a search engine?',
        options: [
            { text: 'A tool to find information online', is_correct: true },
            { text: 'A type of computer', is_correct: false },
            { text: 'A software for drawing', is_correct: false },
            { text: 'A printer function', is_correct: false }
        ]
    },

    // Keyboard Keys (10 questions)
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which key is used to start a new line?',
        options: [
            { text: 'Enter', is_correct: true },
            { text: 'Spacebar', is_correct: false },
            { text: 'Shift', is_correct: false },
            { text: 'Ctrl', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which key is used to delete letters?',
        options: [
            { text: 'Backspace', is_correct: true },
            { text: 'Spacebar', is_correct: false },
            { text: 'Enter', is_correct: false },
            { text: 'Shift', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which key is used to create spaces?',
        options: [
            { text: 'Spacebar', is_correct: true },
            { text: 'Enter', is_correct: false },
            { text: 'Shift', is_correct: false },
            { text: 'Ctrl', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which key is used to type capital letters?',
        options: [
            { text: 'Caps Lock', is_correct: true },
            { text: 'Shift', is_correct: false },
            { text: 'Enter', is_correct: false },
            { text: 'Tab', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which key is used to move to the next field?',
        options: [
            { text: 'Tab', is_correct: true },
            { text: 'Enter', is_correct: false },
            { text: 'Shift', is_correct: false },
            { text: 'Ctrl', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which key is used with other keys for shortcuts?',
        options: [
            { text: 'Ctrl', is_correct: true },
            { text: 'Spacebar', is_correct: false },
            { text: 'Enter', is_correct: false },
            { text: 'Caps Lock', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which key is used to open the Start menu?',
        options: [
            { text: 'Windows key', is_correct: true },
            { text: 'Ctrl', is_correct: false },
            { text: 'Shift', is_correct: false },
            { text: 'Alt', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which key is used to refresh a page?',
        options: [
            { text: 'F5', is_correct: true },
            { text: 'F1', is_correct: false },
            { text: 'F2', is_correct: false },
            { text: 'F3', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which key combination is used to undo an action?',
        options: [
            { text: 'Ctrl + Z', is_correct: true },
            { text: 'Ctrl + C', is_correct: false },
            { text: 'Ctrl + V', is_correct: false },
            { text: 'Ctrl + X', is_correct: false }
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
    }
];

async function seedGrade6Basic100() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('Starting Grade 6 Basic 100 questions seeding...');

        // Insert Grade 6 basic questions
        for (const questionData of grade6BasicQuestions) {
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

        console.log(`Successfully added ${grade6BasicQuestions.length} Grade 6 Basic questions!`);
        console.log('Question categories:');
        console.log('- Types of Computers: 10 questions');
        console.log('- Input and Output Devices: 10 questions');
        console.log('- Parts of a Computer: 10 questions');
        console.log('- Software Basics: 10 questions');
        console.log('- Keyboard Keys: 10 questions');
        console.log('- Internet and Safety: 10 questions');
        console.log('Total: 60 questions (Part 1 of 100)');

    } catch (error) {
        console.error('Error seeding Grade 6 Basic questions:', error);
    } finally {
        await database.close();
    }
}

// Run seeding if this file is executed directly
if (require.main === module) {
    seedGrade6Basic100();
}

module.exports = seedGrade6Basic100;