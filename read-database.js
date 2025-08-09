const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database path
const dbPath = path.join(__dirname, 'database', 'mcq_system.db');

// Connect to database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return;
    }
    console.log('✅ Connected to SQLite database');
    console.log('📊 Reading database contents...\n');
    
    // Read all tables
    readDatabaseContents();
});

async function readDatabaseContents() {
    try {
        // Get table names
        const tables = await queryDatabase("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name");
        console.log('📋 Database Tables:');
        tables.forEach(table => {
            console.log(`  - ${table.name}`);
        });
        console.log('');

        // Read each table
        for (const table of tables) {
            await readTable(table.name);
        }

        // Show summary statistics
        await showDatabaseSummary();

    } catch (error) {
        console.error('Error reading database:', error);
    } finally {
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('\n✅ Database connection closed');
            }
        });
    }
}

async function readTable(tableName) {
    console.log(`\n📋 Table: ${tableName.toUpperCase()}`);
    console.log('='.repeat(50));

    try {
        // Get table schema
        const schema = await queryDatabase(`PRAGMA table_info(${tableName})`);
        console.log('Schema:');
        schema.forEach(col => {
            console.log(`  ${col.name} (${col.type})${col.notnull ? ' NOT NULL' : ''}${col.pk ? ' PRIMARY KEY' : ''}`);
        });

        // Get row count
        const countResult = await queryDatabase(`SELECT COUNT(*) as count FROM ${tableName}`);
        const rowCount = countResult[0].count;
        console.log(`\nTotal rows: ${rowCount}`);

        if (rowCount > 0) {
            // Get sample data (first 5 rows)
            const sampleData = await queryDatabase(`SELECT * FROM ${tableName} LIMIT 5`);
            console.log('\nSample data (first 5 rows):');
            sampleData.forEach((row, index) => {
                console.log(`  Row ${index + 1}:`, JSON.stringify(row, null, 2));
            });

            if (rowCount > 5) {
                console.log(`  ... and ${rowCount - 5} more rows`);
            }
        }

    } catch (error) {
        console.error(`Error reading table ${tableName}:`, error.message);
    }
}

async function showDatabaseSummary() {
    console.log('\n📊 DATABASE SUMMARY');
    console.log('='.repeat(50));

    try {
        // Students count
        const studentsCount = await queryDatabase("SELECT COUNT(*) as count FROM students");
        console.log(`👥 Students: ${studentsCount[0].count}`);

        // Questions count by grade
        const questionsByGrade = await queryDatabase(`
            SELECT grade, COUNT(*) as count 
            FROM questions 
            GROUP BY grade 
            ORDER BY grade
        `);
        console.log('\n📚 Questions by Grade:');
        questionsByGrade.forEach(row => {
            console.log(`  Grade ${row.grade}: ${row.count} questions`);
        });

        // Questions count by difficulty
        const questionsByDifficulty = await queryDatabase(`
            SELECT difficulty, COUNT(*) as count 
            FROM questions 
            GROUP BY difficulty 
            ORDER BY difficulty
        `);
        console.log('\n📊 Questions by Difficulty:');
        questionsByDifficulty.forEach(row => {
            console.log(`  ${row.difficulty}: ${row.count} questions`);
        });

        // Total options
        const optionsCount = await queryDatabase("SELECT COUNT(*) as count FROM options");
        console.log(`\n🔘 Total Options: ${optionsCount[0].count}`);

        // Quizzes count
        const quizzesCount = await queryDatabase("SELECT COUNT(*) as count FROM quizzes");
        console.log(`📝 Total Quizzes: ${quizzesCount[0].count}`);

        // Completed quizzes
        const completedQuizzes = await queryDatabase("SELECT COUNT(*) as count FROM quizzes WHERE status = 'completed'");
        console.log(`✅ Completed Quizzes: ${completedQuizzes[0].count}`);

        // Passed quizzes
        const passedQuizzes = await queryDatabase("SELECT COUNT(*) as count FROM quizzes WHERE passed = 1");
        console.log(`🏆 Passed Quizzes: ${passedQuizzes[0].count}`);

        // Admins count
        const adminsCount = await queryDatabase("SELECT COUNT(*) as count FROM admins");
        console.log(`👨‍💼 Admins: ${adminsCount[0].count}`);

    } catch (error) {
        console.error('Error generating summary:', error.message);
    }
}

function queryDatabase(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}
