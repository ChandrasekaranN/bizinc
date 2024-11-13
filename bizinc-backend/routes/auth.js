// Import the express module to create a router
const express = require('express');
const router = express.Router();

// Define an endpoint to check if the user is authenticated
router.get('/check', (req, res) => {
  // Check if the user is authenticated using Passport's isAuthenticated() method
  if (req.isAuthenticated()) {
    // If the user is authenticated, respond with a 200 OK status and a JSON object
    // indicating the user is authenticated
    return res.status(200).json({ isAuthenticated: true });
  }
  // If the user is not authenticated, respond with a 401 Unauthorized status and a 
  // JSON object indicating the user is not authenticated
  return res.status(401).json({ isAuthenticated: false });
});

// Export the router to be used in other parts of the application
module.exports = router;
