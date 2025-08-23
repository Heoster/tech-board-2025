const express = require('express');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 8000;

// Initialize database with auto-seeding
function initDatabase() {
    const dbPath = path.join(__dirname, 'server/database/mcq_system_fixed.db');
    const dbDir = path.dirname(dbPath);
    
    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
    }
    
    const db = new sqlite3.Database(dbPath);
    
    db.serialize(() => {
        // Create all tables
        db.run(`CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            roll_number INTEGER NOT NULL,
            grade INTEGER NOT NULL,
            section TEXT NOT NULL DEFAULT 'A',
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(roll_number, grade, section)
        )`);
        
        db.run(`CREATE TABLE IF NOT EXISTS admins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
        
        db.run(`CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            grade INTEGER NOT NULL,
            difficulty TEXT NOT NULL CHECK (difficulty IN ('basic', 'medium', 'advanced')),
            question_text TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(grade, question_text, difficulty)
        )`);
        
        db.run(`CREATE TABLE IF NOT EXISTS options (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question_id INTEGER NOT NULL,
            option_text TEXT NOT NULL,
            is_correct BOOLEAN NOT NULL DEFAULT 0,
            option_order INTEGER DEFAULT 1,
            FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
        )`);
        
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
        
        // Insert admin
        db.run(`INSERT OR IGNORE INTO admins (username, password) 
                VALUES ('admin', '$2b$10$YI1rJ8FC/T4ifwYQh1y5yeexsjcDJT/GB19P.xauEJAcrDrNBJbsS')`);
        
        // Check if questions exist, if not seed them
        db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
            if (!err && row.count === 0) {
                console.log('Seeding database with questions...');
                seedQuestions(db);
            }
        });
    });
    
    setTimeout(() => db.close(), 5000);
}

// Seed questions function
function seedQuestions(db) {
    const grades = [6, 7, 8, 9, 11];
    const difficulties = ['basic', 'medium', 'advanced'];
    
    grades.forEach(grade => {
        for (let i = 1; i <= 300; i++) {
            const difficulty = difficulties[i % 3];
            const questionText = `Grade ${grade} ${difficulty} question ${i}: What is the correct answer for this computer science question?`;
            
            db.run('INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)', 
                [grade, difficulty, questionText], function(err) {
                if (!err) {
                    const questionId = this.lastID;
                    // Add 4 options for each question
                    const options = [
                        { text: 'Option A - Correct answer', correct: 1 },
                        { text: 'Option B - Incorrect', correct: 0 },
                        { text: 'Option C - Incorrect', correct: 0 },
                        { text: 'Option D - Incorrect', correct: 0 }
                    ];
                    
                    options.forEach((option, index) => {
                        db.run('INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                            [questionId, option.text, option.correct, index + 1]);
                    });
                }
            });
        }
    });
    
    console.log('Database seeded with 1500 questions (300 per grade)');
}

// Initialize database on startup
initDatabase();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'server/public')));

// Health check
app.get('/api/health', (req, res) => {
    const dbPath = path.join(__dirname, 'server/database/mcq_system_fixed.db');
    const db = new sqlite3.Database(dbPath);
    
    db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
        db.close();
        res.json({ 
            status: 'OK', 
            timestamp: new Date().toISOString(),
            database: { connected: !err },
            questions: { total: row ? row.count : 0 }
        });
    });
});

// Basic API
app.get('/api', (req, res) => {
    res.json({ message: 'Tech Board 2025 API', status: 'running' });
});

// Serve React app
app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, 'server/public/index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech Board 2025</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; text-align: center; }
        .links { text-align: center; margin-top: 30px; }
        .links a { display: inline-block; margin: 10px; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 4px; }
        .links a:hover { background: #0056b3; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎓 Tech Board 2025</h1>
        <p style="text-align: center;">MCQ Testing System</p>
        <div class="links">
            <a href="/admin">Admin Login</a>
            <a href="/student">Student Portal</a>
        </div>
    </div>
</body>
</html>`);
    }
});

app.listen(PORT, () => {
    console.log(`Tech Board 2025 server running on port ${PORT}`);
});