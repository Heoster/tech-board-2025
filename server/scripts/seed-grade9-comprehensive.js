require('dotenv').config();
const database = require('../config/database');

const grade9ComprehensiveQuestions = [
    // Programming and Logic - Basic Level
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is the first step in problem solving?',
        options: [
            { text: 'Understanding the problem', is_correct: true },
            { text: 'Writing code', is_correct: false },
            { text: 'Testing the solution', is_correct: false },
            { text: 'Debugging', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Which of these is a programming language?',
        options: [
            { text: 'Java', is_correct: true },
            { text: 'HTML', is_correct: false },
            { text: 'CSS', is_correct: false },
            { text: 'HTTP', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What does "syntax" mean in programming?',
        options: [
            { text: 'The rules for writing code', is_correct: true },
            { text: 'The meaning of code', is_correct: false },
            { text: 'The speed of execution', is_correct: false },
            { text: 'The size of the program', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a variable?',
        options: [
            { text: 'A storage location with a name', is_correct: true },
            { text: 'A type of loop', is_correct: false },
            { text: 'A function', is_correct: false },
            { text: 'A comment', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is an algorithm?',
        options: [
            { text: 'A step-by-step procedure to solve a problem', is_correct: true },
            { text: 'A programming language', is_correct: false },
            { text: 'A type of computer', is_correct: false },
            { text: 'A software application', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What does "debugging" mean?',
        options: [
            { text: 'Finding and fixing errors in code', is_correct: true },
            { text: 'Writing new code', is_correct: false },
            { text: 'Deleting code', is_correct: false },
            { text: 'Running code', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is pseudocode?',
        options: [
            { text: 'Plain language description of program logic', is_correct: true },
            { text: 'Fake code that doesn\'t work', is_correct: false },
            { text: 'A programming language', is_correct: false },
            { text: 'Encrypted code', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a function in programming?',
        options: [
            { text: 'A reusable block of code', is_correct: true },
            { text: 'A type of variable', is_correct: false },
            { text: 'A loop structure', is_correct: false },
            { text: 'An error message', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a compiler?',
        options: [
            { text: 'A program that translates code to machine language', is_correct: true },
            { text: 'A text editor', is_correct: false },
            { text: 'A debugging tool', is_correct: false },
            { text: 'A type of loop', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What does IDE stand for?',
        options: [
            { text: 'Integrated Development Environment', is_correct: true },
            { text: 'Internet Development Environment', is_correct: false },
            { text: 'Internal Data Exchange', is_correct: false },
            { text: 'Interactive Design Editor', is_correct: false }
        ]
    },

    // Programming and Logic - Medium Level
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is the purpose of a loop?',
        options: [
            { text: 'To repeat code multiple times', is_correct: true },
            { text: 'To store data', is_correct: false },
            { text: 'To create variables', is_correct: false },
            { text: 'To end a program', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is the difference between "=" and "=="?',
        options: [
            { text: '= is assignment, == is comparison', is_correct: true },
            { text: '= is comparison, == is assignment', is_correct: false },
            { text: 'No difference', is_correct: false },
            { text: 'Both are used for loops', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is a conditional statement?',
        options: [
            { text: 'A statement that executes code based on a condition', is_correct: true },
            { text: 'A statement that repeats code', is_correct: false },
            { text: 'A statement that defines variables', is_correct: false },
            { text: 'A statement that ends the program', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is an array?',
        options: [
            { text: 'A collection of elements of the same type', is_correct: true },
            { text: 'A single variable', is_correct: false },
            { text: 'A function', is_correct: false },
            { text: 'A loop', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is the purpose of comments in code?',
        options: [
            { text: 'To explain what the code does', is_correct: true },
            { text: 'To make the program run faster', is_correct: false },
            { text: 'To create variables', is_correct: false },
            { text: 'To fix errors', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is a parameter in a function?',
        options: [
            { text: 'A value passed to the function', is_correct: true },
            { text: 'The result of the function', is_correct: false },
            { text: 'The name of the function', is_correct: false },
            { text: 'An error in the function', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is scope in programming?',
        options: [
            { text: 'Where variables can be accessed in code', is_correct: true },
            { text: 'The speed of a program', is_correct: false },
            { text: 'The size of a program', is_correct: false },
            { text: 'The type of programming language', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is the purpose of indentation in programming?',
        options: [
            { text: 'To show code structure and improve readability', is_correct: true },
            { text: 'To make code look pretty', is_correct: false },
            { text: 'To make programs run faster', is_correct: false },
            { text: 'To create variables', is_correct: false }
        ]
    },

    // Programming and Logic - Advanced Level
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is recursion?',
        options: [
            { text: 'A function calling itself', is_correct: true },
            { text: 'A type of loop', is_correct: false },
            { text: 'An error condition', is_correct: false },
            { text: 'A variable type', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is object-oriented programming?',
        options: [
            { text: 'Programming with objects and classes', is_correct: true },
            { text: 'Programming with only functions', is_correct: false },
            { text: 'Programming without variables', is_correct: false },
            { text: 'Programming with only loops', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is the difference between a while loop and a for loop?',
        options: [
            { text: 'While loops are condition-based, for loops are count-based', is_correct: true },
            { text: 'No difference', is_correct: false },
            { text: 'For loops are faster', is_correct: false },
            { text: 'While loops are newer', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is an infinite loop?',
        options: [
            { text: 'A loop that never ends', is_correct: true },
            { text: 'A very fast loop', is_correct: false },
            { text: 'A loop with many iterations', is_correct: false },
            { text: 'A broken loop', is_correct: false }
        ]
    },

    // Data Types and Structures
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a data type?',
        options: [
            { text: 'A kind of variable that specifies what type of data it can hold', is_correct: true },
            { text: 'A programming language', is_correct: false },
            { text: 'A type of loop', is_correct: false },
            { text: 'A function', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a string?',
        options: [
            { text: 'A sequence of characters', is_correct: true },
            { text: 'A number', is_correct: false },
            { text: 'A boolean value', is_correct: false },
            { text: 'A loop', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a boolean?',
        options: [
            { text: 'A data type that can be true or false', is_correct: true },
            { text: 'A type of number', is_correct: false },
            { text: 'A text string', is_correct: false },
            { text: 'A programming language', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a constant?',
        options: [
            { text: 'A value that cannot be changed', is_correct: true },
            { text: 'A variable that changes often', is_correct: false },
            { text: 'A type of loop', is_correct: false },
            { text: 'A function', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What does "input" mean in programming?',
        options: [
            { text: 'Data given to a program', is_correct: true },
            { text: 'Data produced by a program', is_correct: false },
            { text: 'A type of variable', is_correct: false },
            { text: 'An error message', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What does "output" mean in programming?',
        options: [
            { text: 'Data produced by a program', is_correct: true },
            { text: 'Data given to a program', is_correct: false },
            { text: 'A programming language', is_correct: false },
            { text: 'A type of loop', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What does "return" do in a function?',
        options: [
            { text: 'Ends the function and sends back a value', is_correct: true },
            { text: 'Starts the function', is_correct: false },
            { text: 'Creates a variable', is_correct: false },
            { text: 'Prints text', is_correct: false }
        ]
    },

    // Computer Systems and Networks
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a computer network?',
        options: [
            { text: 'Connected computers that can share resources', is_correct: true },
            { text: 'A single computer', is_correct: false },
            { text: 'A computer game', is_correct: false },
            { text: 'A computer program', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is the Internet?',
        options: [
            { text: 'A global network of interconnected computers', is_correct: true },
            { text: 'A single computer', is_correct: false },
            { text: 'A software program', is_correct: false },
            { text: 'A type of cable', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What does HTTP stand for?',
        options: [
            { text: 'HyperText Transfer Protocol', is_correct: true },
            { text: 'High Technology Transfer Protocol', is_correct: false },
            { text: 'Home Text Transfer Protocol', is_correct: false },
            { text: 'Hardware Text Transfer Protocol', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is a server?',
        options: [
            { text: 'A computer that provides services to other computers', is_correct: true },
            { text: 'A person who serves food', is_correct: false },
            { text: 'A type of software', is_correct: false },
            { text: 'A computer game', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is bandwidth?',
        options: [
            { text: 'The amount of data that can be transmitted', is_correct: true },
            { text: 'The width of a cable', is_correct: false },
            { text: 'The length of a network', is_correct: false },
            { text: 'The number of computers', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is an IP address?',
        options: [
            { text: 'Internet Protocol address - unique identifier for devices', is_correct: true },
            { text: 'Important Person address', is_correct: false },
            { text: 'Internet Phone address', is_correct: false },
            { text: 'Internal Program address', is_correct: false }
        ]
    },

    // Digital Citizenship and Ethics
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is cyberbullying?',
        options: [
            { text: 'Using technology to harass or intimidate others', is_correct: true },
            { text: 'Playing computer games', is_correct: false },
            { text: 'Learning about computers', is_correct: false },
            { text: 'Using social media', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is digital footprint?',
        options: [
            { text: 'The trail of data you leave when using the internet', is_correct: true },
            { text: 'The size of your computer', is_correct: false },
            { text: 'The speed of your internet', is_correct: false },
            { text: 'The cost of your computer', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is plagiarism?',
        options: [
            { text: 'Using someone else\'s work without permission or credit', is_correct: true },
            { text: 'Creating original work', is_correct: false },
            { text: 'Sharing your own work', is_correct: false },
            { text: 'Helping others with their work', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is phishing?',
        options: [
            { text: 'A cyber attack to steal personal information', is_correct: true },
            { text: 'A type of fishing', is_correct: false },
            { text: 'A computer game', is_correct: false },
            { text: 'A type of software', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'Why is it important to use strong passwords?',
        options: [
            { text: 'To protect your accounts from unauthorized access', is_correct: true },
            { text: 'To make typing harder', is_correct: false },
            { text: 'To impress your friends', is_correct: false },
            { text: 'To use more memory', is_correct: false }
        ]
    },

    // Software and Applications
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is an operating system?',
        options: [
            { text: 'Software that manages computer hardware and software', is_correct: true },
            { text: 'A computer game', is_correct: false },
            { text: 'A web browser', is_correct: false },
            { text: 'A text editor', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is open source software?',
        options: [
            { text: 'Software with source code that anyone can inspect and modify', is_correct: true },
            { text: 'Software that is always free', is_correct: false },
            { text: 'Software that runs on any computer', is_correct: false },
            { text: 'Software that is very fast', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a database?',
        options: [
            { text: 'An organized collection of data', is_correct: true },
            { text: 'A type of computer', is_correct: false },
            { text: 'A programming language', is_correct: false },
            { text: 'A web browser', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is cloud computing?',
        options: [
            { text: 'Using internet-based computing services', is_correct: true },
            { text: 'Computing in the clouds', is_correct: false },
            { text: 'Weather prediction', is_correct: false },
            { text: 'Sky photography', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is artificial intelligence?',
        options: [
            { text: 'Computer systems that can perform tasks requiring human intelligence', is_correct: true },
            { text: 'Fake intelligence', is_correct: false },
            { text: 'Natural intelligence', is_correct: false },
            { text: 'Human intelligence', is_correct: false }
        ]
    },

    // Problem Solving and Logic
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a flowchart?',
        options: [
            { text: 'A visual representation of a process or algorithm', is_correct: true },
            { text: 'A type of chart showing water flow', is_correct: false },
            { text: 'A programming language', is_correct: false },
            { text: 'A computer game', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is logical thinking?',
        options: [
            { text: 'Reasoning in a clear, systematic way', is_correct: true },
            { text: 'Thinking very fast', is_correct: false },
            { text: 'Thinking about computers', is_correct: false },
            { text: 'Thinking about logic puzzles only', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is pattern recognition?',
        options: [
            { text: 'Identifying similarities or regularities in data', is_correct: true },
            { text: 'Recognizing people\'s faces', is_correct: false },
            { text: 'Drawing patterns', is_correct: false },
            { text: 'Making patterns', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is decomposition in problem solving?',
        options: [
            { text: 'Breaking down complex problems into smaller parts', is_correct: true },
            { text: 'Destroying problems', is_correct: false },
            { text: 'Making problems more complex', is_correct: false },
            { text: 'Ignoring problems', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is abstraction?',
        options: [
            { text: 'Focusing on essential features while ignoring details', is_correct: true },
            { text: 'Making things more complex', is_correct: false },
            { text: 'Abstract art', is_correct: false },
            { text: 'Mathematical calculations', is_correct: false }
        ]
    },

    // Technology Trends and Future
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is machine learning?',
        options: [
            { text: 'A method of teaching computers to learn from data', is_correct: true },
            { text: 'Teaching machines to move', is_correct: false },
            { text: 'Learning about machines', is_correct: false },
            { text: 'Machine repair', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is the Internet of Things (IoT)?',
        options: [
            { text: 'Network of physical devices connected to the internet', is_correct: true },
            { text: 'A collection of websites', is_correct: false },
            { text: 'Internet shopping', is_correct: false },
            { text: 'Social media platforms', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is virtual reality?',
        options: [
            { text: 'Computer-generated simulation of a 3D environment', is_correct: true },
            { text: 'Reality that doesn\'t exist', is_correct: false },
            { text: 'Television programs', is_correct: false },
            { text: 'Computer games', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a smartphone?',
        options: [
            { text: 'A mobile phone with computer capabilities', is_correct: true },
            { text: 'A very intelligent phone', is_correct: false },
            { text: 'A phone for smart people', is_correct: false },
            { text: 'A phone that talks', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is big data?',
        options: [
            { text: 'Extremely large datasets that require special tools to process', is_correct: true },
            { text: 'Data that takes up a lot of space', is_correct: false },
            { text: 'Important data', is_correct: false },
            { text: 'Data about big things', is_correct: false }
        ]
    },

    // Additional Programming Concepts
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a bug in programming?',
        options: [
            { text: 'An error or flaw in code', is_correct: true },
            { text: 'An insect in the computer', is_correct: false },
            { text: 'A feature of the program', is_correct: false },
            { text: 'A type of virus', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is version control?',
        options: [
            { text: 'A system for tracking changes in code over time', is_correct: true },
            { text: 'Controlling the version of software you buy', is_correct: false },
            { text: 'Checking software versions', is_correct: false },
            { text: 'Updating software', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is an API?',
        options: [
            { text: 'Application Programming Interface - a way for programs to communicate', is_correct: true },
            { text: 'Advanced Programming Interface', is_correct: false },
            { text: 'Automatic Program Installation', is_correct: false },
            { text: 'Application Process Integration', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is testing in software development?',
        options: [
            { text: 'Checking if the software works correctly', is_correct: true },
            { text: 'Taking exams about software', is_correct: false },
            { text: 'Trying different software', is_correct: false },
            { text: 'Teaching software', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a user interface?',
        options: [
            { text: 'The way users interact with a program', is_correct: true },
            { text: 'The inside of a computer', is_correct: false },
            { text: 'A type of cable', is_correct: false },
            { text: 'A programming language', is_correct: false }
        ]
    }
];

async function seedGrade9Comprehensive() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('Starting Grade 9 comprehensive questions seeding...');

        let addedCount = 0;
        let basicCount = 0;
        let mediumCount = 0;
        let advancedCount = 0;

        for (const questionData of grade9ComprehensiveQuestions) {
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

        console.log(`Successfully added ${addedCount} comprehensive Grade 9 questions!`);
        console.log('Difficulty distribution:');
        console.log(`- Basic: ${basicCount} questions`);
        console.log(`- Medium: ${mediumCount} questions`);
        console.log(`- Advanced: ${advancedCount} questions`);

    } catch (error) {
        console.error('Error seeding Grade 9 comprehensive questions:', error);
    } finally {
        await database.close();
    }
}

if (require.main === module) {
    seedGrade9Comprehensive();
}

module.exports = { seedGrade9Comprehensive };