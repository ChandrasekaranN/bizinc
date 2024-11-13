// Import necessary modules
const express = require('express');
const router = express.Router();
const pool = require('../db');  // Database connection to execute queries
const authenticate = require('../middleware/authentication');  // Custom middleware to check authentication

// Route to add a new todo item
router.post('/post', authenticate, async (req, res) => {
  // Extract the title from the request body and the userId from the authenticated user
  const { title } = req.body;
  const userId = req.user.id;

  // If the title is not provided, return a 400 Bad Request error
  if (!title) {
    return res.status(400).json({ message: 'Todo title is required' });
  }

  try {
    // Insert the new todo item into the database and return the created todo
    const result = await pool.query(
      'INSERT INTO bizinc.todos (title, user_id) VALUES ($1, $2) RETURNING *',
      [title, userId]
    );
    // Respond with the created todo and a 201 status for successful creation
    res.status(201).json(result.rows[0]);
  } catch (err) {
    // Log any errors and respond with a 500 Internal Server Error
    console.error('Error creating todo:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get all todo items for the current user
router.get('/get', authenticate, async (req, res) => {
  // Get the authenticated user's ID
  const userId = req.user.id;

  try {
    // Query the database for all todos created by the current user
    const result = await pool.query(
      'SELECT * FROM bizinc.todos WHERE user_id = $1',
      [userId]
    );
    // Respond with the list of todos
    res.json(result.rows);
  } catch (err) {
    // Log any errors and return a 500 Internal Server Error if something goes wrong
    console.error('Error fetching todos:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to mark a todo item as completed
router.put('/:id/complete', authenticate, async (req, res) => {
  // Extract todoId from the route parameters and userId from the authenticated user
  const todoId = parseInt(req.params.id);
  const userId = req.user.id;

  try {
    // Update the 'completed' status of the todo item in the database
    const result = await pool.query(
      'UPDATE bizinc.todos SET completed = TRUE WHERE id = $1 AND user_id = $2 RETURNING *;',
      [todoId, userId]
    );

    // If the todo is not found or does not belong to the current user, return a 404 error
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Todo not found or does not belong to the current user' });
    }

    // Respond with the updated todo
    res.json(result.rows[0]);
  } catch (error) {
    // Log the error and return a 500 Server Error if something goes wrong
    console.error('Error completing todo:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Export the router to be used in the main app
module.exports = router;
