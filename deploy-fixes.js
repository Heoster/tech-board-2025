const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Deploying Tech Board fixes...\n');

try {
    // 1. Build the client
    console.log('1. Building React client...');
    process.chdir(path.join(__dirname, 'client'));
    execSync('npm run build', { stdio: 'inherit' });
    console.log('   ✅ Client built successfully\n');
    
    // 2. Copy client build to server
    console.log('2. Copying client build to server...');
    const clientBuildPath = path.join(__dirname, 'client', 'dist');
    const serverPublicPath = path.join(__dirname, 'server', 'public');
    
    // Remove existing public directory
    if (fs.existsSync(serverPublicPath)) {
        fs.rmSync(serverPublicPath, { recursive: true, force: true });
    }
    
    // Copy build to server public
    fs.cpSync(clientBuildPath, serverPublicPath, { recursive: true });
    console.log('   ✅ Client build copied to server\n');
    
    // 3. Install server dependencies
    console.log('3. Installing server dependencies...');
    process.chdir(path.join(__dirname, 'server'));
    execSync('npm install', { stdio: 'inherit' });
    console.log('   ✅ Server dependencies installed\n');
    
    // 4. Run database fixes
    console.log('4. Running database fixes...');
    process.chdir(__dirname);
    execSync('node fix-database-issues.js', { stdio: 'inherit' });
    console.log('   ✅ Database fixes completed\n');
    
    // 5. Test the application
    console.log('5. Testing application...');
    execSync('node test-quiz-generation.js', { stdio: 'inherit' });
    console.log('   ✅ Application tests passed\n');
    
    // 6. Create production environment file
    console.log('6. Creating production environment...');
    const prodEnvContent = `NODE_ENV=production
JWT_SECRET=tech-board-2025-super-secure-jwt-secret-key
CORS_ORIGIN=https://tech-board.up.railway.app
DB_PATH=./database/mcq_system_fixed.db
PORT=8000`;
    
    fs.writeFileSync(path.join(__dirname, 'server', '.env.production'), prodEnvContent);
    console.log('   ✅ Production environment configured\n');
    
    console.log('🎉 All fixes deployed successfully!\n');
    console.log('📋 Summary of fixes:');
    console.log('   ✅ Quiz Generation - Fixed database column references');
    console.log('   ✅ Admin Dashboard - Fixed table name references');
    console.log('   ✅ Student Management - Fixed password column references');
    console.log('   ✅ Database Schema - Verified and corrected');
    console.log('   ✅ Client Build - Updated and deployed');
    console.log('   ✅ Server Dependencies - Updated');
    console.log('\n🚀 Ready for Railway deployment!');
    console.log('\nNext steps:');
    console.log('1. Push to GitHub: git add . && git commit -m "Fix all critical issues" && git push');
    console.log('2. Deploy to Railway: railway up');
    console.log('3. Test at: https://tech-board.up.railway.app');
    
} catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
}