// Import required modules
const express = require('express');   // Express for creating the server
const session = require('express-session');  // For managing sessions
const passport = require('passport'); // Passport for authentication
require('./config/passportConfig')(passport); // Initialize passport configuration
const logger = require('./middleware/logger'); // Custom middleware for logging requests

// Import route handlers for different API routes
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const todosRoutes = require('./routes/todos');

// Initialize an Express application
const app = express();

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// Use custom logger middleware to log incoming requests
app.use(logger);

// Configure session middleware to manage user sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET, 
    resave: false,                      
    saveUninitialized: false,           
    cookie: {
      secure: false,                    
      httpOnly: true,                   
      maxAge: 3600000                   
    },
  })
);

// Initialize Passport and use session to store user authentication state
app.use(passport.initialize());
app.use(passport.session());

// Define routes for various parts of the app
app.use('/api/auth', authRoutes);  
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/todos', todosRoutes);

// Start the server on port 5000
app.listen(5000, () => console.log('Server running on http://localhost:5000'));
