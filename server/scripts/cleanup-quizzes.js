const sqlite3 = require('sqlite3').verbose();
const path = require('path');

async function cleanupSimilarQuizzes() {
    console.log('🧹 CLEANING UP SIMILAR QUIZZES');
    console.log('==============================');
    console.log('');

    const dbPath = path.join(__dirname, '../../database/mcq_system.db');
    console.log('📍 Database path:', dbPath);

    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('❌ Database connection failed:', err.message);
                reject(err);
                return;
            }
            console.log('✅ Connected to database');
        });

        // First, let's see what quizzes exist
        db.all(`
            SELECT q.id, q.student_id, q.grade, q.start_time, q.end_time, 
                   q.score, q.total_questions, q.status, q.passed,
                   s.name as student_name, s.roll_number, s.section
            FROM quizzes q
            LEFT JOIN students s ON q.student_id = s.id
            ORDER BY q.grade, q.start_time
        `, (err, quizzes) => {
            if (err) {
                console.error('❌ Error fetching quizzes:', err.message);
                db.close();
                reject(err);
                return;
            }

            console.log(`📊 Found ${quizzes.length} total quizzes in database`);
            
            if (quizzes.length === 0) {
                console.log('ℹ️  No quizzes found in database');
                db.close();
                resolve();
                return;
            }

            // Group quizzes by student and grade to identify duplicates
            const quizGroups = {};
            quizzes.forEach(quiz => {
                const key = `${quiz.student_id}_${quiz.grade}`;
                if (!quizGroups[key]) {
                    quizGroups[key] = [];
                }
                quizGroups[key].push(quiz);
            });

            console.log('\n📋 Quiz Analysis:');
            let duplicatesFound = 0;
            let quizzesToRemove = [];

            Object.keys(quizGroups).forEach(key => {
                const group = quizGroups[key];
                if (group.length > 1) {
                    console.log(`\n🔍 Found ${group.length} quizzes for student ${group[0].student_name || 'Unknown'} (Grade ${group[0].grade}):`);
                    
                    // Sort by start_time to keep the most recent one
                    group.sort((a, b) => new Date(b.start_time) - new Date(a.start_time));
                    
                    group.forEach((quiz, index) => {
                        const status = quiz.status === 'completed' ? '✅' : '⏳';
                        const score = quiz.score !== null ? `Score: ${quiz.score}/${quiz.total_questions}` : 'No score';
                        console.log(`   ${index === 0 ? '🔄 KEEP' : '❌ REMOVE'}: Quiz #${quiz.id} - ${status} ${score} (${quiz.start_time})`);
                        
                        if (index > 0) { // Remove all but the first (most recent)
                            quizzesToRemove.push(quiz.id);
                            duplicatesFound++;
                        }
                    });
                }
            });

            // Also find abandoned incomplete quizzes (older than 24 hours)
            const now = new Date();
            const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            
            quizzes.forEach(quiz => {
                if (quiz.status === 'in_progress' && new Date(quiz.start_time) < oneDayAgo) {
                    if (!quizzesToRemove.includes(quiz.id)) {
                        console.log(`🗑️  Found abandoned quiz: Quiz #${quiz.id} (${quiz.start_time})`);
                        quizzesToRemove.push(quiz.id);
                        duplicatesFound++;
                    }
                }
            });

            if (duplicatesFound === 0) {
                console.log('\n✅ No duplicate or abandoned quizzes found!');
                db.close();
                resolve();
                return;
            }

            console.log(`\n🗑️  Found ${duplicatesFound} quizzes to remove`);
            console.log('📝 Quiz IDs to be removed:', quizzesToRemove);

            // Remove quizzes and their responses
            if (quizzesToRemove.length > 0) {
                console.log('\n🔄 Removing duplicate/abandoned quizzes...');
                
                // First remove responses
                const placeholders = quizzesToRemove.map(() => '?').join(',');
                const responseDeleteQuery = `DELETE FROM responses WHERE quiz_id IN (${placeholders})`;
                
                db.run(responseDeleteQuery, quizzesToRemove, function(err) {
                    if (err) {
                        console.error('❌ Error removing responses:', err.message);
                        db.close();
                        reject(err);
                        return;
                    }
                    console.log(`✅ Removed ${this.changes} responses`);

                    // Then remove quizzes
                    const quizDeleteQuery = `DELETE FROM quizzes WHERE id IN (${placeholders})`;
                    db.run(quizDeleteQuery, quizzesToRemove, function(err) {
                        if (err) {
                            console.error('❌ Error removing quizzes:', err.message);
                            db.close();
                            reject(err);
                            return;
                        }
                        console.log(`✅ Removed ${this.changes} quizzes`);

                        // Final count
                        db.get("SELECT COUNT(*) as count FROM quizzes", (err, row) => {
                            if (err) {
                                console.error('❌ Error getting final count:', err.message);
                            } else {
                                console.log(`\n📊 Final quiz count: ${row.count} quizzes remaining`);
                            }
                            
                            console.log('\n✅ Quiz cleanup completed successfully!');
                            db.close();
                            resolve();
                        });
                    });
                });
            }
        });
    });
}

// Run the cleanup
cleanupSimilarQuizzes()
    .then(() => {
        console.log('🎉 Cleanup process finished!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('💥 Cleanup failed:', error);
        process.exit(1);
    });
