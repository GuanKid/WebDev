const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Temporary route to create a user
router.post('/create-temp-user', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = new User({ username: 'testuser', password: hashedPassword, role: 'staff' });
    await user.save();
    res.status(201).json({ message: 'Temporary user created' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating temporary user' });
  }
});

module.exports = router;