import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Button from '@mui/material/Button';

// Wallet SVG from Login page
const WalletSVG = () => (
  <svg width="48" height="32" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 16 }}>
    <rect x="20" y="30" width="80" height="36" rx="10" fill="#43a047" />
    <rect x="30" y="38" width="60" height="10" rx="3" fill="#e3e9f7" />
    <circle cx="90" cy="60" r="8" fill="#fbc02d" stroke="#1976d2" strokeWidth="2" />
    <rect x="60" y="50" width="20" height="6" rx="2" fill="#1976d2" />
    <text x="90" y="64" textAnchor="middle" fontSize="12" fill="#1976d2" fontWeight="bold">💰</text>
  </svg>
);

const Header = ({ toggleMode, mode, isAuthenticated, onLogout }) => (
  <AppBar position="static" sx={{
    background: 'linear-gradient(135deg, #e3e9f7 0%, #f4f6fa 40%, #43a047 100%)',
    boxShadow: 6,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    px: 2,
    py: 1.5,
    zIndex: 1201,
  }}>
    <Toolbar sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 72 }}>
      <IconButton
        onClick={toggleMode}
        color="primary"
        sx={{
          ml: 1,
          background: 'rgba(255,255,255,0.95)',
          border: '2px solid #b0b8d1',
          boxShadow: 2,
          '&:hover': {
            background: 'rgba(255,255,255,1)',
            borderColor: '#1976d2',
          },
        }}
        aria-label="toggle dark mode"
      >
        {mode === 'dark' ? <Brightness7Icon sx={{ color: '#1976d2' }} /> : <Brightness4Icon sx={{ color: '#1976d2' }} />}
      </IconButton>
      <Box display="flex" alignItems="center" gap={2} sx={{ flex: 1, justifyContent: 'center' }}>
        <WalletSVG />
        <Typography variant="h4" component="div" sx={{ fontWeight: 700, letterSpacing: 1.5, color: '#1976d2', textShadow: '0 2px 8px rgba(25,118,210,0.10)' }}>
          Expense Tracker
        </Typography>
      </Box>
      {isAuthenticated && (
        <Button
          onClick={onLogout}
          sx={{
            ml: 1,
            background: 'rgba(255,255,255,0.7)',
            color: '#e53935',
            fontWeight: 600,
            borderRadius: 2,
            px: 3,
            boxShadow: 2,
            border: '1px solid #e3e9f7',
            transition: 'background 0.2s, transform 0.2s',
            '&:hover': {
              background: 'rgba(255,255,255,0.95)',
              color: '#b71c1c',
              transform: 'scale(1.07)',
              boxShadow: 4,
            },
          }}
        >
          Logout
        </Button>
      )}
    </Toolbar>
  </AppBar>
);

export default Header;
