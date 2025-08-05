require('dotenv').config();
const database = require('../config/database');

const grade8CSQuestions = [
    // Section 1: Internet & Web Browsers (15 Questions)
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'What is a web browser?',
        options: [
            { text: 'A gaming application', is_correct: false },
            { text: 'Software to access websites', is_correct: true },
            { text: 'A type of computer hardware', is_correct: false },
            { text: 'An email service', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Which is NOT a web browser?',
        options: [
            { text: 'Chrome', is_correct: false },
            { text: 'Firefox', is_correct: false },
            { text: 'MS Word', is_correct: true },
            { text: 'Edge', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'The address bar is used to:',
        options: [
            { text: 'Play videos', is_correct: false },
            { text: 'Type website URLs', is_correct: true },
            { text: 'Change font size', is_correct: false },
            { text: 'Save files', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Google is an example of a:',
        options: [
            { text: 'Search engine', is_correct: true },
            { text: 'Social media site', is_correct: false },
            { text: 'Email provider', is_correct: false },
            { text: 'Browser', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'To bookmark a webpage, you press:',
        options: [
            { text: 'Ctrl+A', is_correct: false },
            { text: 'Ctrl+D', is_correct: true },
            { text: 'Ctrl+S', is_correct: false },
            { text: 'Ctrl+P', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'Which symbol is used in every website URL?',
        options: [
            { text: '*', is_correct: false },
            { text: '$', is_correct: false },
            { text: '/', is_correct: true },
            { text: '#', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'To refresh a webpage, you press:',
        options: [
            { text: 'F5', is_correct: true },
            { text: 'F1', is_correct: false },
            { text: 'F12', is_correct: false },
            { text: 'Esc', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'HTTPS means:',
        options: [
            { text: 'Hyper Text Transfer Protocol', is_correct: false },
            { text: 'Secure version of HTTP', is_correct: true },
            { text: 'High-Tech Transfer Process', is_correct: false },
            { text: 'None of the above', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'A hyperlink is:',
        options: [
            { text: 'A computer virus', is_correct: false },
            { text: 'Clickable text/image linking to another page', is_correct: true },
            { text: 'A type of printer', is_correct: false },
            { text: 'A keyboard shortcut', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'Incognito mode is used to:',
        options: [
            { text: 'Browse privately', is_correct: true },
            { text: 'Play games faster', is_correct: false },
            { text: 'Increase internet speed', is_correct: false },
            { text: 'Download files', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Which is a valid website extension?',
        options: [
            { text: '.docx', is_correct: false },
            { text: '.mp3', is_correct: false },
            { text: '.org', is_correct: true },
            { text: '.exe', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'To download a file, you:',
        options: [
            { text: 'Right-click → Save As', is_correct: true },
            { text: 'Press Ctrl+C', is_correct: false },
            { text: 'Drag it to Recycle Bin', is_correct: false },
            { text: 'None of the above', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'Cache memory helps:',
        options: [
            { text: 'Load websites faster', is_correct: true },
            { text: 'Increase RAM size', is_correct: false },
            { text: 'Print documents', is_correct: false },
            { text: 'Scan for viruses', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'A pop-up is:',
        options: [
            { text: 'A small window that appears suddenly', is_correct: true },
            { text: 'A type of USB drive', is_correct: false },
            { text: 'A keyboard key', is_correct: false },
            { text: 'None of the above', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'To clear browser history, press:',
        options: [
            { text: 'Ctrl+Shift+Delete', is_correct: true },
            { text: 'Ctrl+Z', is_correct: false },
            { text: 'Alt+F4', is_correct: false },
            { text: 'F1', is_correct: false }
        ]
    },

    // Section 2: Cyber Safety & Digital Citizenship (15 Questions)
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'Cyberbullying is:',
        options: [
            { text: 'Hurting someone online', is_correct: true },
            { text: 'A type of computer virus', is_correct: false },
            { text: 'A programming language', is_correct: false },
            { text: 'A hardware device', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'A strong password should:',
        options: [
            { text: 'Include numbers and symbols', is_correct: true },
            { text: 'Be your pet\'s name', is_correct: false },
            { text: 'Be "password123"', is_correct: false },
            { text: 'None of the above', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'advanced',
        question_text: 'Phishing is:',
        options: [
            { text: 'A game', is_correct: false },
            { text: 'Fake emails/websites stealing data', is_correct: true },
            { text: 'A type of software', is_correct: false },
            { text: 'None of the above', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'You should NEVER share your:',
        options: [
            { text: 'Password', is_correct: true },
            { text: 'Favorite color', is_correct: false },
            { text: 'School name', is_correct: false },
            { text: 'Age', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'Copyright protects:',
        options: [
            { text: 'Creative work (art, music, writing)', is_correct: true },
            { text: 'Computer hardware', is_correct: false },
            { text: 'Usernames', is_correct: false },
            { text: 'None of the above', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'Digital footprint is:',
        options: [
            { text: 'Your online activity record', is_correct: true },
            { text: 'A type of printer', is_correct: false },
            { text: 'A mouse feature', is_correct: false },
            { text: 'None of the above', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'To report cyberbullying, you should:',
        options: [
            { text: 'Tell a trusted adult', is_correct: true },
            { text: 'Respond angrily', is_correct: false },
            { text: 'Delete your account', is_correct: false },
            { text: 'Ignore it', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'advanced',
        question_text: 'A VPN is used to:',
        options: [
            { text: 'Browse securely/anonymously', is_correct: true },
            { text: 'Play video games', is_correct: false },
            { text: 'Increase computer speed', is_correct: false },
            { text: 'Print documents', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'Malware is:',
        options: [
            { text: 'Harmful software (viruses, spyware)', is_correct: true },
            { text: 'A type of browser', is_correct: false },
            { text: 'A keyboard key', is_correct: false },
            { text: 'None of the above', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'advanced',
        question_text: 'Two-factor authentication adds:',
        options: [
            { text: 'Extra security layer', is_correct: true },
            { text: 'More storage space', is_correct: false },
            { text: 'Faster internet', is_correct: false },
            { text: 'None of the above', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'You should avoid:',
        options: [
            { text: 'Clicking unknown links', is_correct: true },
            { text: 'Using strong passwords', is_correct: false },
            { text: 'Updating software', is_correct: false },
            { text: 'None of the above', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'Netiquette means:',
        options: [
            { text: 'Good online behavior', is_correct: true },
            { text: 'A type of network cable', is_correct: false },
            { text: 'A computer brand', is_correct: false },
            { text: 'None of the above', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'To protect privacy, you should:',
        options: [
            { text: 'Adjust social media settings', is_correct: true },
            { text: 'Share personal details publicly', is_correct: false },
            { text: 'Use weak passwords', is_correct: false },
            { text: 'None of the above', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'A scam email often:',
        options: [
            { text: 'Asks for personal information', is_correct: true },
            { text: 'Comes from known contacts', is_correct: false },
            { text: 'Has correct spelling/grammar', is_correct: false },
            { text: 'None of the above', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'Digital citizenship involves:',
        options: [
            { text: 'Responsible online behavior', is_correct: true },
            { text: 'Only playing games', is_correct: false },
            { text: 'Ignoring cyberbullying', is_correct: false },
            { text: 'None of the above', is_correct: false }
        ]
    },

    // Section 3: Scratch Programming (10 Questions)
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Scratch is a:',
        options: [
            { text: 'Block-based programming language', is_correct: true },
            { text: 'Word processor', is_correct: false },
            { text: 'Spreadsheet tool', is_correct: false },
            { text: 'Browser', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Sprites are:',
        options: [
            { text: 'Characters/objects in Scratch', is_correct: true },
            { text: 'Keyboard shortcuts', is_correct: false },
            { text: 'Types of viruses', is_correct: false },
            { text: 'None of the above', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'The green flag is used to:',
        options: [
            { text: 'Start a program', is_correct: true },
            { text: 'Delete a sprite', is_correct: false },
            { text: 'Change the background', is_correct: false },
            { text: 'None of the above', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'To make a sprite move, use:',
        options: [
            { text: 'Motion blocks', is_correct: true },
            { text: 'Sound blocks', is_correct: false },
            { text: 'Looks blocks', is_correct: false },
            { text: 'None of the above', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'The "forever" block creates a:',
        options: [
            { text: 'Loop', is_correct: true },
            { text: 'Variable', is_correct: false },
            { text: 'Condition', is_correct: false },
            { text: 'None of the above', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'To change a sprite\'s costume, use:',
        options: [
            { text: 'Looks blocks', is_correct: true },
            { text: 'Sound blocks', is_correct: false },
            { text: 'Event blocks', is_correct: false },
            { text: 'None of the above', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'The "if-then" block is used for:',
        options: [
            { text: 'Conditions', is_correct: true },
            { text: 'Loops', is_correct: false },
            { text: 'Variables', is_correct: false },
            { text: 'None of the above', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'To play a sound, use:',
        options: [
            { text: 'Sound blocks', is_correct: true },
            { text: 'Motion blocks', is_correct: false },
            { text: 'Pen blocks', is_correct: false },
            { text: 'None of the above', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'The stage is:',
        options: [
            { text: 'Background where sprites perform', is_correct: true },
            { text: 'A type of block', is_correct: false },
            { text: 'A variable', is_correct: false },
            { text: 'None of the above', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'To share a Scratch project, click:',
        options: [
            { text: 'File → Share', is_correct: true },
            { text: 'File → Save', is_correct: false },
            { text: 'Edit → Undo', is_correct: false },
            { text: 'None of the above', is_correct: false }
        ]
    },

    // Additional questions to reach closer to 100 (adding some Excel and Hardware examples)
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'In Excel, a cell is identified by:',
        options: [
            { text: 'Column letter + Row number (e.g., A1)', is_correct: true },
            { text: 'Only row number', is_correct: false },
            { text: 'Only column letter', is_correct: false },
            { text: 'None of the above', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'An example of hardware is:',
        options: [
            { text: 'Printer', is_correct: true },
            { text: 'MS Word', is_correct: false },
            { text: 'Google Chrome', is_correct: false },
            { text: 'Scratch', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Cloud storage allows you to:',
        options: [
            { text: 'Store files online', is_correct: true },
            { text: 'Print documents faster', is_correct: false },
            { text: 'Increase computer speed', is_correct: false },
            { text: 'Play games', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'RAM stands for:',
        options: [
            { text: 'Random Access Memory', is_correct: true },
            { text: 'Read Access Memory', is_correct: false },
            { text: 'Rapid Access Memory', is_correct: false },
            { text: 'Real Access Memory', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Which is an input device?',
        options: [
            { text: 'Keyboard', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'Printer', is_correct: false },
            { text: 'Speaker', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'The desktop is:',
        options: [
            { text: 'The main screen of your computer', is_correct: true },
            { text: 'A type of software', is_correct: false },
            { text: 'A hardware component', is_correct: false },
            { text: 'An internet browser', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'A firewall is used to:',
        options: [
            { text: 'Protect against unauthorized access', is_correct: true },
            { text: 'Speed up internet connection', is_correct: false },
            { text: 'Store files', is_correct: false },
            { text: 'Play multimedia', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'To select all files in a folder, press:',
        options: [
            { text: 'Ctrl + A', is_correct: true },
            { text: 'Ctrl + S', is_correct: false },
            { text: 'Ctrl + C', is_correct: false },
            { text: 'Ctrl + V', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Which file format is used for images?',
        options: [
            { text: '.jpg', is_correct: true },
            { text: '.docx', is_correct: false },
            { text: '.mp3', is_correct: false },
            { text: '.exe', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'What does WWW stand for?',
        options: [
            { text: 'World Wide Web', is_correct: true },
            { text: 'World Wide Window', is_correct: false },
            { text: 'World Web Window', is_correct: false },
            { text: 'Wide World Web', is_correct: false }
        ]
    }
];

async function seedGrade8CS100() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('Starting Grade 8 Computer Science questions seeding...');

        // Insert Grade 8 CS questions
        for (const questionData of grade8CSQuestions) {
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

        console.log(`Successfully added ${grade8CSQuestions.length} Grade 8 Computer Science questions!`);
        console.log('Question categories:');
        console.log('- Internet & Web Browsers: 15 questions');
        console.log('- Cyber Safety & Digital Citizenship: 15 questions');
        console.log('- Scratch Programming: 10 questions');
        console.log('- Additional Topics: 10 questions');
        console.log(`Total: ${grade8CSQuestions.length} questions added`);

        const basicCount = grade8CSQuestions.filter(q => q.difficulty === 'basic').length;
        const mediumCount = grade8CSQuestions.filter(q => q.difficulty === 'medium').length;
        const advancedCount = grade8CSQuestions.filter(q => q.difficulty === 'advanced').length;
        
        console.log('Difficulty distribution:');
        console.log(`- Basic: ${basicCount} questions`);
        console.log(`- Medium: ${mediumCount} questions`);
        console.log(`- Advanced: ${advancedCount} questions`);

    } catch (error) {
        console.error('Error seeding Grade 8 CS questions:', error);
    } finally {
        await database.close();
    }
}

// Run seeding if this file is executed directly
if (require.main === module) {
    seedGrade8CS100();
}

module.exports = seedGrade8CS100;