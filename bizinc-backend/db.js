// Load environment variables from a .env file
require('dotenv').config();

// Import the Pool class from the 'pg' library to interact with PostgreSQL
const { Pool } = require('pg');

// Create a new pool instance to manage database connections
const pool = new Pool({
  user: process.env.DB_USER,          // Database user from environment variables
  host: process.env.DB_HOST,          // Database host from environment variables
  database: process.env.DB_NAME,      // Database name from environment variables
  password: process.env.DB_PASSWORD,  // Database password from environment variables
  port: process.env.DB_PORT,          // Database port from environment variables
});

// Export the pool instance to be used by other files for database queries
module.exports = pool;
