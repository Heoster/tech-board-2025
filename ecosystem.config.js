module.exports = {
  "apps": [
    {
      "name": "tech-board-2025",
      "script": "server/index.js",
      "instances": "max",
      "exec_mode": "cluster",
      "env": {
        "NODE_ENV": "development",
        "PORT": 8000
      },
      "env_production": {
        "NODE_ENV": "production",
        "PORT": 8000
      },
      "error_file": "./logs/err.log",
      "out_file": "./logs/out.log",
      "log_file": "./logs/combined.log",
      "time": true,
      "max_memory_restart": "1G",
      "node_args": "--max-old-space-size=1024",
      "watch": false,
      "ignore_watch": [
        "node_modules",
        "logs",
        "database"
      ],
      "max_restarts": 10,
      "min_uptime": "10s"
    }
  ]
};