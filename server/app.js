const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

console.log('🚀 NEW Railway App Server Starting');
console.log('Port:', PORT);
console.log('Working directory:', process.cwd());
console.log('Server file: app.js');

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        server: 'NEW-railway-app-server', 
        timestamp: new Date().toISOString(),
        message: 'This is the NEW server running!'
    });
});

// Serve static files from public directory
const publicPath = path.join(__dirname, 'public');
console.log('Static files path:', publicPath);
console.log('Static files exist:', fs.existsSync(publicPath));

if (fs.existsSync(publicPath)) {
    app.use(express.static(publicPath));
    console.log('✅ Static files middleware configured');
} else {
    console.log('❌ Public directory not found');
}

// Serve React app for all routes
app.get('*', (req, res) => {
    const indexPath = path.join(publicPath, 'index.html');
    console.log('Request for:', req.path);
    console.log('Serving index.html from:', indexPath);
    console.log('Index file exists:', fs.existsSync(indexPath));
    
    if (fs.existsSync(indexPath)) {
        console.log('✅ Serving React app');
        res.sendFile(indexPath);
    } else {
        console.log('❌ Index.html not found, serving fallback');
        res.send(`<!DOCTYPE html>
<html><head><title>NEW Railway App Server</title></head>
<body>
<h1>🚀 NEW Railway App Server Running!</h1>
<p>This proves the NEW server is working</p>
<p>Static files path: ${publicPath}</p>
<p>Index file exists: ${fs.existsSync(indexPath)}</p>
<p>Files in public: ${fs.existsSync(publicPath) ? fs.readdirSync(publicPath).join(', ') : 'Directory not found'}</p>
</body></html>`);
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ NEW Railway App Server running on port ${PORT}`);
    console.log('This is definitely the NEW server!');
});

module.exports = app;