const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};

const currentLogLevel = logLevels[process.env.LOG_LEVEL] || logLevels.info;

const logger = {
  error: (message, meta = {}) => {
    if (currentLogLevel >= logLevels.error) {
      const logEntry = {
        timestamp: new Date().toISOString(),
        level: 'ERROR',
        message,
        ...meta
      };
      console.error(JSON.stringify(logEntry));
      
      // Write to error log file in production
      if (process.env.NODE_ENV === 'production') {
        fs.appendFileSync(
          path.join(logsDir, 'error.log'),
          JSON.stringify(logEntry) + '\n'
        );
      }
    }
  },

  warn: (message, meta = {}) => {
    if (currentLogLevel >= logLevels.warn) {
      const logEntry = {
        timestamp: new Date().toISOString(),
        level: 'WARN',
        message,
        ...meta
      };
      console.warn(JSON.stringify(logEntry));
    }
  },

  info: (message, meta = {}) => {
    if (currentLogLevel >= logLevels.info) {
      const logEntry = {
        timestamp: new Date().toISOString(),
        level: 'INFO',
        message,
        ...meta
      };
      console.log(JSON.stringify(logEntry));
    }
  },

  debug: (message, meta = {}) => {
    if (currentLogLevel >= logLevels.debug) {
      const logEntry = {
        timestamp: new Date().toISOString(),
        level: 'DEBUG',
        message,
        ...meta
      };
      console.log(JSON.stringify(logEntry));
    }
  }
};

module.exports = logger;