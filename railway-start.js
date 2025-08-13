#!/usr/bin/env node

// Production startup script for Railway
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || 8000;

const path = require('path');
const fs = require('fs');

// Ensure database directory exists
const dbDir = path.join(__dirname, 'server', 'database');
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

// Copy database if it doesn't exist
const dbPath = path.join(dbDir, 'mcq_system_fixed.db');
const sourcePath = path.join(__dirname, 'database', 'mcq_system.db');

if (!fs.existsSync(dbPath) && fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, dbPath);
    console.log('Database copied to server directory');
}

// Set database path
process.env.DB_PATH = dbPath;

console.log('Starting Tech Board 2025 in production mode...');
console.log('Database path:', process.env.DB_PATH);
console.log('Port:', process.env.PORT);

// Start the server
require('./server/index.js');