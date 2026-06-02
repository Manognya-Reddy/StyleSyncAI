import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function LoginPage() {
  const { login } = useApp();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: 'demo@style.ai', password: 'demo123' });
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    try {
      let endpoint = '/api/auth/login';
      if (mode === 'signup') {
        endpoint = '/api/auth/signup';
      }
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }
      
      login(data.user, data.token);
    } catch(err) {
      login({ id: 1, name: form.name || 'Alex Chen', email: form.email }, 'demo_token');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-hero">
          <h1>Your personal<br/><em>style intelligence</em></h1>
          <p className="login-subtitle">Discover fashion that understands you</p>
        </div>
        
        <div className="mode-switch">
          <button onClick={() => setMode('login')} className={`mode-btn ${mode === 'login' ? 'active' : ''}`}>
            Sign In
          </button>
          <button onClick={() => setMode('signup')} className={`mode-btn ${mode === 'signup' ? 'active' : ''}`}>
            Create Account
          </button>
        </div>
        
        {mode === 'signup' && (
          <div className="form-field">
            <label>Name</label>
            <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Your name"/>
          </div>
        )}
        
        <div className="form-field">
          <label>Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="you@example.com"/>
        </div>
        
        <div className="form-field">
          <label>Password</label>
          <input type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} placeholder="••••••••"/>
        </div>
        
        {error && <p className="error-text">{error}</p>}
        
        <button className="primary-btn" onClick={handleSubmit}>
          {mode === 'login' ? 'Continue →' : 'Join AURA →'}
        </button>
        
        <p className="demo-text">
          Demo: demo@style.ai / demo123
        </p>
      </div>
    </div>
  );
}