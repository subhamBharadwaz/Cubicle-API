const Expenses = require('../models/Expense');

// @desc    Get all expenses
// @route   GET /api/v1/expenses
// @access  Private

exports.getAllExpenses = async (req, res, next) => {
  try {
    const expenses = await Expenses.find();
    res
      .status(200)
      .json({ success: true, count: expenses.length, data: expenses });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc    Create expense
// @route   POST /api/v1/expenses
// @access  Private

exports.createExpense = async (req, res, next) => {
  try {
    const expense = await Expenses.create(req.body);
    res.status(201).json({ success: true, data: expense });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc    Update expense
// @route   PUT /api/v1/expenses/:id
// @access  Private

exports.updateExpense = async (req, res, next) => {
  try {
    const expense = await Expenses.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!expense) {
      res.status(400).json({ success: false });
    }
    res.status(202).json({ success: true, data: expense });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc    Delete expense
// @route   DELETE /api/v1/expense/:id
// @access  Private

exports.deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expenses.findByIdAndDelete(req.params.id);
    if (!expense) {
      res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
