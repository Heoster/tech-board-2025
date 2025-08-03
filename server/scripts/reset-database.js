require('dotenv').config();
const fs = require('fs');
const path = require('path');
const database = require('../config/database');
const authUtils = require('../utils/auth');

async function resetDatabase() {
    try {
        // Delete the existing database file
        const dbPath = process.env.DB_PATH || './database/mcq_system.db';
        if (fs.existsSync(dbPath)) {
            fs.unlinkSync(dbPath);
            console.log('✅ Deleted existing database');
        }

        // Connect to create new database
        await database.connect();
        const db = database.getDb();

        console.log('=== Creating fresh database ===');

        // Create tables without problematic triggers
        const initSql = `
            -- Students table
            CREATE TABLE IF NOT EXISTS students (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(100) NOT NULL,
                roll_number INTEGER NOT NULL CHECK (roll_number >= 1 AND roll_number <= 80),
                grade INTEGER NOT NULL CHECK (grade IN (6, 7, 8, 9, 11)),
                section CHAR(1) NOT NULL CHECK (section IN ('A', 'B')),
                password_hash VARCHAR(255) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(roll_number, grade, section)
            );

            -- Questions table
            CREATE TABLE IF NOT EXISTS questions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                grade INTEGER NOT NULL CHECK (grade IN (6, 7, 8, 9, 11)),
                difficulty TEXT NOT NULL CHECK (difficulty IN ('basic', 'medium', 'advanced')),
                question_text TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );

            -- Options table
            CREATE TABLE IF NOT EXISTS options (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                question_id INTEGER NOT NULL,
                option_text TEXT NOT NULL,
                is_correct BOOLEAN DEFAULT FALSE,
                option_order INTEGER NOT NULL,
                FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
            );

            -- Quizzes table
            CREATE TABLE IF NOT EXISTS quizzes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                student_id INTEGER NOT NULL,
                grade INTEGER NOT NULL,
                start_time DATETIME DEFAULT CURRENT_TIMESTAMP,
                end_time DATETIME,
                score INTEGER,
                total_questions INTEGER DEFAULT 25,
                status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed')),
                passed BOOLEAN DEFAULT NULL,
                FOREIGN KEY (student_id) REFERENCES students(id)
            );

            -- Responses table
            CREATE TABLE IF NOT EXISTS responses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                quiz_id INTEGER NOT NULL,
                question_id INTEGER NOT NULL,
                selected_option_id INTEGER,
                is_correct BOOLEAN,
                answered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
                FOREIGN KEY (question_id) REFERENCES questions(id),
                FOREIGN KEY (selected_option_id) REFERENCES options(id)
            );

            -- Admins table
            CREATE TABLE IF NOT EXISTS admins (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username VARCHAR(50) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `;

        await new Promise((resolve, reject) => {
            db.exec(initSql, (err) => {
                if (err) reject(err);
                else {
                    console.log('✅ Created database tables');
                    resolve();
                }
            });
        });

        // Create admin user
        const adminPassword = await authUtils.hashPassword('admin123');
        await new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO admins (username, password_hash) VALUES (?, ?)',
                ['admin', adminPassword],
                function(err) {
                    if (err) reject(err);
                    else {
                        console.log('✅ Created admin user');
                        resolve();
                    }
                }
            );
        });

        // Create test student
        const studentPassword = await authUtils.hashPassword('student123');
        await new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO students (name, roll_number, grade, section, password_hash) VALUES (?, ?, ?, ?, ?)',
                ['Test Student', 1, 8, 'A', studentPassword],
                function(err) {
                    if (err) reject(err);
                    else {
                        console.log('✅ Created test student');
                        resolve();
                    }
                }
            );
        });

        console.log('=== Database reset completed successfully ===');
        console.log('Admin credentials: username=admin, password=admin123');
        console.log('Test student: roll=1, grade=8, section=A, password=student123');

    } catch (error) {
        console.error('❌ Error resetting database:', error.message);
    } finally {
        await database.close();
    }
}

resetDatabase();