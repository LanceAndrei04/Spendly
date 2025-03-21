class BudgetUI {
    constructor(manager) {
        this.manager = manager;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.getElementById('budget-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const amount = parseFloat(document.getElementById('budget-amount').value);

            if (isNaN(amount) || amount <= 0) {
                alert('Please enter a valid budget amount');
                return;
            }

            const success = await this.manager.setBudget(amount);
            if (success) {
                document.getElementById('budget-form').reset();
                this.updateDisplay();
            } else {
                alert('Failed to set budget');
            }
        });
    }

    updateDisplay() {
        const totalBudget = this.manager.getAmount();
        document.getElementById('total-budget').textContent = `$${totalBudget.toFixed(2)}`;
        this.updateMeter();
    }

    updateMeter() {
        const totalBudget = this.manager.getAmount();
        const totalExpenses = app?.expenseManager?.getTotalExpenses() || 0;
        const remaining = this.manager.calculateRemaining(totalExpenses);
        
        // Update remaining amount with proper color
        const remainingElement = document.getElementById('remaining-budget');
        remainingElement.textContent = `$${remaining.toFixed(2)}`;
        remainingElement.style.color = this.manager.getRemainingColor(remaining);

        // Update meter fill
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
