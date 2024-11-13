// config/passportConfig.js
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const pool = require('../db');

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    try {
      const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = userResult.rows[0];

      if (!user) return done(null, false, { message: 'No user found' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: 'Incorrect password' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const userResult = await pool.query('SELECT * FROM bizinc.users WHERE id = $1', [id]);

      done(null, userResult.rows[0]);
    } catch (err) {
      done(err);
    }
  });
};
