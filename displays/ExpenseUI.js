class ExpenseUI {
    constructor(manager) {
        this.manager = manager;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const form = document.getElementById('expense-form');
        const nameInput = document.getElementById('expense-name');
        const amountInput = document.getElementById('expense-amount');
        const categoryInput = document.getElementById('expense-category');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const amount = parseFloat(amountInput.value);

            if (isNaN(amount) || amount <= 0) {
                alert('Please enter a valid amount');
                return;
            }

            if (await this.manager.addExpense(nameInput.value, amount, categoryInput.value)) {
                form.reset();
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
        app.budget.ui.updateDisplay();
    }

    updateExpenseList(expenses) {
        const tbody = document.getElementById('expense-list');
        tbody.innerHTML = '';

        expenses.sort((a, b) => new Date(b.date) - new Date(a.date))
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
        document.getElementById('total-expenses').textContent = 
            `$${this.manager.getTotalExpenses().toFixed(2)}`;
    }

    updateCategoryTotals() {
        const totals = this.manager.getCategoryTotals();
        const totalExpenses = this.manager.getTotalExpenses();

        document.querySelectorAll('.category-box').forEach(box => {
            const category = box.dataset.category;
            const total = totals[category] || 0;
            const percent = totalExpenses ? (total / totalExpenses) * 100 : 0;
            
            box.querySelector('.category-amount').textContent = `$${total.toFixed(2)}`;
            box.querySelector('.category-percent').textContent = `${percent.toFixed(1)}%`;
        });
    }

    updateLastTransaction() {
        const latest = this.manager.getLastTransaction();
        document.getElementById('last-transaction').textContent = 
            latest ? `$${latest.amount.toFixed(2)} - ${latest.description}` : '-';
    }

    updateMonthlyExpenses() {
        document.getElementById('month-expenses').textContent = 
            `$${this.manager.getMonthlyExpenses().toFixed(2)}`;
    }
}