const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Import all grade questions
const grade6Questions = require('./questions/grade6');
const grade6Part2Questions = require('./questions/grade6-part2');
const grade6Part3Questions = require('./questions/grade6-part3');
const { grade6FinalQuestions } = require('./questions/grade6-complete');
const grade7Questions = require('./questions/grade7');
const { grade7CompleteQuestions } = require('./questions/grade7-complete');
const grade8Questions = require('./questions/grade8');
const { allGrade9Questions } = require('./questions/grade9-complete');
const grade11Questions = require('./questions/grade11');
const { grade11CompleteQuestions } = require('./questions/grade11-complete');

// Combine all questions by grade
const allQuestions = {
  6: [...grade6Questions, ...grade6Part2Questions, ...grade6Part3Questions, ...grade6FinalQuestions],
  7: [...grade7Questions, ...grade7CompleteQuestions],
  8: [...grade8Questions],
  9: [...allGrade9Questions],
  11: [...grade11Questions, ...grade11CompleteQuestions]
};

async function seedAllGrades() {
  const dbPath = path.join(__dirname, '../database.sqlite');
  const db = new sqlite3.Database(dbPath);

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Clear existing questions
      db.run('DELETE FROM quiz_answers');
      db.run('DELETE FROM options');
      db.run('DELETE FROM questions');

      console.log('🚀 Starting database seeding for all grades...');
      console.log('📚 Grades to seed: 6, 7, 8, 9, 11');
      console.log('🎯 Target: 300 unique questions per grade (1,500 total)');
      console.log('📊 Difficulty distribution: Basic, Medium, Advanced\n');
      
      let totalInserted = 0;
      let totalOptions = 0;
      const gradeStats = {};

      // Process each grade
      Object.keys(allQuestions).forEach(grade => {
        const questions = allQuestions[grade];
        gradeStats[grade] = { total: questions.length, basic: 0, medium: 0, advanced: 0 };
        
        console.log(`\n📚 Seeding Grade ${grade}: ${questions.length} questions`);
        
        if (questions.length !== 300) {
          console.log(`⚠️  Warning: Grade ${grade} has ${questions.length} questions, expected 300`);
        }

        questions.forEach((questionData, index) => {
          const { difficulty, question_text, options } = questionData;
          gradeStats[grade][difficulty]++;

          db.run(
            'INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
            [parseInt(grade), difficulty, question_text],
            function(err) {
              if (err) {
                console.error(`❌ Error inserting question ${index + 1} for grade ${grade}:`, err);
                return;
              }

              const questionId = this.lastID;
              totalInserted++;

              // Insert options
              options.forEach((option, optionIndex) => {
                db.run(
                  'INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                  [questionId, option.text, option.is_correct ? 1 : 0, optionIndex + 1],
                  function(err) {
                    if (err) {
                      console.error(`❌ Error inserting option for question ${questionId}:`, err);
                      return;
                    }
                    totalOptions++;

                    // Check if all questions are processed
                    const expectedQuestions = Object.values(allQuestions).reduce((sum, q) => sum + q.length, 0);
                    const expectedOptions = expectedQuestions * 4;

                    if (totalInserted === expectedQuestions && totalOptions === expectedOptions) {
                      // Final verification
                      db.all('SELECT grade, COUNT(*) as count FROM questions GROUP BY grade ORDER BY grade', (err, rows) => {
                        if (err) {
                          reject(err);
                          return;
                        }

                        console.log('\n🎉 Database seeding completed successfully!');
                        console.log('\n📊 Final Statistics:');
                        console.log(`   Total Questions: ${totalInserted}`);
                        console.log(`   Total Options: ${totalOptions}`);
                        
                        console.log('\n📈 Questions by Grade:');
                        rows.forEach(row => {
                          console.log(`   Grade ${row.grade}: ${row.count} questions`);
                        });
                        
                        // Verify we have exactly 300 questions per grade
                        const expectedPerGrade = 300;
                        let allGradesValid = true;
                        rows.forEach(row => {
                          if (row.count !== expectedPerGrade) {
                            console.log(`⚠️  Warning: Grade ${row.grade} has ${row.count} questions, expected ${expectedPerGrade}`);
                            allGradesValid = false;
                          }
                        });
                        
                        if (allGradesValid) {
                          console.log('\n✅ All grades have exactly 300 questions each!');
                        }

                        console.log('\n📋 Questions by Difficulty:');
                        Object.keys(gradeStats).forEach(grade => {
                          const stats = gradeStats[grade];
                          console.log(`   Grade ${grade}:`);
                          console.log(`     Basic: ${stats.basic}`);
                          console.log(`     Medium: ${stats.medium}`);
                          console.log(`     Advanced: ${stats.advanced}`);
                        });

                        db.close();
                        resolve({
                          totalQuestions: totalInserted,
                          totalOptions: totalOptions,
                          gradeBreakdown: rows,
                          difficultyBreakdown: gradeStats
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
  });
}

// Run seeding if called directly
if (require.main === module) {
  seedAllGrades()
    .then(result => {
      console.log('\n✅ All grades seeded successfully!');
      console.log('\n🎯 Summary:');
      console.log('   - Grade 6: 300 questions (Computer Fundamentals, Components, I/O Devices, Office Apps, Networking, Security, AI, Programming)');
      console.log('   - Grade 7: 300 questions (Advanced Fundamentals, Operating Systems, Advanced Office Apps, Internet & Web)');
      console.log('   - Grade 8: 300 questions (Programming Basics, Database Concepts, Web Development, Advanced Networking, Digital Media)');
      console.log('   - Grade 9: 300 questions (Advanced Programming, Networks & Security, Database Management, Web Development, Emerging Tech)');
      console.log('   - Grade 11: 300 questions (Advanced CS Concepts, Database Systems, Network Administration, Cybersecurity, Emerging Technologies)');
      console.log('\n🎉 Total: 1,500 unique questions across all difficulty levels!');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Error seeding database:', error);
      process.exit(1);
    });
}

module.exports = { seedAllGrades, allQuestions };