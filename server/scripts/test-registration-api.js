const http = require('http');

async function testRegistrationAPI() {
    try {
        console.log('Testing registration API...');
        
        const testData = {
            name: 'Test Student API',
            rollNumber: 10,
            grade: 8,
            section: 'A',
            password: 'test123'
        };

        console.log('Sending registration request with data:', testData);

        const postData = JSON.stringify(testData);

        const options = {
            hostname: 'localhost',
            port: 5000,
            path: '/api/auth/register',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = http.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                console.log('Status Code:', res.statusCode);
                console.log('Response:', data);
                
                if (res.statusCode === 200 || res.statusCode === 201) {
                    console.log('✅ Registration successful!');
                } else {
                    console.log('❌ Registration failed!');
                }
            });
        });

        req.on('error', (error) => {
            console.error('❌ Request failed:', error.message);
        });

        req.write(postData);
        req.end();

    } catch (error) {
        console.error('❌ Registration test failed:', error.message);
    }
}

testRegistrationAPI();