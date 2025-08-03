require('dotenv').config();
const database = require('../config/database');

const grade9FinalQuestions = [
    // Computer Hardware and Systems
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is the main function of the CPU?',
        options: [
            { text: 'To process instructions and perform calculations', is_correct: true },
            { text: 'To store data permanently', is_correct: false },
            { text: 'To display images', is_correct: false },
            { text: 'To connect to the internet', is_correct: false }
        ]
    },
    {
        grade: 9,
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
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is the difference between RAM and ROM?',
        options: [
            { text: 'RAM is temporary storage, ROM is permanent storage', is_correct: true },
            { text: 'RAM is permanent, ROM is temporary', is_correct: false },
            { text: 'They are the same thing', is_correct: false },
            { text: 'RAM is faster, ROM is slower', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a hard drive used for?',
        options: [
            { text: 'Permanent data storage', is_correct: true },
            { text: 'Temporary data storage', is_correct: false },
            { text: 'Processing data', is_correct: false },
            { text: 'Displaying data', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is the difference between SSD and HDD?',
        options: [
            { text: 'SSD has no moving parts, HDD has moving parts', is_correct: true },
            { text: 'SSD is slower than HDD', is_correct: false },
            { text: 'SSD is cheaper than HDD', is_correct: false },
            { text: 'There is no difference', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a graphics card used for?',
        options: [
            { text: 'Processing and displaying visual information', is_correct: true },
            { text: 'Storing data', is_correct: false },
            { text: 'Processing audio', is_correct: false },
            { text: 'Connecting to networks', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is a motherboard?',
        options: [
            { text: 'The main circuit board connecting all components', is_correct: true },
            { text: 'The computer case', is_correct: false },
            { text: 'The power supply', is_correct: false },
            { text: 'The monitor', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a power supply unit (PSU)?',
        options: [
            { text: 'Converts AC power to DC power for computer components', is_correct: true },
            { text: 'Supplies internet connection', is_correct: false },
            { text: 'Supplies software', is_correct: false },
            { text: 'Supplies cooling', is_correct: false }
        ]
    },

    // Software and Operating Systems
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is system software?',
        options: [
            { text: 'Software that manages computer hardware and provides platform for other software', is_correct: true },
            { text: 'Software for playing games', is_correct: false },
            { text: 'Software for creating documents', is_correct: false },
            { text: 'Software for browsing internet', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is application software?',
        options: [
            { text: 'Software designed for end users to accomplish specific tasks', is_correct: true },
            { text: 'Software that manages hardware', is_correct: false },
            { text: 'Software that controls the operating system', is_correct: false },
            { text: 'Software that manages memory', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a device driver?',
        options: [
            { text: 'Software that allows the OS to communicate with hardware', is_correct: true },
            { text: 'A person who drives devices', is_correct: false },
            { text: 'Hardware that drives devices', is_correct: false },
            { text: 'Software that drives cars', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is multitasking in operating systems?',
        options: [
            { text: 'Running multiple programs simultaneously', is_correct: true },
            { text: 'Using multiple keyboards', is_correct: false },
            { text: 'Having multiple monitors', is_correct: false },
            { text: 'Using multiple operating systems', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is virtual memory?',
        options: [
            { text: 'Using hard disk space as additional RAM', is_correct: true },
            { text: 'Memory that doesn\'t exist', is_correct: false },
            { text: 'Memory for virtual reality', is_correct: false },
            { text: 'Memory that is very fast', is_correct: false }
        ]
    },

    // Internet and Web Technologies
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a web browser?',
        options: [
            { text: 'Software for accessing and viewing websites', is_correct: true },
            { text: 'A person who browses the web', is_correct: false },
            { text: 'Hardware for internet connection', is_correct: false },
            { text: 'A type of website', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is HTML?',
        options: [
            { text: 'HyperText Markup Language for creating web pages', is_correct: true },
            { text: 'High Technology Markup Language', is_correct: false },
            { text: 'Home Text Markup Language', is_correct: false },
            { text: 'Hardware Text Markup Language', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a website?',
        options: [
            { text: 'A collection of web pages accessible via the internet', is_correct: true },
            { text: 'A physical location', is_correct: false },
            { text: 'A type of software', is_correct: false },
            { text: 'A computer hardware', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is a search engine?',
        options: [
            { text: 'A system for finding information on the internet', is_correct: true },
            { text: 'An engine that searches for cars', is_correct: false },
            { text: 'A type of web browser', is_correct: false },
            { text: 'A computer component', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is a cookie in web browsing?',
        options: [
            { text: 'A small file stored by websites to remember user information', is_correct: true },
            { text: 'A type of food', is_correct: false },
            { text: 'A computer virus', is_correct: false },
            { text: 'A web browser feature', is_correct: false }
        ]
    },

    // Data and Information
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is data?',
        options: [
            { text: 'Raw facts and figures without context', is_correct: true },
            { text: 'Processed information', is_correct: false },
            { text: 'Computer programs', is_correct: false },
            { text: 'Internet connections', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is information?',
        options: [
            { text: 'Processed data that has meaning and context', is_correct: true },
            { text: 'Raw data without processing', is_correct: false },
            { text: 'Computer hardware', is_correct: false },
            { text: 'Software programs', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is a bit?',
        options: [
            { text: 'The smallest unit of data in computing (0 or 1)', is_correct: true },
            { text: 'A small piece of hardware', is_correct: false },
            { text: 'A type of software', is_correct: false },
            { text: 'A computer component', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a byte?',
        options: [
            { text: 'A group of 8 bits', is_correct: true },
            { text: 'A single bit', is_correct: false },
            { text: 'A type of food', is_correct: false },
            { text: 'A computer program', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'How many bytes are in a kilobyte?',
        options: [
            { text: '1024 bytes', is_correct: true },
            { text: '1000 bytes', is_correct: false },
            { text: '100 bytes', is_correct: false },
            { text: '10 bytes', is_correct: false }
        ]
    },

    // Digital Communication
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is email?',
        options: [
            { text: 'Electronic mail sent over the internet', is_correct: true },
            { text: 'Emergency mail', is_correct: false },
            { text: 'Express mail', is_correct: false },
            { text: 'External mail', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is instant messaging?',
        options: [
            { text: 'Real-time text communication over the internet', is_correct: true },
            { text: 'Very fast email', is_correct: false },
            { text: 'Messaging that happens instantly without internet', is_correct: false },
            { text: 'Messaging for instant coffee', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is social media?',
        options: [
            { text: 'Online platforms for social interaction and content sharing', is_correct: true },
            { text: 'Media for social events', is_correct: false },
            { text: 'Social news on TV', is_correct: false },
            { text: 'Media about society', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is video conferencing?',
        options: [
            { text: 'Real-time video and audio communication over the internet', is_correct: true },
            { text: 'Watching videos together', is_correct: false },
            { text: 'Recording video conferences', is_correct: false },
            { text: 'Video editing conferences', is_correct: false }
        ]
    },

    // Computer Security
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a computer virus?',
        options: [
            { text: 'Malicious software that can replicate and spread', is_correct: true },
            { text: 'A biological virus in computers', is_correct: false },
            { text: 'A helpful computer program', is_correct: false },
            { text: 'A computer component', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is antivirus software?',
        options: [
            { text: 'Software designed to detect and remove malicious programs', is_correct: true },
            { text: 'Software that creates viruses', is_correct: false },
            { text: 'Software for medical purposes', is_correct: false },
            { text: 'Software that prevents all software from running', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is a firewall?',
        options: [
            { text: 'Security system that monitors and controls network traffic', is_correct: true },
            { text: 'A wall that prevents fires', is_correct: false },
            { text: 'Software that creates fire effects', is_correct: false },
            { text: 'Hardware that generates heat', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a strong password?',
        options: [
            { text: 'A password that is long, complex, and unique', is_correct: true },
            { text: 'A password that is easy to remember', is_correct: false },
            { text: 'A password that is very short', is_correct: false },
            { text: 'A password that uses only numbers', is_correct: false }
        ]
    },

    // File Management
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a file?',
        options: [
            { text: 'A collection of data stored with a name', is_correct: true },
            { text: 'A physical folder', is_correct: false },
            { text: 'A computer component', is_correct: false },
            { text: 'A type of software', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a folder?',
        options: [
            { text: 'A container for organizing files and other folders', is_correct: true },
            { text: 'A type of file', is_correct: false },
            { text: 'A computer program', is_correct: false },
            { text: 'A hardware component', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is a file extension?',
        options: [
            { text: 'The part of filename that indicates the file type', is_correct: true },
            { text: 'Making a file longer', is_correct: false },
            { text: 'Adding more data to a file', is_correct: false },
            { text: 'Extending the file size', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What does copying a file do?',
        options: [
            { text: 'Creates a duplicate of the file in another location', is_correct: true },
            { text: 'Moves the file to another location', is_correct: false },
            { text: 'Deletes the original file', is_correct: false },
            { text: 'Renames the file', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What does moving a file do?',
        options: [
            { text: 'Transfers the file from one location to another', is_correct: true },
            { text: 'Creates a copy of the file', is_correct: false },
            { text: 'Deletes the file', is_correct: false },
            { text: 'Renames the file', is_correct: false }
        ]
    },

    // Digital Media
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is digital media?',
        options: [
            { text: 'Content stored in digital format', is_correct: true },
            { text: 'Traditional newspapers and magazines', is_correct: false },
            { text: 'Only social media platforms', is_correct: false },
            { text: 'Physical media like CDs', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is multimedia?',
        options: [
            { text: 'Content that combines text, audio, images, and video', is_correct: true },
            { text: 'Multiple media devices', is_correct: false },
            { text: 'Many different websites', is_correct: false },
            { text: 'Multiple computer programs', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is streaming?',
        options: [
            { text: 'Delivering media content over the internet in real-time', is_correct: true },
            { text: 'Downloading files completely before viewing', is_correct: false },
            { text: 'Water flowing in streams', is_correct: false },
            { text: 'Moving files between computers', is_correct: false }
        ]
    },

    // Emerging Technologies
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is 3D printing?',
        options: [
            { text: 'Creating physical objects from digital designs', is_correct: true },
            { text: 'Printing on 3D paper', is_correct: false },
            { text: 'Printing three copies of documents', is_correct: false },
            { text: 'Printing in three colors', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is robotics?',
        options: [
            { text: 'The design and use of robots for various tasks', is_correct: true },
            { text: 'The study of robots in movies', is_correct: false },
            { text: 'Playing with robot toys', is_correct: false },
            { text: 'Repairing broken robots', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is automation?',
        options: [
            { text: 'Using technology to perform tasks without human intervention', is_correct: true },
            { text: 'Making cars automatic', is_correct: false },
            { text: 'Automatic doors and windows', is_correct: false },
            { text: 'Automatic writing', is_correct: false }
        ]
    },

    // Problem Solving and Computational Thinking
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is computational thinking?',
        options: [
            { text: 'Problem-solving process that includes decomposition, patterns, and algorithms', is_correct: true },
            { text: 'Thinking about computers', is_correct: false },
            { text: 'Thinking very fast', is_correct: false },
            { text: 'Mathematical calculations', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is pattern recognition in problem solving?',
        options: [
            { text: 'Identifying similarities and trends in data or problems', is_correct: true },
            { text: 'Recognizing visual patterns only', is_correct: false },
            { text: 'Creating new patterns', is_correct: false },
            { text: 'Drawing patterns', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is algorithmic thinking?',
        options: [
            { text: 'Breaking down problems into step-by-step solutions', is_correct: true },
            { text: 'Thinking about algorithms only', is_correct: false },
            { text: 'Mathematical thinking', is_correct: false },
            { text: 'Fast thinking', is_correct: false }
        ]
    },

    // Ethics and Digital Citizenship
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is digital citizenship?',
        options: [
            { text: 'Responsible and ethical use of technology', is_correct: true },
            { text: 'Being a citizen of a digital country', is_correct: false },
            { text: 'Having digital identification', is_correct: false },
            { text: 'Living in a digital world', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is intellectual property?',
        options: [
            { text: 'Legal rights to creations of the mind', is_correct: true },
            { text: 'Property that makes you intelligent', is_correct: false },
            { text: 'Physical property of intellectuals', is_correct: false },
            { text: 'Property related to intelligence tests', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is fair use?',
        options: [
            { text: 'Limited use of copyrighted material for educational or commentary purposes', is_correct: true },
            { text: 'Using anything fairly', is_correct: false },
            { text: 'Fair pricing for software', is_correct: false },
            { text: 'Equal access to technology', is_correct: false }
        ]
    },

    // Additional Programming and Logic
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a loop in programming?',
        options: [
            { text: 'A structure that repeats a block of code', is_correct: true },
            { text: 'A circular piece of code', is_correct: false },
            { text: 'A type of variable', is_correct: false },
            { text: 'A programming error', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is a conditional statement?',
        options: [
            { text: 'Code that executes only if certain conditions are met', is_correct: true },
            { text: 'A statement about conditions', is_correct: false },
            { text: 'A statement that is always true', is_correct: false },
            { text: 'A statement that creates conditions', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is debugging in programming?',
        options: [
            { text: 'The process of finding and fixing errors in code', is_correct: true },
            { text: 'Removing insects from computers', is_correct: false },
            { text: 'Adding bugs to programs', is_correct: false },
            { text: 'Testing programs for speed', is_correct: false }
        ]
    },

    // Technology in Society
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'How has technology changed communication?',
        options: [
            { text: 'Made it faster, easier, and more global', is_correct: true },
            { text: 'Made it slower and more difficult', is_correct: false },
            { text: 'Has not changed communication at all', is_correct: false },
            { text: 'Only changed business communication', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is e-commerce?',
        options: [
            { text: 'Buying and selling goods and services online', is_correct: true },
            { text: 'Electronic commerce only for businesses', is_correct: false },
            { text: 'Commerce using only email', is_correct: false },
            { text: 'Commerce in electronic stores only', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is the digital divide?',
        options: [
            { text: 'The gap between those who have access to technology and those who don\'t', is_correct: true },
            { text: 'A mathematical division using digital numbers', is_correct: false },
            { text: 'The separation between digital and analog technology', is_correct: false },
            { text: 'A divide in digital storage devices', is_correct: false }
        ]
    }
];

async function seedGrade9Final() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('Starting Grade 9 final questions seeding...');

        let addedCount = 0;
        let basicCount = 0;
        let mediumCount = 0;
        let advancedCount = 0;

        for (const questionData of grade9FinalQuestions) {
            const { grade, difficulty, question_text, options } = questionData;

            // Insert question
            const questionId = await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                    [grade, difficulty, question_text],
                    function(err) {
                        if (err) reject(err);
                        else resolve(this.lastID);
                    }
                );
            });

            // Insert options
            for (let i = 0; i < options.length; i++) {
                const option = options[i];
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

            addedCount++;
            if (difficulty === 'basic') basicCount++;
            else if (difficulty === 'medium') mediumCount++;
            else if (difficulty === 'advanced') advancedCount++;
        }

        console.log(`Successfully added ${addedCount} final Grade 9 questions!`);
        console.log('Difficulty distribution:');
        console.log(`- Basic: ${basicCount} questions`);
        console.log(`- Medium: ${mediumCount} questions`);
        console.log(`- Advanced: ${advancedCount} questions`);

    } catch (error) {
        console.error('Error seeding Grade 9 final questions:', error);
    } finally {
        await database.close();
    }
}

if (require.main === module) {
    seedGrade9Final();
}

module.exports = { seedGrade9Final };