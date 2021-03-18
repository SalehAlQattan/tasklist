// defining Varibales
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');

// Load all events listeners
loadEventListeners();

// Load all events listeners
function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  clearBtn.addEventListener('click', clearTasks);
  taskList.addEventListener('click', removeTask);
  filter.addEventListener('keyup', filterTasks);
}

// get tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(task => {});
}

// Add task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Please Enter Task');
  } else {
    // capturing the task text
    const task = taskInput.value;
    // create list item
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // append textNode to list item
    li.appendChild(document.createTextNode(task));
    // append list item to list
    taskList.appendChild(li);
    // craete link
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add style to link
    link.style.cursor = 'pointer';
    // create icon
    const icon = document.createElement('i');
    // add class to icon
    icon.className = 'fa fa-remove';
    // append icon to link
    link.appendChild(icon);
    // appned link to list item
    li.appendChild(link);

    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear new task input field
    taskInput.value = '';
  }

  e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(passedTask) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
function clearTasks() {
  // TODO: Don't fire this event if we don't have any task
  // TODO: Done !!!!
  if (taskList.innerHTML === '') {
    alert('There is no tasks to Clear!');
  } else if (confirm('Are You Sure You Would Like to Clea All Tasks')) {
    taskList.innerHTML = '';
  }
}

// Remove Task
function removeTask(e) {
  if (e.target.classList.contains('fa-remove')) {
    if (confirm('Are You Sure You Want to delete task ?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task) {
    //TODO: try without first child
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
