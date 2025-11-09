const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getUsers, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.get('/users', authMiddleware, authorize(['Admin']), getUsers);
router.delete('/users/:id', authMiddleware, deleteUser);

module.exports = router;
