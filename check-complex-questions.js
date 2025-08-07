const database = require('./server/config/database');

async function checkComplexQuestions() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('🔍 CHECKING COMPLEX LANGUAGE QUESTIONS');
        console.log('=====================================');

        // Find potentially complex questions
        const complexQuestions = await new Promise((resolve) => {
            db.all(`
                SELECT id, question_text 
                FROM questions 
                WHERE difficulty = "basic" 
                AND (LENGTH(question_text) > 100 
                     OR question_text LIKE '%algorithm%' 
                     OR question_text LIKE '%paradigm%'
                     OR question_text LIKE '%polymorphism%'
                     OR question_text LIKE '%implementation%'
                     OR question_text LIKE '%architecture%'
                     OR question_text LIKE '%methodology%')
            `, (err, rows) => {
                resolve(rows || []);
            });
        });

        console.log(`Found ${complexQuestions.length} potentially complex questions:`);
        console.log('');

        complexQuestions.forEach((q, i) => {
            console.log(`${i+1}. ID: ${q.id}`);
            console.log(`   Question: ${q.question_text}`);
            console.log(`   Length: ${q.question_text.length} characters`);
            console.log('');
        });

        // Check for very long questions
        const longQuestions = await new Promise((resolve) => {
            db.all(`
                SELECT id, question_text, LENGTH(question_text) as length
                FROM questions 
                WHERE difficulty = "basic" 
                AND LENGTH(question_text) > 80
                ORDER BY LENGTH(question_text) DESC
                LIMIT 10
            `, (err, rows) => {
                resolve(rows || []);
            });
        });

        console.log('📏 LONGEST BASIC QUESTIONS:');
        console.log('===========================');
        longQuestions.forEach((q, i) => {
            console.log(`${i+1}. (${q.length} chars) ${q.question_text}`);
        });

        await database.close();
    } catch (error) {
        console.error('Error:', error);
    }
}

checkComplexQuestions();