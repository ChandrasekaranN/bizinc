// routes/comments.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const pool = require('../db');
const authenticate = require('../middleware/authentication');

// Add a new comment to a post
router.post('/:postId/comments', authenticate, async (req, res) => {
  const { postId } = req.params;
  const { body } = req.body;
  const userId = req.user.id;

  if (!body) {
    return res.status(400).json({ message: 'Comment body is required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO bizinc.comments (body, post_id, user_id) VALUES ($1, $2, $3) RETURNING *',
      [body, postId, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get comments for a post
router.get('/:postId/comments', authenticate, async (req, res) => {
  const { postId } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM bizinc.comments WHERE post_id = $1',
      [postId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
