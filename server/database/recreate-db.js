const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'mcq_system_new.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    // Students table with email
    db.run(`CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        grade INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Admins table
    db.run(`CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Questions table
    db.run(`CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        grade INTEGER NOT NULL,
        difficulty TEXT NOT NULL CHECK (difficulty IN ('basic', 'medium', 'advanced')),
        question_text TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Options table
    db.run(`CREATE TABLE IF NOT EXISTS options (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question_id INTEGER NOT NULL,
        option_text TEXT NOT NULL,
        is_correct BOOLEAN NOT NULL DEFAULT 0,
        option_order INTEGER DEFAULT 1,
        FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
    )`);

    // Quizzes table
    db.run(`CREATE TABLE IF NOT EXISTS quizzes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        grade INTEGER NOT NULL,
        status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed')),
        score INTEGER DEFAULT 0,
        total_questions INTEGER DEFAULT 50,
        started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        completed_at DATETIME,
        FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
    )`);

    // Quiz answers table
    db.run(`CREATE TABLE IF NOT EXISTS quiz_answers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quiz_id INTEGER NOT NULL,
        question_id INTEGER NOT NULL,
        selected_option_id INTEGER NOT NULL,
        is_correct BOOLEAN NOT NULL DEFAULT 0,
        answered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
        FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
        FOREIGN KEY (selected_option_id) REFERENCES options(id) ON DELETE CASCADE
    )`);

    // Insert default admin
    db.run(`INSERT OR IGNORE INTO admins (username, password) 
            VALUES ('admin', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')`);
});

db.close((err) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('New database created successfully');
        // Replace old database
        if (fs.existsSync('mcq_system.db')) {
            fs.unlinkSync('mcq_system.db');
        }
        fs.renameSync('mcq_system_new.db', 'mcq_system.db');
        console.log('Database replaced');
    }
});