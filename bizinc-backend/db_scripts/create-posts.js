require('dotenv').config();  // Load .env variables
const { Client } = require('pg');

// Database configuration using environment variables
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const createTableQuery = `
CREATE TABLE bizinc.posts (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  title VARCHAR(100) NOT NULL,
  body TEXT,
  liked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

// Connect to the database and execute the query
async function createTable() {
  try {
    await client.connect();
    const res = await client.query(createTableQuery);
    if (res) {
      console.log((res))
    }
    console.log("Table 'posts' created successfully.");
  } catch (err) {
    console.error("Error creating table:", err);
  } finally {
    await client.end();
  }
}

createTable();
