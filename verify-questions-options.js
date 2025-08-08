const database = require('./server/config/database');

async function verifyQuestionsOptions() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('🔍 VERIFYING ALL QUESTIONS HAVE PROPER OPTIONS');
        console.log('===============================================');

        // Check total questions and options
        const totalQuestions = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        const totalOptions = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM options', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        console.log(`📊 Total Questions: ${totalQuestions}`);
        console.log(`📊 Total Options: ${totalOptions}`);
        console.log(`📊 Expected Options: ${totalQuestions * 4} (4 per question)`);

        // Check questions without options
        const questionsWithoutOptions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.grade, q.question_text 
                FROM questions q 
                LEFT JOIN options o ON q.id = o.question_id 
                WHERE o.question_id IS NULL
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        if (questionsWithoutOptions.length > 0) {
            console.log(`\n❌ FOUND ${questionsWithoutOptions.length} QUESTIONS WITHOUT OPTIONS:`);
            questionsWithoutOptions.forEach(q => {
                console.log(`   ID ${q.id} (Grade ${q.grade}): ${q.question_text.substring(0, 50)}...`);
            });
        } else {
            console.log('\n✅ All questions have options');
        }

        // Check questions with incorrect number of options
        const questionsWithWrongOptionCount = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.grade, q.question_text, COUNT(o.id) as option_count
                FROM questions q 
                LEFT JOIN options o ON q.id = o.question_id 
                GROUP BY q.id
                HAVING COUNT(o.id) != 4
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        if (questionsWithWrongOptionCount.length > 0) {
            console.log(`\n❌ FOUND ${questionsWithWrongOptionCount.length} QUESTIONS WITH WRONG OPTION COUNT:`);
            questionsWithWrongOptionCount.forEach(q => {
                console.log(`   ID ${q.id} (Grade ${q.grade}): ${q.option_count} options - ${q.question_text.substring(0, 50)}...`);
            });
        } else {
            console.log('\n✅ All questions have exactly 4 options');
        }

        // Check questions without correct answers
        const questionsWithoutCorrectAnswer = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.grade, q.question_text
                FROM questions q 
                WHERE q.id NOT IN (
                    SELECT DISTINCT question_id 
                    FROM options 
                    WHERE is_correct = 1
                )
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        if (questionsWithoutCorrectAnswer.length > 0) {
            console.log(`\n❌ FOUND ${questionsWithoutCorrectAnswer.length} QUESTIONS WITHOUT CORRECT ANSWER:`);
            questionsWithoutCorrectAnswer.forEach(q => {
                console.log(`   ID ${q.id} (Grade ${q.grade}): ${q.question_text.substring(0, 50)}...`);
            });
        } else {
            console.log('\n✅ All questions have correct answers');
        }

        // Check questions with multiple correct answers
        const questionsWithMultipleCorrect = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.grade, q.question_text, COUNT(o.id) as correct_count
                FROM questions q 
                JOIN options o ON q.id = o.question_id 
                WHERE o.is_correct = 1
                GROUP BY q.id
                HAVING COUNT(o.id) > 1
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        if (questionsWithMultipleCorrect.length > 0) {
            console.log(`\n⚠️  FOUND ${questionsWithMultipleCorrect.length} QUESTIONS WITH MULTIPLE CORRECT ANSWERS:`);
            questionsWithMultipleCorrect.forEach(q => {
                console.log(`   ID ${q.id} (Grade ${q.grade}): ${q.correct_count} correct - ${q.question_text.substring(0, 50)}...`);
            });
        } else {
            console.log('\n✅ All questions have exactly one correct answer');
        }

        // Check by grade
        console.log('\n📊 BREAKDOWN BY GRADE:');
        const grades = [6, 7, 8, 9, 11];
        for (const grade of grades) {
            const gradeStats = await new Promise((resolve, reject) => {
                db.get(`
                    SELECT 
                        COUNT(DISTINCT q.id) as questions,
                        COUNT(o.id) as options,
                        COUNT(CASE WHEN o.is_correct = 1 THEN 1 END) as correct_answers
                    FROM questions q 
                    LEFT JOIN options o ON q.id = o.question_id 
                    WHERE q.grade = ?
                `, [grade], (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                });
            });

            const status = gradeStats.questions === 250 && 
                          gradeStats.options === 1000 && 
                          gradeStats.correct_answers === 250 ? '✅' : '❌';
            
            console.log(`   Grade ${grade}: ${gradeStats.questions} questions, ${gradeStats.options} options, ${gradeStats.correct_answers} correct ${status}`);
        }

        // Sample a few questions to verify structure
        console.log('\n📝 SAMPLE QUESTION VERIFICATION:');
        const sampleQuestions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.grade, q.question_text, 
                       o.option_text, o.is_correct, o.option_order
                FROM questions q 
                JOIN options o ON q.id = o.question_id 
                WHERE q.id IN (1, 51, 101, 151, 201)
                ORDER BY q.id, o.option_order
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        let currentQuestionId = null;
        sampleQuestions.forEach(row => {
            if (row.id !== currentQuestionId) {
                console.log(`\n   Question ${row.id} (Grade ${row.grade}): ${row.question_text}`);
                currentQuestionId = row.id;
            }
            const marker = row.is_correct ? '✓' : ' ';
            console.log(`     ${marker} ${row.option_order}. ${row.option_text}`);
        });

        console.log('\n🎯 VERIFICATION SUMMARY:');
        console.log('========================');
        
        const allGood = questionsWithoutOptions.length === 0 && 
                       questionsWithWrongOptionCount.length === 0 && 
                       questionsWithoutCorrectAnswer.length === 0 && 
                       questionsWithMultipleCorrect.length === 0;

        if (allGood) {
            console.log('✅ ALL QUESTIONS HAVE PROPER OPTIONS');
            console.log('✅ Every question has exactly 4 options');
            console.log('✅ Every question has exactly 1 correct answer');
            console.log('✅ Database is ready for quiz generation');
        } else {
            console.log('❌ ISSUES FOUND - Need to fix questions/options');
        }

    } catch (error) {
        console.error('❌ Error verifying questions:', error);
    } finally {
        await database.close();
    }
}

verifyQuestionsOptions();