// Production Database Setup Script for TECH BOARD 2025 MCQ System
// Ensures database is properly initialized with all required data

const bcrypt = require('bcrypt');
const database = require('../config/database');
const path = require('path');

async function setupProductionDatabase() {
    console.log('🚀 Setting up production database...');
    
    try {
        // Connect to database
        await database.connect();
        console.log('✅ Database connected');
        
        // Check if database is already initialized
        const questionCount = await database.get('SELECT COUNT(*) as count FROM questions');
        const studentCount = await database.get('SELECT COUNT(*) as count FROM students');
        const adminCount = await database.get('SELECT COUNT(*) as count FROM admins');
        
        console.log(`📊 Current database status:`);
        console.log(`   Questions: ${questionCount.count}`);
        console.log(`   Students: ${studentCount.count}`);
        console.log(`   Admins: ${adminCount.count}`);
        
        // Seed questions if needed
        if (questionCount.count < 1500) {
            console.log('🌱 Seeding questions...');
            await seedQuestions();
            console.log('✅ Questions seeded');
        }
        
        // Create admin if needed
        if (adminCount.count === 0) {
            console.log('👤 Creating admin user...');
            await createAdminUser();
            console.log('✅ Admin user created');
        }
        
        // Create test students if needed (for testing)
        if (studentCount.count === 0) {
            console.log('👥 Creating test students...');
            await createTestStudents();
            console.log('✅ Test students created');
        }
        
        // Verify database integrity
        await verifyDatabaseIntegrity();
        
        console.log('🎉 Production database setup complete!');
        
    } catch (error) {
        console.error('❌ Database setup failed:', error);
        throw error;
    }
}

async function seedQuestions() {
    const grades = [6, 7, 8, 9, 11];
    
    for (const grade of grades) {
        console.log(`   Seeding Grade ${grade}...`);
        
        // Sample questions for each grade
        const questions = generateQuestionsForGrade(grade);
        
        for (const question of questions) {
            const result = await database.run(
                'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                [question.grade, question.difficulty, question.question_text]
            );
            
            // Add options for each question
            for (const option of question.options) {
                await database.run(
                    'INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                    [result.lastID, option.text, option.is_correct, option.order]
                );
            }
        }
        
        console.log(`   ✅ Grade ${grade}: ${questions.length} questions`);
    }
}

function generateQuestionsForGrade(grade) {
    const questions = [];
    const difficulties = ['basic', 'medium', 'advanced'];
    
    // Generate 300 questions per grade
    for (let i = 1; i <= 300; i++) {
        const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
        
        const question = {
            grade,
            difficulty,
            question_text: `Grade ${grade} ${difficulty} question ${i}: What is the primary function of a computer's CPU?`,
            options: [
                { text: 'To store data permanently', is_correct: 0, order: 1 },
                { text: 'To process instructions and perform calculations', is_correct: 1, order: 2 },
                { text: 'To display information on screen', is_correct: 0, order: 3 },
                { text: 'To connect to the internet', is_correct: 0, order: 4 }
            ]
        };
        
        questions.push(question);
    }
    
    return questions;
}

async function createAdminUser() {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await database.run(
        'INSERT OR IGNORE INTO admins (username, password) VALUES (?, ?)',
        ['admin', hashedPassword]
    );
    
    console.log('   Admin credentials: username=admin, password=admin123');
}

async function createTestStudents() {
    const testStudents = [
        { name: 'Test Student 1', roll_number: 79, grade: 6, section: 'A', password: 'password123' },
        { name: 'Test Student 2', roll_number: 80, grade: 7, section: 'A', password: 'password123' },
        { name: 'Test Student 3', roll_number: 81, grade: 8, section: 'B', password: 'password123' },
        { name: 'Test Student 4', roll_number: 82, grade: 9, section: 'A', password: 'password123' },
        { name: 'Test Student 5', roll_number: 83, grade: 11, section: 'B', password: 'password123' }
    ];
    
    for (const student of testStudents) {
        const hashedPassword = await bcrypt.hash(student.password, 10);
        
        await database.run(
            'INSERT OR IGNORE INTO students (name, roll_number, grade, section, password) VALUES (?, ?, ?, ?, ?)',
            [student.name, student.roll_number, student.grade, student.section, hashedPassword]
        );
    }
    
    console.log('   Test student credentials:');
    testStudents.forEach(student => {
        console.log(`   - Roll: ${student.roll_number}, Grade: ${student.grade}, Section: ${student.section}, Password: ${student.password}`);
    });
}

async function verifyDatabaseIntegrity() {
    console.log('🔍 Verifying database integrity...');
    
    // Check questions
    const questionsByGrade = await database.query(`
        SELECT grade, COUNT(*) as count 
        FROM questions 
        GROUP BY grade 
        ORDER BY grade
    `);
    
    console.log('   Questions by grade:');
    questionsByGrade.forEach(row => {
        console.log(`   - Grade ${row.grade}: ${row.count} questions`);
    });
    
    // Check options
    const optionsCount = await database.get('SELECT COUNT(*) as count FROM options');
    console.log(`   Total options: ${optionsCount.count}`);
    
    // Check for questions without options
    const questionsWithoutOptions = await database.query(`
        SELECT q.id, q.question_text 
        FROM questions q 
        LEFT JOIN options o ON q.id = o.question_id 
        WHERE o.id IS NULL
    `);
    
    if (questionsWithoutOptions.length > 0) {
        console.warn(`   ⚠️ Found ${questionsWithoutOptions.length} questions without options`);
    } else {
        console.log('   ✅ All questions have options');
    }
    
    // Check for questions with no correct answer
    const questionsWithoutCorrectAnswer = await database.query(`
        SELECT q.id, q.question_text 
        FROM questions q 
        WHERE q.id NOT IN (
            SELECT DISTINCT question_id 
            FROM options 
            WHERE is_correct = 1
        )
    `);
    
    if (questionsWithoutCorrectAnswer.length > 0) {
        console.warn(`   ⚠️ Found ${questionsWithoutCorrectAnswer.length} questions without correct answers`);
    } else {
        console.log('   ✅ All questions have correct answers');
    }
}

// Run setup if called directly
if (require.main === module) {
    setupProductionDatabase()
        .then(() => {
            console.log('✅ Database setup completed successfully');
            process.exit(0);
        })
        .catch((error) => {
            console.error('❌ Database setup failed:', error);
            process.exit(1);
        });
}

module.exports = { setupProductionDatabase };