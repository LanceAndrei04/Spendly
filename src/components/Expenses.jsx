import React, { useState } from 'react';
import { FaHome, FaBolt, FaUsers, FaBoxes, FaTools, FaFileInvoiceDollar, FaHandHoldingUsd, FaEllipsisH, FaEdit, FaPlus, FaTimes, FaTruck } from 'react-icons/fa';
import './Expenses.css';

const Expenses = () => {
  const [expenses, setExpenses] = useState({
    total: 0,
    categories: [
      { 
        name: 'Rent', 
        amount: 2500, 
        icon: <FaHome />, 
        color: '#60a5fa',
        history: [
          { date: '2024-03-01', amount: 2500, description: 'Monthly Rent' }
        ]
      },
      { 
        name: 'Utilities', 
        amount: 800, 
        icon: <FaBolt />, 
        color: '#48bb78',
        history: [
          { date: '2024-03-05', amount: 400, description: 'Electricity' },
          { date: '2024-03-10', amount: 400, description: 'Water' }
        ]
      },
      { 
        name: 'Salaries', 
        amount: 5000, 
        icon: <FaUsers />, 
        color: '#ed8936',
        history: [
          { date: '2024-03-15', amount: 5000, description: 'Monthly Salaries' }
        ]
      },
      { 
        name: 'Inventory', 
        amount: 2000, 
        icon: <FaBoxes />, 
        color: '#9f7aea',
        history: [
          { date: '2024-03-02', amount: 2000, description: 'Stock Replenishment' }
        ]
      },
      { 
        name: 'Equipment', 
        amount: 1500, 
        icon: <FaTools />, 
        color: '#f56565',
        history: [
          { date: '2024-03-08', amount: 1500, description: 'New Printer' }
        ]
      },
      { 
        name: 'Taxes', 
        amount: 1200, 
        icon: <FaFileInvoiceDollar />, 
        color: '#38b2ac',
        history: [
          { date: '2024-03-20', amount: 1200, description: 'Monthly Taxes' }
        ]
      },
      { 
        name: 'Loans', 
        amount: 1000, 
        icon: <FaHandHoldingUsd />, 
        color: '#805ad5',
        history: [
          { date: '2024-03-25', amount: 1000, description: 'Loan Payment' }
        ]
      },
      { 
        name: 'Transportation', 
        amount: 600, 
        icon: <FaTruck />, 
        color: '#ed8936',
        history: [
          { date: '2024-03-18', amount: 300, description: 'Fuel' },
          { date: '2024-03-22', amount: 300, description: 'Vehicle Maintenance' }
        ]
      },
      { 
        name: 'Other', 
        amount: 500, 
        icon: <FaEllipsisH />, 
        color: '#a0aec0',
        history: [
          { date: '2024-03-12', amount: 500, description: 'Office Supplies' }
        ]
      }
    ]
  });

  const [budget, setBudget] = useState(20000);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({ amount: '', description: '' });

  const totalExpenses = expenses.categories.reduce((sum, category) => sum + category.amount, 0);
  const remainingBudget = budget - totalExpenses;
  const budgetPercentage = (totalExpenses / budget) * 100;

  const handleBudgetUpdate = () => {
    setBudget(newBudget);
    setIsEditingBudget(false);
  };

  const handleAddExpense = () => {
    if (!newExpense.amount || !newExpense.description) return;

    const updatedCategories = expenses.categories.map(category => {
      if (category.name === selectedCategory.name) {
        const newAmount = category.amount + Number(newExpense.amount);
        const newHistory = [
          ...category.history,
          {
            date: new Date().toISOString().split('T')[0],
            amount: Number(newExpense.amount),
            description: newExpense.description
          }
        ];
        return { ...category, amount: newAmount, history: newHistory };
      }
      return category;
    });

    setExpenses({ ...expenses, categories: updatedCategories });
    setNewExpense({ amount: '', description: '' });
    setIsAddingExpense(false);
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
          <div 
            key={index} 
            className="expense-card"
            onClick={() => setSelectedCategory(category)}
          >
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
            <button 
              className="add-expense-btn"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCategory(category);
                setIsAddingExpense(true);
              }}
            >
              <FaPlus />
            </button>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className="expense-history-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{selectedCategory.name} History</h3>
              <button className="close-modal" onClick={() => setSelectedCategory(null)}>
                <FaTimes />
              </button>
            </div>
            <div className="history-list">
              {selectedCategory.history.map((expense, index) => (
                <div key={index} className="history-item">
                  <div className="history-date">{expense.date}</div>
                  <div className="history-description">{expense.description}</div>
                  <div className="history-amount">${expense.amount.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isAddingExpense && (
        <div className="add-expense-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add {selectedCategory.name} Expense</h3>
              <button className="close-modal" onClick={() => setIsAddingExpense(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="add-expense-form">
              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  placeholder="Enter amount"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                  placeholder="Enter description"
                />
              </div>
              <button className="save-expense-btn" onClick={handleAddExpense}>
                Add Expense
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expenses; 