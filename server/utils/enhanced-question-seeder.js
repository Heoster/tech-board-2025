// Enhanced Question Seeding System for TECH BOARD 2025 MCQ System
// Generates Computer Science questions exclusively for all grades

const database = require('../config/database');
const crypto = require('crypto');

class EnhancedQuestionSeeder {
    constructor() {
        // Computer Science topics for each grade
        this.subjectTopics = {
            6: {
                'Computer Science': [
                    'Computer Fundamentals', 'Computer Components', 'Input/Output Devices',
                    'Storage Devices', 'Computer Memory', 'Computer Software', 'Operating Systems',
                    'Computer History', 'Computer Types', 'Computer Applications', 'Digital Literacy',
                    'Computer Safety', 'Basic Programming Concepts', 'Computer Games and Learning'
                ]
            },
            7: {
                'Computer Science': [
                    'Computer Networks', 'Internet Basics', 'Email and Communication',
                    'Computer Security', 'File Management', 'Programming Concepts',
                    'Web Browsers', 'Search Engines', 'Digital Communication', 'Computer Viruses',
                    'Data and Information', 'Computer Ethics', 'Social Media Safety', 'Digital Footprint'
                ]
            },
            8: {
                'Computer Science': [
                    'Database Concepts', 'Spreadsheet Applications', 'Presentation Software',
                    'Web Development Basics', 'Digital Citizenship', 'Computer Ethics',
                    'Programming Languages', 'Algorithm Basics', 'Computer Graphics', 'Multimedia',
                    'E-commerce', 'Digital Marketing', 'Cloud Computing Basics', 'Mobile Applications'
                ]
            },
            9: {
                'Computer Science': [
                    'Programming Fundamentals', 'Data Structures', 'Algorithms',
                    'Computer Graphics', 'Artificial Intelligence Basics', 'Robotics',
                    'Machine Learning Introduction', 'Web Technologies', 'Database Management',
                    'Software Development', 'Computer Architecture', 'Network Security',
                    'Internet of Things', 'Blockchain Basics'
                ]
            },
            11: {
                'Computer Science': [
                    'Object-Oriented Programming', 'Data Structures and Algorithms',
                    'Database Management Systems', 'Computer Networks', 'Software Engineering',
                    'Web Technologies', 'Mobile App Development', 'Cybersecurity',
                    'Artificial Intelligence', 'Machine Learning', 'Deep Learning',
                    'Cloud Computing', 'Big Data', 'Internet of Things', 'Blockchain Technology',
                    'Computer Graphics and Animation', 'Human-Computer Interaction', 'Distributed Systems'
                ]
            }
        };

        // Question templates for generating diverse questions
        this.questionTemplates = {
            'definition': [
                'What is {concept}?',
                'Define {concept}.',
                'Which of the following best describes {concept}?',
                '{concept} refers to:',
                'The term {concept} means:'
            ],
            'function': [
                'What is the primary function of {concept}?',
                'The main purpose of {concept} is to:',
                '{concept} is used for:',
                'Which function is performed by {concept}?'
            ],
            'comparison': [
                'What is the difference between {concept1} and {concept2}?',
                'How does {concept1} differ from {concept2}?',
                'Which is better: {concept1} or {concept2}?',
                'Compare {concept1} and {concept2}.'
            ],
            'application': [
                'Which of the following is an application of {concept}?',
                '{concept} is commonly used in:',
                'An example of {concept} is:',
                'Where would you typically find {concept}?'
            ],
            'technical': [
                'What is the syntax for {concept}?',
                'How do you implement {concept}?',
                'Which command is used for {concept}?',
                'The correct way to {concept} is:'
            ]
        };

        // Pre-defined Computer Science questions for each grade
        this.computerScienceQuestions = {
            6: [
                {
                    question: "What is a computer?",
                    options: [
                        "An electronic device that processes data",
                        "A mechanical calculator",
                        "A storage device only",
                        "A printing machine"
                    ],
                    correct: 0,
                    difficulty: "easy",
                    topic: "Computer Fundamentals"
                },
                {
                    question: "Which of the following is an input device?",
                    options: ["Monitor", "Keyboard", "Speaker", "Printer"],
                    correct: 1,
                    difficulty: "easy",
                    topic: "Input/Output Devices"
                },
                {
                    question: "What does CPU stand for?",
                    options: [
                        "Computer Processing Unit",
                        "Central Processing Unit",
                        "Central Program Unit",
                        "Computer Program Unit"
                    ],
                    correct: 1,
                    difficulty: "easy",
                    topic: "Computer Components"
                },
                {
                    question: "Which storage device has the largest capacity?",
                    options: ["Floppy Disk", "CD-ROM", "Hard Disk", "USB Drive"],
                    correct: 2,
                    difficulty: "medium",
                    topic: "Storage Devices"
                },
                {
                    question: "What is the brain of the computer called?",
                    options: ["RAM", "CPU", "Hard Disk", "Monitor"],
                    correct: 1,
                    difficulty: "easy",
                    topic: "Computer Components"
                },
                {
                    question: "Which of the following is system software?",
                    options: ["MS Word", "Operating System", "Calculator", "Paint"],
                    correct: 1,
                    difficulty: "medium",
                    topic: "Computer Software"
                },
                {
                    question: "What does RAM stand for?",
                    options: [
                        "Random Access Memory",
                        "Read Access Memory",
                        "Rapid Access Memory",
                        "Real Access Memory"
                    ],
                    correct: 0,
                    difficulty: "easy",
                    topic: "Computer Memory"
                },
                {
                    question: "Which device is used to point and click?",
                    options: ["Keyboard", "Mouse", "Monitor", "Printer"],
                    correct: 1,
                    difficulty: "easy",
                    topic: "Input/Output Devices"
                }
            ],
            7: [
                {
                    question: "What does WWW stand for?",
                    options: [
                        "World Wide Web",
                        "World Wide Work",
                        "World Web Wide",
                        "Wide World Web"
                    ],
                    correct: 0,
                    difficulty: "easy",
                    topic: "Internet Basics"
                },
                {
                    question: "Which protocol is used for sending emails?",
                    options: ["HTTP", "FTP", "SMTP", "TCP"],
                    correct: 2,
                    difficulty: "medium",
                    topic: "Email and Communication"
                },
                {
                    question: "What is a computer virus?",
                    options: [
                        "A hardware component",
                        "A malicious software program",
                        "A type of memory",
                        "An input device"
                    ],
                    correct: 1,
                    difficulty: "medium",
                    topic: "Computer Security"
                },
                {
                    question: "Which of the following is a programming language?",
                    options: ["HTML", "Python", "CSS", "All of the above"],
                    correct: 3,
                    difficulty: "medium",
                    topic: "Programming Concepts"
                },
                {
                    question: "What does IP address stand for?",
                    options: [
                        "Internet Protocol address",
                        "Internal Program address",
                        "Internet Program address",
                        "Internal Protocol address"
                    ],
                    correct: 0,
                    difficulty: "medium",
                    topic: "Computer Networks"
                },
                {
                    question: "Which is the most popular web browser?",
                    options: ["Internet Explorer", "Chrome", "Safari", "Firefox"],
                    correct: 1,
                    difficulty: "easy",
                    topic: "Web Browsers"
                },
                {
                    question: "What is phishing?",
                    options: [
                        "A type of fishing",
                        "A cyber attack to steal information",
                        "A programming technique",
                        "A hardware problem"
                    ],
                    correct: 1,
                    difficulty: "medium",
                    topic: "Computer Security"
                }
            ],
            8: [
                {
                    question: "What is a database?",
                    options: [
                        "A collection of programs",
                        "A collection of organized data",
                        "A type of hardware",
                        "A programming language"
                    ],
                    correct: 1,
                    difficulty: "easy",
                    topic: "Database Concepts"
                },
                {
                    question: "Which software is used for creating presentations?",
                    options: ["Word", "Excel", "PowerPoint", "Notepad"],
                    correct: 2,
                    difficulty: "easy",
                    topic: "Presentation Software"
                },
                {
                    question: "What does HTML stand for?",
                    options: [
                        "Hyper Text Markup Language",
                        "High Tech Modern Language",
                        "Home Tool Markup Language",
                        "Hyper Transfer Markup Language"
                    ],
                    correct: 0,
                    difficulty: "medium",
                    topic: "Web Development Basics"
                },
                {
                    question: "What is digital citizenship?",
                    options: [
                        "Using computers only",
                        "Responsible use of technology",
                        "Programming skills",
                        "Internet speed"
                    ],
                    correct: 1,
                    difficulty: "medium",
                    topic: "Digital Citizenship"
                },
                {
                    question: "Which of the following is a spreadsheet application?",
                    options: ["Word", "PowerPoint", "Excel", "Paint"],
                    correct: 2,
                    difficulty: "easy",
                    topic: "Spreadsheet Applications"
                },
                {
                    question: "What is cloud computing?",
                    options: [
                        "Computing in the sky",
                        "Storing and accessing data over the internet",
                        "A type of weather prediction",
                        "Local storage only"
                    ],
                    correct: 1,
                    difficulty: "medium",
                    topic: "Cloud Computing Basics"
                },
                {
                    question: "Which language is primarily used for web development?",
                    options: ["C++", "Java", "JavaScript", "Python"],
                    correct: 2,
                    difficulty: "medium",
                    topic: "Programming Languages"
                }
            ],
            9: [
                {
                    question: "What is an algorithm?",
                    options: [
                        "A programming language",
                        "A step-by-step procedure to solve a problem",
                        "A type of computer",
                        "A storage device"
                    ],
                    correct: 1,
                    difficulty: "medium",
                    topic: "Algorithms"
                },
                {
                    question: "Which data structure follows LIFO principle?",
                    options: ["Queue", "Stack", "Array", "Tree"],
                    correct: 1,
                    difficulty: "medium",
                    topic: "Data Structures"
                },
                {
                    question: "What does AI stand for?",
                    options: [
                        "Automatic Intelligence",
                        "Artificial Intelligence",
                        "Advanced Intelligence",
                        "Applied Intelligence"
                    ],
                    correct: 1,
                    difficulty: "easy",
                    topic: "Artificial Intelligence Basics"
                },
                {
                    question: "Which programming paradigm does Python support?",
                    options: [
                        "Object-oriented only",
                        "Procedural only",
                        "Functional only",
                        "All of the above"
                    ],
                    correct: 3,
                    difficulty: "hard",
                    topic: "Programming Fundamentals"
                },
                {
                    question: "What is computer graphics?",
                    options: [
                        "Text processing",
                        "Creating visual content using computers",
                        "Database management",
                        "Network communication"
                    ],
                    correct: 1,
                    difficulty: "medium",
                    topic: "Computer Graphics"
                },
                {
                    question: "What is IoT?",
                    options: [
                        "Internet of Things",
                        "Input of Technology",
                        "Integration of Tools",
                        "Interface of Terminals"
                    ],
                    correct: 0,
                    difficulty: "medium",
                    topic: "Internet of Things"
                },
                {
                    question: "Which sorting algorithm is most efficient for large datasets?",
                    options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"],
                    correct: 1,
                    difficulty: "hard",
                    topic: "Algorithms"
                }
            ],
            11: [
                {
                    question: "What is polymorphism in OOP?",
                    options: [
                        "Having multiple forms",
                        "Data hiding",
                        "Code reusability",
                        "Memory management"
                    ],
                    correct: 0,
                    difficulty: "hard",
                    topic: "Object-Oriented Programming"
                },
                {
                    question: "Which sorting algorithm has the best average time complexity?",
                    options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"],
                    correct: 1,
                    difficulty: "hard",
                    topic: "Data Structures and Algorithms"
                },
                {
                    question: "What is normalization in databases?",
                    options: [
                        "Data encryption",
                        "Organizing data to reduce redundancy",
                        "Data backup",
                        "Data compression"
                    ],
                    correct: 1,
                    difficulty: "hard",
                    topic: "Database Management Systems"
                },
                {
                    question: "Which layer of OSI model handles routing?",
                    options: ["Physical", "Data Link", "Network", "Transport"],
                    correct: 2,
                    difficulty: "hard",
                    topic: "Computer Networks"
                },
                {
                    question: "What is machine learning?",
                    options: [
                        "Programming machines",
                        "Algorithms that improve through experience",
                        "Hardware manufacturing",
                        "Network protocols"
                    ],
                    correct: 1,
                    difficulty: "medium",
                    topic: "Machine Learning"
                },
                {
                    question: "What is blockchain?",
                    options: [
                        "A chain of blocks",
                        "A distributed ledger technology",
                        "A programming language",
                        "A database type"
                    ],
                    correct: 1,
                    difficulty: "medium",
                    topic: "Blockchain Technology"
                },
                {
                    question: "What is the time complexity of binary search?",
                    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
                    correct: 1,
                    difficulty: "hard",
                    topic: "Data Structures and Algorithms"
                },
                {
                    question: "What is cybersecurity?",
                    options: [
                        "Internet speed optimization",
                        "Protection of digital systems from threats",
                        "Computer hardware repair",
                        "Software development"
                    ],
                    correct: 1,
                    difficulty: "medium",
                    topic: "Cybersecurity"
                }
            ]
        };

        // Extended question bank for generating more questions
        this.questionBank = {
            'Computer Fundamentals': {
                concepts: ['computer', 'hardware', 'software', 'data', 'information'],
                questions: [
                    {
                        template: 'What is the main function of {concept}?',
                        options: ['To store data', 'To process information', 'To display output', 'To provide input'],
                        correct: 1
                    }
                ]
            },
            'Programming Fundamentals': {
                concepts: ['variable', 'function', 'loop', 'condition', 'array'],
                questions: [
                    {
                        template: 'What is a {concept} in programming?',
                        options: ['A constant value', 'A storage location', 'A function call', 'A data type'],
                        correct: 1
                    }
                ]
            },
            'Database Concepts': {
                concepts: ['primary key', 'foreign key', 'table', 'query', 'index'],
                questions: [
                    {
                        template: 'What is a {concept} in databases?',
                        options: ['A data type', 'A unique identifier', 'A storage method', 'A query language'],
                        correct: 1
                    }
                ]
            }
        };
    }

