const http = require('http');

async function testLoginAPI() {
    try {
        console.log('Testing login API...');
        
        // Test with existing student credentials
        const testCredentials = [
            { rollNumber: 3, grade: 8, section: 'A', password: 'test123', name: 'Test Student 3' },
            { rollNumber: 10, grade: 8, section: 'A', password: 'test123', name: 'Test Student API' },
            { rollNumber: 2, grade: 8, section: 'A', password: 'test123', name: 'Test Student 2' }
        ];

        for (const creds of testCredentials) {
            console.log(`\n--- Testing login for ${creds.name} ---`);
            console.log('Credentials:', { rollNumber: creds.rollNumber, grade: creds.grade, section: creds.section });

            const postData = JSON.stringify({
                rollNumber: creds.rollNumber,
                grade: creds.grade,
                section: creds.section,
                password: creds.password
            });

            const options = {
                hostname: 'localhost',
                port: 5000,
                path: '/api/auth/login',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData)
                }
            };

            await new Promise((resolve) => {
                const req = http.request(options, (res) => {
                    let data = '';

                    res.on('data', (chunk) => {
                        data += chunk;
                    });

                    res.on('end', () => {
                        console.log('Status Code:', res.statusCode);
                        
                        try {
                            const response = JSON.parse(data);
                            if (res.statusCode === 200) {
                                console.log('✅ Login successful!');
                                console.log('Student:', response.data.student);
                            } else {
                                console.log('❌ Login failed!');
                                console.log('Error:', response.error);
                            }
                        } catch (e) {
                            console.log('Response:', data);
                        }
                        resolve();
                    });
                });

                req.on('error', (error) => {
                    console.error('❌ Request failed:', error.message);
                    resolve();
                });

                req.write(postData);
                req.end();
            });
        }

    } catch (error) {
        console.error('❌ Login test failed:', error.message);
    }
}

testLoginAPI();