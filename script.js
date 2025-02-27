// Clock and Date
const clock = document.getElementById('clock');
const date = document.getElementById('date');

function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  clock.textContent = `${hours}:${minutes}`;

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