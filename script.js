// Clock and Date
const clock = document.getElementById('clock');
const date = document.getElementById('date');

function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  let amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert to 12-hour format
  const minutes = now.getMinutes().toString().padStart(2, '0');
  clock.textContent = `${hours}:${minutes} ${amPm}`;

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  date.textContent = now.toLocaleDateString(undefined, options);
}

setInterval(updateTime, 1000);
updateTime();

// Theme Switching
const body = document.body;

// Check system theme preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  body.classList.add('dark');
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (e.matches) {
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
  }
});

// Search Bar Functionality
const searchInput = document.getElementById('search-input');

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const query = searchInput.value.trim();
    if (query) {
      if (query.startsWith('http://') || query.startsWith('https://')) {
        window.location.href = query;
      } else if (query.includes('.')) {
        window.location.href = `https://${query}`;
      } else {
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      }
    }
  }
});

// AI Tools Dropdown
const aiToolsButton = document.getElementById('ai-tools-button');
const aiToolsDropdown = document.getElementById('ai-tools');

aiToolsButton.addEventListener('click', () => {
  aiToolsDropdown.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!aiToolsDropdown.contains(e.target) && !aiToolsButton.contains(e.target)) {
    aiToolsDropdown.classList.remove('active');
  }
});

// Side Menu
const menuButton = document.getElementById('menu-button');
const sideMenu = document.getElementById('side-menu');
const closeMenuButton = document.getElementById('close-menu-button');

menuButton.addEventListener('click', () => {
  sideMenu.classList.add('active');
});

closeMenuButton.addEventListener('click', () => {
  sideMenu.classList.remove('active');
});

// Theme Buttons
const lightThemeButton = document.getElementById('light-theme');
const darkThemeButton = document.getElementById('dark-theme');
const blueThemeButton = document.getElementById('blue-theme');
const redThemeButton = document.getElementById('red-theme');
const greenThemeButton = document.getElementById('green-theme');
const purpleThemeButton = document.getElementById('purple-theme');
const orangeThemeButton = document.getElementById('orange-theme');
const systemThemeButton = document.getElementById('system-theme');
const todoInput = document.getElementById('todo-input');
const addTaskBtn = document.getElementById('add-task');
const todoList = document.getElementById('todo-list');

function loadTasks() {
    chrome.storage.sync.get({ tasks: [] }, (data) => {
        data.tasks.forEach(addTaskToUI);
    });
}

function addTaskToUI(taskText, save = false) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed', checkbox.checked);
        saveTasks();
    });

    // Task Text
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-task');
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);

    if (save) saveTasks();
}

function saveTasks() {
    const tasks = [...todoList.querySelectorAll('.todo-item span')].map(span => span.textContent);
    chrome.storage.sync.set({ tasks });
}

addTaskBtn.addEventListener('click', () => {
    const taskText = todoInput.value.trim();
    if (taskText) {
        addTaskToUI(taskText, true);
        todoInput.value = '';
    }
});

// Load tasks on startup
loadTasks();



// Load saved background
chrome.storage.sync.get('backgroundImage', (data) => {
    if (data.backgroundImage) {
        document.body.style.backgroundImage = `url(${data.backgroundImage})`;
        document.body.classList.add('custom-bg');
    }
});


function setTheme(theme) {
  document.body.classList.remove('dark', 'blue', 'red', 'green', 'purple', 'orange',);
  if (theme !== 'light') {
    document.body.classList.add(theme);
  }
  chrome.storage.sync.set({ theme });
}

// Event Listeners for Theme Buttons
lightThemeButton.addEventListener('click', () => setTheme('light'));
darkThemeButton.addEventListener('click', () => setTheme('dark'));
blueThemeButton.addEventListener('click', () => setTheme('blue'));
redThemeButton.addEventListener('click', () => setTheme('red'));
greenThemeButton.addEventListener('click', () => setTheme('green'));
purpleThemeButton.addEventListener('click', () => setTheme('purple'));
orangeThemeButton.addEventListener('click', () => setTheme('orange'));

systemThemeButton.addEventListener('click', () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(prefersDark ? 'dark' : 'light');
  chrome.storage.sync.set({ theme: 'system' });
});

// Load saved theme on startup
chrome.storage.sync.get('theme', (data) => {
  if (data.theme) {
    setTheme(data.theme);
  }
});

// Google Apps Dropdown
const googleAppsButton = document.getElementById('google-apps-button');
const googleAppsDropdown = document.getElementById('google-apps');

googleAppsButton.addEventListener('click', () => {
  googleAppsDropdown.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!googleAppsDropdown.contains(e.target) && !googleAppsButton.contains(e.target)) {
    googleAppsDropdown.classList.remove('active');
  }
});


// Load saved theme
chrome.storage.sync.get('theme', (data) => {
  if (data.theme === 'light') {
    body.classList.remove('dark');
  } else if (data.theme === 'dark') {
    body.classList.add('dark');
  } else if (data.theme === 'system') {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }
});