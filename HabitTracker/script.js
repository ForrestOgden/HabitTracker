// Select elements from the DOM
const habitInput = document.getElementById('habit-input');
const addHabitButton = document.getElementById('add-habit-button');
const habitList = document.getElementById('habit-list');
const logoutButton = document.getElementById('logout-button');
const quoteElement = document.getElementById('quote');
const loginSection = document.getElementById('login-section');
const habitTrackerSection = document.getElementById('habit-tracker-section');
const submitProgressButton = document.getElementById('submit-progress-button');

// Array of quotes
const quotes = [
    "Faith is taking the first step even when you don't see the whole staircase. – Martin Luther King Jr.",
    "With God all things are possible. – Matthew 19:26",
    "Trust in the Lord with all your heart. – Proverbs 3:5",
    "The will of God will never take you where the grace of God will not protect you.",
    "Prayer does not change God, but it changes him who prays. – Søren Kierkegaard"
];

// Load habits from localStorage when the app starts
function loadHabits() {
    const habits = JSON.parse(localStorage.getItem('habits')) || [];
    habits.forEach(habit => {
        addHabitToList(habit.name, habit.completed);
    });
}

// Save habits to localStorage
function saveHabits() {
    const habits = [];
    document.querySelectorAll('li').forEach(li => {
        const habitName = li.textContent.replace('🗑️', '').trim();
        const isChecked = li.querySelector('input[type="checkbox"]').checked;
        habits.push({ name: habitName, completed: isChecked });
    });
    localStorage.setItem('habits', JSON.stringify(habits));
}

// Function to add a habit to the list
function addHabitToList(habit, completed = false) {
    const li = document.createElement('li');
    li.textContent = habit;
    
    // Create a checkbox for tracking completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed; // Set checkbox state based on completion

    // Create a delete button (trash icon)
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '🗑️';
    deleteButton.className = 'delete-habit-button';
    deleteButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this habit?')) {
            li.remove();
            saveHabits(); // Update storage after deletion
        }
    });
    
    li.prepend(checkbox); // Add checkbox to the list item
    li.appendChild(deleteButton); // Add delete button to the list item
    habitList.appendChild(li);
}

// Display a random quote
function displayRandomQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteElement.innerText = randomQuote;
}

// Event listener for adding a habit
addHabitButton.addEventListener('click', () => {
    const habit = habitInput.value.trim();
    if (habit) {
        addHabitToList(habit);
        habitInput.value = ''; // Clear the input field
        saveHabits(); // Save to localStorage
        alert('Habit added successfully!'); // Feedback message
    } else {
        alert('Please enter a habit.'); // Alert for empty input
    }
});

// Event listener for logging in
document.getElementById('login-button').addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value; // Capture password
    if (username && password) {
        localStorage.setItem('username', username);
        loginSection.style.display = 'none';
        habitTrackerSection.style.display = 'block';
        loadHabits(); // Load habits after logging in
        displayRandomQuote(); // Display a random quote
    } else {
        alert('Please enter both username and password.'); // Alert for empty fields
    }
});

// Event listener for logging out
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('username'); // Clear the username
    loginSection.style.display = 'block'; // Show login section
    habitTrackerSection.style.display = 'none'; // Hide habit tracker section
});

// Event listener for submitting progress
submitProgressButton.addEventListener('click', () => {
    const checkedHabits = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.parentElement.textContent.replace('🗑️', '').trim());
    if (checkedHabits.length > 0) {
        alert(`You've completed the following habits: ${checkedHabits.join(', ')}`);
        saveHabits(); // Save to localStorage after submitting
    } else {
        alert('No habits checked. Please check at least one habit to submit progress.'); // Alert for no checked habits
    }
});

// Check if user is already logged in
if (localStorage.getItem('username')) {
    loginSection.style.display = 'none';
    habitTrackerSection.style.display = 'block';
    loadHabits(); // Load habits if logged in
    displayRandomQuote(); // Display a random quote
}
