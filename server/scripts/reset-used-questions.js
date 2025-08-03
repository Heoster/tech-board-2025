const database = require('../config/database');

async function resetUsedQuestions() {
    try {
        console.log('🔄 Connecting to database...');
        await database.connect();
        const db = database.getDb();
        
        console.log('⚠️  WARNING: This will reset ALL used questions tracking!');
        console.log('This means questions can be repeated again in future tests.');
        console.log('');
        
        // Get current usage stats before reset
        const currentUsage = await new Promise((resolve, reject) => {
            db.all(`
                SELECT grade, COUNT(*) as used_count
                FROM used_questions 
                GROUP BY grade
                ORDER BY grade
            `, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        if (currentUsage.length === 0) {
            console.log('✅ No used questions found. Nothing to reset.');
            return;
        }
        
        console.log('📊 Current used questions by grade:');
        currentUsage.forEach(row => {
            console.log(`  Grade ${row.grade}: ${row.used_count} questions used`);
        });
        console.log('');
        
        // Start transaction
        await new Promise((resolve, reject) => {
            db.run('BEGIN TRANSACTION', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        
        try {
            // Clear all used questions
            console.log('🗑️  Clearing used questions table...');
            await new Promise((resolve, reject) => {
                db.run('DELETE FROM used_questions', (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            
            // Reset auto-increment counter
            console.log('🔄 Resetting auto-increment counter...');
            await new Promise((resolve, reject) => {
                db.run('DELETE FROM sqlite_sequence WHERE name = "used_questions"', (err) => {
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
            
            console.log('✅ Successfully reset used questions tracking!');
            console.log('');
            console.log('📝 Summary:');
            const totalReset = currentUsage.reduce((sum, row) => sum + row.used_count, 0);
            console.log(`  - Cleared ${totalReset} used question records`);
            console.log('  - All questions are now available for selection again');
            console.log('  - Future tests will start fresh with no repetition tracking');
            
        } catch (error) {
            // Rollback transaction on error
            await new Promise((resolve) => {
                db.run('ROLLBACK', () => resolve());
            });
            throw error;
        }
        
    } catch (error) {
        console.error('❌ Error resetting used questions:', error);
        throw error;
    } finally {
        console.log('🔒 Closing database connection...');
        await database.close();
    }
}

// Interactive confirmation for safety
async function confirmReset() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    return new Promise((resolve) => {
        rl.question('Are you sure you want to reset ALL used questions? This cannot be undone. (yes/no): ', (answer) => {
            rl.close();
            resolve(answer.toLowerCase() === 'yes');
        });
    });
}

// Run the reset with confirmation
if (require.main === module) {
    (async () => {
        try {
            const confirmed = await confirmReset();
            
            if (!confirmed) {
                console.log('❌ Reset cancelled by user.');
                process.exit(0);
            }
            
            await resetUsedQuestions();
            console.log('🎉 Used questions reset completed successfully!');
            process.exit(0);
        } catch (error) {
            console.error('💥 Failed to reset used questions:', error);
            process.exit(1);
        }
    })();
}

module.exports = resetUsedQuestions;