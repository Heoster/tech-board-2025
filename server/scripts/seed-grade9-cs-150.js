require('dotenv').config();
const database = require('../config/database');

const grade9CSQuestions = [
    // Section 1: HTML Basics (15 Questions)
    {
        grade: 9,
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
        grade: 9,
        difficulty: 'basic',
        question_text: 'Which tag creates a webpage title?',
        options: [
            { text: '<head>', is_correct: false },
            { text: '<title>', is_correct: true },
            { text: '<body>', is_correct: false },
            { text: '<header>', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Write the HTML code to create a hyperlink to "www.example.com":',
        options: [
            { text: '<link url="www.example.com">', is_correct: false },
            { text: '<a href="www.example.com">Click</a>', is_correct: true },
            { text: '<a link="www.example.com">', is_correct: false },
            { text: '<hyperlink>www.example.com</hyperlink>', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Which tag creates a paragraph?',
        options: [
            { text: '<p>', is_correct: true },
            { text: '<para>', is_correct: false },
            { text: '<paragraph>', is_correct: false },
            { text: '<text>', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'The <img> tag is used to:',
        options: [
            { text: 'Insert images', is_correct: true },
            { text: 'Make text italic', is_correct: false },
            { text: 'Create hyperlinks', is_correct: false },
            { text: 'Play videos', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Which tag creates an unordered list?',
        options: [
            { text: '<ul>', is_correct: true },
            { text: '<ol>', is_correct: false },
            { text: '<li>', is_correct: false },
            { text: '<list>', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Which tag creates an ordered list?',
        options: [
            { text: '<ul>', is_correct: false },
            { text: '<ol>', is_correct: true },
            { text: '<li>', is_correct: false },
            { text: '<order>', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'The <br> tag is used for:',
        options: [
            { text: 'Line break', is_correct: true },
            { text: 'Bold text', is_correct: false },
            { text: 'Border', is_correct: false },
            { text: 'Background', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which attribute is required for the <img> tag?',
        options: [
            { text: 'alt', is_correct: false },
            { text: 'src', is_correct: true },
            { text: 'width', is_correct: false },
            { text: 'height', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'The largest heading tag is:',
        options: [
            { text: '<h1>', is_correct: true },
            { text: '<h6>', is_correct: false },
            { text: '<head>', is_correct: false },
            { text: '<header>', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'The <body> tag contains:',
        options: [
            { text: 'Visible content of the webpage', is_correct: true },
            { text: 'Meta information', is_correct: false },
            { text: 'CSS styles', is_correct: false },
            { text: 'JavaScript code', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which tag makes text bold?',
        options: [
            { text: '<b>', is_correct: true },
            { text: '<i>', is_correct: false },
            { text: '<u>', is_correct: false },
            { text: '<s>', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which tag makes text italic?',
        options: [
            { text: '<b>', is_correct: false },
            { text: '<i>', is_correct: true },
            { text: '<u>', is_correct: false },
            { text: '<s>', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'HTML documents must start with:',
        options: [
            { text: '<!DOCTYPE html>', is_correct: true },
            { text: '<html>', is_correct: false },
            { text: '<head>', is_correct: false },
            { text: '<body>', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which attribute specifies the URL in an <a> tag?',
        options: [
            { text: 'href', is_correct: true },
            { text: 'src', is_correct: false },
            { text: 'link', is_correct: false },
            { text: 'url', is_correct: false }
        ]
    },

    // Section 2: Number Systems (10 Questions)
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Binary 1010 equals decimal:',
        options: [
            { text: '8', is_correct: false },
            { text: '10', is_correct: true },
            { text: '12', is_correct: false },
            { text: '15', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Convert decimal 7 to binary:',
        options: [
            { text: '100', is_correct: false },
            { text: '111', is_correct: true },
            { text: '101', is_correct: false },
            { text: '110', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'How many digits are in the binary system?',
        options: [
            { text: '8', is_correct: false },
            { text: '2', is_correct: true },
            { text: '10', is_correct: false },
            { text: '16', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'How many bits make one byte?',
        options: [
            { text: '8', is_correct: true },
            { text: '4', is_correct: false },
            { text: '16', is_correct: false },
            { text: '32', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'The decimal equivalent of binary 1100 is:',
        options: [
            { text: '10', is_correct: false },
            { text: '12', is_correct: true },
            { text: '14', is_correct: false },
            { text: '16', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'The decimal system uses base:',
        options: [
            { text: '10', is_correct: true },
            { text: '8', is_correct: false },
            { text: '16', is_correct: false },
            { text: '2', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'The hexadecimal system uses base:',
        options: [
            { text: '16', is_correct: true },
            { text: '8', is_correct: false },
            { text: '10', is_correct: false },
            { text: '2', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'The hexadecimal equivalent of decimal 10 is:',
        options: [
            { text: 'A', is_correct: true },
            { text: 'B', is_correct: false },
            { text: '10', is_correct: false },
            { text: 'C', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Binary 101 equals decimal:',
        options: [
            { text: '3', is_correct: false },
            { text: '5', is_correct: true },
            { text: '7', is_correct: false },
            { text: '9', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'To convert binary to decimal, we use powers of:',
        options: [
            { text: '2', is_correct: true },
            { text: '10', is_correct: false },
            { text: '8', is_correct: false },
            { text: '16', is_correct: false }
        ]
    },

    // Section 3: OS Functions (10 Questions)
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'An OS manages:',
        options: [
            { text: 'Hardware and software', is_correct: true },
            { text: 'Only printers', is_correct: false },
            { text: 'Internet speed', is_correct: false },
            { text: 'Keyboard colors', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which tool checks running programs?',
        options: [
            { text: 'File Explorer', is_correct: false },
            { text: 'Task Manager', is_correct: true },
            { text: 'Control Panel', is_correct: false },
            { text: 'Command Prompt', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Which is NOT an OS?',
        options: [
            { text: 'Windows', is_correct: false },
            { text: 'MS Word', is_correct: true },
            { text: 'Linux', is_correct: false },
            { text: 'macOS', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'GUI stands for:',
        options: [
            { text: 'Graphical User Interface', is_correct: true },
            { text: 'General User Interface', is_correct: false },
            { text: 'Global User Interface', is_correct: false },
            { text: 'Graphic Utility Interface', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'The OS function that allows multiple programs to run simultaneously is:',
        options: [
            { text: 'Multitasking', is_correct: true },
            { text: 'File management', is_correct: false },
            { text: 'Memory allocation', is_correct: false },
            { text: 'Device management', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Which OS is open source?',
        options: [
            { text: 'Linux', is_correct: true },
            { text: 'Windows', is_correct: false },
            { text: 'macOS', is_correct: false },
            { text: 'iOS', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'File extensions help identify:',
        options: [
            { text: 'File type', is_correct: true },
            { text: 'File size', is_correct: false },
            { text: 'File location', is_correct: false },
            { text: 'File owner', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Device drivers are used to:',
        options: [
            { text: 'Control hardware devices', is_correct: true },
            { text: 'Run applications', is_correct: false },
            { text: 'Manage files', is_correct: false },
            { text: 'Connect to internet', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'CLI stands for:',
        options: [
            { text: 'Command Line Interface', is_correct: true },
            { text: 'Computer Language Interface', is_correct: false },
            { text: 'Central Logic Interface', is_correct: false },
            { text: 'Control Line Interface', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'The desktop is part of:',
        options: [
            { text: 'Operating System', is_correct: true },
            { text: 'Hardware', is_correct: false },
            { text: 'Internet browser', is_correct: false },
            { text: 'Application software', is_correct: false }
        ],
    },

    // Section 4: Networking (15 Questions)
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'LAN covers:',
        options: [
            { text: 'A city', is_correct: false },
            { text: 'A school/office', is_correct: true },
            { text: 'A country', is_correct: false },
            { text: 'The world', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which device connects computers in a LAN?',
        options: [
            { text: 'Switch', is_correct: true },
            { text: 'Printer', is_correct: false },
            { text: 'Speaker', is_correct: false },
            { text: 'Scanner', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'LAN stands for:',
        options: [
            { text: 'Local Area Network', is_correct: true },
            { text: 'Large Access Node', is_correct: false },
            { text: 'Linked Area Network', is_correct: false },
            { text: 'Longitudinal Analog Net', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'WAN stands for:',
        options: [
            { text: 'Wide Area Network', is_correct: true },
            { text: 'Wireless Access Node', is_correct: false },
            { text: 'Web Area Network', is_correct: false },
            { text: 'World Access Network', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which protocol is used for web browsing?',
        options: [
            { text: 'HTTP', is_correct: true },
            { text: 'FTP', is_correct: false },
            { text: 'SMTP', is_correct: false },
            { text: 'POP3', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'An IP address identifies:',
        options: [
            { text: 'A device on a network', is_correct: true },
            { text: 'A software program', is_correct: false },
            { text: 'A file type', is_correct: false },
            { text: 'A keyboard key', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which device routes data between networks?',
        options: [
            { text: 'Router', is_correct: true },
            { text: 'Switch', is_correct: false },
            { text: 'Hub', is_correct: false },
            { text: 'Modem', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'WiFi is a type of:',
        options: [
            { text: 'Wireless network', is_correct: true },
            { text: 'Cable connection', is_correct: false },
            { text: 'Software', is_correct: false },
            { text: 'Hardware component', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which topology connects all devices to a central hub?',
        options: [
            { text: 'Star', is_correct: true },
            { text: 'Ring', is_correct: false },
            { text: 'Bus', is_correct: false },
            { text: 'Mesh', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Ethernet is used for:',
        options: [
            { text: 'Wired network connections', is_correct: true },
            { text: 'Wireless connections', is_correct: false },
            { text: 'Internet browsing only', is_correct: false },
            { text: 'Email only', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'A firewall is used for:',
        options: [
            { text: 'Network security', is_correct: true },
            { text: 'File storage', is_correct: false },
            { text: 'Data backup', is_correct: false },
            { text: 'Internet speed', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'DNS stands for:',
        options: [
            { text: 'Domain Name System', is_correct: true },
            { text: 'Data Network Service', is_correct: false },
            { text: 'Digital Name Server', is_correct: false },
            { text: 'Dynamic Network System', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which port is commonly used for HTTP?',
        options: [
            { text: '80', is_correct: true },
            { text: '21', is_correct: false },
            { text: '25', is_correct: false },
            { text: '110', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'HTTPS is more secure than HTTP because it uses:',
        options: [
            { text: 'Encryption', is_correct: true },
            { text: 'Faster speed', is_correct: false },
            { text: 'Better graphics', is_correct: false },
            { text: 'More memory', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Bandwidth refers to:',
        options: [
            { text: 'Data transfer capacity', is_correct: true },
            { text: 'Network size', is_correct: false },
            { text: 'Number of devices', is_correct: false },
            { text: 'Cable length', is_correct: false }
        ]
    },

    // Section 5: Programming Concepts (25 Questions)
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'An algorithm is:',
        options: [
            { text: 'A step-by-step solution', is_correct: true },
            { text: 'A type of computer', is_correct: false },
            { text: 'A programming language', is_correct: false },
            { text: 'A software application', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'A variable in programming is used to:',
        options: [
            { text: 'Store data', is_correct: true },
            { text: 'Display output', is_correct: false },
            { text: 'Connect to internet', is_correct: false },
            { text: 'Print documents', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'A loop in programming is used to:',
        options: [
            { text: 'Repeat instructions', is_correct: true },
            { text: 'Store data', is_correct: false },
            { text: 'Make decisions', is_correct: false },
            { text: 'End the program', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which symbol is used for assignment in most programming languages?',
        options: [
            { text: '=', is_correct: true },
            { text: '==', is_correct: false },
            { text: '!=', is_correct: false },
            { text: '<>', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'An if-else statement is used for:',
        options: [
            { text: 'Making decisions', is_correct: true },
            { text: 'Repeating code', is_correct: false },
            { text: 'Storing data', is_correct: false },
            { text: 'Printing output', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'A function in programming is:',
        options: [
            { text: 'A reusable block of code', is_correct: true },
            { text: 'A type of variable', is_correct: false },
            { text: 'A loop structure', is_correct: false },
            { text: 'An error message', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which data type stores whole numbers?',
        options: [
            { text: 'Integer', is_correct: true },
            { text: 'String', is_correct: false },
            { text: 'Boolean', is_correct: false },
            { text: 'Character', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'A string data type stores:',
        options: [
            { text: 'Text', is_correct: true },
            { text: 'Numbers only', is_correct: false },
            { text: 'True/False values', is_correct: false },
            { text: 'Images', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'A boolean data type can store:',
        options: [
            { text: 'True or False', is_correct: true },
            { text: 'Any number', is_correct: false },
            { text: 'Any text', is_correct: false },
            { text: 'Images only', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is debugging?',
        options: [
            { text: 'Finding and fixing errors', is_correct: true },
            { text: 'Writing new code', is_correct: false },
            { text: 'Running the program', is_correct: false },
            { text: 'Saving the file', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Pseudocode is:',
        options: [
            { text: 'Algorithm written in plain language', is_correct: true },
            { text: 'A programming language', is_correct: false },
            { text: 'A type of error', is_correct: false },
            { text: 'A software tool', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which loop runs at least once?',
        options: [
            { text: 'do-while', is_correct: true },
            { text: 'while', is_correct: false },
            { text: 'for', is_correct: false },
            { text: 'if', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'An array is used to store:',
        options: [
            { text: 'Multiple values of same type', is_correct: true },
            { text: 'Only one value', is_correct: false },
            { text: 'Program instructions', is_correct: false },
            { text: 'Error messages', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What does IDE stand for?',
        options: [
            { text: 'Integrated Development Environment', is_correct: true },
            { text: 'Internet Development Environment', is_correct: false },
            { text: 'Internal Data Environment', is_correct: false },
            { text: 'Interactive Design Environment', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Comments in code are used to:',
        options: [
            { text: 'Explain the code', is_correct: true },
            { text: 'Execute instructions', is_correct: false },
            { text: 'Store data', is_correct: false },
            { text: 'Create loops', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which operator is used for comparison?',
        options: [
            { text: '==', is_correct: true },
            { text: '=', is_correct: false },
            { text: '+=', is_correct: false },
            { text: '++', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Syntax refers to:',
        options: [
            { text: 'Rules of a programming language', is_correct: true },
            { text: 'Program output', is_correct: false },
            { text: 'Variable names', is_correct: false },
            { text: 'Computer hardware', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is compilation?',
        options: [
            { text: 'Converting source code to machine code', is_correct: true },
            { text: 'Running the program', is_correct: false },
            { text: 'Writing the code', is_correct: false },
            { text: 'Testing the program', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'A flowchart is used to:',
        options: [
            { text: 'Visualize algorithm steps', is_correct: true },
            { text: 'Store data', is_correct: false },
            { text: 'Execute programs', is_correct: false },
            { text: 'Connect to internet', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which symbol represents decision in a flowchart?',
        options: [
            { text: 'Diamond', is_correct: true },
            { text: 'Rectangle', is_correct: false },
            { text: 'Circle', is_correct: false },
            { text: 'Triangle', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Input in programming refers to:',
        options: [
            { text: 'Data entered by user', is_correct: true },
            { text: 'Program output', is_correct: false },
            { text: 'Error messages', is_correct: false },
            { text: 'Code comments', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Output in programming refers to:',
        options: [
            { text: 'Results displayed to user', is_correct: true },
            { text: 'Data entered by user', is_correct: false },
            { text: 'Program errors', is_correct: false },
            { text: 'Source code', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is recursion?',
        options: [
            { text: 'Function calling itself', is_correct: true },
            { text: 'Repeating a loop', is_correct: false },
            { text: 'Creating variables', is_correct: false },
            { text: 'Handling errors', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'Which sorting algorithm has O(n²) time complexity?',
        options: [
            { text: 'Bubble Sort', is_correct: true },
            { text: 'Merge Sort', is_correct: false },
            { text: 'Quick Sort (average)', is_correct: false },
            { text: 'Heap Sort', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is an object in programming?',
        options: [
            { text: 'Instance of a class', is_correct: true },
            { text: 'A type of loop', is_correct: false },
            { text: 'A variable type', is_correct: false },
            { text: 'An error type', is_correct: false }
        ]
    },

    // Section 6: Database Concepts (15 Questions)
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'A database is used to:',
        options: [
            { text: 'Store and organize data', is_correct: true },
            { text: 'Browse the internet', is_correct: false },
            { text: 'Play games', is_correct: false },
            { text: 'Edit images', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'A table in a database consists of:',
        options: [
            { text: 'Rows and columns', is_correct: true },
            { text: 'Only rows', is_correct: false },
            { text: 'Only columns', is_correct: false },
            { text: 'Files and folders', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'A record in a database is:',
        options: [
            { text: 'A row of data', is_correct: true },
            { text: 'A column of data', is_correct: false },
            { text: 'The entire table', is_correct: false },
            { text: 'A database name', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'A field in a database is:',
        options: [
            { text: 'A column of data', is_correct: true },
            { text: 'A row of data', is_correct: false },
            { text: 'The entire table', is_correct: false },
            { text: 'A database name', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'SQL stands for:',
        options: [
            { text: 'Structured Query Language', is_correct: true },
            { text: 'Simple Query Language', is_correct: false },
            { text: 'Standard Query Language', is_correct: false },
            { text: 'System Query Language', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Which SQL command is used to retrieve data?',
        options: [
            { text: 'SELECT', is_correct: true },
            { text: 'INSERT', is_correct: false },
            { text: 'UPDATE', is_correct: false },
            { text: 'DELETE', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Which SQL command is used to add new data?',
        options: [
            { text: 'INSERT', is_correct: true },
            { text: 'SELECT', is_correct: false },
            { text: 'UPDATE', is_correct: false },
            { text: 'DELETE', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'A primary key in a database:',
        options: [
            { text: 'Uniquely identifies each record', is_correct: true },
            { text: 'Can have duplicate values', is_correct: false },
            { text: 'Is optional', is_correct: false },
            { text: 'Can be null', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'A foreign key is used to:',
        options: [
            { text: 'Link tables together', is_correct: true },
            { text: 'Delete records', is_correct: false },
            { text: 'Sort data', is_correct: false },
            { text: 'Backup data', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'DBMS stands for:',
        options: [
            { text: 'Database Management System', is_correct: true },
            { text: 'Data Backup Management System', is_correct: false },
            { text: 'Digital Business Management System', is_correct: false },
            { text: 'Database Monitoring System', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which is an example of a DBMS?',
        options: [
            { text: 'MySQL', is_correct: true },
            { text: 'Microsoft Word', is_correct: false },
            { text: 'Adobe Photoshop', is_correct: false },
            { text: 'Google Chrome', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Data redundancy means:',
        options: [
            { text: 'Duplicate data', is_correct: true },
            { text: 'Missing data', is_correct: false },
            { text: 'Correct data', is_correct: false },
            { text: 'Sorted data', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Normalization in databases is used to:',
        options: [
            { text: 'Reduce data redundancy', is_correct: true },
            { text: 'Increase data size', is_correct: false },
            { text: 'Delete all data', is_correct: false },
            { text: 'Backup data', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'A query in a database is used to:',
        options: [
            { text: 'Search for specific data', is_correct: true },
            { text: 'Delete the database', is_correct: false },
            { text: 'Create new tables', is_correct: false },
            { text: 'Backup data', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which SQL clause is used to filter results?',
        options: [
            { text: 'WHERE', is_correct: true },
            { text: 'SELECT', is_correct: false },
            { text: 'FROM', is_correct: false },
            { text: 'ORDER BY', is_correct: false }
        ]
    },

    // Section 7: Web Technologies (20 Questions)
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'CSS is used for:',
        options: [
            { text: 'Styling web pages', is_correct: true },
            { text: 'Creating databases', is_correct: false },
            { text: 'Programming logic', is_correct: false },
            { text: 'Network security', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'JavaScript is used for:',
        options: [
            { text: 'Adding interactivity to web pages', is_correct: true },
            { text: 'Styling web pages', is_correct: false },
            { text: 'Creating databases', is_correct: false },
            { text: 'Network configuration', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which CSS property changes text color?',
        options: [
            { text: 'color', is_correct: true },
            { text: 'background-color', is_correct: false },
            { text: 'font-size', is_correct: false },
            { text: 'margin', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which CSS property changes background color?',
        options: [
            { text: 'background-color', is_correct: true },
            { text: 'color', is_correct: false },
            { text: 'font-color', is_correct: false },
            { text: 'text-color', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Which tag is used to include CSS in HTML?',
        options: [
            { text: '<style>', is_correct: true },
            { text: '<css>', is_correct: false },
            { text: '<script>', is_correct: false },
            { text: '<link>', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Which tag is used to include JavaScript in HTML?',
        options: [
            { text: '<script>', is_correct: true },
            { text: '<javascript>', is_correct: false },
            { text: '<js>', is_correct: false },
            { text: '<code>', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which HTML attribute is used to apply CSS classes?',
        options: [
            { text: 'class', is_correct: true },
            { text: 'style', is_correct: false },
            { text: 'css', is_correct: false },
            { text: 'type', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which HTML attribute is used to apply unique CSS styling?',
        options: [
            { text: 'id', is_correct: true },
            { text: 'class', is_correct: false },
            { text: 'style', is_correct: false },
            { text: 'name', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Which symbol is used to define a class in CSS?',
        options: [
            { text: '.', is_correct: true },
            { text: '#', is_correct: false },
            { text: '@', is_correct: false },
            { text: '&', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Which symbol is used to define an ID in CSS?',
        options: [
            { text: '#', is_correct: true },
            { text: '.', is_correct: false },
            { text: '@', is_correct: false },
            { text: '&', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which CSS property controls text size?',
        options: [
            { text: 'font-size', is_correct: true },
            { text: 'text-size', is_correct: false },
            { text: 'size', is_correct: false },
            { text: 'font-weight', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which CSS property adds space inside an element?',
        options: [
            { text: 'padding', is_correct: true },
            { text: 'margin', is_correct: false },
            { text: 'border', is_correct: false },
            { text: 'spacing', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which CSS property adds space outside an element?',
        options: [
            { text: 'margin', is_correct: true },
            { text: 'padding', is_correct: false },
            { text: 'border', is_correct: false },
            { text: 'spacing', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Which JavaScript function displays a message box?',
        options: [
            { text: 'alert()', is_correct: true },
            { text: 'message()', is_correct: false },
            { text: 'display()', is_correct: false },
            { text: 'show()', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Which JavaScript function writes to the console?',
        options: [
            { text: 'console.log()', is_correct: true },
            { text: 'print()', is_correct: false },
            { text: 'write()', is_correct: false },
            { text: 'output()', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which method is used to get an element by ID in JavaScript?',
        options: [
            { text: 'getElementById()', is_correct: true },
            { text: 'getElement()', is_correct: false },
            { text: 'findById()', is_correct: false },
            { text: 'selectId()', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Which HTML tag creates a form?',
        options: [
            { text: '<form>', is_correct: true },
            { text: '<input>', is_correct: false },
            { text: '<button>', is_correct: false },
            { text: '<field>', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Which HTML tag creates a text input field?',
        options: [
            { text: '<input type="text">', is_correct: true },
            { text: '<text>', is_correct: false },
            { text: '<field>', is_correct: false },
            { text: '<textbox>', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Which HTML tag creates a button?',
        options: [
            { text: '<button>', is_correct: true },
            { text: '<btn>', is_correct: false },
            { text: '<click>', is_correct: false },
            { text: '<press>', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which CSS display property hides an element?',
        options: [
            { text: 'display: none', is_correct: true },
            { text: 'display: hidden', is_correct: false },
            { text: 'display: invisible', is_correct: false },
            { text: 'display: off', is_correct: false }
        ]
    },

    // Section 8: Computer Security (15 Questions)
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'A strong password should contain:',
        options: [
            { text: 'Letters, numbers, and symbols', is_correct: true },
            { text: 'Only letters', is_correct: false },
            { text: 'Only numbers', is_correct: false },
            { text: 'Personal information', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Malware is:',
        options: [
            { text: 'Malicious software', is_correct: true },
            { text: 'Good software', is_correct: false },
            { text: 'System software', is_correct: false },
            { text: 'Hardware component', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'A virus is a type of:',
        options: [
            { text: 'Malware', is_correct: true },
            { text: 'Hardware', is_correct: false },
            { text: 'Operating system', is_correct: false },
            { text: 'Network protocol', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Phishing is:',
        options: [
            { text: 'Fraudulent attempt to obtain sensitive information', is_correct: true },
            { text: 'A type of fishing', is_correct: false },
            { text: 'A programming technique', is_correct: false },
            { text: 'A network protocol', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Antivirus software is used to:',
        options: [
            { text: 'Protect against malware', is_correct: true },
            { text: 'Speed up the computer', is_correct: false },
            { text: 'Create documents', is_correct: false },
            { text: 'Browse the internet', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Two-factor authentication adds:',
        options: [
            { text: 'Extra security layer', is_correct: true },
            { text: 'More passwords', is_correct: false },
            { text: 'Faster login', is_correct: false },
            { text: 'Better graphics', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'SSL/TLS is used for:',
        options: [
            { text: 'Secure data transmission', is_correct: true },
            { text: 'Faster internet', is_correct: false },
            { text: 'Better graphics', is_correct: false },
            { text: 'More storage', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'A backup is:',
        options: [
            { text: 'Copy of important data', is_correct: true },
            { text: 'Extra computer', is_correct: false },
            { text: 'Security software', is_correct: false },
            { text: 'Network device', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Social engineering attacks target:',
        options: [
            { text: 'Human psychology', is_correct: true },
            { text: 'Computer hardware', is_correct: false },
            { text: 'Network cables', is_correct: false },
            { text: 'Software bugs', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Which is a safe browsing practice?',
        options: [
            { text: 'Check website URLs carefully', is_correct: true },
            { text: 'Click on all pop-ups', is_correct: false },
            { text: 'Download from any site', is_correct: false },
            { text: 'Share passwords freely', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Encryption is used to:',
        options: [
            { text: 'Protect data by scrambling it', is_correct: true },
            { text: 'Speed up data transfer', is_correct: false },
            { text: 'Compress files', is_correct: false },
            { text: 'Delete files securely', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Which should you never share online?',
        options: [
            { text: 'Personal financial information', is_correct: true },
            { text: 'Favorite movies', is_correct: false },
            { text: 'Hobby interests', is_correct: false },
            { text: 'School subjects', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'A DDoS attack is:',
        options: [
            { text: 'Overwhelming a server with traffic', is_correct: true },
            { text: 'Stealing passwords', is_correct: false },
            { text: 'Installing malware', is_correct: false },
            { text: 'Deleting files', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Regular software updates help:',
        options: [
            { text: 'Fix security vulnerabilities', is_correct: true },
            { text: 'Slow down the computer', is_correct: false },
            { text: 'Use more memory', is_correct: false },
            { text: 'Delete user files', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is ransomware?',
        options: [
            { text: 'Malware that encrypts files for money', is_correct: true },
            { text: 'Free security software', is_correct: false },
            { text: 'A type of firewall', is_correct: false },
            { text: 'An antivirus program', is_correct: false }
        ]
    }
];

async function seedGrade9CS() {
    try {
        console.log('Starting Grade 9 CS seeding...');

        for (const questionData of grade9CSQuestions) {
            const { grade, difficulty, question_text, options } = questionData;

            // Insert question
            const questionResult = await database.query(
                'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                [grade, difficulty, question_text]
            );

            const questionId = questionResult.insertId;

            // Insert options
            for (const option of options) {
                await database.query(
                    'INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)',
                    [questionId, option.text, option.is_correct]
                );
            }
        }

        console.log(`Successfully seeded ${grade9CSQuestions.length} Grade 9 CS questions`);

    } catch (error) {
        console.error('Error seeding Grade 9 CS questions:', error);
    } finally {
        database.end();
    }
}

if (require.main === module) {
    seedGrade9CS();
}

module.exports = { seedGrade9CS };