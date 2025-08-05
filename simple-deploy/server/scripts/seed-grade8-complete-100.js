require('dotenv').config();
const database = require('../config/database');

const grade8CompleteQuestions = [
    // Section 1: Internet & Web Browsers (15 Questions) - Additional ones
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Which of these is a web browser?',
        options: [
            { text: 'Photoshop', is_correct: false },
            { text: 'Google Chrome', is_correct: true },
            { text: 'MS Word', is_correct: false },
            { text: 'Calculator', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Which symbol starts most website addresses?',
        options: [
            { text: '#', is_correct: false },
            { text: '@', is_correct: false },
            { text: 'https://', is_correct: true },
            { text: '%', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'A search engine is used to:',
        options: [
            { text: 'Find information online', is_correct: true },
            { text: 'Play games', is_correct: false },
            { text: 'Type documents', is_correct: false },
            { text: 'Edit photos', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'To open a new tab in a browser, press:',
        options: [
            { text: 'Ctrl + T', is_correct: true },
            { text: 'Ctrl + N', is_correct: false },
            { text: 'Ctrl + S', is_correct: false },
            { text: 'Ctrl + P', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'To close a browser tab, press:',
        options: [
            { text: 'Ctrl + W', is_correct: true },
            { text: 'Ctrl + Q', is_correct: false },
            { text: 'Alt + F4', is_correct: false },
            { text: 'Esc', is_correct: false }
        ]
    },

    // Section 2: Cyber Safety (15 Questions) - Additional ones
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'A strong password should:',
        options: [
            { text: 'Include numbers and symbols', is_correct: true },
            { text: 'Be your pet\'s name', is_correct: false },
            { text: 'Be "password123"', is_correct: false },
            { text: 'Be shared with friends', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'advanced',
        question_text: 'Phishing is:',
        options: [
            { text: 'A sport', is_correct: false },
            { text: 'Fake emails stealing info', is_correct: true },
            { text: 'A computer part', is_correct: false },
            { text: 'A browser', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'You should never share your:',
        options: [
            { text: 'Password', is_correct: true },
            { text: 'Favorite color', is_correct: false },
            { text: 'School name', is_correct: false },
            { text: 'Hobbies', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'Copyright protects:',
        options: [
            { text: 'Creative work online', is_correct: true },
            { text: 'Weather forecasts', is_correct: false },
            { text: 'Public parks', is_correct: false },
            { text: 'Air', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'Digital footprint refers to:',
        options: [
            { text: 'Your online activity records', is_correct: true },
            { text: 'A printer error', is_correct: false },
            { text: 'Mouse tracks', is_correct: false },
            { text: 'Computer viruses', is_correct: false }
        ]
    },

    // Section 3: Scratch Programming (10 Questions) - Additional ones
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'In Scratch, sprites are:',
        options: [
            { text: 'Characters/objects', is_correct: true },
            { text: 'Background colors', is_correct: false },
            { text: 'Sound effects', is_correct: false },
            { text: 'Keyboard keys', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Which block makes a sprite move?',
        options: [
            { text: '"Move 10 steps"', is_correct: true },
            { text: '"Play sound"', is_correct: false },
            { text: '"Say Hello"', is_correct: false },
            { text: '"Stop all"', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'The green flag is used to:',
        options: [
            { text: 'Delete a project', is_correct: false },
            { text: 'Start a program', is_correct: true },
            { text: 'Change costumes', is_correct: false },
            { text: 'Exit Scratch', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'In Scratch, a "repeat" block creates:',
        options: [
            { text: 'A loop', is_correct: true },
            { text: 'A variable', is_correct: false },
            { text: 'A sound', is_correct: false },
            { text: 'A costume', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'To detect when a sprite touches another sprite, use:',
        options: [
            { text: 'Sensing blocks', is_correct: true },
            { text: 'Motion blocks', is_correct: false },
            { text: 'Sound blocks', is_correct: false },
            { text: 'Pen blocks', is_correct: false }
        ]
    },

    // Section 4: MS Excel (10 Questions)
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'A spreadsheet is used for:',
        options: [
            { text: 'Organizing data', is_correct: true },
            { text: 'Editing photos', is_correct: false },
            { text: 'Browsing the internet', is_correct: false },
            { text: 'Playing music', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Columns are labeled with:',
        options: [
            { text: 'Numbers', is_correct: false },
            { text: 'Letters (A, B, C...)', is_correct: true },
            { text: 'Symbols', is_correct: false },
            { text: 'Colors', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'The formula "=SUM(A1:A5)" will:',
        options: [
            { text: 'Add cells A1 to A5', is_correct: true },
            { text: 'Multiply values', is_correct: false },
            { text: 'Create a chart', is_correct: false },
            { text: 'Change font', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Rows in Excel are labeled with:',
        options: [
            { text: 'Numbers (1, 2, 3...)', is_correct: true },
            { text: 'Letters', is_correct: false },
            { text: 'Symbols', is_correct: false },
            { text: 'Colors', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'The formula "=AVERAGE(B1:B10)" will:',
        options: [
            { text: 'Calculate the average of B1 to B10', is_correct: true },
            { text: 'Add all values', is_correct: false },
            { text: 'Find the maximum value', is_correct: false },
            { text: 'Count the cells', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'To create a chart in Excel, go to:',
        options: [
            { text: 'Insert tab', is_correct: true },
            { text: 'Home tab', is_correct: false },
            { text: 'View tab', is_correct: false },
            { text: 'File tab', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'The intersection of a row and column is called:',
        options: [
            { text: 'A cell', is_correct: true },
            { text: 'A table', is_correct: false },
            { text: 'A sheet', is_correct: false },
            { text: 'A workbook', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'To make text bold in Excel, press:',
        options: [
            { text: 'Ctrl + B', is_correct: true },
            { text: 'Ctrl + I', is_correct: false },
            { text: 'Ctrl + U', is_correct: false },
            { text: 'Ctrl + S', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'The default file extension for Excel is:',
        options: [
            { text: '.xlsx', is_correct: true },
            { text: '.docx', is_correct: false },
            { text: '.pptx', is_correct: false },
            { text: '.txt', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'To sort data in Excel, use:',
        options: [
            { text: 'Data tab > Sort', is_correct: true },
            { text: 'Home tab > Sort', is_correct: false },
            { text: 'Insert tab > Sort', is_correct: false },
            { text: 'View tab > Sort', is_correct: false }
        ]
    },

    // Section 5: Hardware & Software (15 Questions)
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Hardware refers to:',
        options: [
            { text: 'Physical computer parts', is_correct: true },
            { text: 'Programs', is_correct: false },
            { text: 'Internet connections', is_correct: false },
            { text: 'Websites', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Which is NOT hardware?',
        options: [
            { text: 'Monitor', is_correct: false },
            { text: 'MS Word', is_correct: true },
            { text: 'Keyboard', is_correct: false },
            { text: 'CPU', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'RAM is a type of:',
        options: [
            { text: 'Memory', is_correct: true },
            { text: 'Printer', is_correct: false },
            { text: 'Software', is_correct: false },
            { text: 'Browser', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'The CPU is known as the:',
        options: [
            { text: 'Brain of the computer', is_correct: true },
            { text: 'Heart of the computer', is_correct: false },
            { text: 'Eye of the computer', is_correct: false },
            { text: 'Hand of the computer', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Which stores data permanently?',
        options: [
            { text: 'Hard disk', is_correct: true },
            { text: 'RAM', is_correct: false },
            { text: 'Cache', is_correct: false },
            { text: 'Register', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'An operating system is:',
        options: [
            { text: 'System software that manages hardware', is_correct: true },
            { text: 'Application software', is_correct: false },
            { text: 'A type of game', is_correct: false },
            { text: 'A web browser', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Which is an example of software?',
        options: [
            { text: 'Microsoft Word', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'Keyboard', is_correct: false },
            { text: 'Mouse', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'ROM stands for:',
        options: [
            { text: 'Read Only Memory', is_correct: true },
            { text: 'Random Only Memory', is_correct: false },
            { text: 'Read Open Memory', is_correct: false },
            { text: 'Real Only Memory', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'Which is volatile memory?',
        options: [
            { text: 'RAM', is_correct: true },
            { text: 'ROM', is_correct: false },
            { text: 'Hard disk', is_correct: false },
            { text: 'CD-ROM', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'A motherboard is:',
        options: [
            { text: 'Main circuit board connecting all components', is_correct: true },
            { text: 'A type of software', is_correct: false },
            { text: 'An input device', is_correct: false },
            { text: 'An output device', is_correct: false }
        ]
    },

    // Section 6: Cloud Storage (10 Questions)
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Google Drive is used for:',
        options: [
            { text: 'Storing files online', is_correct: true },
            { text: 'Playing games', is_correct: false },
            { text: 'Typing on paper', is_correct: false },
            { text: 'Drawing', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'To share a file from OneDrive, you click:',
        options: [
            { text: 'Share button', is_correct: true },
            { text: 'Delete', is_correct: false },
            { text: 'Format', is_correct: false },
            { text: 'Print', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Cloud storage means:',
        options: [
            { text: 'Storing data on internet servers', is_correct: true },
            { text: 'Storing data in the sky', is_correct: false },
            { text: 'Storing data on paper', is_correct: false },
            { text: 'Storing data in clouds', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'An advantage of cloud storage is:',
        options: [
            { text: 'Access files from anywhere', is_correct: true },
            { text: 'Faster computer speed', is_correct: false },
            { text: 'Better graphics', is_correct: false },
            { text: 'Louder sound', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Dropbox is an example of:',
        options: [
            { text: 'Cloud storage service', is_correct: true },
            { text: 'Web browser', is_correct: false },
            { text: 'Operating system', is_correct: false },
            { text: 'Programming language', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'To sync files means to:',
        options: [
            { text: 'Keep files updated across devices', is_correct: true },
            { text: 'Delete files', is_correct: false },
            { text: 'Rename files', is_correct: false },
            { text: 'Print files', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'iCloud is developed by:',
        options: [
            { text: 'Apple', is_correct: true },
            { text: 'Google', is_correct: false },
            { text: 'Microsoft', is_correct: false },
            { text: 'Amazon', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'To upload a file to cloud storage means:',
        options: [
            { text: 'Transfer file from device to cloud', is_correct: true },
            { text: 'Transfer file from cloud to device', is_correct: false },
            { text: 'Delete the file', is_correct: false },
            { text: 'Rename the file', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Which requires internet connection?',
        options: [
            { text: 'Cloud storage', is_correct: true },
            { text: 'Local hard drive', is_correct: false },
            { text: 'USB drive', is_correct: false },
            { text: 'CD-ROM', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'Collaborative editing means:',
        options: [
            { text: 'Multiple people editing same document', is_correct: true },
            { text: 'Editing alone', is_correct: false },
            { text: 'Deleting documents', is_correct: false },
            { text: 'Printing documents', is_correct: false }
        ]
    },

    // Section 7: Flowcharts (10 Questions)
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'A flowchart\'s start/end symbol is:',
        options: [
            { text: 'Rectangle', is_correct: false },
            { text: 'Oval', is_correct: true },
            { text: 'Diamond', is_correct: false },
            { text: 'Arrow', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'A diamond shape represents:',
        options: [
            { text: 'Decision', is_correct: true },
            { text: 'Input', is_correct: false },
            { text: 'Process', is_correct: false },
            { text: 'Output', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'A rectangle in a flowchart represents:',
        options: [
            { text: 'Process/Action', is_correct: true },
            { text: 'Decision', is_correct: false },
            { text: 'Start/End', is_correct: false },
            { text: 'Input/Output', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'A parallelogram represents:',
        options: [
            { text: 'Input/Output', is_correct: true },
            { text: 'Process', is_correct: false },
            { text: 'Decision', is_correct: false },
            { text: 'Start/End', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'Flowcharts help in:',
        options: [
            { text: 'Planning and understanding algorithms', is_correct: true },
            { text: 'Playing games', is_correct: false },
            { text: 'Listening to music', is_correct: false },
            { text: 'Printing documents', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Arrows in flowcharts show:',
        options: [
            { text: 'Flow direction', is_correct: true },
            { text: 'Colors', is_correct: false },
            { text: 'Sounds', is_correct: false },
            { text: 'Temperature', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'An algorithm is:',
        options: [
            { text: 'Step-by-step solution to a problem', is_correct: true },
            { text: 'A type of computer', is_correct: false },
            { text: 'A programming language', is_correct: false },
            { text: 'A web browser', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'A flowchart should flow:',
        options: [
            { text: 'From top to bottom', is_correct: true },
            { text: 'From bottom to top', is_correct: false },
            { text: 'In circles only', is_correct: false },
            { text: 'Randomly', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'A loop in a flowchart represents:',
        options: [
            { text: 'Repetition of steps', is_correct: true },
            { text: 'End of program', is_correct: false },
            { text: 'Start of program', is_correct: false },
            { text: 'Error in program', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Before writing a program, you should:',
        options: [
            { text: 'Create a flowchart', is_correct: true },
            { text: 'Buy a new computer', is_correct: false },
            { text: 'Learn to type faster', is_correct: false },
            { text: 'Install games', is_correct: false }
        ]
    },

    // Section 8: Keyboard & Mouse (5 Questions)
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'The right mouse button is used for:',
        options: [
            { text: 'Context menus', is_correct: true },
            { text: 'Typing', is_correct: false },
            { text: 'Scrolling', is_correct: false },
            { text: 'Turning off PC', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'Ctrl+Alt+Del is used to:',
        options: [
            { text: 'Open task manager', is_correct: true },
            { text: 'Take screenshots', is_correct: false },
            { text: 'Bold text', is_correct: false },
            { text: 'Close tabs', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Double-clicking means:',
        options: [
            { text: 'Clicking twice quickly', is_correct: true },
            { text: 'Clicking once slowly', is_correct: false },
            { text: 'Right-clicking', is_correct: false },
            { text: 'Scrolling', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'The scroll wheel is used to:',
        options: [
            { text: 'Move up and down on pages', is_correct: true },
            { text: 'Type letters', is_correct: false },
            { text: 'Change colors', is_correct: false },
            { text: 'Play sounds', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Drag and drop means:',
        options: [
            { text: 'Click, hold, move, and release', is_correct: true },
            { text: 'Just clicking once', is_correct: false },
            { text: 'Typing fast', is_correct: false },
            { text: 'Using keyboard only', is_correct: false }
        ]
    },

    // Section 9: Icons & Desktop (5 Questions)
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'The Recycle Bin icon represents:',
        options: [
            { text: 'Deleted files', is_correct: true },
            { text: 'Internet', is_correct: false },
            { text: 'Games', is_correct: false },
            { text: 'Settings', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'The Start Menu is used to:',
        options: [
            { text: 'Open programs', is_correct: true },
            { text: 'Charge the laptop', is_correct: false },
            { text: 'Connect to Wi-Fi', is_correct: false },
            { text: 'Edit videos', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Desktop wallpaper is:',
        options: [
            { text: 'Background image on desktop', is_correct: true },
            { text: 'A type of software', is_correct: false },
            { text: 'A hardware component', is_correct: false },
            { text: 'An internet browser', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'The taskbar shows:',
        options: [
            { text: 'Currently running programs', is_correct: true },
            { text: 'Weather information', is_correct: false },
            { text: 'Your photos', is_correct: false },
            { text: 'Music files', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'To minimize a window, click:',
        options: [
            { text: 'The minimize button (-)', is_correct: true },
            { text: 'The close button (X)', is_correct: false },
            { text: 'The maximize button', is_correct: false },
            { text: 'The start button', is_correct: false }
        ]
    },

    // Section 10: Internet Terms (5 Questions)
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'A URL is:',
        options: [
            { text: 'Website address', is_correct: true },
            { text: 'A keyboard key', is_correct: false },
            { text: 'A file type', is_correct: false },
            { text: 'A printer', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: '"WWW" stands for:',
        options: [
            { text: 'World Wide Web', is_correct: true },
            { text: 'Wireless World Web', is_correct: false },
            { text: 'Wide World Website', is_correct: false },
            { text: 'None of the above', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'ISP stands for:',
        options: [
            { text: 'Internet Service Provider', is_correct: true },
            { text: 'Internet Security Protocol', is_correct: false },
            { text: 'Internal System Program', is_correct: false },
            { text: 'International Service Provider', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'Wi-Fi is used for:',
        options: [
            { text: 'Wireless internet connection', is_correct: true },
            { text: 'Printing documents', is_correct: false },
            { text: 'Playing music', is_correct: false },
            { text: 'Taking photos', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'Bandwidth refers to:',
        options: [
            { text: 'Internet speed capacity', is_correct: true },
            { text: 'Computer memory size', is_correct: false },
            { text: 'Screen resolution', is_correct: false },
            { text: 'Hard disk space', is_correct: false }
        ]
    }
];

async function seedGrade8Complete100() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('Starting Grade 8 Complete 100 questions seeding...');

        // Insert Grade 8 complete questions
        for (const questionData of grade8CompleteQuestions) {
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

        console.log(`Successfully added ${grade8CompleteQuestions.length} Grade 8 Complete questions!`);
        console.log('Question categories:');
        console.log('- Internet & Web Browsers: 5 additional questions');
        console.log('- Cyber Safety: 5 additional questions');
        console.log('- Scratch Programming: 5 additional questions');
        console.log('- MS Excel: 10 questions');
        console.log('- Hardware & Software: 10 questions');
        console.log('- Cloud Storage: 10 questions');
        console.log('- Flowcharts: 10 questions');
        console.log('- Keyboard & Mouse: 5 questions');
        console.log('- Icons & Desktop: 5 questions');
        console.log('- Internet Terms: 5 questions');
        console.log(`Total: ${grade8CompleteQuestions.length} questions added`);

        const basicCount = grade8CompleteQuestions.filter(q => q.difficulty === 'basic').length;
        const mediumCount = grade8CompleteQuestions.filter(q => q.difficulty === 'medium').length;
        const advancedCount = grade8CompleteQuestions.filter(q => q.difficulty === 'advanced').length;
        
        console.log('Difficulty distribution:');
        console.log(`- Basic: ${basicCount} questions`);
        console.log(`- Medium: ${mediumCount} questions`);
        console.log(`- Advanced: ${advancedCount} questions`);

    } catch (error) {
        console.error('Error seeding Grade 8 Complete questions:', error);
    } finally {
        await database.close();
    }
}

// Run seeding if this file is executed directly
if (require.main === module) {
    seedGrade8Complete100();
}

module.exports = seedGrade8Complete100;