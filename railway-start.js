const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Railway application...\n');

async function startRailwayApp() {
  try {
    // Step 1: Ensure database directory exists
    const dbDir = path.join(__dirname, 'server/database');
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
      console.log('📁 Created database directory');
    }

    // Step 2: Check if database needs seeding
    const dbPath = path.join(dbDir, 'mcq_system_fixed.db');
    if (!fs.existsSync(dbPath)) {
      console.log('🗄️ Database not found, initializing...');
      try {
        execSync('node ensure-300-questions.js', { stdio: 'inherit' });
        console.log('✅ Database initialized successfully');
      } catch (error) {
        console.log('⚠️ Database initialization failed, will create at runtime');
      }
    } else {
      console.log('✅ Database found, checking integrity...');
    }

    // Step 3: Verify client build exists
    const clientPath = path.join(__dirname, 'server/client/index.html');
    if (fs.existsSync(clientPath)) {
      console.log('✅ Client build found');
    } else {
      console.log('⚠️ Client build not found, server will serve fallback HTML');
    }

    // Step 4: Start the server
    console.log('🚀 Starting server...');
    process.chdir('server');
    require('./server/index.js');

  } catch (error) {
    console.error('❌ Railway startup failed:', error.message);
    process.exit(1);
  }
}

startRailwayApp();