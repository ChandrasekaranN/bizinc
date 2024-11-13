const express = require('express');
const router = express.Router();
const passport = require('passport');
const pool = require('../db');
const authenticate = require('../middleware/authentication');


router.post('/post', authenticate, async (req, res) => {
    const { title } = req.body;
    const userId = req.user.id;

    if (!title) {
        return res.status(400).json({ message: 'todo title is required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO bizinc.todos (title, user_id) VALUES ($1, $2) RETURNING *',
            [title, userId]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating todo:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/get', authenticate, async (req, res) => {
    const userId = req.user.id;

    try {
        const result = await pool.query(
            'SELECT * FROM bizinc.todos WHERE user_id = $1',
            [userId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching todos:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/:id/complete', authenticate, async (req, res) => {
    const todoId = parseInt(req.params.id);
    const userId = req.user.id;
  
    try {
      const result = await pool.query(
        'UPDATE bizinc.todos SET completed = TRUE WHERE id = $1 AND user_id = $2 RETURNING *;',
        [todoId, userId]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Todo not found or does not belong to the current user' });
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error completing todo:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
