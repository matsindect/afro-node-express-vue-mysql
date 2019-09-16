const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');

//Using mysql database and route
//const userRouter = require('./routes/userRoutes');

const server = express();

server.use(bodyparser.json());
if (process.env.NNODE_ENV === 'development') {
  server.use(morgan('dev'));
}
// MySql ROUTES
//server.use('/api/v1/users', userRouter);

server.use((req, res, next) => {
  console.log('Hope we did it');
  next();
});

module.exports = server;
