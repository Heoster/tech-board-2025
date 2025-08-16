const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '..', 'database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('🔧 Adding unique constraint to prevent duplicate questions...');

async function findDuplicates() {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT grade, question_text, difficulty, COUNT(*) as count
            FROM questions 
            GROUP BY grade, question_text, difficulty
            HAVING COUNT(*) > 1
            ORDER BY count DESC
        `;
        
        db.all(query, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

async function removeDuplicates() {
    return new Promise((resolve, reject) => {
        console.log('🧹 Removing duplicate questions...');
        
        const query = `
            DELETE FROM questions 
            WHERE id NOT IN (
                SELECT MIN(id) 
                FROM questions 
                GROUP BY grade, question_text, difficulty
            )
        `;
        
        db.run(query, function(err) {
            if (err) reject(err);
            else {
                console.log(`✅ Removed ${this.changes} duplicate questions`);
                resolve(this.changes);
            }
        });
    });
}

async function applyUniqueConstraint() {
    return new Promise((resolve, reject) => {
        console.log('🔒 Applying unique constraint...');
        
        const migrationSQL = fs.readFileSync(path.join(__dirname, 'add-unique-constraint.sql'), 'utf8');
        
        db.exec(migrationSQL, (err) => {
            if (err) {
                console.error('❌ Error applying unique constraint:', err);
                reject(err);
            } else {
                console.log('✅ Unique constraint applied successfully');
                resolve();
            }
        });
    });
}

async function verifyConstraint() {
    return new Promise((resolve, reject) => {
        console.log('🔍 Verifying unique constraint...');
        
        // Try to insert a duplicate question to test the constraint
        const testQuery = `
            INSERT INTO questions (grade, difficulty, question_text) 
            VALUES (6, 'basic', 'Test duplicate question')
        `;
        
        db.run(testQuery, function(err) {
            if (err) {
                console.log('❌ First insert failed (unexpected):', err);
                reject(err);
                return;
            }
            
            const questionId = this.lastID;
            console.log('✅ First test question inserted');
            
            // Try to insert the same question again (should fail)
            db.run(testQuery, function(err) {
                if (err && err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
                    console.log('✅ Unique constraint working - duplicate rejected');
                    
                    // Clean up test question
                    db.run('DELETE FROM questions WHERE id = ?', [questionId], (cleanupErr) => {
                        if (cleanupErr) {
                            console.log('⚠️ Warning: Could not clean up test question');
                        } else {
                            console.log('✅ Test question cleaned up');
                        }
                        resolve();
                    });
                } else {
                    console.log('❌ Unique constraint not working - duplicate was allowed');
                    reject(new Error('Unique constraint verification failed'));
                }
            });
        });
    });
}

async function getQuestionStats() {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                grade,
                COUNT(*) as total_questions,
                COUNT(DISTINCT question_text) as unique_questions
            FROM questions 
            GROUP BY grade 
            ORDER BY grade
        `;
        
        db.all(query, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

async function migrate() {
    try {
        // Check for duplicates first
        console.log('🔍 Checking for duplicate questions...');
        const duplicates = await findDuplicates();
        
        if (duplicates.length > 0) {
            console.log(`⚠️ Found ${duplicates.length} sets of duplicate questions:`);
            duplicates.forEach(dup => {
                console.log(`   Grade ${dup.grade}, "${dup.question_text.substring(0, 50)}..." (${dup.count} copies)`);
            });
            
            // Remove duplicates
            await removeDuplicates();
        } else {
            console.log('✅ No duplicate questions found');
        }
        
        // Apply unique constraint
        await applyUniqueConstraint();
        
        // Verify the constraint works
        await verifyConstraint();
        
        // Show final stats
        console.log('\n📊 Final question statistics:');
        const stats = await getQuestionStats();
        let totalQuestions = 0;
        
        stats.forEach(stat => {
            console.log(`   Grade ${stat.grade}: ${stat.total_questions} questions (${stat.unique_questions} unique)`);
            totalQuestions += stat.total_questions;
        });
        
        console.log(`   Total: ${totalQuestions} questions`);
        
        console.log('\n🎉 Migration completed successfully!');
        console.log('🔒 Database now prevents duplicate questions');
        
    } catch (error) {
        console.error('❌ Migration failed:', error);
    } finally {
        db.close();
    }
}

migrate();