const express = require('express');
const {
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} = require('../controller/expense');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/').get(getAllExpenses).post(createExpense);
router.route('/:id').put(updateExpense).delete(deleteExpense);

module.exports = router;
