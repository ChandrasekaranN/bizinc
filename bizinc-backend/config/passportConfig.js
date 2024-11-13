// Import necessary libraries and modules
const LocalStrategy = require('passport-local').Strategy;  // For handling local username/password strategy
const bcrypt = require('bcryptjs');  // For comparing hashed passwords
const pool = require('../db');  // For database query access

module.exports = (passport) => {
  // Set up the local strategy for Passport
  passport.use(new LocalStrategy({
    usernameField: 'email',  // The field for the username will be 'email'
    passwordField: 'password'  // The field for the password will be 'password'
  }, async (email, password, done) => {
    try {
      // Check if the user exists in the database by email
      const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = userResult.rows[0];

      // If no user is found, return an error message
      if (!user) return done(null, false, { message: 'No user found' });

      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: 'Incorrect password' });  // If password doesn't match

      // If authentication is successful, return the user object
      return done(null, user);
    } catch (err) {
      // If an error occurs, pass it to the 'done' callback
      return done(err);
    }
  }));

  // Serialize the user ID to store it in the session
  passport.serializeUser((user, done) => done(null, user.id));

  // Deserialize the user ID to fetch user data from the database when needed
  passport.deserializeUser(async (id, done) => {
    try {
      // Query the database to get user information based on the user ID
      const userResult = await pool.query('SELECT * FROM bizinc.users WHERE id = $1', [id]);

      // Pass the user data back into the session
      done(null, userResult.rows[0]);
    } catch (err) {
      // If an error occurs, pass it to the 'done' callback
      done(err);
    }
  });
};
