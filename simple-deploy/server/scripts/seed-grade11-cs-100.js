require('dotenv').config();
const database = require('../config/database');

const grade11CSQuestions = [
    // Section 1: HTML Basics (10 Questions)
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'HTML stands for:',
        options: [
            { text: 'Hyper Text Markup Language', is_correct: true },
            { text: 'High Tech Modern Language', is_correct: false },
            { text: 'Hyperlink Text Manager', is_correct: false },
            { text: 'Home Tool Markup Language', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Which tag creates a paragraph?',
        options: [
            { text: '<br>', is_correct: false },
            { text: '<p>', is_correct: true },
            { text: '<hr>', is_correct: false },
            { text: '<para>', is_correct: false }
        ]
    },
    {
        grade: 11,
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
        grade: 11,
        difficulty: 'basic',
        question_text: 'Which tag creates a hyperlink?',
        options: [
            { text: '<a>', is_correct: true },
            { text: '<link>', is_correct: false },
            { text: '<href>', is_correct: false },
            { text: '<url>', is_correct: false }
        ]
    },
    {
        grade: 11,
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
        grade: 11,
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
        grade: 11,
        difficulty: 'medium',
        question_text: 'Which attribute specifies the URL in an <a> tag?',
        options: [
            { text: 'href', is_correct: true },
            { text: 'src', is_correct: false },
            { text: 'link', is_correct: false },
            { text: 'url', is_correct: false }
        ]
    },
    {
        grade: 11,
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
        grade: 11,
        difficulty: 'medium',
        question_text: 'HTML documents must start with:',
        options: [
            { text: '<!DOCTYPE html>', is_correct: true },
            { text: '<html>', is_correct: false },
            { text: '<head>', is_correct: false },
            { text: '<body>', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Which tag creates an unordered list?',
        options: [
            { text: '<ul>', is_correct: true },
            { text: '<ol>', is_correct: false },
            { text: '<li>', is_correct: false },
            { text: '<list>', is_correct: false }
        ]
    },

    // Section 2: Number Systems (10 Questions)
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'The binary equivalent of decimal 5 is:',
        options: [
            { text: '100', is_correct: false },
            { text: '101', is_correct: true },
            { text: '110', is_correct: false },
            { text: '111', is_correct: false }
        ]
    },
    {
        grade: 11,
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
        grade: 11,
        difficulty: 'medium',
        question_text: 'The decimal equivalent of binary 1010 is:',
        options: [
            { text: '10', is_correct: true },
            { text: '8', is_correct: false },
            { text: '12', is_correct: false },
            { text: '14', is_correct: false }
        ]
    },
    {
        grade: 11,
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
        grade: 11,
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
        grade: 11,
        difficulty: 'advanced',
        question_text: 'The hexadecimal equivalent of decimal 15 is:',
        options: [
            { text: 'F', is_correct: true },
            { text: 'E', is_correct: false },
            { text: '15', is_correct: false },
            { text: '1F', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'The octal system uses base:',
        options: [
            { text: '8', is_correct: true },
            { text: '10', is_correct: false },
            { text: '16', is_correct: false },
            { text: '2', is_correct: false }
        ]
    },
    {
        grade: 11,
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
        grade: 11,
        difficulty: 'medium',
        question_text: 'To convert binary to decimal, we use powers of:',
        options: [
            { text: '2', is_correct: true },
            { text: '10', is_correct: false },
            { text: '8', is_correct: false },
            { text: '16', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'The binary equivalent of decimal 16 is:',
        options: [
            { text: '10000', is_correct: true },
            { text: '1111', is_correct: false },
            { text: '10001', is_correct: false },
            { text: '1110', is_correct: false }
        ]
    },

    // Section 3: OS Functions (10 Questions)
    {
        grade: 11,
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
        grade: 11,
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
        grade: 11,
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
        grade: 11,
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
        grade: 11,
        difficulty: 'medium',
        question_text: 'The OS component that manages files and folders is:',
        options: [
            { text: 'File system', is_correct: true },
            { text: 'Kernel', is_correct: false },
            { text: 'Shell', is_correct: false },
            { text: 'Driver', is_correct: false }
        ]
    },
    {
        grade: 11,
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
        grade: 11,
        difficulty: 'medium',
        question_text: 'Virtual memory is used when:',
        options: [
            { text: 'RAM is insufficient', is_correct: true },
            { text: 'Hard disk is full', is_correct: false },
            { text: 'CPU is overloaded', is_correct: false },
            { text: 'Network is slow', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'The core part of an OS is called:',
        options: [
            { text: 'Kernel', is_correct: true },
            { text: 'Shell', is_correct: false },
            { text: 'Driver', is_correct: false },
            { text: 'Registry', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'Process scheduling is handled by:',
        options: [
            { text: 'Operating System', is_correct: true },
            { text: 'Application software', is_correct: false },
            { text: 'Hardware only', is_correct: false },
            { text: 'User manually', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Device drivers are used to:',
        options: [
            { text: 'Control hardware devices', is_correct: true },
            { text: 'Run applications', is_correct: false },
            { text: 'Manage files', is_correct: false },
            { text: 'Connect to internet', is_correct: false }
        ]
    },

    // Section 4: Networking (10 Questions)
    {
        grade: 11,
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
        grade: 11,
        difficulty: 'basic',
        question_text: 'A router is used to:',
        options: [
            { text: 'Connect networks', is_correct: true },
            { text: 'Print documents', is_correct: false },
            { text: 'Store files', is_correct: false },
            { text: 'Edit videos', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'WAN stands for:',
        options: [
            { text: 'Wide Area Network', is_correct: true },
            { text: 'Wireless Access Network', is_correct: false },
            { text: 'World Area Network', is_correct: false },
            { text: 'Web Access Network', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'An IP address is used to:',
        options: [
            { text: 'Identify devices on a network', is_correct: true },
            { text: 'Store passwords', is_correct: false },
            { text: 'Encrypt data', is_correct: false },
            { text: 'Speed up internet', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Wi-Fi is a type of:',
        options: [
            { text: 'Wireless network', is_correct: true },
            { text: 'Wired network', is_correct: false },
            { text: 'Storage device', is_correct: false },
            { text: 'Operating system', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'In a star topology, all devices connect to:',
        options: [
            { text: 'A central hub/switch', is_correct: true },
            { text: 'Each other directly', is_correct: false },
            { text: 'A ring formation', is_correct: false },
            { text: 'A bus cable', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'TCP/IP is a:',
        options: [
            { text: 'Network protocol suite', is_correct: true },
            { text: 'Type of cable', is_correct: false },
            { text: 'Network topology', is_correct: false },
            { text: 'Hardware device', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'A switch operates at which layer?',
        options: [
            { text: 'Data Link Layer', is_correct: true },
            { text: 'Physical Layer', is_correct: false },
            { text: 'Network Layer', is_correct: false },
            { text: 'Application Layer', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Ethernet is a:',
        options: [
            { text: 'Wired network technology', is_correct: true },
            { text: 'Wireless technology', is_correct: false },
            { text: 'Storage technology', is_correct: false },
            { text: 'Display technology', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'The maximum number of devices in a typical IPv4 subnet is:',
        options: [
            { text: '254', is_correct: true },
            { text: '256', is_correct: false },
            { text: '128', is_correct: false },
            { text: '512', is_correct: false }
        ]
    },

    // Section 5: Python Basics (15 Questions)
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Which Python function displays output?',
        options: [
            { text: 'input()', is_correct: false },
            { text: 'print()', is_correct: true },
            { text: 'calculate()', is_correct: false },
            { text: 'show()', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'x = 5 creates a:',
        options: [
            { text: 'Function', is_correct: false },
            { text: 'Variable', is_correct: true },
            { text: 'Loop', is_correct: false },
            { text: 'Error', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Which function gets input from user?',
        options: [
            { text: 'input()', is_correct: true },
            { text: 'get()', is_correct: false },
            { text: 'read()', is_correct: false },
            { text: 'scan()', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Python is a:',
        options: [
            { text: 'Programming language', is_correct: true },
            { text: 'Operating system', is_correct: false },
            { text: 'Web browser', is_correct: false },
            { text: 'Database', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'Which data type stores whole numbers?',
        options: [
            { text: 'int', is_correct: true },
            { text: 'float', is_correct: false },
            { text: 'str', is_correct: false },
            { text: 'bool', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Comments in Python start with:',
        options: [
            { text: '#', is_correct: true },
            { text: '//', is_correct: false },
            { text: '/*', is_correct: false },
            { text: '--', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What will print("Hello" + "World") output?',
        options: [
            { text: 'HelloWorld', is_correct: true },
            { text: 'Hello World', is_correct: false },
            { text: 'Hello+World', is_correct: false },
            { text: 'Error', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Which operator is used for exponentiation?',
        options: [
            { text: '**', is_correct: true },
            { text: '^', is_correct: false },
            { text: 'exp', is_correct: false },
            { text: '^^', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What is the result of 10 // 3 in Python?',
        options: [
            { text: '3', is_correct: true },
            { text: '3.33', is_correct: false },
            { text: '4', is_correct: false },
            { text: '1', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'String data type is represented by:',
        options: [
            { text: 'str', is_correct: true },
            { text: 'string', is_correct: false },
            { text: 'text', is_correct: false },
            { text: 'char', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'Which function returns the length of a string?',
        options: [
            { text: 'len()', is_correct: true },
            { text: 'length()', is_correct: false },
            { text: 'size()', is_correct: false },
            { text: 'count()', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Boolean data type has how many values?',
        options: [
            { text: '2', is_correct: true },
            { text: '1', is_correct: false },
            { text: '3', is_correct: false },
            { text: 'Unlimited', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What does the % operator do?',
        options: [
            { text: 'Returns remainder', is_correct: true },
            { text: 'Calculates percentage', is_correct: false },
            { text: 'Multiplies by 100', is_correct: false },
            { text: 'Divides by 100', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'Which method converts string to uppercase?',
        options: [
            { text: 'upper()', is_correct: true },
            { text: 'uppercase()', is_correct: false },
            { text: 'toUpper()', is_correct: false },
            { text: 'caps()', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'Python uses which type of indentation?',
        options: [
            { text: 'Spaces or tabs', is_correct: true },
            { text: 'Curly braces', is_correct: false },
            { text: 'Semicolons', is_correct: false },
            { text: 'Parentheses', is_correct: false }
        ]
    },

    // Section 6: Logical Reasoning (10 Questions)
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'An if statement is used for:',
        options: [
            { text: 'Decision-making', is_correct: true },
            { text: 'Repeating code', is_correct: false },
            { text: 'Storing data', is_correct: false },
            { text: 'Drawing graphics', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'Which loop repeats code 5 times?',
        options: [
            { text: 'while True:', is_correct: false },
            { text: 'for i in range(5):', is_correct: true },
            { text: 'if x=5:', is_correct: false },
            { text: 'repeat 5:', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'The logical operator for AND is:',
        options: [
            { text: 'and', is_correct: true },
            { text: '&&', is_correct: false },
            { text: '&', is_correct: false },
            { text: 'AND', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'The logical operator for OR is:',
        options: [
            { text: 'or', is_correct: true },
            { text: '||', is_correct: false },
            { text: '|', is_correct: false },
            { text: 'OR', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What does the condition (x > 5 and x < 10) check?',
        options: [
            { text: 'x is between 5 and 10', is_correct: true },
            { text: 'x is 5 or 10', is_correct: false },
            { text: 'x is greater than 10', is_correct: false },
            { text: 'x is less than 5', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'The NOT operator in Python is:',
        options: [
            { text: 'not', is_correct: true },
            { text: '!', is_correct: false },
            { text: '~', is_correct: false },
            { text: 'NOT', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'A while loop continues as long as:',
        options: [
            { text: 'The condition is True', is_correct: true },
            { text: 'The condition is False', is_correct: false },
            { text: 'There are no errors', is_correct: false },
            { text: 'The user wants it to', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'What is the result of (True and False) or True?',
        options: [
            { text: 'True', is_correct: true },
            { text: 'False', is_correct: false },
            { text: 'Error', is_correct: false },
            { text: 'None', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'The else clause executes when:',
        options: [
            { text: 'The if condition is False', is_correct: true },
            { text: 'The if condition is True', is_correct: false },
            { text: 'There is an error', is_correct: false },
            { text: 'Always', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Comparison operators return:',
        options: [
            { text: 'Boolean values', is_correct: true },
            { text: 'Numbers', is_correct: false },
            { text: 'Strings', is_correct: false },
            { text: 'Lists', is_correct: false }
        ]
    },

    // Section 7: Cyber Safety (10 Questions)
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'Two-factor authentication:',
        options: [
            { text: 'Adds extra login security', is_correct: true },
            { text: 'Deletes files', is_correct: false },
            { text: 'Speeds up the internet', is_correct: false },
            { text: 'Blocks emails', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'A VPN is used to:',
        options: [
            { text: 'Protect online privacy', is_correct: true },
            { text: 'Play games', is_correct: false },
            { text: 'Edit photos', is_correct: false },
            { text: 'Scan documents', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'Plagiarism is:',
        options: [
            { text: 'Using someone else\'s work without credit', is_correct: true },
            { text: 'Creating original content', is_correct: false },
            { text: 'Sharing files legally', is_correct: false },
            { text: 'Backing up data', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'A strong password should include:',
        options: [
            { text: 'Letters, numbers, and symbols', is_correct: true },
            { text: 'Only letters', is_correct: false },
            { text: 'Only numbers', is_correct: false },
            { text: 'Personal information', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'Digital footprint refers to:',
        options: [
            { text: 'Your online activity trail', is_correct: true },
            { text: 'Computer storage space', is_correct: false },
            { text: 'Internet speed', is_correct: false },
            { text: 'Screen resolution', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'End-to-end encryption means:',
        options: [
            { text: 'Only sender and receiver can read the message', is_correct: true },
            { text: 'Messages are stored forever', is_correct: false },
            { text: 'Messages are sent faster', is_correct: false },
            { text: 'Messages are automatically deleted', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'Social engineering attacks target:',
        options: [
            { text: 'Human psychology', is_correct: true },
            { text: 'Computer hardware', is_correct: false },
            { text: 'Network cables', is_correct: false },
            { text: 'Power supplies', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'You should update software to:',
        options: [
            { text: 'Fix security vulnerabilities', is_correct: true },
            { text: 'Use more storage', is_correct: false },
            { text: 'Slow down the computer', is_correct: false },
            { text: 'Change the interface color', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'A firewall protects against:',
        options: [
            { text: 'Unauthorized network access', is_correct: true },
            { text: 'Power outages', is_correct: false },
            { text: 'Hardware failures', is_correct: false },
            { text: 'Software bugs', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'HTTPS ensures:',
        options: [
            { text: 'Encrypted communication', is_correct: true },
            { text: 'Faster loading', is_correct: false },
            { text: 'Better graphics', is_correct: false },
            { text: 'More storage', is_correct: false }
        ]
    },

    // Section 8: Spreadsheets (10 Questions)
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'In Excel, a cell address like "B3" refers to:',
        options: [
            { text: 'Column B, Row 3', is_correct: true },
            { text: 'Row B, Column 3', is_correct: false },
            { text: 'Page 3', is_correct: false },
            { text: 'File 3', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'The formula =A1+B1 will:',
        options: [
            { text: 'Add two cells', is_correct: true },
            { text: 'Compare values', is_correct: false },
            { text: 'Merge text', is_correct: false },
            { text: 'Create a chart', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'The SUM function syntax is:',
        options: [
            { text: '=SUM(range)', is_correct: true },
            { text: 'SUM(range)', is_correct: false },
            { text: '=ADD(range)', is_correct: false },
            { text: 'TOTAL(range)', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'The AVERAGE function calculates:',
        options: [
            { text: 'Mean of values', is_correct: true },
            { text: 'Sum of values', is_correct: false },
            { text: 'Maximum value', is_correct: false },
            { text: 'Minimum value', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'To create a chart, you select data and go to:',
        options: [
            { text: 'Insert tab', is_correct: true },
            { text: 'Home tab', is_correct: false },
            { text: 'Data tab', is_correct: false },
            { text: 'View tab', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Cell formatting includes:',
        options: [
            { text: 'Font, color, borders', is_correct: true },
            { text: 'Only font size', is_correct: false },
            { text: 'Only colors', is_correct: false },
            { text: 'Only borders', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'The MAX function returns:',
        options: [
            { text: 'Largest value in range', is_correct: true },
            { text: 'Smallest value in range', is_correct: false },
            { text: 'Average of range', is_correct: false },
            { text: 'Sum of range', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'Absolute cell reference uses:',
        options: [
            { text: '$A$1', is_correct: true },
            { text: 'A1', is_correct: false },
            { text: '#A1', is_correct: false },
            { text: '@A1', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'To sort data in ascending order:',
        options: [
            { text: 'Data tab > Sort A to Z', is_correct: true },
            { text: 'Home tab > Sort', is_correct: false },
            { text: 'Insert tab > Sort', is_correct: false },
            { text: 'View tab > Sort', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'A worksheet contains:',
        options: [
            { text: 'Rows and columns of cells', is_correct: true },
            { text: 'Only text', is_correct: false },
            { text: 'Only numbers', is_correct: false },
            { text: 'Only formulas', is_correct: false }
        ]
    },

    // Section 9: Hardware/Software (10 Questions)
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Which is a storage device?',
        options: [
            { text: 'SSD', is_correct: true },
            { text: 'Mouse', is_correct: false },
            { text: 'Monitor', is_correct: false },
            { text: 'Speaker', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Software examples include:',
        options: [
            { text: 'Microsoft Excel', is_correct: true },
            { text: 'RAM', is_correct: false },
            { text: 'USB cable', is_correct: false },
            { text: 'Printer', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'The difference between hardware and software is:',
        options: [
            { text: 'Hardware is physical, software is logical', is_correct: true },
            { text: 'Hardware is expensive, software is free', is_correct: false },
            { text: 'Hardware is new, software is old', is_correct: false },
            { text: 'No difference', is_correct: false }
        ]
    },
    {
        grade: 11,
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
        grade: 11,
        difficulty: 'basic',
        question_text: 'Which is an output device?',
        options: [
            { text: 'Monitor', is_correct: true },
            { text: 'Keyboard', is_correct: false },
            { text: 'Mouse', is_correct: false },
            { text: 'Microphone', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'System software includes:',
        options: [
            { text: 'Operating systems and drivers', is_correct: true },
            { text: 'Games and media players', is_correct: false },
            { text: 'Word processors and browsers', is_correct: false },
            { text: 'Only antivirus programs', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Application software is used for:',
        options: [
            { text: 'Specific user tasks', is_correct: true },
            { text: 'Managing hardware only', is_correct: false },
            { text: 'System maintenance only', is_correct: false },
            { text: 'Network configuration only', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'Volatile memory loses data when:',
        options: [
            { text: 'Power is turned off', is_correct: true },
            { text: 'Computer is restarted', is_correct: false },
            { text: 'Files are deleted', is_correct: false },
            { text: 'Internet is disconnected', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'The CPU consists of:',
        options: [
            { text: 'ALU, Control Unit, and Registers', is_correct: true },
            { text: 'Only arithmetic circuits', is_correct: false },
            { text: 'Only memory circuits', is_correct: false },
            { text: 'Only input/output circuits', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Secondary storage is:',
        options: [
            { text: 'Non-volatile storage', is_correct: true },
            { text: 'Temporary storage', is_correct: false },
            { text: 'CPU storage', is_correct: false },
            { text: 'Network storage only', is_correct: false }
        ]
    },

    // Section 10: Cloud & Flowcharts (5 Questions)
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'Google Drive is an example of:',
        options: [
            { text: 'Cloud storage', is_correct: true },
            { text: 'Gaming software', is_correct: false },
            { text: 'Operating system', is_correct: false },
            { text: 'Programming language', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'A flowchart\'s decision symbol is:',
        options: [
            { text: 'Rectangle', is_correct: false },
            { text: 'Diamond', is_correct: true },
            { text: 'Oval', is_correct: false },
            { text: 'Circle', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'Cloud collaboration allows:',
        options: [
            { text: 'Multiple users to work on same document', is_correct: true },
            { text: 'Faster internet speed', is_correct: false },
            { text: 'Better graphics', is_correct: false },
            { text: 'More storage space', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'File sharing in cloud means:',
        options: [
            { text: 'Giving others access to your files', is_correct: true },
            { text: 'Deleting files', is_correct: false },
            { text: 'Copying files to USB', is_correct: false },
            { text: 'Printing files', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'A flowchart helps in:',
        options: [
            { text: 'Visualizing algorithm steps', is_correct: true },
            { text: 'Storing data', is_correct: false },
            { text: 'Running programs', is_correct: false },
            { text: 'Connecting to internet', is_correct: false }
        ]
    }
];

async function seedGrade11CS100() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('Starting Grade 11 Computer Science questions seeding...');

        // Insert Grade 11 CS questions
        for (const questionData of grade11CSQuestions) {
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

        console.log(`Successfully added ${grade11CSQuestions.length} Grade 11 Computer Science questions!`);
        console.log('Question categories:');
        console.log('- HTML Basics: 10 questions');
        console.log('- Number Systems: 10 questions');
        console.log('- OS Functions: 10 questions');
        console.log('- Networking: 10 questions');
        console.log('- Python Basics: 15 questions');
        console.log('- Logical Reasoning: 10 questions');
        console.log('- Cyber Safety: 10 questions');
        console.log('- Spreadsheets: 10 questions');
        console.log('- Hardware/Software: 10 questions');
        console.log('- Cloud & Flowcharts: 5 questions');
        console.log(`Total: ${grade11CSQuestions.length} questions added`);

        const basicCount = grade11CSQuestions.filter(q => q.difficulty === 'basic').length;
        const mediumCount = grade11CSQuestions.filter(q => q.difficulty === 'medium').length;
        const advancedCount = grade11CSQuestions.filter(q => q.difficulty === 'advanced').length;
        
        console.log('Difficulty distribution:');
        console.log(`- Basic: ${basicCount} questions`);
        console.log(`- Medium: ${mediumCount} questions`);
        console.log(`- Advanced: ${advancedCount} questions`);

    } catch (error) {
        console.error('Error seeding Grade 11 CS questions:', error);
    } finally {
        await database.close();
    }
}

// Run seeding if this file is executed directly
if (require.main === module) {
    seedGrade11CS100();
}

module.exports = seedGrade11CS100;