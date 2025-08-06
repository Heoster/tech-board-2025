require('dotenv').config();
const database = require('../config/database');

/**
 * VERIFY 250+ QUESTIONS PER GRADE
 * 
 * This script verifies that each grade has at least 250 questions
 * to support multiple quiz generations without duplicates.
 */

async function verify250Questions() {
    console.log('🔍 VERIFYING 250+ QUESTIONS PER GRADE');
    console.log('=====================================');
    
    try {
        await database.connect();
        const db = database.getDb();
        
        const grades = [6, 7, 8, 9, 11];
        let allGradesValid = true;
        
        for (const grade of grades) {
            console.log(`\n📊 Grade ${grade} Analysis:`);
            
            // Count total questions
            const totalCount = await new Promise((resolve, reject) => {
                db.get(
                    'SELECT COUNT(*) as count FROM questions WHERE grade = ?',
                    [grade],
                    (err, row) => {
                        if (err) reject(err);
                        else resolve(row.count);
                    }
                );
            });
            
            // Count by difficulty
            const difficultyBreakdown = await new Promise((resolve, reject) => {
                db.all(`
                    SELECT difficulty, COUNT(*) as count 
                    FROM questions 
                    WHERE grade = ? 
                    GROUP BY difficulty
                `, [grade], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });
            
            console.log(`   Total Questions: ${totalCount}`);
            
            const breakdown = {};
            for (const row of difficultyBreakdown) {
                breakdown[row.difficulty] = row.count;
                console.log(`   ${row.difficulty}: ${row.count} questions`);
            }
            
            // Check if meets minimum requirement
            if (totalCount >= 250) {
                console.log(`   ✅ PASSED: ${totalCount} questions (≥250 required)`);
            } else {
                console.log(`   ❌ FAILED: ${totalCount} questions (<250 required)`);
                console.log(`   📝 Need ${250 - totalCount} more questions`);
                allGradesValid = false;
            }
            
            // Check distribution (should be roughly 60% basic, 30% medium, 10% advanced)
            const basicTarget = Math.floor(totalCount * 0.6);
            const mediumTarget = Math.floor(totalCount * 0.3);
            const advancedTarget = totalCount - basicTarget - mediumTarget;
            
            console.log(`   📋 Distribution Analysis:`);
            console.log(`      Basic: ${breakdown.basic || 0}/${basicTarget} (target)`);
            console.log(`      Medium: ${breakdown.medium || 0}/${mediumTarget} (target)`);
            console.log(`      Advanced: ${breakdown.advanced || 0}/${advancedTarget} (target)`);
        }
        
        console.log('\n' + '='.repeat(50));
        if (allGradesValid) {
            console.log('✅ ALL GRADES HAVE SUFFICIENT QUESTIONS');
            console.log('   Ready for multiple quiz generations');
            console.log('   No duplicates will occur');
        } else {
            console.log('❌ SOME GRADES NEED MORE QUESTIONS');
            console.log('   Run seeding scripts to add more questions');
            console.log('   Recommended: npm run seed:complete');
        }
        console.log('='.repeat(50));
        
    } catch (error) {
        console.error('❌ Error verifying questions:', error);
    } finally {
        await database.close();
    }
}

// Run verification if this file is executed directly
if (require.main === module) {
    verify250Questions();
}

module.exports = verify250Questions;