require('dotenv').config();
const database = require('../config/database');
const authUtils = require('../utils/auth');

const sampleQuestions = [
    // Grade 6 Questions
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'What is 15 + 27?',
        options: [
            { text: '42', is_correct: true },
            { text: '41', is_correct: false },
            { text: '43', is_correct: false },
            { text: '40', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'basic',
        question_text: 'Which planet is closest to the Sun?',
        options: [
            { text: 'Venus', is_correct: false },
            { text: 'Mercury', is_correct: true },
            { text: 'Earth', is_correct: false },
            { text: 'Mars', is_correct: false }
        ]
    },
    {
        grade: 6,
        difficulty: 'medium',
        question_text: 'What is the capital of France?',
        options: [
            { text: 'London', is_correct: false },
            { text: 'Berlin', is_correct: false },
            { text: 'Paris', is_correct: true },
            { text: 'Madrid', is_correct: false }
        ]
    },
    // Grade 7 Questions
    {
        grade: 7,
        difficulty: 'basic',
        question_text: 'What is 8 × 9?',
        options: [
            { text: '72', is_correct: true },
            { text: '71', is_correct: false },
            { text: '73', is_correct: false },
            { text: '81', is_correct: false }
        ]
    },
    {
        grade: 7,
        difficulty: 'medium',
        question_text: 'Which gas makes up most of Earth\'s atmosphere?',
        options: [
            { text: 'Oxygen', is_correct: false },
            { text: 'Carbon Dioxide', is_correct: false },
            { text: 'Nitrogen', is_correct: true },
            { text: 'Hydrogen', is_correct: false }
        ]
    },
    // Grade 8 Questions
    {
        grade: 8,
        difficulty: 'basic',
        question_text: 'What is the square root of 64?',
        options: [
            { text: '6', is_correct: false },
            { text: '7', is_correct: false },
            { text: '8', is_correct: true },
            { text: '9', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'medium',
        question_text: 'Who wrote "Romeo and Juliet"?',
        options: [
            { text: 'Charles Dickens', is_correct: false },
            { text: 'William Shakespeare', is_correct: true },
            { text: 'Jane Austen', is_correct: false },
            { text: 'Mark Twain', is_correct: false }
        ]
    },
    {
        grade: 8,
        difficulty: 'advanced',
        question_text: 'What is the chemical symbol for gold?',
        options: [
            { text: 'Go', is_correct: false },
            { text: 'Gd', is_correct: false },
            { text: 'Au', is_correct: true },
            { text: 'Ag', is_correct: false }
        ]
    }
];

async function seedDatabase() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('Starting database seeding...');

        // Temporarily disable triggers for seeding
        await new Promise((resolve, reject) => {
            db.run('PRAGMA foreign_keys = OFF', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        // Create default admin
        const adminPassword = await authUtils.hashPassword('admin123');
        await new Promise((resolve, reject) => {
            db.run(
                'INSERT OR IGNORE INTO admins (username, password_hash) VALUES (?, ?)',
                ['admin', adminPassword],
                function(err) {
                    if (err) reject(err);
                    else {
                        console.log('Default admin created');
                        resolve();
                    }
                }
            );
        });

        // Create sample student - check if already exists first
        const existingStudent = await new Promise((resolve, reject) => {
            db.get(
                'SELECT id FROM students WHERE roll_number = ? AND grade = ? AND section = ?',
                [1, 8, 'A'],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });

        if (!existingStudent) {
            const studentPassword = await authUtils.hashPassword('student123');
            await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO students (name, roll_number, grade, section, password_hash) VALUES (?, ?, ?, ?, ?)',
                    ['John Doe', 1, 8, 'A', studentPassword],
                    function(err) {
                        if (err) reject(err);
                        else {
                            console.log('Sample student created');
                            resolve();
                        }
                    }
                );
            });
        } else {
            console.log('Sample student already exists');
        }

        // Insert sample questions
        for (const questionData of sampleQuestions) {
            const questionId = await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                    [questionData.grade, questionData.difficulty, questionData.question_text],
                    function(err) {
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
                        function(err) {
                            if (err) reject(err);
                            else resolve();
                        }
                    );
                });
            }
        }

        // Re-enable foreign keys
        await new Promise((resolve, reject) => {
            db.run('PRAGMA foreign_keys = ON', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        console.log('Database seeding completed successfully!');
        console.log('Default admin credentials: username=admin, password=admin123');
        console.log('Sample student credentials: roll=1, grade=8, section=A, password=student123');

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await database.close();
    }
}

// Run seeding if this file is executed directly
if (require.main === module) {
    seedDatabase();
}

module.exports = seedDatabase;