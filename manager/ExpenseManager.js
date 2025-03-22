class ExpenseManager {
    constructor(userId) {
        this.userId = userId;
        this.expenses = [];
        this.ui = new ExpenseUI(this);
        this.loadExpenses();
    }

    async loadExpenses() {
        try {
            const response = await fetch(`/api/expenses/${this.userId}`);
            if (response.ok) {
                this.expenses = await response.json();
                this.ui.updateAll(this.expenses);
                return this.expenses;
            }
        } catch (error) {
            console.error('Error loading expenses:', error);
        }
        return [];
    }

    async addExpense(description, amount, category) {
        const expense = {
            description,
            amount,
            category,
            date: new Date().toISOString()
        };

        try {
            const response = await fetch(`/api/expenses/${this.userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(expense)
            });

            if (response.ok) {
                const data = await response.json();
                expense.id = data.id;
                this.expenses.push(expense);
                this.ui.updateAll(this.expenses);
                return true;
            }
        } catch (error) {
            console.error('Error adding expense:', error);
        }
        return false;
    }

    async deleteExpense(id) {
        try {
            const response = await fetch(`/api/expenses/${this.userId}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                this.expenses = this.expenses.filter(expense => expense.id !== id);
                this.ui.updateAll(this.expenses);
                return true;
            }
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
        return false;
    }

    getTotalExpenses() {
        return this.expenses.reduce((total, expense) => total + expense.amount, 0);
    }

    getMonthlyExpenses() {
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        return this.expenses
            .filter(expense => new Date(expense.date) >= monthStart)
            .reduce((sum, expense) => sum + expense.amount, 0);
    }

    getLastTransaction() {
        if (this.expenses.length === 0) return null;
        return [...this.expenses].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    }

    getCategoryTotals() {
        const totals = {};
        this.expenses.forEach(expense => {
            totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
        });
        return totals;
    }
}S