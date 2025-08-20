const database = require('./server/config/database');

async function removeDuplicateQuestions() {
    try {
        await database.connect();
        const db = database.getDb();
        
        console.log('Removing duplicate questions...');
        
        // Find and remove duplicate questions (keep the one with lowest ID)
        const duplicates = await new Promise((resolve, reject) => {
            db.all(`
                SELECT grade, question_text, difficulty, MIN(id) as keep_id, GROUP_CONCAT(id) as all_ids, COUNT(*) as count
                FROM questions 
                GROUP BY grade, question_text, difficulty 
                HAVING COUNT(*) > 1
                ORDER BY grade, difficulty
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        console.log(`Found ${duplicates.length} sets of duplicate questions`);
        
        let totalRemoved = 0;
        
        for (const duplicate of duplicates) {
            const idsToRemove = duplicate.all_ids.split(',').filter(id => parseInt(id) !== duplicate.keep_id);
            
            console.log(`\nDuplicate: "${duplicate.question_text.substring(0, 50)}..."`);
            console.log(`Grade: ${duplicate.grade}, Difficulty: ${duplicate.difficulty}`);
            console.log(`Keeping ID: ${duplicate.keep_id}, Removing IDs: ${idsToRemove.join(', ')}`);
            
            for (const idToRemove of idsToRemove) {
                try {
                    // Start transaction
                    await new Promise((resolve, reject) => {
                        db.run('BEGIN TRANSACTION', (err) => {
                            if (err) reject(err);
                            else resolve();
                        });
                    });
                    
                    // Delete options first (foreign key constraint)
                    await new Promise((resolve, reject) => {
                        db.run('DELETE FROM options WHERE question_id = ?', [idToRemove], (err) => {
                            if (err) reject(err);
                            else resolve();
                        });
                    });
                    
                    // Delete question
                    await new Promise((resolve, reject) => {
                        db.run('DELETE FROM questions WHERE id = ?', [idToRemove], (err) => {
                            if (err) reject(err);
                            else resolve();
                        });
                    });
                    
                    // Commit transaction
                    await new Promise((resolve, reject) => {
                        db.run('COMMIT', (err) => {
                            if (err) reject(err);
                            else resolve();
                        });
                    });
                    
                    totalRemoved++;
                    console.log(`  ✅ Removed question ID ${idToRemove}`);
                    
                } catch (error) {
                    // Rollback transaction
                    await new Promise((resolve) => {
                        db.run('ROLLBACK', () => resolve());
                    });
                    console.log(`  ❌ Failed to remove question ID ${idToRemove}: ${error.message}`);
                }
            }
        }
        
        // Get final counts
        const finalCounts = await new Promise((resolve, reject) => {
            db.all(`
                SELECT grade, COUNT(*) as count
                FROM questions 
                GROUP BY grade 
                ORDER BY grade
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        console.log(`\n✅ Cleanup completed! Removed ${totalRemoved} duplicate questions.`);
        console.log('\nFinal question counts by grade:');
        finalCounts.forEach(row => {
            console.log(`  Grade ${row.grade}: ${row.count} questions`);
        });
        
        await database.close();
        
    } catch (error) {
        console.error('Error removing duplicate questions:', error);
    }
}

removeDuplicateQuestions();