const express = require('express');
const router = express.Router();

// Endpoint to check if user is authenticated
router.get('/check', (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ isAuthenticated: true});
  }
  return res.status(401).json({ isAuthenticated: false });
});

module.exports = router;
