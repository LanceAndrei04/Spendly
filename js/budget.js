class Budget {
    constructor(userId) {
        this.userId = userId;
        this.amount = 0;
        this.initializeEventListeners();
        this.loadBudget();
    }

    initializeEventListeners() {
        document.getElementById('budget-form').addEventListener('submit', (e) => this.setBudget(e));
    }

    async loadBudget() {
        try {
            const response = await fetch(`/api/budget/${this.userId}`);
            if (response.ok) {
                const data = await response.json();
                this.amount = data.amount;
                this.updateDisplay();
            }
        } catch (error) {
            console.error('Error loading budget:', error);
        }
    }

    async setBudget(e) {
        e.preventDefault();
        const amount = parseFloat(document.getElementById('budget-amount').value);
        if (isNaN(amount) || amount < 0) {
            alert('Please enter a valid budget amount');
            return;
        }

        try {
            const response = await fetch(`/api/budget/${this.userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount })
            });

            if (response.ok) {
                this.amount = amount;
                this.updateDisplay();
                document.getElementById('budget-form').reset();
            } else {
                alert('Failed to update budget');
            }
        } catch (error) {
            alert('Network error. Please try again.');
        }
    }

    updateDisplay() {
        document.getElementById('total-budget').textContent = `$${this.amount.toFixed(2)}`;
        this.updateRemaining();
    }

    updateRemaining() {
        const expenses = app.expenseTracker.getTotalExpenses();
        const remaining = this.amount - expenses;
document.getElementById('remaining-budget').textContent = `$${remaining.toFixed(2)}`;
        
        const remainingElement = document.getElementById('remaining-budget');
        if (remaining < 0) {
            remainingElement.style.color = 'var(--danger-color)';
        } else if (remaining < this.amount * 0.2) {
            remainingElement.style.color = '#ffd700';
        } else {
            remainingElement.style.color = 'var(--success-color)';
        }
    }

    getAmount() {
        return this.amount;
    }
}
