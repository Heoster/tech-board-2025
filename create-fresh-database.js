const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'server/database/mcq_system_fixed.db');

console.log('🔄 Creating fresh database with correct schema...\n');

// Remove existing database files
try {
    if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
    if (fs.existsSync(dbPath + '-shm')) fs.unlinkSync(dbPath + '-shm');
    if (fs.existsSync(dbPath + '-wal')) fs.unlinkSync(dbPath + '-wal');
    console.log('✅ Cleaned up old database files');
} catch (error) {
    console.log('⚠️  No old database files to clean up');
}

const db = new sqlite3.Database(dbPath);

async function createFreshDatabase() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            console.log('📋 Creating tables...');
            
            // Create students table
            db.run(`
                CREATE TABLE students (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    roll_number INTEGER NOT NULL,
                    grade INTEGER NOT NULL,
                    section TEXT NOT NULL DEFAULT 'A',
                    password TEXT NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(roll_number, grade, section)
                )
            `, (err) => {
                if (err) {
                    console.error('❌ Error creating students table:', err);
                    reject(err);
                    return;
                }
                console.log('✅ Students table created');
            });
            
            // Create admins table
            db.run(`
                CREATE TABLE admins (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `, (err) => {
                if (err) {
                    console.error('❌ Error creating admins table:', err);
                    reject(err);
                    return;
                }
                console.log('✅ Admins table created');
            });
            
            // Create questions table
            db.run(`
                CREATE TABLE questions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    grade INTEGER NOT NULL,
                    difficulty TEXT NOT NULL CHECK (difficulty IN ('basic', 'medium', 'advanced')),
                    question_text TEXT NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `, (err) => {
                if (err) {
                    console.error('❌ Error creating questions table:', err);
                    reject(err);
                    return;
                }
                console.log('✅ Questions table created');
            });
            
            // Create options table
            db.run(`
                CREATE TABLE options (
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
                CREATE TABLE quizzes (
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
                CREATE TABLE quiz_answers (
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
            
            // Create results table (for backward compatibility)
            db.run(`
                CREATE TABLE results (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    student_id INTEGER NOT NULL,
                    grade INTEGER NOT NULL,
                    score INTEGER NOT NULL,
                    total_questions INTEGER NOT NULL,
                    time_taken INTEGER NOT NULL,
                    answers TEXT NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `, (err) => {
                if (err) {
                    console.error('❌ Error creating results table:', err);
                    reject(err);
                    return;
                }
                console.log('✅ Results table created');
            });
            
            // Insert default admin
            db.run(`
                INSERT INTO admins (username, password) 
                VALUES ('admin', '$2b$10$YI1rJ8FC/T4ifwYQh1y5yeexsjcDJT/GB19P.xauEJAcrDrNBJbsS')
            `, (err) => {
                if (err) {
                    console.error('❌ Error creating admin user:', err);
                    reject(err);
                    return;
                }
                console.log('✅ Default admin user created');
            });
            
            // Create indexes
            db.run('CREATE INDEX IF NOT EXISTS idx_students_grade ON students(grade)', () => {
                console.log('✅ Student grade index created');
            });
            
            db.run('CREATE INDEX IF NOT EXISTS idx_questions_grade ON questions(grade)', () => {
                console.log('✅ Question grade index created');
            });
            
            db.run('CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty)', () => {
                console.log('✅ Question difficulty index created');
            });
            
            db.run('CREATE INDEX IF NOT EXISTS idx_options_question ON options(question_id)', () => {
                console.log('✅ Options question index created');
            });
            
            console.log('\n🎉 Fresh database created successfully!');
            resolve();
        });
    });
}

createFreshDatabase()
    .then(() => {
        console.log('\n📊 Verifying database structure...');
        
        db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
            if (err) {
                console.error('❌ Error verifying tables:', err);
                db.close();
                return;
            }
            
            console.log('✅ Tables created:');
            tables.forEach(table => {
                console.log(`  - ${table.name}`);
            });
            
            console.log('\n🎯 Database is ready for seeding!');
            console.log('Next step: Run the seeding script to populate questions');
            
            db.close();
        });
    })
    .catch((error) => {
        console.error('❌ Database creation failed:', error);
        db.close();
    });