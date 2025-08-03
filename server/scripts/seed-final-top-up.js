require('dotenv').config();
const database = require('../config/database');

const finalTopUpQuestions = [
    // Grade 7 Additional Questions
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What is a computer program?',
        options: [
            { text: 'A set of instructions for a computer to follow', is_correct: true },
            { text: 'A TV show about computers', is_correct: false },
            { text: 'A computer component', is_correct: false },
            { text: 'A computer game', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What does "boot up" mean?',
        options: [
            { text: 'Starting up a computer', is_correct: true },
            { text: 'Putting on boots', is_correct: false },
            { text: 'Shutting down a computer', is_correct: false },
            { text: 'Installing software', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'What is a computer port?',
        options: [
            { text: 'A connection point for external devices', is_correct: true },
            { text: 'A harbor for computers', is_correct: false },
            { text: 'A type of software', is_correct: false },
            { text: 'A computer screen', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What is a screenshot?',
        options: [
            { text: 'An image of what\'s displayed on screen', is_correct: true },
            { text: 'A photo taken with a camera', is_correct: false },
            { text: 'A broken screen', is_correct: false },
            { text: 'A screen saver', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'What is cloud storage?',
        options: [
            { text: 'Storing data on remote servers accessed via internet', is_correct: true },
            { text: 'Storing data in the sky', is_correct: false },
            { text: 'Storing data on local hard drive', is_correct: false },
            { text: 'Storing data on CDs', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What is a touchscreen?',
        options: [
            { text: 'A screen that responds to touch input', is_correct: true },
            { text: 'A screen that is soft to touch', is_correct: false },
            { text: 'A screen that shows touch', is_correct: false },
            { text: 'A screen for touching things', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'What is a QR code?',
        options: [
            { text: 'A square barcode that can store information', is_correct: true },
            { text: 'A quality rating code', is_correct: false },
            { text: 'A quick response code for emergencies', is_correct: false },
            { text: 'A code for quiet rooms', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What is a webcam?',
        options: [
            { text: 'A camera connected to a computer for video calls', is_correct: true },
            { text: 'A camera for taking web photos', is_correct: false },
            { text: 'A camera that works on websites only', is_correct: false },
            { text: 'A camera made of web material', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'What is bandwidth in internet terms?',
        options: [
            { text: 'The amount of data that can be transmitted per second', is_correct: true },
            { text: 'The width of internet cables', is_correct: false },
            { text: 'The number of websites you can visit', is_correct: false },
            { text: 'The speed of your computer', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'advanced',
        question_text: 'What is two-factor authentication?',
        options: [
            { text: 'Using two different methods to verify identity', is_correct: true },
            { text: 'Having two passwords', is_correct: false },
            { text: 'Logging in twice', is_correct: false },
            { text: 'Using two computers', is_correct: false }
        ]
    },

    // Grade 9 Additional Questions
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a smartphone app?',
        options: [
            { text: 'A software application designed for mobile devices', is_correct: true },
            { text: 'A smart phone application form', is_correct: false },
            { text: 'An application to make phones smart', is_correct: false },
            { text: 'A phone that applies for jobs', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is GPS?',
        options: [
            { text: 'Global Positioning System for location tracking', is_correct: true },
            { text: 'General Purpose System', is_correct: false },
            { text: 'Global Phone System', is_correct: false },
            { text: 'General Processing System', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a tablet computer?',
        options: [
            { text: 'A portable computer with a touchscreen interface', is_correct: true },
            { text: 'A computer shaped like a tablet', is_correct: false },
            { text: 'A computer for taking tablets', is_correct: false },
            { text: 'A medical computer', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is Bluetooth?',
        options: [
            { text: 'Short-range wireless communication technology', is_correct: true },
            { text: 'A blue-colored tooth', is_correct: false },
            { text: 'A type of blue light', is_correct: false },
            { text: 'A dental technology', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is machine learning?',
        options: [
            { text: 'AI technique where computers learn from data without explicit programming', is_correct: true },
            { text: 'Teaching machines to move', is_correct: false },
            { text: 'Learning about machines', is_correct: false },
            { text: 'Machines learning to repair themselves', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a podcast?',
        options: [
            { text: 'Digital audio program available for streaming or download', is_correct: true },
            { text: 'A pod for casting', is_correct: false },
            { text: 'A cast made of pods', is_correct: false },
            { text: 'A type of broadcast on pods', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is cryptocurrency?',
        options: [
            { text: 'Digital currency secured by cryptography', is_correct: true },
            { text: 'Currency that is hidden', is_correct: false },
            { text: 'Currency for buying crypto items', is_correct: false },
            { text: 'Currency that changes frequently', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is the Internet of Things (IoT)?',
        options: [
            { text: 'Network of physical devices connected to the internet', is_correct: true },
            { text: 'Internet for buying things', is_correct: false },
            { text: 'Things found on the internet', is_correct: false },
            { text: 'Internet made of things', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a smart home?',
        options: [
            { text: 'A home with internet-connected devices for automation', is_correct: true },
            { text: 'A home for smart people', is_correct: false },
            { text: 'A home that is very intelligent', is_correct: false },
            { text: 'A home with good grades', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is biometric authentication?',
        options: [
            { text: 'Using biological characteristics like fingerprints for identification', is_correct: true },
            { text: 'Authentication using biography', is_correct: false },
            { text: 'Authentication for biologists', is_correct: false },
            { text: 'Authentication using biological passwords', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is edge computing?',
        options: [
            { text: 'Processing data closer to where it is generated', is_correct: true },
            { text: 'Computing on the edge of cliffs', is_correct: false },
            { text: 'Computing with sharp edges', is_correct: false },
            { text: 'Computing at the edge of screens', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a wearable device?',
        options: [
            { text: 'Electronic device designed to be worn on the body', is_correct: true },
            { text: 'A device that can be worn like clothes', is_correct: false },
            { text: 'A device that wears other devices', is_correct: false },
            { text: 'A device for wearing things', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is 5G technology?',
        options: [
            { text: 'Fifth generation wireless communication technology', is_correct: true },
            { text: 'Technology with 5 gigabytes', is_correct: false },
            { text: 'Technology for 5 people', is_correct: false },
            { text: 'Technology that costs 5 dollars', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is quantum computing?',
        options: [
            { text: 'Computing using quantum mechanical phenomena for processing', is_correct: true },
            { text: 'Computing with quantum physics books', is_correct: false },
            { text: 'Very fast computing', is_correct: false },
            { text: 'Computing in small quantities', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a digital assistant?',
        options: [
            { text: 'AI-powered software that responds to voice commands', is_correct: true },
            { text: 'A human assistant who works digitally', is_correct: false },
            { text: 'An assistant for digital cameras', is_correct: false },
            { text: 'An assistant made of digits', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is augmented reality (AR)?',
        options: [
            { text: 'Technology that overlays digital information on the real world', is_correct: true },
            { text: 'Reality that has been increased in size', is_correct: false },
            { text: 'Reality with more colors', is_correct: false },
            { text: 'Reality that is artificial', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is blockchain technology?',
        options: [
            { text: 'Distributed ledger technology for secure transactions', is_correct: true },
            { text: 'Technology for blocking chains', is_correct: false },
            { text: 'Technology made of blocks and chains', is_correct: false },
            { text: 'Technology for chain stores', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a drone?',
        options: [
            { text: 'An unmanned aircraft controlled remotely or autonomously', is_correct: true },
            { text: 'A bee that makes honey', is_correct: false },
            { text: 'A type of phone', is_correct: false },
            { text: 'A musical instrument', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is facial recognition?',
        options: [
            { text: 'Technology that identifies people by analyzing facial features', is_correct: true },
            { text: 'Recognizing that you have a face', is_correct: false },
            { text: 'Recognition for facial expressions', is_correct: false },
            { text: 'Recognition of face shapes', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is deep learning?',
        options: [
            { text: 'Machine learning using neural networks with multiple layers', is_correct: true },
            { text: 'Learning very deeply about subjects', is_correct: false },
            { text: 'Learning in deep water', is_correct: false },
            { text: 'Learning about deep things', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a QR code scanner?',
        options: [
            { text: 'Device or app that reads QR codes', is_correct: true },
            { text: 'A scanner that creates QR codes', is_correct: false },
            { text: 'A scanner for scanning scanners', is_correct: false },
            { text: 'A code for scanning quality', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is voice recognition?',
        options: [
            { text: 'Technology that converts spoken words into text or commands', is_correct: true },
            { text: 'Recognizing different voices', is_correct: false },
            { text: 'Recognition that you have a voice', is_correct: false },
            { text: 'Recognition of voice quality', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is cybersecurity?',
        options: [
            { text: 'Protection of digital systems, networks, and data from threats', is_correct: true },
            { text: 'Security for cyber cafes', is_correct: false },
            { text: 'Security cameras for computers', is_correct: false },
            { text: 'Security for cyborgs', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a firewall in computing?',
        options: [
            { text: 'Security system that monitors and controls network traffic', is_correct: true },
            { text: 'A wall that prevents fires in computers', is_correct: false },
            { text: 'A wall made of fire', is_correct: false },
            { text: 'A wall for firemen', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is data mining?',
        options: [
            { text: 'Process of discovering patterns and insights from large datasets', is_correct: true },
            { text: 'Mining for data underground', is_correct: false },
            { text: 'Mining data from mines', is_correct: false },
            { text: 'Using mining tools on data', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is artificial neural network?',
        options: [
            { text: 'Computing system inspired by biological neural networks', is_correct: true },
            { text: 'Artificial network of nerves', is_correct: false },
            { text: 'Network that is not real', is_correct: false },
            { text: 'Network for artificial things', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a backup in computing?',
        options: [
            { text: 'A copy of data stored separately for protection', is_correct: true },
            { text: 'Moving backwards', is_correct: false },
            { text: 'Supporting something from behind', is_correct: false },
            { text: 'A spare computer', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is data visualization?',
        options: [
            { text: 'Representing data in visual formats like charts and graphs', is_correct: true },
            { text: 'Making data visible to the eye', is_correct: false },
            { text: 'Visualizing what data looks like', is_correct: false },
            { text: 'Data that can be seen', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is natural language processing?',
        options: [
            { text: 'AI technology that helps computers understand human language', is_correct: true },
            { text: 'Processing natural languages only', is_correct: false },
            { text: 'Processing language naturally', is_correct: false },
            { text: 'Language processing in nature', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a computer simulation?',
        options: [
            { text: 'Using computers to model real-world processes', is_correct: true },
            { text: 'Simulating that you have a computer', is_correct: false },
            { text: 'A fake computer', is_correct: false },
            { text: 'Computer games only', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is digital forensics?',
        options: [
            { text: 'Investigation of digital devices for evidence', is_correct: true },
            { text: 'Forensics done digitally', is_correct: false },
            { text: 'Digital investigation of crimes', is_correct: false },
            { text: 'Forensics for digital cameras', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is distributed computing?',
        options: [
            { text: 'Using multiple computers to work on a single problem', is_correct: true },
            { text: 'Distributing computers to people', is_correct: false },
            { text: 'Computing that is spread out', is_correct: false },
            { text: 'Computing with distributed software', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a computer network?',
        options: [
            { text: 'Connected computers that can share resources and information', is_correct: true },
            { text: 'A network of computer stores', is_correct: false },
            { text: 'A TV network about computers', is_correct: false },
            { text: 'A network made by computers', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is bandwidth in networking?',
        options: [
            { text: 'The maximum amount of data that can be transmitted', is_correct: true },
            { text: 'The width of network cables', is_correct: false },
            { text: 'The band of network frequencies', is_correct: false },
            { text: 'The width of the network', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is parallel processing?',
        options: [
            { text: 'Performing multiple computations simultaneously', is_correct: true },
            { text: 'Processing things in parallel lines', is_correct: false },
            { text: 'Processing similar to parallel parking', is_correct: false },
            { text: 'Processing parallel shapes', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a user account?',
        options: [
            { text: 'A personalized access profile for using a computer system', is_correct: true },
            { text: 'An account for counting users', is_correct: false },
            { text: 'A bank account for users', is_correct: false },
            { text: 'An account of user activities', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is system administration?',
        options: [
            { text: 'Managing and maintaining computer systems and networks', is_correct: true },
            { text: 'Administering systems to people', is_correct: false },
            { text: 'Administration of systematic things', is_correct: false },
            { text: 'System for administration', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is load balancing?',
        options: [
            { text: 'Distributing workload across multiple computing resources', is_correct: true },
            { text: 'Balancing physical loads', is_correct: false },
            { text: 'Balancing the load on trucks', is_correct: false },
            { text: 'Loading things in a balanced way', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a computer virus scan?',
        options: [
            { text: 'Process of checking for malicious software', is_correct: true },
            { text: 'Scanning viruses with a computer', is_correct: false },
            { text: 'Medical scan using computers', is_correct: false },
            { text: 'Scanning for computer parts', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is data compression?',
        options: [
            { text: 'Reducing the size of data files', is_correct: true },
            { text: 'Compressing data physically', is_correct: false },
            { text: 'Pressing data together', is_correct: false },
            { text: 'Making data smaller in importance', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is fault tolerance?',
        options: [
            { text: 'System\'s ability to continue operating despite failures', is_correct: true },
            { text: 'Tolerance for people\'s faults', is_correct: false },
            { text: 'Tolerance for geological faults', is_correct: false },
            { text: 'Being tolerant of mistakes', is_correct: false }
        ]
    }
];

async function seedFinalTopUp() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('Starting final top-up questions seeding...');

        let addedCount = 0;
        let grade7Count = 0;
        let grade9Count = 0;
        let basicCount = 0;
        let mediumCount = 0;
        let advancedCount = 0;

        for (const questionData of finalTopUpQuestions) {
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
            if (grade === 7) grade7Count++;
            if (grade === 9) grade9Count++;
            if (difficulty === 'basic') basicCount++;
            else if (difficulty === 'medium') mediumCount++;
            else if (difficulty === 'advanced') advancedCount++;
        }

        console.log(`Successfully added ${addedCount} final top-up questions!`);
        console.log('Grade distribution:');
        console.log(`- Grade 7: ${grade7Count} questions`);
        console.log(`- Grade 9: ${grade9Count} questions`);
        console.log('Difficulty distribution:');
        console.log(`- Basic: ${basicCount} questions`);
        console.log(`- Medium: ${mediumCount} questions`);
        console.log(`- Advanced: ${advancedCount} questions`);

    } catch (error) {
        console.error('Error seeding final top-up questions:', error);
    } finally {
        await database.close();
    }
}

if (require.main === module) {
    seedFinalTopUp();
}

module.exports = { seedFinalTopUp };