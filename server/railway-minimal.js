const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

console.log('🚀 Railway Minimal Server Starting');
console.log('Port:', PORT);
console.log('Working directory:', process.cwd());

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', server: 'railway-minimal', timestamp: new Date().toISOString() });
});

// Serve static files from public directory
const publicPath = path.join(__dirname, 'public');
console.log('Static files path:', publicPath);
console.log('Static files exist:', fs.existsSync(publicPath));

app.use(express.static(publicPath));

// Serve React app for all routes
app.get('*', (req, res) => {
    const indexPath = path.join(publicPath, 'index.html');
    console.log('Serving:', req.path);
    console.log('Index file exists:', fs.existsSync(indexPath));
    
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.send(`<!DOCTYPE html>
<html><head><title>Railway Minimal Server</title></head>
<body><h1>Railway Minimal Server Running</h1>
<p>Static files not found at: ${publicPath}</p>
<p>Looking for: ${indexPath}</p>
</body></html>`);
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Railway Minimal Server running on port ${PORT}`);
});

module.exports = app;