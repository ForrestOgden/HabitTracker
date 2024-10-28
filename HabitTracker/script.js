// Get DOM elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const habitTracker = document.getElementById('habit-tracker');
const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');
const logoutButton = document.getElementById('logout-button');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');

// Check if user is logged in
if (localStorage.getItem('loggedIn') === 'true') {
    showHabitTracker();
}

// Event Listeners
loginButton.addEventListener('click', login);
registerButton.addEventListener('click', register);
showRegister.addEventListener('click', () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
});
showLogin.addEventListener('click', () => {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
});
logoutButton.addEventListener('click', logout);

// Login function
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (localStorage.getItem(username) === password) {
        localStorage.setItem('loggedIn', 'true');
        showHabitTracker();
    } else {
        alert('Invalid username or password.');
    }
}

// Register function
function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (localStorage.getItem(username)) {
        alert('Username already exists. Please choose another.');
    } else {
        localStorage.setItem(username, password);
        alert('Registration successful! You can now log in.');
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('loggedIn');
    habitTracker.style.display = 'none';
    loginForm.style.display = 'block';
}

// Show the habit tracker
function showHabitTracker() {
    loginForm.style.display = 'none';
    registerForm.style.display = 'none';
    habitTracker.style.display = 'block';
}
