import React, { useState, useEffect } from "react";
import { FaCog, FaUserCircle } from 'react-icons/fa';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Business from "./components/Business";
import Expenses from "./components/Expenses";
import Account from "./components/Account";
import Auth from "./components/Auth";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return <Auth />;
  }

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
