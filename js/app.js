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
        // Use the numeric ID instead of email
        this.budget = new Budget(user.id);
        this.expenseTracker = new ExpenseTracker(user.id);
    }
}

const app = new App();
