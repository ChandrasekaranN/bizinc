// routes/posts.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const pool = require('../db');
const authenticate = require('../middleware/authentication');

const commentsRoutes = require('../routes/comments');

// Add a new post
router.post('/post', authenticate, async (req, res) => {
  const { title, body } = req.body;
  const userId = req.user.id;

  if (!title || !body) {
    return res.status(400).json({ message: 'Post title and body are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO bizinc.posts (title, body, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, body, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get posts for the current user
router.get('/get', authenticate, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'SELECT * FROM bizinc.posts WHERE user_id = $1',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Like a post
router.put('/:id/like', authenticate, async (req, res) => {
  const postId = parseInt(req.params.id);
  const userId = req.user.id;

  try {
    // Step 1: Fetch the current liked status for the post
    const result = await pool.query(
      'SELECT liked FROM bizinc.posts WHERE id = $1 AND user_id = $2',
      [postId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found or does not belong to the current user' });
    }

    const currentLikedStatus = result.rows[0].liked;
    const newLikedStatus = !currentLikedStatus;

    const updateResult = await pool.query(
      'UPDATE bizinc.posts SET liked = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
      [newLikedStatus, postId, userId]
    );

    res.json(updateResult.rows[0]);  // Return the updated post
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.use('/', commentsRoutes);


module.exports = router;
