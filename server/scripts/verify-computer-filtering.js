const database = require('../config/database');

async function verifyComputerFiltering() {
    try {
        console.log('🔄 Connecting to database...');
        await database.connect();
        const db = database.getDb();
        
        console.log('💻 Verifying computer topic filtering...\n');
        
        // Check total questions vs computer questions by grade
        console.log('📊 Computer Questions Analysis by Grade:');
        console.log('=========================================');
        
        const grades = [6, 7, 8, 9, 11];
        
        for (const grade of grades) {
            // Total questions for grade
            const totalQuestions = await new Promise((resolve, reject) => {
                db.get(
                    'SELECT COUNT(*) as count FROM questions WHERE grade = ?',
                    [grade],
                    (err, row) => {
                        if (err) reject(err);
                        else resolve(row.count);
                    }
                );
            });
            
            // Computer questions for grade
            const computerQuestions = await new Promise((resolve, reject) => {
                db.get(
                    'SELECT COUNT(*) as count FROM questions WHERE grade = ? AND topic = \'computer\'',
                    [grade],
                    (err, row) => {
                        if (err) reject(err);
                        else resolve(row.count);
                    }
                );
            });
            
            // Non-computer questions
            const nonComputerQuestions = totalQuestions - computerQuestions;
            const computerPercentage = totalQuestions > 0 ? ((computerQuestions / totalQuestions) * 100).toFixed(1) : '0.0';
            
            console.log(`Grade ${grade}:`);
            console.log(`  Total Questions:    ${totalQuestions}`);
            console.log(`  Computer Questions: ${computerQuestions} (${computerPercentage}%)`);
            console.log(`  Non-Computer:       ${nonComputerQuestions}`);
            console.log(`  Possible Tests:     ${Math.floor(computerQuestions / 25)}`);
            console.log('');
        }
        
        // Check computer question categories
        console.log('📋 Computer Question Categories:');
        console.log('=================================');
        
        const categories = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    grade,
                    category,
                    COUNT(*) as count
                FROM questions 
                WHERE topic = 'computer'
                GROUP BY grade, category
                ORDER BY grade, category
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        let currentGrade = null;
        categories.forEach(cat => {
            if (cat.grade !== currentGrade) {
                if (currentGrade !== null) console.log('');
                console.log(`Grade ${cat.grade}:`);
                currentGrade = cat.grade;
            }
            console.log(`  ${cat.category.padEnd(20)}: ${cat.count} questions`);
        });
        
        // Sample some computer questions to verify content
        console.log('\n🔍 Sample Computer Questions Verification:');
        console.log('===========================================');
        
        const sampleQuestions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT grade, difficulty, category, question_text
                FROM questions 
                WHERE topic = 'computer'
                ORDER BY RANDOM()
                LIMIT 10
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        sampleQuestions.forEach((q, index) => {
            console.log(`${index + 1}. Grade ${q.grade} (${q.difficulty}) - ${q.category}:`);
            console.log(`   ${q.question_text.substring(0, 100)}...`);
            console.log('');
        });
        
        // Check if any non-computer questions exist
        const nonComputerTotal = await new Promise((resolve, reject) => {
            db.get(
                'SELECT COUNT(*) as count FROM questions WHERE topic != \'computer\' OR topic IS NULL',
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                }
            );
        });
        
        console.log('🚨 Non-Computer Questions Check:');
        console.log('=================================');
        if (nonComputerTotal > 0) {
            console.log(`⚠️  WARNING: Found ${nonComputerTotal} non-computer questions!`);
            
            // Show sample non-computer questions
            const nonComputerSamples = await new Promise((resolve, reject) => {
                db.all(`
                    SELECT grade, difficulty, topic, question_text
                    FROM questions 
                    WHERE topic != 'computer' OR topic IS NULL
                    LIMIT 5
                `, (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });
            
            console.log('Sample non-computer questions:');
            nonComputerSamples.forEach((q, index) => {
                console.log(`${index + 1}. Grade ${q.grade} (${q.difficulty}) - Topic: ${q.topic || 'NULL'}:`);
                console.log(`   ${q.question_text.substring(0, 100)}...`);
            });
        } else {
            console.log('✅ All questions are properly marked as computer-related!');
        }
        
        // Test the filtering in quiz selection
        console.log('\n🧪 Testing Quiz Selection Filtering:');
        console.log('====================================');
        
        for (const testGrade of [6, 8, 11]) {
            try {
                // Simulate the filtering logic
                const availableComputer = await new Promise((resolve, reject) => {
                    db.get(
                        'SELECT COUNT(*) as count FROM questions WHERE grade = ? AND topic = \'computer\'',
                        [testGrade],
                        (err, row) => {
                            if (err) reject(err);
                            else resolve(row.count);
                        }
                    );
                });
                
                const canCreateTests = Math.floor(availableComputer / 25);
                console.log(`Grade ${testGrade}: ${availableComputer} computer questions → ${canCreateTests} possible tests`);
                
                if (canCreateTests === 0) {
                    console.log(`  ⚠️  WARNING: Cannot create any tests for Grade ${testGrade}!`);
                }
            } catch (error) {
                console.log(`  ❌ Error testing Grade ${testGrade}: ${error.message}`);
            }
        }
        
    } catch (error) {
        console.error('❌ Error verifying computer filtering:', error);
        throw error;
    } finally {
        console.log('\n🔒 Closing database connection...');
        await database.close();
    }
}

// Run the verification
if (require.main === module) {
    verifyComputerFiltering()
        .then(() => {
            console.log('\n🎉 Computer filtering verification completed!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Failed to verify computer filtering:', error);
            process.exit(1);
        });
}

module.exports = verifyComputerFiltering;