// Import necessary modules
const express = require('express');
const router = express.Router();
const pool = require('../db');  // Database connection to execute queries
const authenticate = require('../middleware/authentication');  // Custom middleware to check authentication

// Import comments routes to handle comment-related endpoints
const commentsRoutes = require('../routes/comments');

// Route to add a new post
router.post('/post', authenticate, async (req, res) => {
  // Extract title and body from the request body, and userId from the authenticated user
  const { title, body } = req.body;
  const userId = req.user.id;

  // If either title or body is missing, return a 400 Bad Request error with a message
  if (!title || !body) {
    return res.status(400).json({ message: 'Post title and body are required' });
  }

  try {
    // Insert the new post into the database and return the created post
    const result = await pool.query(
      'INSERT INTO bizinc.posts (title, body, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, body, userId]
    );
    res.status(201).json(result.rows[0]);  // Respond with the created post and a 201 status
  } catch (err) {
    // Log any errors and respond with a 500 Internal Server Error
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get all posts created by the current user
router.get('/get', authenticate, async (req, res) => {
  // Get the authenticated user's ID
  const userId = req.user.id;

  try {
    // Query the database for posts created by the current user
    const result = await pool.query(
      'SELECT * FROM bizinc.posts WHERE user_id = $1',
      [userId]
    );
    res.json(result.rows);  // Respond with the list of posts
  } catch (err) {
    // Log any errors and return a 500 Internal Server Error if something goes wrong
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to like a post
router.put('/:id/like', authenticate, async (req, res) => {
  // Extract postId from the route parameters and userId from the authenticated user
  const postId = parseInt(req.params.id);
  const userId = req.user.id;

  try {
    // Step 1: Fetch the current liked status for the post from the database
    const result = await pool.query(
      'SELECT liked FROM bizinc.posts WHERE id = $1 AND user_id = $2',
      [postId, userId]
    );

    // If the post is not found or doesn't belong to the current user, return a 404 error
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found or does not belong to the current user' });
    }

    // Get the current liked status and toggle it
    const currentLikedStatus = result.rows[0].liked;
    const newLikedStatus = !currentLikedStatus;

    // Step 2: Update the post's liked status in the database
    const updateResult = await pool.query(
      'UPDATE bizinc.posts SET liked = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
      [newLikedStatus, postId, userId]
    );

    // Respond with the updated post
    res.json(updateResult.rows[0]);
  } catch (error) {
    // Log the error and return a 500 Server Error response if something goes wrong
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Use the comments routes for any post-related comment endpoints
router.use('/', commentsRoutes);

// Export the router to be used in the main app
module.exports = router;
