// Profile Management
let businessName = localStorage.getItem('businessName') || 'Business';
document.getElementById('business-name').textContent = businessName;

// Toggle user popup
function toggleUserPopup() {
    const popup = document.getElementById('user-popup');
    popup.classList.toggle('hidden');

    // Update user info in popup
    if (!popup.classList.contains('hidden')) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            document.getElementById('user-name').textContent = currentUser.name;
            document.getElementById('user-email').textContent = currentUser.email;
        }
        
        // Set current business name in input
        document.getElementById('business-name-input').value = businessName;
    }
}

// Save business name
function saveBusinessName() {
    const input = document.getElementById('business-name-input');
    const newBusinessName = input.value.trim();
    
    if (newBusinessName) {
        businessName = newBusinessName;
        localStorage.setItem('businessName', businessName);
        document.getElementById('business-name').textContent = businessName;
        toggleUserPopup(); // Close popup after saving
    }
}

// Close popup when clicking outside
document.addEventListener('click', (e) => {
    const popup = document.getElementById('user-popup');
    const userBtn = document.querySelector('.user-btn');
    
    if (!popup.classList.contains('hidden') && 
        !popup.contains(e.target) && 
        !userBtn.contains(e.target)) {
        popup.classList.add('hidden');
    }
});
