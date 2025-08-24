#!/usr/bin/env node

const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

console.log('🚀 Ensuring production database exists...');

// Handle different execution contexts
const serverDir = __dirname.includes('server') ? __dirname : path.join(__dirname, 'server');
const dbPath = path.join(serverDir, 'database', 'mcq_system_fixed.db');
const dbDir = path.dirname(dbPath);

// Ensure database directory exists
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log('✅ Created database directory');
}

// Check if database already exists and has content
if (fs.existsSync(dbPath)) {
    console.log('📋 Database file exists, checking content...');
    
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('❌ Error connecting to existing database:', err.message);
            process.exit(1);
        }
        
        db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
            if (err) {
                console.log('⚠️  Database exists but may be empty, will recreate schema');
                createDatabase();
            } else if (row.count >= 1000) {
                console.log(`✅ Database already contains ${row.count} questions`);
                console.log('🎉 Production database ready!');
                db.close();
                process.exit(0);
            } else {
                console.log(`⚠️  Database has only ${row.count} questions, will seed more`);
                seedQuestions(db);
            }
        });
    });
} else {
    console.log('📋 Database does not exist, creating new one...');
    createDatabase();
}

function createDatabase() {
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('❌ Error creating database:', err.message);
            process.exit(1);
        }
        console.log('✅ Database connection established');
    });

    // Read and execute init.sql
    const initSqlPath = path.join(serverDir, 'database', 'init.sql');
    if (!fs.existsSync(initSqlPath)) {
        console.error('❌ init.sql not found');
        process.exit(1);
    }

    const initSql = fs.readFileSync(initSqlPath, 'utf8');

    db.serialize(async () => {
        console.log('📋 Creating database schema...');
        
        // Execute schema creation
        db.exec(initSql, (err) => {
            if (err) {
                console.error('❌ Error creating schema:', err.message);
                process.exit(1);
            }
            console.log('✅ Database schema created');
            
            // Create admin user
            console.log('👨‍💼 Creating admin user...');
            bcrypt.hash('admin123', 10, (err, hashedPassword) => {
                if (err) {
                    console.error('❌ Error hashing password:', err.message);
                    process.exit(1);
                }
                
                db.run('INSERT OR REPLACE INTO admins (username, password) VALUES (?, ?)', 
                    ['admin', hashedPassword], (err) => {
                    if (err) {
                        console.error('❌ Error creating admin:', err.message);
                        process.exit(1);
                    }
                    console.log('✅ Admin user created');
                    
                    // Seed questions
                    seedQuestions(db);
                });
            });
        });
    });
}

function seedQuestions(db) {
    console.log('📚 Seeding questions...');
    
    const grades = [6, 7, 8, 9, 11];
    const difficulties = ['basic', 'medium', 'advanced'];
    const questionsPerGrade = 300;
    const questionsPerDifficulty = 100;
    
    let totalInserted = 0;
    let totalExpected = grades.length * questionsPerGrade;
    
    grades.forEach(grade => {
        difficulties.forEach(difficulty => {
            for (let i = 1; i <= questionsPerDifficulty; i++) {
                const questionText = `Grade ${grade} ${difficulty} question ${i}: What is the correct answer for this ${difficulty} level question?`;
                
                db.run('INSERT OR IGNORE INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                    [grade, difficulty, questionText], function(err) {
                    if (err) {
                        console.error('❌ Error inserting question:', err.message);
                        return;
                    }
                    
                    if (this.changes === 0) {
                        // Question already exists, skip
                        totalInserted++;
                        if (totalInserted === totalExpected) {
                            finishSetup(db);
                        }
                        return;
                    }
                    
                    const questionId = this.lastID;
                    
                    // Add 4 options for each question
                    const options = [
                        { text: 'Option A - Correct answer', correct: true },
                        { text: 'Option B - Incorrect answer', correct: false },
                        { text: 'Option C - Incorrect answer', correct: false },
                        { text: 'Option D - Incorrect answer', correct: false }
                    ];
                    
                    let optionsInserted = 0;
                    options.forEach((option, index) => {
                        db.run('INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                            [questionId, option.text, option.correct ? 1 : 0, index + 1], (err) => {
                            if (err) {
                                console.error('❌ Error inserting option:', err.message);
                                return;
                            }
                            
                            optionsInserted++;
                            if (optionsInserted === 4) {
                                totalInserted++;
                                
                                if (totalInserted === totalExpected) {
                                    finishSetup(db);
                                }
                            }
                        });
                    });
                });
            }
        });
    });
}

function finishSetup(db) {
    console.log('🔍 Verifying database setup...');
    
    db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
        if (err) {
            console.error('❌ Error verifying questions:', err.message);
            process.exit(1);
        }
        console.log(`✅ Questions: ${row.count}`);
        
        db.get('SELECT COUNT(*) as count FROM options', (err, row) => {
            if (err) {
                console.error('❌ Error verifying options:', err.message);
                process.exit(1);
            }
            console.log(`✅ Options: ${row.count}`);
            
            db.get('SELECT COUNT(*) as count FROM admins', (err, row) => {
                if (err) {
                    console.error('❌ Error verifying admins:', err.message);
                    process.exit(1);
                }
                console.log(`✅ Admins: ${row.count}`);
                
                console.log('🎉 Production database ready!');
                
                db.close((err) => {
                    if (err) {
                        console.error('❌ Error closing database:', err.message);
                        process.exit(1);
                    }
                    console.log('✅ Database connection closed');
                    process.exit(0);
                });
            });
        });
    });
}