const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

async function seedFromFiles() {
    console.log('🌱 Starting database seeding from question files...');
    
    const dbPath = path.join(__dirname, 'server', 'database', 'mcq_system_fixed.db');
    
    // Remove existing database
    if (fs.existsSync(dbPath)) {
        fs.unlinkSync(dbPath);
        console.log('🗑️ Removed old database');
    }
    
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath, async (err) => {
            if (err) {
                console.error('❌ Database connection failed:', err.message);
                reject(err);
                return;
            }
            console.log('✅ Database connected');
        });
        
        db.serialize(async () => {
            try {
                // Configure database
                db.run('PRAGMA foreign_keys = ON');
                db.run('PRAGMA journal_mode = WAL');
                console.log('✅ Database configured');
                
                // Create schema
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
                    difficulty TEXT NOT NULL CHECK (difficulty IN ('basic', 'medium', 'advanced')),
                    question_text TEXT NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(grade, question_text, difficulty)
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
                    status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed')),
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
                        db.run('INSERT INTO admins (username, password) VALUES (?, ?)', 
                            ['admin', hashedPassword], (err) => {
                            if (err) {
                                console.error('❌ Admin creation failed:', err.message);
                                reject(err);
                                return;
                            }
                            console.log('✅ Admin user created');
                            
                            // Load and seed questions from files
                            seedQuestionsFromFiles(db, () => {
                                db.close((err) => {
                                    if (err) {
                                        console.error('❌ Database close failed:', err.message);
                                        reject(err);
                                    } else {
                                        console.log('✅ Database seeding completed successfully!');
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

function seedQuestionsFromFiles(db, callback) {
    console.log('📝 Loading questions from files...');
    
    const questionFiles = [
        { file: 'grade6-complete-300.js', grade: 6 },
        { file: 'grade7-complete-300.js', grade: 7 },
        { file: 'grade8-complete-300.js', grade: 8 },
        { file: 'grade9-complete-300.js', grade: 9 },
        { file: 'grade11-complete-300.js', grade: 11 }
    ];
    
    let totalQuestionsAdded = 0;
    let filesProcessed = 0;
    
    questionFiles.forEach(({ file, grade }) => {
        const filePath = path.join(__dirname, 'server', 'seed', 'questions', file);
        
        if (!fs.existsSync(filePath)) {
            console.log(`⚠️ File not found: ${file}, skipping...`);
            filesProcessed++;
            if (filesProcessed === questionFiles.length) {
                console.log(`✅ Seeding completed! Total questions: ${totalQuestionsAdded}`);
                callback();
            }
            return;
        }
        
        try {
            // Clear require cache to ensure fresh load
            delete require.cache[require.resolve(filePath)];
            const questions = require(filePath);
            
            console.log(`📚 Loading Grade ${grade}: ${questions.length} questions`);
            
            let questionsProcessed = 0;
            
            questions.forEach((question, index) => {
                const { grade: qGrade, difficulty, question_text, options } = question;
                
                db.run('INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                    [qGrade, difficulty, question_text], function(err) {
                    if (err) {
                        console.error(`❌ Question insert error (Grade ${grade}, Q${index + 1}):`, err.message);
                        questionsProcessed++;
                        return;
                    }
                    
                    const questionId = this.lastID;
                    let optionsProcessed = 0;
                    
                    options.forEach((option, optIndex) => {
                        db.run('INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                            [questionId, option.text, option.is_correct ? 1 : 0, optIndex + 1], (err) => {
                            if (err) {
                                console.error(`❌ Option insert error:`, err.message);
                            }
                            
                            optionsProcessed++;
                            if (optionsProcessed === options.length) {
                                questionsProcessed++;
                                totalQuestionsAdded++;
                                
                                if (questionsProcessed === questions.length) {
                                    console.log(`✅ Grade ${grade} completed: ${questions.length} questions`);
                                    filesProcessed++;
                                    
                                    if (filesProcessed === questionFiles.length) {
                                        console.log(`🎉 All grades completed! Total questions: ${totalQuestionsAdded}`);
                                        callback();
                                    }
                                }
                            }
                        });
                    });
                });
            });
            
        } catch (error) {
            console.error(`❌ Error loading ${file}:`, error.message);
            filesProcessed++;
            if (filesProcessed === questionFiles.length) {
                callback();
            }
        }
    });
}

// Run the seeding
if (require.main === module) {
    seedFromFiles().catch(error => {
        console.error('❌ Seeding failed:', error.message);
        process.exit(1);
    });
}

module.exports = { seedFromFiles };