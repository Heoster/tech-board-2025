const sqlite3 = require('sqlite3').verbose();
const path = require('path');

async function deleteAllQuestions() {
    console.log('🗑️  DELETING ALL QUESTIONS FROM DATABASE');
    console.log('======================================');
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

        // First, get count of existing questions
        db.get("SELECT COUNT(*) as count FROM questions", (err, row) => {
            if (err) {
                console.error('❌ Error counting questions:', err.message);
                db.close();
                reject(err);
                return;
            }

            const questionCount = row.count;
            console.log(`📊 Found ${questionCount} questions in database`);

            if (questionCount === 0) {
                console.log('ℹ️  No questions found to delete');
                db.close();
                resolve();
                return;
            }

            // Get count of options
            db.get("SELECT COUNT(*) as count FROM options", (err, row) => {
                if (err) {
                    console.error('❌ Error counting options:', err.message);
                    db.close();
                    reject(err);
                    return;
                }

                const optionCount = row.count;
                console.log(`📊 Found ${optionCount} options in database`);

                console.log('\n🔄 Starting deletion process...');

                // Delete options first (due to foreign key constraints)
                db.run("DELETE FROM options", function(err) {
                    if (err) {
                        console.error('❌ Error deleting options:', err.message);
                        db.close();
                        reject(err);
                        return;
                    }
                    console.log(`✅ Deleted ${this.changes} options`);

                    // Then delete questions
                    db.run("DELETE FROM questions", function(err) {
                        if (err) {
                            console.error('❌ Error deleting questions:', err.message);
                            db.close();
                            reject(err);
                            return;
                        }
                        console.log(`✅ Deleted ${this.changes} questions`);

                        // Reset auto-increment counters
                        db.run("DELETE FROM sqlite_sequence WHERE name IN ('questions', 'options')", function(err) {
                            if (err) {
                                console.log('⚠️  Warning: Could not reset auto-increment counters:', err.message);
                            } else {
                                console.log('✅ Reset auto-increment counters');
                            }

                            // Verify deletion
                            db.get("SELECT COUNT(*) as questions, (SELECT COUNT(*) FROM options) as options FROM questions", (err, row) => {
                                if (err) {
                                    console.error('❌ Error verifying deletion:', err.message);
                                } else {
                                    console.log(`\n📊 Final counts:`);
                                    console.log(`   Questions: ${row.questions}`);
                                    console.log(`   Options: ${row.options}`);
                                }

                                console.log('\n✅ All questions deleted successfully!');
                                console.log('🎯 Database is now clean and ready for new questions');
                                
                                db.close();
                                resolve();
                            });
                        });
                    });
                });
            });
        });
    });
}

// Run the deletion
deleteAllQuestions()
    .then(() => {
        console.log('🎉 Question deletion completed!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('💥 Deletion failed:', error);
        process.exit(1);
    });
