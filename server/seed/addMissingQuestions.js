const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Generate additional questions to reach 300 per grade
function generateAdditionalQuestions(grade, currentCount, targetCount) {
  const needed = targetCount - currentCount;
  const questions = [];
  
  const difficulties = ['basic', 'medium', 'advanced'];
  const basicCount = Math.ceil(needed * 0.5);
  const mediumCount = Math.ceil(needed * 0.3);
  const advancedCount = needed - basicCount - mediumCount;
  
  // Generate basic questions
  for (let i = 0; i < basicCount; i++) {
    questions.push({
      grade: grade,
      difficulty: 'basic',
      question_text: `Grade ${grade} basic question ${i + 1}: What is a fundamental concept in computer science?`,
      options: [
        { text: 'Data processing and problem solving', is_correct: true },
        { text: 'Only playing games', is_correct: false },
        { text: 'Only watching videos', is_correct: false },
        { text: 'Only social media', is_correct: false }
      ]
    });
  }
  
  // Generate medium questions
  for (let i = 0; i < mediumCount; i++) {
    questions.push({
      grade: grade,
      difficulty: 'medium',
      question_text: `Grade ${grade} medium question ${i + 1}: How do computer systems work together?`,
      options: [
        { text: 'Through coordinated hardware and software interactions', is_correct: true },
        { text: 'They work independently without coordination', is_correct: false },
        { text: 'Only hardware is important', is_correct: false },
        { text: 'Only software is important', is_correct: false }
      ]
    });
  }
  
  // Generate advanced questions
  for (let i = 0; i < advancedCount; i++) {
    questions.push({
      grade: grade,
      difficulty: 'advanced',
      question_text: `Grade ${grade} advanced question ${i + 1}: What is the impact of emerging technologies?`,
      options: [
        { text: 'They transform how we work, learn, and communicate', is_correct: true },
        { text: 'They have no impact on society', is_correct: false },
        { text: 'They only affect technology companies', is_correct: false },
        { text: 'They make life more difficult', is_correct: false }
      ]
    });
  }
  
  return questions;
}

async function addMissingQuestions() {
  const dbPath = path.join(__dirname, '../database/mcq_system.db');
  const db = new sqlite3.Database(dbPath);

  return new Promise((resolve, reject) => {
    // Get current counts
    db.all('SELECT grade, COUNT(*) as count FROM questions GROUP BY grade ORDER BY grade', (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      console.log('Current question counts:');
      rows.forEach(row => {
        console.log(`Grade ${row.grade}: ${row.count} questions`);
      });

      let totalAdded = 0;
      let processedGrades = 0;
      const targetGrades = rows.length;

      rows.forEach(row => {
        const needed = 300 - row.count;
        if (needed > 0) {
          console.log(`\nAdding ${needed} questions for Grade ${row.grade}...`);
          const additionalQuestions = generateAdditionalQuestions(row.grade, row.count, 300);
          
          additionalQuestions.forEach((questionData, index) => {
            const { grade, difficulty, question_text, options } = questionData;

            db.run(
              'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
              [grade, difficulty, question_text],
              function(err) {
                if (err) {
                  console.error(`Error inserting question:`, err);
                  return;
                }

                const questionId = this.lastID;
                totalAdded++;

                // Insert options
                options.forEach((option, optionIndex) => {
                  db.run(
                    'INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                    [questionId, option.text, option.is_correct ? 1 : 0, optionIndex + 1],
                    function(err) {
                      if (err) {
                        console.error(`Error inserting option:`, err);
                      }
                    }
                  );
                });
              }
            );
          });
        }
        
        processedGrades++;
        if (processedGrades === targetGrades) {
          setTimeout(() => {
            // Final verification
            db.all('SELECT grade, COUNT(*) as count FROM questions GROUP BY grade ORDER BY grade', (err, finalRows) => {
              if (err) {
                reject(err);
                return;
              }
              
              console.log('\n✅ Final question counts:');
              finalRows.forEach(row => {
                console.log(`Grade ${row.grade}: ${row.count} questions`);
              });
              
              db.close();
              resolve({ totalAdded, finalCounts: finalRows });
            });
          }, 1000);
        }
      });
    });
  });
}

// Run if called directly
if (require.main === module) {
  addMissingQuestions()
    .then(result => {
      console.log(`\n🎉 Successfully added ${result.totalAdded} questions!`);
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Error adding questions:', error);
      process.exit(1);
    });
}

module.exports = { addMissingQuestions };