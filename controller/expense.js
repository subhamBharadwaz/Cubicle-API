const ErrorResponse = require('../utils/errorResponse');
const Expenses = require('../models/Expense');
const asyncHandler = require('../middleware/async');

// @desc    Get all expenses
// @route   GET /api/v1/expenses
// @access  Private

exports.getAllExpenses = asyncHandler(async (req, res, next) => {
  const expenses = await Expenses.find();
  res
    .status(200)
    .json({ success: true, count: expenses.length, data: expenses });
});

// @desc    Create expense
// @route   POST /api/v1/expenses
// @access  Private

exports.createExpense = asyncHandler(async (req, res, next) => {
  const expense = await Expenses.create(req.body);
  res.status(201).json({ success: true, data: expense });
});

// @desc    Update expense
// @route   PUT /api/v1/expenses/:id
// @access  Private

exports.updateExpense = asyncHandler(async (req, res, next) => {
  const expense = await Expenses.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!expense) {
    return next(
      new ErrorResponse(
        `Expense not found with the id of ${req.params.id}`,
        400
      )
    );
  }
  res.status(202).json({ success: true, data: expense });
});

// @desc    Delete expense
// @route   DELETE /api/v1/expense/:id
// @access  Private

exports.deleteExpense = asyncHandler(async (req, res, next) => {
  const expense = await Expenses.findByIdAndDelete(req.params.id);
  if (!expense) {
    return next(
      new ErrorResponse(
        `Expense not found with the id of ${req.params.id}`,
        400
      )
    );
  }
  res.status(200).json({ success: true, data: {} });
});
