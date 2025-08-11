const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Database path
const dbPath = path.join(__dirname, 'server', 'database', 'mcq_system.db');

// Ensure database directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

console.log('🗄️ Resetting database...');

// Remove existing database
if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
    console.log('✅ Existing database removed');
}

// Create new database
const db = new sqlite3.Database(dbPath);

// Initialize database schema
const initSQL = `
-- Students table
CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    roll_number INTEGER NOT NULL,
    grade INTEGER NOT NULL CHECK (grade IN (6, 7, 8, 9, 11)),
    section TEXT NOT NULL CHECK (section IN ('A', 'B')),
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(roll_number, grade, section)
);

-- Questions table
CREATE TABLE questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    grade INTEGER NOT NULL CHECK (grade IN (6, 7, 8, 9, 11)),
    difficulty TEXT NOT NULL CHECK (difficulty IN ('basic', 'medium', 'advanced')),
    question_text TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Options table
CREATE TABLE options (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id INTEGER NOT NULL,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT 0,
    option_order INTEGER NOT NULL,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- Quizzes table
CREATE TABLE quizzes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    grade INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    score INTEGER DEFAULT 0,
    passed BOOLEAN DEFAULT 0,
    status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed')),
    start_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    end_time DATETIME,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Responses table
CREATE TABLE responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quiz_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    selected_option_id INTEGER,
    is_correct BOOLEAN NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    FOREIGN KEY (selected_option_id) REFERENCES options(id) ON DELETE SET NULL
);

-- Admins table
CREATE TABLE admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_questions_grade ON questions(grade);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
CREATE INDEX idx_quizzes_student ON quizzes(student_id);
CREATE INDEX idx_responses_quiz ON responses(quiz_id);
`;

db.exec(initSQL, (err) => {
    if (err) {
        console.error('❌ Error initializing database:', err);
        process.exit(1);
    }
    
    console.log('✅ Database schema created');
    
    // Create admin user
    const adminPassword = '$2b$10$8K1p/a0dclxKxAYIGkqOKOb9/pGid/V2kzpR/hIxuEeRNqA6i7K3u'; // admin123
    
    db.run('INSERT INTO admins (username, password) VALUES (?, ?)', ['admin', adminPassword], (err) => {
        if (err) {
            console.error('❌ Error creating admin:', err);
        } else {
            console.log('✅ Admin user created (username: admin, password: admin123)');
        }
        
        db.close((err) => {
            if (err) {
                console.error('❌ Error closing database:', err);
            } else {
                console.log('✅ Database reset complete');
                console.log('📍 Database location:', dbPath);
            }
        });
    });
});