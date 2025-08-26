#!/usr/bin/env node

const https = require('https');

console.log('🔍 Monitoring Railway deployment...');

let checkCount = 0;
const maxChecks = 20;

function checkDeployment() {
    checkCount++;
    console.log(`\n--- Check ${checkCount}/${maxChecks} ---`);
    
    const options = {
        hostname: 'tech-board.up.railway.app',
        port: 443,
        path: '/health',
        method: 'GET',
        rejectUnauthorized: false,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
    };

    const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            try {
                const response = JSON.parse(data);
                console.log(`Status: ${res.statusCode}`);
                console.log(`Service: ${response.service || 'unknown'}`);
                console.log(`Version: ${response.version || 'unknown'}`);
                console.log(`Server: ${response.server || 'unknown'}`);
                console.log(`Uptime: ${response.uptime || 'unknown'} seconds`);
                
                if (response.service && response.service.includes('RAILWAY-PRODUCTION-SERVER')) {
                    console.log('🎉 NEW SERVER DETECTED! Railway has deployed the changes!');
                    console.log('✅ Frontend should now be working');
                    return;
                } else {
                    console.log('❌ Still old server');
                }
            } catch (error) {
                console.log('❌ Error parsing response:', error.message);
                console.log('Raw response:', data.substring(0, 200));
            }
            
            if (checkCount < maxChecks) {
                setTimeout(checkDeployment, 10000); // Check every 10 seconds
            } else {
                console.log('\n⏰ Monitoring complete. If no changes detected, check Railway dashboard.');
            }
        });
    });

    req.on('error', (error) => {
        console.error('❌ Request failed:', error.message);
        if (checkCount < maxChecks) {
            setTimeout(checkDeployment, 10000);
        }
    });

    req.setTimeout(10000, () => {
        console.error('⏰ Request timeout');
        req.destroy();
        if (checkCount < maxChecks) {
            setTimeout(checkDeployment, 10000);
        }
    });

    req.end();
}

checkDeployment();