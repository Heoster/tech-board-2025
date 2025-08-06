const https = require('https');

// Test student registration with valid data
async function testValidStudent() {
    console.log('👤 Testing valid student registration...');
    
    const studentData = {
        name: 'Test Student',
        rollNumber: 50, // Valid roll number (1-80)
        grade: 11,
        section: 'A',
        password: 'test123'
    };
    
    try {
        const result = await makeRequest('/api/auth/register', 'POST', JSON.stringify(studentData));
        
        console.log(`📊 Status: ${result.statusCode}`);
        console.log(`📄 Response: ${result.body}`);
        
        if (result.statusCode === 201) {
            console.log('✅ Student registration successful!');
            return true;
        } else if (result.statusCode === 409) {
            console.log('✅ Student already exists (expected for repeat tests)');
            return true;
        } else {
            console.log('❌ Unexpected response');
            return false;
        }
        
    } catch (error) {
        console.log('❌ Request failed:', error.message);
        return false;
    }
}

function makeRequest(path, method = 'GET', body = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'tech-board.up.railway.app',
            port: 443,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        if (body) {
            options.headers['Content-Length'] = Buffer.byteLength(body);
        }
        
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
        });
        
        req.on('error', reject);
        req.setTimeout(10000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });
        
        if (body) req.write(body);
        req.end();
    });
}

testValidStudent();