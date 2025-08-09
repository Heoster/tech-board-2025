-- MCQ Testing System Database Schema

-- Students table with enforced grade and roll number rules
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

-- Questions table with updated grade constraints
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
    total_questions INTEGER DEFAULT 50,
    status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed')),
    passed BOOLEAN DEFAULT NULL, -- TECH BOARD 2025 qualification status (36+ correct answers out of 50)
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

-- Admins table with enhanced security
CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    failed_attempts INTEGER DEFAULT 0,
    locked_until TEXT DEFAULT NULL,
    last_login TEXT DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Admin sessions table for security logging
CREATE TABLE IF NOT EXISTS admin_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    admin_id INTEGER NOT NULL,
    ip_address TEXT NOT NULL,
    user_agent TEXT,
    login_time TEXT NOT NULL,
    logout_time TEXT DEFAULT NULL,
    browser_info TEXT DEFAULT NULL,
    session_duration INTEGER DEFAULT NULL,
    FOREIGN KEY (admin_id) REFERENCES admins (id) ON DELETE CASCADE
);

-- Admin activity log table
CREATE TABLE IF NOT EXISTS admin_activity_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    admin_id INTEGER NOT NULL,
    action TEXT NOT NULL,
    details TEXT,
    ip_address TEXT,
    user_agent TEXT,
    timestamp TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (admin_id) REFERENCES admins (id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_students_roll_grade_section ON students(roll_number, grade, section);
CREATE INDEX IF NOT EXISTS idx_questions_grade_difficulty ON questions(grade, difficulty);
CREATE INDEX IF NOT EXISTS idx_options_question_id ON options(question_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_student_id ON quizzes(student_id);
CREATE INDEX IF NOT EXISTS idx_responses_quiz_id ON responses(quiz_id);
CREATE INDEX IF NOT EXISTS idx_responses_question_id ON responses(question_id);

-- Admin security indexes
CREATE INDEX IF NOT EXISTS idx_admin_sessions_admin_id ON admin_sessions(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_login_time ON admin_sessions(login_time);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_ip ON admin_sessions(ip_address);
CREATE INDEX IF NOT EXISTS idx_admin_activity_admin_id ON admin_activity_log(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_activity_timestamp ON admin_activity_log(timestamp);