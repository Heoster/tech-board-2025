const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

app.get('*', (req, res) => {
    res.send('Tech Board 2025 - Running');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});