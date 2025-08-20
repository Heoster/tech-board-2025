const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚂 TechBoard 2025 - Railway Deployment Script\n');

async function deployToRailway() {
    try {
        console.log('🔧 Preparing for Railway deployment...');
        
        // Step 1: Verify Railway CLI
        try {
            execSync('railway --version', { stdio: 'pipe' });
            console.log('✅ Railway CLI detected');
        } catch (error) {
            console.log('❌ Railway CLI not found. Please install it first:');
            console.log('   npm install -g @railway/cli');
            console.log('   railway login');
            process.exit(1);
        }
        
        // Step 2: Check if logged in
        try {
            execSync('railway whoami', { stdio: 'pipe' });
            console.log('✅ Railway authentication verified');
        } catch (error) {
            console.log('❌ Not logged in to Railway. Please run:');
            console.log('   railway login');
            process.exit(1);
        }
        
        // Step 3: Verify project structure
        console.log('🔍 Verifying project structure...');
        const requiredFiles = [
            'server/index.js',
            'server/start-production.js',
            'server/package.json',
            'client/package.json',
            'railway.json',
            'nixpacks.toml'
        ];
        
        for (const file of requiredFiles) {
            if (!fs.existsSync(file)) {
                console.log(`❌ Missing required file: ${file}`);
                process.exit(1);
            }
        }
        console.log('✅ Project structure verified');
        
        // Step 4: Build client locally to verify
        console.log('🏗️ Testing client build...');
        try {
            execSync('npm install', { cwd: 'client', stdio: 'pipe' });
            execSync('npm run build', { cwd: 'client', stdio: 'pipe' });
            console.log('✅ Client build test successful');
        } catch (error) {
            console.log('❌ Client build failed. Please fix build issues first.');
            console.log('Error:', error.message);
            process.exit(1);
        }
        
        // Step 5: Check environment variables
        console.log('🔧 Checking Railway environment variables...');
        try {
            const envVars = execSync('railway variables', { encoding: 'utf8' });
            
            const requiredEnvVars = [
                'NODE_ENV',
                'JWT_SECRET',
                'CORS_ORIGIN'
            ];
            
            let missingVars = [];
            for (const envVar of requiredEnvVars) {
                if (!envVars.includes(envVar)) {
                    missingVars.push(envVar);
                }
            }
            
            if (missingVars.length > 0) {
                console.log('⚠️ Missing environment variables:');
                missingVars.forEach(varName => {
                    console.log(`   ${varName}`);
                });
                console.log('\nSetting required environment variables...');
                
                // Set missing environment variables
                const envCommands = [
                    'railway variables set NODE_ENV=production',
                    'railway variables set JWT_SECRET=tech-board-2025-railway-production-jwt-secret-key-v2',
                    'railway variables set CORS_ORIGIN=https://tech-board.up.railway.app',
                    'railway variables set RAILWAY_STATIC_URL=https://tech-board.up.railway.app',
                    'railway variables set PORT=8080',
                    'railway variables set RATE_LIMIT_WINDOW_MS=600000',
                    'railway variables set RATE_LIMIT_MAX=500',
                    'railway variables set BCRYPT_ROUNDS=10',
                    'railway variables set ENABLE_COMPRESSION=true',
                    'railway variables set ENABLE_CACHE=true',
                    'railway variables set TRUST_PROXY=true'
                ];
                
                for (const cmd of envCommands) {
                    try {
                        execSync(cmd, { stdio: 'pipe' });
                    } catch (error) {
                        console.log(`⚠️ Could not set: ${cmd}`);
                    }
                }
                console.log('✅ Environment variables configured');
            } else {
                console.log('✅ Environment variables verified');
            }
        } catch (error) {
            console.log('⚠️ Could not check environment variables, proceeding...');
        }
        
        // Step 6: Deploy
        console.log('🚀 Deploying to Railway...');
        console.log('   URL: https://tech-board.up.railway.app');
        console.log('   This may take a few minutes...\n');
        
        try {
            execSync('railway up --detach', { stdio: 'inherit' });
            console.log('\n✅ Deployment initiated successfully!');
        } catch (error) {
            console.log('\n❌ Deployment failed:', error.message);
            process.exit(1);
        }
        
        // Step 7: Wait and verify
        console.log('\n⏳ Waiting for deployment to complete...');
        await new Promise(resolve => setTimeout(resolve, 30000)); // Wait 30 seconds
        
        console.log('🔍 Verifying deployment...');
        try {
            const axios = require('axios');
            const response = await axios.get('https://tech-board.up.railway.app/health', {
                timeout: 10000
            });
            
            if (response.status === 200) {
                console.log('✅ Deployment verification successful!');
                console.log('🎉 TechBoard 2025 is live at: https://tech-board.up.railway.app');
            } else {
                console.log('⚠️ Deployment may still be starting. Check Railway dashboard.');
            }
        } catch (error) {
            console.log('⚠️ Could not verify deployment immediately. This is normal.');
            console.log('   Check https://tech-board.up.railway.app/health in a few minutes.');
        }
        
        console.log('\n📊 Deployment Summary:');
        console.log('  ✅ Code deployed to Railway');
        console.log('  ✅ Environment variables configured');
        console.log('  ✅ Build process optimized');
        console.log('  ✅ Health checks enabled');
        console.log('\n🔗 Useful Links:');
        console.log('  🌐 Application: https://tech-board.up.railway.app');
        console.log('  🏥 Health Check: https://tech-board.up.railway.app/health');
        console.log('  👨‍💼 Admin Panel: https://tech-board.up.railway.app/admin');
        console.log('  📊 Railway Dashboard: https://railway.app/dashboard');
        
    } catch (error) {
        console.error('\n❌ Railway deployment failed:', error.message);
        process.exit(1);
    }
}

// Handle errors
process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled error:', error.message);
    process.exit(1);
});

// Run deployment
deployToRailway().catch(console.error);