// To-Do List Functionality
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && todoInput.value.trim() !== '') {
    const todoItem = document.createElement('li');
    todoItem.textContent = todoInput.value;
    todoList.appendChild(todoItem);
    todoInput.value = '';
  }
});

// Pomodoro Timer
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-timer');
const resetButton = document.getElementById('reset-timer');

let time = 25 * 60; // 25 minutes in seconds
let interval;

function updateTimer() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  if (time === 0) {
    clearInterval(interval);
    alert('Time’s up! Take a break.');
  } else {
    time--;
  }
}

startButton.addEventListener('click', () => {
  if (!interval) {
    interval = setInterval(updateTimer, 1000);
  }
});

resetButton.addEventListener('click', () => {
  clearInterval(interval);
  interval = null;
  time = 25 * 60;
  timerDisplay.textContent = '25:00';
});

// Summarize Text
const summarizeInput = document.getElementById('summarize-input');
const summarizeButton = document.getElementById('summarize-button');
const summarizeOutput = document.getElementById('summarize-output');

summarizeButton.addEventListener('click', async () => {
  const text = summarizeInput.value.trim();
  if (text) {
    summarizeOutput.textContent = 'Summarizing...';
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenAI API key
    const url = 'https://api.openai.com/v1/chat/completions';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [{ role: 'user', content: `Summarize this: ${text}` }],
          max_tokens: 100
        })
      });
      const data = await response.json();
      summarizeOutput.textContent = data.choices[0].message.content;
    } catch (error) {
      summarizeOutput.textContent = 'Failed to summarize.';
    }
  }
});

// Task Suggestions
const suggestTasksButton = document.getElementById('suggest-tasks');
const taskSuggestions = document.getElementById('task-suggestions');

suggestTasksButton.addEventListener('click', async () => {
  taskSuggestions.innerHTML = '<li>Loading suggestions...</li>';
  const apiKey = 'YOUR_API_KEY'; // Replace with your OpenAI API key
  const url = 'https://api.openai.com/v1/chat/completions';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: 'Suggest 3 tasks I should do today.' }],
        max_tokens: 100
      })
    });
    const data = await response.json();
    const suggestions = data.choices[0].message.content.split('\n');
    taskSuggestions.innerHTML = suggestions.map(task => `<li>${task}</li>`).join('');
  } catch (error) {
    taskSuggestions.innerHTML = '<li>Failed to load suggestions.</li>';
  }
});

// Drag-and-Drop Widgets
const widgetsContainer = document.getElementById('widgets');
Sortable.create(widgetsContainer, {
  animation: 150,
  handle: '.widget',
  onEnd: () => {
    // Save widget order to storage
    const widgetOrder = Array.from(widgetsContainer.children).map(widget => widget.id);
    chrome.storage.sync.set({ widgetOrder });
  }
});

// Load saved widget order
chrome.storage.sync.get('widgetOrder', (data) => {
  if (data.widgetOrder) {
    data.widgetOrder.forEach(widgetId => {
      const widget = document.getElementById(widgetId);
      if (widget) widgetsContainer.appendChild(widget);
    });
  }
});

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
