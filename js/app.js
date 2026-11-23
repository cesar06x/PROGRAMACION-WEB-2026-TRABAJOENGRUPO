const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

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

function renderTasks() {
  taskList.innerHTML = '';

  const fragment = document.createDocumentFragment();
  tasks.forEach((task) => fragment.appendChild(createTaskElement(task)));
  taskList.appendChild(fragment);
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

taskForm.addEventListener('submit', addTask);