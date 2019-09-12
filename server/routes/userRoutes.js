const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();
// router.param('id', userController.checkId);
router
  .route('/')
  .get(userController.getUsers)
  .post(userController.createUser)
  .patch(userController.updateUser);

router
  .route('/:id')
  .get(userController.getUser)
  .delete(userController.deleteUser);

module.exports = router;

// // Get users
// server.get('/api/v1/users', getUsers);

// //Get user
// server.get('/api/v1/users/:id', getUser);

// // Delete user
// server.delete('/api/v1/users/:id', deleteUser);

// // Post user
// server.post('/api/v1/users/', createUser);

// // Update user
// server.patch('/api/v1/users/', updateUser);
