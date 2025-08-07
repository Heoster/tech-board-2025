@echo off
echo ========================================
echo RESETTING DATABASE AND SEEDING 1500+ QUESTIONS
echo ========================================
echo.
echo WARNING: This will delete all existing data!
echo Press any key to continue or Ctrl+C to cancel...
pause > nul
echo.

echo Starting complete database reset and seeding...
echo.

cd server
node scripts/seed-1500-questions-master.js

echo.
echo ========================================
echo VERIFICATION
echo ========================================
echo.
echo Checking question counts per grade...

node -e "
const database = require('./config/database');
(async () => {
    await database.connect();
    const db = database.getDb();
    
    console.log('📊 GRADE-WISE QUESTION COUNTS:');
    console.log('==============================');
    
    for (const grade of [6, 7, 8, 9, 11]) {
        const count = await new Promise((resolve) => {
            db.get('SELECT COUNT(*) as count FROM questions WHERE grade = ? AND difficulty = \"basic\"', [grade], (err, row) => {
                resolve(row ? row.count : 0);
            });
        });
        const status = count >= 250 ? '✅' : '⚠️ ';
        console.log(status + ' Grade ' + grade + ': ' + count + ' questions');
    }
    
    const total = await new Promise((resolve) => {
        db.get('SELECT COUNT(*) as count FROM questions WHERE difficulty = \"basic\"', (err, row) => {
            resolve(row ? row.count : 0);
        });
    });
    
    console.log('');
    console.log('🎯 TOTAL BASIC QUESTIONS: ' + total);
    console.log(total >= 1250 ? '✅ SUCCESS: 1250+ questions achieved!' : '⚠️  Need more questions');
    
    await database.close();
})();
"

echo.
echo ========================================
echo PROCESS COMPLETE!
echo ========================================
pause