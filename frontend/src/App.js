// src/App.js
import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Header from './components/Header';

function App() {
  const [mode, setMode] = useState(() => localStorage.getItem('themeMode') || 'light');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#43a047',
      },
      background: {
        default: mode === 'dark' ? '#181c24' : 'linear-gradient(120deg, #e3e9f7 0%, #f4f6fa 100%)',
        paper: mode === 'dark' ? '#23272f' : '#fff',
      },
    },
    typography: {
      fontFamily: 'Segoe UI, Roboto, Arial, sans-serif',
      h4: { fontWeight: 700 },
      h6: { fontWeight: 600 },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  }), [mode]);

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', next);
      return next;
    });
  };

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };
  const handleRegister = () => {};

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header toggleMode={toggleMode} mode={mode} isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
