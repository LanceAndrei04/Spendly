class App {
    constructor() {
        // Check if user is already logged in
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            this.initialize(currentUser);
        }
    }

    initialize(user) {
        this.user = user;
        // Initialize managers
        this.budget = new BudgetManager(user.id);
        this.expenseManager = new ExpenseManager(user.id);
    }
}

const app = new App();
