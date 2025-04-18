import React, { useState } from 'react';
import './AuthStyles.css';
import logo from '../../assets/logo-transparent.png';
import bgRegister from '../../assets/man-mtb-2.jpg';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);

  const isPasswordValid = (pw) => {
    return (
      pw.length >= 8 &&
      /[a-zA-Z]/.test(pw) &&   // τουλάχιστον ένα γράμμα
      /\d/.test(pw)            // τουλάχιστον ένα ψηφίο
    );
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!isPasswordValid(password)) {
      alert('Ο κωδικός πρέπει να έχει τουλάχιστον 8 χαρακτήρες, ένα γράμμα και έναν αριθμό.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Εγγραφή επιτυχής!');
        window.location.href = '/login';
      } else {
        alert(data.error || 'Σφάλμα εγγραφής');
      }
    } catch (err) {
      console.error(err);
      alert('Σφάλμα σύνδεσης με το διακομιστή');
    }
  };

  return (
    <div className="auth-container">
      <div
        className="auth-image-section"
        style={{ backgroundImage: `url(${bgRegister})` }}
      />
      <div className="auth-form-section">
        <img src={logo} alt="AthloPlan" className="auth-logo" />
        <form className="auth-form" onSubmit={handleRegister}>
          <h2>Εγγραφή</h2>
          <input
            type="text"
            placeholder="Ονοματεπώνυμο"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            onBlur={() => setPasswordTouched(true)}
            required
          />
          {passwordTouched && !isPasswordValid(password) && (
            <ul className="password-requirements">
              <li>🔒 Τουλάχιστον 8 χαρακτήρες</li>
              <li>🔤 Τουλάχιστον 1 γράμμα</li>
              <li>🔢 Τουλάχιστον 1 αριθμός</li>
            </ul>
          )}
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
