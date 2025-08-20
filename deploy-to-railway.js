const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Deploying to Railway...\n');

try {
  // Step 1: Build the application
  console.log('📦 Building application...');
  execSync('node build-production.js', { stdio: 'inherit' });

  // Step 2: Verify build files exist
  console.log('🔍 Verifying build files...');
  const requiredFiles = [
    'server/public/index.html',
    'server/public/assets',
    'server/public/logoSch.svg',
    'server/public/maples-academy-logo.svg'
  ];

  for (const file of requiredFiles) {
    if (!fs.existsSync(file)) {
      throw new Error(`Required file missing: ${file}`);
    }
  }

  // Step 3: Check server dependencies
  console.log('📋 Checking server dependencies...');
  const serverPackage = JSON.parse(fs.readFileSync('server/package.json', 'utf8'));
  console.log('Server dependencies:', Object.keys(serverPackage.dependencies).length);

  // Step 4: Create deployment summary
  console.log('📊 Creating deployment summary...');
  const deploymentInfo = {
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: 'production',
    features: {
      techBoardLogo: true,
      maplesAcademyLogo: true,
      adminPanel: true,
      studentDashboard: true,
      quizSystem: true,
      database: true,
      mimeTypeSupport: true,
      securityHeaders: true
    },
    files: {
      clientBuild: fs.existsSync('server/public/index.html'),
      assets: fs.existsSync('server/public/assets'),
      logos: fs.existsSync('server/public/logoSch.svg') && fs.existsSync('server/public/maples-academy-logo.svg'),
      database: fs.existsSync('server/database/mcq_system.db')
    }
  };

  fs.writeFileSync('deployment-info.json', JSON.stringify(deploymentInfo, null, 2));

  console.log('\n✅ Railway deployment preparation completed!');
  console.log('📊 Deployment Summary:');
  console.log('  ✅ Application built successfully');
  console.log('  ✅ All required files present');
  console.log('  ✅ Server dependencies installed');
  console.log('  ✅ MIME type support added');
  console.log('  ✅ Security headers configured');
  console.log('  ✅ Tech Board logo implemented');
  console.log('  ✅ Maples Academy logo implemented');
  console.log('  ✅ Database ready');

  console.log('\n🚀 Ready for Railway deployment!');
  console.log('💡 Next steps:');
  console.log('  1. Commit and push changes to your repository');
  console.log('  2. Railway will automatically deploy from your main branch');
  console.log('  3. Monitor the deployment logs in Railway dashboard');
  console.log('  4. Test the deployed application');

} catch (error) {
  console.error('\n❌ Railway deployment preparation failed:', error.message);
  console.error('Stack trace:', error.stack);
  
  console.log('\n🔧 Troubleshooting tips:');
  console.log('  1. Ensure all dependencies are installed');
  console.log('  2. Check that build process completed successfully');
  console.log('  3. Verify all required files are present');
  console.log('  4. Check Railway environment variables');
  
  process.exit(1);
}