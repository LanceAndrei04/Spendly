import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Business from "./components/Business";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "business":
        return <Business />;
      case "expenses":
        return <div className="page-content">Business Expense Logging</div>;
      case "income":
        return <div className="page-content">Income Management</div>;
      case "account":
        return <div className="page-content">Account Settings</div>;
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
              <span className="icon">⚙️</span>
            </button>
            <button className="icon-button">
              <span className="icon">👤</span>
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
