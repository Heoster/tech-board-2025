#!/usr/bin/env node

const https = require('https');
const { URL } = require('url');

const BASE_URL = 'https://tech-board.up.railway.app';

console.log('🔍 Checking Frontend Deployment Status');
console.log('=====================================');
console.log(`Testing: ${BASE_URL}\n`);

function makeRequest(url, options = {}) {
    return new Promise((resolve) => {
        const urlObj = new URL(url);
        
        const requestOptions = {
            hostname: urlObj.hostname,
            port: urlObj.port || 443,
            path: urlObj.pathname + urlObj.search,
            method: options.method || 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                ...options.headers
            },
            rejectUnauthorized: false,
            timeout: 15000
        };

        const req = https.request(requestOptions, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    data: data,
                    url: url
                });
            });
        });

        req.on('error', (error) => {
            resolve({
                error: error.message,
                statusCode: 0,
                url: url
            });
        });

        req.on('timeout', () => {
            req.destroy();
            resolve({
                error: 'Request timeout',
                statusCode: 0,
                url: url
            });
        });

        if (options.body) {
            req.write(options.body);
        }
        
        req.end();
    });
}

async function checkMainPage() {
    console.log('🏠 Testing Main Page...');
    const result = await makeRequest(BASE_URL);
    
    if (result.error) {
        console.log(`❌ Main page failed: ${result.error}`);
        return false;
    }
    
    if (result.statusCode !== 200) {
        console.log(`❌ Main page returned: ${result.statusCode}`);
        console.log(`Response: ${result.data.substring(0, 200)}...`);
        return false;
    }
    
    console.log(`✅ Main page loaded (${result.statusCode})`);
    
    // Check if it's serving the React app or fallback HTML
    const isReactApp = result.data.includes('id="root"') && result.data.includes('/assets/');
    const isFallbackHTML = result.data.includes('Tech Board 2025') && result.data.includes('Admin Portal');
    
    if (isReactApp) {
        console.log('✅ React app HTML detected');
        console.log(`   - Contains root div: ${result.data.includes('id="root"') ? '✅' : '❌'}`);
        console.log(`   - Contains assets: ${result.data.includes('/assets/') ? '✅' : '❌'}`);
        console.log(`   - App title: ${result.data.includes('Techno Board') ? '✅' : '❌'}`);
        return true;
    } else if (isFallbackHTML) {
        console.log('⚠️  Serving fallback HTML (React app not loading)');
        console.log('   This means the React build files are missing or not accessible');
        return false;
    } else {
        console.log('❌ Unknown response format');
        console.log(`First 300 chars: ${result.data.substring(0, 300)}`);
        return false;
    }
}

async function checkAssets() {
    console.log('\n📦 Testing Static Assets...');
    
    // First, get the main page to extract asset URLs
    const mainPage = await makeRequest(BASE_URL);
    if (mainPage.error || mainPage.statusCode !== 200) {
        console.log('❌ Cannot check assets - main page failed');
        return false;
    }
    
    // Extract asset URLs from the HTML
    const jsMatches = mainPage.data.match(/src="([^"]*\.js)"/g) || [];
    const cssMatches = mainPage.data.match(/href="([^"]*\.css)"/g) || [];
    
    const jsUrls = jsMatches.map(match => match.match(/src="([^"]*)"/)[1]);
    const cssUrls = cssMatches.map(match => match.match(/href="([^"]*)"/)[1]);
    
    console.log(`Found ${jsUrls.length} JS files and ${cssUrls.length} CSS files`);
    
    let assetsWorking = true;
    
    // Test JS assets
    for (const jsUrl of jsUrls.slice(0, 3)) { // Test first 3 JS files
        const fullUrl = jsUrl.startsWith('http') ? jsUrl : BASE_URL + jsUrl;
        const result = await makeRequest(fullUrl);
        
        if (result.error || result.statusCode !== 200) {
            console.log(`❌ JS asset failed: ${jsUrl} (${result.statusCode || result.error})`);
            assetsWorking = false;
        } else {
            console.log(`✅ JS asset working: ${jsUrl} (${result.data.length} bytes)`);
        }
    }
    
    // Test CSS assets
    for (const cssUrl of cssUrls) {
        const fullUrl = cssUrl.startsWith('http') ? cssUrl : BASE_URL + cssUrl;
        const result = await makeRequest(fullUrl);
        
        if (result.error || result.statusCode !== 200) {
            console.log(`❌ CSS asset failed: ${cssUrl} (${result.statusCode || result.error})`);
            assetsWorking = false;
        } else {
            console.log(`✅ CSS asset working: ${cssUrl} (${result.data.length} bytes)`);
        }
    }
    
    return assetsWorking;
}

async function checkAPI() {
    console.log('\n🔌 Testing API Endpoints...');
    
    const endpoints = [
        { url: '/health', name: 'Health Check' },
        { url: '/api', name: 'API Info' },
        { url: '/api/health', name: 'API Health' }
    ];
    
    let apiWorking = true;
    
    for (const endpoint of endpoints) {
        const result = await makeRequest(BASE_URL + endpoint.url);
        
        if (result.error || result.statusCode !== 200) {
            console.log(`❌ ${endpoint.name}: ${result.statusCode || result.error}`);
            apiWorking = false;
        } else {
            console.log(`✅ ${endpoint.name}: Working`);
            
            // Try to parse JSON response
            try {
                const json = JSON.parse(result.data);
                if (json.status) console.log(`   Status: ${json.status}`);
                if (json.message) console.log(`   Message: ${json.message}`);
            } catch (e) {
                // Not JSON, that's okay
            }
        }
    }
    
    return apiWorking;
}

async function runFullCheck() {
    const mainPageWorking = await checkMainPage();
    const assetsWorking = await checkAssets();
    const apiWorking = await checkAPI();
    
    console.log('\n📊 Final Results:');
    console.log(`Main Page: ${mainPageWorking ? '✅ Working' : '❌ Failed'}`);
    console.log(`Static Assets: ${assetsWorking ? '✅ Working' : '❌ Failed'}`);
    console.log(`API Endpoints: ${apiWorking ? '✅ Working' : '❌ Failed'}`);
    
    if (mainPageWorking && assetsWorking && apiWorking) {
        console.log('\n🎉 Frontend deployment is working correctly!');
        console.log('The React app should load properly in a web browser.');
    } else if (!mainPageWorking && apiWorking) {
        console.log('\n⚠️  Frontend has issues but API is working');
        console.log('The React app may not be building or serving correctly.');
        console.log('Check the build process and static file serving.');
    } else {
        console.log('\n❌ Deployment has issues');
        console.log('Check the server logs and deployment configuration.');
    }
}

runFullCheck().catch(console.error);