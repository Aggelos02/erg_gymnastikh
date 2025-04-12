import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={styles.logoArea}>
          <img
            src="https://placehold.co/40x40"
            alt="Logo"
            style={styles.logo}
          />
          <span style={styles.logoText}>sports.systems</span>
        </div>

        <nav style={styles.nav}>
          <a href="#" style={{ ...styles.navLink, color: 'red' }}>ΑΡΧΙΚΗ</a>
          <a href="#" style={styles.navLink}>SPORTS</a>
          <a href="#" style={styles.navLink}>FAQ</a>
          <a href="#" style={styles.navLink}>BLOG & ΝΕΑ</a>
          <a href="#" style={styles.navLink}>ΕΠΙΚΟΙΝΩΝΙΑ</a>
          <a href="#" style={styles.navLink}>ΣΥΝΕΡΓΑΤΕΣ</a>
          <a href="#" style={styles.button}>ΘΕΛΩ ΝΑ ΞΕΚΙΝΗΣΩ</a>
        </nav>

        <div style={styles.languageArea}>
          <a href="#" style={styles.icon}>🇬🇷</a>
          <a href="#" style={styles.icon}>🇬🇧</a>
          <a href="#" style={styles.icon}>Login</a>
          <a href="#" style={styles.icon}>
            <i className="fas fa-search"></i>
          </a>
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#111827',
    color: 'white',
    padding: '10px 0'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logoArea: {
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    height: '40px',
    width: '40px'
  },
  logoText: {
    marginLeft: '10px',
    fontWeight: 'bold',
    fontSize: '18px'
  },
  nav: {
    display: 'flex',
    gap: '15px'
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '14px'
  },
  button: {
    backgroundColor: '#ef4444',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  languageArea: {
    display: 'flex',
    gap: '10px',
    fontSize: '14px'
  },
  icon: {
    color: 'white',
    textDecoration: 'none'
  }
};

export default Header;