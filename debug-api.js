const database = require('./server/config/database');

async function debugAPI() {
    try {
        await database.connect();
        const db = database.getDb();
        
        // Check what questions are actually being returned for Grade 11
        const questions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.question_text, q.difficulty
                FROM questions q
                WHERE q.grade = 11
                ORDER BY RANDOM()
                LIMIT 5
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        console.log('=== DEBUGGING GRADE 11 QUESTIONS ===');
        
        for (let question of questions) {
            console.log(`\nQuestion ID: ${question.id}`);
            console.log(`Difficulty: ${question.difficulty}`);
            console.log(`Question Text: "${question.question_text}"`);
            
            // Get options for this question
            const options = await new Promise((resolve, reject) => {
                db.all(`
                    SELECT id, option_text, option_order, is_correct
                    FROM options 
                    WHERE question_id = ?
                    ORDER BY option_order
                `, [question.id], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });
            
            console.log('Options:');
            options.forEach((opt, index) => {
                console.log(`  ${String.fromCharCode(65 + index)}: "${opt.option_text}" ${opt.is_correct ? '(CORRECT)' : ''}`);
            });
        }
        
        // Check if there are any questions with the old format
        const corruptedQuestions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT id, question_text
                FROM questions 
                WHERE question_text LIKE '%Option A%' 
                   OR question_text LIKE '%Option B%'
                   OR question_text LIKE '%Option C%'
                   OR question_text LIKE '%Option D%'
                   OR question_text LIKE '%Correct%Answer%'
                LIMIT 10
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        console.log('\n=== CHECKING FOR CORRUPTED QUESTIONS ===');
        if (corruptedQuestions.length > 0) {
            console.log(`Found ${corruptedQuestions.length} corrupted questions:`);
            corruptedQuestions.forEach(q => {
                console.log(`ID ${q.id}: "${q.question_text}"`);
            });
        } else {
            console.log('No corrupted questions found in database.');
        }
        
        process.exit(0);
        
    } catch (error) {
        console.error('Error debugging API:', error);
        process.exit(1);
    }
}

debugAPI();