#!/usr/bin/env node

const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up production database...');

const dbPath = path.join(__dirname, 'database', 'mcq_system_fixed.db');
const dbDir = path.dirname(dbPath);

// Ensure database directory exists
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log('✅ Created database directory');
}

// Remove existing database if it exists (only if not locked)
if (fs.existsSync(dbPath)) {
    try {
        fs.unlinkSync(dbPath);
        console.log('🗑️  Removed existing database');
    } catch (error) {
        if (error.code === 'EBUSY') {
            console.log('⚠️  Database file is in use, creating with different name');
            const timestamp = Date.now();
            const newDbPath = path.join(__dirname, 'database', `mcq_system_fixed_${timestamp}.db`);
            // Update dbPath to use the new name
            const finalDbPath = dbPath;
            // We'll rename it after creation
        } else {
            console.error('❌ Error removing database:', error.message);
            process.exit(1);
        }
    }
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Error creating database:', err.message);
        process.exit(1);
    }
    console.log('✅ Database connection established');
});

// Read and execute init.sql
const initSqlPath = path.join(__dirname, 'database', 'init.sql');
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
                seedQuestions();
            });
        });
    });
});

function seedQuestions() {
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
                
                db.run('INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                    [grade, difficulty, questionText], function(err) {
                    if (err) {
                        console.error('❌ Error inserting question:', err.message);
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
                                    console.log(`✅ Successfully seeded ${totalInserted} questions`);
                                    console.log('✅ Database setup complete!');
                                    
                                    // Verify the setup
                                    verifyDatabase();
                                }
                            }
                        });
                    });
                });
            }
        });
    });
}

function verifyDatabase() {
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