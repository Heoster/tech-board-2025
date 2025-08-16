#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, 'logs', 'monitoring.log');

function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    console.log(logMessage.trim());
    fs.appendFileSync(LOG_FILE, logMessage);
}

function checkHealth() {
    const req = http.get('http://localhost:8000/api/health', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            if (res.statusCode === 200) {
                const health = JSON.parse(data);
                log(`Health check passed - Status: ${health.status}, Questions: ${health.questions.total}`);
            } else {
                log(`Health check failed - Status: ${res.statusCode}`);
            }
        });
    });

    req.on('error', (error) => {
        log(`Health check error: ${error.message}`);
    });

    req.setTimeout(5000, () => {
        req.destroy();
        log('Health check timeout');
    });
}

// Check every 5 minutes
setInterval(checkHealth, 5 * 60 * 1000);

// Initial check
checkHealth();

log('Monitoring started');
