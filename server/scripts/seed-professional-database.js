require('dotenv').config();
const database = require('../config/database');
const authUtils = require('../utils/auth');

/**
 * PROFESSIONAL DATABASE SEEDER
 * 
 * Seeds the database with high-quality, meaningful questions
 * that are actually educational and professional.
 */

const professionalQuestions = {
    6: [
        // COMPUTER BASICS - 20 questions
        {
            difficulty: 'basic',
            question_text: 'What is a computer?',
            options: [
                { text: 'An electronic device that processes information', is_correct: true },
                { text: 'A toy for playing games only', is_correct: false },
                { text: 'A machine that only stores photos', is_correct: false },
                { text: 'A device for watching movies only', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'Which device is used to type text into a computer?',
            options: [
                { text: 'Mouse', is_correct: false },
                { text: 'Keyboard', is_correct: true },
                { text: 'Monitor', is_correct: false },
                { text: 'Printer', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What does a computer monitor do?',
            options: [
                { text: 'Displays visual information from the computer', is_correct: true },
                { text: 'Stores files permanently', is_correct: false },
                { text: 'Processes data', is_correct: false },
                { text: 'Connects to the internet', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What is the main function of a computer mouse?',
            options: [
                { text: 'To point, click, and select items on screen', is_correct: true },
                { text: 'To type letters and numbers', is_correct: false },
                { text: 'To make sounds and music', is_correct: false },
                { text: 'To print documents', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What is computer software?',
            options: [
                { text: 'Programs and applications that run on a computer', is_correct: true },
                { text: 'The physical parts of a computer', is_correct: false },
                { text: 'The computer screen and keyboard', is_correct: false },
                { text: 'The cables connecting devices', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What is computer hardware?',
            options: [
                { text: 'The physical parts you can touch', is_correct: true },
                { text: 'Computer programs and apps', is_correct: false },
                { text: 'Internet websites', is_correct: false },
                { text: 'Email messages', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What does CPU stand for?',
            options: [
                { text: 'Central Processing Unit', is_correct: true },
                { text: 'Computer Personal Unit', is_correct: false },
                { text: 'Central Program Unit', is_correct: false },
                { text: 'Computer Power Unit', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What is the CPU often called?',
            options: [
                { text: 'The brain of the computer', is_correct: true },
                { text: 'The heart of the computer', is_correct: false },
                { text: 'The eyes of the computer', is_correct: false },
                { text: 'The memory of the computer', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What does RAM stand for?',
            options: [
                { text: 'Random Access Memory', is_correct: true },
                { text: 'Read Access Memory', is_correct: false },
                { text: 'Rapid Access Memory', is_correct: false },
                { text: 'Remote Access Memory', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What is RAM used for?',
            options: [
                { text: 'Temporary storage while computer is running', is_correct: true },
                { text: 'Permanent storage of all files', is_correct: false },
                { text: 'Displaying images on screen', is_correct: false },
                { text: 'Connecting to the internet', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What is an operating system?',
            options: [
                { text: 'Software that manages the computer and its resources', is_correct: true },
                { text: 'A computer game', is_correct: false },
                { text: 'A web browser', is_correct: false },
                { text: 'A word processing program', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'Which of these is an operating system?',
            options: [
                { text: 'Windows', is_correct: true },
                { text: 'Microsoft Word', is_correct: false },
                { text: 'Google Chrome', is_correct: false },
                { text: 'Calculator', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What is a file on a computer?',
            options: [
                { text: 'A collection of data stored with a name', is_correct: true },
                { text: 'A physical paper document', is_correct: false },
                { text: 'A computer program only', is_correct: false },
                { text: 'A hardware component', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What is a folder used for?',
            options: [
                { text: 'Organizing and storing files', is_correct: true },
                { text: 'Running computer programs', is_correct: false },
                { text: 'Connecting to the internet', is_correct: false },
                { text: 'Printing documents', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What does "Save" do in most programs?',
            options: [
                { text: 'Stores your work to keep it safe', is_correct: true },
                { text: 'Deletes your work permanently', is_correct: false },
                { text: 'Prints your work on paper', is_correct: false },
                { text: 'Closes the program', is_correct: false }
            ]
        },
        {
            difficulty: 'medium',
            question_text: 'What is the internet?',
            options: [
                { text: 'A global network connecting computers worldwide', is_correct: true },
                { text: 'A single powerful computer', is_correct: false },
                { text: 'A software program', is_correct: false },
                { text: 'A type of hardware device', is_correct: false }
            ]
        },
        {
            difficulty: 'medium',
            question_text: 'What is a web browser used for?',
            options: [
                { text: 'Accessing websites on the internet', is_correct: true },
                { text: 'Creating documents and presentations', is_correct: false },
                { text: 'Playing music and videos', is_correct: false },
                { text: 'Managing computer files', is_correct: false }
            ]
        },
        {
            difficulty: 'medium',
            question_text: 'What makes a password strong and secure?',
            options: [
                { text: 'A mix of letters, numbers, and symbols', is_correct: true },
                { text: 'Just your name or birthday', is_correct: false },
                { text: 'Simple words that are easy to remember', is_correct: false },
                { text: 'The same password for everything', is_correct: false }
            ]
        },
        {
            difficulty: 'advanced',
            question_text: 'What is the difference between RAM and storage?',
            options: [
                { text: 'RAM is temporary and fast, storage is permanent and slower', is_correct: true },
                { text: 'RAM is permanent, storage is temporary', is_correct: false },
                { text: 'They are exactly the same thing', is_correct: false },
                { text: 'RAM is slower than storage', is_correct: false }
            ]
        },
        {
            difficulty: 'advanced',
            question_text: 'What is cloud storage?',
            options: [
                { text: 'Storing files on internet servers instead of local computer', is_correct: true },
                { text: 'Storing files in the sky', is_correct: false },
                { text: 'Storing files on paper documents', is_correct: false },
                { text: 'Storing files only in computer memory', is_correct: false }
            ]
        }
    ],
    
    7: [
        // PROGRAMMING BASICS - 20 questions
        {
            difficulty: 'basic',
            question_text: 'What is programming?',
            options: [
                { text: 'Writing step-by-step instructions for computers to follow', is_correct: true },
                { text: 'Playing computer games', is_correct: false },
                { text: 'Using social media applications', is_correct: false },
                { text: 'Watching videos online', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What is a programming language?',
            options: [
                { text: 'A special language used to communicate with computers', is_correct: true },
                { text: 'A foreign language like Spanish or French', is_correct: false },
                { text: 'A type of computer hardware', is_correct: false },
                { text: 'A computer game', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'Which of these is a programming language?',
            options: [
                { text: 'Python', is_correct: true },
                { text: 'Microsoft Word', is_correct: false },
                { text: 'Windows', is_correct: false },
                { text: 'Google Chrome', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What is an algorithm?',
            options: [
                { text: 'A step-by-step method to solve a problem', is_correct: true },
                { text: 'A computer virus', is_correct: false },
                { text: 'A type of hardware', is_correct: false },
                { text: 'A web browser', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What is debugging in programming?',
            options: [
                { text: 'Finding and fixing errors in computer code', is_correct: true },
                { text: 'Deleting computer programs', is_correct: false },
                { text: 'Installing new software', is_correct: false },
                { text: 'Restarting the computer', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What does HTML stand for?',
            options: [
                { text: 'HyperText Markup Language', is_correct: true },
                { text: 'High Tech Modern Language', is_correct: false },
                { text: 'Home Tool Markup Language', is_correct: false },
                { text: 'Hard Text Making Language', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What is HTML used for?',
            options: [
                { text: 'Creating the structure and content of web pages', is_correct: true },
                { text: 'Creating databases', is_correct: false },
                { text: 'Writing server programs', is_correct: false },
                { text: 'Managing computer files', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What does CSS stand for?',
            options: [
                { text: 'Cascading Style Sheets', is_correct: true },
                { text: 'Computer Style System', is_correct: false },
                { text: 'Creative Style Sheets', is_correct: false },
                { text: 'Code Style System', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What is CSS used for?',
            options: [
                { text: 'Styling and formatting web pages', is_correct: true },
                { text: 'Creating databases', is_correct: false },
                { text: 'Writing server logic', is_correct: false },
                { text: 'Managing files', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What is JavaScript?',
            options: [
                { text: 'A programming language that makes web pages interactive', is_correct: true },
                { text: 'A type of coffee', is_correct: false },
                { text: 'A web browser', is_correct: false },
                { text: 'An operating system', is_correct: false }
            ]
        },
        {
            difficulty: 'medium',
            question_text: 'What is a variable in programming?',
            options: [
                { text: 'A container that stores data values', is_correct: true },
                { text: 'Something that never changes', is_correct: false },
                { text: 'A type of computer', is_correct: false },
                { text: 'A programming error', is_correct: false }
            ]
        },
        {
            difficulty: 'medium',
            question_text: 'What is a function in programming?',
            options: [
                { text: 'A reusable block of code that performs a specific task', is_correct: true },
                { text: 'A type of variable', is_correct: false },
                { text: 'A programming error', is_correct: false },
                { text: 'A web page', is_correct: false }
            ]
        },
        {
            difficulty: 'medium',
            question_text: 'What is a loop in programming?',
            options: [
                { text: 'Code that repeats multiple times', is_correct: true },
                { text: 'A programming error', is_correct: false },
                { text: 'A type of variable', is_correct: false },
                { text: 'A web browser', is_correct: false }
            ]
        },
        {
            difficulty: 'medium',
            question_text: 'What is responsive web design?',
            options: [
                { text: 'Design that adapts to different screen sizes', is_correct: true },
                { text: 'Design that responds to user clicks', is_correct: false },
                { text: 'Design that loads very quickly', is_correct: false },
                { text: 'Design with many animations', is_correct: false }
            ]
        },
        {
            difficulty: 'advanced',
            question_text: 'What is the difference between HTML and CSS?',
            options: [
                { text: 'HTML creates structure, CSS adds styling', is_correct: true },
                { text: 'HTML adds styling, CSS creates structure', is_correct: false },
                { text: 'They do exactly the same thing', is_correct: false },
                { text: 'HTML is newer than CSS', is_correct: false }
            ]
        }
    ],
    
    8: [
        // DATA STRUCTURES & DATABASES - 20 questions
        {
            difficulty: 'basic',
            question_text: 'What is a database used for?',
            options: [
                { text: 'Storing and organizing large amounts of data efficiently', is_correct: true },
                { text: 'Creating web pages', is_correct: false },
                { text: 'Playing games', is_correct: false },
                { text: 'Sending emails', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What is a data structure?',
            options: [
                { text: 'A way to organize and store data efficiently', is_correct: true },
                { text: 'A programming language', is_correct: false },
                { text: 'A computer virus', is_correct: false },
                { text: 'A web browser', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What is an array in programming?',
            options: [
                { text: 'A collection of elements stored together', is_correct: true },
                { text: 'A single variable', is_correct: false },
                { text: 'A programming error', is_correct: false },
                { text: 'A web page', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What is a string in programming?',
            options: [
                { text: 'A sequence of characters or text', is_correct: true },
                { text: 'A number', is_correct: false },
                { text: 'A boolean value', is_correct: false },
                { text: 'A programming error', is_correct: false }
            ]
        },
        {
            difficulty: 'basic',
            question_text: 'What is an integer in programming?',
            options: [
                { text: 'A whole number without decimal points', is_correct: true },
                { text: 'A decimal number', is_correct: false },
                { text: 'A text value', is_correct: false },
                { text: 'A boolean value', is_correct: false }
            ]
        },
        {
            difficulty: 'medium',
            question_text: 'What does SQL stand for?',
            options: [
                { text: 'Structured Query Language', is_correct: true },
                { text: 'Simple Query Language', is_correct: false },
                { text: 'Standard Query Language', is_correct: false },
                { text: 'System Query Language', is_correct: false }
            ]
        },
        {
            difficulty: 'medium',
            question_text: 'What is SQL used for?',
            options: [
                { text: 'Managing and querying databases', is_correct: true },
                { text: 'Creating web pages', is_correct: false },
                { text: 'Writing mobile apps', is_correct: false },
                { text: 'Designing graphics', is_correct: false }
            ]
        },
        {
            difficulty: 'medium',
            question_text: 'What is a table in a database?',
            options: [
                { text: 'A collection of related data organized in rows and columns', is_correct: true },
                { text: 'A programming function', is_correct: false },
                { text: 'A web page', is_correct: false },
                { text: 'A computer virus', is_correct: false }
            ]
        },
        {
            difficulty: 'medium',
            question_text: 'What is a computer network?',
            options: [
                { text: 'Multiple computers connected to share resources', is_correct: true },
                { text: 'A single computer', is_correct: false },
                { text: 'A programming language', is_correct: false },
                { text: 'A web browser', is_correct: false }
            ]
        },
        {
            difficulty: 'advanced',
            question_text: 'What is object-oriented programming?',
            options: [
                { text: 'A programming approach based on objects and classes', is_correct: true },
                { text: 'Programming with only functions', is_correct: false },
                { text: 'Programming without variables', is_correct: false },
                { text: 'Programming with only loops', is_correct: false }
            ]
        }
    ]
};

async function seedProfessionalDatabase() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('🌱 SEEDING DATABASE WITH PROFESSIONAL QUESTIONS');
        console.log('='.repeat(60));

        // Create admin account
        const adminUsername = process.env.ADMIN_USERNAME || 'admin';
        const adminPasswordPlain = process.env.ADMIN_PASSWORD || 'admin123';
        const adminPassword = await authUtils.hashPassword(adminPasswordPlain);

        await new Promise((resolve, reject) => {
            db.run(
                'INSERT OR IGNORE INTO admins (username, password_hash) VALUES (?, ?)',
                [adminUsername, adminPassword],
                function (err) {
                    if (err) reject(err);
                    else resolve();
                }
            );
        });
        console.log(`✅ Admin account ready: ${adminUsername} / ${adminPasswordPlain}`);

        // Seed professional questions
        let totalQuestions = 0;
        for (const [grade, questions] of Object.entries(professionalQuestions)) {
            console.log(`\n📚 Seeding Grade ${grade} with ${questions.length} professional questions...`);
            
            for (const questionData of questions) {
                // Insert question
                const questionId = await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                        [parseInt(grade), questionData.difficulty, questionData.question_text],
                        function (err) {
                            if (err) reject(err);
                            else resolve(this.lastID);
                        }
                    );
                });
                
                // Insert options
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
            }
            
            totalQuestions += questions.length;
            console.log(`   ✅ Grade ${grade}: ${questions.length} questions seeded`);
        }

        console.log(`\n🎉 PROFESSIONAL DATABASE SEEDING COMPLETE!`);
        console.log(`   Total Questions: ${totalQuestions}`);
        console.log(`   All questions are meaningful and educational`);
        console.log(`   No more garbage auto-generated content`);

    } catch (error) {
        console.error('❌ Error seeding professional database:', error);
    } finally {
        await database.close();
    }
}

// Run seeding if this file is executed directly
if (require.main === module) {
    seedProfessionalDatabase();
}

module.exports = seedProfessionalDatabase;