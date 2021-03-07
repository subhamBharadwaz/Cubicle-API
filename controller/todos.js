const TodoSchema = require('../models/Todo');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
// @desc    Get all todos
// @route   GET /api/v1/todos
// @access  Private

exports.getAllTodos = asyncHandler(async (req, res, next) => {
  const todos = await TodoSchema.find();

  res.status(200).json({ success: true, count: todos.length, data: todos });
});

// @desc    Create single todo
// @route   POST /api/v1/todos
// @access  Private

exports.createTodo = asyncHandler(async (req, res, next) => {
  const todo = await TodoSchema.create(req.body);
  res.status(201).json({ success: true, data: todo });
});

// @desc    Update single todo
// @route   PUT /api/v1/todo/:id
// @access  Private

exports.updateTodo = asyncHandler(async (req, res, next) => {
  const todo = await TodoSchema.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!todo) {
    return next(
      new ErrorResponse(`Todo not found with id ${req.params.id}`, 400)
    );
  }
  res.status(200).json({ success: true, data: todo });
});

// @desc    Delete single todo
// @route   DELETE /api/v1/todos/:id
// @access  Private

exports.deleteTodo = asyncHandler(async (req, res, next) => {
  const todo = await TodoSchema.findByIdAndDelete(req.params.id);
  if (!todo) {
    return next(
      new ErrorResponse(`Todo not found with id ${req.params.id}`, 400)
    );
  }
  res.status(200).json({ success: true, data: {} });
});
