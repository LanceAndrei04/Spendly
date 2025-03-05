import React, { useState } from "react";
import { FaCog, FaUserCircle } from 'react-icons/fa';
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Business from "./components/Business";
import Expenses from "./components/Expenses";
import Account from "./components/Account";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "business":
        return <Business />;
      case "expenses":
        return <Expenses />;
      case "income":
        return <div className="page-content">Income Management</div>;
      case "account":
        return <Account />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <div className="content-wrapper">
        <header className="top-header">
          <div className="business-name">BUSINESS NAME</div>
          <div className="header-icons">
            <button className="icon-button">
              <FaCog className="icon" />
            </button>
            <button className="icon-button">
              <FaUserCircle className="icon" />
            </button>
          </div>
        </header>
        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
