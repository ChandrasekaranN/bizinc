// routes/users.js
const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const pool = require('../db');
const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await pool.query(
            'INSERT INTO bizinc.users (email, password) VALUES ($1, $2) RETURNING *',
            [email, hashedPassword]
        );
        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/login', passport.authenticate('local'), (req, res)=> {
  req.login(req.user, (loginErr) => {
    if (loginErr) {
      return res.status(500).json({ message: 'Error logging in' });
    }
    return res.status(200).json({ message: 'Logged in successfully'});
  });
});

module.exports = router;

