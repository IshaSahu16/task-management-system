const express = require('express');
const router = express.Router();

//cont funx
const { 
  register, 
  login, 
  getMe, 
  getAllUsers, 
  deleteUser 
} = require('../controllers/authController');

const { protect, adminOnly } = require('../middleware/auth');

// public route
router.post('/register', register);
router.post('/login', login);

// logged route
router.get('/me', protect, getMe);

// admin route
router.get('/users', protect, adminOnly, getAllUsers);
router.delete('/users/:id', protect, adminOnly, deleteUser);

module.exports = router;