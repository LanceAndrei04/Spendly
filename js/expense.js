// class ExpenseTracker {
//     constructor(userId) {
//         this.userId = userId;
//         this.expenses = [];
//         this.initializeEventListeners();
//         this.loadExpenses();
//     }

//     initializeEventListeners() {
//         document.getElementById('expense-form').addEventListener('submit', (e) => this.addExpense(e));
//     }

//     async loadExpenses() {
//         try {
//             const response = await fetch(`/api/expenses/${this.userId}`);
//             if (response.ok) {
//                 this.expenses = await response.json();
//                 this.updateDisplay();
//                 this.updateCategoryTotals();
//                 this.updateLastTransaction();
//                 this.updateMonthlyExpenses();
//             }
//         } catch (error) {
//             console.error('Error loading expenses:', error);
//         }
//     }

//     async addExpense(e) {
//         e.preventDefault();
//         const description = document.getElementById('expense-name').value;
//         const amount = parseFloat(document.getElementById('expense-amount').value);
//         const category = document.getElementById('expense-category').value;

//         if (isNaN(amount) || amount <= 0) {
//             alert('Please enter a valid amount');
//             return;
//         }

//         const expense = {
//             description,
//             amount,
//             category,
//             date: new Date().toISOString()
//         };

//         try {
//             const response = await fetch(`/api/expenses/${this.userId}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(expense)
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 expense.id = data.id;
//                 this.expenses.push(expense);
//                 this.updateDisplay();
//                 this.updateCategoryTotals();
//                 this.updateLastTransaction();
//                 this.updateMonthlyExpenses();
//                 document.getElementById('expense-form').reset();
//             } else {
//                 alert('Failed to add expense');
//             }
//         } catch (error) {
//             alert('Network error. Please try again.');
//         }
//     }

//     async deleteExpense(id) {
//         try {
//             const response = await fetch(`/api/expenses/${this.userId}/${id}`, {
//                 method: 'DELETE'
//             });

//             if (response.ok) {
//                 this.expenses = this.expenses.filter(expense => expense.id !== id);
//                 this.updateDisplay();
//                 this.updateCategoryTotals();
//                 this.updateLastTransaction();
//                 this.updateMonthlyExpenses();
//             } else {
//                 alert('Failed to delete expense');
//             }
//         } catch (error) {
//             alert('Network error. Please try again.');
//         }
//     }

//     updateDisplay() {
//         const tbody = document.getElementById('expense-list');
//         tbody.innerHTML = '';

//         this.expenses
//             .sort((a, b) => new Date(b.date) - new Date(a.date))
//             .forEach(expense => {
//                 const tr = document.createElement('tr');
//                 tr.innerHTML = `
//                     <td>${new Date(expense.date).toLocaleDateString()}</td>
//                     <td>${expense.description}</td>
//                     <td><i class="fas fa-tag"></i> ${expense.category}</td>
//                     <td>$${expense.amount.toFixed(2)}</td>
//                     <td>
//                         <button onclick="app.expenseTracker.deleteExpense(${expense.id})" 
//                                 class="delete-btn">
//                             <i class="fas fa-trash"></i>
//                         </button>
//                     </td>
//                 `;
//                 tbody.appendChild(tr);
//             });

//         document.getElementById('total-expenses').textContent = `$${this.getTotalExpenses().toFixed(2)}`;
        
//         // Update budget meter
//         const totalBudget = app.budget.getAmount();
//         const totalExpenses = this.getTotalExpenses();
//         const percentage = (totalExpenses / totalBudget) * 100;
//         const meterFill = document.getElementById('budget-meter');
//         meterFill.style.width = `${Math.min(percentage, 100)}%`;
//         meterFill.style.backgroundColor = percentage > 90 ? 'var(--danger-color)' : 
//                                         percentage > 75 ? 'var(--warning-color)' : 
//                                         'var(--primary-color)';
        
//         app.budget.updateRemaining();
//     }

//     updateCategoryTotals() {
//         const categoryTotals = {};
//         const totalExpenses = this.getTotalExpenses();

//         // Initialize all categories to 0
//         document.querySelectorAll('.category-box').forEach(box => {
//             const category = box.dataset.category;
//             categoryTotals[category] = 0;
//         });

//         // Calculate totals
//         this.expenses.forEach(expense => {
//             if (categoryTotals.hasOwnProperty(expense.category)) {
//                 categoryTotals[expense.category] += expense.amount;
//             }
//         });

//         // Update category boxes
//         for (const [category, total] of Object.entries(categoryTotals)) {
//             const box = document.querySelector(`.category-box[data-category="${category}"]`);
//             const percent = totalExpenses > 0 ? (total / totalExpenses) * 100 : 0;
            
//             box.querySelector('.category-amount').textContent = `$${total.toFixed(2)}`;
//             box.querySelector('.category-percent').textContent = `${percent.toFixed(1)}%`;
//         }
//     }

//     updateLastTransaction() {
//         const lastTransaction = document.getElementById('last-transaction');
//         if (this.expenses.length > 0) {
//             const latest = this.expenses.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
//             lastTransaction.textContent = `$${latest.amount.toFixed(2)} - ${latest.description}`;
//         } else {
//             lastTransaction.textContent = '-';
//         }
//     }

//     updateMonthlyExpenses() {
//         const now = new Date();
//         const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        
//         const monthlyTotal = this.expenses
//             .filter(expense => new Date(expense.date) >= monthStart)
//             .reduce((sum, expense) => sum + expense.amount, 0);
        
//         document.getElementById('month-expenses').textContent = `$${monthlyTotal.toFixed(2)}`;
//     }

//     getTotalExpenses() {
//         return this.expenses.reduce((total, expense) => total + expense.amount, 0);
//     }
// }
