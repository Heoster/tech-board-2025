const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'server/database/mcq_system_fixed.db');

async function finalFixVariations() {
    console.log('🔧 Final fix for variation questions...\n');

    const db = new sqlite3.Database(dbPath);

    try {
        // 1. First, let's see what we're dealing with
        console.log('1. Analyzing current database state...');
        
        const totalQuestions = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        const variationQuestions = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions WHERE question_text LIKE "%Variation%"', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        console.log(`Total questions: ${totalQuestions}`);
        console.log(`Questions with variations: ${variationQuestions}`);

        // 2. Get all variation questions grouped by base text
        console.log('\n2. Grouping variation questions...');
        
        const allVariations = await new Promise((resolve, reject) => {
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

        // Group by base question text
        const groups = new Map();
        allVariations.forEach(q => {
            const baseText = q.question_text.replace(/ - Variation \d+\??$/, '').trim();
            const key = `${q.grade}|${q.difficulty}|${baseText.toLowerCase()}`;
            
            if (!groups.has(key)) {
                groups.set(key, {
                    baseText: baseText,
                    grade: q.grade,
                    difficulty: q.difficulty,
                    questions: []
                });
            }
            groups.get(key).questions.push(q);
        });

        console.log(`Found ${groups.size} unique base questions with variations`);

        // 3. For each group, check if a clean version already exists
        let processedGroups = 0;
        let questionsRemoved = 0;
        let questionsUpdated = 0;

        for (const [key, group] of groups) {
            const { baseText, grade, difficulty, questions } = group;
            
            // Check if a clean version (without variation) already exists
            const cleanExists = await new Promise((resolve, reject) => {
                db.get(`
                    SELECT id FROM questions 
                    WHERE grade = ? AND difficulty = ? AND question_text = ?
                `, [grade, difficulty, baseText + (baseText.endsWith('?') ? '' : '?')], (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                });
            });

            if (cleanExists) {
                // Clean version exists, remove all variation versions
                console.log(`Clean version exists for: "${baseText.substring(0, 50)}..."`);
                console.log(`  Removing ${questions.length} variation versions`);
                
                for (const q of questions) {
                    // Remove options first
                    await new Promise((resolve, reject) => {
                        db.run('DELETE FROM options WHERE question_id = ?', [q.id], (err) => {
                            if (err) reject(err);
                            else resolve();
                        });
                    });
                    
                    // Remove question
                    await new Promise((resolve, reject) => {
                        db.run('DELETE FROM questions WHERE id = ?', [q.id], (err) => {
                            if (err) reject(err);
                            else resolve();
                        });
                    });
                    
                    questionsRemoved++;
                }
            } else {
                // No clean version exists, keep the first variation and clean it
                const keepQuestion = questions[0];
                const removeQuestions = questions.slice(1);
                
                console.log(`No clean version for: "${baseText.substring(0, 50)}..."`);
                console.log(`  Keeping ID ${keepQuestion.id}, removing ${removeQuestions.length} duplicates`);
                
                // Remove duplicate variations
                for (const q of removeQuestions) {
                    // Remove options first
                    await new Promise((resolve, reject) => {
                        db.run('DELETE FROM options WHERE question_id = ?', [q.id], (err) => {
                            if (err) reject(err);
                            else resolve();
                        });
                    });
                    
                    // Remove question
                    await new Promise((resolve, reject) => {
                        db.run('DELETE FROM questions WHERE id = ?', [q.id], (err) => {
                            if (err) reject(err);
                            else resolve();
                        });
                    });
                    
                    questionsRemoved++;
                }
                
                // Clean the kept question
                let cleanText = baseText;
                if (!cleanText.endsWith('?')) {
                    cleanText += '?';
                }
                
                await new Promise((resolve, reject) => {
                    db.run('UPDATE questions SET question_text = ? WHERE id = ?', [cleanText, keepQuestion.id], (err) => {
                        if (err) {
                            console.warn(`Could not update question ID ${keepQuestion.id}: ${err.message}`);
                            resolve();
                        } else {
                            questionsUpdated++;
                            resolve();
                        }
                    });
                });
            }
            
            processedGroups++;
        }

        console.log(`\n✅ Processed ${processedGroups} question groups`);
        console.log(`✅ Removed ${questionsRemoved} questions`);
        console.log(`✅ Updated ${questionsUpdated} questions`);

        // 4. Final verification
        console.log('\n4. Final verification...');
        
        const finalTotal = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        const finalVariations = await new Promise((resolve, reject) => {
            db.get('SELECT COUNT(*) as count FROM questions WHERE question_text LIKE "%Variation%"', (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        const gradeStats = await new Promise((resolve, reject) => {
            db.all(`
                SELECT grade, difficulty, COUNT(*) as count
                FROM questions 
                GROUP BY grade, difficulty
                ORDER BY grade, difficulty
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log(`\nFinal totals:`);
        console.log(`Total questions: ${finalTotal} (was ${totalQuestions})`);
        console.log(`Questions with variations: ${finalVariations} (was ${variationQuestions})`);
        console.log(`Questions removed: ${totalQuestions - finalTotal}`);

        console.log(`\nQuestions by grade and difficulty:`);
        gradeStats.forEach(stat => {
            console.log(`Grade ${stat.grade} (${stat.difficulty}): ${stat.count} questions`);
        });

        // 5. Check if we have enough questions per grade
        const gradeMinimums = await new Promise((resolve, reject) => {
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

        console.log(`\nQuestions per grade (minimum 300 needed for quiz generation):`);
        gradeMinimums.forEach(stat => {
            const status = stat.count >= 300 ? '✅' : '⚠️';
            console.log(`${status} Grade ${stat.grade}: ${stat.count} questions`);
        });

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        db.close();
    }
}

// Run the final fix
finalFixVariations();