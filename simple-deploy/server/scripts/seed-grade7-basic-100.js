require('dotenv').config();
const database = require('../config/database');

const grade7BasicQuestions = [
    // Section 1: Computer Basics (20 MCQs)
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What is a computer?',
        options: [
            { text: 'A gaming device', is_correct: false },
            { text: 'An electronic machine that processes data', is_correct: true },
            { text: 'A type of printer', is_correct: false },
            { text: 'A music player', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'Which of these is a type of computer?',
        options: [
            { text: 'Laptop', is_correct: true },
            { text: 'Television', is_correct: false },
            { text: 'Refrigerator', is_correct: false },
            { text: 'Fan', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'The part of the computer that displays output is called:',
        options: [
            { text: 'Keyboard', is_correct: false },
            { text: 'Monitor', is_correct: true },
            { text: 'CPU', is_correct: false },
            { text: 'Mouse', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'Which device is used to type letters?',
        options: [
            { text: 'Mouse', is_correct: false },
            { text: 'Keyboard', is_correct: true },
            { text: 'Speaker', is_correct: false },
            { text: 'Scanner', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'The "brain" of the computer is the:',
        options: [
            { text: 'Monitor', is_correct: false },
            { text: 'CPU', is_correct: true },
            { text: 'Printer', is_correct: false },
            { text: 'Mouse', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'Which key erases text to the left?',
        options: [
            { text: 'Delete', is_correct: false },
            { text: 'Backspace', is_correct: true },
            { text: 'Enter', is_correct: false },
            { text: 'Shift', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'The longest key on the keyboard is:',
        options: [
            { text: 'Enter', is_correct: false },
            { text: 'Spacebar', is_correct: true },
            { text: 'Shift', is_correct: false },
            { text: 'Ctrl', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What does CPU stand for?',
        options: [
            { text: 'Central Printing Unit', is_correct: false },
            { text: 'Central Processing Unit', is_correct: true },
            { text: 'Computer Personal Unit', is_correct: false },
            { text: 'Control Processing Unit', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'Which is an input device?',
        options: [
            { text: 'Monitor', is_correct: false },
            { text: 'Mouse', is_correct: true },
            { text: 'Printer', is_correct: false },
            { text: 'Speaker', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'Which is an output device?',
        options: [
            { text: 'Keyboard', is_correct: false },
            { text: 'Mouse', is_correct: false },
            { text: 'Printer', is_correct: true },
            { text: 'Scanner', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'USB stands for:',
        options: [
            { text: 'Universal Serial Bus', is_correct: true },
            { text: 'Unified System Bus', is_correct: false },
            { text: 'Universal System Bus', is_correct: false },
            { text: 'United Serial Bus', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'The main screen of the computer is called:',
        options: [
            { text: 'Desktop', is_correct: true },
            { text: 'Wallpaper', is_correct: false },
            { text: 'Screensaver', is_correct: false },
            { text: 'Taskbar', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'Small pictures on the desktop are called:',
        options: [
            { text: 'Files', is_correct: false },
            { text: 'Icons', is_correct: true },
            { text: 'Folders', is_correct: false },
            { text: 'Apps', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'The Recycle Bin stores:',
        options: [
            { text: 'New files', is_correct: false },
            { text: 'Deleted files', is_correct: true },
            { text: 'Music files', is_correct: false },
            { text: 'System files', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'To shut down the computer properly, you click:',
        options: [
            { text: 'Restart', is_correct: false },
            { text: 'Shut Down', is_correct: true },
            { text: 'Sleep', is_correct: false },
            { text: 'Hibernate', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'Which key moves the cursor to the next line?',
        options: [
            { text: 'Spacebar', is_correct: false },
            { text: 'Enter', is_correct: true },
            { text: 'Tab', is_correct: false },
            { text: 'Shift', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'The shortcut to copy text is:',
        options: [
            { text: 'Ctrl + X', is_correct: false },
            { text: 'Ctrl + C', is_correct: true },
            { text: 'Ctrl + V', is_correct: false },
            { text: 'Ctrl + Z', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'The shortcut to paste text is:',
        options: [
            { text: 'Ctrl + X', is_correct: false },
            { text: 'Ctrl + C', is_correct: false },
            { text: 'Ctrl + V', is_correct: true },
            { text: 'Ctrl + A', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'To select all text, press:',
        options: [
            { text: 'Ctrl + X', is_correct: false },
            { text: 'Ctrl + A', is_correct: true },
            { text: 'Ctrl + S', is_correct: false },
            { text: 'Ctrl + Z', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'The "Undo" shortcut is:',
        options: [
            { text: 'Ctrl + Z', is_correct: true },
            { text: 'Ctrl + Y', is_correct: false },
            { text: 'Ctrl + U', is_correct: false },
            { text: 'Ctrl + D', is_correct: false }
        ]
    },

    // Section 2: MS Word (20 MCQs)
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'MS Word is used for:',
        options: [
            { text: 'Drawing', is_correct: false },
            { text: 'Typing documents', is_correct: true },
            { text: 'Playing games', is_correct: false },
            { text: 'Browsing the internet', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'The shortcut for bold text is:',
        options: [
            { text: 'Ctrl + I', is_correct: false },
            { text: 'Ctrl + B', is_correct: true },
            { text: 'Ctrl + U', is_correct: false },
            { text: 'Ctrl + D', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'To underline text, press:',
        options: [
            { text: 'Ctrl + I', is_correct: false },
            { text: 'Ctrl + B', is_correct: false },
            { text: 'Ctrl + U', is_correct: true },
            { text: 'Ctrl + L', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'Italic text is made with:',
        options: [
            { text: 'Ctrl + I', is_correct: true },
            { text: 'Ctrl + B', is_correct: false },
            { text: 'Ctrl + U', is_correct: false },
            { text: 'Ctrl + T', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'The default file extension for Word is:',
        options: [
            { text: '.txt', is_correct: false },
            { text: '.docx', is_correct: true },
            { text: '.xlsx', is_correct: false },
            { text: '.ppt', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'To save a document, press:',
        options: [
            { text: 'Ctrl + O', is_correct: false },
            { text: 'Ctrl + S', is_correct: true },
            { text: 'Ctrl + P', is_correct: false },
            { text: 'Ctrl + N', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'To open a saved file, press:',
        options: [
            { text: 'Ctrl + O', is_correct: true },
            { text: 'Ctrl + S', is_correct: false },
            { text: 'Ctrl + P', is_correct: false },
            { text: 'Ctrl + N', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'The "Print" shortcut is:',
        options: [
            { text: 'Ctrl + S', is_correct: false },
            { text: 'Ctrl + P', is_correct: true },
            { text: 'Ctrl + O', is_correct: false },
            { text: 'Ctrl + T', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'Which alignment centers text?',
        options: [
            { text: 'Left', is_correct: false },
            { text: 'Right', is_correct: false },
            { text: 'Center', is_correct: true },
            { text: 'Justify', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'The default font in Word is:',
        options: [
            { text: 'Arial', is_correct: false },
            { text: 'Calibri', is_correct: true },
            { text: 'Times New Roman', is_correct: false },
            { text: 'Comic Sans', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'To check spelling, use:',
        options: [
            { text: 'Spell Check', is_correct: true },
            { text: 'Word Count', is_correct: false },
            { text: 'Thesaurus', is_correct: false },
            { text: 'Grammar Check', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'The "Redo" shortcut is:',
        options: [
            { text: 'Ctrl + Z', is_correct: false },
            { text: 'Ctrl + Y', is_correct: true },
            { text: 'Ctrl + R', is_correct: false },
            { text: 'Ctrl + D', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'To insert a picture, go to:',
        options: [
            { text: 'Insert > Pictures', is_correct: true },
            { text: 'Home > Pictures', is_correct: false },
            { text: 'View > Pictures', is_correct: false },
            { text: 'File > Pictures', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'The shortcut to find text is:',
        options: [
            { text: 'Ctrl + H', is_correct: false },
            { text: 'Ctrl + F', is_correct: true },
            { text: 'Ctrl + G', is_correct: false },
            { text: 'Ctrl + D', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'To change font size, use:',
        options: [
            { text: 'The font size dropdown', is_correct: true },
            { text: 'The bold button', is_correct: false },
            { text: 'The save button', is_correct: false },
            { text: 'The print button', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'The "Cut" shortcut is:',
        options: [
            { text: 'Ctrl + X', is_correct: true },
            { text: 'Ctrl + C', is_correct: false },
            { text: 'Ctrl + V', is_correct: false },
            { text: 'Ctrl + Z', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'To create a new document, press:',
        options: [
            { text: 'Ctrl + O', is_correct: false },
            { text: 'Ctrl + S', is_correct: false },
            { text: 'Ctrl + N', is_correct: true },
            { text: 'Ctrl + P', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'The zoom slider is found in the:',
        options: [
            { text: 'Bottom-right corner', is_correct: true },
            { text: 'Top-left corner', is_correct: false },
            { text: 'File menu', is_correct: false },
            { text: 'Home tab', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'The "Replace" shortcut is:',
        options: [
            { text: 'Ctrl + F', is_correct: false },
            { text: 'Ctrl + H', is_correct: true },
            { text: 'Ctrl + R', is_correct: false },
            { text: 'Ctrl + E', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'To exit Word, click:',
        options: [
            { text: 'File > Exit', is_correct: true },
            { text: 'Home > Close', is_correct: false },
            { text: 'View > Exit', is_correct: false },
            { text: 'Insert > Close', is_correct: false }
        ]
    },

    // Section 3: Files & Paint (20 MCQs)
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'In Paint, the freehand drawing tool is:',
        options: [
            { text: 'Pencil', is_correct: true },
            { text: 'Brush', is_correct: false },
            { text: 'Eraser', is_correct: false },
            { text: 'Fill', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'To erase mistakes in Paint, use:',
        options: [
            { text: 'Eraser', is_correct: true },
            { text: 'Pencil', is_correct: false },
            { text: 'Brush', is_correct: false },
            { text: 'Text', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'The "Fill with Color" tool looks like a:',
        options: [
            { text: 'Pencil', is_correct: false },
            { text: 'Bucket', is_correct: true },
            { text: 'Spray can', is_correct: false },
            { text: 'Eraser', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'The shortcut to copy in Paint is:',
        options: [
            { text: 'Ctrl + X', is_correct: false },
            { text: 'Ctrl + C', is_correct: true },
            { text: 'Ctrl + V', is_correct: false },
            { text: 'Ctrl + Z', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'The shortcut to paste in Paint is:',
        options: [
            { text: 'Ctrl + X', is_correct: false },
            { text: 'Ctrl + C', is_correct: false },
            { text: 'Ctrl + V', is_correct: true },
            { text: 'Ctrl + Z', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'To save a Paint file, go to:',
        options: [
            { text: 'File > Save', is_correct: true },
            { text: 'Home > Save', is_correct: false },
            { text: 'View > Save', is_correct: false },
            { text: 'Edit > Save', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'The default file format for Paint is:',
        options: [
            { text: '.docx', is_correct: false },
            { text: '.png', is_correct: true },
            { text: '.mp3', is_correct: false },
            { text: '.txt', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'The "Text" tool is used to:',
        options: [
            { text: 'Draw circles', is_correct: false },
            { text: 'Add words', is_correct: true },
            { text: 'Erase', is_correct: false },
            { text: 'Fill color', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'To select part of an image, use:',
        options: [
            { text: 'Selection tool', is_correct: true },
            { text: 'Pencil', is_correct: false },
            { text: 'Brush', is_correct: false },
            { text: 'Magnifier', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'The "Magnifier" tool is used to:',
        options: [
            { text: 'Zoom in/out', is_correct: true },
            { text: 'Draw lines', is_correct: false },
            { text: 'Add text', is_correct: false },
            { text: 'Fill color', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'A file is:',
        options: [
            { text: 'A saved document', is_correct: true },
            { text: 'A physical folder', is_correct: false },
            { text: 'A computer part', is_correct: false },
            { text: 'A type of printer', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'A folder is used to:',
        options: [
            { text: 'Play games', is_correct: false },
            { text: 'Organize files', is_correct: true },
            { text: 'Type documents', is_correct: false },
            { text: 'Browse the internet', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'To create a new folder, right-click and select:',
        options: [
            { text: 'New > Folder', is_correct: true },
            { text: 'Open', is_correct: false },
            { text: 'Delete', is_correct: false },
            { text: 'Copy', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'The shortcut to rename a file is:',
        options: [
            { text: 'Ctrl + R', is_correct: false },
            { text: 'F2', is_correct: true },
            { text: 'F5', is_correct: false },
            { text: 'F12', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'To delete a file, press:',
        options: [
            { text: 'Delete key', is_correct: true },
            { text: 'Enter key', is_correct: false },
            { text: 'Spacebar', is_correct: false },
            { text: 'Esc key', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'Deleted files go to the:',
        options: [
            { text: 'Desktop', is_correct: false },
            { text: 'Recycle Bin', is_correct: true },
            { text: 'My Documents', is_correct: false },
            { text: 'Downloads', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'To restore a deleted file, open the Recycle Bin and click:',
        options: [
            { text: 'Restore', is_correct: true },
            { text: 'Delete', is_correct: false },
            { text: 'Cut', is_correct: false },
            { text: 'Copy', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'The "Cut" shortcut for files is:',
        options: [
            { text: 'Ctrl + X', is_correct: true },
            { text: 'Ctrl + C', is_correct: false },
            { text: 'Ctrl + V', is_correct: false },
            { text: 'Ctrl + Z', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'The difference between "Copy" and "Cut" is:',
        options: [
            { text: 'Copy duplicates, Cut moves', is_correct: true },
            { text: 'Copy deletes, Cut saves', is_correct: false },
            { text: 'Both do the same', is_correct: false },
            { text: 'No difference', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'To open a file, you:',
        options: [
            { text: 'Double-click it', is_correct: true },
            { text: 'Press Ctrl + O', is_correct: false },
            { text: 'Right-click > Delete', is_correct: false },
            { text: 'Drag it to the Recycle Bin', is_correct: false }
        ]
    }
];

async function seedGrade7Basic100() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('Starting Grade 7 Basic 100 questions seeding...');

        // Insert Grade 7 basic questions
        for (const questionData of grade7BasicQuestions) {
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

        console.log(`Successfully added ${grade7BasicQuestions.length} Grade 7 Basic questions!`);
        console.log('Question categories:');
        console.log('- Computer Basics: 20 questions');
        console.log('- MS Word: 20 questions');
        console.log('- Files & Paint: 20 questions');
        console.log('Total: 60 questions added');

    } catch (error) {
        console.error('Error seeding Grade 7 Basic questions:', error);
    } finally {
        await database.close();
    }
}

// Run seeding if this file is executed directly
if (require.main === module) {
    seedGrade7Basic100();
}

module.exports = seedGrade7Basic100;