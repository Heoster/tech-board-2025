const https = require('https');

const BASE_URL = 'https://tech-board.up.railway.app';

// Ignore SSL certificate issues for testing
const agent = new https.Agent({  
  rejectUnauthorized: false
});

async function checkDeployment() {
    console.log('🚂 Checking Railway Deployment Status...\n');

    const checks = [
        { name: 'Health Check', path: '/health' },
        { name: 'API Health', path: '/api/health' },
        { name: 'API Info', path: '/api' },
        { name: 'Admin Login Test', path: '/api/auth/admin/login', method: 'POST', data: { username: 'admin', password: 'admin123' } }
    ];

    for (const check of checks) {
        try {
            console.log(`Testing ${check.name}...`);
            
            const options = {
                hostname: 'tech-board.up.railway.app',
                port: 443,
                path: check.path,
                method: check.method || 'GET',
                agent: agent,
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Railway-Deployment-Check/1.0'
                }
            };

            const result = await new Promise((resolve, reject) => {
                const req = https.request(options, (res) => {
                    let data = '';
                    res.on('data', (chunk) => data += chunk);
                    res.on('end', () => {
                        resolve({
                            status: res.statusCode,
                            headers: res.headers,
                            data: data
                        });
                    });
                });

                req.on('error', (error) => {
                    resolve({
                        status: 'ERROR',
                        error: error.message
                    });
                });

                if (check.data) {
                    req.write(JSON.stringify(check.data));
                }
                req.end();
            });

            if (result.status === 'ERROR') {
                console.log(`❌ ${check.name}: ${result.error}`);
            } else if (result.status >= 200 && result.status < 300) {
                console.log(`✅ ${check.name}: ${result.status}`);
                
                // Parse and show relevant data
                try {
                    const jsonData = JSON.parse(result.data);
                    if (check.name === 'Health Check') {
                        console.log(`   Status: ${jsonData.status}`);
                        console.log(`   Database: ${jsonData.database?.healthy ? 'Connected' : 'Initializing'}`);
                        console.log(`   Uptime: ${jsonData.uptime}s`);
                    } else if (check.name === 'Admin Login Test') {
                        console.log(`   Login: ${jsonData.success ? 'Working' : 'Failed'}`);
                        if (jsonData.token) console.log(`   Token: Received`);
                    }
                } catch (e) {
                    console.log(`   Response: ${result.data.substring(0, 100)}...`);
                }
            } else {
                console.log(`⚠️ ${check.name}: ${result.status}`);
                console.log(`   Response: ${result.data.substring(0, 200)}...`);
            }

        } catch (error) {
            console.log(`❌ ${check.name}: ${error.message}`);
        }

        console.log(''); // Empty line for readability
    }

    console.log('🎯 Deployment Check Complete!');
    console.log('\nIf all checks passed, your Railway deployment is working correctly.');
    console.log('You can access the application at: https://tech-board.up.railway.app');
}

// Run the check
checkDeployment().catch(console.error);