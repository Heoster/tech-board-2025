#!/usr/bin/env node

const axios = require('axios');

console.log('🧪 Testing Railway Deployment');
console.log('=============================');

// Railway project info
const projectInfo = {
    projectName: 'believable-trust',
    serviceName: 'tech-board-2025',
    environment: 'production',
    projectId: '634dc857-5a4c-405f-b1d8-d7c67af38732',
    serviceId: '538e65e2-9d9b-4a0d-b5da-ee7d19fccc17'
};

console.log('📋 Project Information:');
console.log(`   Project: ${projectInfo.projectName}`);
console.log(`   Service: ${projectInfo.serviceName}`);
console.log(`   Environment: ${projectInfo.environment}`);

// Test different possible URLs
const possibleUrls = [
    'https://tech-board.up.railway.app',
    'https://believable-trust-production.up.railway.app',
    'https://tech-board-2025-production.up.railway.app'
];

async function testUrl(url) {
    try {
        console.log(`\n🔍 Testing: ${url}`);
        
        // Test health endpoint
        const healthResponse = await axios.get(`${url}/api/health`, { timeout: 10000 });
        
        if (healthResponse.status === 200) {
            console.log(`✅ Health check passed`);
            console.log(`   Status: ${healthResponse.data.status}`);
            console.log(`   Database: ${healthResponse.data.database?.connected ? 'Connected' : 'Disconnected'}`);
            console.log(`   Questions: ${healthResponse.data.questions?.total || 'Unknown'}`);
            console.log(`   Service: ${healthResponse.data.service || 'Unknown'}`);
            
            // Test main page
            try {
                const mainResponse = await axios.get(url, { timeout: 5000 });
                if (mainResponse.status === 200) {
                    console.log(`✅ Main page accessible`);
                }
            } catch (mainError) {
                console.log(`⚠️  Main page issue: ${mainError.message}`);
            }
            
            return { url, working: true, data: healthResponse.data };
        }
    } catch (error) {
        console.log(`❌ Failed: ${error.message}`);
        return { url, working: false, error: error.message };
    }
}

async function findWorkingUrl() {
    console.log('\n🔍 Searching for active deployment...');
    
    for (const url of possibleUrls) {
        const result = await testUrl(url);
        if (result.working) {
            console.log(`\n🎉 Found working deployment!`);
            console.log(`🌐 Live URL: ${url}`);
            console.log(`🏥 Health: ${url}/api/health`);
            console.log(`👨‍💼 Admin: ${url}/admin/login`);
            console.log(`👨‍🎓 Student: ${url}/register`);
            return result;
        }
    }
    
    console.log('\n❌ No working deployment found');
    console.log('\n🔧 Troubleshooting steps:');
    console.log('1. Check Railway dashboard for actual URL');
    console.log('2. Verify deployment is running');
    console.log('3. Check Railway logs for errors');
    console.log('4. Ensure database is properly deployed');
    
    return null;
}

// Run the test
findWorkingUrl().then(result => {
    if (result) {
        console.log('\n✅ Railway deployment is working!');
        console.log('🎯 Ready to add RAILWAY_TOKEN to GitHub secrets');
    } else {
        console.log('\n⚠️  Deployment needs attention');
        console.log('🔧 Check Railway dashboard and logs');
    }
}).catch(error => {
    console.error('\n❌ Test failed:', error.message);
});