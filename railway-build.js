const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Railway build process...\n');

try {
  // Step 1: Ensure we're in the right directory
  console.log('📁 Current directory:', process.cwd());
  
  // Step 2: Clean previous builds
  console.log('🧹 Cleaning previous builds...');
  if (fs.existsSync('client/dist')) {
    fs.rmSync('client/dist', { recursive: true, force: true });
  }
  if (fs.existsSync('server/client')) {
    fs.rmSync('server/client', { recursive: true, force: true });
  }

  // Step 3: Create necessary directories
  console.log('📁 Creating necessary directories...');
  if (!fs.existsSync('server/database')) {
    fs.mkdirSync('server/database', { recursive: true });
  }

  // Step 4: Install client dependencies
  console.log('📦 Installing client dependencies...');
  execSync('npm install', { cwd: 'client', stdio: 'inherit' });

  // Step 5: Build React client
  console.log('⚛️ Building React client for production...');
  execSync('npm run build', { cwd: 'client', stdio: 'inherit' });

  // Step 6: Copy client build to server
  console.log('📁 Copying client build to server...');
  const clientDistPath = path.join(__dirname, 'client/dist');
  const serverClientPath = path.join(__dirname, 'server/client');
  
  if (fs.existsSync(clientDistPath)) {
    fs.cpSync(clientDistPath, serverClientPath, { recursive: true });
    console.log('✅ Client build copied successfully');
  } else {
    console.log('⚠️ Client build not found, will serve fallback HTML');
  }

  // Step 7: Install server dependencies
  console.log('🔧 Installing server dependencies...');
  execSync('npm install --omit=dev', { cwd: 'server', stdio: 'inherit' });

  // Step 8: Verify build
  console.log('🔍 Verifying build...');
  const indexPath = path.join(serverClientPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log('✅ Build verification successful');
    const stats = fs.statSync(indexPath);
    console.log(`📊 index.html size: ${(stats.size / 1024).toFixed(2)} KB`);
  } else {
    console.log('⚠️ No client build found, server will serve fallback HTML');
  }

  console.log('\n🎉 Railway build completed successfully!');
  console.log('📊 Build Summary:');
  console.log('  ✅ Client dependencies installed');
  console.log('  ✅ React client built for production');
  console.log('  ✅ Server dependencies installed');
  console.log('  ✅ Static files ready for serving');
  console.log('\n🚀 Ready for Railway deployment!');

} catch (error) {
  console.error('\n❌ Railway build failed:', error.message);
  console.error('Stack trace:', error.stack);
  process.exit(1);
}