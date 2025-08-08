const database = require('./server/config/database');

async function analyzeQuestionDetails() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('🔍 ANALYZING QUESTION DETAIL LEVELS');
        console.log('===================================');

        // Get sample questions from each grade to analyze detail level
        const grades = [6, 7, 8, 9, 11];
        
        for (const grade of grades) {
            console.log(`\n📚 GRADE ${grade} QUESTION ANALYSIS:`);
            console.log('─'.repeat(50));
            
            // Get 10 sample questions with their options
            const questions = await new Promise((resolve, reject) => {
                db.all(`
                    SELECT q.id, q.question_text, q.difficulty,
                           o.option_text, o.is_correct, o.option_order
                    FROM questions q 
                    JOIN options o ON q.id = o.question_id 
                    WHERE q.grade = ?
                    ORDER BY q.id, o.option_order
                    LIMIT 40
                `, [grade], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });

            // Group by question
            const groupedQuestions = {};
            questions.forEach(row => {
                if (!groupedQuestions[row.id]) {
                    groupedQuestions[row.id] = {
                        id: row.id,
                        question_text: row.question_text,
                        difficulty: row.difficulty,
                        options: []
                    };
                }
                groupedQuestions[row.id].options.push({
                    text: row.option_text,
                    is_correct: row.is_correct,
                    order: row.option_order
                });
            });

            const uniqueQuestions = Object.values(groupedQuestions).slice(0, 5);
            
            uniqueQuestions.forEach((q, index) => {
                console.log(`\n${index + 1}. ${q.question_text}`);
                console.log(`   Difficulty: ${q.difficulty}`);
                console.log(`   Question Length: ${q.question_text.length} characters`);
                
                // Analyze question complexity
                const complexity = analyzeQuestionComplexity(q.question_text);
                console.log(`   Complexity: ${complexity}`);
                
                q.options.sort((a, b) => a.order - b.order);
                q.options.forEach(opt => {
                    const marker = opt.is_correct ? '✓' : ' ';
                    const letter = String.fromCharCode(64 + opt.order);
                    console.log(`   ${marker} ${letter}. ${opt.text}`);
                });
            });

            // Get question statistics for this grade
            const stats = await new Promise((resolve, reject) => {
                db.all(`
                    SELECT 
                        AVG(LENGTH(question_text)) as avg_length,
                        MIN(LENGTH(question_text)) as min_length,
                        MAX(LENGTH(question_text)) as max_length,
                        COUNT(*) as total_questions
                    FROM questions 
                    WHERE grade = ?
                `, [grade], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows[0]);
                });
            });

            console.log(`\n📊 Grade ${grade} Statistics:`);
            console.log(`   Total Questions: ${stats.total_questions}`);
            console.log(`   Average Question Length: ${Math.round(stats.avg_length)} characters`);
            console.log(`   Shortest Question: ${stats.min_length} characters`);
            console.log(`   Longest Question: ${stats.max_length} characters`);
        }

        // Analyze question types across all grades
        console.log('\n🎯 OVERALL QUESTION TYPE ANALYSIS:');
        console.log('===================================');

        const questionTypes = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    CASE 
                        WHEN question_text LIKE 'What is%' THEN 'Definition'
                        WHEN question_text LIKE 'Which%' THEN 'Selection'
                        WHEN question_text LIKE 'How%' THEN 'Process'
                        WHEN question_text LIKE 'What does%stand for%' THEN 'Acronym'
                        WHEN question_text LIKE '%example%' THEN 'Example'
                        WHEN question_text LIKE '%difference%' THEN 'Comparison'
                        ELSE 'Other'
                    END as question_type,
                    COUNT(*) as count
                FROM questions 
                GROUP BY question_type
                ORDER BY count DESC
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        questionTypes.forEach(type => {
            console.log(`   ${type.question_type}: ${type.count} questions`);
        });

        // Check for detailed vs basic questions
        console.log('\n📝 QUESTION DETAIL LEVEL ASSESSMENT:');
        console.log('====================================');

        const detailLevels = {
            basic: 0,
            intermediate: 0,
            detailed: 0
        };

        const allQuestions = await new Promise((resolve, reject) => {
            db.all('SELECT question_text FROM questions', (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        allQuestions.forEach(q => {
            const complexity = analyzeQuestionComplexity(q.question_text);
            detailLevels[complexity]++;
        });

        console.log(`   Basic Questions: ${detailLevels.basic} (${Math.round(detailLevels.basic/allQuestions.length*100)}%)`);
        console.log(`   Intermediate Questions: ${detailLevels.intermediate} (${Math.round(detailLevels.intermediate/allQuestions.length*100)}%)`);
        console.log(`   Detailed Questions: ${detailLevels.detailed} (${Math.round(detailLevels.detailed/allQuestions.length*100)}%)`);

        // Sample detailed questions if any exist
        const detailedQuestions = allQuestions.filter(q => 
            analyzeQuestionComplexity(q.question_text) === 'detailed'
        ).slice(0, 3);

        if (detailedQuestions.length > 0) {
            console.log('\n📋 SAMPLE DETAILED QUESTIONS:');
            console.log('=============================');
            detailedQuestions.forEach((q, index) => {
                console.log(`${index + 1}. ${q.question_text}`);
            });
        } else {
            console.log('\n⚠️  NO DETAILED QUESTIONS FOUND');
            console.log('===============================');
            console.log('All questions appear to be basic level.');
        }

        console.log('\n🎯 RECOMMENDATION:');
        console.log('==================');
        
        if (detailLevels.detailed < allQuestions.length * 0.1) {
            console.log('❌ The app currently has mostly BASIC questions.');
            console.log('💡 Consider adding more detailed questions that:');
            console.log('   - Test deeper understanding');
            console.log('   - Include scenario-based problems');
            console.log('   - Require application of concepts');
            console.log('   - Have longer, more descriptive questions');
        } else {
            console.log('✅ The app has a good mix of question detail levels.');
        }

    } catch (error) {
        console.error('❌ Error analyzing questions:', error);
    } finally {
        await database.close();
    }
}

function analyzeQuestionComplexity(questionText) {
    const length = questionText.length;
    const words = questionText.split(' ').length;
    
    // Check for complexity indicators
    const complexityIndicators = [
        'scenario', 'situation', 'example', 'following code', 'given that',
        'consider', 'suppose', 'imagine', 'in the context', 'application',
        'implementation', 'algorithm', 'process', 'step by step'
    ];
    
    const hasComplexityIndicators = complexityIndicators.some(indicator => 
        questionText.toLowerCase().includes(indicator)
    );
    
    if (length > 100 || words > 15 || hasComplexityIndicators) {
        return 'detailed';
    } else if (length > 50 || words > 8) {
        return 'intermediate';
    } else {
        return 'basic';
    }
}

analyzeQuestionDetails();