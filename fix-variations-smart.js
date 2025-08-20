const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'server/database/mcq_system_fixed.db');

async function smartFixVariations() {
    console.log('🔧 Smart fixing of variation questions...\n');

    const db = new sqlite3.Database(dbPath);

    try {
        // 1. Get all questions with variations
        console.log('1. Analyzing variation questions...');
        const variationQuestions = await new Promise((resolve, reject) => {
            db.all(`
                SELECT id, question_text, grade, difficulty 
                FROM questions 
                WHERE question_text LIKE '%Variation%' 
                ORDER BY grade, difficulty, question_text
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log(`Found ${variationQuestions.length} questions with variations`);

        // 2. Group questions by their base text (without variation)
        const questionGroups = new Map();

        variationQuestions.forEach(q => {
            // Extract base question text (remove " - Variation X" part)
            const baseText = q.question_text.replace(/ - Variation \d+\?*$/, '').trim();
            const key = `${q.grade}-${q.difficulty}-${baseText.toLowerCase()}`;

            if (!questionGroups.has(key)) {
                questionGroups.set(key, []);
            }
            questionGroups.get(key).push(q);
        });

        console.log(`Found ${questionGroups.size} unique base questions with variations`);

        // 3. For each group, keep only the first question and remove others
        let totalProcessed = 0;
        let totalRemoved = 0;

        for (const [key, questions] of questionGroups) {
            if (questions.length > 1) {
                const keepQuestion = questions[0];
                const removeQuestions = questions.slice(1);

                console.log(`Processing: "${keepQuestion.question_text.substring(0, 60)}..."`);
                console.log(`  Keeping ID ${keepQuestion.id}, removing ${removeQuestions.length} duplicates`);

                // Remove options for questions we're deleting
                for (const removeQ of removeQuestions) {
                    await new Promise((resolve, reject) => {
                        db.run('DELETE FROM options WHERE question_id = ?', [removeQ.id], (err) => {
                            if (err) reject(err);
                            else resolve();
                        });
                    });
                }

                // Remove the duplicate questions
                const removeIds = removeQuestions.map(q => q.id);
                const placeholders = removeIds.map(() => '?').join(',');

                const removed = await new Promise((resolve, reject) => {
                    db.run(`DELETE FROM questions WHERE id IN (${placeholders})`, removeIds, function (err) {
                        if (err) reject(err);
                        else resolve(this.changes);
                    });
                });

                totalRemoved += removed;

                // Now update the kept question to remove variation text
                let cleanText = keepQuestion.question_text.replace(/ - Variation \d+\?*$/, '').trim();
                if (!cleanText.endsWith('?')) {
                    cleanText += '?';
                }

                await new Promise((resolve, reject) => {
                    db.run('UPDATE questions SET question_text = ? WHERE id = ?', [cleanText, keepQuestion.id], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });

                totalProcessed++;
            }
        }

        console.log(`\n✅ Processed ${totalProcessed} question groups`);
        console.log(`✅ Removed ${totalRemoved} duplicate variation questions`);

        // 4. Handle single variation questions (no duplicates)
        console.log('\n4. Cleaning remaining single variation questions...');
        const singleVariations = await new Promise((resolve, reject) => {
            db.all(`
                SELECT id, question_text 
                FROM questions 
                WHERE question_text LIKE '%Variation%'
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        let singlesCleaned = 0;
        for (const q of singleVariations) {
            let cleanText = q.question_text.replace(/ - Variation \d+\?*$/, '').trim();
            if (!cleanText.endsWith('?')) {
                cleanText += '?';
            }

            await new Promise((resolve, reject) => {
                db.run('UPDATE questions SET question_text = ? WHERE id = ?', [cleanText, q.id], (err) => {
                    if (err) {
                        console.warn(`Could not clean question ID ${q.id}: ${err.message}`);
                        resolve(); // Continue with others
                    } else {
                        singlesCleaned++;
                        resolve();
                    }
                });
            });
        }

        console.log(`✅ Cleaned ${singlesCleaned} single variation questions`);

        // 5. Final verification
        console.log('\n5. Final verification...');
        const finalStats = await new Promise((resolve, reject) => {
            db.all(`
                SELECT 
                    grade,
                    difficulty,
                    COUNT(*) as total_questions,
                    COUNT(CASE WHEN question_text LIKE '%Variation%' THEN 1 END) as remaining_variations
                FROM questions 
                GROUP BY grade, difficulty
                ORDER BY grade, difficulty
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log('\nFinal question counts:');
        let totalQuestions = 0;
        let totalVariations = 0;

        finalStats.forEach(stat => {
            console.log(`Grade ${stat.grade} (${stat.difficulty}): ${stat.total_questions} questions, ${stat.remaining_variations} still with variations`);
            totalQuestions += stat.total_questions;
            totalVariations += stat.remaining_variations;
        });

        console.log(`\n📊 Summary:`);
        console.log(`Total questions: ${totalQuestions}`);
        console.log(`Remaining variations: ${totalVariations}`);
        console.log(`Questions cleaned: ${variationQuestions.length - totalVariations}`);

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        db.close();
    }
}

// Run the smart fix
smartFixVariations();