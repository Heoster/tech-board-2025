#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Building Tech Board 2025 for Railway...');

try {
    // Install client dependencies and build
    console.log('📦 Installing client dependencies...');
    execSync('cd client && npm install', { stdio: 'inherit' });
    
    console.log('🏗️ Building client...');
    execSync('cd client && npm run build', { stdio: 'inherit' });
    
    // Install server dependencies
    console.log('📦 Installing server dependencies...');
    execSync('cd server && npm install --production', { stdio: 'inherit' });
    
    // Copy client build to server public directory
    const clientBuildPath = path.join(__dirname, 'client', 'dist');
    const serverPublicPath = path.join(__dirname, 'server', 'public');
    
    console.log('📁 Build paths:');
    console.log('  Client build:', clientBuildPath);
    console.log('  Server public:', serverPublicPath);
    console.log('  Client build exists:', fs.existsSync(clientBuildPath));
    
    if (fs.existsSync(clientBuildPath)) {
        console.log('📁 Copying client build to server...');
        
        // Remove existing public directory
        if (fs.existsSync(serverPublicPath)) {
            fs.rmSync(serverPublicPath, { recursive: true, force: true });
        }
        
        // Ensure server directory exists
        fs.mkdirSync(path.dirname(serverPublicPath), { recursive: true });
        
        // Copy dist to public
        fs.cpSync(clientBuildPath, serverPublicPath, { recursive: true });
        
        // Verify copy
        const indexExists = fs.existsSync(path.join(serverPublicPath, 'index.html'));
        console.log('✅ Client build copied successfully');
        console.log('  Index.html exists:', indexExists);
        
        if (!indexExists) {
            console.error('❌ index.html not found after copy');
            process.exit(1);
        }
    } else {
        console.error('❌ Client build not found at:', clientBuildPath);
        
        // List what's in client directory
        const clientDir = path.join(__dirname, 'client');
        if (fs.existsSync(clientDir)) {
            console.log('Client directory contents:', fs.readdirSync(clientDir));
        }
        
        process.exit(1);
    }
    
    // Ensure database directory exists
    const dbDir = path.join(__dirname, 'server', 'database');
    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
    }
    
    console.log('✅ Build completed successfully');
    
} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
}