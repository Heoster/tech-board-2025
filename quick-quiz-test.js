const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'server/database/mcq_system.db');

async function quickQuizTest() {
    const db = new sqlite3.Database(dbPath);
    
    console.log('Quick Quiz Generation Test\n');
    
    // Test Grade 6 quiz generation (most common)
    const grade = 6;
    
    try {
        // Get questions with proper structure
        const questions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    q.id,
                    q.question_text,
                    q.difficulty,
                    q.topic,
                    o1.option_text as option_a,
                    o2.option_text as option_b,
                    o3.option_text as option_c,
                    o4.option_text as option_d,
                    CASE 
                        WHEN o1.is_correct = 1 THEN 'A'
                        WHEN o2.is_correct = 1 THEN 'B'
                        WHEN o3.is_correct = 1 THEN 'C'
                        WHEN o4.is_correct = 1 THEN 'D'
                    END as correct_answer
                FROM questions q
                LEFT JOIN options o1 ON q.id = o1.question_id AND o1.option_order = 1
                LEFT JOIN options o2 ON q.id = o2.question_id AND o2.option_order = 2
                LEFT JOIN options o3 ON q.id = o3.question_id AND o3.option_order = 3
                LEFT JOIN options o4 ON q.id = o4.question_id AND o4.option_order = 4
                WHERE q.grade = ?
                ORDER BY RANDOM()
                LIMIT 25
            `, [grade], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        console.log(`✅ Generated ${questions.length} questions for Grade ${grade}`);
        
        // Check for issues
        let issues = [];
        
        questions.forEach((q, index) => {
            // Check for missing options
            if (!q.option_a || !q.option_b || !q.option_c || !q.option_d) {
                issues.push(`Question ${index + 1}: Missing options`);
            }
            
            // Check for missing correct answer
            if (!q.correct_answer) {
                issues.push(`Question ${index + 1}: No correct answer marked`);
            }
            
            // Check for empty question text
            if (!q.question_text || q.question_text.trim() === '') {
                issues.push(`Question ${index + 1}: Empty question text`);
            }
        });
        
        if (issues.length === 0) {
            console.log('✅ No issues found in quiz generation');
            
            // Show sample question
            console.log('\nSample Question:');
            console.log(`Q: ${questions[0].question_text}`);
            console.log(`A) ${questions[0].option_a}`);
            console.log(`B) ${questions[0].option_b}`);
            console.log(`C) ${questions[0].option_c}`);
            console.log(`D) ${questions[0].option_d}`);
            console.log(`Correct: ${questions[0].correct_answer}`);
            console.log(`Difficulty: ${questions[0].difficulty}`);
            console.log(`Topic: ${questions[0].topic}`);
        } else {
            console.log('❌ Issues found:');
            issues.forEach(issue => console.log(`  - ${issue}`));
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
    
    db.close();
}

quickQuizTest();