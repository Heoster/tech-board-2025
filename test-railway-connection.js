const https = require('https');

console.log('🔍 Testing Railway connection...');
console.log('🌐 URL: https://tech-board.up.railway.app');

const options = {
    hostname: 'tech-board.up.railway.app',
    port: 443,
    path: '/health',
    method: 'GET',
    timeout: 15000
};

const req = https.request(options, (res) => {
    console.log(`📊 Status Code: ${res.statusCode}`);
    console.log(`📋 Headers:`, res.headers);
    
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        console.log('📄 Response Body:', data);
        
        if (res.statusCode === 200) {
            console.log('✅ Railway deployment is working!');
        } else {
            console.log('⚠️  Railway deployment has issues');
        }
    });
});

req.on('error', (error) => {
    console.log('❌ Connection Error:', error.message);
    console.log('🔧 Possible issues:');
    console.log('   - Railway app is still deploying');
    console.log('   - Railway app failed to start');
    console.log('   - Network connectivity issues');
    console.log('   - Server not binding to correct port');
});

req.on('timeout', () => {
    console.log('⏰ Request timed out');
    console.log('🔧 This usually means:');
    console.log('   - Railway app is starting up (can take 2-3 minutes)');
    console.log('   - Database seeding is in progress');
    console.log('   - Server crashed during startup');
    req.destroy();
});

req.end();

console.log('⏳ Waiting for response...');