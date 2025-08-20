#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Deploying registration fix...');

try {
    // Check if we have the built files
    const clientDistPath = path.join(__dirname, 'client', 'dist');
    const serverPublicPath = path.join(__dirname, 'server', 'public');
    
    if (!fs.existsSync(clientDistPath)) {
        console.log('📦 Building client...');
        execSync('npm run build --prefix client', { stdio: 'inherit' });
    }
    
    // Copy client files to server
    console.log('📁 Copying client files to server...');
    if (!fs.existsSync(serverPublicPath)) {
        fs.mkdirSync(serverPublicPath, { recursive: true });
    }
    
    // Copy files (Windows compatible)
    execSync(`xcopy "${clientDistPath}\\*" "${serverPublicPath}\\" /E /Y /Q`, { stdio: 'inherit' });
    
    console.log('✅ Deployment preparation complete!');
    console.log('');
    console.log('🔧 Manual deployment steps:');
    console.log('1. The server code has been updated to handle both rollNumber and roll_number');
    console.log('2. The client has been rebuilt with the fix');
    console.log('3. Files are ready in server/public/');
    console.log('');
    console.log('📤 To deploy to Railway:');
    console.log('   - Push changes to your Git repository');
    console.log('   - Railway will automatically redeploy');
    console.log('');
    console.log('🧪 Test the fix:');
    console.log('   Visit: https://tech-board.up.railway.app/register');
    
} catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
}