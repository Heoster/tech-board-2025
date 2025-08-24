#!/usr/bin/env node

const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

console.log('🏗️ Creating database for build...');

const dbPath = path.join(__dirname, 'database', 'mcq_system_fixed.db');
const dbDir = path.dirname(dbPath);

// Ensure database directory exists
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log('✅ Created database directory');
}

// Create database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Error creating database:', err.message);
        process.exit(1);
    }
    console.log('✅ Database file created');
});

// Create basic schema
const schema = `
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        roll_number INTEGER NOT NULL,
        grade INTEGER NOT NULL,
        section TEXT NOT NULL DEFAULT 'A',
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(roll_number, grade, section)
    );
    
    CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        grade INTEGER NOT NULL,
        difficulty TEXT NOT NULL,
        question_text TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS options (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question_id INTEGER NOT NULL,
        option_text TEXT NOT NULL,
        is_correct BOOLEAN NOT NULL DEFAULT 0,
        option_order INTEGER DEFAULT 1,
        FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
    );
    
    CREATE TABLE IF NOT EXISTS quizzes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        grade INTEGER NOT NULL,
        status TEXT DEFAULT 'in_progress',
        score INTEGER DEFAULT 0,
        total_questions INTEGER DEFAULT 50,
        started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        completed_at DATETIME,
        FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
    );
    
    CREATE TABLE IF NOT EXISTS quiz_answers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quiz_id INTEGER NOT NULL,
        question_id INTEGER NOT NULL,
        selected_option_id INTEGER,
        is_correct BOOLEAN NOT NULL DEFAULT 0,
        answered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
        FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
    );
`;

db.serialize(() => {
    console.log('📋 Creating database schema...');
    
    db.exec(schema, (err) => {
        if (err) {
            console.error('❌ Schema creation failed:', err.message);
            process.exit(1);
        }
        
        console.log('✅ Database schema created');
        
        // Create admin user
        bcrypt.hash('admin123', 10, (err, hashedPassword) => {
            if (err) {
                console.error('❌ Password hashing failed:', err.message);
                process.exit(1);
            }
            
            db.run('INSERT OR REPLACE INTO admins (username, password) VALUES (?, ?)', 
                ['admin', hashedPassword], (err) => {
                if (err) {
                    console.error('❌ Admin creation failed:', err.message);
                    process.exit(1);
                }
                
                console.log('✅ Admin user created');
                
                // Create some sample questions quickly
                createSampleQuestions(db);
            });
        });
    });
});

function createSampleQuestions(db) {
    console.log('📝 Creating sample questions...');
    
    const grades = [6, 7, 8, 9, 11];
    let questionsCreated = 0;
    const questionsPerGrade = 50; // Reduced for faster build
    const totalQuestions = grades.length * questionsPerGrade;
    
    grades.forEach(grade => {
        for (let i = 1; i <= questionsPerGrade; i++) {
            const questionText = `Grade ${grade} question ${i}: What is the correct answer for this question?`;
            
            db.run('INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                [grade, 'basic', questionText], function(err) {
                if (err) {
                    console.error('❌ Question insertion failed:', err.message);
                    questionsCreated++;
                    if (questionsCreated === totalQuestions) {
                        finishBuild(db);
                    }
                    return;
                }
                
                const questionId = this.lastID;
                
                // Add 4 options
                const options = [
                    { text: 'Correct answer', correct: true },
                    { text: 'Wrong answer 1', correct: false },
                    { text: 'Wrong answer 2', correct: false },
                    { text: 'Wrong answer 3', correct: false }
                ];
                
                let optionsCreated = 0;
                options.forEach((option, index) => {
                    db.run('INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                        [questionId, option.text, option.correct ? 1 : 0, index + 1], (err) => {
                        if (err) {
                            console.error('❌ Option insertion failed:', err.message);
                        }
                        
                        optionsCreated++;
                        if (optionsCreated === 4) {
                            questionsCreated++;
                            if (questionsCreated === totalQuestions) {
                                finishBuild(db);
                            }
                        }
                    });
                });
            });
        }
    });
}

function finishBuild(db) {
    console.log('🔍 Verifying build database...');
    
    db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
        if (err) {
            console.error('❌ Database verification failed:', err.message);
            process.exit(1);
        }
        
        console.log(`✅ Build database ready with ${row.count} questions`);
        
        db.close((err) => {
            if (err) {
                console.error('❌ Error closing database:', err.message);
                process.exit(1);
            }
            
            console.log('✅ Build database creation complete');
            process.exit(0);
        });
    });
}