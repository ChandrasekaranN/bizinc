// Import necessary modules
const express = require('express');
const router = express.Router();
const pool = require('../db');  // Database connection to execute queries
const authenticate = require('../middleware/authentication');  // Custom middleware to check authentication

// Route to add a new comment to a post
router.post('/:postId/comments', authenticate, async (req, res) => {
  // Extract postId from the route parameters and body from the request body
  const { postId } = req.params;
  const { body } = req.body;

  // Get the authenticated user's ID from the request
  const userId = req.user.id;

  // If the comment body is empty, return a 400 error with a message
  if (!body) {
    return res.status(400).json({ message: 'Comment body is required' });
  }

  try {
    // Insert the new comment into the database
    const result = await pool.query(
      'INSERT INTO bizinc.comments (body, post_id, user_id) VALUES ($1, $2, $3) RETURNING *',
      [body, postId, userId]
    );
    // Respond with the created comment (using status 201 for created resource)
    res.status(201).json(result.rows[0]);
  } catch (err) {
    // Log the error and return a 500 Internal Server Error if something goes wrong
    console.error('Error adding comment:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get all comments for a specific post
router.get('/:postId/comments', authenticate, async (req, res) => {
  // Extract postId from the route parameters
  const { postId } = req.params;

  try {
    // Query the database to get all comments for the given post
    const result = await pool.query(
      'SELECT * FROM bizinc.comments WHERE post_id = $1',
      [postId]
    );
    // Respond with the list of comments
    res.json(result.rows);
  } catch (err) {
    // Log the error and return a 500 Internal Server Error if something goes wrong
    console.error('Error fetching comments:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Export the router to be used in the main app
module.exports = router;
