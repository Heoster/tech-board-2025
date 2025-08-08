const database = require('./server/config/database');

async function checkCurrentDatabase() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('📊 CURRENT DATABASE ANALYSIS');
        console.log('============================');

        // Check total questions
        const totalQuestions = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        console.log(`📋 Total Questions in Database: ${totalQuestions}`);

        // Check questions by grade
        const questionsByGrade = await new Promise((resolve, reject) => {
            db.all(`
                SELECT grade, 
                       COUNT(*) as total,
                       COUNT(CASE WHEN difficulty = 'basic' THEN 1 END) as basic,
                       COUNT(CASE WHEN difficulty = 'medium' THEN 1 END) as medium,
                       COUNT(CASE WHEN difficulty = 'advanced' THEN 1 END) as advanced
                FROM questions 
                GROUP BY grade 
                ORDER BY grade
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log('\n📚 QUESTIONS BY GRADE AND DIFFICULTY:');
        console.log('=====================================');
        
        let grandTotal = 0;
        questionsByGrade.forEach(row => {
            console.log(`Grade ${row.grade}:`);
            console.log(`  Total: ${row.total} questions`);
            console.log(`  Basic: ${row.basic} (${Math.round(row.basic/row.total*100)}%)`);
            console.log(`  Medium: ${row.medium} (${Math.round(row.medium/row.total*100)}%)`);
            console.log(`  Advanced: ${row.advanced} (${Math.round(row.advanced/row.total*100)}%)`);
            console.log('');
            grandTotal += row.total;
        });

        console.log(`📊 GRAND TOTAL: ${grandTotal} questions`);

        // Check sample questions from each difficulty
        console.log('\n📝 SAMPLE QUESTIONS BY DIFFICULTY:');
        console.log('==================================');
        
        const difficulties = ['basic', 'medium', 'advanced'];
        for (const difficulty of difficulties) {
            const samples = await new Promise((resolve, reject) => {
                db.all(`
                    SELECT grade, question_text 
                    FROM questions 
                    WHERE difficulty = ? 
                    ORDER BY RANDOM() 
                    LIMIT 3
                `, [difficulty], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });

            console.log(`\n${difficulty.toUpperCase()} Questions:`);
            samples.forEach((q, index) => {
                console.log(`${index + 1}. [Grade ${q.grade}] ${q.question_text.substring(0, 60)}...`);
            });
        }

        // Recommended ratios
        console.log('\n🎯 RECOMMENDED DIFFICULTY RATIOS:');
        console.log('=================================');
        console.log('For balanced assessment:');
        console.log('• Basic: 60% (foundation knowledge)');
        console.log('• Medium: 30% (application skills)');
        console.log('• Advanced: 10% (higher-order thinking)');
        
        console.log('\nFor each grade with 300 questions:');
        console.log('• Basic: 180 questions');
        console.log('• Medium: 90 questions');
        console.log('• Advanced: 30 questions');

    } catch (error) {
        console.error('❌ Error checking database:', error);
    } finally {
        await database.close();
    }
}

checkCurrentDatabase();