    // Generate a unique hash for question content to prevent duplicates
    generateQuestionHash(questionText, options) {
        const content = questionText + options.join('');
        return crypto.createHash('md5').update(content).digest('hex');
    }

    // Generate questions for a specific grade
    async generateQuestionsForGrade(grade, targetCount = 300) {
        const db = database.getDb();
        const subject = 'Computer Science';

        console.log(`Generating ${targetCount} Computer Science questions for Grade ${grade}...`);

        // Get existing question count
        const existingCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions WHERE grade = ? AND subject = ?',
                [grade, subject], (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                });
        });

        if (existingCount >= targetCount) {
            console.log(`Grade ${grade} already has ${existingCount} Computer Science questions. Skipping.`);
            return existingCount;
        }

        const questionsToGenerate = targetCount - existingCount;
        const baseQuestions = this.computerScienceQuestions[grade] || [];
        const topics = this.subjectTopics[grade]['Computer Science'] || [];

        const generatedQuestions = [];
        const usedHashes = new Set();

        // Add base questions first
        for (const baseQ of baseQuestions) {
            const hash = this.generateQuestionHash(baseQ.question, baseQ.options);
            if (!usedHashes.has(hash)) {
                generatedQuestions.push({
                    ...baseQ,
                    subject: subject,
                    grade: grade,
                    hash: hash
                });
                usedHashes.add(hash);
            }
        }

        // Generate additional questions to reach target
        while (generatedQuestions.length < questionsToGenerate) {
            const topic = topics[Math.floor(Math.random() * topics.length)];
            const difficulty = this.getRandomDifficulty();

            const question = this.generateTopicSpecificQuestion(topic, difficulty, grade);
            const hash = this.generateQuestionHash(question.question, question.options);

            if (!usedHashes.has(hash)) {
                generatedQuestions.push({
                    ...question,
                    subject: subject,
                    grade: grade,
                    topic: topic,
                    hash: hash
                });
                usedHashes.add(hash);
            }
        }

        // Insert questions into database
        let insertedCount = 0;
        for (const question of generatedQuestions) {
            try {
                await this.insertQuestion(question);
                insertedCount++;

                if (insertedCount % 50 === 0) {
                    console.log(`Inserted ${insertedCount}/${questionsToGenerate} Computer Science questions for Grade ${grade}`);
                }
            } catch (error) {
                console.error(`Error inserting question: ${error.message}`);
            }
        }

        console.log(`✅ Generated ${insertedCount} Computer Science questions for Grade ${grade}`);
        return existingCount + insertedCount;
    }

    // Generate topic-specific questions
    generateTopicSpecificQuestion(topic, difficulty, grade) {
        // Use base questions if available, otherwise generate new ones
        const baseQuestions = this.computerScienceQuestions[grade] || [];
        const topicQuestions = baseQuestions.filter(q => q.topic === topic);

        if (topicQuestions.length > 0 && Math.random() < 0.3) {
            // 30% chance to use existing question as template
            const baseQ = topicQuestions[Math.floor(Math.random() * topicQuestions.length)];
            return this.createVariation(baseQ, topic, difficulty);
        }

        // Generate new question based on topic
        return this.generateNewQuestion(topic, difficulty, grade);
    }

    // Create variation of existing question
    createVariation(baseQuestion, topic, difficulty) {
        const variations = [
            {
                question: `Which statement about ${topic.toLowerCase()} is correct?`,
                options: [
                    `${topic} is not important in computing`,
                    `${topic} is essential for computer systems`,
                    `${topic} is only used in gaming`,
                    `${topic} is outdated technology`
                ],
                correct: 1
            },
            {
                question: `What is the primary benefit of ${topic.toLowerCase()}?`,
                options: [
                    'Increased complexity',
                    'Better performance and efficiency',
                    'Higher costs',
                    'More errors'
                ],
                correct: 1
            }
        ];

        const variation = variations[Math.floor(Math.random() * variations.length)];
        return {
            question: variation.question,
            options: variation.options,
            correct: variation.correct,
            difficulty: difficulty
        };
    }

    // Generate completely new question
    generateNewQuestion(topic, difficulty, grade) {
        const questionTypes = [
            {
                question: `In Grade ${grade} Computer Science, ${topic.toLowerCase()} is used for:`,
                options: [
                    'Entertainment only',
                    'Educational and practical applications',
                    'Decoration purposes',
                    'No specific purpose'
                ],
                correct: 1
            },
            {
                question: `Which is a key feature of ${topic.toLowerCase()}?`,
                options: [
                    'Complexity without purpose',
                    'Efficiency and reliability',
                    'High cost and low benefit',
                    'Limited functionality'
                ],
                correct: 1
            },
            {
                question: `Students learning ${topic.toLowerCase()} should focus on:`,
                options: [
                    'Memorizing without understanding',
                    'Understanding concepts and applications',
                    'Avoiding practical work',
                    'Theory only'
                ],
                correct: 1
            }
        ];

        const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        return {
            question: questionType.question,
            options: questionType.options,
            correct: questionType.correct,
            difficulty: difficulty
        };
    }

    // Get random difficulty based on distribution
    getRandomDifficulty() {
        const rand = Math.random();
        if (rand < 0.5) return 'easy';      // 50% easy
        if (rand < 0.8) return 'medium';    // 30% medium
        return 'hard';                      // 20% hard
    }

    // Insert question into database
    async insertQuestion(questionData) {
        const db = database.getDb();

        return new Promise((resolve, reject) => {
            db.serialize(() => {
                // Insert question
                db.run(`INSERT INTO questions (question_text, subject, grade, difficulty, topic) 
                        VALUES (?, ?, ?, ?, ?)`,
                    [questionData.question, questionData.subject, questionData.grade,
                    questionData.difficulty, questionData.topic],
                    function (err) {
                        if (err) {
                            reject(err);
                            return;
                        }

                        const questionId = this.lastID;

                        // Insert options
                        const optionPromises = questionData.options.map((option, index) => {
                            return new Promise((resolveOption, rejectOption) => {
                                db.run(`INSERT INTO options (question_id, option_text, option_order, is_correct) 
                                        VALUES (?, ?, ?, ?)`,
                                    [questionId, option, index + 1, index === questionData.correct ? 1 : 0],
                                    (err) => {
                                        if (err) rejectOption(err);
                                        else resolveOption();
                                    }
                                );
                            });
                        });

                        Promise.all(optionPromises)
                            .then(() => resolve(questionId))
                            .catch(reject);
                    }
                );
            });
        });
    }

    // Seed all grades with Computer Science questions only
    async seedAllGrades() {
        const grades = [6, 7, 8, 9, 11];
        const results = {};

        console.log('🌱 Starting Computer Science question seeding for all grades...');
        console.log('📚 Subject: Computer Science only');

        for (const grade of grades) {
            try {
                const count = await this.generateQuestionsForGrade(grade, 300);
                results[grade] = count;
            } catch (error) {
                console.error(`Error seeding Grade ${grade}:`, error);
                results[grade] = 0;
            }
        }

        console.log('✅ Computer Science question seeding completed!');
        console.log('📊 Results:', results);

        const totalQuestions = Object.values(results).reduce((sum, count) => sum + count, 0);
        console.log(`🎯 Total Computer Science questions: ${totalQuestions}`);

        return results;
    }

    // Get statistics about generated questions
    async getStatistics() {
        const db = database.getDb();

        return new Promise((resolve, reject) => {
            db.all(`SELECT 
                        grade, 
                        subject,
                        difficulty,
                        COUNT(*) as count 
                    FROM questions 
                    WHERE subject = 'Computer Science'
                    GROUP BY grade, subject, difficulty 
                    ORDER BY grade, difficulty`,
                [], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });
    }
}

module.exports = EnhancedQuestionSeeder;