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

    // Step 2: Check if client build exists
    const clientPath = path.join(__dirname, 'server/client/index.html');
    if (fs.existsSync(clientPath)) {
      console.log('✅ Client build found');
    } else {
      console.log('⚠️ Client build not found, server will serve fallback HTML');
    }

    // Step 3: Set working directory and start server
    console.log('🚀 Starting server...');
    process.chdir('server');
    
    // Import and start the server
    require('./server/index.js');

  } catch (error) {
    console.error('❌ Railway startup failed:', error.message);
    process.exit(1);
  }
}

startRailwayApp();