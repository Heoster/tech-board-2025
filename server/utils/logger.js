const fs = require('fs');
const path = require('path');

class ProductionLogger {
  constructor() {
    this.logDir = path.join(__dirname, '../logs');
    this.ensureLogDirectory();
    this.logLevel = process.env.LOG_LEVEL || 'info';
    this.maxLogSize = 10 * 1024 * 1024; // 10MB
    this.maxLogFiles = 5;
  }

  ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  formatLogEntry(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const entry = {
      timestamp,
      level: level.toUpperCase(),
      message,
      ...meta,
      nodeEnv: process.env.NODE_ENV,
      pid: process.pid
    };

    return JSON.stringify(entry) + '\n';
  }

  shouldLog(level) {
    const levels = { error: 0, warn: 1, info: 2, debug: 3 };
    return levels[level] <= levels[this.logLevel];
  }

  rotateLogIfNeeded(logFile) {
    try {
      if (fs.existsSync(logFile)) {
        const stats = fs.statSync(logFile);
        if (stats.size > this.maxLogSize) {
          // Rotate logs
          for (let i = this.maxLogFiles - 1; i > 0; i--) {
            const oldFile = `${logFile}.${i}`;
            const newFile = `${logFile}.${i + 1}`;
            if (fs.existsSync(oldFile)) {
              if (i === this.maxLogFiles - 1) {
                fs.unlinkSync(oldFile); // Delete oldest
              } else {
                fs.renameSync(oldFile, newFile);
              }
            }
          }
          fs.renameSync(logFile, `${logFile}.1`);
        }
      }
    } catch (error) {
      console.error('Log rotation failed:', error);
    }
  }

  writeToFile(logFile, entry) {
    try {
      this.rotateLogIfNeeded(logFile);
      fs.appendFileSync(logFile, entry);
    } catch (error) {
      console.error('Failed to write to log file:', error);
      console.log(entry); // Fallback to console
    }
  }

  error(message, meta = {}) {
    if (!this.shouldLog('error')) return;

    const entry = this.formatLogEntry('error', message, {
      ...meta,
      stack: meta.error?.stack
    });

    console.error(entry);
    this.writeToFile(path.join(this.logDir, 'error.log'), entry);
    this.writeToFile(path.join(this.logDir, 'combined.log'), entry);
  }

  warn(message, meta = {}) {
    if (!this.shouldLog('warn')) return;

    const entry = this.formatLogEntry('warn', message, meta);
    console.warn(entry);
    this.writeToFile(path.join(this.logDir, 'combined.log'), entry);
  }

  info(message, meta = {}) {
    if (!this.shouldLog('info')) return;

    const entry = this.formatLogEntry('info', message, meta);
    console.log(entry);
    this.writeToFile(path.join(this.logDir, 'combined.log'), entry);
  }

  debug(message, meta = {}) {
    if (!this.shouldLog('debug')) return;

    const entry = this.formatLogEntry('debug', message, meta);
    if (process.env.NODE_ENV !== 'production') {
      console.log(entry);
    }
    this.writeToFile(path.join(this.logDir, 'debug.log'), entry);
  }

  // Security logging
  security(message, meta = {}) {
    const entry = this.formatLogEntry('security', message, {
      ...meta,
      severity: 'HIGH'
    });
    
    console.error(entry);
    this.writeToFile(path.join(this.logDir, 'security.log'), entry);
    this.writeToFile(path.join(this.logDir, 'error.log'), entry);
  }

  // Audit logging for admin actions
  audit(action, adminId, details = {}) {
    const entry = this.formatLogEntry('audit', `Admin action: ${action}`, {
      adminId,
      action,
      ...details
    });

    console.log(entry);
    this.writeToFile(path.join(this.logDir, 'audit.log'), entry);
    this.writeToFile(path.join(this.logDir, 'combined.log'), entry);
  }

  // Performance logging
  performance(operation, duration, meta = {}) {
    const entry = this.formatLogEntry('performance', `${operation} completed`, {
      operation,
      duration: `${duration}ms`,
      ...meta
    });

    if (duration > 1000) { // Log slow operations
      console.warn(entry);
      this.writeToFile(path.join(this.logDir, 'performance.log'), entry);
    }
  }

  // Database operation logging
  database(operation, query, duration, meta = {}) {
    const entry = this.formatLogEntry('database', operation, {
      operation,
      query: query?.substring(0, 500), // Truncate long queries
      duration: duration ? `${duration}ms` : undefined,
      ...meta
    });

    if (process.env.NODE_ENV !== 'production' || duration > 1000) {
      console.log(entry);
      this.writeToFile(path.join(this.logDir, 'database.log'), entry);
    }
  }

  // HTTP request logging
  request(req, res, responseTime) {
    const entry = this.formatLogEntry('http', `${req.method} ${req.path}`, {
      method: req.method,
      url: req.originalUrl,
      path: req.path,
      statusCode: res.statusCode,
      responseTime: `${responseTime}ms`,
      userAgent: req.headers['user-agent'],
      ip: req.ip,
      userId: req.user?.id,
      userRole: req.user?.role
    });

    console.log(entry);
    this.writeToFile(path.join(this.logDir, 'access.log'), entry);

    // Log errors separately
    if (res.statusCode >= 400) {
      this.writeToFile(path.join(this.logDir, 'error.log'), entry);
    }
  }

  // Cleanup old logs
  cleanup() {
    const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
    const now = Date.now();

    try {
      const files = fs.readdirSync(this.logDir);
      files.forEach(file => {
        const filePath = path.join(this.logDir, file);
        const stats = fs.statSync(filePath);
        if (now - stats.mtime.getTime() > maxAge) {
          fs.unlinkSync(filePath);
          console.log(`Cleaned up old log file: ${file}`);
        }
      });
    } catch (error) {
      console.error('Log cleanup failed:', error);
    }
  }
}

// Create singleton instance
const logger = new ProductionLogger();

// Cleanup logs daily in production
if (process.env.NODE_ENV === 'production') {
  setInterval(() => {
    logger.cleanup();
  }, 24 * 60 * 60 * 1000); // Daily cleanup
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', { error: error.message, stack: error.stack });
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Promise Rejection', { reason, promise: promise.toString() });
});

module.exports = logger;