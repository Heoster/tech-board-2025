const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

async function fixDatabase() {
    console.log('🔧 Starting database fix...');
    
    // Database path
    const dbPath = path.join(__dirname, 'server', 'database', 'mcq_system_fixed.db');
    const dbDir = path.dirname(dbPath);
    
    // Ensure directory exists
    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
        console.log('✅ Created database directory');
    }
    
    // Remove existing database to start fresh
    if (fs.existsSync(dbPath)) {
        fs.unlinkSync(dbPath);
        console.log('🗑️ Removed old database');
    }
    
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('❌ Database connection failed:', err.message);
                reject(err);
                return;
            }
            console.log('✅ Database connected');
        });
        
        // Configure database
        db.serialize(async () => {
            try {
                // Enable foreign keys and configure for performance
                db.run('PRAGMA foreign_keys = ON');
                db.run('PRAGMA journal_mode = WAL');
                db.run('PRAGMA synchronous = NORMAL');
                console.log('✅ Database configured');
                
                // Create tables
                const schema = `
                -- Students table
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
                
                -- Admins table
                CREATE TABLE IF NOT EXISTS admins (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                );
                
                -- Questions table
                CREATE TABLE IF NOT EXISTS questions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    grade INTEGER NOT NULL,
                    difficulty TEXT NOT NULL CHECK (difficulty IN ('basic', 'medium', 'advanced')),
                    question_text TEXT NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(grade, question_text, difficulty)
                );
                
                -- Options table
                CREATE TABLE IF NOT EXISTS options (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    question_id INTEGER NOT NULL,
                    option_text TEXT NOT NULL,
                    is_correct BOOLEAN NOT NULL DEFAULT 0,
                    option_order INTEGER DEFAULT 1,
                    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
                );
                
                -- Quizzes table
                CREATE TABLE IF NOT EXISTS quizzes (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    student_id INTEGER NOT NULL,
                    grade INTEGER NOT NULL,
                    status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed')),
                    score INTEGER DEFAULT 0,
                    total_questions INTEGER DEFAULT 50,
                    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    completed_at DATETIME,
                    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
                );
                
                -- Quiz answers table
                CREATE TABLE IF NOT EXISTS quiz_answers (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    quiz_id INTEGER NOT NULL,
                    question_id INTEGER NOT NULL,
                    selected_option_id INTEGER NOT NULL,
                    is_correct BOOLEAN NOT NULL DEFAULT 0,
                    answered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
                    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
                    FOREIGN KEY (selected_option_id) REFERENCES options(id) ON DELETE CASCADE
                );
                `;
                
                db.exec(schema, async (err) => {
                    if (err) {
                        console.error('❌ Schema creation failed:', err.message);
                        reject(err);
                        return;
                    }
                    console.log('✅ Database schema created');
                    
                    try {
                        // Create admin user
                        const hashedPassword = await bcrypt.hash('admin123', 10);
                        db.run('INSERT OR IGNORE INTO admins (username, password) VALUES (?, ?)', 
                            ['admin', hashedPassword], (err) => {
                            if (err) {
                                console.error('❌ Admin creation failed:', err.message);
                                reject(err);
                                return;
                            }
                            console.log('✅ Admin user created');
                            
                            // Add sample questions for each grade
                            addSampleQuestions(db, () => {
                                db.close((err) => {
                                    if (err) {
                                        console.error('❌ Database close failed:', err.message);
                                        reject(err);
                                    } else {
                                        console.log('✅ Database setup completed successfully!');
                                        console.log('📍 Database location:', dbPath);
                                        console.log('🔐 Admin credentials: username=admin, password=admin123');
                                        resolve();
                                    }
                                });
                            });
                        });
                    } catch (error) {
                        console.error('❌ Admin setup failed:', error.message);
                        reject(error);
                    }
                });
            } catch (error) {
                console.error('❌ Database setup failed:', error.message);
                reject(error);
            }
        });
    });
}

function addSampleQuestions(db, callback) {
    console.log('📝 Adding sample questions...');
    
    const grades = [6, 7, 8, 9, 11];
    const difficulties = ['basic', 'medium', 'advanced'];
    let questionsAdded = 0;
    let totalQuestions = 0;
    
    grades.forEach(grade => {
        difficulties.forEach(difficulty => {
            // Add 10 questions per grade per difficulty (30 per grade total)
            for (let i = 1; i <= 10; i++) {
                const questionText = `Grade ${grade} ${difficulty} question ${i}: What is the result of ${i} + ${i}?`;
                
                db.run('INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                    [grade, difficulty, questionText], function(err) {
                    if (err) {
                        console.error('Question insert error:', err.message);
                        return;
                    }
                    
                    const questionId = this.lastID;
                    const correctAnswer = i + i;
                    
                    // Add 4 options for each question
                    const options = [
                        { text: correctAnswer.toString(), correct: true },
                        { text: (correctAnswer + 1).toString(), correct: false },
                        { text: (correctAnswer - 1).toString(), correct: false },
                        { text: (correctAnswer + 2).toString(), correct: false }
                    ];
                    
                    options.forEach((option, index) => {
                        db.run('INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                            [questionId, option.text, option.correct ? 1 : 0, index + 1], (err) => {
                            if (err) {
                                console.error('Option insert error:', err.message);
                            }
                        });
                    });
                    
                    questionsAdded++;
                    if (questionsAdded === 150) { // 5 grades × 3 difficulties × 10 questions
                        console.log(`✅ Added ${questionsAdded} sample questions`);
                        callback();
                    }
                });
                totalQuestions++;
            }
        });
    });
}

// Run the fix
if (require.main === module) {
    fixDatabase().catch(error => {
        console.error('❌ Database fix failed:', error.message);
        process.exit(1);
    });
}

module.exports = { fixDatabase };