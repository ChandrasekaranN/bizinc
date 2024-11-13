This project is a simple Express-based application that implements user authentication, session management, and CRUD operations for posts and todos. It uses PostgreSQL for database storage and Passport.js for user authentication.

## Features

- **User Authentication**: Register, login, and session management.
- **CRUD Operations**: Create, read, update, and delete posts and todos.
- **User-specific Data**: Each user can manage their own posts and todos.
- **Security**: Passwords are hashed using bcrypt before storage.
- **Session Management**: Users stay logged in across requests using sessions.

## Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [PostgreSQL](https://www.postgresql.org/) for the database

## Setup

1. **Clone the Repository**:
   ```
   git clone https://github.com/ChandrasekaranN/bizinc.git
   npm install
   ```

Set Up Environment Variables: Create a `.env` file in the root of the project and define the following variables:

```env
DB_USER=your_database_user
DB_HOST=localhost
DB_NAME=your_database_name
DB_PASSWORD=your_database_password
DB_PORT=5432
SESSION_SECRET=your_session_secret
```
Set Up PostgreSQL Database:

Create a PostgreSQL database and tables based on your schema.
If you need a sample schema, you can create tables for users, posts, and todos with the necessary fields.
Run the Application: Start the server with:


`npm run dev`

The server will be available at http://localhost:5000.

Middleware Logger: Logs all incoming HTTP requests with method, path, and timestamp.

Authentication: Middleware that ensures the user is logged in before accessing certain routes.

Technologies Used Node.js: JavaScript runtime for building the server.

Express.js: Web framework for handling HTTP requests.

Passport.js: Authentication middleware for handling user login.

PostgreSQL: Database for storing user and application data.

bcryptjs: Library for hashing passwords.

express-session: Middleware for handling user sessions.