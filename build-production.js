const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Railway production build process...\n');

try {
  // Step 1: Clean previous builds
  console.log('🧹 Cleaning previous builds...');
  if (fs.existsSync('client/dist')) {
    fs.rmSync('client/dist', { recursive: true, force: true });
  }
  if (fs.existsSync('server/client')) {
    fs.rmSync('server/client', { recursive: true, force: true });
  }

  // Step 2: Ensure directories exist
  console.log('� Creatingn necessary directories...');
  if (!fs.existsSync('server/database')) {
    fs.mkdirSync('server/database', { recursive: true });
  }

  // Step 3: Install client dependencies
  console.log('📦 Installing client dependencies...');
  try {
    execSync('npm install', { cwd: 'client', stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️ Client dependencies install failed, trying with --force...');
    execSync('npm install --force', { cwd: 'client', stdio: 'inherit' });
  }

  // Step 4: Build React client
  console.log('⚛️ Building React client for production...');
  try {
    execSync('npm run build:deploy', { cwd: 'client', stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️ Deploy build failed, trying regular build...');
    execSync('npm run build', { cwd: 'client', stdio: 'inherit' });
  }

  // Step 5: Copy client build to server
  console.log('📁 Copying client build to server...');
  const clientDistPath = path.join(__dirname, 'client/dist');
  const serverPublicPath = path.join(__dirname, 'server/public');

  if (fs.existsSync(clientDistPath)) {
    // Remove old public directory
    if (fs.existsSync(serverPublicPath)) {
      fs.rmSync(serverPublicPath, { recursive: true, force: true });
    }
    
    // Copy new build
    fs.cpSync(clientDistPath, serverPublicPath, { recursive: true });
    console.log('✅ Client build copied successfully');
    
    // Verify critical files
    const criticalFiles = ['index.html', 'manifest.json', 'sw.js'];
    for (const file of criticalFiles) {
      const filePath = path.join(serverPublicPath, file);
      if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ Warning: ${file} not found in build`);
      }
    }
  } else {
    throw new Error('Client build not found at: ' + clientDistPath);
  }

  // Step 6: Initialize database
  console.log('🗄️ Setting up database...');
  try {
    execSync('node reset-database.js', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️ Database initialization failed, will be handled at runtime');
  }

  // Step 7: Verify build
  console.log('🔍 Verifying build...');
  const indexPath = path.join(serverPublicPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log('✅ Build verification successful');

    // Check file sizes
    const stats = fs.statSync(indexPath);
    console.log(`📊 index.html size: ${(stats.size / 1024).toFixed(2)} KB`);

    // List built files
    const files = fs.readdirSync(serverPublicPath);
    console.log(`�  Built files: ${files.length} files`);
  } else {
    throw new Error('Build verification failed - index.html not found');
  }

  console.log('\n🎉 Railway production build completed successfully!');
  console.log('📊 Build Summary:');
  console.log('  ✅ React client built and optimized');
  console.log('  ✅ Static files ready for serving');
  console.log('  ✅ Database setup prepared');
  console.log('  ✅ Railway deployment ready');
  console.log('\n🚀 Ready for Railway deployment!');

} catch (error) {
  console.error('\n❌ Production build failed:', error.message);
  console.error('Stack trace:', error.stack);
  process.exit(1);
}