const express = require('express');
const router = express.Router();

// ctrl funx
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  updateTaskStatus
} = require('../controllers/taskController');

const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getTasks)      
  .post(protect, createTask); 

router.route('/:id')
  .get(protect, getTask)       
  .put(protect, updateTask)    
  .delete(protect, deleteTask);

router.patch('/:id/status', protect, updateTaskStatus); 

module.exports = router;