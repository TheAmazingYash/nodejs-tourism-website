const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const app = express();

const sessionSecret = 'uOqzj8vPf8k7uZxQ4wE6YcN5yD7mK9aLw2RcT1VxI4c3Bg0zM5xJ8uZb6WpR7vN';

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tourist', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const bookingRoutes = require('./routes/booking');
const authRoutes = require('./routes/auth');

// Register routes
app.use('/booking', bookingRoutes);
app.use('/', authRoutes);

// Serve index.html file after login
app.get('/index', (req, res) => {
  if (req.session.username) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } else {
    res.redirect('/'); // Redirect to login page if not logged in
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
