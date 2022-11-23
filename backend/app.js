const config = require('./utils/config');
const session = require('express-session');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const passportSetup = require('./utils/passport');
const passport = require('passport');
const authRouter = require('./controllers/auth');
const postsRouter = require('./controllers/posts');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

logger.info('connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
// app.use(cors());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

app.use('/auth', authRouter);
app.use('/api/posts', postsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
