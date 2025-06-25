import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button, Paper, Stack, Typography } from '@mui/material';

const initialState = {
  amount: '',
  category: '',
  description: '',
  date: '',
};

const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Other'];

const ExpenseForm = ({ onSave, editingExpense, onCancel }) => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingExpense) {
      setForm({
        amount: editingExpense.amount,
        category: editingExpense.category,
        description: editingExpense.description,
        date: editingExpense.date ? editingExpense.date.slice(0, 10) : '',
      });
    } else {
      setForm(initialState);
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || !form.category || !form.date) {
      setError('Amount, category, and date are required.');
      return;
    }
    setError('');
    onSave({ ...form, amount: parseFloat(form.amount) });
    setForm(initialState);
  };

  return (
    <Paper elevation={4} sx={{ p: 3, mb: 4, maxWidth: 420, mx: 'auto', borderRadius: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        {editingExpense ? 'Edit Expense' : 'Add Expense'}
      </Typography>
      {error && <Typography color="error" sx={{ mb: 1 }}>{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Amount"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            inputProps={{ min: 0, step: 0.01 }}
            required
            fullWidth
          />
          <TextField
            select
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            fullWidth
          >
            <MenuItem value="">Select Category</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Description (optional)"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
            fullWidth
          />
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" color="primary" sx={{ fontWeight: 600 }}>
              {editingExpense ? 'Update' : 'Add'}
            </Button>
            {editingExpense && (
              <Button type="button" onClick={onCancel} variant="outlined" color="secondary" sx={{ fontWeight: 600 }}>
                Cancel
              </Button>
            )}
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
};

export default ExpenseForm;
