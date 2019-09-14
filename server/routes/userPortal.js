const express = require('express');
const User = require('../controllers/user');
const router = express.Router();

const user = new User();

router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

//Get portal home
router.get('/home', (req, res, next) => {
  res.send('This is a home page');
});

//Post login
router.post('/login', (req, res, next) => {
  user.login(req.body.user_name, req.body.user_password, result => {
    if (result) {
      res.send(`Logged in as ${result.user_username}`);
    } else {
      res.send('Username or password incorrect');
    }
  });
});

//Post Register
router.post('/register', (req, res, next) => {
  let userInput = {
    user_name: req.body.user_name,
    user_password: req.body.user_password,
    user_email_address: req.body.user_email_address
  };
  user.create(userInput, lastId => {
    if (lastId) {
      res.send(`Welcome ${userInput.user_name}`);
    } else {
      console.log('Error creating a new user');
    }
  });
});
module.exports = router;
