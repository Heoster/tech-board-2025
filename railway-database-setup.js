const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

async function setupRailwayDatabase() {
    console.log('🚂 Setting up Railway database...\n');

    const dbDir = path.join(__dirname, 'server/database');
    const dbPath = path.join(dbDir, 'mcq_system_fixed.db');
    const initSqlPath = path.join(__dirname, 'server/database/init.sql');

    try {
        // Ensure database directory exists
        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
            console.log('✅ Created database directory');
        }

        // Check if init.sql exists
        if (!fs.existsSync(initSqlPath)) {
            console.log('❌ init.sql not found, creating basic schema...');
            
            const basicSchema = `
-- MCQ System Database Schema
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
    selected_option_id INTEGER,
    is_correct BOOLEAN NOT NULL DEFAULT 0,
    answered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- Insert default admin (password: admin123)
INSERT OR IGNORE INTO admins (username, password) VALUES ('admin', '$2b$10$YI1rJ8FC/T4ifwYQh1y5yeexsjcDJT/GB19P.xauEJAcrDrNBJbsS');
`;
            
            fs.writeFileSync(initSqlPath, basicSchema);
            console.log('✅ Created basic init.sql');
        }

        // Create/initialize database
        console.log('🗄️ Initializing database...');
        
        const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
            if (err) {
                console.error('❌ Database creation failed:', err.message);
                throw err;
            }
        });

        // Read and execute init.sql
        const initSql = fs.readFileSync(initSqlPath, 'utf8');
        
        await new Promise((resolve, reject) => {
            db.exec(initSql, (err) => {
                if (err) {
                    console.error('❌ Database initialization failed:', err.message);
                    reject(err);
                } else {
                    console.log('✅ Database schema created');
                    resolve();
                }
            });
        });

        // Add sample questions for each grade
        console.log('📝 Adding sample questions...');
        
        const sampleQuestions = [
            {
                grade: 6,
                difficulty: 'basic',
                text: 'What does CPU stand for?',
                options: [
                    { text: 'Central Processing Unit', correct: true },
                    { text: 'Computer Personal Unit', correct: false },
                    { text: 'Central Program Unit', correct: false },
                    { text: 'Computer Processing Unit', correct: false }
                ]
            },
            {
                grade: 7,
                difficulty: 'basic',
                text: 'What is an algorithm?',
                options: [
                    { text: 'A computer program', correct: false },
                    { text: 'A step-by-step procedure', correct: true },
                    { text: 'A type of hardware', correct: false },
                    { text: 'A programming language', correct: false }
                ]
            },
            {
                grade: 8,
                difficulty: 'basic',
                text: 'What does HTML stand for?',
                options: [
                    { text: 'HyperText Markup Language', correct: true },
                    { text: 'High Tech Modern Language', correct: false },
                    { text: 'Home Tool Markup Language', correct: false },
                    { text: 'Hyperlink Text Markup Language', correct: false }
                ]
            },
            {
                grade: 9,
                difficulty: 'basic',
                text: 'What is object-oriented programming?',
                options: [
                    { text: 'Programming with objects and classes', correct: true },
                    { text: 'Programming with functions only', correct: false },
                    { text: 'Programming with arrays', correct: false },
                    { text: 'Programming with loops', correct: false }
                ]
            },
            {
                grade: 11,
                difficulty: 'basic',
                text: 'What does SQL stand for?',
                options: [
                    { text: 'Structured Query Language', correct: true },
                    { text: 'Simple Query Language', correct: false },
                    { text: 'Standard Query Language', correct: false },
                    { text: 'System Query Language', correct: false }
                ]
            }
        ];

        // Generate more questions to reach minimum requirements
        const allQuestions = [];
        
        for (const grade of [6, 7, 8, 9, 11]) {
            for (let i = 0; i < 60; i++) { // 60 questions per grade for basic functionality
                const baseQuestion = sampleQuestions.find(q => q.grade === grade) || sampleQuestions[0];
                allQuestions.push({
                    grade: grade,
                    difficulty: i < 30 ? 'basic' : i < 45 ? 'medium' : 'advanced',
                    text: `${baseQuestion.text} (Question ${i + 1} for Grade ${grade})`,
                    options: baseQuestion.options
                });
            }
        }

        // Insert questions
        for (const q of allQuestions) {
            try {
                const questionResult = await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT OR IGNORE INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                        [q.grade, q.difficulty, q.text],
                        function(err) {
                            if (err) reject(err);
                            else resolve(this.lastID);
                        }
                    );
                });

                if (questionResult) {
                    // Insert options
                    for (let i = 0; i < q.options.length; i++) {
                        const option = q.options[i];
                        await new Promise((resolve, reject) => {
                            db.run(
                                'INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                                [questionResult, option.text, option.correct ? 1 : 0, i + 1],
                                (err) => {
                                    if (err) reject(err);
                                    else resolve();
                                }
                            );
                        });
                    }
                }
            } catch (error) {
                // Ignore duplicate errors
                if (!error.message.includes('UNIQUE constraint failed')) {
                    console.warn('Question insert warning:', error.message);
                }
            }
        }

        // Verify database
        const questionCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        const adminCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM admins', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        console.log(`✅ Database setup complete:`);
        console.log(`   Questions: ${questionCount}`);
        console.log(`   Admins: ${adminCount}`);
        console.log(`   Database size: ${Math.round(fs.statSync(dbPath).size / 1024)}KB`);

        // Close database
        await new Promise((resolve) => {
            db.close((err) => {
                if (err) console.error('Database close error:', err.message);
                resolve();
            });
        });

        return true;

    } catch (error) {
        console.error('❌ Railway database setup failed:', error);
        throw error;
    }
}

// Run setup if called directly
if (require.main === module) {
    setupRailwayDatabase()
        .then(() => {
            console.log('🎉 Railway database setup completed successfully!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Railway database setup failed:', error);
            process.exit(1);
        });
}

module.exports = setupRailwayDatabase;