const database = require('../config/database');
const fs = require('fs');
const path = require('path');

async function applyTopicFiltering() {
    try {
        console.log('🔄 Connecting to database...');
        await database.connect();
        const db = database.getDb();
        
        console.log('📋 Applying topic filtering schema...');
        
        // Read the SQL file
        const sqlPath = path.join(__dirname, '../database/add-topic-filtering.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');
        
        // Execute the SQL
        await new Promise((resolve, reject) => {
            db.exec(sql, (err) => {
                if (err) {
                    console.error('❌ Error applying schema:', err);
                    reject(err);
                } else {
                    console.log('✅ Topic filtering schema applied successfully');
                    resolve();
                }
            });
        });
        
        // Verify the columns were added
        const tableInfo = await new Promise((resolve, reject) => {
            db.all("PRAGMA table_info(questions)", (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        const hasTopicColumn = tableInfo.some(col => col.name === 'topic');
        const hasCategoryColumn = tableInfo.some(col => col.name === 'category');
        
        if (hasTopicColumn && hasCategoryColumn) {
            console.log('✅ Topic and category columns added successfully');
            
            // Check the categorization results
            const categoryStats = await new Promise((resolve, reject) => {
                db.all(`
                    SELECT 
                        topic,
                        category,
                        COUNT(*) as count
                    FROM questions 
                    GROUP BY topic, category
                    ORDER BY topic, category
                `, (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });
            
            console.log('\n📊 Question Categorization Results:');
            console.log('====================================');
            categoryStats.forEach(stat => {
                console.log(`${stat.topic} - ${stat.category}: ${stat.count} questions`);
            });
            
        } else {
            console.log('❌ Columns were not added properly');
        }
        
    } catch (error) {
        console.error('❌ Error applying topic filtering:', error);
        throw error;
    } finally {
        console.log('🔒 Closing database connection...');
        await database.close();
    }
}

// Run the schema application
if (require.main === module) {
    applyTopicFiltering()
        .then(() => {
            console.log('🎉 Topic filtering applied successfully!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Failed to apply topic filtering:', error);
            process.exit(1);
        });
}

module.exports = applyTopicFiltering;