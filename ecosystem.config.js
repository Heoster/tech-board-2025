// PM2 ecosystem configuration for production stability
module.exports = {
  apps: [{
    name: 'tech-board-2025',
    script: './server/index.js',
    instances: process.env.NODE_ENV === 'production' ? 'max' : 1,
    exec_mode: 'cluster',
    
    // Environment variables
    env: {
      NODE_ENV: 'development',
      PORT: 8000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: process.env.PORT || 8000
    },
    
    // Restart policy
    max_restarts: 10,
    min_uptime: '10s',
    max_memory_restart: '1G',
    
    // Logging
    log_file: './server/logs/combined.log',
    out_file: './server/logs/out.log',
    error_file: './server/logs/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    
    // Monitoring
    watch: false,
    ignore_watch: ['node_modules', 'logs', 'database'],
    
    // Advanced settings
    kill_timeout: 5000,
    listen_timeout: 3000,
    
    // Health monitoring
    health_check_grace_period: 3000,
    
    // Auto restart conditions
    restart_delay: 4000,
    
    // Memory and CPU limits
    node_args: '--max-old-space-size=1024',
    
    // Graceful shutdown
    shutdown_with_message: true,
    wait_ready: true,
    
    // Error handling
    autorestart: true,
    
    // Cron restart (optional - restart daily at 3 AM)
    cron_restart: '0 3 * * *'
  }],
  
  deploy: {
    production: {
      user: 'node',
      host: 'your-server.com',
      ref: 'origin/main',
      repo: 'git@github.com:your-username/tech-board-2025.git',
      path: '/var/www/tech-board-2025',
      'post-deploy': 'npm install && npm run build:production && pm2 reload ecosystem.config.js --env production'
    }
  }
};