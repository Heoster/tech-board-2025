const database = require('../config/database');

async function removeSimilarQuizzes() {
    console.log('🧹 REMOVING SIMILAR QUIZZES FROM DATABASE');
    console.log('=========================================');
    console.log('');

    try {
        // Connect and initialize database
        await database.connect();
        await database.initialize();
        const db = database.getDb();

        console.log('✅ Connected to database');

        // First, let's see what quizzes currently exist
        const quizzes = await new Promise((resolve, reject) => {
            db.all(`
                SELECT q.id, q.student_id, q.grade, q.start_time, q.end_time, 
                       q.score, q.total_questions, q.status, q.passed,
                       s.name as student_name, s.roll_number, s.section
                FROM quizzes q
                LEFT JOIN students s ON q.student_id = s.student_id
                ORDER BY q.grade, q.start_time
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log(`📊 Found ${quizzes.length} total quizzes in database`);
        
        if (quizzes.length === 0) {
            console.log('ℹ️  No quizzes found in database');
            return;
        }

        // Group quizzes by student and grade to identify similar ones
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
                
                // Sort by start_time to keep the most recent completed quiz
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

        if (duplicatesFound === 0) {
            console.log('\n✅ No duplicate quizzes found!');
            return;
        }

        console.log(`\n🗑️  Found ${duplicatesFound} similar/duplicate quizzes to remove`);
        console.log('📝 Quizzes to be removed:', quizzesToRemove);

        // Remove duplicate quizzes and their associated responses
        if (quizzesToRemove.length > 0) {
            console.log('\n🔄 Removing duplicate quizzes...');
            
            // First remove responses for these quizzes
            const responseDeleteQuery = `DELETE FROM responses WHERE quiz_id IN (${quizzesToRemove.map(() => '?').join(',')})`;
            await new Promise((resolve, reject) => {
                db.run(responseDeleteQuery, quizzesToRemove, function(err) {
                    if (err) reject(err);
                    else {
                        console.log(`✅ Removed ${this.changes} responses for duplicate quizzes`);
                        resolve();
                    }
                });
            });

            // Then remove the quizzes themselves
            const quizDeleteQuery = `DELETE FROM quizzes WHERE id IN (${quizzesToRemove.map(() => '?').join(',')})`;
            await new Promise((resolve, reject) => {
                db.run(quizDeleteQuery, quizzesToRemove, function(err) {
                    if (err) reject(err);
                    else {
                        console.log(`✅ Removed ${this.changes} duplicate quizzes`);
                        resolve();
                    }
                });
            });
        }

        // Also check for and remove incomplete/abandoned quizzes older than 24 hours
        console.log('\n🔍 Checking for abandoned incomplete quizzes...');
        const abandonedQuizzes = await new Promise((resolve, reject) => {
            db.all(`
                SELECT id, student_id, grade, start_time, status
                FROM quizzes 
                WHERE status = 'in_progress' 
                AND datetime(start_time) < datetime('now', '-1 day')
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        if (abandonedQuizzes.length > 0) {
            console.log(`📊 Found ${abandonedQuizzes.length} abandoned incomplete quizzes (older than 24 hours)`);
            
            const abandonedIds = abandonedQuizzes.map(q => q.id);
            
            // Remove responses for abandoned quizzes
            const abandonedResponseDeleteQuery = `DELETE FROM responses WHERE quiz_id IN (${abandonedIds.map(() => '?').join(',')})`;
            await new Promise((resolve, reject) => {
                db.run(abandonedResponseDeleteQuery, abandonedIds, function(err) {
                    if (err) reject(err);
                    else {
                        console.log(`✅ Removed ${this.changes} responses for abandoned quizzes`);
                        resolve();
                    }
                });
            });

            // Remove abandoned quizzes
            const abandonedQuizDeleteQuery = `DELETE FROM quizzes WHERE id IN (${abandonedIds.map(() => '?').join(',')})`;
            await new Promise((resolve, reject) => {
                db.run(abandonedQuizDeleteQuery, abandonedIds, function(err) {
                    if (err) reject(err);
                    else {
                        console.log(`✅ Removed ${this.changes} abandoned quizzes`);
                        resolve();
                    }
                });
            });
        } else {
            console.log('✅ No abandoned quizzes found');
        }

        // Final count
        const finalCount = await new Promise((resolve, reject) => {
            db.get("SELECT COUNT(*) as count FROM quizzes", (err, row) => {
                if (err) reject(err);
                else resolve(row.count);
            });
        });

        console.log(`\n📊 Final quiz count: ${finalCount} quizzes remaining`);
        console.log('\n✅ Quiz cleanup completed successfully!');

    } catch (error) {
        console.error('❌ Error during quiz cleanup:', error);
        throw error;
    } finally {
        database.close();
    }
}

// Run the cleanup
removeSimilarQuizzes().catch(console.error);
