@echo off
echo Fixing Question Format Issues
echo =============================

echo.
echo Running question format fix script...
node fix-question-format.js

echo.
echo Verifying question format after fix...
node -e "
const database = require('./server/config/database');
async function checkFormat() {
    await database.connect();
    const db = database.getDb();
    
    const badQuestions = await new Promise((resolve, reject) => {
        db.all('SELECT COUNT(*) as count FROM questions WHERE question_text LIKE \"%Grade % % - % Question %\"', (err, row) => {
            if (err) reject(err);
            else resolve(row[0].count);
        });
    });
    
    console.log('Remaining questions with old format:', badQuestions);
    
    const sampleQuestions = await new Promise((resolve, reject) => {
        db.all('SELECT question_text FROM questions LIMIT 5', (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
    
    console.log('Sample questions:');
    sampleQuestions.forEach((q, i) => {
        console.log((i+1) + '. ' + q.question_text);
    });
    
    await database.close();
}
checkFormat().catch(console.error);
"

echo.
echo ✅ Question format fix completed!
pause