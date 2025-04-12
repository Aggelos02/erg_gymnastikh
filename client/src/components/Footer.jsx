import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
  return (
    <footer style={styles.footer}>
      <a href="#" style={styles.button} title="Back to top">
        <i className="fas fa-arrow-up"></i>
      </a>
    </footer>
  );
}

const styles = {
  footer: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000
  },
  button: {
    backgroundColor: '#ef4444',
    color: 'white',
    padding: '12px',
    borderRadius: '50%',
    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
    textDecoration: 'none',
    fontSize: '16px'
  }
};

export default Footer;