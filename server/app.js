const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyparser = require('body-parser');
const morgan = require('morgan');

const server = express();

const userRouter = require('./routes/userRoutes');
const userPortal = require('./routes/portalRoutes');

server.use(express.urlencoded({ extended: false }));

//Server static files
server.use(express.static(path.join(__dirname, 'public')));

// Template engine
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'pug');

// Session
server.use(
  session({
    secret: 'you_tube_video',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 1000 * 30
    }
  })
);

server.use(bodyparser.json());
if (process.env.NNODE_ENV === 'development') {
  server.use(morgan('dev'));
}
// ROUTES
// portal
server.use('/portal', userPortal);
//users
server.use('/api/v1/users', userRouter);

// Error page 404
server.use((req, res, next) => {
  let err = new Error('Page not found');
  err.status = 404;
  next(err);
});

// Error handler
server.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

server.use((req, res, next) => {
  console.log('Hope we did it');
  next();
});

module.exports = server;
