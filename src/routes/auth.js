const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
// Testing route
router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Auth route is working' });
});

// POST /api/auth/register
router.post('/register', registerUser);
// POST /api/auth/login
router.post('/login', loginUser);

module.exports = router;
