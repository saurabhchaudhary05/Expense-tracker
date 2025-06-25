import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

// Modern finance dashboard illustration SVG
const dashboardSVG = (
  <svg width="120" height="110" viewBox="0 0 120 110" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: 12 }}>
    <defs>
      <linearGradient id="bgGrad" x1="0" y1="0" x2="120" y2="110" gradientUnits="userSpaceOnUse">
        <stop stopColor="#5B8DF6" />
        <stop offset="1" stopColor="#8F5CF7" />
      </linearGradient>
    </defs>
    <ellipse cx="60" cy="55" rx="58" ry="48" fill="url(#bgGrad)" opacity="0.18" />
    <ellipse cx="60" cy="80" rx="22" ry="7" fill="#e3e9f7" />
    <rect x="48" y="60" width="24" height="14" rx="4" fill="#fff" stroke="#b0b8d1" strokeWidth="1.5" />
    <rect x="54" y="66" width="12" height="4" rx="1.5" fill="#5B8DF6" />
    <circle cx="60" cy="56" r="7" fill="#fff" stroke="#5B8DF6" strokeWidth="2" />
    <rect x="57" y="61" width="6" height="3" rx="1.5" fill="#b0b8d1" />
    <circle cx="60" cy="50" r="5" fill="#8F5CF7" />
    <rect x="20" y="30" width="18" height="10" rx="2" fill="#fff" stroke="#5B8DF6" strokeWidth="1" />
    <rect x="23" y="36" width="3" height="4" rx="1" fill="#5B8DF6" />
    <rect x="28" y="34" width="3" height="6" rx="1" fill="#43a047" />
    <rect x="33" y="38" width="3" height="2" rx="1" fill="#fbc02d" />
    <rect x="85" y="28" width="14" height="12" rx="2" fill="#fff" stroke="#8F5CF7" strokeWidth="1" />
    <rect x="87" y="30" width="10" height="2" rx="1" fill="#8F5CF7" />
    <rect x="87" y="34" width="2" height="2" rx="1" fill="#b0b8d1" />
    <rect x="91" y="34" width="2" height="2" rx="1" fill="#b0b8d1" />
    <circle cx="30" cy="80" r="7" fill="#fff" stroke="#43a047" strokeWidth="1.5" />
    <rect x="27" y="77" width="6" height="6" rx="2" fill="#43a047" />
    <circle cx="100" cy="80" r="6" fill="#fff" stroke="#fbc02d" strokeWidth="1.5" />
    <text x="100" y="84" textAnchor="middle" fontSize="10" fill="#fbc02d" fontWeight="bold">₹</text>
  </svg>
);

const walletSVG = (
  <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', bottom: 0, right: 0, opacity: 0.18, zIndex: 0 }}>
    <rect x="20" y="30" width="80" height="36" rx="10" fill="#43a047" />
    <rect x="30" y="38" width="60" height="10" rx="3" fill="#e3e9f7" />
    <circle cx="90" cy="60" r="8" fill="#fbc02d" stroke="#1976d2" strokeWidth="2" />
    <rect x="60" y="50" width="20" height="6" rx="2" fill="#1976d2" />
    <text x="90" y="64" textAnchor="middle" fontSize="12" fill="#1976d2" fontWeight="bold">💰</text>
  </svg>
);

// Piggy bank SVG for top left
const piggyBankSVG = (
  <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.18, zIndex: 0 }}>
    <ellipse cx="40" cy="40" rx="30" ry="15" fill="#8F5CF7" />
    <ellipse cx="40" cy="35" rx="22" ry="10" fill="#fff" />
    <circle cx="55" cy="32" r="4" fill="#fbc02d" />
    <rect x="36" y="20" width="8" height="8" rx="2" fill="#5B8DF6" />
    <ellipse cx="40" cy="20" rx="4" ry="2" fill="#43a047" />
  </svg>
);

