// Direct login debug script
const bcrypt = require('bcrypt');
const database = require('./server/config/database');

async function debugLogin() {
    try {
        await database.connect();
        console.log('Database connected');
        
        // Check if student exists
        const student = await database.get(
            'SELECT * FROM students WHERE roll_number = ? AND grade = ? AND section = ?',
            [79, 6, 'A']
        );
        
        console.log('Student found:', student);
        
        if (student) {
            // Test password
            const passwordMatch = await bcrypt.compare('password123', student.password);
            console.log('Password match:', passwordMatch);
            
            // Test with different password formats
            const testPasswords = ['password123', 'Password123', 'PASSWORD123'];
            for (const testPass of testPasswords) {
                const match = await bcrypt.compare(testPass, student.password);
                console.log(`Password "${testPass}" match:`, match);
            }
        }
        
        // List all students
        const allStudents = await database.query('SELECT id, name, roll_number, grade, section FROM students');
        console.log('All students:', allStudents);
        
    } catch (error) {
        console.error('Debug failed:', error);
    }
}

debugLogin();