class BudgetUI {
    constructor(manager) {
        this.manager = manager;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const form = document.getElementById('budget-form');
        const amountInput = document.getElementById('budget-amount');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const amount = parseFloat(amountInput.value);

            if (isNaN(amount) || amount <= 0) {
                alert('Please enter a valid budget amount');
                return;
            }

            if (await this.manager.setBudget(amount)) {
                form.reset();
                this.updateDisplay();
            } else {
                alert('Failed to set budget');
            }
        });
    }

updateDisplay() {
        const totalBudget = this.manager.getAmount();
        document.getElementById('total-budget').textContent = `$${totalBudget.toFixed(2)}`;
        this.updateMeter(totalBudget);
    }

    updateMeter(totalBudget) {
        const totalExpenses = app?.expenseManager?.getTotalExpenses() || 0;
        const remaining = this.manager.calculateRemaining(totalExpenses);

        document.getElementById('remaining-budget').textContent = `$${remaining.toFixed(2)}`;
        document.getElementById('remaining-budget').style.color = this.manager.getRemainingColor(remaining);

        if (totalBudget > 0) {
            const percentage = (totalExpenses / totalBudget) * 100;
            const meterFill = document.getElementById('budget-meter');
            meterFill.style.width = `${Math.min(percentage, 100)}%`;
            meterFill.style.backgroundColor = percentage > 90 ? 'var(--danger-color)' : 
                                            percentage > 75 ? 'var(--warning-color)' : 
                                            'var(--primary-color)';
        }
    }
}