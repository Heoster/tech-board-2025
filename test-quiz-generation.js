const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'server/database/mcq_system.db');

async function testQuizGeneration() {
    const db = new sqlite3.Database(dbPath);
    
    console.log('Testing quiz generation...');
    
    // Test for each grade
    const grades = [6, 7, 8, 9, 11];
    
    for (const grade of grades) {
        console.log(`\n--- Testing Grade ${grade} ---`);
        
        // Get total questions for this grade
        const totalQuestions = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions WHERE grade = ?', [grade], (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
        
        console.log(`Total questions available: ${totalQuestions}`);
        
        if (totalQuestions < 50) {
            console.log(`❌ Not enough questions for Grade ${grade} (need 50, have ${totalQuestions})`);
            continue;
        }
        
        // Generate random 50 questions
        const questions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.question_text, q.difficulty,
                       GROUP_CONCAT(
                           json_object('id', o.id, 'text', o.option_text, 'isCorrect', o.is_correct)
                       ) as options
                FROM questions q
                LEFT JOIN options o ON q.id = o.question_id
                WHERE q.grade = ?
                GROUP BY q.id
                ORDER BY RANDOM()
                LIMIT 50
            `, [grade], (err, rows) => {
                if (err) reject(err);
                else resolve(rows.map(q => ({
                    ...q,
                    options: q.options ? JSON.parse(`[${q.options}]`) : []
                })));
            });
        });
        
        console.log(`✅ Generated ${questions.length} questions`);
        
        // Check difficulty distribution
        const difficulties = { basic: 0, medium: 0, advanced: 0 };
        questions.forEach(q => difficulties[q.difficulty]++);
        
        console.log(`Difficulty distribution: Basic: ${difficulties.basic}, Medium: ${difficulties.medium}, Advanced: ${difficulties.advanced}`);
        
        // Verify each question has 4 options with exactly 1 correct
        let validQuestions = 0;
        for (const q of questions) {
            if (q.options.length === 4) {
                const correctCount = q.options.filter(opt => opt.isCorrect === 1).length;
                if (correctCount === 1) {
                    validQuestions++;
                }
            }
        }
        
        console.log(`✅ Valid questions (4 options, 1 correct): ${validQuestions}/50`);
        
        if (validQuestions === 50) {
            console.log(`✅ Grade ${grade} quiz generation: PASSED`);
        } else {
            console.log(`❌ Grade ${grade} quiz generation: FAILED`);
        }
    }
    
    db.close();
    console.log('\n--- Quiz Generation Test Complete ---');
}

testQuizGeneration().catch(console.error);