const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET all users
router.get('/', userController.getUsers);

// POST new user
router.post('/', userController.addUser);

module.exports = router;
