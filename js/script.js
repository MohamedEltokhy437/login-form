// Helper: Get users from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}
// Helper: Save users to localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Registration
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim().toLowerCase();
        const password = document.getElementById('registerPassword').value;
        const users = getUsers();
        const exists = users.some(u => u.email === email);
        const message = document.getElementById('registerMessage');
        const success = document.getElementById('registerSuccess');
        message.style.display = 'none';
        success.style.display = 'none';
        if (exists) {
            message.textContent = 'Email is already registered.';
            message.style.display = 'block';
            return;
        }
        users.push({ name, email, password });
        saveUsers(users);
        success.textContent = 'Registration successful! You can now log in.';
        success.style.display = 'block';
        this.reset();
    });
}

// Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim().toLowerCase();
        const password = document.getElementById('loginPassword').value;
        const users = getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        const message = document.getElementById('loginMessage');
        const welcome = document.getElementById('welcomeMessage');
        message.style.display = 'none';
        welcome.style.display = 'none';
        if (user) {
            welcome.textContent = `Welcome, ${user.name}!`;
            welcome.style.display = 'block';
            this.reset();
        } else {
            message.textContent = 'Invalid email or password.';
            message.style.display = 'block';
        }
    });
} 