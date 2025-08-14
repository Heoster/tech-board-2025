const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../database/mcq_system.db');

// Grade 6 Computer Science - Improved Unique Questions (100 questions)
const grade6Questions = [
    // Computer Fundamentals (20 questions)
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
    {
        grade: 6, difficulty: 'medium',
        questionText: 'Why are computers considered universal machines?',
        options: [
            { text: 'They can be programmed to solve many different problems', isCorrect: true },
            { text: 'They are used everywhere in the world', isCorrect: false },
            { text: 'They all look the same', isCorrect: false },
            { text: 'They use the same operating system', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What happens when you give wrong instructions to a computer?',
        options: [
            { text: 'It will follow the wrong instructions exactly', isCorrect: true },
            { text: 'It will correct the instructions automatically', isCorrect: false },
            { text: 'It will refuse to work', isCorrect: false },
            { text: 'It will ask for help', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'Which generation of computers used vacuum tubes?',
        options: [
            { text: 'First generation', isCorrect: true },
            { text: 'Second generation', isCorrect: false },
            { text: 'Third generation', isCorrect: false },
            { text: 'Fourth generation', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What technology replaced vacuum tubes in second generation computers?',
        options: [
            { text: 'Transistors', isCorrect: true },
            { text: 'Integrated circuits', isCorrect: false },
            { text: 'Microprocessors', isCorrect: false },
            { text: 'Optical fibers', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which type of computer is small enough to fit on a desk?',
        options: [
            { text: 'Personal computer or desktop', isCorrect: true },
            { text: 'Mainframe computer', isCorrect: false },
            { text: 'Supercomputer', isCorrect: false },
            { text: 'Server computer', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What type of computer can you carry in your hand?',
        options: [
            { text: 'Smartphone or tablet', isCorrect: true },
            { text: 'Desktop computer', isCorrect: false },
            { text: 'Laptop computer', isCorrect: false },
            { text: 'Server computer', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'Which type of computer is used for complex scientific calculations?',
        options: [
            { text: 'Supercomputer', isCorrect: true },
            { text: 'Personal computer', isCorrect: false },
            { text: 'Tablet computer', isCorrect: false },
            { text: 'Gaming console', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What do we call a computer that provides services to other computers?',
        options: [
            { text: 'Server', isCorrect: true },
            { text: 'Client', isCorrect: false },
            { text: 'Router', isCorrect: false },
            { text: 'Switch', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'Which computer component determines how fast your computer processes information?',
        options: [
            { text: 'Processor speed (CPU)', isCorrect: true },
            { text: 'Hard disk size', isCorrect: false },
            { text: 'Monitor size', isCorrect: false },
            { text: 'Number of USB ports', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is the main difference between analog and digital computers?',
        options: [
            { text: 'Analog works with continuous data, digital works with discrete data', isCorrect: true },
            { text: 'Analog is newer than digital', isCorrect: false },
            { text: 'Analog is faster than digital', isCorrect: false },
            { text: 'Analog uses more electricity', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'Why do we use binary system in digital computers?',
        options: [
            { text: 'Electronic circuits can easily represent two states: on and off', isCorrect: true },
            { text: 'Binary numbers are easier to read', isCorrect: false },
            { text: 'Binary system uses less memory', isCorrect: false },
            { text: 'Binary was invented first', isCorrect: false }
        ]
    },

    // Hardware Components (20 questions)
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
        questionText: 'What is the main job of memory (RAM) in a computer?',
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
    {
        grade: 6, difficulty: 'medium',
        questionText: 'Which component connects all parts of the computer together?',
        options: [
            { text: 'Motherboard', isCorrect: true },
            { text: 'Power supply', isCorrect: false },
            { text: 'Hard disk', isCorrect: false },
            { text: 'Graphics card', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What provides electrical power to all computer components?',
        options: [
            { text: 'Power Supply Unit (PSU)', isCorrect: true },
            { text: 'Motherboard', isCorrect: false },
            { text: 'Hard disk', isCorrect: false },
            { text: 'RAM memory', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'Which component is responsible for displaying graphics and images?',
        options: [
            { text: 'Graphics card or GPU', isCorrect: true },
            { text: 'Sound card', isCorrect: false },
            { text: 'Network card', isCorrect: false },
            { text: 'Hard disk', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is the purpose of a computer case or cabinet?',
        options: [
            { text: 'Protect internal components and provide ventilation', isCorrect: true },
            { text: 'Make the computer look attractive', isCorrect: false },
            { text: 'Increase computer speed', isCorrect: false },
            { text: 'Store data permanently', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'Why do computers need cooling fans?',
        options: [
            { text: 'To prevent components from overheating', isCorrect: true },
            { text: 'To make noise so you know it is working', isCorrect: false },
            { text: 'To blow dust away from the desk', isCorrect: false },
            { text: 'To help the computer run faster', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is the difference between ROM and RAM?',
        options: [
            { text: 'ROM stores permanent data, RAM stores temporary data', isCorrect: true },
            { text: 'ROM is faster than RAM', isCorrect: false },
            { text: 'ROM is larger than RAM', isCorrect: false },
            { text: 'ROM is more expensive than RAM', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What type of memory is used to store the computer startup instructions?',
        options: [
            { text: 'ROM (Read Only Memory)', isCorrect: true },
            { text: 'RAM (Random Access Memory)', isCorrect: false },
            { text: 'Hard disk drive', isCorrect: false },
            { text: 'Cache memory', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which storage device spins at high speed to read and write data?',
        options: [
            { text: 'Hard disk drive (HDD)', isCorrect: true },
            { text: 'Solid state drive (SSD)', isCorrect: false },
            { text: 'USB flash drive', isCorrect: false },
            { text: 'CD-ROM drive', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What is the advantage of SSD over traditional hard disk?',
        options: [
            { text: 'Faster data access and no moving parts', isCorrect: true },
            { text: 'Cheaper to manufacture', isCorrect: false },
            { text: 'Stores more data', isCorrect: false },
            { text: 'Uses more electricity', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What connects your computer to the internet through cables?',
        options: [
            { text: 'Ethernet port or network card', isCorrect: true },
            { text: 'USB port', isCorrect: false },
            { text: 'Audio jack', isCorrect: false },
            { text: 'Power port', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which port is commonly used to connect external devices like mouse and keyboard?',
        options: [
            { text: 'USB port', isCorrect: true },
            { text: 'Ethernet port', isCorrect: false },
            { text: 'Audio jack', isCorrect: false },
            { text: 'Power port', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What is the purpose of cache memory in a computer?',
        options: [
            { text: 'Store frequently used data for faster access', isCorrect: true },
            { text: 'Store data permanently', isCorrect: false },
            { text: 'Display images on screen', isCorrect: false },
            { text: 'Connect to the internet', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which component processes sound and audio in a computer?',
        options: [
            { text: 'Sound card or audio chip', isCorrect: true },
            { text: 'Graphics card', isCorrect: false },
            { text: 'Network card', isCorrect: false },
            { text: 'Hard disk', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What is the function of BIOS in a computer?',
        options: [
            { text: 'Initialize hardware and start the operating system', isCorrect: true },
            { text: 'Store user files and documents', isCorrect: false },
            { text: 'Connect to the internet', isCorrect: false },
            { text: 'Display graphics on screen', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What do we call the main circuit board that holds all computer components?',
        options: [
            { text: 'Motherboard', isCorrect: true },
            { text: 'Fatherboard', isCorrect: false },
            { text: 'Mainboard', isCorrect: false },
            { text: 'Systemboard', isCorrect: false }
        ]
    },

    // Input/Output Devices (15 questions)
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
        questionText: 'What does a scanner do?',
        options: [
            { text: 'Converts paper documents to digital format', isCorrect: true },
            { text: 'Prints documents on paper', isCorrect: false },
            { text: 'Plays music files', isCorrect: false },
            { text: 'Shows videos on screen', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which device converts digital audio to sound you can hear?',
        options: [
            { text: 'Speakers or headphones', isCorrect: true },
            { text: 'Microphone', isCorrect: false },
            { text: 'Webcam', isCorrect: false },
            { text: 'Printer', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is the purpose of a microphone with a computer?',
        options: [
            { text: 'Input voice and sound into the computer', isCorrect: true },
            { text: 'Output sound from the computer', isCorrect: false },
            { text: 'Display images on screen', isCorrect: false },
            { text: 'Print documents', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What type of device is a touchscreen?',
        options: [
            { text: 'Both input and output device', isCorrect: true },
            { text: 'Only input device', isCorrect: false },
            { text: 'Only output device', isCorrect: false },
            { text: 'Storage device', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which device captures video and images for the computer?',
        options: [
            { text: 'Webcam or digital camera', isCorrect: true },
            { text: 'Scanner', isCorrect: false },
            { text: 'Printer', isCorrect: false },
            { text: 'Speaker', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What is the difference between impact and non-impact printers?',
        options: [
            { text: 'Impact printers physically strike paper, non-impact do not', isCorrect: true },
            { text: 'Impact printers are faster', isCorrect: false },
            { text: 'Impact printers use less ink', isCorrect: false },
            { text: 'Impact printers are newer technology', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which printer type uses ink cartridges to spray tiny droplets?',
        options: [
            { text: 'Inkjet printer', isCorrect: true },
            { text: 'Laser printer', isCorrect: false },
            { text: 'Dot matrix printer', isCorrect: false },
            { text: '3D printer', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What technology do laser printers use to create images?',
        options: [
            { text: 'Laser beam and toner powder', isCorrect: true },
            { text: 'Liquid ink droplets', isCorrect: false },
            { text: 'Impact pins hitting ribbon', isCorrect: false },
            { text: 'Heated plastic filament', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which device allows you to control computer games more easily?',
        options: [
            { text: 'Joystick or game controller', isCorrect: true },
            { text: 'Printer', isCorrect: false },
            { text: 'Scanner', isCorrect: false },
            { text: 'Webcam', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What is a graphics tablet used for?',
        options: [
            { text: 'Drawing and designing with a special pen', isCorrect: true },
            { text: 'Playing video games', isCorrect: false },
            { text: 'Typing text documents', isCorrect: false },
            { text: 'Listening to music', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which device reads barcodes at stores?',
        options: [
            { text: 'Barcode scanner', isCorrect: true },
            { text: 'Document scanner', isCorrect: false },
            { text: 'Webcam', isCorrect: false },
            { text: 'Printer', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What is the advantage of wireless input devices?',
        options: [
            { text: 'No cables needed, more freedom of movement', isCorrect: true },
            { text: 'They work faster than wired devices', isCorrect: false },
            { text: 'They are cheaper than wired devices', isCorrect: false },
            { text: 'They never need batteries', isCorrect: false }
        ]
    },

    // Software and Applications (15 questions)
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
        questionText: 'Which Microsoft Office application is best for writing documents?',
        options: [
            { text: 'Microsoft Word', isCorrect: true },
            { text: 'Microsoft Excel', isCorrect: false },
            { text: 'Microsoft PowerPoint', isCorrect: false },
            { text: 'Microsoft Paint', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which application is designed for creating spreadsheets and calculations?',
        options: [
            { text: 'Microsoft Excel', isCorrect: true },
            { text: 'Microsoft Word', isCorrect: false },
            { text: 'Microsoft PowerPoint', isCorrect: false },
            { text: 'Notepad', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
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
        questionText: 'What is the difference between system software and application software?',
        options: [
            { text: 'System software manages computer, application software helps users do tasks', isCorrect: true },
            { text: 'System software is newer than application software', isCorrect: false },
            { text: 'System software is more expensive', isCorrect: false },
            { text: 'System software is easier to use', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is an operating system?',
        options: [
            { text: 'Software that manages all computer resources and other programs', isCorrect: true },
            { text: 'A type of computer game', isCorrect: false },
            { text: 'A word processing program', isCorrect: false },
            { text: 'A web browser', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which of these is an example of an operating system?',
        options: [
            { text: 'Windows 11', isCorrect: true },
            { text: 'Microsoft Word', isCorrect: false },
            { text: 'Google Chrome', isCorrect: false },
            { text: 'Adobe Photoshop', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What is a device driver?',
        options: [
            { text: 'Software that helps the operating system communicate with hardware', isCorrect: true },
            { text: 'A person who drives computer equipment', isCorrect: false },
            { text: 'A tool for repairing computers', isCorrect: false },
            { text: 'A type of computer virus', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is a web browser used for?',
        options: [
            { text: 'Accessing and viewing websites on the internet', isCorrect: true },
            { text: 'Creating documents and letters', isCorrect: false },
            { text: 'Playing music and videos', isCorrect: false },
            { text: 'Editing photos and images', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which of these is a popular web browser?',
        options: [
            { text: 'Google Chrome', isCorrect: true },
            { text: 'Microsoft Word', isCorrect: false },
            { text: 'Adobe Photoshop', isCorrect: false },
            { text: 'Windows Media Player', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What is the purpose of antivirus software?',
        options: [
            { text: 'Protect computer from harmful programs and viruses', isCorrect: true },
            { text: 'Speed up internet connection', isCorrect: false },
            { text: 'Create backup copies of files', isCorrect: false },
            { text: 'Edit photos and videos', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is a file extension?',
        options: [
            { text: 'Letters after the dot in filename that show file type', isCorrect: true },
            { text: 'The size of the file', isCorrect: false },
            { text: 'The date the file was created', isCorrect: false },
            { text: 'The location where file is stored', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which file extension is used for text documents?',
        options: [
            { text: '.txt or .docx', isCorrect: true },
            { text: '.jpg or .png', isCorrect: false },
            { text: '.mp3 or .wav', isCorrect: false },
            { text: '.exe or .msi', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What happens when you install software on a computer?',
        options: [
            { text: 'Program files are copied to computer and configured to run', isCorrect: true },
            { text: 'Computer becomes faster', isCorrect: false },
            { text: 'Computer memory increases', isCorrect: false },
            { text: 'Internet speed improves', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is the purpose of a media player software?',
        options: [
            { text: 'Play audio and video files', isCorrect: true },
            { text: 'Create documents', isCorrect: false },
            { text: 'Browse the internet', isCorrect: false },
            { text: 'Edit spreadsheets', isCorrect: false }
        ]
    },

    // Basic Networking (10 questions)
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is a computer network?',
        options: [
            { text: 'Two or more computers connected to share resources', isCorrect: true },
            { text: 'A single computer with many programs', isCorrect: false },
            { text: 'A computer repair service', isCorrect: false },
            { text: 'A computer game with multiple players', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is the internet?',
        options: [
            { text: 'A global network connecting millions of computers worldwide', isCorrect: true },
            { text: 'A single very large computer', isCorrect: false },
            { text: 'A computer program', isCorrect: false },
            { text: 'A type of computer hardware', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is Wi-Fi?',
        options: [
            { text: 'Wireless internet connection technology', isCorrect: true },
            { text: 'A type of cable', isCorrect: false },
            { text: 'A computer brand name', isCorrect: false },
            { text: 'A software program', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
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
        grade: 6, difficulty: 'basic',
        questionText: 'Which is an example of cloud storage service?',
        options: [
            { text: 'Google Drive', isCorrect: true },
            { text: 'Hard disk drive', isCorrect: false },
            { text: 'USB flash drive', isCorrect: false },
            { text: 'CD-ROM disc', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is email used for?',
        options: [
            { text: 'Sending and receiving electronic messages', isCorrect: true },
            { text: 'Playing computer games', isCorrect: false },
            { text: 'Watching movies', isCorrect: false },
            { text: 'Creating documents', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What does URL stand for?',
        options: [
            { text: 'Uniform Resource Locator', isCorrect: true },
            { text: 'Universal Resource Link', isCorrect: false },
            { text: 'United Resource Location', isCorrect: false },
            { text: 'Unique Resource Locator', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is a website?',
        options: [
            { text: 'A collection of web pages accessible through the internet', isCorrect: true },
            { text: 'A physical location where computers are kept', isCorrect: false },
            { text: 'A type of computer software', isCorrect: false },
            { text: 'A computer hardware component', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What is the difference between internet and intranet?',
        options: [
            { text: 'Internet is public global network, intranet is private organization network', isCorrect: true },
            { text: 'Internet is faster than intranet', isCorrect: false },
            { text: 'Internet is newer than intranet', isCorrect: false },
            { text: 'Internet is more expensive than intranet', isCorrect: false }
        ]
    },

    // Computer Safety and Ethics (10 questions)
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is a strong password?',
        options: [
            { text: 'A password with letters, numbers, and symbols that is hard to guess', isCorrect: true },
            { text: 'A password that is easy to remember like "password"', isCorrect: false },
            { text: 'A password that is very short', isCorrect: false },
            { text: 'A password that uses only your name', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Why should you not share your password with others?',
        options: [
            { text: 'Others could access your personal information and accounts', isCorrect: true },
            { text: 'It makes the password work slower', isCorrect: false },
            { text: 'It uses more internet data', isCorrect: false },
            { text: 'It makes your computer run slower', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What is cyberbullying?',
        options: [
            { text: 'Using technology to hurt, embarrass, or threaten someone', isCorrect: true },
            { text: 'Playing online games with friends', isCorrect: false },
            { text: 'Learning about computers', isCorrect: false },
            { text: 'Using computers for homework', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What should you do if someone online asks for your personal information?',
        options: [
            { text: 'Do not share it and tell a trusted adult', isCorrect: true },
            { text: 'Share it immediately', isCorrect: false },
            { text: 'Ask them why they need it first', isCorrect: false },
            { text: 'Share only some of the information', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is digital footprint?',
        options: [
            { text: 'The trail of information you leave when using digital devices', isCorrect: true },
            { text: 'The size of your computer files', isCorrect: false },
            { text: 'The speed of your internet connection', isCorrect: false },
            { text: 'The number of devices you own', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'Why is it important to respect others online?',
        options: [
            { text: 'Everyone deserves to be treated with kindness and respect', isCorrect: true },
            { text: 'It makes your computer work better', isCorrect: false },
            { text: 'It saves internet data', isCorrect: false },
            { text: 'It makes websites load faster', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What should you do before downloading software from the internet?',
        options: [
            { text: 'Make sure it is from a trusted source and scan for viruses', isCorrect: true },
            { text: 'Download it as quickly as possible', isCorrect: false },
            { text: 'Download multiple versions at once', isCorrect: false },
            { text: 'Share the download link with everyone', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is copyright?',
        options: [
            { text: 'Legal protection for creative works like music, videos, and software', isCorrect: true },
            { text: 'The right to copy anything you want', isCorrect: false },
            { text: 'A type of computer virus', isCorrect: false },
            { text: 'A way to make copies of files', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'Why should you take breaks when using computers for long periods?',
        options: [
            { text: 'To rest your eyes, hands, and maintain good posture', isCorrect: true },
            { text: 'To save electricity', isCorrect: false },
            { text: 'To make the computer run faster', isCorrect: false },
            { text: 'To free up memory space', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is the best way to keep your computer safe from viruses?',
        options: [
            { text: 'Use antivirus software and be careful what you download', isCorrect: true },
            { text: 'Never turn off your computer', isCorrect: false },
            { text: 'Use the computer only at night', isCorrect: false },
            { text: 'Keep the computer in a cold room', isCorrect: false }
        ]
    },

    // Basic Programming Concepts (10 questions)
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is an algorithm?',
        options: [
            { text: 'Step-by-step instructions to solve a problem', isCorrect: true },
            { text: 'A computer program', isCorrect: false },
            { text: 'A type of computer', isCorrect: false },
            { text: 'A programming language', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is a flowchart?',
        options: [
            { text: 'Visual representation of an algorithm using shapes', isCorrect: true },
            { text: 'A chart showing water flow', isCorrect: false },
            { text: 'A type of graph', isCorrect: false },
            { text: 'A computer screen', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which shape is used for start and end in flowcharts?',
        options: [
            { text: 'Oval or rounded rectangle', isCorrect: true },
            { text: 'Rectangle', isCorrect: false },
            { text: 'Diamond', isCorrect: false },
            { text: 'Circle', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'Which shape represents a decision in flowcharts?',
        options: [
            { text: 'Diamond', isCorrect: true },
            { text: 'Rectangle', isCorrect: false },
            { text: 'Oval', isCorrect: false },
            { text: 'Circle', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is a computer program?',
        options: [
            { text: 'A set of instructions written in a programming language', isCorrect: true },
            { text: 'A physical part of the computer', isCorrect: false },
            { text: 'A type of computer game', isCorrect: false },
            { text: 'A computer repair service', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is debugging in programming?',
        options: [
            { text: 'Finding and fixing errors in computer programs', isCorrect: true },
            { text: 'Removing insects from computers', isCorrect: false },
            { text: 'Making programs run faster', isCorrect: false },
            { text: 'Adding new features to programs', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What is a loop in programming?',
        options: [
            { text: 'Instructions that repeat multiple times', isCorrect: true },
            { text: 'A circular computer component', isCorrect: false },
            { text: 'A type of computer cable', isCorrect: false },
            { text: 'A programming error', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is input in programming?',
        options: [
            { text: 'Data that goes into a program', isCorrect: true },
            { text: 'Data that comes out of a program', isCorrect: false },
            { text: 'A programming language', isCorrect: false },
            { text: 'A type of computer', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'basic',
        questionText: 'What is output in programming?',
        options: [
            { text: 'Results that come out of a program', isCorrect: true },
            { text: 'Data that goes into a program', isCorrect: false },
            { text: 'A programming error', isCorrect: false },
            { text: 'A computer component', isCorrect: false }
        ]
    },
    {
        grade: 6, difficulty: 'medium',
        questionText: 'What is the purpose of comments in programming?',
        options: [
            { text: 'Explain what the code does for humans to understand', isCorrect: true },
            { text: 'Make the program run faster', isCorrect: false },
            { text: 'Add colors to the program', isCorrect: false },
            { text: 'Connect to the internet', isCorrect: false }
        ]
    }
];

console.log('🌱 Seeding improved Grade 6 questions...');

function seedImprovedGrade6Questions() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath);
        
        // Clear existing Grade 6 questions
        db.run('DELETE FROM questions WHERE grade = 6', (err) => {
            if (err) {
                console.error('Error clearing existing Grade 6 questions:', err);
                reject(err);
                return;
            }
            
            // Insert new questions
            const stmt = db.prepare(`
                INSERT INTO questions (grade, difficulty, question_text, option_a, option_b, option_c, option_d, correct_answer)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `);
            
            let completed = 0;
            const total = grade6Questions.length;
            
            grade6Questions.forEach((q) => {
                const correctIndex = q.options.findIndex(opt => opt.isCorrect);
                const correctAnswer = ['A', 'B', 'C', 'D'][correctIndex];
                
                stmt.run(
                    q.grade,
                    q.difficulty,
                    q.questionText,
                    q.options[0].text,
                    q.options[1].text,
                    q.options[2].text,
                    q.options[3].text,
                    correctAnswer,
                    (err) => {
                        if (err) {
                            console.error('Error inserting question:', err);
                            reject(err);
                            return;
                        }
                        
                        completed++;
                        if (completed === total) {
                            stmt.finalize();
                            db.close();
                            console.log(`✅ Seeded ${total} improved questions for Grade 6`);
                            resolve();
                        }
                    }
                );
            });
        });
    });
}

module.exports = seedImprovedGrade6Questions;