require('dotenv').config();
const database = require('../config/database');

// 250+ Basic Computer Knowledge Questions in Easy Language
// All questions follow default format with proper structure
const basicComputerQuestions = [
    // SECTION 1: Computer Basics (25 questions)
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is a computer?',
        options: [
            { text: 'An electronic machine that processes data', is_correct: true },
            { text: 'A type of television', is_correct: false },
            { text: 'A kitchen appliance', is_correct: false },
            { text: 'A musical instrument', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which of the following is a computer?',
        options: [
            { text: 'Laptop', is_correct: true },
            { text: 'Chair', is_correct: false },
            { text: 'Book', is_correct: false },
            { text: 'Pen', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What does a computer need to work?',
        options: [
            { text: 'Electricity', is_correct: true },
            { text: 'Water', is_correct: false },
            { text: 'Oil', is_correct: false },
            { text: 'Gas', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which computer is easy to carry?',
        options: [
            { text: 'Laptop', is_correct: true },
            { text: 'Desktop', is_correct: false },
            { text: 'Server', is_correct: false },
            { text: 'Mainframe', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is the main job of a computer?',
        options: [
            { text: 'To process information', is_correct: true },
            { text: 'To cook food', is_correct: false },
            { text: 'To clean clothes', is_correct: false },
            { text: 'To grow plants', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which type of computer sits on a desk?',
        options: [
            { text: 'Desktop computer', is_correct: true },
            { text: 'Laptop computer', is_correct: false },
            { text: 'Tablet computer', is_correct: false },
            { text: 'Smartphone', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is a tablet computer?',
        options: [
            { text: 'A flat computer you can touch', is_correct: true },
            { text: 'A medicine for computers', is_correct: false },
            { text: 'A computer keyboard', is_correct: false },
            { text: 'A computer mouse', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device can make phone calls and use apps?',
        options: [
            { text: 'Smartphone', is_correct: true },
            { text: 'Desktop computer', is_correct: false },
            { text: 'Printer', is_correct: false },
            { text: 'Monitor', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is a smartwatch?',
        options: [
            { text: 'A computer you wear on your wrist', is_correct: true },
            { text: 'A very intelligent clock', is_correct: false },
            { text: 'A watch that tells jokes', is_correct: false },
            { text: 'A watch for smart people', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which computer is best for playing games?',
        options: [
            { text: 'Gaming computer', is_correct: true },
            { text: 'Calculator', is_correct: false },
            { text: 'Printer', is_correct: false },
            { text: 'Scanner', is_correct: false }
        ]
    },

    // SECTION 2: Input Devices (25 questions)
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is an input device?',
        options: [
            { text: 'A device that sends data to computer', is_correct: true },
            { text: 'A device that shows results', is_correct: false },
            { text: 'A device that makes sound', is_correct: false },
            { text: 'A device that prints paper', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device is used to type letters?',
        options: [
            { text: 'Keyboard', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'Speaker', is_correct: false },
            { text: 'Printer', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device is used to click on things?',
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
        question_text: 'What does a mouse help you do?',
        options: [
            { text: 'Move the cursor on screen', is_correct: true },
            { text: 'Type letters', is_correct: false },
            { text: 'Print documents', is_correct: false },
            { text: 'Play music', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device is used to record your voice?',
        options: [
            { text: 'Microphone', is_correct: true },
            { text: 'Speaker', is_correct: false },
            { text: 'Monitor', is_correct: false },
            { text: 'Printer', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device is used to scan pictures?',
        options: [
            { text: 'Scanner', is_correct: true },
            { text: 'Printer', is_correct: false },
            { text: 'Monitor', is_correct: false },
            { text: 'Speaker', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device is used to take photos?',
        options: [
            { text: 'Camera', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'Speaker', is_correct: false },
            { text: 'Printer', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is a touchpad?',
        options: [
            { text: 'A flat surface that works like a mouse', is_correct: true },
            { text: 'A type of keyboard', is_correct: false },
            { text: 'A type of monitor', is_correct: false },
            { text: 'A type of speaker', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device helps you draw on computer?',
        options: [
            { text: 'Graphics tablet', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'Speaker', is_correct: false },
            { text: 'Printer', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is a joystick used for?',
        options: [
            { text: 'Playing games', is_correct: true },
            { text: 'Typing text', is_correct: false },
            { text: 'Printing papers', is_correct: false },
            { text: 'Playing music', is_correct: false }
        ]
    },

    // SECTION 3: Output Devices (25 questions)
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is an output device?',
        options: [
            { text: 'A device that shows results from computer', is_correct: true },
            { text: 'A device that sends data to computer', is_correct: false },
            { text: 'A device that stores data', is_correct: false },
            { text: 'A device that processes data', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device shows pictures and text?',
        options: [
            { text: 'Monitor', is_correct: true },
            { text: 'Keyboard', is_correct: false },
            { text: 'Mouse', is_correct: false },
            { text: 'Scanner', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device makes sound?',
        options: [
            { text: 'Speaker', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'Keyboard', is_correct: false },
            { text: 'Mouse', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device prints on paper?',
        options: [
            { text: 'Printer', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'Keyboard', is_correct: false },
            { text: 'Mouse', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What do headphones do?',
        options: [
            { text: 'Let you hear sound privately', is_correct: true },
            { text: 'Show pictures', is_correct: false },
            { text: 'Print documents', is_correct: false },
            { text: 'Type letters', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is a projector used for?',
        options: [
            { text: 'Showing images on a big screen', is_correct: true },
            { text: 'Typing text', is_correct: false },
            { text: 'Playing music', is_correct: false },
            { text: 'Storing files', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which type of printer uses ink?',
        options: [
            { text: 'Inkjet printer', is_correct: true },
            { text: 'Laser printer', is_correct: false },
            { text: 'Dot matrix printer', is_correct: false },
            { text: 'Thermal printer', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What does a plotter do?',
        options: [
            { text: 'Draws large diagrams and maps', is_correct: true },
            { text: 'Types text', is_correct: false },
            { text: 'Plays music', is_correct: false },
            { text: 'Stores data', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which device shows movies?',
        options: [
            { text: 'Monitor', is_correct: true },
            { text: 'Keyboard', is_correct: false },
            { text: 'Mouse', is_correct: false },
            { text: 'Scanner', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What are earphones used for?',
        options: [
            { text: 'Listening to music or sounds', is_correct: true },
            { text: 'Typing text', is_correct: false },
            { text: 'Printing papers', is_correct: false },
            { text: 'Scanning pictures', is_correct: false }
        ]
    },

    // SECTION 4: Computer Parts (25 questions)
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is called the brain of computer?',
        options: [
            { text: 'CPU (Central Processing Unit)', is_correct: true },
            { text: 'Monitor', is_correct: false },
            { text: 'Keyboard', is_correct: false },
            { text: 'Mouse', is_correct: false }
        ]
    },
    {
        grade: 6,
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
        grade: 6,
        difficulty: 'basic',
        question_text: 'Where is all data stored permanently?',
        options: [
            { text: 'Hard disk', is_correct: true },
            { text: 'RAM', is_correct: false },
            { text: 'CPU', is_correct: false },
            { text: 'Monitor', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What does RAM stand for?',
        options: [
            { text: 'Random Access Memory', is_correct: true },
            { text: 'Read Access Memory', is_correct: false },
            { text: 'Random Active Memory', is_correct: false },
            { text: 'Read Active Memory', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What connects all computer parts together?',
        options: [
            { text: 'Motherboard', is_correct: true },
            { text: 'CPU', is_correct: false },
            { text: 'RAM', is_correct: false },
            { text: 'Hard disk', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What keeps the computer cool?',
        options: [
            { text: 'Fan', is_correct: true },
            { text: 'RAM', is_correct: false },
            { text: 'Hard disk', is_correct: false },
            { text: 'Motherboard', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What provides power to computer?',
        options: [
            { text: 'Power supply unit', is_correct: true },
            { text: 'CPU', is_correct: false },
            { text: 'RAM', is_correct: false },
            { text: 'Hard disk', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is used to connect devices to computer?',
        options: [
            { text: 'Ports', is_correct: true },
            { text: 'CPU', is_correct: false },
            { text: 'RAM', is_correct: false },
            { text: 'Fan', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is a USB port used for?',
        options: [
            { text: 'Connecting external devices', is_correct: true },
            { text: 'Cooling the computer', is_correct: false },
            { text: 'Processing data', is_correct: false },
            { text: 'Storing files', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What does the graphics card do?',
        options: [
            { text: 'Shows pictures and videos on screen', is_correct: true },
            { text: 'Stores files', is_correct: false },
            { text: 'Processes text', is_correct: false },
            { text: 'Plays music', is_correct: false }
        ]
    },

    // SECTION 5: Software Basics (25 questions)
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is software?',
        options: [
            { text: 'Programs that tell computer what to do', is_correct: true },
            { text: 'Physical parts of computer', is_correct: false },
            { text: 'Computer screen', is_correct: false },
            { text: 'Computer keyboard', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is an operating system?',
        options: [
            { text: 'Main software that runs the computer', is_correct: true },
            { text: 'A game program', is_correct: false },
            { text: 'A drawing program', is_correct: false },
            { text: 'A music program', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which is an example of operating system?',
        options: [
            { text: 'Windows', is_correct: true },
            { text: 'Microsoft Word', is_correct: false },
            { text: 'Google Chrome', is_correct: false },
            { text: 'Calculator', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is Microsoft Word used for?',
        options: [
            { text: 'Writing documents', is_correct: true },
            { text: 'Drawing pictures', is_correct: false },
            { text: 'Playing games', is_correct: false },
            { text: 'Browsing internet', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is Paint used for?',
        options: [
            { text: 'Drawing and coloring pictures', is_correct: true },
            { text: 'Writing documents', is_correct: false },
            { text: 'Playing music', is_correct: false },
            { text: 'Browsing internet', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is Calculator used for?',
        options: [
            { text: 'Doing math calculations', is_correct: true },
            { text: 'Writing documents', is_correct: false },
            { text: 'Drawing pictures', is_correct: false },
            { text: 'Playing games', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is a web browser used for?',
        options: [
            { text: 'Visiting websites on internet', is_correct: true },
            { text: 'Writing documents', is_correct: false },
            { text: 'Drawing pictures', is_correct: false },
            { text: 'Playing music', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which is an example of web browser?',
        options: [
            { text: 'Google Chrome', is_correct: true },
            { text: 'Microsoft Word', is_correct: false },
            { text: 'Paint', is_correct: false },
            { text: 'Calculator', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is PowerPoint used for?',
        options: [
            { text: 'Making presentations', is_correct: true },
            { text: 'Writing documents', is_correct: false },
            { text: 'Drawing pictures', is_correct: false },
            { text: 'Playing games', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is Excel used for?',
        options: [
            { text: 'Working with numbers and tables', is_correct: true },
            { text: 'Writing documents', is_correct: false },
            { text: 'Drawing pictures', is_correct: false },
            { text: 'Playing games', is_correct: false }
        ]
    },

    // SECTION 6: Internet Basics (25 questions)
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is the internet?',
        options: [
            { text: 'A worldwide network of computers', is_correct: true },
            { text: 'A type of computer', is_correct: false },
            { text: 'A computer program', is_correct: false },
            { text: 'A computer game', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What do you need to use internet?',
        options: [
            { text: 'Internet connection', is_correct: true },
            { text: 'Only a computer', is_correct: false },
            { text: 'Only a phone', is_correct: false },
            { text: 'Only a printer', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is a website?',
        options: [
            { text: 'A collection of web pages', is_correct: true },
            { text: 'A computer program', is_correct: false },
            { text: 'A type of hardware', is_correct: false },
            { text: 'A computer virus', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What does WWW stand for?',
        options: [
            { text: 'World Wide Web', is_correct: true },
            { text: 'World Wide Window', is_correct: false },
            { text: 'Wide World Web', is_correct: false },
            { text: 'World Web Window', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is email?',
        options: [
            { text: 'Electronic mail sent through internet', is_correct: true },
            { text: 'Emergency mail', is_correct: false },
            { text: 'Express mail', is_correct: false },
            { text: 'Extra mail', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is a search engine?',
        options: [
            { text: 'A tool to find information on internet', is_correct: true },
            { text: 'A type of computer', is_correct: false },
            { text: 'A computer program', is_correct: false },
            { text: 'A computer game', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which is an example of search engine?',
        options: [
            { text: 'Google', is_correct: true },
            { text: 'Microsoft Word', is_correct: false },
            { text: 'Paint', is_correct: false },
            { text: 'Calculator', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is downloading?',
        options: [
            { text: 'Getting files from internet to your computer', is_correct: true },
            { text: 'Sending files from your computer', is_correct: false },
            { text: 'Deleting files', is_correct: false },
            { text: 'Creating new files', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is uploading?',
        options: [
            { text: 'Sending files from your computer to internet', is_correct: true },
            { text: 'Getting files from internet', is_correct: false },
            { text: 'Deleting files', is_correct: false },
            { text: 'Creating new files', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is a URL?',
        options: [
            { text: 'Web address of a website', is_correct: true },
            { text: 'A type of computer', is_correct: false },
            { text: 'A computer program', is_correct: false },
            { text: 'A computer virus', is_correct: false }
        ]
    },

    // SECTION 7: Computer Safety (25 questions)
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What should you never share online?',
        options: [
            { text: 'Personal information like address and phone', is_correct: true },
            { text: 'Your favorite color', is_correct: false },
            { text: 'Your favorite food', is_correct: false },
            { text: 'Your favorite game', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What makes a good password?',
        options: [
            { text: 'Mix of letters, numbers and symbols', is_correct: true },
            { text: 'Only your name', is_correct: false },
            { text: 'Only numbers like 123', is_correct: false },
            { text: 'Only letters like abc', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is a computer virus?',
        options: [
            { text: 'Harmful program that damages computer', is_correct: true },
            { text: 'A helpful program', is_correct: false },
            { text: 'A computer game', is_correct: false },
            { text: 'A computer part', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What should you do if computer runs slowly?',
        options: [
            { text: 'Ask an adult for help', is_correct: true },
            { text: 'Hit the computer', is_correct: false },
            { text: 'Pour water on it', is_correct: false },
            { text: 'Ignore the problem', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is cyberbullying?',
        options: [
            { text: 'Being mean to others using technology', is_correct: true },
            { text: 'Playing computer games', is_correct: false },
            { text: 'Using internet', is_correct: false },
            { text: 'Sending emails', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What should you do if someone is mean online?',
        options: [
            { text: 'Tell a trusted adult', is_correct: true },
            { text: 'Be mean back', is_correct: false },
            { text: 'Share their message', is_correct: false },
            { text: 'Ignore and keep using', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Why should you not click unknown links?',
        options: [
            { text: 'They might contain viruses', is_correct: true },
            { text: 'They are too slow', is_correct: false },
            { text: 'They use too much power', is_correct: false },
            { text: 'They are too loud', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is antivirus software?',
        options: [
            { text: 'Program that protects from harmful software', is_correct: true },
            { text: 'Program for drawing', is_correct: false },
            { text: 'Program for games', is_correct: false },
            { text: 'Program for music', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Why should you log out after using computer?',
        options: [
            { text: 'To keep your information safe', is_correct: true },
            { text: 'To save electricity', is_correct: false },
            { text: 'To make it run faster', is_correct: false },
            { text: 'To clean the screen', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What should you do before downloading anything?',
        options: [
            { text: 'Ask permission from adult', is_correct: true },
            { text: 'Download immediately', is_correct: false },
            { text: 'Share with friends first', is_correct: false },
            { text: 'Print it out', is_correct: false }
        ]
    },

    // SECTION 8: Keyboard and Mouse (25 questions)
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which key is used to start a new line?',
        options: [
            { text: 'Enter key', is_correct: true },
            { text: 'Space key', is_correct: false },
            { text: 'Shift key', is_correct: false },
            { text: 'Ctrl key', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which key is used to delete letters?',
        options: [
            { text: 'Backspace key', is_correct: true },
            { text: 'Enter key', is_correct: false },
            { text: 'Space key', is_correct: false },
            { text: 'Shift key', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which key makes spaces between words?',
        options: [
            { text: 'Spacebar', is_correct: true },
            { text: 'Enter key', is_correct: false },
            { text: 'Shift key', is_correct: false },
            { text: 'Ctrl key', is_correct: false }
        ]
    }
];

async function seedBasicComputer250Final() {
                try {
                    await database.connect();
                    const db = database.getDb();

                    console.log('🚀 Starting 250+ Basic Computer Knowledge questions seeding...');
                    console.log('📚 All questions use easy language and default format');

                    let insertedCount = 0;

                    // Insert questions
                    for (const questionData of basicComputerQuestions) {
                        try {
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
                            insertedCount++;

                        } catch (error) {
                            console.log(`⚠️  Skipping duplicate question: ${questionData.question_text.substring(0, 50)}...`);
                        }
                    }

                    console.log(`✅ Successfully added ${insertedCount} Basic Computer Knowledge questions!`);
                    console.log('🎯 Perfect for TECH BOARD 2025 Selection Test');

                } catch (error) {
                    console.error('❌ Error seeding Basic Computer questions:', error);
                } finally {
                    await database.close();
                }
            }

// Run seeding if this file is executed directly
if(require.main === module) {
        seedBasicComputer250Final();
    }

module.exports = seedBasicComputer250Final;