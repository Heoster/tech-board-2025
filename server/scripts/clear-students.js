const database = require('../config/database');

async function clearAllStudents() {
    try {
        console.log('🔄 Connecting to database...');
        await database.connect();
        const db = database.getDb();
        
        console.log('🗑️  Starting student data cleanup...');
        
        // Start transaction for data integrity
        await new Promise((resolve, reject) => {
            db.run('BEGIN TRANSACTION', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        try {
            // First, get count of existing data
            const studentCount = await new Promise((resolve, reject) => {
                db.get('SELECT COUNT(*) as count FROM students', (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                });
            });
            
            const quizCount = await new Promise((resolve, reject) => {
                db.get('SELECT COUNT(*) as count FROM quizzes', (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                });
            });
            
            const responseCount = await new Promise((resolve, reject) => {
                db.get('SELECT COUNT(*) as count FROM responses', (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                });
            });
            
            console.log(`📊 Current data:
  - Students: ${studentCount}
  - Quizzes: ${quizCount}
  - Responses: ${responseCount}`);
            
            if (studentCount === 0) {
                console.log('✅ No students found in database. Nothing to delete.');
                await new Promise((resolve, reject) => {
                    db.run('ROLLBACK', (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
                return;
            }
            
            // Delete in correct order due to foreign key constraints
            console.log('🗑️  Deleting responses...');
            await new Promise((resolve, reject) => {
                db.run('DELETE FROM responses', (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            
            console.log('🗑️  Deleting quizzes...');
            await new Promise((resolve, reject) => {
                db.run('DELETE FROM quizzes', (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            
            console.log('🗑️  Deleting students...');
            await new Promise((resolve, reject) => {
                db.run('DELETE FROM students', (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            
            // Reset auto-increment counters
            console.log('🔄 Resetting auto-increment counters...');
            await new Promise((resolve, reject) => {
                db.run('DELETE FROM sqlite_sequence WHERE name IN ("students", "quizzes", "responses")', (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            
            // Commit transaction
            await new Promise((resolve, reject) => {
                db.run('COMMIT', (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            
            console.log('✅ Successfully deleted all student data:');
            console.log(`  - Removed ${studentCount} students`);
            console.log(`  - Removed ${quizCount} quizzes`);
            console.log(`  - Removed ${responseCount} responses`);
            console.log('  - Reset ID counters');
            
            // Verify deletion
            const finalStudentCount = await new Promise((resolve, reject) => {
                db.get('SELECT COUNT(*) as count FROM students', (err, row) => {
                    if (err) reject(err);
                    else resolve(row.count);
                });
            });
            
            console.log(`🔍 Verification: ${finalStudentCount} students remaining in database`);
            
        } catch (error) {
            // Rollback transaction on error
            await new Promise((resolve) => {
                db.run('ROLLBACK', () => resolve());
            });
            throw error;
        }
        
    } catch (error) {
        console.error('❌ Error clearing student data:', error);
        throw error;
    } finally {
        console.log('🔒 Closing database connection...');
        await database.close();
    }
}

// Run the cleanup
if (require.main === module) {
    clearAllStudents()
        .then(() => {
            console.log('🎉 Student data cleanup completed successfully!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Failed to clear student data:', error);
            process.exit(1);
        });
}

module.exports = clearAllStudents;