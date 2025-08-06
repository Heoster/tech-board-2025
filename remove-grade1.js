const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'server', 'database', 'mcq_system.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        process.exit(1);
    }
    console.log('Connected to SQLite database for Grade 1 cleanup.');
});

// Start cleanup process
db.serialize(() => {
    // Check for existing Grade 1 data first
    db.get("SELECT COUNT(*) as count FROM students WHERE grade = 1", (err, row) => {
        if (err) {
            console.error('Error checking students:', err.message);
        } else {
            console.log(`Found ${row.count} Grade 1 students to remove`);
        }
    });

    db.get("SELECT COUNT(*) as count FROM questions WHERE grade = 1", (err, row) => {
        if (err) {
            console.error('Error checking questions:', err.message);
        } else {
            console.log(`Found ${row.count} Grade 1 questions to remove`);
        }
    });

    // Delete Grade 1 responses first (due to foreign key constraints)
    db.run(`DELETE FROM responses WHERE quiz_id IN (
        SELECT q.id FROM quizzes q 
        JOIN students s ON q.student_id = s.id 
        WHERE s.grade = 1
    )`, (err) => {
        if (err) {
            console.error('Error deleting Grade 1 responses:', err.message);
        } else {
            console.log('✓ Removed Grade 1 responses');
        }
    });

    // Delete Grade 1 quizzes
    db.run(`DELETE FROM quizzes WHERE student_id IN (
        SELECT id FROM students WHERE grade = 1
    )`, (err) => {
        if (err) {
            console.error('Error deleting Grade 1 quizzes:', err.message);
        } else {
            console.log('✓ Removed Grade 1 quizzes');
        }
    });

    // Delete Grade 1 students
    db.run("DELETE FROM students WHERE grade = 1", (err) => {
        if (err) {
            console.error('Error deleting Grade 1 students:', err.message);
        } else {
            console.log('✓ Removed Grade 1 students');
        }
    });

    // Delete Grade 1 question options first
    db.run(`DELETE FROM options WHERE question_id IN (
        SELECT id FROM questions WHERE grade = 1
    )`, (err) => {
        if (err) {
            console.error('Error deleting Grade 1 options:', err.message);
        } else {
            console.log('✓ Removed Grade 1 question options');
        }
    });

    // Delete Grade 1 questions
    db.run("DELETE FROM questions WHERE grade = 1", (err) => {
        if (err) {
            console.error('Error deleting Grade 1 questions:', err.message);
        } else {
            console.log('✓ Removed Grade 1 questions');
        }
    });

    // Verify cleanup
    db.get("SELECT COUNT(*) as students FROM students WHERE grade = 1", (err, row) => {
        if (err) {
            console.error('Error verifying students cleanup:', err.message);
        } else {
            console.log(`\n🔍 Verification: ${row.students} Grade 1 students remain`);
        }
    });

    db.get("SELECT COUNT(*) as questions FROM questions WHERE grade = 1", (err, row) => {
        if (err) {
            console.error('Error verifying questions cleanup:', err.message);
        } else {
            console.log(`🔍 Verification: ${row.questions} Grade 1 questions remain`);
        }
    });

    // Show remaining grades
    db.all("SELECT DISTINCT grade FROM students ORDER BY grade", (err, rows) => {
        if (err) {
            console.error('Error getting remaining grades:', err.message);
        } else {
            const grades = rows.map(row => row.grade);
            console.log(`\n✅ Remaining student grades: ${grades.join(', ')}`);
        }
    });

    db.all("SELECT DISTINCT grade FROM questions ORDER BY grade", (err, rows) => {
        if (err) {
            console.error('Error getting question grades:', err.message);
        } else {
            const grades = rows.map(row => row.grade);
            console.log(`✅ Remaining question grades: ${grades.join(', ')}`);
        }
    });

    console.log('\n🎯 Grade 1 cleanup completed successfully!');
});

// Close the database
db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
    } else {
        console.log('Database connection closed.');
    }
});
