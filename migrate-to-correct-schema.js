const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'server/database/mcq_system.db');

console.log('🔄 Migrating database to correct schema...\n');

const db = new sqlite3.Database(dbPath);

async function migrateDatabase() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            console.log('📋 Creating missing tables...');
            
            // Create options table
            db.run(`
                CREATE TABLE IF NOT EXISTS options (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    question_id INTEGER NOT NULL,
                    option_text TEXT NOT NULL,
                    is_correct BOOLEAN NOT NULL DEFAULT 0,
                    option_order INTEGER DEFAULT 1,
                    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
                )
            `, (err) => {
                if (err) {
                    console.error('❌ Error creating options table:', err);
                    reject(err);
                    return;
                }
                console.log('✅ Options table created');
            });
            
            // Create quizzes table
            db.run(`
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
                )
            `, (err) => {
                if (err) {
                    console.error('❌ Error creating quizzes table:', err);
                    reject(err);
                    return;
                }
                console.log('✅ Quizzes table created');
            });
            
            // Create quiz_answers table
            db.run(`
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
                )
            `, (err) => {
                if (err) {
                    console.error('❌ Error creating quiz_answers table:', err);
                    reject(err);
                    return;
                }
                console.log('✅ Quiz_answers table created');
            });
            
            // Add roll_number column to students if it doesn't exist
            db.run(`
                ALTER TABLE students ADD COLUMN roll_number INTEGER
            `, (err) => {
                // Ignore error if column already exists
                console.log('✅ Students table updated (roll_number column)');
            });
            
            // Add section column to students if it doesn't exist
            db.run(`
                ALTER TABLE students ADD COLUMN section TEXT DEFAULT 'A'
            `, (err) => {
                // Ignore error if column already exists
                console.log('✅ Students table updated (section column)');
            });
            
            console.log('\n🔄 Migrating existing questions to new schema...');
            
            // Get all questions with JSON options
            db.all('SELECT id, grade, difficulty, question_text, options FROM questions', (err, questions) => {
                if (err) {
                    console.error('❌ Error fetching questions:', err);
                    reject(err);
                    return;
                }
                
                console.log(`📊 Found ${questions.length} questions to migrate`);
                
                let processed = 0;
                
                if (questions.length === 0) {
                    console.log('✅ No questions to migrate');
                    resolve();
                    return;
                }
                
                questions.forEach((question, index) => {
                    try {
                        const options = JSON.parse(question.options);
                        
                        // Insert options for this question
                        options.forEach((option, optionIndex) => {
                            db.run(`
                                INSERT INTO options (question_id, option_text, is_correct, option_order) 
                                VALUES (?, ?, ?, ?)
                            `, [
                                question.id, 
                                option.text, 
                                option.isCorrect ? 1 : 0, 
                                optionIndex + 1
                            ], (err) => {
                                if (err) {
                                    console.error(`❌ Error inserting option for question ${question.id}:`, err);
                                }
                            });
                        });
                        
                        processed++;
                        if (processed === questions.length) {
                            console.log(`✅ Migrated ${processed} questions with their options`);
                            
                            // Remove the options column from questions table
                            console.log('\n🔧 Cleaning up questions table...');
                            db.run(`
                                CREATE TABLE questions_new (
                                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                                    grade INTEGER NOT NULL,
                                    difficulty TEXT NOT NULL CHECK (difficulty IN ('basic', 'medium', 'advanced')),
                                    question_text TEXT NOT NULL,
                                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                                )
                            `, (err) => {
                                if (err) {
                                    console.error('❌ Error creating new questions table:', err);
                                    reject(err);
                                    return;
                                }
                                
                                // Copy data to new table
                                db.run(`
                                    INSERT INTO questions_new (id, grade, difficulty, question_text, created_at)
                                    SELECT id, grade, difficulty, question_text, created_at FROM questions
                                `, (err) => {
                                    if (err) {
                                        console.error('❌ Error copying questions data:', err);
                                        reject(err);
                                        return;
                                    }
                                    
                                    // Drop old table and rename new one
                                    db.run('DROP TABLE questions', (err) => {
                                        if (err) {
                                            console.error('❌ Error dropping old questions table:', err);
                                            reject(err);
                                            return;
                                        }
                                        
                                        db.run('ALTER TABLE questions_new RENAME TO questions', (err) => {
                                            if (err) {
                                                console.error('❌ Error renaming questions table:', err);
                                                reject(err);
                                                return;
                                            }
                                            
                                            console.log('✅ Questions table cleaned up');
                                            console.log('\n🎉 Database migration completed successfully!');
                                            resolve();
                                        });
                                    });
                                });
                            });
                        }
                        
                    } catch (parseError) {
                        console.error(`❌ Error parsing options for question ${question.id}:`, parseError);
                        processed++;
                        if (processed === questions.length) {
                            resolve();
                        }
                    }
                });
            });
        });
    });
}

migrateDatabase()
    .then(() => {
        console.log('\n📊 Final verification...');
        
        // Verify the migration
        db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
            if (err) {
                console.error('❌ Error verifying tables:', err);
                db.close();
                return;
            }
            
            console.log('✅ Tables after migration:');
            tables.forEach(table => {
                console.log(`  - ${table.name}`);
            });
            
            // Check counts
            db.get('SELECT COUNT(*) as count FROM questions', (err, questionCount) => {
                if (err) {
                    console.error('❌ Error counting questions:', err);
                    db.close();
                    return;
                }
                
                db.get('SELECT COUNT(*) as count FROM options', (err, optionCount) => {
                    if (err) {
                        console.error('❌ Error counting options:', err);
                        db.close();
                        return;
                    }
                    
                    console.log(`📈 Questions: ${questionCount.count}`);
                    console.log(`📈 Options: ${optionCount.count}`);
                    console.log('\n🎉 Migration verification completed!');
                    
                    db.close();
                });
            });
        });
    })
    .catch((error) => {
        console.error('❌ Migration failed:', error);
        db.close();
    });