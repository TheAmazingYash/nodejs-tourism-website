const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define the Mongoose schema for users
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  pass: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Route to serve login.html file
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

// Route to handle user registration
router.post('/register', async (req, res) => {
  try {
    console.log('Registration request received:', req.body); // Log request data

    const newUser = new User({
      name: req.body.name,
      pass: req.body.pass // Store plaintext password
    });

    // Check if user already exists
    const existingUser = await User.findOne({ name: req.body.name });
    if (existingUser) {
      res.send('User already exists');
    } else {
      await newUser.save();
      console.log('User registered successfully:', newUser); // Log successful registration
      res.redirect('/'); // Redirect to login page
    }
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).send('Failed to register user');
  }
});

// Route to handle user login
router.post('/login', async (req, res) => {
  try {
    console.log('Login request received:', req.body); // Log request data

    const user = await User.findOne({ name: req.body.name });
    if (user) {
      console.log('User found:', user); // Log user found
      // Compare plaintext passwords
      if (req.body.pass === user.pass) {
        req.session.username = req.body.name;
        console.log('User logged in successfully:', user); // Log successful login
        res.redirect('/index'); // Redirect to index page
      } else {
        console.log('Password mismatch for user:', req.body.name); // Log password mismatch
        res.redirect('/'); // Redirect to login page on failure
      }
    } else {
      console.log('User not found:', req.body.name); // Log user not found
      res.redirect('/'); // Redirect to login page if user is not found
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send('Failed to login');
  }
});

module.exports = router;
