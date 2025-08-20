const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'server/database/mcq_system_fixed.db');

async function analyzeAndFixQuestions() {
    console.log('🔍 Analyzing and fixing question issues...\n');

    const db = new sqlite3.Database(dbPath);

    try {
        // 1. Find questions with "Variation" text
        console.log('1. Finding questions with "Variation" text...');
        const variationQuestions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT id, question_text, grade, difficulty 
                FROM questions 
                WHERE question_text LIKE '%Variation%' 
                ORDER BY grade, difficulty
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log(`Found ${variationQuestions.length} questions with "Variation" text`);
        
        if (variationQuestions.length > 0) {
            console.log('Sample variation questions:');
            variationQuestions.slice(0, 5).forEach(q => {
                console.log(`- Grade ${q.grade} (${q.difficulty}): ${q.question_text.substring(0, 80)}...`);
            });
        }

        // 2. Find duplicate questions (same text, different IDs)
        console.log('\n2. Finding duplicate questions...');
        const duplicates = await new Promise((resolve, reject) => {
            db.all(`
                SELECT question_text, grade, difficulty, COUNT(*) as count, GROUP_CONCAT(id) as ids
                FROM questions 
                GROUP BY LOWER(TRIM(question_text)), grade, difficulty
                HAVING COUNT(*) > 1
                ORDER BY count DESC
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log(`Found ${duplicates.length} sets of duplicate questions`);
        
        if (duplicates.length > 0) {
            console.log('Sample duplicates:');
            duplicates.slice(0, 3).forEach(d => {
                console.log(`- "${d.question_text.substring(0, 60)}..." (${d.count} copies, IDs: ${d.ids})`);
            });
        }

        // 3. Fix variation text
        console.log('\n3. Removing "Variation X" text from questions...');
        const fixVariationResult = await new Promise((resolve, reject) => {
            db.run(`
                UPDATE questions 
                SET question_text = TRIM(REGEXP_REPLACE(question_text, ' - Variation \\d+', ''))
                WHERE question_text LIKE '%Variation%'
            `, function(err) {
                if (err) {
                    // Try alternative approach for SQLite
                    db.run(`
                        UPDATE questions 
                        SET question_text = TRIM(
                            REPLACE(
                                REPLACE(
                                    REPLACE(
                                        REPLACE(
                                            REPLACE(
                                                REPLACE(
                                                    REPLACE(
                                                        REPLACE(
                                                            REPLACE(
                                                                REPLACE(question_text, ' - Variation 1', ''),
                                                                ' - Variation 2', ''
                                                            ), ' - Variation 3', ''
                                                        ), ' - Variation 4', ''
                                                    ), ' - Variation 5', ''
                                                ), ' - Variation 6', ''
                                            ), ' - Variation 7', ''
                                        ), ' - Variation 8', ''
                                    ), ' - Variation 9', ''
                                ), ' - Variation 10', ''
                            )
                        )
                        WHERE question_text LIKE '%Variation%'
                    `, function(err2) {
                        if (err2) reject(err2);
                        else resolve(this.changes);
                    });
                } else {
                    resolve(this.changes);
                }
            });
        });

        console.log(`✅ Fixed ${fixVariationResult} questions by removing variation text`);

        // 4. Remove duplicate questions (keep the first one, delete others)
        console.log('\n4. Removing duplicate questions...');
        let totalRemoved = 0;

        for (const duplicate of duplicates) {
            const ids = duplicate.ids.split(',').map(id => parseInt(id));
            const keepId = ids[0]; // Keep the first one
            const removeIds = ids.slice(1); // Remove the rest

            if (removeIds.length > 0) {
                console.log(`Keeping question ID ${keepId}, removing IDs: ${removeIds.join(', ')}`);
                
                // Remove options for duplicate questions first
                for (const removeId of removeIds) {
                    await new Promise((resolve, reject) => {
                        db.run('DELETE FROM options WHERE question_id = ?', [removeId], (err) => {
                            if (err) reject(err);
                            else resolve();
                        });
                    });
                }

                // Remove duplicate questions
                const placeholders = removeIds.map(() => '?').join(',');
                const removed = await new Promise((resolve, reject) => {
                    db.run(`DELETE FROM questions WHERE id IN (${placeholders})`, removeIds, function(err) {
                        if (err) reject(err);
                        else resolve(this.changes);
                    });
                });

                totalRemoved += removed;
            }
        }

        console.log(`✅ Removed ${totalRemoved} duplicate questions`);

        // 5. Final verification
        console.log('\n5. Final verification...');
        const finalStats = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    COUNT(*) as total_questions,
                    COUNT(CASE WHEN question_text LIKE '%Variation%' THEN 1 END) as variation_questions,
                    grade,
                    difficulty
                FROM questions 
                GROUP BY grade, difficulty
                ORDER BY grade, difficulty
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log('\nFinal question counts by grade and difficulty:');
        finalStats.forEach(stat => {
            console.log(`Grade ${stat.grade} (${stat.difficulty}): ${stat.total_questions} questions, ${stat.variation_questions} with variations`);
        });

        // 6. Check for remaining duplicates
        const remainingDuplicates = await new Promise((resolve, reject) => {
            db.all(`
                SELECT question_text, grade, difficulty, COUNT(*) as count
                FROM questions 
                GROUP BY LOWER(TRIM(question_text)), grade, difficulty
                HAVING COUNT(*) > 1
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log(`\n✅ Remaining duplicates: ${remainingDuplicates.length}`);

        if (remainingDuplicates.length > 0) {
            console.log('⚠️  Some duplicates may still exist:');
            remainingDuplicates.slice(0, 3).forEach(d => {
                console.log(`- "${d.question_text.substring(0, 60)}..." (${d.count} copies)`);
            });
        }

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        db.close();
    }
}

// Run the analysis and fixes
analyzeAndFixQuestions();