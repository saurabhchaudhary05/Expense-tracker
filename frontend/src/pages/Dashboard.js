// src/pages/Dashboard.js
import React, { useEffect, useState, useRef } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseChart from '../components/ExpenseChart';
import { Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Fab, Zoom, TextField, MenuItem, Stack, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8000/expenses';
const categories = ['All', 'Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Other'];

const sortOptions = [
  { value: 'date-desc', label: 'Date (Newest)' },
  { value: 'date-asc', label: 'Date (Oldest)' },
  { value: 'amount-desc', label: 'Amount (High-Low)' },
  { value: 'amount-asc', label: 'Amount (Low-High)' },
  { value: 'category-asc', label: 'Category (A-Z)' },
];

// Custom loading spinner
const Spinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 120 }}>
    <div style={{
      width: 48, height: 48, border: '5px solid #e3e9f7', borderTop: '5px solid #1976d2', borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    <style>{`@keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }`}</style>
  </div>
);

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('date-desc');
  const formRef = useRef(null);
  const navigate = useNavigate();
  // Interactive background state
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const bgRef = useRef(null);

  // Helper to get token
  const getToken = () => localStorage.getItem('token');

  // Fetch expenses from backend
  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        headers: { 'Authorization': 'Bearer ' + getToken() }
      });
      if (res.status === 401) {
        navigate('/login');
        return;
      }
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to fetch expenses.', severity: 'error' });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Mouse move handler for interactive background
  useEffect(() => {
    const handleMouseMove = (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setMouse({ x: e.clientX / w, y: e.clientY / h });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Update total after add/edit/delete
  const refreshData = () => {
    fetchExpenses();
  };

  // Add or update expense
  const handleSave = async (expense) => {
    try {
      if (editing) {
        // Update
        await fetch(`${API_URL}/${editing._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() },
          body: JSON.stringify(expense),
        });
        setSnackbar({ open: true, message: 'Expense updated successfully!', severity: 'success' });
        setEditing(null);
      } else {
        // Add
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() },
          body: JSON.stringify(expense),
        });
        setSnackbar({ open: true, message: 'Expense added successfully!', severity: 'success' });
      }
      refreshData();
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to save expense.', severity: 'error' });
    }
  };

  // Edit expense
  const handleEdit = (expense) => {
    setEditing(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Ask for confirmation before deleting
  const handleDelete = (id) => {
    setDeleteDialog({ open: true, id });
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      await fetch(`${API_URL}/${deleteDialog.id}`, { method: 'DELETE', headers: { 'Authorization': 'Bearer ' + getToken() } });
      setSnackbar({ open: true, message: 'Expense deleted.', severity: 'info' });
      refreshData();
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to delete expense.', severity: 'error' });
    }
    setDeleteDialog({ open: false, id: null });
  };

  // Cancel delete
  const cancelDelete = () => {
    setDeleteDialog({ open: false, id: null });
  };

  // FAB handler
  const handleFabClick = () => {
    setEditing(null);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Filtered and sorted expenses
  const filteredExpenses = expenses.filter(exp => {
    const matchesCategory = category === 'All' || exp.category === category;
    const matchesSearch = exp.description?.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    switch (sort) {
      case 'date-asc':
        return new Date(a.date) - new Date(b.date);
      case 'date-desc':
        return new Date(b.date) - new Date(a.date);
      case 'amount-asc':
        return a.amount - b.amount;
      case 'amount-desc':
        return b.amount - a.amount;
      case 'category-asc':
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  // Fade-in card style
  const cardStyle = {
    background: 'linear-gradient(135deg, rgba(227,233,247,0.85) 0%, rgba(178,247,239,0.85) 50%, rgba(67,233,123,0.13) 100%)',
    borderRadius: 18,
    boxShadow: '0 4px 18px rgba(25,118,210,0.10)',
    marginBottom: 36,
    padding: '2rem 1.5rem',
    animation: 'fadeIn 0.7s',
    transition: 'box-shadow 0.2s',
    position: 'relative',
    overflow: 'hidden',
  };
  // White overlay for clarity
  const cardOverlay = {
    position: 'absolute',
    inset: 0,
    background: 'rgba(255,255,255,0.75)',
    borderRadius: 18,
    pointerEvents: 'none',
    zIndex: 1,
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', position: 'relative', overflow: 'hidden', paddingTop: 90, background: 'none' }}>
      {/* Gradient border/background around main content */}
      <div style={{
        background: 'linear-gradient(135deg, #e3e9f7 0%, #b2f7ef 50%, #43e97b 100%)',
        padding: '2.5rem 0',
        minHeight: 'calc(100vh - 90px)',
      }}>
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1000,
          margin: '0 auto',
          padding: '0 1rem',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: '#fff',
          borderRadius: 24,
          boxShadow: '0 8px 32px rgba(25,118,210,0.10)',
        }}>
          <div style={cardStyle} className="fade-in" ref={formRef}>
            <div style={cardOverlay} />
            <div style={{ position: 'relative', zIndex: 2 }}>
              {/* Total Expense Display */}
              <div style={{
                fontWeight: 700,
                fontSize: 28,
                color: '#43a047',
                marginBottom: 18,
                textAlign: 'center',
                letterSpacing: 1.2,
              }}>
                Total Expense: ₹{expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0).toFixed(2)}
              </div>
              <ExpenseForm
                onSave={handleSave}
                editingExpense={editing}
                onCancel={() => setEditing(null)}
              />
            </div>
          </div>
          {/* Filter/Search/Sort Bar */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" sx={{ mb: 2, mt: -2, px: 1 }}>
            <TextField
              label="Search Description"
              value={search}
              onChange={e => setSearch(e.target.value)}
              size="small"
              color="primary"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 220, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1, input: { color: 'text.primary' } }}
            />
            <TextField
              select
              label="Category"
              value={category}
              onChange={e => setCategory(e.target.value)}
              size="small"
              color="primary"
              sx={{ minWidth: 180, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1, '.MuiSelect-select': { color: 'text.primary' } }}
            >
              {categories.map(cat => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Sort by"
              value={sort}
              onChange={e => setSort(e.target.value)}
              size="small"
              color="primary"
              sx={{ minWidth: 180, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1, '.MuiSelect-select': { color: 'text.primary' } }}
            >
              {sortOptions.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </TextField>
          </Stack>
          {loading ? (
            <div style={cardStyle}><div style={cardOverlay} /><div style={{ position: 'relative', zIndex: 2 }}><Spinner /></div></div>
          ) : (
            <>
              <div style={cardStyle} className="fade-in">
                <div style={cardOverlay} />
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <ExpenseList expenses={sortedExpenses} onEdit={handleEdit} onDelete={handleDelete} />
                </div>
              </div>
              <div style={cardStyle} className="fade-in">
                <div style={cardOverlay} />
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <ExpenseChart expenses={sortedExpenses} />
                </div>
              </div>
            </>
          )}
          <Zoom in={true}>
            <Fab color="primary" aria-label="add" onClick={handleFabClick} sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 10, boxShadow: 6 }}>
              <AddIcon />
            </Fab>
          </Zoom>
          <footer style={{ textAlign: 'center', color: '#888', fontSize: '1rem', padding: '1.5rem 0 0.7rem 0', marginTop: 32, letterSpacing: '0.5px' }}>
            Made with ❤️ by <b>saurabh chaudhary</b> &mdash; Expense Tracker Project
          </footer>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
              {snackbar.message}
            </Alert>
          </Snackbar>
          <Dialog open={deleteDialog.open} onClose={cancelDelete}>
            <DialogTitle>Delete Expense</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this expense? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelDelete} color="primary" variant="outlined">Cancel</Button>
              <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
            </DialogActions>
          </Dialog>
          <style>{`
            @keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; } }
          `}</style>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
