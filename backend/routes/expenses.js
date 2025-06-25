const express = require('express');
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all expenses for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// Add a new expense for the logged-in user
router.post('/', auth, async (req, res) => {
  try {
    const expense = new Expense({ ...req.body, user: req.user });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add expense' });
  }
});

// Update an expense (only if it belongs to the user)
router.put('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      req.body,
      { new: true }
    );
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json(expense);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update expense' });
  }
});

// Delete an expense (only if it belongs to the user)
router.delete('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user });
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete expense' });
  }
});

module.exports = router; 