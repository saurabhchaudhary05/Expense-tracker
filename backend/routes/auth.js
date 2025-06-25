require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
// Use node-fetch v2 compatible import for CommonJS
const fetch = require('node-fetch');

// Helper to verify Google reCAPTCHA
async function verifyCaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET;
  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secret}&response=${token}`
  });
  const data = await response.json();
  console.log('Captcha verification response:', data); // Debug log
  return data.success;
}

// Register (no captcha)
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login (with captcha)
router.post('/login', async (req, res) => {
  try {
    const { email, password, captcha } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (!captcha) {
      return res.status(400).json({ error: 'Captcha is required' });
    }
    const captchaValid = await verifyCaptcha(captcha);
    if (!captchaValid) {
      return res.status(400).json({ error: 'Captcha verification failed' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Login failed: user not found for', email); // Log user not found
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Login failed: wrong password for', email); // Log wrong password
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1d' });
    console.log('Login successful for', email); // Log success
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    console.log('Login error:', err); // Log error
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router; 