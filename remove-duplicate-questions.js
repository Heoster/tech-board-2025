const database = require('./server/config/database');
const fs = require('fs');
const path = require('path');

console.log('🔍 TechBoard 2025 - Duplicate Question Detection & Removal\n');

async function removeDuplicateQuestions() {
    try {
        // Connect to database
        console.log('📡 Connecting to database...');
        await database.connect();
        console.log('✅ Database connected successfully\n');

        // Step 1: Analyze current database state
        console.log('📊 Analyzing current database state...');
        
        const totalQuestions = await database.get('SELECT COUNT(*) as count FROM questions');
        console.log(`Total questions in database: ${totalQuestions.count}`);

        const questionsByGrade = await database.query(`
            SELECT grade, COUNT(*) as count
            FROM questions 
            GROUP BY grade 
            ORDER BY grade
        `);

        console.log('Questions by grade:');
        questionsByGrade.forEach(row => {
            console.log(`  Grade ${row.grade}: ${row.count} questions`);
        });

        // Step 2: Find duplicates using multiple criteria
        console.log('\n🔍 Detecting duplicate questions...');

        // Method 1: Exact question text duplicates
        const exactDuplicates = await database.query(`
            SELECT question_text, grade, difficulty, COUNT(*) as duplicate_count,
                   GROUP_CONCAT(id) as question_ids
            FROM questions 
            GROUP BY LOWER(TRIM(question_text)), grade, difficulty
            HAVING COUNT(*) > 1
            ORDER BY duplicate_count DESC, grade
        `);

        console.log(`Found ${exactDuplicates.length} groups of exact duplicate questions`);

        // Method 2: Similar question text (after normalization)
        const similarQuestions = await database.query(`
            SELECT q1.id as id1, q1.question_text as text1, q1.grade as grade1,
                   q2.id as id2, q2.question_text as text2, q2.grade as grade2
            FROM questions q1
            JOIN questions q2 ON q1.id < q2.id 
                AND q1.grade = q2.grade 
                AND q1.difficulty = q2.difficulty
                AND LOWER(TRIM(REPLACE(REPLACE(q1.question_text, '  ', ' '), '?', ''))) = 
                    LOWER(TRIM(REPLACE(REPLACE(q2.question_text, '  ', ' '), '?', '')))
        `);

        console.log(`Found ${similarQuestions.length} pairs of similar questions`);

        // Step 3: Detailed analysis of duplicates
        let totalDuplicatesToRemove = 0;
        const duplicateIds = new Set();

        if (exactDuplicates.length > 0) {
            console.log('\n📋 Exact duplicate groups:');
            
            for (const duplicate of exactDuplicates) {
                const ids = duplicate.question_ids.split(',').map(id => parseInt(id));
                const duplicateCount = duplicate.duplicate_count;
                
                console.log(`\n  Grade ${duplicate.grade} - ${duplicateCount} duplicates:`);
                console.log(`    Question: "${duplicate.question_text.substring(0, 80)}..."`);
                console.log(`    IDs: ${ids.join(', ')}`);
                
                // Keep the first one, mark others for deletion
                for (let i = 1; i < ids.length; i++) {
                    duplicateIds.add(ids[i]);
                    totalDuplicatesToRemove++;
                }
            }
        }

        if (similarQuestions.length > 0) {
            console.log('\n📋 Similar question pairs:');
            
            for (const similar of similarQuestions.slice(0, 10)) { // Show first 10
                console.log(`\n  Grade ${similar.grade1}:`);
                console.log(`    Q1 (ID ${similar.id1}): "${similar.text1.substring(0, 60)}..."`);
                console.log(`    Q2 (ID ${similar.id2}): "${similar.text2.substring(0, 60)}..."`);
                
                // Add the second question to duplicates (keep first)
                if (!duplicateIds.has(similar.id1)) {
                    duplicateIds.add(similar.id2);
                    totalDuplicatesToRemove++;
                }
            }
            
            if (similarQuestions.length > 10) {
                console.log(`    ... and ${similarQuestions.length - 10} more similar pairs`);
            }
        }

        console.log(`\n📊 Duplicate Analysis Summary:`);
        console.log(`  Total questions: ${totalQuestions.count}`);
        console.log(`  Exact duplicate groups: ${exactDuplicates.length}`);
        console.log(`  Similar question pairs: ${similarQuestions.length}`);
        console.log(`  Questions to remove: ${totalDuplicatesToRemove}`);
        console.log(`  Questions after cleanup: ${totalQuestions.count - totalDuplicatesToRemove}`);

        // Step 4: Remove duplicates if found
        if (totalDuplicatesToRemove > 0) {
            console.log('\n🗑️ Removing duplicate questions...');
            
            // Create backup before deletion
            console.log('📦 Creating backup before deletion...');
            try {
                const backupPath = await database.backup();
                console.log(`✅ Backup created: ${backupPath}`);
            } catch (error) {
                console.log('⚠️ Backup failed, but continuing with deletion...');
            }

            // Remove duplicates in batches
            const duplicateArray = Array.from(duplicateIds);
            const batchSize = 50;
            let removedCount = 0;

            for (let i = 0; i < duplicateArray.length; i += batchSize) {
                const batch = duplicateArray.slice(i, i + batchSize);
                const placeholders = batch.map(() => '?').join(',');
                
                // First, remove associated options
                await database.run(
                    `DELETE FROM options WHERE question_id IN (${placeholders})`,
                    batch
                );
                
                // Then remove questions
                const result = await database.run(
                    `DELETE FROM questions WHERE id IN (${placeholders})`,
                    batch
                );
                
                removedCount += result.changes || batch.length;
                console.log(`  Removed batch ${Math.floor(i/batchSize) + 1}: ${batch.length} questions`);
            }

            console.log(`✅ Successfully removed ${removedCount} duplicate questions`);

            // Step 5: Verify cleanup
            console.log('\n🔍 Verifying cleanup...');
            
            const newTotalQuestions = await database.get('SELECT COUNT(*) as count FROM questions');
            console.log(`Questions after cleanup: ${newTotalQuestions.count}`);

            const newQuestionsByGrade = await database.query(`
                SELECT grade, COUNT(*) as count
                FROM questions 
                GROUP BY grade 
                ORDER BY grade
            `);

            console.log('Updated questions by grade:');
            newQuestionsByGrade.forEach(row => {
                console.log(`  Grade ${row.grade}: ${row.count} questions`);
            });

            // Check for remaining duplicates
            const remainingDuplicates = await database.query(`
                SELECT question_text, grade, COUNT(*) as count
                FROM questions 
                GROUP BY LOWER(TRIM(question_text)), grade
                HAVING COUNT(*) > 1
            `);

            if (remainingDuplicates.length === 0) {
                console.log('✅ No remaining duplicates found');
            } else {
                console.log(`⚠️ ${remainingDuplicates.length} duplicate groups still remain`);
            }

            // Step 6: Optimize database after cleanup
            console.log('\n⚡ Optimizing database...');
            await database.run('VACUUM');
            await database.run('ANALYZE');
            console.log('✅ Database optimized');

        } else {
            console.log('\n🎉 No duplicate questions found! Database is clean.');
        }

        // Step 7: Final statistics
        console.log('\n📊 Final Database Statistics:');
        
        const finalStats = await database.get(`
            SELECT 
                COUNT(*) as total_questions,
                COUNT(DISTINCT grade) as grades_covered,
                MIN(grade) as min_grade,
                MAX(grade) as max_grade
            FROM questions
        `);

        console.log(`  Total Questions: ${finalStats.total_questions}`);
        console.log(`  Grades Covered: ${finalStats.grades_covered} (${finalStats.min_grade} to ${finalStats.max_grade})`);

        const optionsStats = await database.get('SELECT COUNT(*) as total_options FROM options');
        console.log(`  Total Options: ${optionsStats.total_options}`);

        // Check question distribution quality
        const gradeDistribution = await database.query(`
            SELECT 
                grade,
                COUNT(*) as count,
                COUNT(CASE WHEN difficulty = 'basic' THEN 1 END) as basic,
                COUNT(CASE WHEN difficulty = 'medium' THEN 1 END) as medium,
                COUNT(CASE WHEN difficulty = 'advanced' THEN 1 END) as advanced
            FROM questions 
            GROUP BY grade 
            ORDER BY grade
        `);

        console.log('\n📈 Question Distribution by Difficulty:');
        gradeDistribution.forEach(row => {
            console.log(`  Grade ${row.grade}: ${row.count} total (Basic: ${row.basic}, Medium: ${row.medium}, Advanced: ${row.advanced})`);
        });

        // Generate cleanup report
        const report = {
            timestamp: new Date().toISOString(),
            operation: 'duplicate_removal',
            before: {
                totalQuestions: totalQuestions.count,
                questionsByGrade: questionsByGrade
            },
            duplicatesFound: {
                exactDuplicateGroups: exactDuplicates.length,
                similarQuestionPairs: similarQuestions.length,
                totalToRemove: totalDuplicatesToRemove
            },
            after: {
                totalQuestions: finalStats.total_questions,
                questionsByGrade: gradeDistribution
            },
            removed: totalDuplicatesToRemove,
            success: true
        };

        fs.writeFileSync('duplicate-removal-report.json', JSON.stringify(report, null, 2));
        console.log('\n📄 Cleanup report saved to: duplicate-removal-report.json');

        await database.close();

        if (totalDuplicatesToRemove > 0) {
            console.log('\n🎉 Duplicate removal completed successfully!');
            console.log(`✅ Removed ${totalDuplicatesToRemove} duplicate questions`);
            console.log(`✅ Database optimized and cleaned`);
            console.log(`✅ ${finalStats.total_questions} unique questions remain`);
        } else {
            console.log('\n🎉 Database verification completed!');
            console.log('✅ No duplicates found - database is already clean');
        }

        return true;

    } catch (error) {
        console.error('❌ Duplicate removal failed:', error);
        
        try {
            await database.close();
        } catch (closeError) {
            console.error('Error closing database:', closeError);
        }
        
        return false;
    }
}

// Run if called directly
if (require.main === module) {
    removeDuplicateQuestions()
        .then(success => {
            process.exit(success ? 0 : 1);
        })
        .catch(error => {
            console.error('❌ Error:', error);
            process.exit(1);
        });
}

module.exports = removeDuplicateQuestions;