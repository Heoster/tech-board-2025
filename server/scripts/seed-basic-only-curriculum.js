const database = require('../config/database');

// Helper function to ensure questions are basic level only
const generateBasicQuestionVariations = (baseQuestions, targetCount) => {
    const variations = [];
    const basicPrefixes = [
        '',
        'Which of the following is correct? ',
        'Select the right answer: ',
        'Choose the correct option: ',
        'What is true? ',
        'Identify the correct answer: '
    ];
    
    while (variations.length < targetCount) {
        for (const baseQ of baseQuestions) {
            if (variations.length >= targetCount) break;
            
            // Only add if question is basic (short and simple)
            if (isBasicQuestion(baseQ.question_text)) {
                // Add original question
                variations.push(baseQ);
                
                // Add variations with different prefixes
                for (const prefix of basicPrefixes) {
                    if (variations.length >= targetCount) break;
                    
                    const variation = {
                        ...baseQ,
                        question_text: prefix + baseQ.question_text
                    };
                    
                    // Only add if the variation is still basic
                    if (isBasicQuestion(variation.question_text)) {
                        variations.push(variation);
                    }
                }
            }
        }
    }
    
    return variations.slice(0, targetCount);
};

function isBasicQuestion(questionText) {
    const length = questionText.length;
    const words = questionText.split(' ').length;
    
    // Exclude detailed indicators
    const detailedIndicators = [
        'algorithm', 'complexity', 'binary representation', 'protocol',
        'data structure', 'LIFO', 'FIFO', 'artificial intelligence',
        'machine learning', 'blockchain', 'neural networks', 'IoT',
        'sorting algorithm', 'time complexity', 'space complexity'
    ];
    
    const hasDetailedIndicators = detailedIndicators.some(indicator => 
        questionText.toLowerCase().includes(indicator)
    );
    
    // Keep only basic questions (short, simple, no complex terms)
    return !hasDetailedIndicators && length <= 80 && words <= 12;
}

