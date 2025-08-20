const database = require('./server/config/database');

async function checkQuestions() {
    try {
        await database.connect();
        const db = database.getDb();
        
        // Check specific questions mentioned in the error
        const problematicQuestions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.grade, q.difficulty, q.question_text,
                       GROUP_CONCAT(o.option_text, ' | ') as options
                FROM questions q
                LEFT JOIN options o ON q.id = o.question_id
                WHERE q.question_text LIKE '%Programming Fundamentals%' 
                   OR q.question_text LIKE '%Sample question 30%'
                   OR q.id IN (22, 30)
                GROUP BY q.id
                ORDER BY q.id
                LIMIT 10
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        console.log('Problematic Questions Found:');
        problematicQuestions.forEach(q => {
            console.log(`\nID: ${q.id}`);
            console.log(`Grade: ${q.grade}`);
            console.log(`Difficulty: ${q.difficulty}`);
            console.log(`Question: ${q.question_text}`);
            console.log(`Options: ${q.options}`);
        });
        
        // Check for placeholder content
        const placeholderQuestions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.grade, q.question_text,
                       GROUP_CONCAT(o.option_text, ' | ') as options
                FROM questions q
                LEFT JOIN options o ON q.id = o.question_id
                WHERE q.question_text LIKE '%placeholder%' 
                   OR q.question_text LIKE '%Alternative option%'
                   OR q.question_text LIKE '%Option A for%'
                   OR q.question_text LIKE '%Option B for%'
                GROUP BY q.id
                LIMIT 20
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        console.log('\n\nPlaceholder Questions Found:');
        placeholderQuestions.forEach(q => {
            console.log(`\nID: ${q.id} | Grade: ${q.grade}`);
            console.log(`Question: ${q.question_text}`);
            console.log(`Options: ${q.options}`);
        });
        
        await database.close();
        
    } catch (error) {
        console.error('Error checking questions:', error);
    }
}

checkQuestions();