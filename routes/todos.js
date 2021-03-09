const express = require('express');
const {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controller/todos');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getAllTodos).post(protect, createTodo);
router.route('/:id').put(protect, updateTodo).delete(protect, deleteTodo);

module.exports = router;
