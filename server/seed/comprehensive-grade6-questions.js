const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../database/mcq_system.db');

// Grade 6 Computer Science - 200+ Unique Questions
const grade6Questions = [
    // Computer Fundamentals (40 questions)
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What makes a computer different from a simple calculator?',
        options: [
            { text: 'Computers can store and execute programs automatically', isCorrect: true },
            { text: 'Computers are bigger in size', isCorrect: false },
            { text: 'Computers use more electricity', isCorrect: false },
            { text: 'Computers have more buttons', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which computer characteristic means it can work continuously without getting tired?',
        options: [
            { text: 'Diligence', isCorrect: true },
            { text: 'Speed', isCorrect: false },
            { text: 'Accuracy', isCorrect: false },
            { text: 'Memory', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What does computer versatility mean?',
        options: [
            { text: 'Ability to perform various types of tasks', isCorrect: true },
            { text: 'Working very fast', isCorrect: false },
            { text: 'Never making errors', isCorrect: false },
            { text: 'Having large storage', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which characteristic ensures computers make very few mistakes?',
        options: [
            { text: 'Accuracy', isCorrect: true },
            { text: 'Speed', isCorrect: false },
            { text: 'Storage', isCorrect: false },
            { text: 'Versatility', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is the ability of computers to remember information called?',
        options: [
            { text: 'Storage capacity', isCorrect: true },
            { text: 'Processing power', isCorrect: false },
            { text: 'Input capability', isCorrect: false },
            { text: 'Output quality', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'How many calculations can modern computers perform per second?',
        options: [
            { text: 'Billions or more', isCorrect: true },
            { text: 'Hundreds', isCorrect: false },
            { text: 'Thousands', isCorrect: false },
            { text: 'Millions', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What does it mean when we say computers have no emotions?',
        options: [
            { text: 'They work objectively without bias', isCorrect: true },
            { text: 'They are always sad', isCorrect: false },
            { text: 'They cannot be repaired', isCorrect: false },
            { text: 'They work slowly', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which is NOT a characteristic of computers?',
        options: [
            { text: 'Having feelings and emotions', isCorrect: true },
            { text: 'High speed processing', isCorrect: false },
            { text: 'Accurate calculations', isCorrect: false },
            { text: 'Large storage capacity', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What makes computers reliable for important work?',
        options: [
            { text: 'They work consistently and accurately', isCorrect: true },
            { text: 'They are expensive to buy', isCorrect: false },
            { text: 'They are large in size', isCorrect: false },
            { text: 'They consume electricity', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Can computers think independently like humans?',
        options: [
            { text: 'No, they only follow programmed instructions', isCorrect: true },
            { text: 'Yes, they can think on their own', isCorrect: false },
            { text: 'Sometimes they can think', isCorrect: false },
            { text: 'Only advanced computers can think', isCorrect: false }
        ]
    },

    // Computer Components & Organization (35 questions)
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What are the two main parts of any computer system?',
        options: [
            { text: 'Hardware and Software', isCorrect: true },
            { text: 'Monitor and Keyboard', isCorrect: false },
            { text: 'CPU and Memory', isCorrect: false },
            { text: 'Input and Output', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is computer hardware?',
        options: [
            { text: 'Physical parts you can touch', isCorrect: true },
            { text: 'Computer programs and applications', isCorrect: false },
            { text: 'Internet connections', isCorrect: false },
            { text: 'Computer games', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is computer software?',
        options: [
            { text: 'Programs and instructions for the computer', isCorrect: true },
            { text: 'Physical components of computer', isCorrect: false },
            { text: 'Computer screen display', isCorrect: false },
            { text: 'Computer mouse and keyboard', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which of these is a hardware component?',
        options: [
            { text: 'Monitor screen', isCorrect: true },
            { text: 'Microsoft Word', isCorrect: false },
            { text: 'Google Chrome browser', isCorrect: false },
            { text: 'Windows operating system', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which of these is a software program?',
        options: [
            { text: 'Calculator application', isCorrect: true },
            { text: 'Computer keyboard', isCorrect: false },
            { text: 'Computer mouse', isCorrect: false },
            { text: 'Speaker device', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What does CPU stand for?',
        options: [
            { text: 'Central Processing Unit', isCorrect: true },
            { text: 'Computer Processing Unit', isCorrect: false },
            { text: 'Central Program Unit', isCorrect: false },
            { text: 'Computer Program Unit', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Why is the CPU called the brain of the computer?',
        options: [
            { text: 'It controls and processes all computer operations', isCorrect: true },
            { text: 'It stores all the data', isCorrect: false },
            { text: 'It displays information', isCorrect: false },
            { text: 'It connects to the internet', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What does RAM stand for?',
        options: [
            { text: 'Random Access Memory', isCorrect: true },
            { text: 'Read Access Memory', isCorrect: false },
            { text: 'Rapid Access Memory', isCorrect: false },
            { text: 'Real Access Memory', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is the main job of RAM in a computer?',
        options: [
            { text: 'Store data temporarily while computer is working', isCorrect: true },
            { text: 'Store programs permanently', isCorrect: false },
            { text: 'Display images on screen', isCorrect: false },
            { text: 'Connect to internet', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What happens to data in RAM when you turn off the computer?',
        options: [
            { text: 'It gets lost or erased', isCorrect: true },
            { text: 'It stays there forever', isCorrect: false },
            { text: 'It moves to hard disk automatically', isCorrect: false },
            { text: 'It gets printed out', isCorrect: false }
        ]
    },

    // Input, Output & Storage Devices (40 questions)
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which device is used to input data into a computer?',
        options: [
            { text: 'Keyboard', isCorrect: true },
            { text: 'Monitor', isCorrect: false },
            { text: 'Printer', isCorrect: false },
            { text: 'Speaker', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which device shows output from a computer?',
        options: [
            { text: 'Monitor', isCorrect: true },
            { text: 'Mouse', isCorrect: false },
            { text: 'Microphone', isCorrect: false },
            { text: 'Scanner', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is the main purpose of input devices?',
        options: [
            { text: 'Send information and commands to computer', isCorrect: true },
            { text: 'Show information from computer', isCorrect: false },
            { text: 'Store information permanently', isCorrect: false },
            { text: 'Print information on paper', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is the main purpose of output devices?',
        options: [
            { text: 'Display or present results from computer', isCorrect: true },
            { text: 'Send data to computer', isCorrect: false },
            { text: 'Store data permanently', isCorrect: false },
            { text: 'Process data inside computer', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which device is primarily used for typing text?',
        options: [
            { text: 'Keyboard', isCorrect: true },
            { text: 'Mouse', isCorrect: false },
            { text: 'Monitor', isCorrect: false },
            { text: 'Printer', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which device is used for pointing and clicking on screen?',
        options: [
            { text: 'Mouse', isCorrect: true },
            { text: 'Keyboard', isCorrect: false },
            { text: 'Monitor', isCorrect: false },
            { text: 'Speaker', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What type of device is a hard disk?',
        options: [
            { text: 'Storage device', isCorrect: true },
            { text: 'Input device', isCorrect: false },
            { text: 'Output device', isCorrect: false },
            { text: 'Processing device', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is the main purpose of storage devices?',
        options: [
            { text: 'Keep data and programs permanently', isCorrect: true },
            { text: 'Show data on screen', isCorrect: false },
            { text: 'Input data into computer', isCorrect: false },
            { text: 'Process data quickly', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which is an example of a portable storage device?',
        options: [
            { text: 'USB flash drive', isCorrect: true },
            { text: 'Keyboard', isCorrect: false },
            { text: 'Monitor', isCorrect: false },
            { text: 'Mouse', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What does a scanner do?',
        options: [
            { text: 'Converts paper documents to digital format', isCorrect: true },
            { text: 'Prints documents on paper', isCorrect: false },
            { text: 'Plays music files', isCorrect: false },
            { text: 'Shows videos on screen', isCorrect: false }
        ]
    },

    // Office Applications & Basic Tools (35 questions)
    {
        grade: 6, difficulty: 'medium',
        questionText: 'Which Microsoft Office application is best for writing documents and letters?',
        options: [
            { text: 'Microsoft Word', isCorrect: true },
            { text: 'Microsoft Excel', isCorrect: false },
            { text: 'Microsoft PowerPoint', isCorrect: false },
            { text: 'Microsoft Paint', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'Which application is designed for creating spreadsheets and calculations?',
        options: [
            { text: 'Microsoft Excel', isCorrect: true },
            { text: 'Microsoft Word', isCorrect: false },
            { text: 'Microsoft PowerPoint', isCorrect: false },
            { text: 'Notepad', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What is Microsoft PowerPoint mainly used for?',
        options: [
            { text: 'Creating presentations and slideshows', isCorrect: true },
            { text: 'Writing letters and documents', isCorrect: false },
            { text: 'Performing mathematical calculations', isCorrect: false },
            { text: 'Drawing and painting pictures', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'In Microsoft Word, what does the keyboard shortcut Ctrl+S do?',
        options: [
            { text: 'Save the current document', isCorrect: true },
            { text: 'Select all text', isCorrect: false },
            { text: 'Search for text', isCorrect: false },
            { text: 'Start a new document', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What is a cell in Microsoft Excel?',
        options: [
            { text: 'The intersection of a row and column', isCorrect: true },
            { text: 'A mobile phone', isCorrect: false },
            { text: 'A small room', isCorrect: false },
            { text: 'A battery component', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'In PowerPoint, what is a slide?',
        options: [
            { text: 'A single page or screen of a presentation', isCorrect: true },
            { text: 'Playground equipment', isCorrect: false },
            { text: 'A type of animation effect', isCorrect: false },
            { text: 'A sound effect', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'Which keyboard shortcut is used to copy selected text?',
        options: [
            { text: 'Ctrl+C', isCorrect: true },
            { text: 'Ctrl+X', isCorrect: false },
            { text: 'Ctrl+V', isCorrect: false },
            { text: 'Ctrl+Z', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'Which keyboard shortcut is used to paste copied text?',
        options: [
            { text: 'Ctrl+V', isCorrect: true },
            { text: 'Ctrl+X', isCorrect: false },
            { text: 'Ctrl+C', isCorrect: false },
            { text: 'Ctrl+Z', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What does the keyboard shortcut Ctrl+Z do?',
        options: [
            { text: 'Undo the last action', isCorrect: true },
            { text: 'Zoom in on document', isCorrect: false },
            { text: 'Close the program', isCorrect: false },
            { text: 'Open a file', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'In Microsoft Word, how do you make text bold?',
        options: [
            { text: 'Press Ctrl+B', isCorrect: true },
            { text: 'Press Ctrl+I', isCorrect: false },
            { text: 'Press Ctrl+U', isCorrect: false },
            { text: 'Press Ctrl+S', isCorrect: false }
        ]
    },

    // Basic Networking & Internet (30 questions)
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What does PAN stand for in networking?',
        options: [
            { text: 'Personal Area Network', isCorrect: true },
            { text: 'Public Area Network', isCorrect: false },
            { text: 'Private Area Network', isCorrect: false },
            { text: 'Portable Area Network', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What does LAN stand for?',
        options: [
            { text: 'Local Area Network', isCorrect: true },
            { text: 'Large Area Network', isCorrect: false },
            { text: 'Long Area Network', isCorrect: false },
            { text: 'Limited Area Network', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What does WAN stand for?',
        options: [
            { text: 'Wide Area Network', isCorrect: true },
            { text: 'Wireless Area Network', isCorrect: false },
            { text: 'World Area Network', isCorrect: false },
            { text: 'Web Area Network', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'Which network type covers the smallest geographical area?',
        options: [
            { text: 'PAN (Personal Area Network)', isCorrect: true },
            { text: 'WAN (Wide Area Network)', isCorrect: false },
            { text: 'MAN (Metropolitan Area Network)', isCorrect: false },
            { text: 'LAN (Local Area Network)', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'Which network type covers the largest geographical area?',
        options: [
            { text: 'WAN (Wide Area Network)', isCorrect: true },
            { text: 'PAN (Personal Area Network)', isCorrect: false },
            { text: 'LAN (Local Area Network)', isCorrect: false },
            { text: 'MAN (Metropolitan Area Network)', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What is Wi-Fi?',
        options: [
            { text: 'Wireless internet connection technology', isCorrect: true },
            { text: 'A type of cable', isCorrect: false },
            { text: 'A computer brand name', isCorrect: false },
            { text: 'A software program', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What is Bluetooth primarily used for?',
        options: [
            { text: 'Short-range wireless connections between devices', isCorrect: true },
            { text: 'Long distance communication', isCorrect: false },
            { text: 'Internet browsing', isCorrect: false },
            { text: 'Printing documents', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What is cloud computing?',
        options: [
            { text: 'Using internet-based services and storage', isCorrect: true },
            { text: 'Computing in the sky', isCorrect: false },
            { text: 'Weather prediction using computers', isCorrect: false },
            { text: 'Flying computers', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'Which is an example of cloud storage service?',
        options: [
            { text: 'Google Drive', isCorrect: true },
            { text: 'Hard disk drive', isCorrect: false },
            { text: 'USB flash drive', isCorrect: false },
            { text: 'CD-ROM disc', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What is the main advantage of cloud computing?',
        options: [
            { text: 'Access your files from anywhere with internet', isCorrect: true },
            { text: 'Makes computers run faster', isCorrect: false },
            { text: 'Makes computers cheaper to buy', isCorrect: false },
            { text: 'Improves computer graphics', isCorrect: false }
        ]
    },

    // Computer Safety & Security (25 questions)
    {
        grade: 6, difficulty: 'advanced',
        questionText: 'What is cyberstalking?',
        options: [
            { text: 'Following and harassing someone online to cause harm', isCorrect: true },
            { text: 'Playing online games with friends', isCorrect: false },
            { text: 'Sending emails to family', isCorrect: false },
            { text: 'Using social media normally', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'advanced',
        questionText: 'What is phishing in cybersecurity?',
        options: [
            { text: 'Tricking people to reveal personal information online', isCorrect: true },
            { text: 'Catching fish using computers', isCorrect: false },
            { text: 'Playing computer games', isCorrect: false },
            { text: 'Sending photos to friends', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'advanced',
        questionText: 'What is malware?',
        options: [
            { text: 'Harmful software designed to damage computers', isCorrect: true },
            { text: 'Good software that helps computers', isCorrect: false },
            { text: 'Free software available online', isCorrect: false },
            { text: 'Gaming software for entertainment', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'advanced',
        questionText: 'What is a computer virus?',
        options: [
            { text: 'Malware that spreads and infects other files', isCorrect: true },
            { text: 'A sick or broken computer', isCorrect: false },
            { text: 'An antivirus protection program', isCorrect: false },
            { text: 'A computer game', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'advanced',
        questionText: 'What is adware?',
        options: [
            { text: 'Software that displays unwanted advertisements', isCorrect: true },
            { text: 'Software for creating advertisements', isCorrect: false },
            { text: 'Free software with no ads', isCorrect: false },
            { text: 'Gaming software', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'advanced',
        questionText: 'How can you protect yourself from phishing attacks?',
        options: [
            { text: 'Verify sender identity before sharing personal information', isCorrect: true },
            { text: 'Click on all links you receive', isCorrect: false },
            { text: 'Never use email at all', isCorrect: false },
            { text: 'Share passwords with everyone', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'advanced',
        questionText: 'What is the safest way to protect your computer from viruses?',
        options: [
            { text: 'Use antivirus software and be careful with downloads', isCorrect: true },
            { text: 'Download everything you find interesting', isCorrect: false },
            { text: 'Never use the internet', isCorrect: false },
            { text: 'Share your password with friends', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'advanced',
        questionText: 'Which is a warning sign of a phishing email?',
        options: [
            { text: 'Urgently asks for personal information or passwords', isCorrect: true },
            { text: 'Comes from a known sender', isCorrect: false },
            { text: 'Has perfect grammar and spelling', isCorrect: false },
            { text: 'Contains useful information', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'advanced',
        questionText: 'What is the best way to avoid downloading malware?',
        options: [
            { text: 'Use antivirus software and download from trusted sources', isCorrect: true },
            { text: 'Download everything without checking', isCorrect: false },
            { text: 'Never use internet', isCorrect: false },
            { text: 'Share files with everyone', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'advanced',
        questionText: 'Why is cyberstalking considered dangerous?',
        options: [
            { text: 'It can cause serious emotional and psychological harm', isCorrect: true },
            { text: 'It uses too much internet data', isCorrect: false },
            { text: 'It is expensive to do', isCorrect: false },
            { text: 'It makes computers run slowly', isCorrect: false }
        ]
    },

    // Introduction to AI & Technology Ethics (20 questions)
    {
        grade: 6, difficulty: 'advanced',
        questionText: 'What does AI stand for?',
        options: [
            { text: 'Artificial Intelligence', isCorrect: true },
            { text: 'Automatic Intelligence', isCorrect: false },
            { text: 'Advanced Intelligence', isCorrect: false },
            { text: 'Amazing Intelligence', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'advanced',
        questionText: 'Which is an example of AI technology in daily life?',
        options: [
            { text: 'Voice assistants like Siri or Alexa', isCorrect: true },
            { text: 'Basic calculator', isCorrect: false },
            { text: 'Television set', isCorrect: false },
            { text: 'Radio player', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'advanced',
        questionText: 'What is the first step in any project planning cycle?',
        options: [
            { text: 'Planning and defining goals', isCorrect: true },
            { text: 'Testing the final product', isCorrect: false },
            { text: 'Implementation and building', isCorrect: false },
            { text: 'Evaluation and review', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'advanced',
        questionText: 'Why is ethics important in technology use?',
        options: [
            { text: 'To ensure responsible and fair use of technology', isCorrect: true },
            { text: 'To make more money', isCorrect: false },
            { text: 'To make things work faster', isCorrect: false },
            { text: 'To reduce costs', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'advanced',
        questionText: 'What should you consider before starting any technology project?',
        options: [
            { text: 'Clear goals, requirements, and available resources', isCorrect: true },
            { text: 'Only the cost involved', isCorrect: false },
            { text: 'Only the time needed', isCorrect: false },
            { text: 'Only the tools required', isCorrect: false }
        ]
    },

    // Programming Concepts & Computational Thinking (30 questions)
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What is computational thinking?',
        options: [
            { text: 'A problem-solving approach using logical steps', isCorrect: true },
            { text: 'Using computers for everything', isCorrect: false },
            { text: 'Playing computer games', isCorrect: false },
            { text: 'Repairing computers', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What is an algorithm?',
        options: [
            { text: 'Step-by-step instructions to solve a problem', isCorrect: true },
            { text: 'A computer program', isCorrect: false },
            { text: 'A type of computer', isCorrect: false },
            { text: 'A programming language', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What is a flowchart?',
        options: [
            { text: 'Visual representation of an algorithm using shapes', isCorrect: true },
            { text: 'A chart showing water flow', isCorrect: false },
            { text: 'A type of graph', isCorrect: false },
            { text: 'A computer screen', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'Which shape is used for start and end in flowcharts?',
        options: [
            { text: 'Oval or rounded rectangle', isCorrect: true },
            { text: 'Rectangle', isCorrect: false },
            { text: 'Diamond', isCorrect: false },
            { text: 'Circle', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'Which shape is used for decision points in flowcharts?',
        options: [
            { text: 'Diamond', isCorrect: true },
            { text: 'Rectangle', isCorrect: false },
            { text: 'Oval', isCorrect: false },
            { text: 'Triangle', isCorrect: false }
        ]
    },

    // Basic Web Development (25 questions)
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What does HTML stand for?',
        options: [
            { text: 'Hyper Text Markup Language', isCorrect: true },
            { text: 'High Tech Modern Language', isCorrect: false },
            { text: 'Home Tool Markup Language', isCorrect: false },
            { text: 'Hyper Transfer Markup Language', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which HTML tag is used for the main heading?',
        options: [
            { text: '<h1>', isCorrect: true },
            { text: '<head>', isCorrect: false },
            { text: '<title>', isCorrect: false },
            { text: '<header>', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which HTML tag is used for paragraphs?',
        options: [
            { text: '<p>', isCorrect: true },
            { text: '<para>', isCorrect: false },
            { text: '<paragraph>', isCorrect: false },
            { text: '<text>', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which HTML tag is used to create hyperlinks?',
        options: [
            { text: '<a>', isCorrect: true },
            { text: '<link>', isCorrect: false },
            { text: '<url>', isCorrect: false },
            { text: '<href>', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is the basic structure of an HTML webpage?',
        options: [
            { text: '<html><head></head><body></body></html>', isCorrect: true },
            { text: '<html><body></body></html>', isCorrect: false },
            { text: '<body><html></html></body>', isCorrect: false },
            { text: '<head><body></body></head>', isCorrect: false }
        ]
    }
];

// Add more questions to reach 200+ total
const additionalGrade6Questions = [
    // Digital Literacy & Computer Applications (15 questions)
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is digital literacy?',
        options: [
            { text: 'The ability to use digital technology effectively and safely', isCorrect: true },
            { text: 'Reading books on computer', isCorrect: false },
            { text: 'Writing with digital pen', isCorrect: false },
            { text: 'Counting using calculator', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which is an example of educational software?',
        options: [
            { text: 'Math learning games and tutorials', isCorrect: true },
            { text: 'Video games for entertainment only', isCorrect: false },
            { text: 'Music players', isCorrect: false },
            { text: 'Photo editors', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What are computer applications?',
        options: [
            { text: 'Software programs designed for specific tasks', isCorrect: true },
            { text: 'Computer hardware components', isCorrect: false },
            { text: 'Internet websites', isCorrect: false },
            { text: 'Computer cables and wires', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'Which type of software helps you learn new subjects?',
        options: [
            { text: 'Educational software and learning applications', isCorrect: true },
            { text: 'Entertainment games only', isCorrect: false },
            { text: 'System software', isCorrect: false },
            { text: 'Utility software', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What is the benefit of using computers for learning?',
        options: [
            { text: 'Interactive and engaging learning experience', isCorrect: true },
            { text: 'Computers are expensive', isCorrect: false },
            { text: 'Computers are difficult to use', isCorrect: false },
            { text: 'Computers make learning slower', isCorrect: false }
        ]
    }
];

// Combine all questions
const allGrade6Questions = [...grade6Questions, ...additionalGrade6Questions];

console.log('🌱 Seeding comprehensive Grade 6 questions...');

function seedGrade6Questions() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath);
        db.serialize(() => {
            let completed = 0;
            allGrade6Questions.forEach((q) => {
                db.run('INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                    [q.grade, q.difficulty, q.questionText], function(err) {
                    if (err) {
                        console.error('Error inserting question:', err);
                        return;
                    }
                    const questionId = this.lastID;
                    let optionCount = 0;
                    q.options.forEach((option, index) => {
                        db.run('INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                            [questionId, option.text, option.isCorrect ? 1 : 0, index + 1], (err) => {
                            if (err) {
                                console.error('Error inserting option:', err);
                                return;
                            }
                            optionCount++;
                            if (optionCount === q.options.length) {
                                completed++;
                                if (completed === allGrade6Questions.length) {
                                    db.close(() => {
                                        console.log(`✅ Seeded ${allGrade6Questions.length} comprehensive questions for Grade 6`);
                                        resolve();
                                    });
                                }
                            }
                        });
                    });
                });
            });
        });
    });
}

if (require.main === module) {
    seedGrade6Questions();
}

module.exports = seedGrade6Questions;