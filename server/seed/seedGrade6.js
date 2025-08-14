const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Import all Grade 6 question parts
const grade6Part1 = require('./questions/grade6');
const grade6Part2 = require('./questions/grade6-part2');
const grade6Part3 = require('./questions/grade6-part3');
const { grade6FinalQuestions } = require('./questions/grade6-complete');

// Combine all Grade 6 questions
const allGrade6Questions = [
  ...grade6Part1,
  ...grade6Part2,
  ...grade6Part3,
  ...grade6FinalQuestions
];

async function seedGrade6Questions() {
  const dbPath = path.join(__dirname, '../database/mcq_system.db');
  const db = new sqlite3.Database(dbPath);

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Clear existing Grade 6 questions
      db.run('DELETE FROM quiz_answers WHERE question_id IN (SELECT id FROM questions WHERE grade = 6)');
      db.run('DELETE FROM options WHERE question_id IN (SELECT id FROM questions WHERE grade = 6)');
      db.run('DELETE FROM questions WHERE grade = 6');

      console.log('Seeding Grade 6 questions...');
      console.log(`Total questions to insert: ${allGrade6Questions.length}`);

      let insertedQuestions = 0;
      let insertedOptions = 0;

      // Insert questions and options
      allGrade6Questions.forEach((questionData, index) => {
        const { grade, difficulty, question_text, options } = questionData;

        db.run(
          'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
          [grade, difficulty, question_text],
          function(err) {
            if (err) {
              console.error(`Error inserting question ${index + 1}:`, err);
              return;
            }

            const questionId = this.lastID;
            insertedQuestions++;

            // Insert options for this question
            options.forEach((option, optionIndex) => {
              db.run(
                'INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                [questionId, option.text, option.is_correct ? 1 : 0, optionIndex + 1],
                function(err) {
                  if (err) {
                    console.error(`Error inserting option for question ${questionId}:`, err);
                    return;
                  }
                  insertedOptions++;

                  // Check if all questions and options are inserted
                  if (insertedQuestions === allGrade6Questions.length && 
                      insertedOptions === allGrade6Questions.length * 4) {
                    
                    // Verify the insertion
                    db.get('SELECT COUNT(*) as count FROM questions WHERE grade = 6', (err, row) => {
                      if (err) {
                        reject(err);
                        return;
                      }
                      
                      console.log(`✅ Grade 6 seeding completed!`);
                      console.log(`📊 Questions inserted: ${row.count}`);
                      console.log(`📊 Options inserted: ${insertedOptions}`);
                      
                      // Count by difficulty
                      db.all('SELECT difficulty, COUNT(*) as count FROM questions WHERE grade = 6 GROUP BY difficulty', (err, rows) => {
                        if (err) {
                          reject(err);
                          return;
                        }
                        
                        console.log('\n📈 Questions by difficulty:');
                        rows.forEach(row => {
                          console.log(`   ${row.difficulty}: ${row.count} questions`);
                        });
                        
                        db.close();
                        resolve({
                          totalQuestions: insertedQuestions,
                          totalOptions: insertedOptions,
                          byDifficulty: rows
                        });
                      });
                    });
                  }
                }
              );
            });
          }
        );
      });
    });
  });
}

// Run seeding if called directly
if (require.main === module) {
  seedGrade6Questions()
    .then(result => {
      console.log('\n🎉 Grade 6 database seeding successful!');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Error seeding Grade 6 questions:', error);
      process.exit(1);
    });
}

module.exports = { seedGrade6Questions, allGrade6Questions };