const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
};

const currentLogLevel = logLevels[process.env.LOG_LEVEL] || logLevels.info;

const writeLog = (level, message, meta = {}) => {
    if (logLevels[level] > currentLogLevel) return;
    
    const timestamp = new Date().toISOString();
    const logEntry = {
        timestamp,
        level: level.toUpperCase(),
        message,
        ...meta
    };
    
    const logString = JSON.stringify(logEntry) + '\n';
    
    // Write to file
    const logFile = path.join(logDir, `${level}.log`);
    fs.appendFileSync(logFile, logString);
    
    // Also log to console in development
    if (process.env.NODE_ENV !== 'production') {
        console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`, meta);
    }
};

const logger = {
    error: (message, meta) => writeLog('error', message, meta),
    warn: (message, meta) => writeLog('warn', message, meta),
    info: (message, meta) => writeLog('info', message, meta),
    debug: (message, meta) => writeLog('debug', message, meta),
    database: (message, query, duration, meta = {}) => {
        if (logLevels.debug <= currentLogLevel) {
            writeLog('debug', message, {
                query: query ? query.substring(0, 100) : 'N/A',
                duration: `${duration}ms`,
                ...meta
            });
        }
    }
};

module.exports = logger;