const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

console.log('🗄️ Resetting database...\n');

const dbDir = path.join(__dirname, 'server/database');
const dbPath = path.join(dbDir, 'mcq_system.db');

try {
  // Step 1: Close any existing connections and remove old database files
  console.log('🧹 Cleaning old database files...');
  
  const filesToRemove = [
    'mcq_system.db',
    'mcq_system_fixed.db',
    'mcq_system_test.db',
    'mcq_system.db-shm',
    'mcq_system.db-wal',
    'mcq_system_fixed.db-shm',
    'mcq_system_fixed.db-wal'
  ];

  filesToRemove.forEach(file => {
    const filePath = path.join(dbDir, file);
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`  ✅ Removed ${file}`);
      }
    } catch (error) {
      console.log(`  ⚠️ Could not remove ${file}: ${error.message}`);
    }
  });

  // Step 2: Remove backup files
  console.log('🗑️ Removing backup files...');
  const files = fs.readdirSync(dbDir);
  files.forEach(file => {
    if (file.includes('.backup.')) {
      try {
        fs.unlinkSync(path.join(dbDir, file));
        console.log(`  ✅ Removed backup ${file}`);
      } catch (error) {
        console.log(`  ⚠️ Could not remove backup ${file}: ${error.message}`);
      }
    }
  });

  // Step 3: Create fresh database with basic schema
  console.log('🆕 Creating fresh database...');
  
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('❌ Error creating database:', err.message);
      return;
    }
    console.log('✅ Connected to fresh SQLite database');
  });

  // Step 4: Create basic tables
  console.log('📋 Creating database schema...');
  
  const createTables = `
    -- Students table
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      grade INTEGER NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Admins table
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Questions table
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      grade INTEGER NOT NULL,
      difficulty TEXT NOT NULL,
      question_text TEXT NOT NULL,
      options TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Results table
    CREATE TABLE IF NOT EXISTS results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      grade INTEGER NOT NULL,
      score INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      time_taken INTEGER NOT NULL,
      answers TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_id) REFERENCES students (id)
    );

    -- Create indexes for better performance
    CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
    CREATE INDEX IF NOT EXISTS idx_students_grade ON students(grade);
    CREATE INDEX IF NOT EXISTS idx_questions_grade ON questions(grade);
    CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(grade, difficulty);
    CREATE INDEX IF NOT EXISTS idx_results_student ON results(student_id);
    CREATE INDEX IF NOT EXISTS idx_results_grade ON results(grade);
  `;

  db.exec(createTables, (err) => {
    if (err) {
      console.error('❌ Error creating tables:', err.message);
      return;
    }
    console.log('✅ Database schema created successfully');

    // Step 5: Insert default admin
    console.log('👤 Creating default admin...');
    const bcrypt = require('bcrypt');
    const defaultPassword = bcrypt.hashSync('admin123', 10);
    
    db.run(
      'INSERT OR REPLACE INTO admins (username, password) VALUES (?, ?)',
      ['admin', defaultPassword],
      function(err) {
        if (err) {
          console.error('❌ Error creating admin:', err.message);
        } else {
          console.log('✅ Default admin created (username: admin, password: admin123)');
        }

        // Step 6: Verify database
        console.log('🔍 Verifying database...');
        db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
          if (err) {
            console.error('❌ Error verifying database:', err.message);
          } else {
            console.log('✅ Database tables created:');
            tables.forEach(table => {
              console.log(`  - ${table.name}`);
            });
          }

          // Close database connection
          db.close((err) => {
            if (err) {
              console.error('❌ Error closing database:', err.message);
            } else {
              console.log('✅ Database connection closed');
            }

            console.log('\n🎉 Database reset completed successfully!');
            console.log('📊 Database Summary:');
            console.log('  ✅ Fresh database created');
            console.log('  ✅ All tables created with indexes');
            console.log('  ✅ Default admin account created');
            console.log('  ✅ Ready for new question data');
            console.log('\n💡 Next steps:');
            console.log('  1. Add questions through admin panel');
            console.log('  2. Or create new seeding scripts');
            console.log('  3. Test the application');
          });
        });
      }
    );
  });

} catch (error) {
  console.error('\n❌ Database reset failed:', error.message);
  console.error('Stack trace:', error.stack);
  process.exit(1);
}