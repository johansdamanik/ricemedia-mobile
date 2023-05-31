const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/', UserController.findAll);

router.post('/', UserController.newUser);

router.get('/:id', UserController.findById);

router.delete('/:id', UserController.deleteUser);

module.exports = router;