// Large blurred gradient circle for background
const blurredCircle = (
  <svg width="400" height="400" style={{ position: 'absolute', left: '-120px', top: '-120px', zIndex: 0 }}>
    <defs>
      <radialGradient id="blurGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#8F5CF7" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#5B8DF6" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="200" cy="200" r="200" fill="url(#blurGrad)" />
  </svg>
);

// Floating geometric shapes
const floatingShapes = (
  <>
    <svg width="60" height="60" style={{ position: 'absolute', right: '10%', top: '10%', zIndex: 0, opacity: 0.13 }}>
      <rect x="10" y="10" width="40" height="40" rx="12" fill="#5B8DF6" />
    </svg>
    <svg width="40" height="40" style={{ position: 'absolute', left: '15%', bottom: '12%', zIndex: 0, opacity: 0.13 }}>
      <circle cx="20" cy="20" r="20" fill="#43a047" />
    </svg>
  </>
);

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const theme = useTheme();

  // Validation helpers
  const isValidUsername = str =>
    /^[A-Za-z]{4,}[A-Za-z0-9]*$/.test(str) && /[A-Za-z]/.test(str) && /\d/.test(str);
  const isValidEmail = str => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  const isStrongPassword = str =>
    str.length >= 8 &&
    /[A-Za-z]/.test(str) &&
    /\d/.test(str) &&
    /[^A-Za-z0-9]/.test(str);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    // Username validation
    if (!isValidUsername(username)) {
      setError('Username must start with at least 4 letters and contain both letters and numbers.');
      return;
    }
    // Email validation
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    // Password validation
    if (!isStrongPassword(password)) {
      setError('Password must be at least 8 characters and include a letter, a number, and a special character.');
      return;
    }
    try {
      const res = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Registration successful! You can now log in.');
        onRegister();
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #5B8DF6 0%, #8F5CF7 60%, #43a047 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {blurredCircle}
      {floatingShapes}
      {piggyBankSVG}
      {walletSVG}
      <div style={{
        maxWidth: 420,
        width: '100%',
        background: theme.palette.background.paper,
        borderRadius: 18,
        boxShadow: '0 8px 32px rgba(25,118,210,0.13)',
        padding: '2.5rem 2rem 2rem 2rem',
        margin: '0 auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 1,
      }}>
        {dashboardSVG}
        <h2 style={{ textAlign: 'center', marginBottom: 18, color: '#1976d2', fontWeight: 700, letterSpacing: 1 }}>Create Your Account</h2>
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        {success && (
          <div style={{ color: 'green', marginBottom: 12 }}>
            {success} <Link to="/login" style={{ color: '#1976d2', fontWeight: 600, textDecoration: 'none' }}>Go to Login</Link>
          </div>
        )}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <input type="text" placeholder="Username (4+ letters, numbers)" value={username} onChange={e => setUsername(e.target.value)} required style={{ width: '100%', marginBottom: 14, padding: 10, borderRadius: 7, border: '1px solid #b0b8d1', fontSize: 16 }} />
          <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', marginBottom: 14, padding: 10, borderRadius: 7, border: '1px solid #b0b8d1', fontSize: 16 }} />
          <input type="password" placeholder="Password (8+ chars, special)" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', marginBottom: 18, padding: 10, borderRadius: 7, border: '1px solid #b0b8d1', fontSize: 16 }} />
          <button type="submit" style={{ width: '100%', padding: 12, background: '#43a047', color: '#fff', border: 'none', borderRadius: 7, fontWeight: 700, fontSize: 17, letterSpacing: 1, boxShadow: '0 2px 8px rgba(67,160,71,0.10)', marginBottom: 6 }}>Register</button>
        </form>
        <div style={{ marginTop: 18, textAlign: 'center', width: '100%' }}>
          <span>Already have an account? </span>
          <Link to="/login" style={{ color: '#1976d2', fontWeight: 600, textDecoration: 'none' }}>Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register; 