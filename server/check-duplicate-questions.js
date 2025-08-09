const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database path
const dbPath = path.join(__dirname, '..', 'database', 'mcq_system.db');

// Connect to database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return;
    }
    console.log('✅ Connected to SQLite database');
    console.log('🔍 Checking for duplicate questions...\n');
    
    // Check for duplicates
    checkDuplicateQuestions();
});

async function checkDuplicateQuestions() {
    try {
        console.log('📊 ANALYZING DUPLICATE QUESTIONS');
        console.log('='.repeat(60));

        // Find duplicate questions by question_text
        const duplicates = await queryDatabase(`
            SELECT 
                question_text,
                COUNT(*) as count,
                GROUP_CONCAT(id) as question_ids,
                GROUP_CONCAT(grade) as grades,
                GROUP_CONCAT(difficulty) as difficulties
            FROM questions 
            GROUP BY question_text 
            HAVING COUNT(*) > 1
            ORDER BY count DESC
        `);

        if (duplicates.length === 0) {
            console.log('✅ No duplicate questions found!');
            console.log('🎉 Database is clean from duplicates.');
        } else {
            console.log(`❌ Found ${duplicates.length} sets of duplicate questions:`);
            console.log('');

            let totalDuplicates = 0;
            let questionsToDelete = [];

            duplicates.forEach((duplicate, index) => {
                const questionIds = duplicate.question_ids.split(',').map(id => parseInt(id));
                const grades = duplicate.grades.split(',');
                const difficulties = duplicate.difficulties.split(',');
                
                console.log(`${index + 1}. Question: "${duplicate.question_text}"`);
                console.log(`   Count: ${duplicate.count} duplicates`);
                console.log(`   IDs: ${questionIds.join(', ')}`);
                console.log(`   Grades: ${grades.join(', ')}`);
                console.log(`   Difficulties: ${difficulties.join(', ')}`);
                console.log('');

                // Keep the first question (lowest ID) and mark others for deletion
                const sortedIds = questionIds.sort((a, b) => a - b);
                const keepId = sortedIds[0];
                const deleteIds = sortedIds.slice(1);
                
                console.log(`   ✅ Keeping ID: ${keepId}`);
                console.log(`   🗑️  Deleting IDs: ${deleteIds.join(', ')}`);
                console.log('');

                totalDuplicates += deleteIds.length;
                questionsToDelete.push(...deleteIds);
            });

            console.log(`📊 SUMMARY:`);
            console.log(`   Total duplicate sets: ${duplicates.length}`);
            console.log(`   Total questions to delete: ${totalDuplicates}`);
            console.log('');

            // Ask for confirmation
            console.log('⚠️  WARNING: This will permanently delete duplicate questions!');
            console.log('   The script will keep the question with the lowest ID and delete the rest.');
            console.log('   This action cannot be undone.');
            console.log('');

            // Delete duplicates
            await deleteDuplicateQuestions(questionsToDelete);
        }

        // Show final statistics
        await showFinalStatistics();

    } catch (error) {
        console.error('Error checking duplicates:', error);
    } finally {
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('\n✅ Database connection closed');
            }
        });
    }
}

async function deleteDuplicateQuestions(questionIds) {
    if (questionIds.length === 0) {
        console.log('No questions to delete.');
        return;
    }

    console.log('🗑️  DELETING DUPLICATE QUESTIONS');
    console.log('='.repeat(60));

    try {
        // Start transaction
        await queryDatabase('BEGIN TRANSACTION');

        let deletedCount = 0;
        let optionsDeletedCount = 0;

        for (const questionId of questionIds) {
            // First, delete all options for this question
            const optionsResult = await queryDatabase(
                'DELETE FROM options WHERE question_id = ?',
                [questionId]
            );
            
            // Then delete the question
            const questionResult = await queryDatabase(
                'DELETE FROM questions WHERE id = ?',
                [questionId]
            );

            if (questionResult.changes > 0) {
                deletedCount++;
                console.log(`✅ Deleted question ID ${questionId} and its options`);
            }
        }

        // Commit transaction
        await queryDatabase('COMMIT');

        console.log('');
        console.log(`🎉 SUCCESS: Deleted ${deletedCount} duplicate questions`);
        console.log(`   Options were automatically deleted due to CASCADE constraint`);

    } catch (error) {
        // Rollback on error
        await queryDatabase('ROLLBACK');
        console.error('❌ Error deleting duplicates:', error.message);
        throw error;
    }
}

async function showFinalStatistics() {
    console.log('\n📊 FINAL DATABASE STATISTICS');
    console.log('='.repeat(60));

    try {
        // Total questions
        const totalQuestions = await queryDatabase("SELECT COUNT(*) as count FROM questions");
        console.log(`📚 Total Questions: ${totalQuestions[0].count}`);

        // Questions by grade
        const questionsByGrade = await queryDatabase(`
            SELECT grade, COUNT(*) as count 
            FROM questions 
            GROUP BY grade 
            ORDER BY grade
        `);
        console.log('\n📚 Questions by Grade:');
        questionsByGrade.forEach(row => {
            console.log(`   Grade ${row.grade}: ${row.count} questions`);
        });

        // Questions by difficulty
        const questionsByDifficulty = await queryDatabase(`
            SELECT difficulty, COUNT(*) as count 
            FROM questions 
            GROUP BY difficulty 
            ORDER BY difficulty
        `);
        console.log('\n📊 Questions by Difficulty:');
        questionsByDifficulty.forEach(row => {
            console.log(`   ${row.difficulty}: ${row.count} questions`);
        });

        // Total options
        const totalOptions = await queryDatabase("SELECT COUNT(*) as count FROM options");
        console.log(`\n🔘 Total Options: ${totalOptions[0].count}`);

        // Verify no duplicates remain
        const remainingDuplicates = await queryDatabase(`
            SELECT COUNT(*) as count
            FROM (
                SELECT question_text
                FROM questions 
                GROUP BY question_text 
                HAVING COUNT(*) > 1
            ) as duplicates
        `);
        
        if (remainingDuplicates[0].count === 0) {
            console.log('\n✅ VERIFICATION: No duplicate questions remain in database');
        } else {
            console.log(`\n❌ WARNING: ${remainingDuplicates[0].count} sets of duplicates still exist`);
        }

    } catch (error) {
        console.error('Error generating final statistics:', error.message);
    }
}

function queryDatabase(sql, params = []) {
    return new Promise((resolve, reject) => {
        if (sql.trim().toUpperCase().startsWith('DELETE') || 
            sql.trim().toUpperCase().startsWith('BEGIN') || 
            sql.trim().toUpperCase().startsWith('COMMIT') || 
            sql.trim().toUpperCase().startsWith('ROLLBACK')) {
            // For write operations
            db.run(sql, params, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes, lastID: this.lastID });
                }
            });
        } else {
            // For read operations
            db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        }
    });
}
