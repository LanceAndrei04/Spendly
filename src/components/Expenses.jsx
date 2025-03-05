import React, { useState } from 'react';
import { FaHome, FaBolt, FaUsers, FaBoxes, FaTools, FaFileInvoiceDollar, FaHandHoldingUsd, FaEllipsisH, FaEdit } from 'react-icons/fa';
import './Expenses.css';

const Expenses = () => {
  const [expenses, setExpenses] = useState({
    total: 0,
    categories: [
      { name: 'Rent', amount: 2500, icon: <FaHome />, color: '#60a5fa' },
      { name: 'Utilities', amount: 800, icon: <FaBolt />, color: '#48bb78' },
      { name: 'Salaries', amount: 5000, icon: <FaUsers />, color: '#ed8936' },
      { name: 'Inventory', amount: 2000, icon: <FaBoxes />, color: '#9f7aea' },
      { name: 'Equipment', amount: 1500, icon: <FaTools />, color: '#f56565' },
      { name: 'Taxes', amount: 1200, icon: <FaFileInvoiceDollar />, color: '#38b2ac' },
      { name: 'Loans', amount: 1000, icon: <FaHandHoldingUsd />, color: '#805ad5' },
      { name: 'Other', amount: 500, icon: <FaEllipsisH />, color: '#a0aec0' }
    ]
  });

  const [budget, setBudget] = useState(20000);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);

  const totalExpenses = expenses.categories.reduce((sum, category) => sum + category.amount, 0);
  const remainingBudget = budget - totalExpenses;
  const budgetPercentage = (totalExpenses / budget) * 100;

  const handleBudgetUpdate = () => {
    setBudget(newBudget);
    setIsEditingBudget(false);
  };

  return (
    <div className="expenses-container">
      <div className="expenses-header">
        <h2>Business Expenses</h2>
        <div className="total-expenses">
          <span>Total Expenses:</span>
          <span className="amount">${totalExpenses.toLocaleString()}</span>
        </div>
      </div>

      <div className="budget-section">
        <div className="budget-header">
          <h3>Budget Overview</h3>
          {!isEditingBudget ? (
            <button className="edit-budget-btn" onClick={() => setIsEditingBudget(true)}>
              <FaEdit /> Edit Budget
            </button>
          ) : (
            <div className="budget-edit-form">
              <input
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(Number(e.target.value))}
                min="0"
                step="1000"
              />
              <button className="save-budget-btn" onClick={handleBudgetUpdate}>Save</button>
              <button className="cancel-budget-btn" onClick={() => setIsEditingBudget(false)}>Cancel</button>
            </div>
          )}
        </div>
        <div className="budget-meter">
          <div className="budget-info">
            <div className="budget-item">
              <span>Total Budget:</span>
              <span>${budget.toLocaleString()}</span>
            </div>
            <div className="budget-item">
              <span>Remaining:</span>
              <span className={remainingBudget >= 0 ? 'positive' : 'negative'}>
                ${remainingBudget.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="meter-container">
            <div 
              className="meter-fill"
              style={{ 
                width: `${Math.min(budgetPercentage, 100)}%`,
                backgroundColor: budgetPercentage > 90 ? '#f56565' : '#48bb78'
              }}
            />
          </div>
        </div>
      </div>

      <div className="expenses-grid">
        {expenses.categories.map((category, index) => (
          <div key={index} className="expense-card">
            <div className="expense-icon" style={{ color: category.color }}>
              {category.icon}
            </div>
            <div className="expense-info">
              <h3>{category.name}</h3>
              <p className="amount">${category.amount.toLocaleString()}</p>
            </div>
            <div className="expense-percentage">
              {((category.amount / totalExpenses) * 100).toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expenses; 