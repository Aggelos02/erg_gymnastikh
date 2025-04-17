import React from 'react';
import './AuthStyles.css';
import logo from '../../assets/logo-transparent.png';
import bgRegister from '../../assets/man-mtb-2.jpg';

function RegisterForm() {
  return (
    <div className="auth-container">
      <div
        className="auth-image-section"
        style={{ backgroundImage: `url(${bgRegister})` }}
      />
      <div className="auth-form-section">
        <img src={logo} alt="AthloPlan" className="auth-logo" />
        <form className="auth-form">
          <h2>Εγγραφή</h2>
          <input type="text" placeholder="Ονοματεπώνυμο" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Κωδικός" required />
          <button type="submit">Εγγραφή</button>
          <p className="auth-footer">
            Έχεις ήδη λογαριασμό; <a href="/login">Σύνδεση</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
