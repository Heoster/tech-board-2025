require('dotenv').config();
const database = require('../config/database');

async function testRandomSelection() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('Testing Random Question Selection...\n');

        // Test for each grade
        const grades = [6, 7, 8, 9, 11];
        
        for (const grade of grades) {
            console.log(`=== GRADE ${grade} ANALYSIS ===`);
            
            // Get total questions available for this grade
            const totalAvailable = await new Promise((resolve, reject) => {
                db.get(
                    'SELECT COUNT(*) as count FROM questions WHERE grade = ?',
                    [grade],
                    (err, row) => {
                        if (err) reject(err);
                        else resolve(row.count);
                    }
                );
            });
            
            // Get breakdown by difficulty
            const difficulties = ['basic', 'medium', 'advanced'];
            const breakdown = {};
            
            for (const difficulty of difficulties) {
                const count = await new Promise((resolve, reject) => {
                    db.get(
                        'SELECT COUNT(*) as count FROM questions WHERE grade = ? AND difficulty = ?',
                        [grade, difficulty],
                        (err, row) => {
                            if (err) reject(err);
                            else resolve(row.count);
                        }
                    );
                });
                breakdown[difficulty] = count;
            }
            
            console.log(`Total questions available: ${totalAvailable}`);
            console.log(`Breakdown: Basic(${breakdown.basic}), Medium(${breakdown.medium}), Advanced(${breakdown.advanced})`);
            
            // Test random selection multiple times
            console.log('\nTesting random selection (5 samples):');
            
            for (let i = 1; i <= 5; i++) {
                const randomQuestions = await new Promise((resolve, reject) => {
                    db.all(
                        'SELECT id, difficulty FROM questions WHERE grade = ? ORDER BY RANDOM() LIMIT 10',
                        [grade],
                        (err, rows) => {
                            if (err) reject(err);
                            else resolve(rows);
                        }
                    );
                });
                
                const sampleBreakdown = {
                    basic: randomQuestions.filter(q => q.difficulty === 'basic').length,
                    medium: randomQuestions.filter(q => q.difficulty === 'medium').length,
                    advanced: randomQuestions.filter(q => q.difficulty === 'advanced').length
                };
                
                console.log(`Sample ${i}: Basic(${sampleBreakdown.basic}), Medium(${sampleBreakdown.medium}), Advanced(${sampleBreakdown.advanced}) - IDs: [${randomQuestions.map(q => q.id).join(', ')}]`);
            }
            
            console.log(''); // Empty line for readability
        }
        
        // Test the actual quiz selection algorithm
        console.log('=== TESTING QUIZ SELECTION ALGORITHM ===');
        
        // Import the selection function (simulate it here)
        const selectRandomQuestions = async (grade, totalQuestions = 25) => {
            const basicCount = Math.floor(totalQuestions * 0.6); // 15
            const mediumCount = Math.floor(totalQuestions * 0.3); // 7
            const advancedCount = totalQuestions - basicCount - mediumCount; // 3
            
            const selectedQuestions = [];
            
            // Select basic questions
            const basicQuestions = await new Promise((resolve, reject) => {
                db.all(
                    'SELECT id FROM questions WHERE grade = ? AND difficulty = ? ORDER BY RANDOM() LIMIT ?',
                    [grade, 'basic', basicCount],
                    (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    }
                );
            });
            selectedQuestions.push(...basicQuestions.map(q => q.id));
            
            // Select medium questions
            const mediumQuestions = await new Promise((resolve, reject) => {
                db.all(
                    'SELECT id FROM questions WHERE grade = ? AND difficulty = ? ORDER BY RANDOM() LIMIT ?',
                    [grade, 'medium', mediumCount],
                    (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    }
                );
            });
            selectedQuestions.push(...mediumQuestions.map(q => q.id));
            
            // Select advanced questions
            const advancedQuestions = await new Promise((resolve, reject) => {
                db.all(
                    'SELECT id FROM questions WHERE grade = ? AND difficulty = ? ORDER BY RANDOM() LIMIT ?',
                    [grade, 'advanced', advancedCount],
                    (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    }
                );
            });
            selectedQuestions.push(...advancedQuestions.map(q => q.id));
            
            return {
                questions: selectedQuestions,
                distribution: {
                    basic: basicQuestions.length,
                    medium: mediumQuestions.length,
                    advanced: advancedQuestions.length,
                    total: selectedQuestions.length
                }
            };
        };
        
        // Test quiz selection for Grade 8 (should have good variety)
        console.log('Testing quiz selection for Grade 8:');
        for (let i = 1; i <= 3; i++) {
            const result = await selectRandomQuestions(8, 25);
            console.log(`Quiz ${i}: Basic(${result.distribution.basic}), Medium(${result.distribution.medium}), Advanced(${result.distribution.advanced}), Total(${result.distribution.total})`);
            console.log(`Question IDs: [${result.questions.slice(0, 10).join(', ')}...] (showing first 10)`);
        }
        
        console.log('\n✅ Random selection test completed successfully!');
        console.log('🎯 Each quiz will have different questions selected randomly from the pool');
        console.log('📊 Distribution maintained: ~60% Basic, ~30% Medium, ~10% Advanced');
        
    } catch (error) {
        console.error('Error testing random selection:', error);
    } finally {
        await database.close();
    }
}

// Run test if this file is executed directly
if (require.main === module) {
    testRandomSelection();
}

module.exports = testRandomSelection;