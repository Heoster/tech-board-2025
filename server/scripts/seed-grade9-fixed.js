require('dotenv').config();
const database = require('../config/database');

const grade9Questions = [
    // Programming Fundamentals
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a variable in programming?',
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
        question_text: 'Which of the following is a programming language?',
        options: [
            { text: 'HTML', is_correct: false },
            { text: 'Python', is_correct: true },
            { text: 'CSS', is_correct: false },
            { text: 'HTTP', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What does "debugging" mean in programming?',
        options: [
            { text: 'Writing new code', is_correct: false },
            { text: 'Finding and fixing errors', is_correct: true },
            { text: 'Deleting code', is_correct: false },
            { text: 'Running code', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is the purpose of a loop in programming?',
        options: [
            { text: 'To store data', is_correct: false },
            { text: 'To repeat code multiple times', is_correct: true },
            { text: 'To create variables', is_correct: false },
            { text: 'To end a program', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'Which symbol is commonly used for assignment in programming?',
        options: [
            { text: '==', is_correct: false },
            { text: '=', is_correct: true },
            { text: '!=', is_correct: false },
            { text: '>=', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is an algorithm?',
        options: [
            { text: 'A programming language', is_correct: false },
            { text: 'A step-by-step procedure to solve a problem', is_correct: true },
            { text: 'A type of computer', is_correct: false },
            { text: 'A software application', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What does IDE stand for?',
        options: [
            { text: 'Internet Development Environment', is_correct: false },
            { text: 'Integrated Development Environment', is_correct: true },
            { text: 'Internal Data Exchange', is_correct: false },
            { text: 'Interactive Design Editor', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is the difference between "=" and "==" in programming?',
        options: [
            { text: 'No difference', is_correct: false },
            { text: '= is assignment, == is comparison', is_correct: true },
            { text: '= is comparison, == is assignment', is_correct: false },
            { text: 'Both are used for loops', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is pseudocode?',
        options: [
            { text: 'Fake code that doesn\'t work', is_correct: false },
            { text: 'Plain language description of program logic', is_correct: true },
            { text: 'A programming language', is_correct: false },
            { text: 'Encrypted code', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is a flowchart used for?',
        options: [
            { text: 'Drawing pictures', is_correct: false },
            { text: 'Visualizing program flow and logic', is_correct: true },
            { text: 'Writing code', is_correct: false },
            { text: 'Testing programs', is_correct: false }
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
        difficulty: 'medium',
        question_text: 'What does "syntax" mean in programming?',
        options: [
            { text: 'The meaning of code', is_correct: false },
            { text: 'The rules for writing code', is_correct: true },
            { text: 'The speed of execution', is_correct: false },
            { text: 'The size of the program', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a compiler?',
        options: [
            { text: 'A text editor', is_correct: false },
            { text: 'A program that translates code to machine language', is_correct: true },
            { text: 'A debugging tool', is_correct: false },
            { text: 'A type of loop', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is recursion in programming?',
        options: [
            { text: 'A function calling itself', is_correct: true },
            { text: 'A type of loop', is_correct: false },
            { text: 'An error condition', is_correct: false },
            { text: 'A variable type', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is the purpose of comments in code?',
        options: [
            { text: 'To make the program run faster', is_correct: false },
            { text: 'To explain what the code does', is_correct: true },
            { text: 'To create variables', is_correct: false },
            { text: 'To fix errors', is_correct: false }
        ]
    },
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
        difficulty: 'medium',
        question_text: 'What is an array?',
        options: [
            { text: 'A single variable', is_correct: false },
            { text: 'A collection of elements of the same type', is_correct: true },
            { text: 'A function', is_correct: false },
            { text: 'A loop', is_correct: false }
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
            { text: 'Data given to a program', is_correct: false },
            { text: 'Data produced by a program', is_correct: true },
            { text: 'A programming language', is_correct: false },
            { text: 'A type of loop', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is a conditional statement?',
        options: [
            { text: 'A statement that repeats code', is_correct: false },
            { text: 'A statement that executes code based on a condition', is_correct: true },
            { text: 'A statement that defines variables', is_correct: false },
            { text: 'A statement that ends the program', is_correct: false }
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
        difficulty: 'basic',
        question_text: 'What is a string in programming?',
        options: [
            { text: 'A sequence of characters', is_correct: true },
            { text: 'A number', is_correct: false },
            { text: 'A boolean value', is_correct: false },
            { text: 'A loop', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is the purpose of indentation in programming?',
        options: [
            { text: 'To make code look pretty', is_correct: false },
            { text: 'To show code structure and improve readability', is_correct: true },
            { text: 'To make programs run faster', is_correct: false },
            { text: 'To create variables', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a boolean in programming?',
        options: [
            { text: 'A data type that can be true or false', is_correct: true },
            { text: 'A type of number', is_correct: false },
            { text: 'A text string', is_correct: false },
            { text: 'A programming language', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'advanced',
        question_text: 'What is the difference between a while loop and a for loop?',
        options: [
            { text: 'No difference', is_correct: false },
            { text: 'While loops are condition-based, for loops are count-based', is_correct: true },
            { text: 'For loops are faster', is_correct: false },
            { text: 'While loops are newer', is_correct: false }
        ]
    },
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is a parameter in a function?',
        options: [
            { text: 'The result of the function', is_correct: false },
            { text: 'A value passed to the function', is_correct: true },
            { text: 'The name of the function', is_correct: false },
            { text: 'An error in the function', is_correct: false }
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
    {
        grade: 9,
        difficulty: 'medium',
        question_text: 'What is scope in programming?',
        options: [
            { text: 'The speed of a program', is_correct: false },
            { text: 'Where variables can be accessed in code', is_correct: true },
            { text: 'The size of a program', is_correct: false },
            { text: 'The type of programming language', is_correct: false }
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
    {
        grade: 9,
        difficulty: 'basic',
        question_text: 'What is a constant in programming?',
        options: [
            { text: 'A value that cannot be changed', is_correct: true },
            { text: 'A variable that changes often', is_correct: false },
            { text: 'A type of loop', is_correct: false },
            { text: 'A function', is_correct: false }
        ]
    }
];

async function seedGrade9Questions() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('Starting Grade 9 questions seeding...');

        let addedCount = 0;
        let basicCount = 0;
        let mediumCount = 0;
        let advancedCount = 0;

        for (const questionData of grade9Questions) {
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

        console.log(`Successfully added ${addedCount} Grade 9 questions!`);
        console.log('Difficulty distribution:');
        console.log(`- Basic: ${basicCount} questions`);
        console.log(`- Medium: ${mediumCount} questions`);
        console.log(`- Advanced: ${advancedCount} questions`);

    } catch (error) {
        console.error('Error seeding Grade 9 questions:', error);
    } finally {
        await database.close();
    }
}

if (require.main === module) {
    seedGrade9Questions();
}

module.exports = { seedGrade9Questions };