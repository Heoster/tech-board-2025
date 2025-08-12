const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'server/database/mcq_system.db');

async function findAndFixIncompleteQuestions() {
    const db = new sqlite3.Database(dbPath);
    
    console.log('🔧 Finding and fixing incomplete questions...\n');
    
    // Find questions with incomplete options
    const incompleteQuestions = await new Promise((resolve, reject) => {
        db.all(`
            SELECT q.id, q.question_text, q.grade, COUNT(o.id) as option_count
            FROM questions q
            LEFT JOIN options o ON q.id = o.question_id
            GROUP BY q.id
            HAVING COUNT(o.id) != 4
            ORDER BY q.grade, q.id
        `, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
    
    console.log(`Found ${incompleteQuestions.length} questions with incomplete options:`);
    
    for (const q of incompleteQuestions) {
        console.log(`  Question ${q.id} (Grade ${q.grade}): ${q.option_count} options`);
        
        if (q.option_count < 4) {
            // Add missing options
            const missingCount = 4 - q.option_count;
            
            for (let i = 0; i < missingCount; i++) {
                const optionOrder = q.option_count + i + 1;
                await new Promise((resolve, reject) => {
                    db.run(`
                        INSERT INTO options (question_id, option_text, is_correct, option_order)
                        VALUES (?, ?, 0, ?)
                    `, [q.id, `Option ${String.fromCharCode(64 + optionOrder)}`, optionOrder], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            }
            console.log(`    ✅ Added ${missingCount} missing options`);
        }
    }
    
    // Verify fix
    const stillIncomplete = await new Promise((resolve, reject) => {
        db.all(`
            SELECT q.id, COUNT(o.id) as option_count
            FROM questions q
            LEFT JOIN options o ON q.id = o.question_id
            GROUP BY q.id
            HAVING COUNT(o.id) != 4
        `, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
    
    if (stillIncomplete.length === 0) {
        console.log('\n✅ All questions now have 4 options');
    } else {
        console.log(`\n❌ Still ${stillIncomplete.length} questions with issues`);
    }
    
    db.close();
}

findAndFixIncompleteQuestions().catch(console.error);