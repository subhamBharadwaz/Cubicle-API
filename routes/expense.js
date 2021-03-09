const express = require('express');
const {
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} = require('../controller/expense');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getAllExpenses).post(protect, createExpense);
router.route('/:id').put(protect, updateExpense).delete(protect, deleteExpense);

module.exports = router;
