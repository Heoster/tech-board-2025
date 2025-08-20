const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on ${PORT}`);
});