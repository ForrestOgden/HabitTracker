// Helper functions to save, retrieve, and remove data from local storage
function saveToLocal(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocal(key) {
    return JSON.parse(localStorage.getItem(key));
}

function removeFromLocal(key) {
    localStorage.removeItem(key);
}

// User registration and login
document.getElementById('register-here').addEventListener('click', function() {
    document.getElementById('register-header').style.display = 'block';
    document.getElementById('register-username').style.display = 'block';
    document.getElementById('register-password').style.display = 'block';
    document.getElementById('register-btn').style.display = 'block';
    document.getElementById('login-username').style.display = 'none';
    document.getElementById('login-password').style.display = 'none';
    document.getElementById('login-btn').style.display = 'none';
});

document.getElementById('register-btn').addEventListener('click', function() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    if (username && password) {
        saveToLocal('user', { username, password });
        alert('Registration successful! You can now log in.');
        document.getElementById('register-header').style.display = 'none';
        document.getElementById('register-username').style.display = 'none';
        document.getElementById('register-password').style.display = 'none';
        document.getElementById('register-btn').style.display = 'none';
        document.getElementById('login-username').style.display = 'block';
        document.getElementById('login-password').style.display = 'block';
        document.getElementById('login-btn').style.display = 'block';
    } else {
        alert('Please fill in all fields.');
    }
});

document.getElementById('login-btn').addEventListener('click', function() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const user = getFromLocal('user');
    
    if (user && user.username === username && user.password === password) {
        alert('Login successful!');
        document.getElementById('auth').style.display = 'none';
        document.getElementById('tracker').style.display = 'block';
        loadQuote();
        loadHabits();
    } else {
        alert('Invalid username or password.');
    }
});

// Load and display an inspirational quote
function loadQuote() {
    const quotes = [
        "“I can do all things through Christ who strengthens me.” – Philippians 4:13",
        "“For I know the plans I have for you,” declares the Lord, “plans to prosper you and not to harm you, plans to give you hope and a future.” – Jeremiah 29:11",
        "“The Lord is my strength and my shield; my heart trusts in him, and he helps me.” – Psalm 28:7"
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quote').innerText = randomQuote;
}

// Habit tracking functionality
let habits = getFromLocal('habits') || [];

document.getElementById('add-habit-btn').addEventListener('click', function() {
    const habitInput = document.getElementById('habit-input');
    const habit = habitInput.value;

    if (habit) {
        habits.push({ name: habit, completed: false });
        saveToLocal('habits', habits);
        habitInput.value = '';
        loadHabits();
    } else {
        alert('Please enter a habit.');
    }
});

function loadHabits() {
    const habitList = document.getElementById('habit-list');
    habitList.innerHTML = '';

    habits.forEach((habit, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" id="habit-${index}" ${habit.completed ? 'checked' : ''}>
            <label for="habit-${index}">${habit.name}</label>
            <button class="delete-btn" data-index="${index}">🗑️</button>
        `;
        habitList.appendChild(li);

        document.getElementById(`habit-${index}`).addEventListener('change', function() {
            habit.completed = this.checked;
            saveToLocal('habits', habits);
            alert(`${habit.name} marked as ${habit.completed ? 'completed' : 'incomplete'}`);
        });

        li.querySelector('.delete-btn').addEventListener('click', function() {
            habits.splice(index, 1);
            saveToLocal('habits', habits);
            loadHabits();
        });
    });
}

// Mood tracking functionality
document.getElementById('submit-mood-btn').addEventListener('click', function() {
    const moodInput = document.getElementById('mood-input').value;

    if (moodInput) {
        alert(`Your mood is recorded as: ${moodInput}`);
        document.getElementById('mood-input').value = '';
    } else {
        alert('Please enter your mood.');
    }
});

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', function() {
    if (confirm('Are you sure you want to logout?')) {
        document.getElementById('tracker').style.display = 'none';
        document.getElementById('auth').style.display = 'block';
        document.getElementById('login-username').value = '';
        document.getElementById('login-password').value = '';
        document.getElementById('habit-input').value = '';
        document.getElementById('mood-input').value = '';
    }
});
