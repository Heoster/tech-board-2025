const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

app.get('/', (req, res) => {
    res.json({ message: 'Tech Board 2025' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on ${PORT}`);
});