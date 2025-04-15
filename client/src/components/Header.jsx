import React from 'react';

function Header() {
  return (
    <header style={{ background: '#111827', padding: '1rem 0', color: '#fff', position: 'sticky', top: 0, zIndex: 999 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', color: '#e63946' }}>sports.systems</h1>
        <nav>
          <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0 }}>
            <li><a href="#hero" style={{ color: '#fff', textDecoration: 'none' }}>ΑΡΧΙΚΗ</a></li>
            <li><a href="#weekly" style={{ color: '#fff', textDecoration: 'none' }}>SPORTS</a></li>
            <li><a href="#progress" style={{ color: '#fff', textDecoration: 'none' }}>BLOG</a></li>
            <li><a href="#contact" style={{ color: '#fff', textDecoration: 'none' }}>ΕΠΙΚΟΙΝΩΝΙΑ</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
