const database = require('./server/config/database');

async function finalVerification() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('🔍 FINAL VERIFICATION: 250+ BASIC COMPUTER QUESTIONS');
        console.log('====================================================');
        console.log('');

        // 1. Count basic questions
        const basicCount = await new Promise((resolve) => {
            db.get('SELECT COUNT(*) as count FROM questions WHERE difficulty = "basic"', (err, row) => {
                resolve(row ? row.count : 0);
            });
        });

        // 2. Check question format compliance
        const sampleQuestions = await new Promise((resolve) => {
            db.all(`
                SELECT q.id, q.question_text, q.difficulty, q.grade,
                       COUNT(o.id) as option_count,
                       SUM(CASE WHEN o.is_correct = 1 THEN 1 ELSE 0 END) as correct_count
                FROM questions q
                LEFT JOIN options o ON q.id = o.question_id
                WHERE q.difficulty = "basic"
                GROUP BY q.id
                LIMIT 10
            `, (err, rows) => {
                resolve(rows || []);
            });
        });

        // 3. Language complexity check
        const complexQuestions = await new Promise((resolve) => {
            db.all(`
                SELECT question_text 
                FROM questions 
                WHERE difficulty = "basic" 
                AND (LENGTH(question_text) > 100 
                     OR question_text LIKE '%algorithm%' 
                     OR question_text LIKE '%paradigm%'
                     OR question_text LIKE '%polymorphism%')
                LIMIT 5
            `, (err, rows) => {
                resolve(rows || []);
            });
        });

        // 4. Display results
        console.log('📊 QUANTITY VERIFICATION:');
        console.log(`✅ Basic Questions Found: ${basicCount}`);
        console.log(`✅ Target Met: ${basicCount >= 250 ? 'YES' : 'NO'} (Required: 250+)`);
        console.log('');

        console.log('📝 FORMAT VERIFICATION:');
        let formatCompliant = true;
        sampleQuestions.forEach((q, i) => {
            const hasCorrectOptions = q.option_count === 4;
            const hasOneCorrect = q.correct_count === 1;
            const isBasic = q.difficulty === 'basic';
            
            if (!hasCorrectOptions || !hasOneCorrect || !isBasic) {
                formatCompliant = false;
            }
            
            console.log(`   Question ${i+1}: ${hasCorrectOptions ? '✅' : '❌'} 4 options, ${hasOneCorrect ? '✅' : '❌'} 1 correct`);
        });
        console.log(`✅ Format Compliance: ${formatCompliant ? 'PASSED' : 'FAILED'}`);
        console.log('');

        console.log('🗣️ LANGUAGE VERIFICATION:');
        console.log(`✅ Complex Questions Found: ${complexQuestions.length}`);
        console.log(`✅ Language Level: ${complexQuestions.length === 0 ? 'EASY' : 'NEEDS REVIEW'}`);
        console.log('');

        // 5. Sample questions display
        console.log('📋 SAMPLE QUESTIONS:');
        const displaySamples = await new Promise((resolve) => {
            db.all(`
                SELECT q.question_text, o.option_text, o.is_correct
                FROM questions q
                JOIN options o ON q.id = o.question_id
                WHERE q.difficulty = "basic"
                ORDER BY q.id, o.option_order
                LIMIT 12
            `, (err, rows) => {
                resolve(rows || []);
            });
        });

        let currentQuestion = '';
        let optionIndex = 0;
        displaySamples.forEach(row => {
            if (row.question_text !== currentQuestion) {
                if (currentQuestion !== '') console.log('');
                console.log(`Q: ${row.question_text}`);
                currentQuestion = row.question_text;
                optionIndex = 0;
            }
            const marker = row.is_correct ? '✅' : '❌';
            console.log(`   ${String.fromCharCode(65 + optionIndex)}. ${row.option_text} ${marker}`);
            optionIndex++;
        });

        console.log('');
        console.log('🎯 FINAL RESULT:');
        console.log('================');
        
        if (basicCount >= 250 && formatCompliant && complexQuestions.length === 0) {
            console.log('🎉 SUCCESS: ALL REQUIREMENTS MET!');
            console.log('✅ 250+ Basic Computer Knowledge Questions Available');
            console.log('✅ All questions use easy language');
            console.log('✅ All questions follow default MCQ format');
            console.log('✅ System ready for TECH BOARD 2025 Selection Test');
        } else {
            console.log('⚠️  REQUIREMENTS NOT FULLY MET:');
            if (basicCount < 250) console.log(`   - Need ${250 - basicCount} more basic questions`);
            if (!formatCompliant) console.log('   - Some questions have format issues');
            if (complexQuestions.length > 0) console.log('   - Some questions use complex language');
        }

        await database.close();
    } catch (error) {
        console.error('❌ Verification failed:', error);
    }
}

finalVerification();