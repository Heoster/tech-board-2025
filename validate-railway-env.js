const fs = require('fs');
const path = require('path');

console.log('🔍 TechBoard 2025 - Railway Environment Validation\n');

function validateEnvironment() {
    const issues = [];
    const warnings = [];
    
    // Check required files
    const requiredFiles = [
        'server/index.js',
        'server/start-production.js',
        'server/package.json',
        'client/package.json',
        'railway.json',
        'nixpacks.toml',
        'server/.env.production'
    ];
    
    console.log('📁 Checking required files...');
    for (const file of requiredFiles) {
        if (fs.existsSync(file)) {
            console.log(`  ✅ ${file}`);
        } else {
            console.log(`  ❌ ${file} - MISSING`);
            issues.push(`Missing required file: ${file}`);
        }
    }
    
    // Check package.json scripts
    console.log('\n📦 Checking package.json configurations...');
    
    try {
        const serverPackage = JSON.parse(fs.readFileSync('server/package.json', 'utf8'));
        
        if (serverPackage.scripts && serverPackage.scripts.start) {
            console.log('  ✅ Server start script configured');
        } else {
            console.log('  ❌ Server start script missing');
            issues.push('Server package.json missing start script');
        }
        
        if (serverPackage.engines && serverPackage.engines.node) {
            console.log(`  ✅ Node.js version specified: ${serverPackage.engines.node}`);
        } else {
            console.log('  ⚠️ Node.js version not specified');
            warnings.push('Consider specifying Node.js version in server/package.json engines field');
        }
        
    } catch (error) {
        console.log('  ❌ Error reading server/package.json');
        issues.push('Cannot read server/package.json');
    }
    
    try {
        const clientPackage = JSON.parse(fs.readFileSync('client/package.json', 'utf8'));
        
        if (clientPackage.scripts && clientPackage.scripts.build) {
            console.log('  ✅ Client build script configured');
        } else {
            console.log('  ❌ Client build script missing');
            issues.push('Client package.json missing build script');
        }
        
    } catch (error) {
        console.log('  ❌ Error reading client/package.json');
        issues.push('Cannot read client/package.json');
    }
    
    // Check Railway configuration
    console.log('\n🚂 Checking Railway configuration...');
    
    try {
        const railwayConfig = JSON.parse(fs.readFileSync('railway.json', 'utf8'));
        
        if (railwayConfig.deploy && railwayConfig.deploy.startCommand) {
            console.log(`  ✅ Start command: ${railwayConfig.deploy.startCommand}`);
        } else {
            console.log('  ❌ Start command not configured');
            issues.push('Railway start command not configured');
        }
        
        if (railwayConfig.deploy && railwayConfig.deploy.healthcheckPath) {
            console.log(`  ✅ Health check: ${railwayConfig.deploy.healthcheckPath}`);
        } else {
            console.log('  ⚠️ Health check not configured');
            warnings.push('Consider adding health check configuration');
        }
        
    } catch (error) {
        console.log('  ❌ Error reading railway.json');
        issues.push('Cannot read railway.json');
    }
    
    // Check nixpacks configuration
    try {
        const nixpacksConfig = fs.readFileSync('nixpacks.toml', 'utf8');
        
        if (nixpacksConfig.includes('nodejs_20')) {
            console.log('  ✅ Node.js 20 specified in nixpacks.toml');
        } else {
            console.log('  ⚠️ Node.js version not specified in nixpacks.toml');
            warnings.push('Consider specifying Node.js version in nixpacks.toml');
        }
        
        if (nixpacksConfig.includes('npm run build')) {
            console.log('  ✅ Build command configured in nixpacks.toml');
        } else {
            console.log('  ⚠️ Build command not found in nixpacks.toml');
            warnings.push('Build command should be configured in nixpacks.toml');
        }
        
    } catch (error) {
        console.log('  ❌ Error reading nixpacks.toml');
        issues.push('Cannot read nixpacks.toml');
    }
    
    // Check environment variables
    console.log('\n🔧 Checking environment configuration...');
    
    try {
        const envContent = fs.readFileSync('server/.env.production', 'utf8');
        
        const requiredEnvVars = [
            'NODE_ENV',
            'PORT',
            'JWT_SECRET',
            'CORS_ORIGIN'
        ];
        
        for (const envVar of requiredEnvVars) {
            if (envContent.includes(`${envVar}=`)) {
                console.log(`  ✅ ${envVar} configured`);
            } else {
                console.log(`  ❌ ${envVar} missing`);
                issues.push(`Environment variable ${envVar} not configured`);
            }
        }
        
        if (envContent.includes('tech-board.up.railway.app')) {
            console.log('  ✅ Railway URL configured');
        } else {
            console.log('  ⚠️ Railway URL not found in environment');
            warnings.push('Railway URL should be configured in environment variables');
        }
        
    } catch (error) {
        console.log('  ❌ Error reading .env.production');
        issues.push('Cannot read server/.env.production');
    }
    
    // Check static files
    console.log('\n📄 Checking static files...');
    
    const staticFiles = [
        'server/public/index.html',
        'server/public/manifest.json'
    ];
    
    for (const file of staticFiles) {
        if (fs.existsSync(file)) {
            console.log(`  ✅ ${file}`);
        } else {
            console.log(`  ⚠️ ${file} - Not found (will be built during deployment)`);
            warnings.push(`Static file ${file} not found - ensure build process creates it`);
        }
    }
    
    // Summary
    console.log('\n📊 Validation Summary:');
    console.log(`  Issues: ${issues.length}`);
    console.log(`  Warnings: ${warnings.length}`);
    
    if (issues.length > 0) {
        console.log('\n❌ Critical Issues:');
        issues.forEach((issue, index) => {
            console.log(`  ${index + 1}. ${issue}`);
        });
    }
    
    if (warnings.length > 0) {
        console.log('\n⚠️ Warnings:');
        warnings.forEach((warning, index) => {
            console.log(`  ${index + 1}. ${warning}`);
        });
    }
    
    if (issues.length === 0) {
        console.log('\n🎉 Railway deployment validation passed!');
        console.log('✅ Your app is ready for Railway deployment');
        console.log('\n🚀 To deploy:');
        console.log('  1. railway login');
        console.log('  2. railway link (if not already linked)');
        console.log('  3. railway up');
        console.log('\n🔗 Your app will be available at: https://tech-board.up.railway.app');
        return true;
    } else {
        console.log('\n❌ Railway deployment validation failed!');
        console.log('Please fix the critical issues above before deploying.');
        return false;
    }
}

// Run validation
const isValid = validateEnvironment();
process.exit(isValid ? 0 : 1);