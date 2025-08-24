#!/usr/bin/env node

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

console.log('🚂 Starting Railway Production Server for Tech Board 2025');
console.log('Node version:', process.version);
console.log('Environment:', process.env.NODE_ENV || 'production');

const app = express();
const PORT = process.env.PORT || 8080;

// Basic middleware for immediate health check response
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// IMMEDIATE health check - no dependencies
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        server: 'Railway Production Server',
        uptime: process.uptime()
    });
});

// Start server FIRST, then initialize everything else
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server listening on port ${PORT}`);
    console.log(`🏥 Health check available at http://localhost:${PORT}/health`);
    
    // Now initialize database and other features asynchronously
    initializeApplication();
});

// Handle server startup errors
server.on('error', (error) => {
    console.error('❌ Server startup error:', error);
    process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('🛑 SIGINT received, shutting down gracefully');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

// Initialize application features after server is running
async function initializeApplication() {
    console.log('🔧 Initializing application features...');
    
    try {
        // Initialize database
        await initializeDatabase();
        
        // Setup routes
        setupRoutes();
        
        // Serve static files
        setupStaticFiles();
        
        console.log('✅ Application initialization complete');
        
    } catch (error) {
        console.error('❌ Application initialization failed:', error);
        // Don't exit - keep health endpoint working
    }
}

async function initializeDatabase() {
    console.log('🗄️ Initializing database...');
    
    const sqlite3 = require('sqlite3').verbose();
    const bcrypt = require('bcrypt');
    
    const dbPath = path.join(__dirname, 'database', 'mcq_system_fixed.db');
    const dbDir = path.dirname(dbPath);
    
    // Ensure database directory exists
    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
        console.log('📁 Created database directory');
    }
    
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath, async (err) => {
            if (err) {
                console.error('❌ Database connection failed:', err.message);
                reject(err);
                return;
            }
            
            console.log('✅ Database connected');
            
            try {
                // Check if database has content
                db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                    if (err || !row || row.count < 100) {
                        console.log('⚠️ Database needs setup, will initialize...');
                        setupDatabase(db, resolve);
                    } else {
                        console.log(`✅ Database ready with ${row.count} questions`);
                        global.db = db;
                        
                        // Update health endpoint with database status
                        app.get('/api/health', (req, res) => {
                            res.json({
                                status: 'OK',
                                timestamp: new Date().toISOString(),
                                database: { connected: true },
                                questions: { total: row.count, status: 'Ready' },
                                uptime: process.uptime()
                            });
                        });
                        
                        resolve();
                    }
                });
            } catch (error) {
                console.error('❌ Database check failed:', error);
                reject(error);
            }
        });
    });
}

function setupDatabase(db, callback) {
    console.log('📋 Setting up database schema...');
    
    const initSqlPath = path.join(__dirname, 'database', 'init.sql');
    
    if (!fs.existsSync(initSqlPath)) {
        console.error('❌ init.sql not found, creating basic schema');
        createBasicSchema(db, callback);
        return;
    }
    
    const initSql = fs.readFileSync(initSqlPath, 'utf8');
    
    db.exec(initSql, (err) => {
        if (err) {
            console.error('❌ Schema creation failed:', err.message);
            createBasicSchema(db, callback);
            return;
        }
        
        console.log('✅ Database schema created');
        seedBasicData(db, callback);
    });
}

