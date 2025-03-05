import React from 'react';
import { 
  FaChartLine, 
  FaBuilding, 
  FaMoneyBillWave, 
  FaUserCircle,
  FaCog,
  FaSignOutAlt
} from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ activePage, setActivePage }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaChartLine /> },
    { id: 'business', label: 'Business', icon: <FaBuilding /> },
    { id: 'expenses', label: 'Expenses', icon: <FaMoneyBillWave /> },
    { id: 'account', label: 'Account', icon: <FaUserCircle /> }
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
      <div className="navbar-footer">
        <button className="nav-link">
          <span className="nav-icon"><FaCog /></span>
          <span className="nav-label">Settings</span>
        </button>
        <button className="nav-link">
          <span className="nav-icon"><FaSignOutAlt /></span>
          <span className="nav-label">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 