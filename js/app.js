const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const pendingCount = document.getElementById('pending-count');

let tasks = [];

function createTaskElement(task) {
  const li = document.createElement('li');
  li.className = `task-item${task.completed ? ' completed' : ''}`;
  li.dataset.id = task.id;

  const label = document.createElement('label');
  label.className = 'task-content';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;

  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = task.text;

  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'Eliminar';

  label.append(checkbox, span);
  li.append(label, deleteBtn);

  return li;
}

function updatePendingCount() {
  const pending = tasks.filter((task) => !task.completed).length;
  pendingCount.textContent = pending;
}

function renderTasks() {
  taskList.innerHTML = '';

  const fragment = document.createDocumentFragment();
  tasks.forEach((task) => fragment.appendChild(createTaskElement(task)));
  taskList.appendChild(fragment);
  updatePendingCount();
}

function addTask(event) {
  event.preventDefault();

  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({
    id: Date.now().toString(),
    text,
    completed: false,
  });

  taskInput.value = '';
  taskInput.focus();
  renderTasks();
}

function handleTaskAction(event) {
  const item = event.target.closest('.task-item');
  if (!item) return;

  const { id } = item.dataset;

  if (event.target.classList.contains('delete-btn')) {
    tasks = tasks.filter((task) => task.id !== id);
    renderTasks();
    return;
  }

  if (event.target.type === 'checkbox') {
    tasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
  }
}

taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', handleTaskAction);