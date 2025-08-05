// Simple script to verify server setup
console.log('🔍 Verifying MCQ Server Setup...\n');

try {
    // Test dotenv
    require('dotenv').config();
    console.log('✅ dotenv loaded successfully');
    console.log('   PORT:', process.env.PORT || 'Not set (will use 8000)');
    console.log('   JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not set');
    console.log('   DB_PATH:', process.env.DB_PATH || 'Not set');
    
    // Test other dependencies
    const express = require('express');
    console.log('✅ express loaded successfully');
    
    const cors = require('cors');
    console.log('✅ cors loaded successfully');
    
    const helmet = require('helmet');
    console.log('✅ helmet loaded successfully');
    
    const sqlite3 = require('sqlite3');
    console.log('✅ sqlite3 loaded successfully');
    
    const bcrypt = require('bcrypt');
    console.log('✅ bcrypt loaded successfully');
    
    const jwt = require('jsonwebtoken');
    console.log('✅ jsonwebtoken loaded successfully');
    
    // Test database file
    const fs = require('fs');
    const dbPath = process.env.DB_PATH || './database/mcq_system.db';
    if (fs.existsSync(dbPath)) {
        console.log('✅ Database file exists:', dbPath);
    } else {
        console.log('⚠️  Database file not found:', dbPath);
        console.log('   Run "npm run seed" to create and populate the database');
    }
    
    console.log('\n🎉 All dependencies verified successfully!');
    console.log('💡 You can now run "npm start" to start the server');
    
} catch (error) {
    console.error('❌ Setup verification failed:');
    console.error('Error:', error.message);
    console.error('\n🔧 To fix this issue:');
    console.error('1. Make sure you are in the server directory: cd server');
    console.error('2. Install dependencies: npm install');
    console.error('3. Check Node.js version: node --version (requires v16+)');
}