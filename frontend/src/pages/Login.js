import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import ReCAPTCHA from 'react-google-recaptcha';

const expenseSVG = (
  <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: 12 }}>
    <rect x="10" y="30" width="70" height="40" rx="10" fill="#e3e9f7" />
    <rect x="20" y="40" width="50" height="8" rx="2" fill="#1976d2" />
    <rect x="20" y="52" width="30" height="6" rx="2" fill="#43a047" />
    <circle cx="70" cy="60" r="7" fill="#fbc02d" stroke="#1976d2" strokeWidth="2" />
    <text x="70" y="64" textAnchor="middle" fontSize="10" fill="#1976d2" fontWeight="bold">₹</text>
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

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [captcha, setCaptcha] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!captcha) {
      setError('Please complete the captcha.');
      return;
    }
    try {
      const res = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, captcha })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        if (onLogin) onLogin(); // Update isAuthenticated in App.js
        navigate('/'); // Redirect to dashboard/expense page
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e3e9f7 0%, #f4f6fa 40%, #43a047 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
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
        {expenseSVG}
        <h2 style={{ textAlign: 'center', marginBottom: 18, color: '#1976d2', fontWeight: 700, letterSpacing: 1 }}>Welcome Back</h2>
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', marginBottom: 14, padding: 10, borderRadius: 7, border: '1px solid #b0b8d1', fontSize: 16 }} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', marginBottom: 18, padding: 10, borderRadius: 7, border: '1px solid #b0b8d1', fontSize: 16 }} />
          <div style={{ marginBottom: 18 }}>
            <ReCAPTCHA
              sitekey="6LeJhW0rAAAAAF8zjuKKAhqrA56KSdHvSOnpEKP-"
              onChange={value => setCaptcha(value)}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: 12, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 7, fontWeight: 700, fontSize: 17, letterSpacing: 1, boxShadow: '0 2px 8px rgba(25,118,210,0.10)', marginBottom: 6 }}>Login</button>
        </form>
        <div style={{ marginTop: 18, textAlign: 'center', width: '100%' }}>
          <span>Don't have an account? </span>
          <Link to="/register" style={{ color: '#1976d2', fontWeight: 600, textDecoration: 'none' }}>Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 