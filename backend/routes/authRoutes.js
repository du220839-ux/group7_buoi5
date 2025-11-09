const express = require('express');
const router = express.Router();
const { signup, login, logout, forgotPassword, resetPassword, uploadAvatar } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

module.exports = (upload) => {
  router.post('/signup', signup);
  router.post('/login', login);
  router.post('/logout', logout);
  router.post('/forgot-password', forgotPassword);
  router.post('/reset-password/:token', resetPassword);
  router.post('/upload-avatar', authMiddleware, upload.single('avatar'), uploadAvatar);
  return router;
};
