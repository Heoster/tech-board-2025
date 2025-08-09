const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'database', 'mcq_system.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

async function checkDifficultyDistribution() {
    try {
        console.log('📊 Analyzing Difficulty Distribution...\n');

        // Overall difficulty distribution
        console.log('🎯 OVERALL DIFFICULTY DISTRIBUTION:');
        const overallDifficulty = await queryDatabase(`
            SELECT difficulty, COUNT(*) as count, 
                   ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM questions), 2) as percentage
            FROM questions 
            GROUP BY difficulty 
            ORDER BY difficulty
        `);
        
        overallDifficulty.forEach(row => {
            console.log(`   ${row.difficulty.toUpperCase()}: ${row.count} questions (${row.percentage}%)`);
        });

        console.log('\n📚 DIFFICULTY DISTRIBUTION BY GRADE:');
        
        // Difficulty distribution by grade
        const gradeDifficulty = await queryDatabase(`
            SELECT grade, difficulty, COUNT(*) as count
            FROM questions 
            GROUP BY grade, difficulty 
            ORDER BY grade, difficulty
        `);

        let currentGrade = null;
        gradeDifficulty.forEach(row => {
            if (currentGrade !== row.grade) {
                if (currentGrade !== null) console.log('');
                currentGrade = row.grade;
                console.log(`   Grade ${row.grade}:`);
            }
            console.log(`     ${row.difficulty.toUpperCase()}: ${row.count} questions`);
        });

        console.log('\n📈 DETAILED BREAKDOWN:');
        
        // Detailed breakdown with percentages for each grade
        const detailedBreakdown = await queryDatabase(`
            SELECT 
                grade,
                difficulty,
                COUNT(*) as count,
                ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (PARTITION BY grade), 2) as percentage
            FROM questions 
            GROUP BY grade, difficulty 
            ORDER BY grade, difficulty
        `);

        currentGrade = null;
        detailedBreakdown.forEach(row => {
            if (currentGrade !== row.grade) {
                if (currentGrade !== null) console.log('');
                currentGrade = row.grade;
                console.log(`   Grade ${row.grade}:`);
            }
            console.log(`     ${row.difficulty.toUpperCase()}: ${row.count} questions (${row.percentage}%)`);
        });

        // Summary statistics
        console.log('\n📋 SUMMARY STATISTICS:');
        
        const totalQuestions = await queryDatabase("SELECT COUNT(*) as count FROM questions");
        console.log(`   Total Questions: ${totalQuestions[0].count}`);
        
        const gradeCounts = await queryDatabase(`
            SELECT grade, COUNT(*) as count 
            FROM questions 
            GROUP BY grade 
            ORDER BY grade
        `);
        
        console.log('\n   Questions per Grade:');
        gradeCounts.forEach(row => {
            console.log(`     Grade ${row.grade}: ${row.count} questions`);
        });

        // Difficulty recommendations
        console.log('\n💡 DIFFICULTY RECOMMENDATIONS:');
        
        const basicCount = await queryDatabase("SELECT COUNT(*) as count FROM questions WHERE difficulty = 'basic'");
        const intermediateCount = await queryDatabase("SELECT COUNT(*) as count FROM questions WHERE difficulty = 'intermediate'");
        const advancedCount = await queryDatabase("SELECT COUNT(*) as count FROM questions WHERE difficulty = 'advanced'");
        
        const total = totalQuestions[0].count;
        const basicPercentage = (basicCount[0].count / total * 100).toFixed(1);
        const intermediatePercentage = (intermediateCount[0].count / total * 100).toFixed(1);
        const advancedPercentage = (advancedCount[0].count / total * 100).toFixed(1);
        
        console.log(`   Current Distribution:`);
        console.log(`     Basic: ${basicPercentage}% (${basicCount[0].count} questions)`);
        console.log(`     Intermediate: ${intermediatePercentage}% (${intermediateCount[0].count} questions)`);
        console.log(`     Advanced: ${advancedPercentage}% (${advancedCount[0].count} questions)`);
        
        console.log('\n   Recommended Distribution (Typical):');
        console.log(`     Basic: 40-50%`);
        console.log(`     Intermediate: 30-40%`);
        console.log(`     Advanced: 10-20%`);
        
        // Check for grades with only one difficulty level
        const singleDifficultyGrades = await queryDatabase(`
            SELECT grade, COUNT(DISTINCT difficulty) as difficulty_count
            FROM questions 
            GROUP BY grade 
            HAVING COUNT(DISTINCT difficulty) = 1
        `);
        
        if (singleDifficultyGrades.length > 0) {
            console.log('\n⚠️  GRADES WITH LIMITED DIFFICULTY VARIETY:');
            singleDifficultyGrades.forEach(row => {
                console.log(`     Grade ${row.grade}: Only ${row.difficulty_count} difficulty level`);
            });
        }

        // Check for missing difficulty levels
        console.log('\n🔍 MISSING DIFFICULTY LEVELS BY GRADE:');
        const allGrades = [6, 7, 8, 9, 11];
        const allDifficulties = ['basic', 'intermediate', 'advanced'];
        
        for (const grade of allGrades) {
            const gradeDifficulties = await queryDatabase(`
                SELECT DISTINCT difficulty 
                FROM questions 
                WHERE grade = ?
            `);
            
            const existingDifficulties = gradeDifficulties.map(row => row.difficulty);
            const missingDifficulties = allDifficulties.filter(d => !existingDifficulties.includes(d));
            
            if (missingDifficulties.length > 0) {
                console.log(`     Grade ${grade}: Missing ${missingDifficulties.join(', ')}`);
            } else {
                console.log(`     Grade ${grade}: All difficulty levels present`);
            }
        }

    } catch (error) {
        console.error('Error checking difficulty distribution:', error);
    } finally {
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('\nDatabase connection closed.');
            }
        });
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

// Run the script
checkDifficultyDistribution();
