import React from 'react';
import { Paper, Table, TableHead, TableBody, TableRow, TableCell, Button, Typography, TableContainer, Chip, Divider } from '@mui/material';

const categoryColors = {
  Food: 'primary',
  Transport: 'secondary',
  Shopping: 'warning',
  Bills: 'info',
  Entertainment: 'success',
  Other: 'default',
};

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  if (!expenses.length) {
    return <Typography align="center" color="text.secondary" sx={{ my: 4, fontSize: '1.1rem' }}>No expenses found. Add your first expense!</Typography>;
  }

  return (
    <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 3, mb: 4 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ background: '#e3e9f7' }}>
            <TableCell sx={{ fontWeight: 700, color: '#1976d2', letterSpacing: 0.5 }}>Amount</TableCell>
            <TableCell sx={{ fontWeight: 700, color: '#1976d2', letterSpacing: 0.5 }}>Category</TableCell>
            <TableCell sx={{ fontWeight: 700, color: '#1976d2', letterSpacing: 0.5 }}>Description</TableCell>
            <TableCell sx={{ fontWeight: 700, color: '#1976d2', letterSpacing: 0.5 }}>Date</TableCell>
            <TableCell sx={{ fontWeight: 700, color: '#1976d2', letterSpacing: 0.5 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <Divider />
        <TableBody>
          {expenses.map((exp) => (
            <TableRow key={exp._id} hover sx={{ transition: 'background 0.2s', '&:hover': { background: '#e3f2fd' } }}>
              <TableCell align="center" sx={{ fontWeight: 500 }}>₹{exp.amount.toFixed(2)}</TableCell>
              <TableCell align="center">
                <Chip label={exp.category} color={categoryColors[exp.category] || 'default'} variant="filled" size="small" />
              </TableCell>
              <TableCell>{exp.description}</TableCell>
              <TableCell align="center">{new Date(exp.date).toLocaleDateString()}</TableCell>
              <TableCell align="center">
                <Button onClick={() => onEdit(exp)} variant="contained" color="primary" size="small" sx={{ mr: 1, fontWeight: 600 }}>Edit</Button>
                <Button onClick={() => onDelete(exp._id)} variant="outlined" color="error" size="small" sx={{ fontWeight: 600 }}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseList;
