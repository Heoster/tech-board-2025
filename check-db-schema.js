const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'server/database/mcq_system.db');

async function checkSchema() {
    const db = new sqlite3.Database(dbPath);
    
    console.log('Database Schema Check\n');
    
    // Check questions table structure
    const questionsSchema = await new Promise((resolve, reject) => {
        db.all("PRAGMA table_info(questions)", (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
    
    console.log('Questions table columns:');
    questionsSchema.forEach(col => {
        console.log(`  - ${col.name} (${col.type})`);
    });
    
    // Check options table structure
    const optionsSchema = await new Promise((resolve, reject) => {
        db.all("PRAGMA table_info(options)", (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
    
    console.log('\nOptions table columns:');
    optionsSchema.forEach(col => {
        console.log(`  - ${col.name} (${col.type})`);
    });
    
    // Test actual quiz generation like the API does
    console.log('\n--- Testing Quiz Generation ---');
    
    const questions = await new Promise((resolve, reject) => {
        db.all(`
            SELECT 
                q.id,
                q.question_text,
                q.difficulty,
                q.grade
            FROM questions q
            WHERE q.grade = 6
            ORDER BY RANDOM()
            LIMIT 5
        `, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
    
    console.log(`Found ${questions.length} questions for Grade 6`);
    
    // Get options for first question
    if (questions.length > 0) {
        const options = await new Promise((resolve, reject) => {
            db.all(`
                SELECT option_text, is_correct, option_order
                FROM options 
                WHERE question_id = ?
                ORDER BY option_order
            `, [questions[0].id], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        console.log(`\nSample question has ${options.length} options`);
        console.log('Question:', questions[0].question_text);
        options.forEach((opt, i) => {
            console.log(`  ${String.fromCharCode(65 + i)}) ${opt.option_text} ${opt.is_correct ? '✓' : ''}`);
        });
    }
    
    db.close();
}

checkSchema().catch(console.error);