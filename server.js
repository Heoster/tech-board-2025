const express = require('express');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 8000;

// Initialize database
function initDatabase() {
    const dbPath = path.join(__dirname, 'server/database/mcq_system_fixed.db');
    const dbDir = path.dirname(dbPath);
    
    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
    }
    
    const db = new sqlite3.Database(dbPath);
    
    // Create tables if they don't exist
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS admins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )`);
        
        db.run(`INSERT OR IGNORE INTO admins (username, password) 
                VALUES ('admin', '$2b$10$YI1rJ8FC/T4ifwYQh1y5yeexsjcDJT/GB19P.xauEJAcrDrNBJbsS')`);
    });
    
    db.close();
}

// Initialize database on startup
initDatabase();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'server/public')));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Basic API
app.get('/api', (req, res) => {
    res.json({ message: 'Tech Board 2025 API', status: 'running' });
});

// Serve React app
app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, 'server/public/index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech Board 2025</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; text-align: center; }
        .links { text-align: center; margin-top: 30px; }
        .links a { display: inline-block; margin: 10px; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 4px; }
        .links a:hover { background: #0056b3; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎓 Tech Board 2025</h1>
        <p style="text-align: center;">MCQ Testing System</p>
        <div class="links">
            <a href="/admin">Admin Login</a>
            <a href="/student">Student Portal</a>
        </div>
    </div>
</body>
</html>`);
    }
});

app.listen(PORT, () => {
    console.log(`Tech Board 2025 server running on port ${PORT}`);
});