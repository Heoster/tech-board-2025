const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

async function seedComplete1500() {
    console.log('🌱 Starting complete 1500 questions seeding...');
    
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
                            
                            // Load and seed all questions
                            seedAllGrades(db, () => {
                                db.close((err) => {
                                    if (err) {
                                        console.error('❌ Database close failed:', err.message);
                                        reject(err);
                                    } else {
                                        console.log('✅ Complete 1500 questions seeding completed!');
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

function seedAllGrades(db, callback) {
    console.log('📝 Loading all grade questions...');
    
    // Try multiple file patterns for each grade
    const gradeFiles = [
        { grade: 6, files: ['grade6-complete-300.js', 'grade6-complete.js', 'grade6.js'] },
        { grade: 7, files: ['grade7-complete-300.js', 'grade7-complete.js', 'grade7.js'] },
        { grade: 8, files: ['grade8-complete-300.js', 'grade8.js'] },
        { grade: 9, files: ['grade9-complete-300.js', 'grade9-complete.js', 'grade9.js'] },
        { grade: 11, files: ['grade11-complete-300.js', 'grade11-complete.js', 'grade11.js'] }
    ];
    
    let totalQuestionsAdded = 0;
    let gradesProcessed = 0;
    
    gradeFiles.forEach(({ grade, files }) => {
        let gradeQuestions = [];
        let filesLoaded = 0;
        
        // Try to load questions from available files for this grade
        files.forEach(fileName => {
            const filePath = path.join(__dirname, 'server', 'seed', 'questions', fileName);
            
            if (fs.existsSync(filePath)) {
                try {
                    delete require.cache[require.resolve(filePath)];
                    const questions = require(filePath);
                    
                    if (Array.isArray(questions)) {
                        gradeQuestions = [...gradeQuestions, ...questions];
                        console.log(`📚 Loaded ${questions.length} questions from ${fileName}`);
                    } else if (questions.allGrade6Questions && grade === 6) {
                        gradeQuestions = [...gradeQuestions, ...questions.allGrade6Questions];
                        console.log(`📚 Loaded ${questions.allGrade6Questions.length} questions from ${fileName}`);
                    }
                    filesLoaded++;
                } catch (error) {
                    console.log(`⚠️ Error loading ${fileName}: ${error.message}`);
                }
            }
        });
        
        if (gradeQuestions.length === 0) {
            console.log(`⚠️ No questions found for Grade ${grade}`);
            gradesProcessed++;
            if (gradesProcessed === gradeFiles.length) {
                console.log(`🎉 Seeding completed! Total questions: ${totalQuestionsAdded}`);
                callback();
            }
            return;
        }
        
        // Remove duplicates based on question_text
        const uniqueQuestions = gradeQuestions.filter((question, index, self) => 
            index === self.findIndex(q => q.question_text === question.question_text)
        );
        
        console.log(`📊 Grade ${grade}: ${uniqueQuestions.length} unique questions (removed ${gradeQuestions.length - uniqueQuestions.length} duplicates)`);
        
        let questionsProcessed = 0;
        
        uniqueQuestions.forEach((question, index) => {
            const { grade: qGrade, difficulty, question_text, options } = question;
            
            db.run('INSERT OR IGNORE INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                [qGrade || grade, difficulty || 'basic', question_text], function(err) {
                if (err) {
                    console.error(`❌ Question insert error (Grade ${grade}, Q${index + 1}):`, err.message);
                    questionsProcessed++;
                    return;
                }
                
                const questionId = this.lastID;
                if (!questionId) {
                    // Question already exists, skip
                    questionsProcessed++;
                    if (questionsProcessed === uniqueQuestions.length) {
                        console.log(`✅ Grade ${grade} completed: ${uniqueQuestions.length} questions processed`);
                        gradesProcessed++;
                        if (gradesProcessed === gradeFiles.length) {
                            console.log(`🎉 All grades completed! Total questions: ${totalQuestionsAdded}`);
                            callback();
                        }
                    }
                    return;
                }
                
                if (!options || !Array.isArray(options)) {
                    console.error(`❌ Invalid options for question ${index + 1} in Grade ${grade}`);
                    questionsProcessed++;
                    return;
                }
                
                let optionsProcessed = 0;
                
                options.forEach((option, optIndex) => {
                    const optionText = option.text || option.option_text || '';
                    const isCorrect = option.is_correct || false;
                    
                    db.run('INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                        [questionId, optionText, isCorrect ? 1 : 0, optIndex + 1], (err) => {
                        if (err) {
                            console.error(`❌ Option insert error:`, err.message);
                        }
                        
                        optionsProcessed++;
                        if (optionsProcessed === options.length) {
                            questionsProcessed++;
                            totalQuestionsAdded++;
                            
                            if (questionsProcessed === uniqueQuestions.length) {
                                console.log(`✅ Grade ${grade} completed: ${uniqueQuestions.length} questions`);
                                gradesProcessed++;
                                
                                if (gradesProcessed === gradeFiles.length) {
                                    console.log(`🎉 All grades completed! Total questions: ${totalQuestionsAdded}`);
                                    callback();
                                }
                            }
                        }
                    });
                });
            });
        });
    });
}

// Run the seeding
if (require.main === module) {
    seedComplete1500().catch(error => {
        console.error('❌ Seeding failed:', error.message);
        process.exit(1);
    });
}

module.exports = { seedComplete1500 };