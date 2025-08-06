const database = require('./server/config/database');

// Test the quiz selection to ensure no duplicates
async function testQuizSelection() {
    try {
        await database.connect();
        const db = database.getDb();
        
        console.log('🧪 Testing quiz selection for duplicates...');
        
        // Simulate selecting questions for a quiz
        const grade = 11;
        const totalQuestions = 25;
        
        // Get all available questions for Grade 11
        const allQuestions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT id, question_text, difficulty
                FROM questions 
                WHERE grade = ?
                ORDER BY RANDOM()
            `, [grade], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        console.log(`📊 Total Grade ${grade} questions available: ${allQuestions.length}`);
        
        // Select 25 questions
        const selectedQuestions = allQuestions.slice(0, totalQuestions);
        const selectedIds = selectedQuestions.map(q => q.id);
        
        // Check for duplicates
        const uniqueIds = [...new Set(selectedIds)];
        
        console.log(`🎯 Selected ${selectedIds.length} questions`);
        console.log(`🔒 Unique questions: ${uniqueIds.length}`);
        
        if (uniqueIds.length !== selectedIds.length) {
            console.error('❌ DUPLICATES FOUND!');
            const duplicates = selectedIds.filter((id, index) => selectedIds.indexOf(id) !== index);
            console.error(`Duplicate IDs: ${duplicates.join(', ')}`);
        } else {
            console.log('✅ No duplicates found in selection');
        }
        
        // Check difficulty distribution
        const difficultyCount = { basic: 0, medium: 0, advanced: 0 };
        selectedQuestions.forEach(q => {
            difficultyCount[q.difficulty]++;
        });
        
        console.log('📈 Difficulty distribution:');
        console.log(`   Basic: ${difficultyCount.basic} (${((difficultyCount.basic/totalQuestions)*100).toFixed(1)}%)`);
        console.log(`   Medium: ${difficultyCount.medium} (${((difficultyCount.medium/totalQuestions)*100).toFixed(1)}%)`);
        console.log(`   Advanced: ${difficultyCount.advanced} (${((difficultyCount.advanced/totalQuestions)*100).toFixed(1)}%)`);
        
        // Test multiple quiz generations to ensure uniqueness
        console.log('\n🔄 Testing multiple quiz generations...');
        const quizSets = [];
        
        for (let i = 0; i < 3; i++) {
            const quizQuestions = await new Promise((resolve, reject) => {
                db.all(`
                    SELECT id
                    FROM questions 
                    WHERE grade = ?
                    ORDER BY RANDOM()
                    LIMIT ?
                `, [grade, totalQuestions], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows.map(r => r.id));
                });
            });
            
            quizSets.push(quizQuestions);
            console.log(`   Quiz ${i+1}: [${quizQuestions.slice(0, 5).join(', ')}...] (${quizQuestions.length} questions)`);
            
            // Check for duplicates within this quiz
            const uniqueInQuiz = [...new Set(quizQuestions)];
            if (uniqueInQuiz.length !== quizQuestions.length) {
                console.error(`   ❌ Quiz ${i+1} has duplicates!`);
            } else {
                console.log(`   ✅ Quiz ${i+1} has no duplicates`);
            }
        }
        
        // Check if quizzes are different from each other
        const quiz1Set = new Set(quizSets[0]);
        const quiz2Set = new Set(quizSets[1]);
        const quiz3Set = new Set(quizSets[2]);
        
        const overlap12 = [...quiz1Set].filter(id => quiz2Set.has(id)).length;
        const overlap13 = [...quiz1Set].filter(id => quiz3Set.has(id)).length;
        const overlap23 = [...quiz2Set].filter(id => quiz3Set.has(id)).length;
        
        console.log('\n🔀 Quiz uniqueness:');
        console.log(`   Quiz 1 & 2 overlap: ${overlap12} questions (${((overlap12/totalQuestions)*100).toFixed(1)}%)`);
        console.log(`   Quiz 1 & 3 overlap: ${overlap13} questions (${((overlap13/totalQuestions)*100).toFixed(1)}%)`);
        console.log(`   Quiz 2 & 3 overlap: ${overlap23} questions (${((overlap23/totalQuestions)*100).toFixed(1)}%)`);
        
        if (overlap12 < totalQuestions && overlap13 < totalQuestions && overlap23 < totalQuestions) {
            console.log('✅ Quizzes are sufficiently different');
        } else {
            console.log('⚠️  Quizzes may be too similar');
        }
        
        process.exit(0);
        
    } catch (error) {
        console.error('❌ Error testing quiz selection:', error);
        process.exit(1);
    }
}

testQuizSelection();