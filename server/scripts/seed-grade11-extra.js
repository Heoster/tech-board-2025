require('dotenv').config();
const database = require('../config/database');

const grade11ExtraQuestions = [
    // Advanced Programming Concepts
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'What is polymorphism in object-oriented programming?',
        options: [
            { text: 'The ability of objects to take multiple forms', is_correct: true },
            { text: 'Having multiple variables', is_correct: false },
            { text: 'Using multiple programming languages', is_correct: false },
            { text: 'Creating multiple functions', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What is inheritance in programming?',
        options: [
            { text: 'A class acquiring properties from another class', is_correct: true },
            { text: 'Getting money from relatives', is_correct: false },
            { text: 'Copying code from others', is_correct: false },
            { text: 'Learning from teachers', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What does CSS stand for?',
        options: [
            { text: 'Cascading Style Sheets', is_correct: true },
            { text: 'Computer Style Sheets', is_correct: false },
            { text: 'Creative Style Sheets', is_correct: false },
            { text: 'Colorful Style Sheets', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What is the purpose of CSS?',
        options: [
            { text: 'To style and format web pages', is_correct: true },
            { text: 'To create databases', is_correct: false },
            { text: 'To write server-side code', is_correct: false },
            { text: 'To manage files', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What does SQL stand for?',
        options: [
            { text: 'Structured Query Language', is_correct: true },
            { text: 'Simple Query Language', is_correct: false },
            { text: 'Standard Query Language', is_correct: false },
            { text: 'System Query Language', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What is the purpose of SQL?',
        options: [
            { text: 'To manage and query databases', is_correct: true },
            { text: 'To style web pages', is_correct: false },
            { text: 'To create animations', is_correct: false },
            { text: 'To write mobile apps', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'What is a primary key in a database?',
        options: [
            { text: 'A unique identifier for each record', is_correct: true },
            { text: 'The most important data', is_correct: false },
            { text: 'The first column in a table', is_correct: false },
            { text: 'A password for the database', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What is JavaScript primarily used for?',
        options: [
            { text: 'Making web pages interactive', is_correct: true },
            { text: 'Creating databases', is_correct: false },
            { text: 'Designing graphics', is_correct: false },
            { text: 'Managing files', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What is a framework in programming?',
        options: [
            { text: 'A pre-built structure for developing applications', is_correct: true },
            { text: 'A type of computer', is_correct: false },
            { text: 'A programming language', is_correct: false },
            { text: 'A debugging tool', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'What is the difference between frontend and backend?',
        options: [
            { text: 'Frontend is user interface, backend is server-side logic', is_correct: true },
            { text: 'Frontend is harder than backend', is_correct: false },
            { text: 'Frontend uses databases, backend doesn\'t', is_correct: false },
            { text: 'There is no difference', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What is a web server?',
        options: [
            { text: 'A computer that serves web pages to users', is_correct: true },
            { text: 'A person who serves web pages', is_correct: false },
            { text: 'A web browser', is_correct: false },
            { text: 'A website', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What is responsive web design?',
        options: [
            { text: 'Design that adapts to different screen sizes', is_correct: true },
            { text: 'Design that responds quickly', is_correct: false },
            { text: 'Design that is very colorful', is_correct: false },
            { text: 'Design that makes sounds', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'What is AJAX?',
        options: [
            { text: 'Asynchronous JavaScript and XML for dynamic web content', is_correct: true },
            { text: 'A cleaning product', is_correct: false },
            { text: 'A programming language', is_correct: false },
            { text: 'A type of database', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What is a domain name?',
        options: [
            { text: 'A human-readable address for a website', is_correct: true },
            { text: 'The name of a computer', is_correct: false },
            { text: 'A type of software', is_correct: false },
            { text: 'A programming language', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What is version control used for?',
        options: [
            { text: 'Tracking changes in code and collaboration', is_correct: true },
            { text: 'Controlling software versions', is_correct: false },
            { text: 'Managing computer versions', is_correct: false },
            { text: 'Updating operating systems', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'What is Git?',
        options: [
            { text: 'A distributed version control system', is_correct: true },
            { text: 'A programming language', is_correct: false },
            { text: 'A web browser', is_correct: false },
            { text: 'A database system', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What is an algorithm?',
        options: [
            { text: 'A step-by-step procedure to solve a problem', is_correct: true },
            { text: 'A type of computer', is_correct: false },
            { text: 'A programming language', is_correct: false },
            { text: 'A web browser', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What is Big O notation?',
        options: [
            { text: 'A way to describe algorithm efficiency', is_correct: true },
            { text: 'A type of number', is_correct: false },
            { text: 'A programming language', is_correct: false },
            { text: 'A database query', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'What is machine learning?',
        options: [
            { text: 'A method of teaching computers to learn from data', is_correct: true },
            { text: 'Teaching machines to move', is_correct: false },
            { text: 'Learning about machines', is_correct: false },
            { text: 'Machine repair', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What is cybersecurity?',
        options: [
            { text: 'Protection of digital systems from threats', is_correct: true },
            { text: 'Security for cyber cafes', is_correct: false },
            { text: 'Security cameras', is_correct: false },
            { text: 'Internet security software', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What is encryption?',
        options: [
            { text: 'Converting data into a coded format', is_correct: true },
            { text: 'Deleting data', is_correct: false },
            { text: 'Copying data', is_correct: false },
            { text: 'Printing data', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'What is blockchain?',
        options: [
            { text: 'A distributed ledger technology', is_correct: true },
            { text: 'A type of chain', is_correct: false },
            { text: 'A programming language', is_correct: false },
            { text: 'A web browser', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What is cloud computing?',
        options: [
            { text: 'Using internet-based computing services', is_correct: true },
            { text: 'Computing in the clouds', is_correct: false },
            { text: 'Weather prediction', is_correct: false },
            { text: 'Sky photography', is_correct: false }
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
        difficulty: 'advanced',
        question_text: 'What is microservices architecture?',
        options: [
            { text: 'Breaking applications into small, independent services', is_correct: true },
            { text: 'Very small applications', is_correct: false },
            { text: 'Services for microscopes', is_correct: false },
            { text: 'Micro-sized computers', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What is a mobile app?',
        options: [
            { text: 'An application designed for mobile devices', is_correct: true },
            { text: 'An app that moves around', is_correct: false },
            { text: 'A moving application', is_correct: false },
            { text: 'An app for mobility', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What is the difference between iOS and Android?',
        options: [
            { text: 'iOS is Apple\'s OS, Android is Google\'s OS', is_correct: true },
            { text: 'iOS is newer than Android', is_correct: false },
            { text: 'iOS is for tablets, Android is for phones', is_correct: false },
            { text: 'There is no difference', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'What is artificial intelligence?',
        options: [
            { text: 'Computer systems that simulate human intelligence', is_correct: true },
            { text: 'Fake intelligence', is_correct: false },
            { text: 'Natural intelligence', is_correct: false },
            { text: 'Human intelligence', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What is data science?',
        options: [
            { text: 'Extracting insights from data', is_correct: true },
            { text: 'Science about data storage', is_correct: false },
            { text: 'Scientific data only', is_correct: false },
            { text: 'Data about science', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What is a neural network?',
        options: [
            { text: 'A computing system inspired by biological neural networks', is_correct: true },
            { text: 'A network of nerves', is_correct: false },
            { text: 'A computer network', is_correct: false },
            { text: 'A social network', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'What is quantum computing?',
        options: [
            { text: 'Computing using quantum mechanical phenomena', is_correct: true },
            { text: 'Very fast computing', is_correct: false },
            { text: 'Computing with quantum physics books', is_correct: false },
            { text: 'Computing in small quantities', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What is the Internet of Things (IoT)?',
        options: [
            { text: 'Network of physical devices connected to the internet', is_correct: true },
            { text: 'Internet for things only', is_correct: false },
            { text: 'Things about the internet', is_correct: false },
            { text: 'Internet shopping', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What is virtual reality?',
        options: [
            { text: 'Computer-generated simulation of 3D environments', is_correct: true },
            { text: 'Reality that is not real', is_correct: false },
            { text: 'Virtual games only', is_correct: false },
            { text: 'Reality TV shows', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'What is augmented reality?',
        options: [
            { text: 'Overlaying digital information on the real world', is_correct: true },
            { text: 'Enhanced reality TV', is_correct: false },
            { text: 'Reality with more features', is_correct: false },
            { text: 'Artificial reality', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What is software testing?',
        options: [
            { text: 'Checking if software works correctly', is_correct: true },
            { text: 'Testing software speed', is_correct: false },
            { text: 'Testing software price', is_correct: false },
            { text: 'Testing software color', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What is agile development?',
        options: [
            { text: 'Iterative and flexible software development approach', is_correct: true },
            { text: 'Very fast development', is_correct: false },
            { text: 'Development by agile people', is_correct: false },
            { text: 'Development of agile software', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'What is continuous integration?',
        options: [
            { text: 'Frequently merging code changes and testing automatically', is_correct: true },
            { text: 'Integration that never stops', is_correct: false },
            { text: 'Integrating continuously running software', is_correct: false },
            { text: 'Integration of continuous functions', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What is user experience (UX)?',
        options: [
            { text: 'How users feel when interacting with a product', is_correct: true },
            { text: 'User experiments', is_correct: false },
            { text: 'User expertise', is_correct: false },
            { text: 'User exercises', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What is user interface (UI)?',
        options: [
            { text: 'The visual elements users interact with', is_correct: true },
            { text: 'User information', is_correct: false },
            { text: 'User instructions', is_correct: false },
            { text: 'User identification', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'What is a RESTful API?',
        options: [
            { text: 'An API that follows REST architectural principles', is_correct: true },
            { text: 'An API that helps you rest', is_correct: false },
            { text: 'A very relaxed API', is_correct: false },
            { text: 'An API for restaurants', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What is open source software?',
        options: [
            { text: 'Software with publicly available source code', is_correct: true },
            { text: 'Software that is always free', is_correct: false },
            { text: 'Software with open doors', is_correct: false },
            { text: 'Software that opens sources', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What is a software license?',
        options: [
            { text: 'Legal terms for using software', is_correct: true },
            { text: 'A driving license for software', is_correct: false },
            { text: 'Permission to buy software', is_correct: false },
            { text: 'A software certificate', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'What is containerization in software?',
        options: [
            { text: 'Packaging applications with their dependencies', is_correct: true },
            { text: 'Putting software in containers', is_correct: false },
            { text: 'Shipping software in containers', is_correct: false },
            { text: 'Container-shaped software', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'basic',
        question_text: 'What is debugging?',
        options: [
            { text: 'Finding and fixing errors in code', is_correct: true },
            { text: 'Removing bugs from computers', is_correct: false },
            { text: 'Cleaning computer bugs', is_correct: false },
            { text: 'Bug extermination', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'medium',
        question_text: 'What is code refactoring?',
        options: [
            { text: 'Improving code structure without changing functionality', is_correct: true },
            { text: 'Rewriting code from scratch', is_correct: false },
            { text: 'Adding new features to code', is_correct: false },
            { text: 'Deleting old code', is_correct: false }
        ]
    },
    {
        grade: 11,
        difficulty: 'advanced',
        question_text: 'What is technical debt?',
        options: [
            { text: 'The cost of additional work caused by choosing quick solutions', is_correct: true },
            { text: 'Money owed to technical people', is_correct: false },
            { text: 'Debt for buying technical equipment', is_correct: false },
            { text: 'Technical problems with debt', is_correct: false }
        ]
    }
];

async function seedGrade11Extra() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('Starting Grade 11 extra questions seeding...');

        let addedCount = 0;
        let basicCount = 0;
        let mediumCount = 0;
        let advancedCount = 0;

        for (const questionData of grade11ExtraQuestions) {
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

        console.log(`Successfully added ${addedCount} extra Grade 11 questions!`);
        console.log('Difficulty distribution:');
        console.log(`- Basic: ${basicCount} questions`);
        console.log(`- Medium: ${mediumCount} questions`);
        console.log(`- Advanced: ${advancedCount} questions`);

    } catch (error) {
        console.error('Error seeding Grade 11 extra questions:', error);
    } finally {
        await database.close();
    }
}

if (require.main === module) {
    seedGrade11Extra();
}

module.exports = { seedGrade11Extra };