import React from 'react';
import './Navbar.css';

const Navbar = ({ activePage, setActivePage }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'business', label: 'Business', icon: '💰' },
{ id: 'expenses', label: 'Expenses', icon: '💵' },
    { id: 'account', label: 'Account', icon: '👤' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Spendly</h1>
      </div>
      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              className={`nav-link ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar; 