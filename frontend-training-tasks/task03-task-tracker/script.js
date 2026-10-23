// ----- Element references -----
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const emptyMessage = document.getElementById("emptyMessage");
const filterButtons = document.querySelectorAll(".filter-btn");

// ----- State -----
let tasks = loadTasks();       // array of { id, text, completed }
let currentFilter = "all";     // "all" | "pending" | "completed"

// ----- localStorage -----
function loadTasks() {
  try {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ----- Actions -----
function addTask(text) {
  tasks.push({
    id: Date.now(),
    text: text,
    completed: false
  });
  saveTasks();
  render();
}

function toggleTask(id) {
  tasks = tasks.map(function (task) {
    return task.id === id ? { ...task, completed: !task.completed } : task;
  });
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });
  saveTasks();
  render();
}

// ----- Rendering -----
function getVisibleTasks() {
  if (currentFilter === "pending") {
    return tasks.filter(function (task) { return !task.completed; });
  }
  if (currentFilter === "completed") {
    return tasks.filter(function (task) { return task.completed; });
  }
  return tasks;
}

function render() {
  taskList.innerHTML = "";

  const visibleTasks = getVisibleTasks();

  visibleTasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function () {
      toggleTask(task.id);
    });

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;   // textContent keeps user input safe

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      deleteTask(task.id);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  // counts are always based on ALL tasks
  totalCount.textContent = tasks.length;
  completedCount.textContent = tasks.filter(function (task) {
    return task.completed;
  }).length;

  emptyMessage.style.display = visibleTasks.length === 0 ? "block" : "none";
}

// ----- Events -----
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const text = taskInput.value.trim();
  if (text === "") return;
  addTask(text);
  taskInput.value = "";
  taskInput.focus();
});

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    currentFilter = button.dataset.filter;
    filterButtons.forEach(function (btn) { btn.classList.remove("active"); });
    button.classList.add("active");
    render();
  });
});

// ----- Start -----
render();
