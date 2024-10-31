const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Ensure this is the correct path

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Temporary route to create a user
router.post('/create-temp-user', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = new User({
      username: 'testuser',
      password: hashedPassword,
      role: 'staff'
    });
    await user.save();
    res.status(201).json({ message: 'Temporary user created' });
  } catch (error) {
    console.error('Error creating temporary user:', error);
    res.status(500).json({ message: 'Error creating temporary user' });
  }
});

module.exports = router;
