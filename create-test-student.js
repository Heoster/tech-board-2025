const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'server', 'database', 'mcq_system_fixed.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    return;
  }
  
  console.log('Connected to database');
  
  // Create test student
  bcrypt.hash('test123', 10, (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
      return;
    }
    
    db.run(
      'INSERT OR REPLACE INTO students (id, name, roll_number, grade, section, password) VALUES (999, ?, ?, ?, ?, ?)',
      ['Test Student', 'TEST2024', 8, 'A', hash],
      function(err) {
        if (err) {
          console.error('Error creating test student:', err.message);
        } else {
          console.log('✅ Test student created successfully');
          console.log('   Roll Number: TEST2024');
          console.log('   Grade: 8');
          console.log('   Section: A');
          console.log('   Password: test123');
        }
        db.close();
      }
    );
  });
});