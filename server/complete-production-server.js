const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET || 'tech-board-2025-secret-key';

console.log('🚀 Starting Tech Board 2025 Complete Production Server');
console.log('Port:', PORT);
console.log('Node version:', process.version);

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize database
let db = null;

function initDatabase() {
    const dbPath = path.join(__dirname, 'database', 'mcq_system_fixed.db');
    const dbDir = path.dirname(dbPath);

    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
        console.log('📁 Created database directory');
    }

    db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('❌ Database connection failed:', err.message);
            return;
        }
        console.log('✅ Connected to SQLite database');
        setupDatabase();
    });
}

function setupDatabase() {
    db.serialize(() => {
        // Create tables
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
            selected_option_id INTEGER,
            is_correct BOOLEAN NOT NULL DEFAULT 0,
            answered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
            FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
        )`);

        // Insert default admin with hashed password
        bcrypt.hash('admin123', 10, (err, hashedPassword) => {
            if (!err) {
                db.run(`INSERT OR IGNORE INTO admins (username, password) 
                        VALUES ('admin', ?)`, [hashedPassword]);
            } else {
                // Fallback to plain text for development
                db.run(`INSERT OR IGNORE INTO admins (username, password) 
                        VALUES ('admin', 'admin123')`);
            }
        });

        // Check if questions exist, if not seed them
        db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
            if (!err && row.count === 0) {
                console.log('📚 Seeding database with questions...');
                seedQuestions();
            } else {
                console.log(`✅ Database ready with ${row.count} questions`);
            }
        });
    });
}

function seedQuestions() {
    const grades = [6, 7, 8, 9, 11];
    const difficulties = ['basic', 'medium', 'advanced'];
    let totalSeeded = 0;

    grades.forEach(grade => {
        for (let i = 1; i <= 300; i++) {
            const difficulty = difficulties[i % 3];
            const questionText = `Grade ${grade} ${difficulty} question ${i}: What is the correct answer for this computer science question?`;

            db.run('INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                [grade, difficulty, questionText], function (err) {
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

                        totalSeeded++;
                        if (totalSeeded === 1500) {
                            console.log('✅ Database seeded with 1500 questions');
                        }
                    }
                });
        }
    });
}

// Authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

// Admin middleware
function requireAdmin(req, res, next) {
    if (req.user.type !== 'admin') {
        return res.status(403).json({ success: false, error: 'Admin access required' });
    }
    next();
}

// Health check endpoints
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        port: PORT,
        service: 'tech-board-2025-complete-production',
        database: db ? 'connected' : 'disconnected'
    });
});

app.get('/api/health', (req, res) => {
    if (!db) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Database not connected'
        });
    }

    db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
        res.json({
            status: 'OK',
            timestamp: new Date().toISOString(),
            database: { connected: !err },
            questions: { total: row ? row.count : 0 },
            port: PORT,
            service: 'tech-board-2025-complete-production'
        });
    });
});

// Basic API info
app.get('/api', (req, res) => {
    res.json({
        message: 'Tech Board 2025 Complete API',
        status: 'running',
        version: '1.0.0',
        endpoints: [
            '/api/health',
            '/api/auth/admin/login',
            '/api/auth/register',
            '/api/auth/login',
            '/api/quiz/start',
            '/api/quiz/submit',
            '/api/admin/dashboard',
            '/api/admin/results'
        ]
    });
});

// Authentication Routes

// Admin login
app.post('/api/auth/admin/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, error: 'Missing credentials' });
    }

    db.get('SELECT * FROM admins WHERE username = ?', [username], async (err, admin) => {
        if (err || !admin) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        // Check password - handle both hashed and plain text
        let passwordValid = false;
        try {
            passwordValid = await bcrypt.compare(password, admin.password);
        } catch (bcryptError) {
            // If bcrypt fails, try plain text comparison (for development)
            passwordValid = password === admin.password;
        }

        if (passwordValid) {
            const token = jwt.sign({
                id: admin.id,
                type: 'admin',
                username: admin.username
            }, JWT_SECRET, { expiresIn: '24h' });

            res.json({
                success: true,
                token,
                user: { username: admin.username, type: 'admin' }
            });
        } else {
            res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
    });
});

// Student registration
app.post('/api/auth/register', async (req, res) => {
    const { name, rollNumber, roll_number, grade, section, password } = req.body;
    const studentRollNumber = rollNumber || roll_number;

    if (!name || !studentRollNumber || !grade || !section || !password) {
        return res.status(400).json({
            success: false,
            error: 'All fields required: name, rollNumber, grade, section, password'
        });
    }

    if (![6, 7, 8, 9, 11].includes(parseInt(grade))) {
        return res.status(400).json({
            success: false,
            error: 'Grade must be 6, 7, 8, 9, or 11'
        });
    }

    // Check if student exists
    db.get('SELECT id FROM students WHERE roll_number = ? AND grade = ? AND section = ?',
        [studentRollNumber, grade, section], async (err, existing) => {
            if (existing) {
                return res.status(400).json({
                    success: false,
                    error: 'Student already registered with this roll number'
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert student
            db.run('INSERT INTO students (name, roll_number, password, grade, section) VALUES (?, ?, ?, ?, ?)',
                [name, studentRollNumber, hashedPassword, parseInt(grade), section.toUpperCase()], function (err) {
                    if (err) {
                        return res.status(500).json({ success: false, error: 'Registration failed' });
                    }

                    const token = jwt.sign({
                        id: this.lastID,
                        type: 'student',
                        grade: parseInt(grade),
                        rollNumber: studentRollNumber,
                        section: section.toUpperCase(),
                        name
                    }, JWT_SECRET, { expiresIn: '24h' });

                    res.status(201).json({
                        success: true,
                        token,
                        user: { id: this.lastID, name, rollNumber: studentRollNumber, grade: parseInt(grade), section }
                    });
                });
        });
});

// Student login
app.post('/api/auth/login', async (req, res) => {
    const { rollNumber, roll_number, grade, section, password } = req.body;
    const studentRollNumber = rollNumber || roll_number;

    if (!studentRollNumber || !grade || !section || !password) {
        return res.status(400).json({
            success: false,
            error: 'All fields required: rollNumber, grade, section, password'
        });
    }

    db.get('SELECT * FROM students WHERE roll_number = ? AND grade = ? AND section = ?',
        [studentRollNumber, grade, section], async (err, user) => {
            if (err || !user) {
                return res.status(401).json({ success: false, error: 'Student not found' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                const token = jwt.sign({
                    id: user.id,
                    type: 'student',
                    grade: user.grade,
                    rollNumber: user.roll_number,
                    section: user.section,
                    name: user.name
                }, JWT_SECRET, { expiresIn: '24h' });

                res.json({
                    success: true,
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        rollNumber: user.roll_number,
                        grade: user.grade,
                        section: user.section
                    }
                });
            } else {
                res.status(401).json({ success: false, error: 'Invalid password' });
            }
        });
});

// Quiz Routes

// Start quiz
app.post('/api/quiz/start', authenticateToken, (req, res) => {
    const grade = req.user.grade || req.body.grade;
    const studentId = req.user.id;

    if (!studentId) {
        return res.status(400).json({
            success: false,
            error: 'Student ID not found. Please log in again.'
        });
    }

    const validGrades = [6, 7, 8, 9, 11];
    const gradeInt = parseInt(grade);
    if (!grade || !validGrades.includes(gradeInt)) {
        return res.status(400).json({
            success: false,
            error: `Invalid grade: ${grade}. Valid grades are 6, 7, 8, 9, 11.`
        });
    }

    // Check if student already has a quiz
    db.get('SELECT id, status FROM quizzes WHERE student_id = ?', [studentId], (err, existingQuiz) => {
        if (existingQuiz) {
            if (existingQuiz.status === 'completed') {
                return res.status(400).json({
                    success: false,
                    error: 'You have already completed the test'
                });
            } else {
                return res.status(400).json({
                    success: false,
                    error: 'You already have a test in progress'
                });
            }
        }

        // Get questions for the grade
        db.all(`
            SELECT q.id, q.question_text, q.difficulty,
                   GROUP_CONCAT(
                       json_object(
                           'id', o.id,
                           'text', o.option_text,
                           'order', o.option_order
                       )
                   ) as options
            FROM questions q
            LEFT JOIN options o ON q.id = o.question_id
            WHERE q.grade = ?
            GROUP BY q.id
            ORDER BY RANDOM()
            LIMIT 50
        `, [gradeInt], (err, questionRows) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: 'Failed to fetch questions'
                });
            }

            if (questionRows.length < 50) {
                return res.status(400).json({
                    success: false,
                    error: `Insufficient questions available for grade ${gradeInt}. Found ${questionRows.length} questions, need 50.`
                });
            }

            // Format questions
            const questions = questionRows.map(q => {
                const opts = q.options ? JSON.parse(`[${q.options}]`) : [];
                return {
                    id: q.id,
                    question_text: q.question_text,
                    difficulty: q.difficulty,
                    options: Array.isArray(opts) ? opts.sort((a, b) => (a.order || 0) - (b.order || 0)) : []
                };
            });

            // Create quiz session
            db.run('INSERT INTO quizzes (student_id, grade, total_questions, status) VALUES (?, ?, ?, ?)',
                [studentId, gradeInt, 50, 'in_progress'], function (err) {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            error: 'Failed to create quiz session'
                        });
                    }

                    const quizId = this.lastID;

                    res.json({
                        success: true,
                        data: {
                            quizId,
                            questions,
                            timeLimit: 50 * 60 * 1000, // 50 minutes in milliseconds
                            startTime: new Date().toISOString()
                        }
                    });
                });
        });
    });
});

// Submit quiz
app.post('/api/quiz/submit', authenticateToken, (req, res) => {
    const { quizId, answers, startTime } = req.body;
    const studentId = req.user.id;

    if (!quizId || !answers || !Array.isArray(answers)) {
        return res.status(400).json({
            success: false,
            error: 'Quiz ID and answers are required'
        });
    }

    // Verify quiz belongs to student
    db.get('SELECT * FROM quizzes WHERE id = ? AND student_id = ?', [quizId, studentId], (err, quiz) => {
        if (err || !quiz) {
            return res.status(404).json({
                success: false,
                error: 'Quiz not found'
            });
        }

        if (quiz.status === 'completed') {
            return res.status(400).json({
                success: false,
                error: 'Quiz already completed'
            });
        }

        // Check time limit (50 minutes)
        const quizStartTime = new Date(startTime || quiz.started_at);
        const currentTime = new Date();
        const timeDiff = (currentTime - quizStartTime) / 1000 / 60; // in minutes

        if (timeDiff > 50) {
            return res.status(400).json({
                success: false,
                error: 'Time limit exceeded'
            });
        }

        // Process answers and calculate score
        let totalScore = 0;
        let processedAnswers = 0;

        if (answers.length === 0) {
            // No answers submitted
            db.run('UPDATE quizzes SET score = 0, status = "completed", completed_at = CURRENT_TIMESTAMP WHERE id = ?',
                [quizId], (err) => {
                    if (err) {
                        return res.status(500).json({ success: false, error: 'Failed to submit quiz' });
                    }

                    res.json({
                        success: true,
                        message: 'Test submitted successfully.',
                        status: 'not_qualified',
                        quizId: quizId
                    });
                });
            return;
        }

        answers.forEach((answer, index) => {
            const { questionId, selectedOptionId } = answer;

            if (selectedOptionId === null || selectedOptionId === undefined) {
                // Unanswered question
                db.run('INSERT INTO quiz_answers (quiz_id, question_id, selected_option_id, is_correct) VALUES (?, ?, ?, ?)',
                    [quizId, questionId, null, 0], (err) => {
                        processedAnswers++;
                        if (processedAnswers === answers.length) {
                            finishQuizSubmission();
                        }
                    });
            } else {
                // Check if answer is correct
                db.get('SELECT is_correct FROM options WHERE id = ?', [selectedOptionId], (err, option) => {
                    const isCorrect = option?.is_correct || 0;
                    if (isCorrect) totalScore++;

                    db.run('INSERT INTO quiz_answers (quiz_id, question_id, selected_option_id, is_correct) VALUES (?, ?, ?, ?)',
                        [quizId, questionId, selectedOptionId, isCorrect], (err) => {
                            processedAnswers++;
                            if (processedAnswers === answers.length) {
                                finishQuizSubmission();
                            }
                        });
                });
            }
        });

        function finishQuizSubmission() {
            // Update quiz with final score
            db.run('UPDATE quizzes SET score = ?, status = "completed", completed_at = CURRENT_TIMESTAMP WHERE id = ?',
                [totalScore, quizId], (err) => {
                    if (err) {
                        return res.status(500).json({ success: false, error: 'Failed to submit quiz' });
                    }

                    // Calculate pass/fail (72% = 36/50)
                    const passed = totalScore >= 36;

                    res.json({
                        success: true,
                        message: 'Test submitted successfully. Results will be reviewed by administration.',
                        status: passed ? 'qualified' : 'not_qualified',
                        quizId: quizId
                    });
                });
        }
    });
});

// Admin Routes

// Admin dashboard
app.get('/api/admin/dashboard', authenticateToken, requireAdmin, (req, res) => {
    if (!db) {
        return res.status(500).json({ success: false, error: 'Database not connected' });
    }

    Promise.all([
        new Promise((resolve) => {
            db.get('SELECT COUNT(*) as count FROM students', (err, row) => {
                resolve(row ? row.count : 0);
            });
        }),
        new Promise((resolve) => {
            db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                resolve(row ? row.count : 0);
            });
        }),
        new Promise((resolve) => {
            db.get('SELECT COUNT(*) as count FROM quizzes WHERE status = "completed"', (err, row) => {
                resolve(row ? row.count : 0);
            });
        })
    ]).then(([totalStudents, totalQuestions, totalQuizzes]) => {
        res.json({
            success: true,
            totalStudents,
            totalQuestions,
            totalQuizzes
        });
    });
});

// Admin results
app.get('/api/admin/results', authenticateToken, requireAdmin, (req, res) => {
    if (!db) {
        return res.status(500).json({ success: false, error: 'Database not connected' });
    }

    db.all(`
        SELECT 
            q.id,
            s.name as student_name,
            s.roll_number,
            s.grade,
            s.section,
            q.score,
            q.total_questions,
            q.completed_at,
            ROUND((CAST(q.score AS FLOAT) / q.total_questions) * 100, 1) as percentage
        FROM quizzes q
        JOIN students s ON q.student_id = s.id
        WHERE q.status = 'completed'
        ORDER BY q.completed_at DESC
        LIMIT 100
    `, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, error: 'Failed to fetch results' });
        }

        res.json({
            success: true,
            results: results || []
        });
    });
});

// Serve static files (React app)
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Serve React app for all other routes
app.get('*', (req, res) => {
    // Don't serve HTML for API routes
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'API endpoint not found' });
    }

    const indexPath = path.join(publicPath, 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        // Fallback HTML
        res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech Board 2025</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container { 
            background: white;
            padding: 3rem;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 600px;
            width: 90%;
        }
        h1 { 
            color: #333;
            margin-bottom: 1rem;
            font-size: 2.5rem;
        }
        .subtitle { 
            color: #666;
            margin-bottom: 2rem;
            font-size: 1.2rem;
        }
        .status { 
            background: #e8f5e8;
            padding: 1rem;
            border-radius: 10px;
            margin: 2rem 0;
            border-left: 4px solid #4caf50;
        }
        .links { 
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-top: 2rem;
        }
        .link-card { 
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 10px;
            transition: transform 0.2s;
            border: 2px solid transparent;
        }
        .link-card:hover { 
            transform: translateY(-5px);
            border-color: #667eea;
        }
        .link-card a { 
            color: #667eea;
            text-decoration: none;
            font-weight: bold;
            font-size: 1.1rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎓 Tech Board 2025</h1>
        <p class="subtitle">MCQ Testing System</p>
        
        <div class="status">
            <strong>✅ System Status:</strong> Online and Ready<br>
            <strong>🗄️ Database:</strong> 1500 Questions Available<br>
            <strong>🔐 Authentication:</strong> Active<br>
            <strong>🎯 Features:</strong> Complete API Available
        </div>
        
        <div class="links">
            <div class="link-card">
                <h3>👨💼 Admin Portal</h3>
                <a href="/admin/login">Access Dashboard</a>
                <p style="margin-top: 0.5rem; font-size: 0.9rem; color: #666;">
                    Username: admin<br>Password: admin123
                </p>
            </div>
            <div class="link-card">
                <h3>👨🎓 Student Portal</h3>
                <a href="/register">Register & Take Quiz</a>
                <p style="margin-top: 0.5rem; font-size: 0.9rem; color: #666;">
                    50 questions, 50 minutes
                </p>
            </div>
        </div>
        
        <p style="margin-top: 2rem; color: #999; font-size: 0.9rem;">
            🚀 Live at: <a href="https://tech-board.up.railway.app" style="color: #667eea;">https://tech-board.up.railway.app</a><br>
            Complete Production Server • All Features Available
        </p>
    </div>
</body>
</html>`);
    }
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Server error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
});

// Initialize database and start server
initDatabase();

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Tech Board 2025 Complete Production Server running on port ${PORT}`);
    console.log(`🌐 Health check: http://0.0.0.0:${PORT}/health`);
    console.log(`🎓 Application: https://tech-board.up.railway.app`);
    console.log(`🔧 Features: Complete API with all routes`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    if (db) {
        db.close((err) => {
            if (err) console.error('Error closing database:', err);
            else console.log('Database connection closed');
        });
    }
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

module.exports = app;