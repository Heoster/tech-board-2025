const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

// Serve static files from server/public
app.use(express.static(path.join(__dirname, 'server/public')));

// Root route - serve React app
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'server/public/index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.send(`<!DOCTYPE html>
<html>
<head><title>Tech Board 2025</title></head>
<body>
<div id="root">
<h1>Tech Board 2025 - MCQ Testing System</h1>
<p><a href="/admin/login">Admin Login</a></p>
<p><a href="/student/register">Student Registration</a></p>
</div>
</body>
</html>`);
    }
});

// API routes
try {
    app.use('/api/auth', require('./server/routes/auth'));
    app.use('/api/admin', require('./server/routes/admin'));
    app.use('/api/quiz', require('./server/routes/quiz'));
} catch (e) {
    console.log('API routes not loaded:', e.message);
}

// Catch all - serve React app
app.get('*', (req, res) => {
    if (req.path.startsWith('/api/')) {
        return res.json({ error: 'API not found' });
    }
    
    const indexPath = path.join(__dirname, 'server/public/index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.redirect('/');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});