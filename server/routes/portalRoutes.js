const express = require('express');
const User = require('../controllers/portalController');
const router = express.Router();

const user = new User();

router.get('/', (req, res) => {
  let user = req.session.user;
  if (user) {
    res.redirect('/home');
    return;
  }
  res.render('index', { title: 'Home' });
});

//Get portal home
router.get('/home', (req, res, next) => {
  let user = req.session.user;

  if (user) {
    res.render('home', { opp: req.session.opp, name: user[0].user_name });
    return;
  }
  res.redirect('/');
});

//Post login
router.post('/login', (req, res, next) => {
  user.login(req.body.user_name, req.body.user_password, result => {
    if (result) {
      req.session.user = result;
      req.session.opp = 1;
      res.redirect('/portal/home');
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
      user.find(lastId, result => {
        req.session.user = result;
        req.session.opp = 0;
        res.redirect('/home');
      });
      res.send(`Welcome ${userInput.user_name}`);
    } else {
      console.log('Error creating a new user');
    }
  });
});

//Get logout
router.get('/logout', (req, res, next) => {
  if (req.session.user) {
    req.session.destroy(() => {
      res.redirect('/portal');
    });
  }
});
module.exports = router;