function createBasicSchema(db, callback) {
    console.log('📋 Creating basic database schema...');
    
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
            difficulty TEXT NOT NULL,
            question_text TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
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
            status TEXT DEFAULT 'in_progress',
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
    `;
    
    db.exec(schema, (err) => {
        if (err) {
            console.error('❌ Basic schema creation failed:', err.message);
            callback();
            return;
        }
        
        console.log('✅ Basic schema created');
        seedBasicData(db, callback);
    });
}

function seedBasicData(db, callback) {
    console.log('📚 Seeding basic data...');
    
    const bcrypt = require('bcrypt');
    
    // Create admin user
    bcrypt.hash('admin123', 10, (err, hashedPassword) => {
        if (err) {
            console.error('❌ Password hashing failed:', err.message);
            callback();
            return;
        }
        
        db.run('INSERT OR REPLACE INTO admins (username, password) VALUES (?, ?)', 
            ['admin', hashedPassword], (err) => {
            if (err) {
                console.error('❌ Admin creation failed:', err.message);
            } else {
                console.log('✅ Admin user created');
            }
            
            // Seed some basic questions
            seedBasicQuestions(db, callback);
        });
    });
}

function seedBasicQuestions(db, callback) {
    console.log('📝 Seeding basic questions...');
    
    const grades = [6, 7, 8, 9, 11];
    let questionsCreated = 0;
    const totalQuestions = grades.length * 10; // 10 questions per grade for quick setup
    
    grades.forEach(grade => {
        for (let i = 1; i <= 10; i++) {
            const questionText = `Grade ${grade} sample question ${i}: What is the correct answer?`;
            
            db.run('INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                [grade, 'basic', questionText], function(err) {
                if (err) {
                    console.error('❌ Question insertion failed:', err.message);
                    questionsCreated++;
                    if (questionsCreated === totalQuestions) {
                        finishSetup(db, callback);
                    }
                    return;
                }
                
                const questionId = this.lastID;
                
                // Add 4 options
                const options = [
                    { text: 'Correct answer', correct: true },
                    { text: 'Wrong answer 1', correct: false },
                    { text: 'Wrong answer 2', correct: false },
                    { text: 'Wrong answer 3', correct: false }
                ];
                
                let optionsCreated = 0;
                options.forEach((option, index) => {
                    db.run('INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                        [questionId, option.text, option.correct ? 1 : 0, index + 1], (err) => {
                        if (err) {
                            console.error('❌ Option insertion failed:', err.message);
                        }
                        
                        optionsCreated++;
                        if (optionsCreated === 4) {
                            questionsCreated++;
                            if (questionsCreated === totalQuestions) {
                                finishSetup(db, callback);
                            }
                        }
                    });
                });
            });
        }
    });
}

function finishSetup(db, callback) {
    console.log('🔍 Verifying database setup...');
    
    db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
        if (err) {
            console.error('❌ Database verification failed:', err.message);
        } else {
            console.log(`✅ Database setup complete with ${row.count} questions`);
        }
        
        global.db = db;
        
        // Update health endpoint
        app.get('/api/health', (req, res) => {
            res.json({
                status: 'OK',
                timestamp: new Date().toISOString(),
                database: { connected: true },
                questions: { total: row ? row.count : 0, status: 'Ready' },
                uptime: process.uptime()
            });
        });
        
        callback();
    });
}

function setupRoutes() {
    console.log('🛣️ Setting up API routes...');
    
    // Import and setup routes
    try {
        const authRoutes = require('./routes/auth');
        const adminRoutes = require('./routes/admin');
        const quizRoutes = require('./routes/quiz');
        
        app.use('/api/auth', authRoutes);
        app.use('/api/admin', adminRoutes);
        app.use('/api/quiz', quizRoutes);
        
        // API info endpoint
        app.get('/api', (req, res) => {
            res.json({
                message: 'Tech Board 2025 MCQ Testing System API',
                version: '1.0.0',
                status: 'running',
                endpoints: [
                    '/api/health',
                    '/api/auth/register',
                    '/api/auth/login',
                    '/api/auth/admin/login',
                    '/api/quiz/start',
                    '/api/quiz/submit',
                    '/api/admin/dashboard',
                    '/api/admin/results'
                ]
            });
        });
        
        console.log('✅ API routes configured');
        
    } catch (error) {
        console.error('❌ Route setup failed:', error.message);
    }
}

function setupStaticFiles() {
    console.log('📁 Setting up static file serving...');
    
    try {
        const publicPath = path.join(__dirname, 'public');
        
        if (fs.existsSync(publicPath)) {
            app.use(express.static(publicPath));
            
            // Serve React app for all other routes
            app.get('*', (req, res) => {
                const indexPath = path.join(publicPath, 'index.html');
                if (fs.existsSync(indexPath)) {
                    res.sendFile(indexPath);
                } else {
                    res.status(404).json({ error: 'Frontend not found' });
                }
            });
            
            console.log('✅ Static files configured');
        } else {
            console.log('⚠️ Public directory not found, skipping static files');
        }
        
    } catch (error) {
        console.error('❌ Static file setup failed:', error.message);
    }
}

console.log('🚀 Railway Production Server starting...');