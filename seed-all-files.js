const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

async function seedAllFiles() {
    console.log('🌱 Seeding from ALL question files...');
    
    const dbPath = path.join(__dirname, 'server', 'database', 'mcq_system_fixed.db');
    
    if (fs.existsSync(dbPath)) {
        fs.unlinkSync(dbPath);
        console.log('🗑️ Removed old database');
    }
    
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath, async (err) => {
            if (err) {
                reject(err);
                return;
            }
            console.log('✅ Database connected');
        });
        
        db.serialize(async () => {
            // Configure database
            db.run('PRAGMA foreign_keys = ON');
            db.run('PRAGMA journal_mode = WAL');
            
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
                    reject(err);
                    return;
                }
                
                // Create admin
                const hashedPassword = await bcrypt.hash('admin123', 10);
                db.run('INSERT INTO admins (username, password) VALUES (?, ?)', 
                    ['admin', hashedPassword], (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    
                    loadAllQuestionFiles(db, () => {
                        db.close((err) => {
                            if (err) {
                                reject(err);
                            } else {
                                console.log('✅ All files seeded successfully!');
                                resolve();
                            }
                        });
                    });
                });
            });
        });
    });
}

function loadAllQuestionFiles(db, callback) {
    const questionsDir = path.join(__dirname, 'server', 'seed', 'questions');
    const files = fs.readdirSync(questionsDir).filter(file => file.endsWith('.js'));
    
    console.log(`📁 Found ${files.length} question files`);
    
    let allQuestions = [];
    let filesProcessed = 0;
    
    files.forEach(file => {
        const filePath = path.join(questionsDir, file);
        
        try {
            delete require.cache[require.resolve(filePath)];
            const questions = require(filePath);
            
            let questionsArray = [];
            
            if (Array.isArray(questions)) {
                questionsArray = questions;
            } else if (questions.allGrade6Questions) {
                questionsArray = questions.allGrade6Questions;
            } else if (questions.grade6FinalQuestions) {
                questionsArray = questions.grade6FinalQuestions;
            } else if (typeof questions === 'object' && questions.default) {
                questionsArray = Array.isArray(questions.default) ? questions.default : [];
            }
            
            if (questionsArray.length > 0) {
                allQuestions = [...allQuestions, ...questionsArray];
                console.log(`📚 ${file}: ${questionsArray.length} questions`);
            } else {
                console.log(`⚠️ ${file}: No questions found`);
            }
            
        } catch (error) {
            console.log(`❌ ${file}: ${error.message}`);
        }
        
        filesProcessed++;
        if (filesProcessed === files.length) {
            processAllQuestions(db, allQuestions, callback);
        }
    });
}

function processAllQuestions(db, allQuestions, callback) {
    // Remove duplicates
    const uniqueQuestions = allQuestions.filter((question, index, self) => 
        index === self.findIndex(q => q.question_text === question.question_text)
    );
    
    console.log(`📊 Total: ${allQuestions.length} questions, ${uniqueQuestions.length} unique`);
    
    let questionsProcessed = 0;
    let totalAdded = 0;
    
    uniqueQuestions.forEach((question, index) => {
        const { grade, difficulty, question_text, options } = question;
        
        if (!question_text || !options || !Array.isArray(options)) {
            questionsProcessed++;
            if (questionsProcessed === uniqueQuestions.length) {
                console.log(`🎉 Completed! Added ${totalAdded} questions`);
                callback();
            }
            return;
        }
        
        db.run('INSERT OR IGNORE INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
            [grade || 6, difficulty || 'basic', question_text], function(err) {
            if (err) {
                questionsProcessed++;
                return;
            }
            
            const questionId = this.lastID;
            if (!questionId) {
                questionsProcessed++;
                if (questionsProcessed === uniqueQuestions.length) {
                    console.log(`🎉 Completed! Added ${totalAdded} questions`);
                    callback();
                }
                return;
            }
            
            let optionsProcessed = 0;
            
            options.forEach((option, optIndex) => {
                const optionText = option.text || option.option_text || '';
                const isCorrect = option.is_correct || false;
                
                db.run('INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                    [questionId, optionText, isCorrect ? 1 : 0, optIndex + 1], (err) => {
                    optionsProcessed++;
                    if (optionsProcessed === options.length) {
                        questionsProcessed++;
                        totalAdded++;
                        
                        if (questionsProcessed === uniqueQuestions.length) {
                            console.log(`🎉 Completed! Added ${totalAdded} questions`);
                            callback();
                        }
                    }
                });
            });
        });
    });
}

if (require.main === module) {
    seedAllFiles().catch(error => {
        console.error('❌ Seeding failed:', error.message);
        process.exit(1);
    });
}

module.exports = { seedAllFiles };