// Class 6: Basic Questions Only
const generateBasicClass6Questions = () => {
    const baseQuestions = [
        // Computer Parts
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'Which part shows information on screen?',
            options: [
                { text: 'Monitor', is_correct: true },
                { text: 'CPU', is_correct: false },
                { text: 'Keyboard', is_correct: false },
                { text: 'Mouse', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What is the brain of computer?',
            options: [
                { text: 'CPU', is_correct: true },
                { text: 'Monitor', is_correct: false },
                { text: 'Keyboard', is_correct: false },
                { text: 'Printer', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'Which device is used to type?',
            options: [
                { text: 'Keyboard', is_correct: true },
                { text: 'Monitor', is_correct: false },
                { text: 'CPU', is_correct: false },
                { text: 'Printer', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'Which device is used to click?',
            options: [
                { text: 'Mouse', is_correct: true },
                { text: 'Keyboard', is_correct: false },
                { text: 'Monitor', is_correct: false },
                { text: 'CPU', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'Which device prints on paper?',
            options: [
                { text: 'Printer', is_correct: true },
                { text: 'Monitor', is_correct: false },
                { text: 'Mouse', is_correct: false },
                { text: 'Keyboard', is_correct: false }
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

        // Input vs Output
        {
            grade: 6,
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
            grade: 6,
            difficulty: 'basic',
            question_text: 'Which is an output device?',
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
            question_text: 'Mouse is which type of device?',
            options: [
                { text: 'Input device', is_correct: true },
                { text: 'Output device', is_correct: false },
                { text: 'Storage device', is_correct: false },
                { text: 'Processing device', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'Speaker is which type of device?',
            options: [
                { text: 'Output device', is_correct: true },
                { text: 'Input device', is_correct: false },
                { text: 'Storage device', is_correct: false },
                { text: 'Processing device', is_correct: false }
            ]
        },

        // Software Types
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What is system software?',
            options: [
                { text: 'Software that manages computer', is_correct: true },
                { text: 'Software for games', is_correct: false },
                { text: 'Software for drawing', is_correct: false },
                { text: 'Software for music', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What is application software?',
            options: [
                { text: 'Software for specific tasks', is_correct: true },
                { text: 'Software that manages hardware', is_correct: false },
                { text: 'Software that controls CPU', is_correct: false },
                { text: 'Software that manages memory', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'Windows is which type of software?',
            options: [
                { text: 'System software', is_correct: true },
                { text: 'Application software', is_correct: false },
                { text: 'Game software', is_correct: false },
                { text: 'Drawing software', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'Microsoft Word is which type?',
            options: [
                { text: 'Application software', is_correct: true },
                { text: 'System software', is_correct: false },
                { text: 'Hardware', is_correct: false },
                { text: 'Storage device', is_correct: false }
            ]
        },

        // Storage Devices
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'Which stores data permanently?',
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
            question_text: 'What is pen drive used for?',
            options: [
                { text: 'Store and transfer files', is_correct: true },
                { text: 'Display information', is_correct: false },
                { text: 'Type text', is_correct: false },
                { text: 'Print documents', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What does CD stand for?',
            options: [
                { text: 'Compact Disc', is_correct: true },
                { text: 'Computer Disc', is_correct: false },
                { text: 'Central Disc', is_correct: false },
                { text: 'Control Disc', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What does DVD stand for?',
            options: [
                { text: 'Digital Versatile Disc', is_correct: true },
                { text: 'Digital Video Disc', is_correct: false },
                { text: 'Data Video Disc', is_correct: false },
                { text: 'Digital Voice Disc', is_correct: false }
            ]
        },

        // Basic Operations
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What is booting?',
            options: [
                { text: 'Starting the computer', is_correct: true },
                { text: 'Shutting down computer', is_correct: false },
                { text: 'Saving a file', is_correct: false },
                { text: 'Opening an application', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'How to save a file?',
            options: [
                { text: 'Press Ctrl + S', is_correct: true },
                { text: 'Press Ctrl + O', is_correct: false },
                { text: 'Press Ctrl + N', is_correct: false },
                { text: 'Press Ctrl + P', is_correct: false }
            ]
        },

        // Desktop Basics
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What is desktop?',
            options: [
                { text: 'Main screen after starting computer', is_correct: true },
                { text: 'A type of computer', is_correct: false },
                { text: 'A storage device', is_correct: false },
                { text: 'An input device', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What is taskbar?',
            options: [
                { text: 'Bar showing open programs', is_correct: true },
                { text: 'A type of keyboard', is_correct: false },
                { text: 'A storage device', is_correct: false },
                { text: 'An input device', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'Where do deleted files go?',
            options: [
                { text: 'Recycle Bin', is_correct: true },
                { text: 'Start menu', is_correct: false },
                { text: 'Taskbar', is_correct: false },
                { text: 'Desktop', is_correct: false }
            ]
        },

        // Keyboard Shortcuts
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What does Ctrl + C do?',
            options: [
                { text: 'Copy', is_correct: true },
                { text: 'Cut', is_correct: false },
                { text: 'Paste', is_correct: false },
                { text: 'Undo', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What does Ctrl + V do?',
            options: [
                { text: 'Paste', is_correct: true },
                { text: 'Copy', is_correct: false },
                { text: 'Cut', is_correct: false },
                { text: 'Undo', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'What does Ctrl + Z do?',
            options: [
                { text: 'Undo', is_correct: true },
                { text: 'Copy', is_correct: false },
                { text: 'Paste', is_correct: false },
                { text: 'Cut', is_correct: false }
            ]
        },

        // Computer Uses
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'How are computers used in education?',
            options: [
                { text: 'For learning and research', is_correct: true },
                { text: 'Only for games', is_correct: false },
                { text: 'Only for movies', is_correct: false },
                { text: 'Only for music', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'How are computers used in banking?',
            options: [
                { text: 'For managing accounts', is_correct: true },
                { text: 'Only for games', is_correct: false },
                { text: 'Only for entertainment', is_correct: false },
                { text: 'Only for typing', is_correct: false }
            ]
        },
        {
            grade: 6,
            difficulty: 'basic',
            question_text: 'Computers are used for entertainment how?',
            options: [
                { text: 'Games, movies, music', is_correct: true },
                { text: 'Only banking', is_correct: false },
                { text: 'Only education', is_correct: false },
                { text: 'Only typing', is_correct: false }
            ]
        }
    ];

    return generateBasicQuestionVariations(baseQuestions, 250);
};

// Class 7: Basic Questions Only
const generateBasicClass7Questions = () => {
    const baseQuestions = [
        // Computer Types
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'Which computer is portable?',
            options: [
                { text: 'Laptop', is_correct: true },
                { text: 'Desktop', is_correct: false },
                { text: 'Server', is_correct: false },
                { text: 'Mainframe', is_correct: false }
            ]
        },
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'Which computer is most powerful?',
            options: [
                { text: 'Supercomputer', is_correct: true },
                { text: 'Desktop', is_correct: false },
                { text: 'Laptop', is_correct: false },
                { text: 'Tablet', is_correct: false }
            ]
        },
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'Which has separate parts?',
            options: [
                { text: 'Desktop computer', is_correct: true },
                { text: 'Laptop computer', is_correct: false },
                { text: 'Tablet computer', is_correct: false },
                { text: 'Smartphone', is_correct: false }
            ]
        },
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'What is a tablet?',
            options: [
                { text: 'Flat touchscreen computer', is_correct: true },
                { text: 'Very powerful computer', is_correct: false },
                { text: 'Computer with separate parts', is_correct: false },
                { text: 'Computer for servers', is_correct: false }
            ]
        },

        // Operating Systems
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'Which OS is made by Microsoft?',
            options: [
                { text: 'Windows', is_correct: true },
                { text: 'macOS', is_correct: false },
                { text: 'Linux', is_correct: false },
                { text: 'Android', is_correct: false }
            ]
        },
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'Which OS is used on Apple computers?',
            options: [
                { text: 'macOS', is_correct: true },
                { text: 'Windows', is_correct: false },
                { text: 'Linux', is_correct: false },
                { text: 'DOS', is_correct: false }
            ]
        },
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'Which OS is free?',
            options: [
                { text: 'Linux', is_correct: true },
                { text: 'Windows', is_correct: false },
                { text: 'macOS', is_correct: false },
                { text: 'iOS', is_correct: false }
            ]
        },

        // Internet Basics
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'What does URL stand for?',
            options: [
                { text: 'Uniform Resource Locator', is_correct: true },
                { text: 'Universal Resource Locator', is_correct: false },
                { text: 'Uniform Resource Link', is_correct: false },
                { text: 'Universal Resource Link', is_correct: false }
            ]
        },
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'What is a homepage?',
            options: [
                { text: 'First page of website', is_correct: true },
                { text: 'Last page of website', is_correct: false },
                { text: 'Page with errors', is_correct: false },
                { text: 'Page for games', is_correct: false }
            ]
        },
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'What is a search engine?',
            options: [
                { text: 'Tool to find information', is_correct: true },
                { text: 'Type of computer', is_correct: false },
                { text: 'Storage device', is_correct: false },
                { text: 'Input device', is_correct: false }
            ]
        },
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'Which is a search engine?',
            options: [
                { text: 'Google', is_correct: true },
                { text: 'Microsoft Word', is_correct: false },
                { text: 'Windows', is_correct: false },
                { text: 'Paint', is_correct: false }
            ]
        },

        // Email Basics
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'What is inbox?',
            options: [
                { text: 'Folder for received emails', is_correct: true },
                { text: 'Folder for sent emails', is_correct: false },
                { text: 'Folder for deleted emails', is_correct: false },
                { text: 'Folder for draft emails', is_correct: false }
            ]
        },
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'What does CC mean?',
            options: [
                { text: 'Carbon Copy', is_correct: true },
                { text: 'Computer Copy', is_correct: false },
                { text: 'Central Copy', is_correct: false },
                { text: 'Control Copy', is_correct: false }
            ]
        },
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'What does BCC mean?',
            options: [
                { text: 'Blind Carbon Copy', is_correct: true },
                { text: 'Basic Carbon Copy', is_correct: false },
                { text: 'Binary Carbon Copy', is_correct: false },
                { text: 'Backup Carbon Copy', is_correct: false }
            ]
        },

        // File Extensions
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'What is .docx file?',
            options: [
                { text: 'Word document', is_correct: true },
                { text: 'Image file', is_correct: false },
                { text: 'Music file', is_correct: false },
                { text: 'Video file', is_correct: false }
            ]
        },
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'What is .jpg file?',
            options: [
                { text: 'Image file', is_correct: true },
                { text: 'Document file', is_correct: false },
                { text: 'Music file', is_correct: false },
                { text: 'Program file', is_correct: false }
            ]
        },
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'What is .mp3 file?',
            options: [
                { text: 'Music file', is_correct: true },
                { text: 'Image file', is_correct: false },
                { text: 'Document file', is_correct: false },
                { text: 'Video file', is_correct: false }
            ]
        },
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'What is .exe file?',
            options: [
                { text: 'Program file', is_correct: true },
                { text: 'Image file', is_correct: false },
                { text: 'Music file', is_correct: false },
                { text: 'Document file', is_correct: false }
            ]
        },

        // Cyber Safety
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'What makes a strong password?',
            options: [
                { text: 'Letters, numbers, symbols', is_correct: true },
                { text: 'Only your name', is_correct: false },
                { text: 'Only numbers', is_correct: false },
                { text: 'Only letters', is_correct: false }
            ]
        },
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'What is phishing?',
            options: [
                { text: 'Fake emails to steal information', is_correct: true },
                { text: 'Type of computer game', is_correct: false },
                { text: 'Way to send emails', is_correct: false },
                { text: 'Type of software', is_correct: false }
            ]
        },
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'What is safe browsing?',
            options: [
                { text: 'Visit only trusted websites', is_correct: true },
                { text: 'Click on all links', is_correct: false },
                { text: 'Share passwords', is_correct: false },
                { text: 'Download everything', is_correct: false }
            ]
        },

        // Programming Basics
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'What is a computer program?',
            options: [
                { text: 'Instructions for computer', is_correct: true },
                { text: 'Type of hardware', is_correct: false },
                { text: 'Storage device', is_correct: false },
                { text: 'Input device', is_correct: false }
            ]
        },
        {
            grade: 7,
            difficulty: 'basic',
            question_text: 'What numbers does binary use?',
            options: [
                { text: '0 and 1', is_correct: true },
                { text: '0 to 9', is_correct: false },
                { text: '1 to 10', is_correct: false },
                { text: 'A to Z', is_correct: false }
            ]
        }
    ];

    return generateBasicQuestionVariations(baseQuestions, 250);
};

// Class 8: Basic Questions Only
const generateBasicClass8Questions = () => {
    const baseQuestions = [
        // Memory Basics
        {
            grade: 8,
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
            grade: 8,
            difficulty: 'basic',
            question_text: 'What does ROM stand for?',
            options: [
                { text: 'Read Only Memory', is_correct: true },
                { text: 'Random Only Memory', is_correct: false },
                { text: 'Read Open Memory', is_correct: false },
                { text: 'Random Open Memory', is_correct: false }
            ]
        },
        {
            grade: 8,
            difficulty: 'basic',
            question_text: 'Which memory is temporary?',
            options: [
                { text: 'RAM', is_correct: true },
                { text: 'ROM', is_correct: false },
                { text: 'Hard disk', is_correct: false },
                { text: 'CD', is_correct: false }
            ]
        },
        {
            grade: 8,
            difficulty: 'basic',
            question_text: 'Which memory is permanent?',
            options: [
                { text: 'ROM', is_correct: true },
                { text: 'RAM', is_correct: false },
                { text: 'Cache', is_correct: false },
                { text: 'Virtual memory', is_correct: false }
            ]
        },

        // Network Basics
        {
            grade: 8,
            difficulty: 'basic',
            question_text: 'What does LAN stand for?',
            options: [
                { text: 'Local Area Network', is_correct: true },
                { text: 'Large Area Network', is_correct: false },
                { text: 'Long Area Network', is_correct: false },
                { text: 'Limited Area Network', is_correct: false }
            ]
        },
        {
            grade: 8,
            difficulty: 'basic',
            question_text: 'What does WAN stand for?',
            options: [
                { text: 'Wide Area Network', is_correct: true },
                { text: 'World Area Network', is_correct: false },
                { text: 'Wireless Area Network', is_correct: false },
                { text: 'Web Area Network', is_correct: false }
            ]
        },
        {
            grade: 8,
            difficulty: 'basic',
            question_text: 'Which network covers small area?',
            options: [
                { text: 'LAN', is_correct: true },
                { text: 'WAN', is_correct: false },
                { text: 'MAN', is_correct: false },
                { text: 'PAN', is_correct: false }
            ]
        },
        {
            grade: 8,
            difficulty: 'basic',
            question_text: 'Which network covers large area?',
            options: [
                { text: 'WAN', is_correct: true },
                { text: 'LAN', is_correct: false },
                { text: 'PAN', is_correct: false },
                { text: 'CAN', is_correct: false }
            ]
        },

        // Cloud Computing
        {
            grade: 8,
            difficulty: 'basic',
            question_text: 'What is cloud storage?',
            options: [
                { text: 'Storing data on internet', is_correct: true },
                { text: 'Storing data in sky', is_correct: false },
                { text: 'Storing data on computer', is_correct: false },
                { text: 'Storing data on CD', is_correct: false }
            ]
        },
        {
            grade: 8,
            difficulty: 'basic',
            question_text: 'Which is cloud storage?',
            options: [
                { text: 'Google Drive', is_correct: true },
                { text: 'Hard disk', is_correct: false },
                { text: 'Pen drive', is_correct: false },
                { text: 'CD/DVD', is_correct: false }
            ]
        },
        {
            grade: 8,
            difficulty: 'basic',
            question_text: 'What is cloud computing?',
            options: [
                { text: 'Computing using internet services', is_correct: true },
                { text: 'Computing with clouds', is_correct: false },
                { text: 'Type of software', is_correct: false },
                { text: 'Programming language', is_correct: false }
            ]
        },

        // HTML Basics
        {
            grade: 8,
            difficulty: 'basic',
            question_text: 'What does HTML stand for?',
            options: [
                { text: 'HyperText Markup Language', is_correct: true },
                { text: 'High Tech Modern Language', is_correct: false },
                { text: 'Home Tool Markup Language', is_correct: false },
                { text: 'Hyperlink Text Language', is_correct: false }
            ]
        },
        {
            grade: 8,
            difficulty: 'basic',
            question_text: 'What are HTML tags?',
            options: [
                { text: 'Keywords in angle brackets', is_correct: true },
                { text: 'Pictures in web pages', is_correct: false },
                { text: 'Links to websites', is_correct: false },
                { text: 'Text content', is_correct: false }
            ]
        },
        {
            grade: 8,
            difficulty: 'basic',
            question_text: 'HTML is used for what?',
            options: [
                { text: 'Creating web pages', is_correct: true },
                { text: 'Creating games', is_correct: false },
                { text: 'Creating music', is_correct: false },
                { text: 'Creating videos', is_correct: false }
            ]
        },

        // Digital Ethics
        {
            grade: 8,
            difficulty: 'basic',
            question_text: 'What should you not share online?',
            options: [
                { text: 'Personal information', is_correct: true },
                { text: 'Favorite color', is_correct: false },
                { text: 'Favorite food', is_correct: false },
                { text: 'Favorite movie', is_correct: false }
            ]
        },
        {
            grade: 8,
            difficulty: 'basic',
            question_text: 'What is responsible internet use?',
            options: [
                { text: 'Using internet safely', is_correct: true },
                { text: 'Using internet for games only', is_correct: false },
                { text: 'Using internet without rules', is_correct: false },
                { text: 'Using internet at night only', is_correct: false }
            ]
        },

        // Database Basics
        {
            grade: 8,
            difficulty: 'basic',
            question_text: 'What is a database?',
            options: [
                { text: 'Collection of data', is_correct: true },
                { text: 'Type of computer', is_correct: false },
                { text: 'Storage device', is_correct: false },
                { text: 'Input device', is_correct: false }
            ]
        },
        {
            grade: 8,
            difficulty: 'basic',
            question_text: 'What is a table in database?',
            options: [
                { text: 'Data in rows and columns', is_correct: true },
                { text: 'Furniture for computer', is_correct: false },
                { text: 'Type of chart', is_correct: false },
                { text: 'Mathematical table', is_correct: false }
            ]
        },
        {
            grade: 8,
            difficulty: 'basic',
            question_text: 'What is a record?',
            options: [
                { text: 'Single row of data', is_correct: true },
                { text: 'Music file', is_correct: false },
                { text: 'Video file', is_correct: false },
                { text: 'Document file', is_correct: false }
            ]
        },
        {
            grade: 8,
            difficulty: 'basic',
            question_text: 'What is a field?',
            options: [
                { text: 'Single column in table', is_correct: true },
                { text: 'Open area', is_correct: false },
                { text: 'Sports ground', is_correct: false },
                { text: 'Text box', is_correct: false }
            ]
        }
    ];

    return generateBasicQuestionVariations(baseQuestions, 250);
};

async function seedBasicOnlyCurriculum() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('🚀 SEEDING BASIC-ONLY CURRICULUM QUESTIONS');
        console.log('==========================================');
        console.log('📚 Classes: 6, 7, 8 with BASIC questions only');
        console.log('🎯 Target: 250+ BASIC questions each class');
        console.log('❌ NO detailed questions included');

        // Clear existing questions for grades 6, 7, 8
        console.log('\n🧹 Clearing existing questions for Classes 6, 7, 8...');
        
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM options WHERE question_id IN (SELECT id FROM questions WHERE grade IN (6, 7, 8))', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        await new Promise((resolve, reject) => {
            db.run('DELETE FROM questions WHERE grade IN (6, 7, 8)', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        console.log('✅ Cleared existing questions for Classes 6, 7, 8');

        // Generate basic-only questions for each class
        const classQuestions = {
            6: generateBasicClass6Questions(),
            7: generateBasicClass7Questions(),
            8: generateBasicClass8Questions()
        };

        let totalQuestions = 0;

        for (const [grade, questions] of Object.entries(classQuestions)) {
            console.log(`\n📚 Seeding Class ${grade} with ${questions.length} BASIC-only questions...`);
            
            for (const question of questions) {
                // Double-check that question is basic
                if (!isBasicQuestion(question.question_text)) {
                    console.log(`⚠️  Skipping detailed question: ${question.question_text}`);
                    continue;
                }

                // Insert question
                const questionId = await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                        [question.grade, question.difficulty, question.question_text],
                        function (err) {
                            if (err) reject(err);
                            else resolve(this.lastID);
                        }
                    );
                });

                // Insert options
                for (let i = 0; i < question.options.length; i++) {
                    const option = question.options[i];
                    await new Promise((resolve, reject) => {
                        db.run(
                            'INSERT INTO options (question_id, option_text, option_order, is_correct) VALUES (?, ?, ?, ?)',
                            [questionId, option.text, i + 1, option.is_correct ? 1 : 0],
                            function (err) {
                                if (err) reject(err);
                                else resolve();
                            }
                        );
                    });
                }
            }
            
            console.log(`✅ Class ${grade}: Added BASIC-only questions`);
            totalQuestions += questions.length;
        }

        // Verify final counts and check for detailed questions
        console.log('\n📊 FINAL VERIFICATION:');
        for (const grade of [6, 7, 8]) {
            const stats = await new Promise((resolve, reject) => {
                db.get(`
                    SELECT 
                        COUNT(DISTINCT q.id) as questions,
                        COUNT(o.id) as options,
                        COUNT(CASE WHEN o.is_correct = 1 THEN 1 END) as correct_answers
                    FROM questions q 
                    LEFT JOIN options o ON q.id = o.question_id 
                    WHERE q.grade = ?
                `, [grade], (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                });
            });
            console.log(`   Class ${grade}: ${stats.questions} questions, ${stats.options} options, ${stats.correct_answers} correct ✅`);
        }

        // Final check for any detailed questions
        const allQuestions = await new Promise((resolve, reject) => {
            db.all('SELECT question_text FROM questions WHERE grade IN (6, 7, 8)', (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        const detailedCount = allQuestions.filter(q => !isBasicQuestion(q.question_text)).length;

        console.log(`\n🎉 BASIC-ONLY CURRICULUM SEEDING COMPLETE!`);
        console.log(`📊 Total Questions: ${totalQuestions}`);
        console.log(`✅ All questions are BASIC level only`);
        console.log(`❌ Detailed questions found: ${detailedCount} (should be 0)`);
        console.log(`🎯 Perfect for TECH BOARD 2025 basic assessment`);

    } catch (error) {
        console.error('❌ Error seeding basic-only curriculum:', error);
    } finally {
        await database.close();
    }
}

// Run the seeding
seedBasicOnlyCurriculum();