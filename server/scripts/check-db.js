require('dotenv').config();
const database = require('../config/database');

async function checkDatabase() {
    try {
        await database.connect();
        const db = database.getDb();

        console.log('=== Database Status ===');
        
        // Check students
        const students = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM students', (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        console.log(`Students: ${students.length}`);
        students.forEach(s => console.log(`  - ${s.name} (${s.roll_number}, Grade ${s.grade}${s.section})`));

        // Check admins
        const admins = await new Promise((resolve, reject) => {
            db.all('SELECT username FROM admins', (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        console.log(`Admins: ${admins.length}`);
        admins.forEach(a => console.log(`  - ${a.username}`));

        // Check questions
        const questions = await new Promise((resolve, reject) => {
            db.all('SELECT COUNT(*) as count FROM questions', (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        console.log(`Questions: ${questions[0].count}`);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await database.close();
    }
}

checkDatabase();