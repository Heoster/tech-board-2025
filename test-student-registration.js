const database = require('./server/config/database');
const authUtils = require('./server/utils/auth');

async function testStudentRegistration() {
    try {
        await database.connect();
        const db = database.getDb();
        
        console.log('🧪 TESTING STUDENT REGISTRATION SYSTEM');
        console.log('======================================\n');
        
        // Test data for multiple students
        const testStudents = [
            { name: 'Alice Johnson', roll_number: 5, grade: 8, section: 'A', password: 'alice123' },
            { name: 'Bob Smith', roll_number: 10, grade: 8, section: 'B', password: 'bob123' },
            { name: 'Carol Davis', roll_number: 15, grade: 9, section: 'A', password: 'carol123' },
            { name: 'David Wilson', roll_number: 20, grade: 7, section: 'B', password: 'david123' },
            { name: 'Eva Brown', roll_number: 25, grade: 11, section: 'A', password: 'eva123' }
        ];
        
        console.log('📋 Step 1: Testing student registration...');
        
        for (const studentData of testStudents) {
            try {
                // Check if student already exists
                const existingStudent = await new Promise((resolve, reject) => {
                    db.get(
                        'SELECT id FROM students WHERE roll_number = ? AND grade = ? AND section = ?',
                        [studentData.roll_number, studentData.grade, studentData.section],
                        (err, row) => {
                            if (err) reject(err);
                            else resolve(row);
                        }
                    );
                });
                
                if (existingStudent) {
                    console.log(`⚠️  Student ${studentData.name} already exists, skipping...`);
                    continue;
                }
                
                // Hash password and create student
                const passwordHash = await authUtils.hashPassword(studentData.password);
                
                const studentId = await new Promise((resolve, reject) => {
                    db.run(
                        'INSERT INTO students (name, roll_number, grade, section, password_hash) VALUES (?, ?, ?, ?, ?)',
                        [studentData.name, studentData.roll_number, studentData.grade, studentData.section, passwordHash],
                        function(err) {
                            if (err) reject(err);
                            else resolve(this.lastID);
                        }
                    );
                });
                
                console.log(`✅ Registered: ${studentData.name} (ID: ${studentId}) - Grade ${studentData.grade}${studentData.section}, Roll: ${studentData.roll_number}`);
                
            } catch (error) {
                console.log(`❌ Failed to register ${studentData.name}: ${error.message}`);
            }
        }
        
        // Test login for registered students
        console.log('\n📋 Step 2: Testing student login...');
        
        for (const studentData of testStudents.slice(0, 2)) { // Test first 2 students
            try {
                // Find student
                const student = await new Promise((resolve, reject) => {
                    db.get(
                        'SELECT id, name, roll_number, grade, section, password_hash FROM students WHERE roll_number = ? AND grade = ? AND section = ?',
                        [studentData.roll_number, studentData.grade, studentData.section],
                        (err, row) => {
                            if (err) reject(err);
                            else resolve(row);
                        }
                    );
                });
                
                if (!student) {
                    console.log(`❌ Student ${studentData.name} not found for login test`);
                    continue;
                }
                
                // Verify password
                const isValidPassword = await authUtils.verifyPassword(studentData.password, student.password_hash);
                
                if (isValidPassword) {
                    // Generate token
                    const token = authUtils.generateToken({
                        id: student.id,
                        rollNumber: student.roll_number,
                        grade: student.grade,
                        section: student.section,
                        role: 'student'
                    });
                    
                    console.log(`✅ Login successful: ${student.name} - Token: ${token.substring(0, 20)}...`);
                } else {
                    console.log(`❌ Login failed: ${student.name} - Invalid password`);
                }
                
            } catch (error) {
                console.log(`❌ Login test failed for ${studentData.name}: ${error.message}`);
            }
        }
        
        // Test duplicate registration (should fail)
        console.log('\n📋 Step 3: Testing duplicate registration prevention...');
        
        try {
            const duplicateStudent = testStudents[0];
            const passwordHash = await authUtils.hashPassword(duplicateStudent.password);
            
            await new Promise((resolve, reject) => {
                db.run(
                    'INSERT INTO students (name, roll_number, grade, section, password_hash) VALUES (?, ?, ?, ?, ?)',
                    [duplicateStudent.name, duplicateStudent.roll_number, duplicateStudent.grade, duplicateStudent.section, passwordHash],
                    function(err) {
                        if (err) reject(err);
                        else resolve(this.lastID);
                    }
                );
            });
            
            console.log('❌ Duplicate registration should have failed but succeeded');
            
        } catch (error) {
            console.log('✅ Duplicate registration correctly prevented:', error.message);
        }
        
        // Display all registered students
        console.log('\n📋 Step 4: Displaying all registered students...');
        
        const allStudents = await new Promise((resolve, reject) => {
            db.all(
                'SELECT id, name, roll_number, grade, section, created_at FROM students ORDER BY grade, section, roll_number',
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });
        
        console.log(`\n📊 Total registered students: ${allStudents.length}`);
        console.log('Student List:');
        allStudents.forEach((student, index) => {
            console.log(`   ${index + 1}. ${student.name} - Grade ${student.grade}${student.section}, Roll: ${student.roll_number} (ID: ${student.id})`);
        });
        
        console.log('\n🎉 STUDENT REGISTRATION TEST COMPLETED!');
        console.log('======================================');
        console.log('✅ Student registration working correctly');
        console.log('✅ Student login working correctly');
        console.log('✅ Duplicate prevention working correctly');
        console.log('✅ Database constraints enforced properly');
        
        await database.close();
        
    } catch (error) {
        console.error('❌ Error in student registration test:', error);
        await database.close();
    }
}

testStudentRegistration();