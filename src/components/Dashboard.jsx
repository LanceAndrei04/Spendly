import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Expenses</h3>
          <p className="amount">$0.00</p>
        </div>
        <div className="dashboard-card">
          <h3>Total Income</h3>
          <p className="amount">$0.00</p>
        </div>
        <div className="dashboard-card">
          <h3>Recent Transactions</h3>
          <p className="amount">0</p>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="chart-card">
          <h3>Monthly Expenses Trend</h3>
          <div className="chart-placeholder">
            <div className="chart-bar" style={{ height: '60%' }}></div>
            <div className="chart-bar" style={{ height: '80%' }}></div>
            <div className="chart-bar" style={{ height: '40%' }}></div>
            <div className="chart-bar" style={{ height: '70%' }}></div>
            <div className="chart-bar" style={{ height: '50%' }}></div>
            <div className="chart-bar" style={{ height: '90%' }}></div>
          </div>
        </div>

        <div className="chart-card">
          <h3>Expense Categories</h3>
          <div className="chart-placeholder pie-chart">
            <div className="pie-segment" style={{ '--rotation': '0deg', '--percentage': '40%' }}></div>
            <div className="pie-segment" style={{ '--rotation': '144deg', '--percentage': '30%' }}></div>
            <div className="pie-segment" style={{ '--rotation': '252deg', '--percentage': '30%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 