@echo off
echo ========================================
echo SEEDING 250+ BASIC COMPUTER QUESTIONS
echo ========================================
echo.
echo Starting seeding process...
echo.

cd server
node scripts/seed-250-basic-questions.js

echo.
echo ========================================
echo SEEDING COMPLETE!
echo ========================================
echo.
echo Verifying question count...
node -e "
const database = require('./config/database');
(async () => {
    await database.connect();
    const db = database.getDb();
    const result = await new Promise((resolve) => {
        db.get('SELECT COUNT(*) as count FROM questions WHERE difficulty = \"basic\"', (err, row) => {
            resolve(row ? row.count : 0);
        });
    });
    console.log('Total Basic Questions in Database:', result);
    await database.close();
})();
"

pause