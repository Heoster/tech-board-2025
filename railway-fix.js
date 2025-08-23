const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'server', 'public')));

// API routes
try {
    app.use('/api/auth', require('./server/routes/auth'));
    app.use('/api/admin', require('./server/routes/admin'));
    app.use('/api/quiz', require('./server/routes/quiz'));
} catch (e) {
    app.use('/api/*', (req, res) => res.json({ status: 'API loading' }));
}

// Serve React app
app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, 'server', 'public', 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.send('<!DOCTYPE html><html><head><title>Tech Board 2025</title></head><body><h1>Tech Board 2025</h1><p>Loading...</p></body></html>');
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));