const database = require('./server/config/database');

async function checkQuestions() {
  await database.connect();
  const db = database.getDb();

  db.all('SELECT id, question_text FROM questions WHERE question_text LIKE "%Option%" LIMIT 5', (err, rows) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Questions with concatenated options:');
      if (rows.length === 0) {
        console.log('No corrupted questions found!');
      } else {
        rows.forEach(row => {
          console.log(`ID: ${row.id}`);
          console.log(`Text: ${row.question_text}`);
          console.log('---');
        });
      }
    }
    process.exit(0);
  });
}

checkQuestions();