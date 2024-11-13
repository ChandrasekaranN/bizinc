// Import necessary modules
const express = require('express');
const bcrypt = require('bcryptjs');  // Library for hashing passwords
const passport = require('passport');  // Passport for handling authentication
const pool = require('../db');  // Database connection to execute queries
const router = express.Router();

// Route to register a new user
router.post('/register', async (req, res) => {
  // Extract email and password from the request body
  const { email, password } = req.body;

  // Hash the password before storing it in the database
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Insert the new user into the database
    const newUser = await pool.query(
      'INSERT INTO bizinc.users (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    );
    // Respond with the newly created user (excluding sensitive information)
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    // If there is an error (e.g., email already taken), respond with a 500 error and error message
    res.status(500).json({ error: err.message });
  }
});

// Route to log in a user using passport-local strategy
router.post('/login', passport.authenticate('local'), (req, res) => {
  // Once authenticated, log the user in
  req.login(req.user, (loginErr) => {
    if (loginErr) {
      // If there is an error logging in, return a 500 error with a message
      return res.status(500).json({ message: 'Error logging in' });
    }
    // If login is successful, return a success message
    return res.status(200).json({ message: 'Logged in successfully' });
  });
});

// Export the router to be used in the main app
module.exports = router;
