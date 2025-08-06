const database = require('./server/config/database');

async function checkBasicQuestions() {
    try {
        await database.connect();
        const db = database.getDb();
        
        console.log('=== BASIC LEVEL QUESTIONS SAMPLES ===\n');
        
        const grades = [1, 6, 7, 8, 9];
        
        for (const grade of grades) {
            console.log(`📚 Grade ${grade} Basic Questions:`);
            
            const questions = await new Promise((resolve, reject) => {
                db.all(`
                    SELECT question_text 
                    FROM questions 
                    WHERE grade = ? AND difficulty = 'basic' 
                    LIMIT 5
                `, [grade], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });
            
            questions.forEach((q, index) => {
                console.log(`  ${index + 1}. ${q.question_text}`);
            });
            console.log('');
        }
        
        await database.close();
        console.log('✅ Basic questions check complete!');
        
    } catch (error) {
        console.error('❌ Error:', error);
        await database.close();
    }
}

checkBasicQuestions();