// Show/hide auth forms
function showLogin() {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('signup-form').classList.add('hidden');
    document.querySelector('.auth-tab:nth-child(1)').classList.add('active');
    document.querySelector('.auth-tab:nth-child(2)').classList.remove('active');
}

function showSignup() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
    document.querySelector('.auth-tab:nth-child(1)').classList.remove('active');
    document.querySelector('.auth-tab:nth-child(2)').classList.add('active');
}

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        showApp(currentUser);
    }
});

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const user = await response.json();
            localStorage.setItem('currentUser', JSON.stringify(user));
            showApp(user);
            form.reset();
        } else {
            const error = await response.json();
            alert(error.error || 'Login failed');
        }
    } catch (error) {
        alert('Network error. Please try again.');
    }
});

// Handle signup form submission
document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });

        if (response.ok) {
            const user = await response.json();
            localStorage.setItem('currentUser', JSON.stringify(user));
            showApp(user);
            form.reset();
        } else {
            const error = await response.json();
            alert(error.error || 'Registration failed');
        }
    } catch (error) {
        alert('Network error. Please try again.');
    }
});

// Show main app and initialize components
function showApp(user) {
    document.getElementById('auth-section').classList.add('hidden');
    document.getElementById('app-section').classList.remove('hidden');
    app.initialize(user);
}

// Handle logout
function logout() {
    localStorage.removeItem('currentUser');
    document.getElementById('auth-section').classList.remove('hidden');
    document.getElementById('app-section').classList.add('hidden');
    
    // Reset forms
    document.getElementById('login-form').reset();
    document.getElementById('signup-form').reset();
    showLogin();

    // Clear app data
    app.user = null;
    app.budget = null;
    app.expenseTracker = null;
}
