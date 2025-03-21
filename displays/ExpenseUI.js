class ExpenseUI {
    constructor(manager) {
        this.manager = manager;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.getElementById('expense-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const description = document.getElementById('expense-name').value;
            const amount = parseFloat(document.getElementById('expense-amount').value);
            const category = document.getElementById('expense-category').value;

            if (isNaN(amount) || amount <= 0) {
                alert('Please enter a valid amount');
                return;
            }

            const success = await this.manager.addExpense(description, amount, category);
            if (success) {
                document.getElementById('expense-form').reset();
            } else {
                alert('Failed to add expense');
            }
        });
    }

    updateAll(expenses) {
        this.updateExpenseList(expenses);
        this.updateTotalExpenses();
        this.updateCategoryTotals();
        this.updateLastTransaction();
        this.updateMonthlyExpenses();
        // Update budget UI after expense changes
        if (app?.budget?.ui) {
            app.budget.ui.updateDisplay();
        }
    }

    updateExpenseList(expenses) {
        const tbody = document.getElementById('expense-list');
        tbody.innerHTML = '';

        expenses
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .forEach(expense => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${new Date(expense.date).toLocaleDateString()}</td>
                    <td>${expense.description}</td>
                    <td><i class="fas fa-tag"></i> ${expense.category}</td>
                    <td>$${expense.amount.toFixed(2)}</td>
                    <td>
                        <button onclick="app.expenseManager.deleteExpense(${expense.id})" 
                                class="delete-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
    }

    updateTotalExpenses() {
        const total = this.manager.getTotalExpenses();
        document.getElementById('total-expenses').textContent = `$${total.toFixed(2)}`;
    }

    updateCategoryTotals() {
        const categoryTotals = this.manager.getCategoryTotals();
        const totalExpenses = this.manager.getTotalExpenses();

        document.querySelectorAll('.category-box').forEach(box => {
            const category = box.dataset.category;
            const total = categoryTotals[category] || 0;
            const percent = totalExpenses > 0 ? (total / totalExpenses) * 100 : 0;
            
            box.querySelector('.category-amount').textContent = `$${total.toFixed(2)}`;
            box.querySelector('.category-percent').textContent = `${percent.toFixed(1)}%`;
        });
    }

    updateLastTransaction() {
        const lastTransaction = document.getElementById('last-transaction');
        const latest = this.manager.getLastTransaction();
        
        if (latest) {
            lastTransaction.textContent = `$${latest.amount.toFixed(2)} - ${latest.description}`;
        } else {
            lastTransaction.textContent = '-';
        }
    }

    updateMonthlyExpenses() {
        const monthlyTotal = this.manager.getMonthlyExpenses();
        document.getElementById('month-expenses').textContent = `$${monthlyTotal.toFixed(2)}`;
    }

    updateBudgetMeter() {
        const totalBudget = app.budget.getAmount();
        const totalExpenses = this.manager.getTotalExpenses();
        const percentage = (totalExpenses / totalBudget) * 100;
        
        const meterFill = document.getElementById('budget-meter');
        meterFill.style.width = `${Math.min(percentage, 100)}%`;
        meterFill.style.backgroundColor = percentage > 90 ? 'var(--danger-color)' : 
                                        percentage > 75 ? 'var(--warning-color)' : 
                                        'var(--primary-color)';
        
        app.budget.updateRemaining();
    }
}
