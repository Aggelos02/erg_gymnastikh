import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo-transparent.png';

function Header() {
  const navigate = useNavigate();
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  })();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setShowDropdown(false);
    navigate('/');
    window.location.reload(); // προαιρετικό για full refresh
  };

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  return (
    <header className="main-header">
      <div className="nav-container">
        <a href="/" className="logo-link">
          <img src={logo} alt="AthloPlanAI" className="logo-img" />
        </a>
        <nav>
          <ul className="nav-links">
            <li><a href="#weekly">SPORTS</a></li>
            <li><a href="#contact">ΕΠΙΚΟΙΝΩΝΙΑ</a></li>
            {user ? (
              <li className="user-dropdown">
                <div className="avatar" onClick={toggleDropdown}>
                  {user.name[0].toUpperCase()}
                </div>
                {showDropdown && (
                  <div className="dropdown-content">
                    <p>{user.name}</p>
                    <button onClick={handleLogout}>Αποσύνδεση</button>
                    <button onClick={() => alert('🔧 Coming soon: Ρυθμίσεις')}>Ρυθμίσεις</button>
                    <button onClick={() => alert('🗑️ Coming soon: Διαγραφή λογαριασμού')}>Διαγραφή</button>
                  </div>
                )}
              </li>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Sign Up</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
