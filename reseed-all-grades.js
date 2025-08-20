const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'server/database/mcq_system.db');

// Generate 300 unique questions per grade
const generateQuestions = (grade, startId = 1) => {
    const questions = [];
    const topics = {
        6: ['Computer Basics', 'Hardware', 'Software', 'Internet Safety', 'Office Tools'],
        7: ['Operating Systems', 'Networks', 'Email', 'Web Browsing', 'File Management'],
        8: ['HTML/CSS', 'Programming Logic', 'Databases', 'Web Development', 'Security'],
        9: ['Python Programming', 'Algorithms', 'Data Structures', 'Networking', 'Cybersecurity'],
        11: ['Advanced Python', 'OOP', 'Database Management', 'Web Technologies', 'Software Engineering']
    };
    
    const difficulties = ['basic', 'medium', 'advanced'];
    const topicList = topics[grade];
    
    for (let i = 0; i < 300; i++) {
        const topic = topicList[i % topicList.length];
        const difficulty = difficulties[i % 3];
        const questionNum = i + 1;
        
        questions.push({
            grade,
            difficulty,
            question: `Grade ${grade} ${topic} - Question ${questionNum}: What is a key concept in ${topic.toLowerCase()}?`,
            options: [
                `Correct answer for ${topic} concept ${questionNum}`,
                `Incorrect option A for question ${questionNum}`,
                `Incorrect option B for question ${questionNum}`,
                `Incorrect option C for question ${questionNum}`
            ],
            correct: 0
        });
    }
    
    return questions;
};

async function reseedDatabase() {
    const db = new sqlite3.Database(dbPath);
    
    console.log('🗑️  Clearing existing questions...');
    
    // Clear existing data
    await new Promise((resolve, reject) => {
        db.run('DELETE FROM options', (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
    
    await new Promise((resolve, reject) => {
        db.run('DELETE FROM questions', (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
    
    console.log('✅ Database cleared');
    
    // Generate and insert questions for each grade
    const grades = [6, 7, 8, 9, 11];
    
    for (const grade of grades) {
        console.log(`\n🌱 Seeding Grade ${grade}...`);
        
        const questions = generateQuestions(grade);
        
        for (const q of questions) {
            // Insert question
            const questionId = await new Promise((resolve, reject) => {
                db.run('INSERT INTO questions (grade, difficulty, question_text) VALUES (?, ?, ?)',
                    [q.grade, q.difficulty, q.question], function(err) {
                        if (err) reject(err);
                        else resolve(this.lastID);
                    });
            });
            
            // Insert options
            for (let i = 0; i < q.options.length; i++) {
                await new Promise((resolve, reject) => {
                    db.run('INSERT INTO options (question_id, option_text, is_correct, option_order) VALUES (?, ?, ?, ?)',
                        [questionId, q.options[i], i === q.correct ? 1 : 0, i + 1], (err) => {
                            if (err) reject(err);
                            else resolve();
                        });
                });
            }
        }
        
        console.log(`✅ Grade ${grade}: ${questions.length} questions seeded`);
    }
    
    // Verify counts
    console.log('\n📊 Final verification:');
    const finalCounts = await new Promise((resolve, reject) => {
        db.all('SELECT grade, COUNT(*) as count FROM questions GROUP BY grade ORDER BY grade', (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
    
    finalCounts.forEach(c => {
        console.log(`  Grade ${c.grade}: ${c.count} questions`);
    });
    
    db.close();
    console.log('\n🎉 Database reseeding complete!');
}

reseedDatabase().catch(console.error);