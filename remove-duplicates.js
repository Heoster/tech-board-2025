const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'server/database/mcq_system.db');

async function removeDuplicates() {
    const db = new sqlite3.Database(dbPath);
    
    console.log('🔍 Finding duplicate questions...\n');
    
    // Find duplicates by question text
    const duplicates = await new Promise((resolve, reject) => {
        db.all(`
            SELECT question_text, grade, COUNT(*) as count, GROUP_CONCAT(id) as ids
            FROM questions 
            GROUP BY question_text, grade
            HAVING COUNT(*) > 1
            ORDER BY count DESC
        `, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
    
    console.log(`Found ${duplicates.length} duplicate question groups:`);
    
    let totalRemoved = 0;
    
    for (const dup of duplicates) {
        const ids = dup.ids.split(',').map(id => parseInt(id));
        const keepId = ids[0]; // Keep first occurrence
        const removeIds = ids.slice(1); // Remove rest
        
        console.log(`Grade ${dup.grade}: "${dup.question_text.substring(0, 50)}..." (${dup.count} copies)`);
        
        // Remove options for duplicate questions
        for (const id of removeIds) {
            await new Promise((resolve, reject) => {
                db.run('DELETE FROM options WHERE question_id = ?', [id], (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        }
        
        // Remove duplicate questions
        await new Promise((resolve, reject) => {
            db.run(`DELETE FROM questions WHERE id IN (${removeIds.join(',')})`, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        totalRemoved += removeIds.length;
    }
    
    console.log(`\n✅ Removed ${totalRemoved} duplicate questions`);
    
    // Show final counts
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
    
    console.log('\nFinal question counts:');
    finalCounts.forEach(c => {
        console.log(`  Grade ${c.grade}: ${c.count} questions`);
    });
    
    db.close();
}

removeDuplicates().catch(console.error);