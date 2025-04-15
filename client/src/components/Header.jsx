import React from 'react';
import logo from '../assets/logo-transparent.png'; 

function Header() {
  return (
    <header className="main-header">
      <div className="nav-container">
        <a href="/" className="logo-link">
          <img src={logo} alt="AthloPlan logo" className="logo-img" />
        </a>
        <nav className="nav-links">
          <a href="#hero">ΑΡΧΙΚΗ</a>
          <a href="#weekly">SPORTS</a>
          <a href="#workouts">Workouts</a>
          <a href="#progress">BLOG</a>
          <a href="#contact">ΕΠΙΚΟΙΝΩΝΙΑ</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
