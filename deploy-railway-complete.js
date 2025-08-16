#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Deploying Tech Board 2025 to Railway...\n');

async function deployToRailway() {
    try {
        // 1. Run production setup first
        console.log('🔧 Running production setup...');
        execSync('node production-ready-setup.js', { stdio: 'inherit' });
        console.log('✅ Production setup completed\n');

        // 2. Update Railway configuration
        console.log('⚙️ Updating Railway configuration...');
        updateRailwayConfig();
        console.log('✅ Railway configuration updated\n');

        // 3. Update package.json scripts
        console.log('📦 Updating package.json scripts...');
        updatePackageScripts();
        console.log('✅ Package scripts updated\n');

        // 4. Create Railway environment variables guide
        console.log('📋 Creating environment variables guide...');
        createEnvGuide();
        console.log('✅ Environment guide created\n');

        // 5. Test build process
        console.log('🧪 Testing build process...');
        testBuild();
        console.log('✅ Build test completed\n');

        // 6. Create deployment verification script
        console.log('🔍 Creating deployment verification...');
        createVerificationScript();
        console.log('✅ Verification script created\n');

        console.log('🎉 Railway deployment preparation completed!\n');
        console.log('📋 Next steps:');
        console.log('  1. Install Railway CLI: npm install -g @railway/cli');
        console.log('  2. Login to Railway: railway login');
        console.log('  3. Initialize project: railway init');
        console.log('  4. Set environment variables (see railway-env-guide.md)');
        console.log('  5. Deploy: railway up');
        console.log('  6. Verify deployment: node verify-railway-deployment.js');

    } catch (error) {
        console.error('❌ Railway deployment preparation failed:', error.message);
        process.exit(1);
    }
}

function updateRailwayConfig() {
    const railwayConfig = {
        "$schema": "https://railway.com/railway.schema.json",
        "deploy": {
            "runtime": "V2",
            "numReplicas": 1,
            "startCommand": "node server/index.js",
            "sleepApplication": false,
            "restartPolicyType": "ON_FAILURE",
            "restartPolicyMaxRetries": 10
        }
    };

    fs.writeFileSync('railway.json', JSON.stringify(railwayConfig, null, 2));

    const nixpacksConfig = `[phases.build]
cmds = [
  "npm install --prefix server --production",
  "npm install --prefix client",
  "npm run build --prefix client",
  "mkdir -p server/public",
  "cp -r client/dist/* server/public/ || echo 'No dist files to copy'",
  "node production-ready-setup.js"
]

[phases.start]
cmd = "node server/index.js"

[variables]
NODE_ENV = "production"
JWT_SECRET = "tech-board-2025-secure-jwt-secret-key-production"
PORT = "8080"
CORS_ORIGIN = "https://tech-board.up.railway.app"
`;

    fs.writeFileSync('nixpacks.toml', nixpacksConfig);
}

function updatePackageScripts() {
    const packagePath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

    packageJson.scripts = {
        ...packageJson.scripts,
        "start": "node server/index.js",
        "build": "node production-ready-setup.js",
        "deploy:railway": "railway up",
        "verify:railway": "node verify-railway-deployment.js",
        "setup:production": "node production-ready-setup.js",
        "monitor:production": "node monitor.js",
        "logs:railway": "railway logs",
        "status:railway": "railway status"
    };

    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
}

function createEnvGuide() {
    const envGuide = `# Railway Environment Variables Setup Guide

## Required Environment Variables

Set these variables in your Railway dashboard:

### Core Configuration
\`\`\`
NODE_ENV=production
PORT=8080
JWT_SECRET=tech-board-2025-secure-jwt-secret-key-production-${Date.now()}
\`\`\`

### CORS Configuration
\`\`\`
CORS_ORIGIN=https://your-app-name.up.railway.app
\`\`\`

### Database Configuration
\`\`\`
DB_PATH=./database/mcq_system_fixed.db
\`\`\`

### Optional Configuration
\`\`\`
LOG_LEVEL=info
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=200
SESSION_TIMEOUT=3600
QUIZ_TIME_LIMIT=3000
\`\`\`

## How to Set Environment Variables

1. Go to your Railway project dashboard
2. Click on your service
3. Go to the "Variables" tab
4. Add each variable with its value
5. Deploy your application

## Important Notes

- Replace \`your-app-name\` in CORS_ORIGIN with your actual Railway app name
- JWT_SECRET should be a long, random string for security
- Never commit sensitive environment variables to version control

## Default Admin Credentials

- Username: \`admin\`
- Password: \`admin123\`
- **Important**: Change the admin password after first login!

## Health Check

After deployment, verify your app is working:
- Health endpoint: \`https://your-app-name.up.railway.app/api/health\`
- Admin login: \`https://your-app-name.up.railway.app/admin/login\`
- Student registration: \`https://your-app-name.up.railway.app/register\`
`;

    fs.writeFileSync('railway-env-guide.md', envGuide);
}

