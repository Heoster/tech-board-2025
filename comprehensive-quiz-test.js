const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'server/database/mcq_system.db');

async function comprehensiveTest() {
    const db = new sqlite3.Database(dbPath);
    
    console.log('🔍 Comprehensive Quiz System Test\n');
    
    const issues = [];
    
    // Test 1: Check if we have enough questions per grade
    console.log('1. Checking question availability per grade...');
    const grades = [6, 7, 8, 9, 11];
    
    for (const grade of grades) {
        const count = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions WHERE grade = ?', [grade], (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });
        
        console.log(`   Grade ${grade}: ${count} questions`);
        if (count < 25) {
            issues.push(`Grade ${grade} has insufficient questions (${count} < 25)`);
        }
    }
    
    // Test 2: Check quiz generation logic (like the API does)
    console.log('\\n2. Testing quiz generation logic...');
    
    const testGrade = 6;
    const questions = await new Promise((resolve, reject) => {
        db.all(`
            SELECT q.id, q.question_text, q.difficulty,
                   GROUP_CONCAT(
                       json_object('id', o.id, 'text', o.option_text)
                   ) as options
            FROM questions q
            LEFT JOIN options o ON q.id = o.question_id
            WHERE q.grade = ?
            GROUP BY q.id
            ORDER BY RANDOM()
            LIMIT 25
        `, [testGrade], (err, rows) => {
            if (err) reject(err);
            else resolve(rows.map(q => ({
                ...q,
                options: q.options ? JSON.parse(`[${q.options}]`) : []
            })));
        });
    });
    
    console.log(`   Generated ${questions.length} questions for Grade ${testGrade}`);
    
    // Test 3: Validate question structure
    console.log('\\n3. Validating question structure...');
    
    let validQuestions = 0;
    let questionsWithIssues = 0;
    
    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        let questionIssues = [];
        
        // Check question text
        if (!q.question_text || q.question_text.trim() === '') {
            questionIssues.push('Empty question text');
        }
        
        // Check options count
        if (q.options.length !== 4) {
            questionIssues.push(`Has ${q.options.length} options instead of 4`);
        }
        
        // Check for empty options
        const emptyOptions = q.options.filter(opt => !opt.text || opt.text.trim() === '');
        if (emptyOptions.length > 0) {
            questionIssues.push(`${emptyOptions.length} empty options`);
        }
        
        if (questionIssues.length === 0) {
            validQuestions++;
        } else {
            questionsWithIssues++;
            if (questionsWithIssues <= 3) { // Show first 3 problematic questions
                console.log(`   ❌ Question ${i + 1}: ${questionIssues.join(', ')}`);
            }
        }
    }
    
    console.log(`   ✅ Valid questions: ${validQuestions}/${questions.length}`);
    if (questionsWithIssues > 0) {
        issues.push(`${questionsWithIssues} questions have structural issues`);
    }
    
    // Test 4: Check correct answer availability
    console.log('\\n4. Checking correct answers...');
    
    let questionsWithCorrectAnswers = 0;
    
    for (const q of questions.slice(0, 5)) { // Check first 5 questions
        const correctOptions = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM options WHERE question_id = ? AND is_correct = 1', [q.id], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        if (correctOptions.length === 1) {
            questionsWithCorrectAnswers++;
        } else if (correctOptions.length === 0) {
            console.log(`   ❌ Question ${q.id}: No correct answer`);
        } else {
            console.log(`   ❌ Question ${q.id}: Multiple correct answers (${correctOptions.length})`);
        }
    }
    
    console.log(`   ✅ Questions with correct answers: ${questionsWithCorrectAnswers}/5 (sample)`);
    
    // Test 5: Performance test
    console.log('\\n5. Performance test...');
    const startTime = Date.now();
    
    for (let i = 0; i < 3; i++) {
        await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.question_text, q.difficulty,
                       GROUP_CONCAT(
                           json_object('id', o.id, 'text', o.option_text)
                       ) as options
                FROM questions q
                LEFT JOIN options o ON q.id = o.question_id
                WHERE q.grade = ?
                GROUP BY q.id
                ORDER BY RANDOM()
                LIMIT 25
            `, [6], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }
    
    const endTime = Date.now();
    console.log(`   ⏱️  Generated 3 quizzes in ${endTime - startTime}ms`);
    
    // Summary
    console.log('\\n📊 Test Summary:');
    if (issues.length === 0) {
        console.log('✅ All tests passed! Quiz generation system is working correctly.');
    } else {
        console.log('❌ Issues found:');
        issues.forEach(issue => console.log(`   - ${issue}`));
    }
    
    // Show a sample question
    if (questions.length > 0) {
        console.log('\\n📝 Sample Generated Question:');
        const sample = questions[0];
        console.log(`Q: ${sample.question_text}`);
        sample.options.forEach((opt, i) => {
            console.log(`   ${String.fromCharCode(65 + i)}) ${opt.text}`);
        });
        console.log(`Difficulty: ${sample.difficulty}`);
    }
    
    db.close();
}

comprehensiveTest().catch(console.error);