const database = require('./server/config/database');

async function checkQuestions() {
    try {
        await database.connect();
        const db = database.getDb();
        
        console.log('=== SAMPLE QUESTIONS FROM EACH GRADE ===\n');
        
        const grades = [1, 6, 7, 8, 9, 11];
        
        for (const grade of grades) {
            console.log(`📚 GRADE ${grade} SAMPLES:`);
            
            const questions = await new Promise((resolve, reject) => {
                db.all(`
                    SELECT q.id, q.question_text, q.difficulty
                    FROM questions q
                    WHERE q.grade = ?
                    ORDER BY q.difficulty, q.id
                    LIMIT 3
                `, [grade], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });
            
            for (const question of questions) {
                const options = await new Promise((resolve, reject) => {
                    db.all(`
                        SELECT option_text, is_correct
                        FROM options
                        WHERE question_id = ?
                        ORDER BY option_order
                    `, [question.id], (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    });
                });
                
                console.log(`  [${question.difficulty.toUpperCase()}] ${question.question_text}`);
                options.forEach((opt, index) => {
                    const marker = opt.is_correct ? '✓' : ' ';
                    console.log(`    ${String.fromCharCode(65 + index)}. ${opt.option_text} ${marker}`);
                });
                console.log('');
            }
            
            console.log('---\n');
        }
        
        await database.close();
        console.log('✅ Question format verification complete!');
        
    } catch (error) {
        console.error('❌ Error checking questions:', error);
        await database.close();
    }
}

checkQuestions();