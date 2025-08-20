const sqlite3 = require('sqlite3').verbose();
const path = require('path');

async function removeDuplicates() {
    const dbPath = path.join(__dirname, 'server/database/mcq_system_fixed.db');
    const db = new sqlite3.Database(dbPath);
    
    console.log('🗑️ Removing duplicate questions...');
    
    try {
        // Remove duplicate questions, keeping the one with lowest ID
        await new Promise((resolve, reject) => {
            db.run(`
                DELETE FROM questions 
                WHERE id NOT IN (
                    SELECT MIN(id) 
                    FROM questions 
                    GROUP BY question_text, grade
                )
            `, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        // Remove orphaned options
        await new Promise((resolve, reject) => {
            db.run(`
                DELETE FROM options 
                WHERE question_id NOT IN (SELECT id FROM questions)
            `, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        // Get final counts
        const questionCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
        
        const optionCount = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM options', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
        
        console.log('✅ Duplicates removed');
        console.log(`📊 Final counts: ${questionCount} questions, ${optionCount} options`);
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        db.close();
    }
}

removeDuplicates();