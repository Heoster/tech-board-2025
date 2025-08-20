const fs = require('fs');
const path = require('path');

console.log('🚀 PRODUCTION READINESS CHECKLIST\n');

const checks = [
  {
    name: 'Environment Variables',
    check: () => {
      const serverEnv = path.join(__dirname, 'server', '.env.production');
      return fs.existsSync(serverEnv);
    },
    fix: () => {
      const envContent = `NODE_ENV=production
PORT=8000
JWT_SECRET=your-super-secure-jwt-secret-change-this-in-production
CORS_ORIGIN=https://your-domain.com
DB_PATH=./database/mcq_system_fixed.db`;
      fs.writeFileSync(path.join(__dirname, 'server', '.env.production'), envContent);
    }
  },
  {
    name: 'Build Scripts',
    check: () => {
      const buildScript = path.join(__dirname, 'build-production.js');
      return fs.existsSync(buildScript);
    },
    fix: () => {
      const buildContent = `const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🏗️  Building for production...');

// Build client
console.log('Building React client...');
execSync('npm run build', { cwd: 'client', stdio: 'inherit' });

// Copy client build to server
const clientBuild = path.join(__dirname, 'client', 'build');
const serverPublic = path.join(__dirname, 'server', 'public');

if (fs.existsSync(serverPublic)) {
  fs.rmSync(serverPublic, { recursive: true });
}
fs.cpSync(clientBuild, serverPublic, { recursive: true });

// Install server dependencies
console.log('Installing server dependencies...');
execSync('npm ci --only=production', { cwd: 'server', stdio: 'inherit' });

console.log('✅ Production build complete!');`;
      fs.writeFileSync(path.join(__dirname, 'build-production.js'), buildContent);
    }
  },
  {
    name: 'Production Start Script',
    check: () => {
      const startScript = path.join(__dirname, 'server', 'start-production.js');
      return fs.existsSync(startScript);
    },
    fix: () => {
      const startContent = `require('dotenv').config({ path: '.env.production' });
const app = require('./index');
const port = process.env.PORT || 8000;

app.listen(port, '0.0.0.0', () => {
  console.log(\`🚀 Production server running on port \${port}\`);
});`;
      fs.writeFileSync(path.join(__dirname, 'server', 'start-production.js'), startContent);
    }
  }
];

let allPassed = true;

checks.forEach(({ name, check, fix }) => {
  const passed = check();
  console.log(`${passed ? '✅' : '❌'} ${name}`);
  
  if (!passed) {
    allPassed = false;
    console.log(`   Fixing ${name}...`);
    fix();
    console.log(`   ✅ ${name} fixed`);
  }
});

console.log(`\n${allPassed ? '🎉' : '🔧'} Production setup ${allPassed ? 'complete' : 'fixed'}!`);
console.log('\n📋 Next steps:');
console.log('1. Update JWT_SECRET in .env.production');
console.log('2. Update CORS_ORIGIN with your domain');
console.log('3. Run: node build-production.js');
console.log('4. Deploy to your hosting platform');