#!/usr/bin/env node
const path = require('path');

// Set production environment
process.env.NODE_ENV = 'production';
process.env.DB_PATH = path.join(__dirname, 'database/mcq_system_fixed.db');

// Start the server
require('./index.js');
