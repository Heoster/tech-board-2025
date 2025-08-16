const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

async function deleteAllQuestions() {
    console.log('🗑️ Deleting all questions and resetting database...');
    
    const dbPath = path.join(__dirname, 'server', 'database', 'mcq_system_fixed.db');
    
    if (fs.existsSync(dbPath)) {
        fs.unlinkSync(dbPath);
        console.log('✅ Removed old database file');
    }
    
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                reject(err);
                return;
            }
            console.log('✅ Created fresh database');
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
                console.log('✅ Database schema created');
                
                try {
                    // Create admin user only
                    const hashedPassword = await bcrypt.hash('admin123', 10);
                    db.run('INSERT INTO admins (username, password) VALUES (?, ?)', 
                        ['admin', hashedPassword], (err) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        console.log('✅ Admin user created');
                        
                        db.close((err) => {
                            if (err) {
                                reject(err);
                            } else {
                                console.log('✅ Database reset completed - NO QUESTIONS ADDED');
                                console.log('📊 Database status:');
                                console.log('   - Questions: 0');
                                console.log('   - Options: 0');
                                console.log('   - Admin users: 1');
                                console.log('   - Students: 0');
                                resolve();
                            }
                        });
                    });
                } catch (error) {
                    reject(error);
                }
            });
        });
    });
}

if (require.main === module) {
    deleteAllQuestions().catch(error => {
        console.error('❌ Reset failed:', error.message);
        process.exit(1);
    });
}

module.exports = { deleteAllQuestions };