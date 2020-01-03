const express = require('express');
const userController = require('./../controllers/userController');

// ROUTES
const router = express.Router();

// route: '/api/v1/users
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

// route: '/api/v1/users/:id
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
