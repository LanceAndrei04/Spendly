class BudgetManager {
    constructor(userId) {
        this.userId = userId;
        this.amount = 0;
        this.ui = new BudgetUI(this);
        this.loadBudget();
    }

    async loadBudget() {
        try {
            const response = await fetch(`/api/budget/${this.userId}`);
            if (response.ok) {
                const data = await response.json();
                this.amount = data.amount || 0;
                this.ui.updateDisplay();
                return this.amount;
            }
        } catch (error) {
            console.error('Error loading budget:', error);
        }
        return 0;
    }

    async setBudget(amount) {
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
                this.ui.updateDisplay();
                return true;
            }
        } catch (error) {
            console.error('Error setting budget:', error);
        }
        return false;
    }

    getAmount() {
        return this.amount;
    }

    calculateRemaining(totalExpenses) {
        return this.amount - totalExpenses;
    }

    getRemainingColor(remaining) {
        if (remaining < 0) return 'var(--danger-color)';
        if (remaining < this.amount * 0.2) return '#ffd700';
        return 'var(--success-color)';
    }
}
