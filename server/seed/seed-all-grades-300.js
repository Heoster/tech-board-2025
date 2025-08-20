// Seed All Grades with 300 Questions Each

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Import all complete question sets
const grade6Questions = require('./questions/grade6-complete-300');
const grade7Questions = require('./questions/grade7-complete-300');
const grade8Questions = require('./questions/grade8-complete-300');
const grade9Questions = require('./questions/grade9-complete-300');
const grade11Questions = require('./questions/grade11-complete-300');

const dbPath = path.join(__dirname, '../database/mcq_system_fixed.db');

function seedAllGrades() {
  const db = new sqlite3.Database(dbPath);

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Clear existing questions
      db.run('DELETE FROM questions', (err) => {
        if (err) {
          console.error('Error clearing questions:', err);
          return reject(err);
        }
        console.log('Cleared existing questions');
      });

      // Combine all questions
      const allQuestions = [
        ...grade6Questions,
        ...grade7Questions,
        ...grade8Questions,
        ...grade9Questions,
        ...grade11Questions
      ];

      console.log(`Total questions to seed: ${allQuestions.length}`);
      console.log(`Grade 6: ${grade6Questions.length} questions`);
      console.log(`Grade 7: ${grade7Questions.length} questions`);
      console.log(`Grade 8: ${grade8Questions.length} questions`);
      console.log(`Grade 9: ${grade9Questions.length} questions`);
      console.log(`Grade 11: ${grade11Questions.length} questions`);

      // Prepare insert statements
      const insertQuestion = db.prepare(`
        INSERT INTO questions (grade, difficulty, question_text, option_a, option_b, option_c, option_d, correct_answer)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      let insertedCount = 0;
      let errors = 0;

      allQuestions.forEach((question, index) => {
        const options = question.options;
        const correctOption = options.find(opt => opt.is_correct);
        const correctAnswer = options.indexOf(correctOption);

        insertQuestion.run(
          question.grade,
          question.difficulty,
          question.question_text,
          options[0].text,
          options[1].text,
          options[2].text,
          options[3].text,
          correctAnswer
        , (err) => {
          if (err) {
            console.error(`Error inserting question ${index + 1}:`, err);
            errors++;
          } else {
            insertedCount++;
          }

          // Check if all questions processed
          if (insertedCount + errors === allQuestions.length) {
            insertQuestion.finalize();
            
            console.log(`\nSeeding completed:`);
            console.log(`Successfully inserted: ${insertedCount} questions`);
            console.log(`Errors: ${errors}`);
            
            if (errors === 0) {
              console.log('✅ All questions seeded successfully!');
              resolve();
            } else {
              reject(new Error(`Seeding completed with ${errors} errors`));
            }
          }
        });
      });
    });
  });
}

// Run seeding if called directly
if (require.main === module) {
  seedAllGrades()
    .then(() => {
      console.log('Database seeding completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database seeding failed:', error);
      process.exit(1);
    });
}

module.exports = seedAllGrades;