require('dotenv').config();  
const { Client } = require('pg');

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const createTableQuery = `
CREATE TABLE bizinc.todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE
);
`;

async function createTable() {
  try {
    await client.connect();
    await client.query(createTableQuery);
    console.log("Table 'todos' created successfully.");
  } catch (err) {
    console.error("Error creating table:", err);
  } finally {
    await client.end();
  }
}

createTable();
