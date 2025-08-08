const database = require('../config/database');

function isDetailedQuestion(questionText) {
    const length = questionText.length;
    const words = questionText.split(' ').length;
    
    // Check for complexity indicators that make a question "detailed"
    const detailedIndicators = [
        'scenario', 'situation', 'example', 'following code', 'given that',
        'consider', 'suppose', 'imagine', 'in the context', 'application',
        'implementation', 'algorithm', 'process', 'step by step', 'procedure',
        'complexity', 'efficiency', 'optimization', 'best practice',
        'time complexity', 'space complexity', 'sorting algorithm',
        'data structure', 'follows LIFO', 'follows FIFO',
        'artificial intelligence', 'machine learning', 'neural networks',
        'blockchain technology', 'distributed ledger', 'IoT devices',
        'secure web browsing', 'protocol is used', 'binary representation'
    ];
    
    const hasDetailedIndicators = detailedIndicators.some(indicator => 
        questionText.toLowerCase().includes(indicator)
    );
    
    // Consider detailed if:
    // 1. Has complexity indicators
    // 2. Very long questions (>80 characters)
    // 3. Many words (>12 words)
    return hasDetailedIndicators || length > 80 || words > 12;
}

async function removeDetailedQuestions() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('🔍 IDENTIFYING AND REMOVING DETAILED QUESTIONS');
        console.log('===============================================');

        // First, identify all detailed questions
        const allQuestions = await new Promise((resolve, reject) => {
            db.all('SELECT id, grade, question_text FROM questions ORDER BY grade, id', (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log(`📊 Total questions in database: ${allQuestions.length}`);

        // Identify detailed questions
        const detailedQuestions = allQuestions.filter(q => isDetailedQuestion(q.question_text));
        const basicQuestions = allQuestions.filter(q => !isDetailedQuestion(q.question_text));

        console.log(`📋 Detailed questions found: ${detailedQuestions.length}`);
        console.log(`📋 Basic questions remaining: ${basicQuestions.length}`);

        if (detailedQuestions.length === 0) {
            console.log('✅ No detailed questions found. Database already contains only basic questions.');
            return;
        }

        // Show detailed questions that will be removed
        console.log('\n🗑️  DETAILED QUESTIONS TO BE REMOVED:');
        console.log('====================================');
        
        detailedQuestions.forEach((q, index) => {
            console.log(`${index + 1}. [Grade ${q.grade}] ${q.question_text}`);
            console.log(`   Length: ${q.question_text.length} characters`);
            console.log(`   Words: ${q.question_text.split(' ').length} words`);
            console.log('');
        });

        // Remove detailed questions and their options
        console.log('🗑️  Removing detailed questions...');
        
        const detailedQuestionIds = detailedQuestions.map(q => q.id);
        
        if (detailedQuestionIds.length > 0) {
            // Remove options first (foreign key constraint)
            const optionsPlaceholders = detailedQuestionIds.map(() => '?').join(',');
            await new Promise((resolve, reject) => {
                db.run(
                    `DELETE FROM options WHERE question_id IN (${optionsPlaceholders})`,
                    detailedQuestionIds,
                    (err) => {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });

            // Remove questions
            await new Promise((resolve, reject) => {
                db.run(
                    `DELETE FROM questions WHERE id IN (${optionsPlaceholders})`,
                    detailedQuestionIds,
                    (err) => {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });

            console.log(`✅ Removed ${detailedQuestions.length} detailed questions and their options`);
        }

        // Verify final counts by grade
        console.log('\n📊 FINAL QUESTION COUNTS BY GRADE:');
        console.log('===================================');
        
        const grades = [6, 7, 8, 9, 11];
        let totalRemaining = 0;
        
        for (const grade of grades) {
            const count = await new Promise((resolve, reject) => {
                db.get(
                    'SELECT COUNT(*) as count FROM questions WHERE grade = ?',
                    [grade],
                    (err, row) => {
                        if (err) reject(err);
                        else resolve(row.count);
                    }
                );
            });
            
            console.log(`   Grade ${grade}: ${count} questions`);
            totalRemaining += count;
        }

        console.log(`\n📊 Total questions remaining: ${totalRemaining}`);
        console.log(`📊 Questions removed: ${allQuestions.length - totalRemaining}`);

        // Show sample remaining questions to verify they are basic
        console.log('\n📝 SAMPLE REMAINING QUESTIONS (BASIC ONLY):');
        console.log('===========================================');
        
        const sampleQuestions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT grade, question_text 
                FROM questions 
                ORDER BY RANDOM() 
                LIMIT 10
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        sampleQuestions.forEach((q, index) => {
            console.log(`${index + 1}. [Grade ${q.grade}] ${q.question_text}`);
            console.log(`   Length: ${q.question_text.length} characters`);
            console.log(`   Complexity: ${isDetailedQuestion(q.question_text) ? 'DETAILED' : 'BASIC'}`);
            console.log('');
        });

        console.log('🎉 DETAILED QUESTIONS REMOVAL COMPLETE!');
        console.log('========================================');
        console.log('✅ All remaining questions are BASIC level');
        console.log('✅ Questions are simple and easy to understand');
        console.log('✅ No complex scenarios or detailed explanations');
        console.log('✅ Perfect for TECH BOARD 2025 basic assessment');

    } catch (error) {
        console.error('❌ Error removing detailed questions:', error);
    } finally {
        await database.close();
    }
}

// Run the removal
removeDetailedQuestions();