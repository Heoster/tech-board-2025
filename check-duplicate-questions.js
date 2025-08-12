const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'server/database/mcq_system_fixed.db');

async function checkDuplicateQuestions() {
    const db = new sqlite3.Database(dbPath);

    console.log('🔍 Checking for duplicate questions...\n');

    // Find duplicates by question text and grade
    const duplicates = await new Promise((resolve, reject) => {
        db.all(`
            SELECT question_text, grade, COUNT(*) as count, GROUP_CONCAT(id) as ids
            FROM questions 
            GROUP BY LOWER(TRIM(question_text)), grade 
            HAVING COUNT(*) > 1
            ORDER BY grade, count DESC
        `, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });

    if (duplicates.length === 0) {
        console.log('✅ No duplicate questions found!');
    } else {
        console.log(`❌ Found ${duplicates.length} duplicate question groups:`);

        duplicates.forEach((dup, index) => {
            console.log(`\n${index + 1}. Grade ${dup.grade}: "${dup.question_text.substring(0, 80)}..."`);
            console.log(`   Count: ${dup.count} duplicates`);
            console.log(`   IDs: ${dup.ids}`);
        });
    }

    // Check question count per grade
    console.log('\n📊 Question count per grade:');
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

    counts.forEach(row => {
        const status = row.count >= 300 ? '✅' : '❌';
        console.log(`   Grade ${row.grade}: ${row.count} questions ${status}`);
    });

    db.close();
}

checkDuplicateQuestions().catch(console.error);