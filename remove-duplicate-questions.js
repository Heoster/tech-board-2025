#!/usr/bin/env node

/**
 * Remove Duplicate Questions from Database
 * Identifies and removes duplicate questions while preserving the best version
 */

const database = require('./server/config/database');

async function removeDuplicateQuestions() {
    console.log('🔍 REMOVING DUPLICATE QUESTIONS FROM DATABASE');
    console.log('=============================================');
    console.log('');

    try {
        await database.connect();
        const db = database.getDb();

        // Step 1: Identify duplicate questions
        console.log('📋 Step 1: Identifying duplicate questions...');
        console.log('─────────────────────────────────────────────');

        const duplicateQuestions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    question_text,
                    grade,
                    difficulty,
                    COUNT(*) as duplicate_count,
                    GROUP_CONCAT(id) as question_ids
                FROM questions 
                GROUP BY LOWER(TRIM(question_text)), grade, difficulty
                HAVING COUNT(*) > 1
                ORDER BY duplicate_count DESC, grade, difficulty
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        if (duplicateQuestions.length === 0) {
            console.log('✅ No duplicate questions found in the database!');
            await database.close();
            return;
        }

        console.log(`⚠️  Found ${duplicateQuestions.length} sets of duplicate questions:`);
        console.log('');

        let totalDuplicates = 0;
        duplicateQuestions.forEach((dup, index) => {
            console.log(`${index + 1}. Grade ${dup.grade} (${dup.difficulty}):`);
            console.log(`   Question: "${dup.question_text.substring(0, 80)}..."`);
            console.log(`   Duplicates: ${dup.duplicate_count} copies`);
            console.log(`   IDs: [${dup.question_ids}]`);
            console.log('');
            totalDuplicates += (dup.duplicate_count - 1); // -1 because we keep one copy
        });

        console.log(`📊 Total duplicate questions to remove: ${totalDuplicates}`);
        console.log('');

        // Step 2: Remove duplicates while preserving the best version
        console.log('🗑️  Step 2: Removing duplicate questions...');
        console.log('──────────────────────────────────────────');

        let removedCount = 0;
        let preservedCount = 0;

        for (const duplicate of duplicateQuestions) {
            const questionIds = duplicate.question_ids.split(',').map(id => parseInt(id.trim()));
            
            // Get detailed information about each duplicate
            const questionDetails = await new Promise((resolve, reject) => {
                db.all(`
                    SELECT 
                        q.id,
                        q.question_text,
                        q.grade,
                        q.difficulty,
                        q.created_at,
                        COUNT(o.id) as option_count,
                        SUM(CASE WHEN o.is_correct = 1 THEN 1 ELSE 0 END) as correct_options,
                        COUNT(r.id) as response_count
                    FROM questions q
                    LEFT JOIN options o ON q.id = o.question_id
                    LEFT JOIN responses r ON q.id = r.question_id
                    WHERE q.id IN (${questionIds.map(() => '?').join(',')})
                    GROUP BY q.id
                    ORDER BY 
                        response_count DESC,  -- Prefer questions with more responses
                        option_count DESC,    -- Prefer questions with more options
                        q.created_at ASC      -- Prefer older questions (first created)
                `, questionIds, (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });

            // Keep the best question (first in sorted order)
            const questionToKeep = questionDetails[0];
            const questionsToRemove = questionDetails.slice(1);

            console.log(`Processing: "${duplicate.question_text.substring(0, 60)}..."`);
            console.log(`  ✅ Keeping: ID ${questionToKeep.id} (${questionToKeep.response_count} responses, ${questionToKeep.option_count} options)`);

            // Remove duplicate questions and their options
            for (const questionToRemove of questionsToRemove) {
                console.log(`  🗑️  Removing: ID ${questionToRemove.id} (${questionToRemove.response_count} responses, ${questionToRemove.option_count} options)`);

                // First, remove associated options
                await new Promise((resolve, reject) => {
                    db.run('DELETE FROM options WHERE question_id = ?', [questionToRemove.id], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });

                // Then, remove the question
                await new Promise((resolve, reject) => {
                    db.run('DELETE FROM questions WHERE id = ?', [questionToRemove.id], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });

                removedCount++;
            }

            preservedCount++;
            console.log('');
        }

        console.log('📊 REMOVAL SUMMARY:');
        console.log('──────────────────');
        console.log(`✅ Questions preserved: ${preservedCount}`);
        console.log(`🗑️  Questions removed: ${removedCount}`);
        console.log(`📉 Total reduction: ${removedCount} duplicate questions`);
        console.log('');

        // Step 3: Verify removal and update statistics
        console.log('🔍 Step 3: Verifying duplicate removal...');
        console.log('─────────────────────────────────────────');

        const remainingDuplicates = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    question_text,
                    grade,
                    difficulty,
                    COUNT(*) as duplicate_count
                FROM questions 
                GROUP BY LOWER(TRIM(question_text)), grade, difficulty
                HAVING COUNT(*) > 1
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        if (remainingDuplicates.length === 0) {
            console.log('✅ SUCCESS: All duplicate questions have been removed!');
        } else {
            console.log(`⚠️  WARNING: ${remainingDuplicates.length} duplicate sets still remain`);
            remainingDuplicates.forEach(dup => {
                console.log(`   - Grade ${dup.grade}: "${dup.question_text.substring(0, 50)}..." (${dup.duplicate_count} copies)`);
            });
        }

        // Step 4: Update database statistics
        console.log('');
        console.log('📊 Step 4: Updated database statistics...');
        console.log('────────────────────────────────────────');

        const finalStats = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    grade,
                    difficulty,
                    COUNT(*) as count
                FROM questions 
                GROUP BY grade, difficulty 
                ORDER BY grade, difficulty
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        const gradeStats = {};
        finalStats.forEach(stat => {
            if (!gradeStats[stat.grade]) {
                gradeStats[stat.grade] = { total: 0, basic: 0, medium: 0, advanced: 0 };
            }
            gradeStats[stat.grade][stat.difficulty] = stat.count;
            gradeStats[stat.grade].total += stat.count;
        });

        Object.keys(gradeStats).sort().forEach(grade => {
            const stats = gradeStats[grade];
            console.log(`   Grade ${grade}: ${stats.total} questions`);
            console.log(`     📗 Basic: ${stats.basic || 0}`);
            console.log(`     📙 Medium: ${stats.medium || 0}`);
            console.log(`     📕 Advanced: ${stats.advanced || 0}`);
        });

        const totalQuestions = Object.values(gradeStats).reduce((sum, stats) => sum + stats.total, 0);
        console.log(`   🎯 TOTAL QUESTIONS: ${totalQuestions}`);

        // Step 5: Log the cleanup operation
        console.log('');
        console.log('📝 Step 5: Logging cleanup operation...');
        console.log('─────────────────────────────────────');

        await new Promise((resolve, reject) => {
            db.run(`
                INSERT INTO admin_logs (action, details, created_at) 
                VALUES (?, ?, CURRENT_TIMESTAMP)
            `, [
                'DUPLICATE_QUESTIONS_REMOVED',
                `Removed ${removedCount} duplicate questions, preserved ${preservedCount} unique questions. Total questions now: ${totalQuestions}`
            ], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        console.log('✅ Cleanup operation logged successfully');

        await database.close();
        console.log('');
        console.log('🎉 DUPLICATE REMOVAL COMPLETE!');
        console.log('==============================');
        console.log(`✅ Removed ${removedCount} duplicate questions`);
        console.log(`✅ Preserved ${preservedCount} unique questions`);
        console.log(`✅ Database now has ${totalQuestions} total questions`);
        console.log(`✅ No duplicate questions remain`);

        process.exit(0);

    } catch (error) {
        console.error('❌ Error removing duplicate questions:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    removeDuplicateQuestions();
}

module.exports = { removeDuplicateQuestions };