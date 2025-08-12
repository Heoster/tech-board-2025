const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'server/database/mcq_system.db');

async function cleanBadQuestions() {
    const db = new sqlite3.Database(dbPath);
    
    console.log('🧹 Cleaning bad questions...\n');
    
    // Find generic/placeholder questions
    const badQuestions = await new Promise((resolve, reject) => {
        db.all(`
            SELECT id, question_text, grade
            FROM questions 
            WHERE question_text LIKE '%What is an important concept%'
               OR question_text LIKE '%Key concept related to%'
               OR question_text LIKE '%Question %: What is an important%'
            ORDER BY grade, id
        `, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
    
    console.log(`Found ${badQuestions.length} bad questions to remove:`);
    badQuestions.slice(0, 5).forEach(q => {
        console.log(`  - Grade ${q.grade}: ${q.question_text.substring(0, 60)}...`);
    });
    
    if (badQuestions.length > 0) {
        // Delete options for bad questions
        for (const q of badQuestions) {
            await new Promise((resolve, reject) => {
                db.run('DELETE FROM options WHERE question_id = ?', [q.id], (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        }
        
        // Delete bad questions
        const questionIds = badQuestions.map(q => q.id).join(',');
        await new Promise((resolve, reject) => {
            db.run(`DELETE FROM questions WHERE id IN (${questionIds})`, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        console.log(`✅ Removed ${badQuestions.length} bad questions`);
    }
    
    // Check remaining questions count
    const counts = await new Promise((resolve, reject) => {
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
    
    console.log('\nRemaining questions per grade:');
    counts.forEach(c => {
        console.log(`  Grade ${c.grade}: ${c.count} questions`);
    });
    
    db.close();
}

cleanBadQuestions().catch(console.error);