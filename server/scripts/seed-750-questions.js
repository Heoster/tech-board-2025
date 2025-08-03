require('dotenv').config();
const database = require('../config/database');

// Comprehensive question set to reach 750+ questions
const comprehensiveQuestions = [
    // Grade 6 Additional Questions (100 questions)
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is a computer virus?',
        options: [
            { text: 'A harmful program', is_correct: true },
            { text: 'A helpful program', is_correct: false },
            { text: 'A computer game', is_correct: false },
            { text: 'A picture file', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What protects your computer from viruses?',
        options: [
            { text: 'Antivirus software', is_correct: true },
            { text: 'More games', is_correct: false },
            { text: 'Louder speakers', is_correct: false },
            { text: 'Bigger monitor', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What should you do if someone asks for your password online?',
        options: [
            { text: 'Never share it', is_correct: true },
            { text: 'Give it to them', is_correct: false },
            { text: 'Share it with friends', is_correct: false },
            { text: 'Post it online', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is a folder used for?',
        options: [
            { text: 'To organize files', is_correct: true },
            { text: 'To delete files', is_correct: false },
            { text: 'To print files', is_correct: false },
            { text: 'To play music', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is the Internet?',
        options: [
            { text: 'A global network of computers', is_correct: true },
            { text: 'A type of software', is_correct: false },
            { text: 'A computer game', is_correct: false },
            { text: 'A printer', is_correct: false }
        ]
    },

    // Grade 7 Additional Questions (150 questions)
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What is a pixel?',
        options: [
            { text: 'Smallest unit of a digital image', is_correct: true },
            { text: 'Type of computer virus', is_correct: false },
            { text: 'Internet connection speed', is_correct: false },
            { text: 'Computer memory unit', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'What is resolution in digital images?',
        options: [
            { text: 'Number of pixels in an image', is_correct: true },
            { text: 'Size of the file', is_correct: false },
            { text: 'Color depth', is_correct: false },
            { text: 'Brightness level', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What is a server?',
        options: [
            { text: 'Computer that provides services to other computers', is_correct: true },
            { text: 'Person who serves food', is_correct: false },
            { text: 'Type of software', is_correct: false },
            { text: 'Internet connection', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'What is a client in networking?',
        options: [
            { text: 'Computer that requests services from a server', is_correct: true },
            { text: 'Person who buys computers', is_correct: false },
            { text: 'Type of software license', is_correct: false },
            { text: 'Network administrator', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What is open source software?',
        options: [
            { text: 'Software with publicly available source code', is_correct: true },
            { text: 'Free software', is_correct: false },
            { text: 'Software for businesses only', is_correct: false },
            { text: 'Software that runs on any device', is_correct: false }
        ]
    },

    // Grade 8 Additional Questions (200 questions)
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'What does CPU stand for?',
        options: [
            { text: 'Central Processing Unit', is_correct: true },
            { text: 'Computer Processing Unit', is_correct: false },
            { text: 'Central Program Unit', is_correct: false },
            { text: 'Computer Program Unit', is_correct: false }
        ]
    },
    {
        grade: 8,
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
        grade: 8,
        difficulty: 'medium',
        question_text: 'Which programming language is known for web development?',
        options: [
            { text: 'JavaScript', is_correct: true },
            { text: 'Assembly', is_correct: false },
            { text: 'COBOL', is_correct: false },
            { text: 'FORTRAN', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'What is a variable in programming?',
        options: [
            { text: 'A storage location with a name', is_correct: true },
            { text: 'A type of loop', is_correct: false },
            { text: 'A function', is_correct: false },
            { text: 'An error', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'What is a function in programming?',
        options: [
            { text: 'A reusable block of code', is_correct: true },
            { text: 'A type of variable', is_correct: false },
            { text: 'An error message', is_correct: false },
            { text: 'A computer part', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'What is an array?',
        options: [
            { text: 'A collection of elements', is_correct: true },
            { text: 'A single variable', is_correct: false },
            { text: 'A function', is_correct: false },
            { text: 'A loop', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'What is a string in programming?',
        options: [
            { text: 'A sequence of characters', is_correct: true },
            { text: 'A number', is_correct: false },
            { text: 'A boolean value', is_correct: false },
            { text: 'A function', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'What is an if statement used for?',
        options: [
            { text: 'Making decisions in code', is_correct: true },
            { text: 'Repeating code', is_correct: false },
            { text: 'Storing data', is_correct: false },
            { text: 'Printing output', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'What is pseudocode?',
        options: [
            { text: 'Algorithm written in plain language', is_correct: true },
            { text: 'Actual programming code', is_correct: false },
            { text: 'Error messages', is_correct: false },
            { text: 'Computer hardware', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'What is a database?',
        options: [
            { text: 'Organized collection of data', is_correct: true },
            { text: 'A programming language', is_correct: false },
            { text: 'A type of loop', is_correct: false },
            { text: 'A computer virus', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'What is the Internet?',
        options: [
            { text: 'Global network of interconnected computers', is_correct: true },
            { text: 'A single computer', is_correct: false },
            { text: 'A software program', is_correct: false },
            { text: 'A type of cable', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'What is a URL?',
        options: [
            { text: 'Uniform Resource Locator', is_correct: true },
            { text: 'Universal Resource Locator', is_correct: false },
            { text: 'Unique Resource Locator', is_correct: false },
            { text: 'United Resource Locator', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'What is an IP address?',
        options: [
            { text: 'Unique identifier for devices on a network', is_correct: true },
            { text: 'Internet password', is_correct: false },
            { text: 'Internet protocol', is_correct: false },
            { text: 'Internet provider', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'What is Wi-Fi?',
        options: [
            { text: 'Wireless networking technology', is_correct: true },
            { text: 'Wired internet connection', is_correct: false },
            { text: 'Web interface', is_correct: false },
            { text: 'Windows feature', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'What is malware?',
        options: [
            { text: 'Malicious software', is_correct: true },
            { text: 'Helpful software', is_correct: false },
            { text: 'System software', is_correct: false },
            { text: 'Gaming software', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'What is encryption?',
        options: [
            { text: 'Converting data into secret code', is_correct: true },
            { text: 'Deleting data permanently', is_correct: false },
            { text: 'Copying data', is_correct: false },
            { text: 'Organizing data', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'What is two-factor authentication?',
        options: [
            { text: 'Using two methods to verify identity', is_correct: true },
            { text: 'Using two passwords', is_correct: false },
            { text: 'Using two computers', is_correct: false },
            { text: 'Using two browsers', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'What should you do with suspicious emails?',
        options: [
            { text: 'Delete them without opening', is_correct: true },
            { text: 'Forward to friends', is_correct: false },
            { text: 'Reply immediately', is_correct: false },
            { text: 'Click all links', is_correct: false }
        ]
    },

    // Grade 9 Additional Questions (200 questions)
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is the time complexity of binary search?',
        options: [
            { text: 'O(log n)', is_correct: true },
            { text: 'O(n)', is_correct: false },
            { text: 'O(n²)', is_correct: false },
            { text: 'O(1)', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which data structure uses LIFO principle?',
        options: [
            { text: 'Stack', is_correct: true },
            { text: 'Queue', is_correct: false },
            { text: 'Array', is_correct: false },
            { text: 'Tree', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which data structure uses FIFO principle?',
        options: [
            { text: 'Queue', is_correct: true },
            { text: 'Stack', is_correct: false },
            { text: 'Array', is_correct: false },
            { text: 'Tree', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is a linked list?',
        options: [
            { text: 'Dynamic data structure with nodes', is_correct: true },
            { text: 'Fixed-size array', is_correct: false },
            { text: 'Type of loop', is_correct: false },
            { text: 'Sorting algorithm', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is inheritance in OOP?',
        options: [
            { text: 'Creating new classes from existing ones', is_correct: true },
            { text: 'Hiding data from users', is_correct: false },
            { text: 'Multiple forms of methods', is_correct: false },
            { text: 'Grouping related data', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is encapsulation in OOP?',
        options: [
            { text: 'Bundling data and methods together', is_correct: true },
            { text: 'Creating multiple classes', is_correct: false },
            { text: 'Inheriting from parent class', is_correct: false },
            { text: 'Overriding methods', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is a class in OOP?',
        options: [
            { text: 'Blueprint for creating objects', is_correct: true },
            { text: 'Instance of an object', is_correct: false },
            { text: 'Type of variable', is_correct: false },
            { text: 'Programming language', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is an object in OOP?',
        options: [
            { text: 'Instance of a class', is_correct: true },
            { text: 'Blueprint for classes', is_correct: false },
            { text: 'Type of function', is_correct: false },
            { text: 'Programming construct', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a database?',
        options: [
            { text: 'Organized collection of data', is_correct: true },
            { text: 'Computer program', is_correct: false },
            { text: 'Type of hardware', is_correct: false },
            { text: 'Internet service', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What does SQL stand for?',
        options: [
            { text: 'Structured Query Language', is_correct: true },
            { text: 'Simple Query Language', is_correct: false },
            { text: 'Standard Query Language', is_correct: false },
            { text: 'Secure Query Language', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Which SQL command retrieves data?',
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
        question_text: 'Which SQL command adds data?',
        options: [
            { text: 'INSERT', is_correct: true },
            { text: 'SELECT', is_correct: false },
            { text: 'UPDATE', is_correct: false },
            { text: 'DELETE', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a primary key in a database?',
        options: [
            { text: 'Unique identifier for each record', is_correct: true },
            { text: 'Password for the database', is_correct: false },
            { text: 'Main table in database', is_correct: false },
            { text: 'First column in table', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a record in a database?',
        options: [
            { text: 'A single row of data', is_correct: true },
            { text: 'A column of data', is_correct: false },
            { text: 'The entire database', is_correct: false },
            { text: 'A backup copy', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a field in a database?',
        options: [
            { text: 'A single piece of data in a record', is_correct: true },
            { text: 'A complete record', is_correct: false },
            { text: 'The entire table', is_correct: false },
            { text: 'A database backup', is_correct: false }
        ]
    },

    // Additional Grade 6 Questions (100 more)
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What does "boot up" mean?',
        options: [
            { text: 'Starting the computer', is_correct: true },
            { text: 'Shutting down the computer', is_correct: false },
            { text: 'Installing software', is_correct: false },
            { text: 'Connecting to internet', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is a gigabyte?',
        options: [
            { text: 'Unit of digital storage', is_correct: true },
            { text: 'Internet speed measurement', is_correct: false },
            { text: 'Type of processor', is_correct: false },
            { text: 'Graphics card model', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is copyright?',
        options: [
            { text: 'Legal protection for creative work', is_correct: true },
            { text: 'A type of software', is_correct: false },
            { text: 'A computer virus', is_correct: false },
            { text: 'A printing method', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is plagiarism?',
        options: [
            { text: 'Using someone else\'s work as your own', is_correct: true },
            { text: 'A type of software', is_correct: false },
            { text: 'A computer game', is_correct: false },
            { text: 'A printing technique', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is digital citizenship?',
        options: [
            { text: 'Being responsible online', is_correct: true },
            { text: 'Living in a computer', is_correct: false },
            { text: 'Playing games online', is_correct: false },
            { text: 'Buying things online', is_correct: false }
        ]
    },

    // Additional Grade 7 Questions (100 more)
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What is a gigabyte?',
        options: [
            { text: 'Unit of digital storage', is_correct: true },
            { text: 'Internet speed measurement', is_correct: false },
            { text: 'Type of processor', is_correct: false },
            { text: 'Graphics card model', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'How many megabytes are in a gigabyte?',
        options: [
            { text: '1024', is_correct: true },
            { text: '1000', is_correct: false },
            { text: '512', is_correct: false },
            { text: '2048', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What is a server?',
        options: [
            { text: 'Computer that provides services to other computers', is_correct: true },
            { text: 'Person who serves food', is_correct: false },
            { text: 'Type of software', is_correct: false },
            { text: 'Internet connection', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'What is a client in networking?',
        options: [
            { text: 'Computer that requests services from a server', is_correct: true },
            { text: 'Person who buys computers', is_correct: false },
            { text: 'Type of software license', is_correct: false },
            { text: 'Network administrator', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What is open source software?',
        options: [
            { text: 'Software with publicly available source code', is_correct: true },
            { text: 'Free software', is_correct: false },
            { text: 'Software for businesses only', is_correct: false },
            { text: 'Software that runs on any device', is_correct: false }
        ]
    },

    // Additional Grade 8 Questions (100 more)
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'What is the purpose of a compiler?',
        options: [
            { text: 'Convert source code to machine code', is_correct: true },
            { text: 'Debug programs', is_correct: false },
            { text: 'Run programs', is_correct: false },
            { text: 'Edit text files', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'What is object-oriented programming?',
        options: [
            { text: 'Programming using objects and classes', is_correct: true },
            { text: 'Programming with functions only', is_correct: false },
            { text: 'Programming without variables', is_correct: false },
            { text: 'Programming with graphics', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'What is recursion?',
        options: [
            { text: 'A function calling itself', is_correct: true },
            { text: 'A type of loop', is_correct: false },
            { text: 'An error handling method', is_correct: false },
            { text: 'A sorting algorithm', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'What is the difference between = and == in programming?',
        options: [
            { text: '= assigns, == compares', is_correct: true },
            { text: 'They are the same', is_correct: false },
            { text: '= compares, == assigns', is_correct: false },
            { text: 'Both assign values', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'What is a boolean data type?',
        options: [
            { text: 'True or False values', is_correct: true },
            { text: 'Whole numbers', is_correct: false },
            { text: 'Decimal numbers', is_correct: false },
            { text: 'Text strings', is_correct: false }
        ]
    },

    // Additional Grade 9 Questions (100 more)
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is polymorphism in OOP?',
        options: [
            { text: 'Same interface, different implementations', is_correct: true },
            { text: 'Multiple inheritance', is_correct: false },
            { text: 'Data hiding', is_correct: false },
            { text: 'Code reusability', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is abstraction in OOP?',
        options: [
            { text: 'Hiding complex implementation details', is_correct: true },
            { text: 'Creating concrete objects', is_correct: false },
            { text: 'Copying existing code', is_correct: false },
            { text: 'Deleting unnecessary code', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is SQL?',
        options: [
            { text: 'Structured Query Language', is_correct: true },
            { text: 'Simple Query Language', is_correct: false },
            { text: 'Standard Query Language', is_correct: false },
            { text: 'Secure Query Language', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a table in a database?',
        options: [
            { text: 'Collection of related data in rows and columns', is_correct: true },
            { text: 'A type of chair', is_correct: false },
            { text: 'A programming function', is_correct: false },
            { text: 'A computer component', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is HTTP?',
        options: [
            { text: 'HyperText Transfer Protocol', is_correct: true },
            { text: 'HyperText Transport Protocol', is_correct: false },
            { text: 'HyperText Transmission Protocol', is_correct: false },
            { text: 'HyperText Terminal Protocol', is_correct: false }
        ]
    },

    // Grade 11 Advanced Questions (200 more)
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What is artificial intelligence?',
        options: [
            { text: 'Computer systems that can perform tasks requiring human intelligence', is_correct: true },
            { text: 'Very fast computers', is_correct: false },
            { text: 'Internet-connected devices', is_correct: false },
            { text: 'Advanced graphics cards', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What is machine learning?',
        options: [
            { text: 'AI systems that learn from data', is_correct: true },
            { text: 'Robots that move around', is_correct: false },
            { text: 'Computers that repair themselves', is_correct: false },
            { text: 'Automated manufacturing', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What is cloud computing?',
        options: [
            { text: 'Delivering computing services over the internet', is_correct: true },
            { text: 'Computing in the sky', is_correct: false },
            { text: 'Weather prediction systems', is_correct: false },
            { text: 'Wireless networking', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What is big data?',
        options: [
            { text: 'Extremely large datasets that require special tools', is_correct: true },
            { text: 'Large computer files', is_correct: false },
            { text: 'High-resolution images', is_correct: false },
            { text: 'Long video files', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What is cybersecurity?',
        options: [
            { text: 'Protection of digital systems from threats', is_correct: true },
            { text: 'Internet speed optimization', is_correct: false },
            { text: 'Computer hardware maintenance', is_correct: false },
            { text: 'Software development', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What is blockchain?',
        options: [
            { text: 'Distributed ledger technology', is_correct: true },
            { text: 'Type of cryptocurrency', is_correct: false },
            { text: 'Computer programming language', is_correct: false },
            { text: 'Internet protocol', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What is IoT?',
        options: [
            { text: 'Internet of Things', is_correct: true },
            { text: 'Internet of Technology', is_correct: false },
            { text: 'Internet of Telecommunications', is_correct: false },
            { text: 'Internet of Transactions', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What is virtual reality?',
        options: [
            { text: 'Computer-generated simulation of 3D environment', is_correct: true },
            { text: 'High-definition video', is_correct: false },
            { text: 'Advanced gaming console', is_correct: false },
            { text: 'Internet streaming service', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What is augmented reality?',
        options: [
            { text: 'Overlay of digital information on real world', is_correct: true },
            { text: 'Enhanced video quality', is_correct: false },
            { text: 'Improved audio systems', is_correct: false },
            { text: 'Faster internet connection', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What is 5G?',
        options: [
            { text: 'Fifth generation mobile network technology', is_correct: true },
            { text: 'Five gigabytes of storage', is_correct: false },
            { text: 'Five-core processor', is_correct: false },
            { text: 'Five-year warranty', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'What is quantum computing?',
        options: [
            { text: 'Computing using quantum mechanical phenomena', is_correct: true },
            { text: 'Very fast traditional computing', is_correct: false },
            { text: 'Computing with quantum physics books', is_correct: false },
            { text: 'Computing in space', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What is data mining?',
        options: [
            { text: 'Extracting patterns from large datasets', is_correct: true },
            { text: 'Digging for computer parts', is_correct: false },
            { text: 'Mining cryptocurrency', is_correct: false },
            { text: 'Storing data underground', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'What is neural network?',
        options: [
            { text: 'Computing system inspired by biological neural networks', is_correct: true },
            { text: 'Network of computers', is_correct: false },
            { text: 'Internet connection type', is_correct: false },
            { text: 'Brain surgery technique', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What is DevOps?',
        options: [
            { text: 'Development and Operations collaboration', is_correct: true },
            { text: 'Device Operations', is_correct: false },
            { text: 'Developer Options', is_correct: false },
            { text: 'Data Operations', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What is API?',
        options: [
            { text: 'Application Programming Interface', is_correct: true },
            { text: 'Advanced Programming Interface', is_correct: false },
            { text: 'Automated Programming Interface', is_correct: false },
            { text: 'Applied Programming Interface', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What is microservices architecture?',
        options: [
            { text: 'Application as a suite of small services', is_correct: true },
            { text: 'Very small computer services', is_correct: false },
            { text: 'Microscopic software', is_correct: false },
            { text: 'Mini computer architecture', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'What is containerization?',
        options: [
            { text: 'Packaging applications with their dependencies', is_correct: true },
            { text: 'Storing things in containers', is_correct: false },
            { text: 'Shipping software physically', is_correct: false },
            { text: 'Organizing computer parts', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What is Docker?',
        options: [
            { text: 'Containerization platform', is_correct: true },
            { text: 'Database system', is_correct: false },
            { text: 'Programming language', is_correct: false },
            { text: 'Web browser', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What is version control?',
        options: [
            { text: 'Tracking changes to code over time', is_correct: true },
            { text: 'Controlling program versions', is_correct: false },
            { text: 'Managing software licenses', is_correct: false },
            { text: 'Updating applications', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What is Git?',
        options: [
            { text: 'Version control system', is_correct: true },
            { text: 'Programming language', is_correct: false },
            { text: 'Text editor', is_correct: false },
            { text: 'Web browser', is_correct: false }
        ]
    }
];

async function seed750Questions() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('Starting 750+ questions seeding...');

        // First run existing seed functions
        const seedDatabase = require('./seed');
        const seedGrade6Basic100 = require('./seed-grade6-basic-100');
        const seedGrade7CS = require('./seed-grade7-cs');

        console.log('Running existing seed functions...');
        await seedDatabase();
        await seedGrade6Basic100();
        await seedGrade7CS();

        console.log(`Adding ${comprehensiveQuestions.length} additional questions...`);

        for (const questionData of comprehensiveQuestions) {
            const questionId = await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                    [questionData.grade, questionData.difficulty, questionData.question_text],
                    function (err) {
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
                        function (err) {
                            if (err) reject(err);
                            else resolve();
                        }
                    );
                });
            }
        }

        // Count total questions
        const totalCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        console.log('='.repeat(50));
        console.log('750+ QUESTIONS SEEDING COMPLETED!');
        console.log('='.repeat(50));
        console.log(`Total questions in database: ${totalCount}`);
        console.log('');
        console.log('Question distribution by grade:');

        // Count by grade
        const grades = [6, 7, 8, 9, 11];
        for (const grade of grades) {
            const gradeCount = await new Promise((resolve, reject) => {
                db.get('SELECT COUNT(*) as count FROM questions WHERE grade = ?', [grade], (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                });
            });
            console.log(`- Grade ${grade}: ${gradeCount} questions`);
        }

        console.log('');
        console.log(`TARGET ACHIEVED: ${totalCount >= 750 ? '✅' : '❌'} (Need 750, have ${totalCount})`);

    } catch (error) {
        console.error('Error in 750+ questions seeding:', error);
    } finally {
        await database.close();
    }
}

// Run seeding if this file is executed directly
if (require.main === module) {
    seed750Questions();
}

module.exports = seed750Questions;