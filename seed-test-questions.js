const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'server', 'database', 'test.db');
const schemaPath = path.join(__dirname, 'server', 'database', 'test-init.sql');

// Create database with schema
const db = new sqlite3.Database(dbPath);

// Read and execute schema
const schema = fs.readFileSync(schemaPath, 'utf8');
db.exec(schema);

// Add minimal test questions for each grade
const testQuestions = [
  { grade: 6, difficulty: 'basic', question_text: 'What is a computer?', options: ['Electronic device', 'Mechanical device', 'Optical device', 'Chemical device'], correct: 0 },
  { grade: 7, difficulty: 'basic', question_text: 'What is an operating system?', options: ['System software', 'Application software', 'Hardware', 'Network'], correct: 0 },
  { grade: 8, difficulty: 'basic', question_text: 'What is HTML?', options: ['Markup language', 'Programming language', 'Database', 'Operating system'], correct: 0 },
  { grade: 9, difficulty: 'basic', question_text: 'What is a database?', options: ['Data storage system', 'Web browser', 'Text editor', 'Game'], correct: 0 },
  { grade: 11, difficulty: 'basic', question_text: 'What is Python?', options: ['Programming language', 'Web browser', 'Database', 'Hardware'], correct: 0 }
];

async function seedTestQuestions() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Clear existing data
      db.run('DELETE FROM quiz_answers');
      db.run('DELETE FROM quizzes');
      db.run('DELETE FROM options');
      db.run('DELETE FROM questions');
      
      let completed = 0;
      const totalQuestions = testQuestions.length + 50;
      
      // Insert base test questions
      testQuestions.forEach((q) => {
        db.run(
          'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
          [q.grade, q.difficulty, q.question_text],
          function(err) {
            if (err) {
              console.error('Error inserting question:', err);
              return;
            }
            
            const qId = this.lastID;
            
            // Insert options for this question
            q.options.forEach((option, optIndex) => {
              db.run(
                'INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                [qId, option, optIndex === q.correct ? 1 : 0, optIndex + 1]
              );
            });
            
            completed++;
            if (completed === totalQuestions) {
              setTimeout(() => {
                db.close((err) => {
                  if (err) reject(err);
                  else {
                    console.log('Test database seeded with questions');
                    resolve();
                  }
                });
              }, 500);
            }
          }
        );
      });
      
      // Add more questions for testing (10 per grade)
      [6, 7, 8, 9, 11].forEach(grade => {
        for (let i = 1; i <= 10; i++) {
          db.run(
            'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
            [grade, 'basic', `Grade ${grade} test question ${i}?`],
            function(err) {
              if (err) {
                console.error('Error inserting question:', err);
                return;
              }
              
              const qId = this.lastID;
              
              // Add 4 options for each question
              for (let j = 1; j <= 4; j++) {
                db.run(
                  'INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                  [qId, `Option ${j}`, j === 1 ? 1 : 0, j]
                );
              }
              
              completed++;
              if (completed === totalQuestions) {
                setTimeout(() => {
                  db.close((err) => {
                    if (err) reject(err);
                    else {
                      console.log('Test database seeded with questions');
                      resolve();
                    }
                  });
                }, 500);
              }
            }
          );
        }
      });
    });
  });
}

if (require.main === module) {
  seedTestQuestions().catch(console.error);
}

module.exports = { seedTestQuestions };