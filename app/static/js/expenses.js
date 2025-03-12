// Expense Management Class
class ExpenseManager {
    constructor() {
        this.expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
        this.form = document.getElementById('addExpenseForm');
        this.modal = document.getElementById('addExpenseModal');
        this.categoriesData = {
            inventory: { color: '#3498db', icon: 'boxes-stacked' },
            rent: { color: '#9b59b6', icon: 'building' },
            utilities: { color: '#2ecc71', icon: 'bolt' },
            salaries: { color: '#e74c3c', icon: 'users' },
            equipment: { color: '#f1c40f', icon: 'toolbox' },
            taxes: { color: '#e67e22', icon: 'file-invoice-dollar' },
            loans: { color: '#34495e', icon: 'money-bill-wave' },
            delivery: { color: '#7f8c8d', icon: 'truck-fast' }
        };

        this.setupEventListeners();
        this.updateCategoryTotals();
    }

    setupEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));

        // File input preview
        const receiptInput = this.form.querySelector('input[name="receipt"]');
        if (receiptInput) {
            receiptInput.addEventListener('change', (e) => this.handleFilePreview(e));
        }

        // Amount input formatting
        const amountInput = this.form.querySelector('input[name="amount"]');
        if (amountInput) {
            amountInput.addEventListener('input', (e) => this.formatAmount(e));
        }

        // Category selection
        const categorySelect = this.form.querySelector('select[name="category"]');
        if (categorySelect) {
            categorySelect.addEventListener('change', (e) => this.handleCategoryChange(e));
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData(this.form);
        const expense = {
            id: Date.now(),
            amount: parseFloat(formData.get('amount')),
            date: formData.get('date'),
            category: formData.get('category'),
            description: formData.get('description'),
            paymentMethod: formData.get('paymentMethod'),
            notes: formData.get('notes'),
            createdAt: new Date().toISOString()
        };

        // Handle file upload
        const receiptFile = formData.get('receipt');
        if (receiptFile && receiptFile.size > 0) {
            const reader = new FileReader();
            reader.onload = (e) => {
                expense.receipt = e.target.result;
                this.saveExpense(expense);
            };
            reader.readAsDataURL(receiptFile);
        } else {
            this.saveExpense(expense);
        }
    }

    saveExpense(expense) {
        this.expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(this.expenses));
        this.updateCategoryTotals();
        this.updateExpenseTable();
        this.closeModal();
        this.showNotification('Expense added successfully!', 'success');
        this.form.reset();
    }

    updateCategoryTotals() {
        const categories = document.querySelectorAll('.category-card');
        
        // Calculate total expenses for progress bar scaling
        const totalExpenses = this.expenses.reduce((sum, exp) => sum + exp.amount, 0);
        
        categories.forEach(card => {
            const category = card.dataset.category;
            const total = this.expenses
                .filter(exp => exp.category === category)
                .reduce((sum, exp) => sum + exp.amount, 0);
            
            // Update amount display
            const amountElement = card.querySelector('.amount');
            if (amountElement) {
                amountElement.textContent = this.formatCurrency(total);
            }
            
            // Update progress bar
            const progressBar = card.querySelector('.progress-bar');
            if (progressBar && totalExpenses > 0) {
                const percentage = (total / totalExpenses) * 100;
                progressBar.style.width = `${percentage}%`;
            }
        });
    }

    updateExpenseTable() {
        const tableBody = document.querySelector('#expenseTable tbody');
        if (!tableBody) return;

        tableBody.innerHTML = '';
        const sortedExpenses = [...this.expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

        sortedExpenses.forEach(expense => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${new Date(expense.date).toLocaleDateString()}</td>
                <td>${expense.category}</td>
                <td>${this.formatCurrency(expense.amount)}</td>
                <td>${expense.description}</td>
                <td>${expense.paymentMethod}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="expenseManager.editExpense(${expense.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="expenseManager.deleteExpense(${expense.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    editExpense(id) {
        const expense = this.expenses.find(exp => exp.id === id);
        if (!expense) return;

        // Populate form with expense data
        Object.entries(expense).forEach(([key, value]) => {
            const input = this.form.querySelector(`[name="${key}"]`);
            if (input && key !== 'receipt') {
                input.value = value;
            }
        });

        // Show modal
        const modal = bootstrap.Modal.getInstance(this.modal) || new bootstrap.Modal(this.modal);
        modal.show();
    }

    deleteExpense(id) {
        if (!confirm('Are you sure you want to delete this expense?')) return;

        this.expenses = this.expenses.filter(exp => exp.id !== id);
        localStorage.setItem('expenses', JSON.stringify(this.expenses));
        this.updateCategoryTotals();
        this.updateExpenseTable();
        this.showNotification('Expense deleted successfully!', 'success');
    }

    handleFilePreview(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            // You could add preview functionality here
            console.log('File loaded:', e.target.result.substring(0, 100) + '...');
        };
        reader.readAsDataURL(file);
    }

    formatAmount(e) {
        let value = e.target.value.replace(/[^\d.]/g, '');
        const parts = value.split('.');
        if (parts.length > 2) {
            parts[1] = parts.slice(1).join('');
            value = parts[0] + '.' + parts[1];
        }
        if (parts[1]?.length > 2) {
            value = parseFloat(value).toFixed(2);
        }
        e.target.value = value;
    }

    handleCategoryChange(e) {
        const category = e.target.value;
        // You could add category-specific logic here
        console.log('Category changed to:', category);
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    closeModal() {
        const modal = bootstrap.Modal.getInstance(this.modal);
        if (modal) {
            modal.hide();
        }
    }

    showNotification(message, type = 'info') {
        // You could implement a toast notification system here
        alert(message);
    }
}

// Initialize the expense manager
const expenseManager = new ExpenseManager();

// Add custom styles for the expense table
const style = document.createElement('style');
style.textContent = `
    .category-badge {
        padding: 0.25rem 0.5rem;
        border-radius: 1rem;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
    }
    
    .category-badge i {
        font-size: 0.75rem;
    }
`;
document.head.appendChild(style); 