function testBuild() {
    try {
        // Test client build
        console.log('  Testing client build...');
        execSync('cd client && npm run build', { stdio: 'pipe' });
        
        // Verify build output
        const buildPath = path.join(__dirname, 'client', 'dist');
        if (!fs.existsSync(path.join(buildPath, 'index.html'))) {
            throw new Error('Client build failed - index.html not found');
        }
        
        console.log('  ✅ Client build successful');
        
        // Test server dependencies
        console.log('  Testing server dependencies...');
        execSync('cd server && npm list --depth=0', { stdio: 'pipe' });
        console.log('  ✅ Server dependencies verified');
        
    } catch (error) {
        throw new Error(`Build test failed: ${error.message}`);
    }
}

function createVerificationScript() {
    const verificationScript = `#!/usr/bin/env node

const https = require('https');
const http = require('http');

const RAILWAY_URL = process.env.RAILWAY_URL || 'https://tech-board.up.railway.app';

console.log('🔍 Verifying Railway deployment...\\n');

async function verifyDeployment() {
    try {
        // Test health endpoint
        console.log('Testing health endpoint...');
        const healthData = await makeRequest(\`\${RAILWAY_URL}/api/health\`);
        
        if (healthData.status === 'OK') {
            console.log('✅ Health check passed');
            console.log(\`  Database: \${healthData.database.connected ? 'Connected' : 'Disconnected'}\`);
            console.log(\`  Questions: \${healthData.questions.total}/1500\`);
            console.log(\`  Features: \${Object.keys(healthData.features).length} available\`);
        } else {
            throw new Error('Health check failed');
        }

        // Test API endpoint
        console.log('\\nTesting API endpoint...');
        const apiData = await makeRequest(\`\${RAILWAY_URL}/api\`);
        console.log(\`✅ API endpoint working - Version: \${apiData.version}\`);

        // Test static file serving
        console.log('\\nTesting static file serving...');
        const indexResponse = await makeRequest(RAILWAY_URL);
        if (indexResponse.includes('<title>')) {
            console.log('✅ Static files served correctly');
        } else {
            throw new Error('Static files not served correctly');
        }

        console.log('\\n🎉 Railway deployment verification completed successfully!');
        console.log('\\n📋 Application URLs:');
        console.log(\`  Main App: \${RAILWAY_URL}\`);
        console.log(\`  Admin Login: \${RAILWAY_URL}/admin/login\`);
        console.log(\`  Student Registration: \${RAILWAY_URL}/register\`);
        console.log(\`  Health Check: \${RAILWAY_URL}/api/health\`);
        console.log(\`  API Info: \${RAILWAY_URL}/api\`);

        console.log('\\n🔐 Default Admin Credentials:');
        console.log('  Username: admin');
        console.log('  Password: admin123');
        console.log('  ⚠️ Change password after first login!');

    } catch (error) {
        console.error('❌ Deployment verification failed:', error.message);
        process.exit(1);
    }
}

function makeRequest(url) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        
        const req = client.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        resolve(JSON.parse(data));
                    } catch {
                        resolve(data);
                    }
                } else {
                    reject(new Error(\`HTTP \${res.statusCode}: \${res.statusMessage}\`));
                }
            });
        });

        req.on('error', reject);
        req.setTimeout(10000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });
    });
}

verifyDeployment();`;

    fs.writeFileSync('verify-railway-deployment.js', verificationScript);
    fs.chmodSync('verify-railway-deployment.js', '755');
}

// Run deployment preparation
deployToRailway().catch(console.error);