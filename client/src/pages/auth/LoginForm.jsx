import React, { useState } from 'react';
import './AuthStyles.css';
import logo from '../../assets/logo-transparent.png';
import bgLogin from '../../assets/women-swimming.jpg';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          alert('Σύνδεση επιτυχής!');
          window.location.href = '/';
        } else {
          alert('Σύνδεση επιτυχής, αλλά δεν επιστράφηκαν στοιχεία χρήστη.');
        }
      } else {
        alert(data.error || 'Σφάλμα σύνδεσης');
      }
    } catch (err) {
      console.error(err);
      alert('Σφάλμα σύνδεσης με τον διακομιστή');
    }
  };

  return (
    <div className="auth-container">
      <div
        className="auth-image-section login-bg"
        style={{ backgroundImage: `url(${bgLogin})` }}
      />
      <div className="auth-form-section">
        <img src={logo} alt="AthloPlan" className="auth-logo" />
        <form className="auth-form" onSubmit={handleLogin}>
          <h2>Σύνδεση</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Κωδικός"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Σύνδεση</button>
          <p className="auth-footer">
            Δεν έχεις λογαριασμό; <a href="/register">Εγγραφή</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
