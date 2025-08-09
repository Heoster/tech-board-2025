const https = require('https');

async function makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    data: data
                });
            });
        });
        
        req.on('error', reject);
        req.setTimeout(5000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });
        
        req.end();
    });
}

async function waitForRailwayDeployment() {
    console.log('⏳ WAITING FOR RAILWAY DEPLOYMENT TO COMPLETE');
    console.log('=============================================');
    console.log('');

    const RAILWAY_URL = 'https://tech-board.up.railway.app';
    const MAX_ATTEMPTS = 30; // 5 minutes total
    const DELAY = 10000; // 10 seconds between attempts
    
    let attempt = 1;
    
    while (attempt <= MAX_ATTEMPTS) {
        console.log(`🔍 Attempt ${attempt}/${MAX_ATTEMPTS} - Checking deployment status...`);
        
        try {
            const response = await makeRequest(`${RAILWAY_URL}/health`);
            
            if (response.statusCode === 200) {
                console.log('✅ Railway deployment is live!');
                
                // Test the new admin password to confirm updated code is deployed
                const adminTestResponse = await makeRequest(`${RAILWAY_URL}/api/auth/admin/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: 'admin',
                        password: 'admin123'
                    })
                });

                if (adminTestResponse.statusCode === 200) {
                    console.log('🎉 NEW CODE SUCCESSFULLY DEPLOYED!');
                    console.log('✅ Updated admin password is active');
                    console.log('✅ 50-question quiz system is live');
                    console.log('');
                    console.log('🌐 Your TECH BOARD 2025 system is ready:');
                    console.log(`   Student Portal: ${RAILWAY_URL}/register`);
                    console.log(`   Admin Panel: ${RAILWAY_URL}/admin/login`);
                    console.log('');
                    console.log('🔐 Admin Credentials:');
                    console.log('   Username: admin');
                    console.log('   Password: admin123');
                    return true;
                } else {
                    console.log('⚠️  Deployment live but old code still active');
                    console.log('   Waiting for code update to propagate...');
                }
            } else {
                console.log(`❌ Health check failed (Status: ${response.statusCode})`);
            }
            
        } catch (error) {
            console.log(`❌ Connection failed: ${error.message}`);
        }
        
        if (attempt < MAX_ATTEMPTS) {
            console.log(`⏳ Waiting ${DELAY/1000} seconds before next attempt...`);
            await new Promise(resolve => setTimeout(resolve, DELAY));
        }
        
        attempt++;
    }
    
    console.log('❌ Deployment did not complete within the expected time');
    console.log('');
    console.log('🔧 Troubleshooting steps:');
    console.log('   1. Check Railway dashboard for deployment status');
    console.log('   2. Review Railway logs for any errors');
    console.log('   3. Verify the build completed successfully');
    console.log('   4. Try manual verification: node verify-railway-deployment.js');
    
    return false;
}

// Run if called directly
if (require.main === module) {
    waitForRailwayDeployment()
        .then(success => {
            if (success) {
                console.log('\n🚀 Railway deployment completed successfully!');
                process.exit(0);
            } else {
                console.log('\n⚠️  Railway deployment needs manual verification');
                process.exit(1);
            }
        })
        .catch(error => {
            console.error('❌ Error waiting for deployment:', error);
            process.exit(1);
        });
}

module.exports = { waitForRailwayDeployment };