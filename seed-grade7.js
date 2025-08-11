const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'server', 'database', 'mcq_system.db');
const db = new sqlite3.Database(dbPath);

const grade7Questions = [
    // Operating systems & file management - Basic (35 questions)
    {
        grade: 7, difficulty: 'basic',
        question: 'What is an operating system?',
        options: ['A computer game', 'Software that manages computer resources', 'A type of hardware', 'An internet browser'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'Which is an example of an operating system?',
        options: ['Microsoft Word', 'Windows 10', 'Google Chrome', 'Adobe Photoshop'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What is file management?',
        options: ['Playing games', 'Organizing and controlling files', 'Browsing internet', 'Typing documents'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What is a folder?',
        options: ['A type of file', 'Container for organizing files', 'A computer program', 'A hardware device'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'How do you create a new folder in Windows?',
        options: ['Right-click and select New Folder', 'Press Ctrl+F', 'Double-click desktop', 'Press Alt+Tab'],
        correct: 0
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What does Ctrl+C do in file management?',
        options: ['Create folder', 'Copy file', 'Cut file', 'Close file'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What does Ctrl+X do in file management?',
        options: ['Copy file', 'Cut file', 'Delete file', 'Rename file'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What does Ctrl+V do in file management?',
        options: ['Copy file', 'Cut file', 'Paste file', 'View file'],
        correct: 2
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What is the Recycle Bin?',
        options: ['A folder for important files', 'Temporary storage for deleted files', 'A system folder', 'A backup folder'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'How do you permanently delete a file?',
        options: ['Delete key', 'Shift+Delete', 'Ctrl+Delete', 'Alt+Delete'],
        correct: 1
    },

    // File extensions and formats - Medium (30 questions)
    {
        grade: 7, difficulty: 'medium',
        question: 'What is a file extension?',
        options: ['File size', 'Characters after the dot in filename', 'File location', 'File creation date'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What type of file is .docx?',
        options: ['Image file', 'Word document', 'Music file', 'Video file'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What type of file is .jpg?',
        options: ['Document file', 'Image file', 'Audio file', 'Video file'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What type of file is .mp3?',
        options: ['Image file', 'Document file', 'Audio file', 'Video file'],
        correct: 2
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What type of file is .exe?',
        options: ['Document file', 'Image file', 'Executable program', 'Audio file'],
        correct: 2
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'Which extension is for Excel files?',
        options: ['.docx', '.xlsx', '.pptx', '.txt'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'Which extension is for PowerPoint files?',
        options: ['.docx', '.xlsx', '.pptx', '.pdf'],
        correct: 2
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What type of file is .pdf?',
        options: ['Editable document', 'Portable document format', 'Image file', 'Audio file'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'Which extension is for video files?',
        options: ['.jpg', '.mp3', '.mp4', '.txt'],
        correct: 2
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What does .zip extension indicate?',
        options: ['Image file', 'Compressed archive', 'Text file', 'Audio file'],
        correct: 1
    },

    // Email fundamentals and web browsers - Basic (25 questions)
    {
        grade: 7, difficulty: 'basic',
        question: 'What is email?',
        options: ['Electronic mail', 'Emergency mail', 'Express mail', 'Expensive mail'],
        correct: 0
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What symbol is required in every email address?',
        options: ['#', '@', '$', '%'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'Which is an example of an email provider?',
        options: ['Microsoft Word', 'Gmail', 'Windows', 'Adobe'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What is a web browser?',
        options: ['Software to browse files', 'Software to access internet', 'Software to edit documents', 'Software to play games'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'Which is an example of a web browser?',
        options: ['Microsoft Word', 'Google Chrome', 'Adobe Photoshop', 'Windows Media Player'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What does CC mean in email?',
        options: ['Copy Cat', 'Carbon Copy', 'Computer Copy', 'Complete Copy'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What does BCC mean in email?',
        options: ['Big Carbon Copy', 'Blind Carbon Copy', 'Best Carbon Copy', 'Basic Carbon Copy'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What is the subject line in email?',
        options: ['Sender name', 'Brief description of email content', 'Receiver name', 'Email address'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What is an email attachment?',
        options: ['Email address', 'File sent with email', 'Email subject', 'Email signature'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What is spam email?',
        options: ['Important email', 'Unwanted email', 'Personal email', 'Work email'],
        correct: 1
    },

    // Advanced Office tools features - Medium (35 questions)
    {
        grade: 7, difficulty: 'medium',
        question: 'What is collaboration in Office tools?',
        options: ['Working alone', 'Working together on documents', 'Deleting documents', 'Printing documents'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What is a template in Office applications?',
        options: ['A blank document', 'Pre-designed document format', 'A saved document', 'A deleted document'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'How can multiple people edit the same document?',
        options: ['Take turns using same computer', 'Share document online', 'Print and edit manually', 'Email back and forth'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What is track changes in Word?',
        options: ['Counting words', 'Recording edits made to document', 'Changing fonts', 'Adding pictures'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What is a comment in Office documents?',
        options: ['A note attached to text', 'A type of font', 'A page break', 'A table'],
        correct: 0
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What is version history?',
        options: ['Document size', 'Record of document changes over time', 'Number of pages', 'Font styles used'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What is real-time collaboration?',
        options: ['Working at specific times', 'Multiple people editing simultaneously', 'Working very fast', 'Working alone'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What is a shared folder?',
        options: ['Personal folder', 'Folder accessible by multiple users', 'Deleted folder', 'System folder'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What is OneDrive?',
        options: ['A car', 'Microsoft cloud storage service', 'A computer drive', 'A software program'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What is the benefit of using templates?',
        options: ['Saves time and ensures consistency', 'Makes documents longer', 'Increases file size', 'Makes editing harder'],
        correct: 0
    },

    // Introduction to Python programming - Medium (40 questions)
    {
        grade: 7, difficulty: 'medium',
        question: 'What is a variable in Python?',
        options: ['A fixed value', 'A container for storing data', 'A type of loop', 'A function'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'Which is a valid variable name in Python?',
        options: ['2name', 'my-name', 'my_name', 'my name'],
        correct: 2
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What are data types in Python?',
        options: ['Different kinds of data', 'Different computers', 'Different programs', 'Different keyboards'],
        correct: 0
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'Which is a numeric data type in Python?',
        options: ['string', 'int', 'boolean', 'list'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What data type is "Hello"?',
        options: ['int', 'float', 'string', 'boolean'],
        correct: 2
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What data type is 25?',
        options: ['string', 'int', 'float', 'boolean'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What data type is 3.14?',
        options: ['int', 'float', 'string', 'boolean'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What does the + operator do with numbers?',
        options: ['Subtracts', 'Adds', 'Multiplies', 'Divides'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What does the * operator do in Python?',
        options: ['Adds', 'Subtracts', 'Multiplies', 'Divides'],
        correct: 2
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What does the / operator do in Python?',
        options: ['Adds', 'Subtracts', 'Multiplies', 'Divides'],
        correct: 3
    },

    // HTML tags & structure - Medium (35 questions)
    {
        grade: 7, difficulty: 'medium',
        question: 'Which tag is used to insert images?',
        options: ['<image>', '<img>', '<picture>', '<photo>'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'Which attribute specifies the image source?',
        options: ['href', 'src', 'link', 'url'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'Which tag creates an unordered list?',
        options: ['<ol>', '<ul>', '<list>', '<li>'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'Which tag creates an ordered list?',
        options: ['<ul>', '<ol>', '<list>', '<order>'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'Which tag is used for list items?',
        options: ['<item>', '<li>', '<list>', '<point>'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What is a block element?',
        options: ['Element that takes full width', 'Element that takes minimal width', 'Element that is invisible', 'Element that is colored'],
        correct: 0
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What is an inline element?',
        options: ['Element that takes full width', 'Element that takes only necessary width', 'Element that is invisible', 'Element that is large'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'Which is a block element?',
        options: ['<span>', '<a>', '<p>', '<strong>'],
        correct: 2
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'Which is an inline element?',
        options: ['<div>', '<p>', '<h1>', '<span>'],
        correct: 3
    },
    {
        grade: 7, difficulty: 'medium',
        question: 'What does <br> tag do?',
        options: ['Creates bold text', 'Creates line break', 'Creates border', 'Creates button'],
        correct: 1
    },

    // CSS styling fundamentals - Advanced (30 questions)
    {
        grade: 7, difficulty: 'advanced',
        question: 'What does CSS stand for?',
        options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'What is inline CSS?',
        options: ['CSS in separate file', 'CSS in <head> section', 'CSS within HTML tags', 'CSS in footer'],
        correct: 2
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'How do you apply inline CSS?',
        options: ['Using class attribute', 'Using id attribute', 'Using style attribute', 'Using css attribute'],
        correct: 2
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'Which CSS property changes text color?',
        options: ['background-color', 'color', 'text-color', 'font-color'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'Which CSS property changes background color?',
        options: ['color', 'background-color', 'bg-color', 'back-color'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'Which CSS property changes font size?',
        options: ['text-size', 'font-size', 'size', 'text-font'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'Which CSS property changes font family?',
        options: ['font-family', 'text-family', 'font-type', 'text-type'],
        correct: 0
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'How do you make text bold with CSS?',
        options: ['font-weight: bold', 'text-weight: bold', 'font-style: bold', 'text-style: bold'],
        correct: 0
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'How do you make text italic with CSS?',
        options: ['font-weight: italic', 'font-style: italic', 'text-style: italic', 'text-weight: italic'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'What is the correct CSS syntax?',
        options: ['property: value;', 'property = value;', 'property -> value;', 'property :: value;'],
        correct: 0
    },

    // Simple HTML forms - Advanced (25 questions)
    {
        grade: 7, difficulty: 'advanced',
        question: 'Which tag is used to create forms?',
        options: ['<form>', '<input>', '<field>', '<data>'],
        correct: 0
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'Which tag creates a text input field?',
        options: ['<text>', '<input type="text">', '<field>', '<textbox>'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'Which tag creates a submit button?',
        options: ['<button>', '<input type="submit">', '<submit>', 'Both A and B'],
        correct: 3
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'What attribute specifies where form data is sent?',
        options: ['method', 'action', 'target', 'send'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'Which input type creates a password field?',
        options: ['type="text"', 'type="password"', 'type="hidden"', 'type="secret"'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'Which input type creates checkboxes?',
        options: ['type="check"', 'type="checkbox"', 'type="tick"', 'type="select"'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'Which input type creates radio buttons?',
        options: ['type="radio"', 'type="option"', 'type="choice"', 'type="select"'],
        correct: 0
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'What is the purpose of the name attribute in form elements?',
        options: ['Display name', 'Identify form data', 'Style element', 'Set default value'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'Which tag creates a dropdown list?',
        options: ['<dropdown>', '<select>', '<list>', '<options>'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'Which tag is used for multi-line text input?',
        options: ['<input type="text">', '<textarea>', '<textbox>', '<multitext>'],
        correct: 1
    },

    // Networking concepts - Advanced (20 questions)
    {
        grade: 7, difficulty: 'advanced',
        question: 'What is an IP address?',
        options: ['Internet Protocol address', 'Internal Program address', 'Internet Program address', 'Internal Protocol address'],
        correct: 0
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'What is a MAC address?',
        options: ['Apple computer address', 'Media Access Control address', 'Machine Access Code', 'Main Access Control'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'What is the difference between IP and MAC address?',
        options: ['No difference', 'IP is logical, MAC is physical', 'IP is physical, MAC is logical', 'Both are same'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'What is a network topology?',
        options: ['Network speed', 'Physical arrangement of network', 'Network security', 'Network cost'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'Which is a network topology?',
        options: ['Star', 'Circle', 'Square', 'Triangle'],
        correct: 0
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'In star topology, all devices connect to?',
        options: ['Each other', 'Central hub', 'Internet', 'Router only'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'What is bus topology?',
        options: ['Devices in a circle', 'All devices on single cable', 'Devices in star pattern', 'Random connections'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'What is ring topology?',
        options: ['Devices in a line', 'Devices in a circle', 'Devices in star pattern', 'Random connections'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'Which topology is most common in homes?',
        options: ['Bus', 'Ring', 'Star', 'Mesh'],
        correct: 2
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'What happens if central hub fails in star topology?',
        options: ['Nothing', 'Entire network fails', 'Only one device fails', 'Network becomes faster'],
        correct: 1
    },

    // Cloud computing services overview - Advanced (15 questions)
    {
        grade: 7, difficulty: 'advanced',
        question: 'What does IaaS stand for?',
        options: ['Internet as a Service', 'Infrastructure as a Service', 'Information as a Service', 'Integration as a Service'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'What does PaaS stand for?',
        options: ['Platform as a Service', 'Program as a Service', 'Process as a Service', 'Product as a Service'],
        correct: 0
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'What does SaaS stand for?',
        options: ['System as a Service', 'Software as a Service', 'Storage as a Service', 'Security as a Service'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'Which is an example of SaaS?',
        options: ['Amazon EC2', 'Google App Engine', 'Gmail', 'Windows Azure'],
        correct: 2
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'Which service model provides virtual machines?',
        options: ['SaaS', 'PaaS', 'IaaS', 'DaaS'],
        correct: 2
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'Which service model provides development platforms?',
        options: ['SaaS', 'PaaS', 'IaaS', 'DaaS'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'Which service model provides ready-to-use applications?',
        options: ['SaaS', 'PaaS', 'IaaS', 'DaaS'],
        correct: 0
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'What is the main benefit of cloud services?',
        options: ['Faster computers', 'Access from anywhere', 'Cheaper hardware', 'Better graphics'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'Which company provides AWS?',
        options: ['Google', 'Microsoft', 'Amazon', 'Apple'],
        correct: 2
    },
    {
        grade: 7, difficulty: 'advanced',
        question: 'What is scalability in cloud computing?',
        options: ['Making things smaller', 'Adjusting resources as needed', 'Making things faster', 'Making things cheaper'],
        correct: 1
    },

    // Cyber safety practices - Basic (20 questions)
    {
        grade: 7, difficulty: 'basic',
        question: 'What makes a password strong?',
        options: ['Short and simple', 'Long with mix of characters', 'Only numbers', 'Only letters'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'How long should a strong password be?',
        options: ['4 characters', '6 characters', '8 or more characters', '2 characters'],
        correct: 2
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'Should you share your password with friends?',
        options: ['Yes, always', 'No, never', 'Sometimes', 'Only best friends'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What should you do if you receive a suspicious email?',
        options: ['Open all attachments', 'Reply immediately', 'Delete without opening', 'Forward to everyone'],
        correct: 2
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What is two-factor authentication?',
        options: ['Using two passwords', 'Extra security step', 'Two computers', 'Two users'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'Should you click on links from unknown senders?',
        options: ['Yes, always', 'No, never', 'Sometimes', 'Only if curious'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What is a secure website indicator?',
        options: ['http://', 'https://', 'ftp://', 'www.'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'How often should you update your passwords?',
        options: ['Never', 'Every few years', 'Regularly', 'Only when hacked'],
        correct: 2
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What should you do on public Wi-Fi?',
        options: ['Access all accounts', 'Avoid sensitive activities', 'Share passwords', 'Download everything'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What is the purpose of antivirus software?',
        options: ['Speed up computer', 'Protect from malware', 'Increase storage', 'Improve graphics'],
        correct: 1
    },

    // Computational thinking - Basic (15 questions)
    {
        grade: 7, difficulty: 'basic',
        question: 'What is problem decomposition?',
        options: ['Making problems bigger', 'Breaking problems into smaller parts', 'Ignoring problems', 'Solving all at once'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What is stepwise refinement?',
        options: ['Making steps bigger', 'Breaking steps into smaller steps', 'Removing steps', 'Adding random steps'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'Why is decomposition useful?',
        options: ['Makes problems harder', 'Makes problems easier to solve', 'Makes problems longer', 'Makes problems confusing'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What is the first step in problem solving?',
        options: ['Start coding', 'Understand the problem', 'Test solution', 'Celebrate'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What comes after understanding the problem?',
        options: ['Give up', 'Plan the solution', 'Test immediately', 'Ask for help'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What is an example of decomposition?',
        options: ['Solving entire math problem at once', 'Breaking recipe into steps', 'Memorizing everything', 'Guessing answers'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What is pattern recognition in problem solving?',
        options: ['Drawing patterns', 'Finding similarities in problems', 'Creating designs', 'Making patterns'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'Why is planning important in problem solving?',
        options: ['Wastes time', 'Provides clear direction', 'Makes things harder', 'Confuses everyone'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What should you do after implementing a solution?',
        options: ['Forget about it', 'Test and evaluate', 'Start new problem', 'Celebrate only'],
        correct: 1
    },
    {
        grade: 7, difficulty: 'basic',
        question: 'What is abstraction in problem solving?',
        options: ['Adding more details', 'Focusing on essential features', 'Making things complex', 'Hiding everything'],
        correct: 1
    }
];

console.log('🌱 Seeding Grade 7 questions...');

db.serialize(() => {
    const insertQuestion = db.prepare('INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)');
    const insertOption = db.prepare('INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)');
    
    grade7Questions.forEach((q, index) => {
        insertQuestion.run(q.grade, q.difficulty, q.question, function(err) {
            if (err) {
                console.error(`Error inserting question ${index + 1}:`, err);
                return;
            }
            
            const questionId = this.lastID;
            q.options.forEach((option, optIndex) => {
                insertOption.run(questionId, option, optIndex === q.correct ? 1 : 0, optIndex + 1);
            });
        });
    });
    
    insertQuestion.finalize();
    insertOption.finalize();
    
    console.log(`✅ Grade 7: ${grade7Questions.length} questions seeded`);
    db.close();
});