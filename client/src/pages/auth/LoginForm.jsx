import React from 'react';
import './AuthStyles.css'; // θα δημιουργήσουμε αυτό το css
import logo from '../../assets/logo-transparent.png';



function LoginForm() {
  return (
    <div className="auth-container">
      <div className="auth-image-section login-bg" />
      <div className="auth-form-section">
        <img src={logo} alt="AthloPlan" className="auth-logo" />
        <form className="auth-form">
          <h2>Σύνδεση</h2>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Κωδικός" required />
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
