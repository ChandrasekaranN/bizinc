const express = require('express');
const session = require('express-session');

const passport = require('passport');
require('./config/passportConfig')(passport)

const logger = require('./middleware/logger');

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const todosRoutes = require('./routes/todos');

const app = express();
app.use(express.json());
app.use(logger);

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
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/todos', todosRoutes);


app.listen(5000, () => console.log('Server running on http://localhost:5000'));
