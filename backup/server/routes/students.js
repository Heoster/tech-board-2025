const express = require('express');
const { authenticateToken, requireStudent, validateStudent } = require('../middleware/auth');

const router = express.Router();

// Get student profile
router.get('/profile', authenticateToken, requireStudent, validateStudent, (req, res) => {
    res.json({
        success: true,
        data: {
            student: req.student
        }
    });
});

// Update student profile
router.put('/profile', authenticateToken, requireStudent, validateStudent, (req, res) => {
    // TODO: Implement profile update
    res.json({
        success: true,
        message: 'Profile update endpoint - to be implemented'
    });
});

module.exports = router;