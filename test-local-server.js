#!/usr/bin/env node

const http = require('http');
const path = require('path');
const fs = require('fs');

console.log('🧪 Testing local server setup...');

// Test if the server can start locally
const serverPath = path.join(__dirname, 'server', 'railway-production-server.js');
const publicPath = path.join(__dirname, 'server', 'public');
const indexPath = path.join(publicPath, 'index.html');

console.log('📁 Checking files:');
console.log(`Server file: ${fs.existsSync(serverPath) ? '✅' : '❌'} ${serverPath}`);
console.log(`Public directory: ${fs.existsSync(publicPath) ? '✅' : '❌'} ${publicPath}`);
console.log(`Index.html: ${fs.existsSync(indexPath) ? '✅' : '❌'} ${indexPath}`);

if (fs.existsSync(indexPath)) {
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    console.log('\n📄 Index.html analysis:');
    console.log(`Size: ${indexContent.length} bytes`);
    console.log(`Contains React root: ${indexContent.includes('id="root"') ? '✅' : '❌'}`);
    console.log(`Contains assets: ${indexContent.includes('/assets/') ? '✅' : '❌'}`);
    console.log(`Contains title: ${indexContent.includes('Techno Board') ? '✅' : '❌'}`);
    
    // Check if assets exist
    const assetsDir = path.join(publicPath, 'assets');
    if (fs.existsSync(assetsDir)) {
        const assets = fs.readdirSync(assetsDir);
        console.log(`Assets count: ${assets.length}`);
        
        const jsAssets = assets.filter(f => f.endsWith('.js'));
        const cssAssets = assets.filter(f => f.endsWith('.css'));
        console.log(`JS files: ${jsAssets.length}`);
        console.log(`CSS files: ${cssAssets.length}`);
    }
}

console.log('\n🔍 Frontend deployment analysis complete');

// Test if we can make a simple HTTP request to verify the server structure
console.log('\n🌐 The frontend should be accessible at: https://tech-board.up.railway.app');
console.log('📱 Try opening it in a web browser to test the React app');
console.log('🔧 If there are issues, check the browser console for JavaScript errors');