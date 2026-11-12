/* ==========================================================
   Student Task Manager - app.js
   
   The file has two parts:
   PART 1: Logic functions (no HTML involved) -> easy to test later
   PART 2: Screen (DOM) code that connects the logic to the page
   ========================================================== */

/* ==================== PART 1: LOGIC ==================== */

// The key used to save tasks in the browser's Local Storage
const STORAGE_KEY = "studentTasks";

// Create a new task object
function createTask(title) {
  return {
    id: Date.now().toString() + Math.random().toString(16).slice(2), // unique id
    title: title,
    completed: false,
  };
}

// Add a task. Returns a NEW array. Empty titles are rejected.
function addTask(tasks, title) {
  const cleanTitle = String(title || "").trim();

  // Prevent empty (or spaces-only) tasks
  if (cleanTitle === "") {
    return tasks;
  }
  return [...tasks, createTask(cleanTitle)];
}

// Switch a task between pending and completed (used for Complete AND Undo)
function toggleTask(tasks, taskId) {
  return tasks.map(function (task) {
    if (task.id === taskId) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
}

// Remove a task
function deleteTask(tasks, taskId) {
  return tasks.filter(function (task) {
    return task.id !== taskId;
  });
}

// Count total, pending and completed tasks
function getSummary(tasks) {
  const completed = tasks.filter(function (task) {
    return task.completed;
  }).length;

  return {
    total: tasks.length,
    pending: tasks.length - completed,
    completed: completed,
  };
}

// Save tasks to Local Storage
function saveTasks(tasks, storage) {
  storage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Load tasks from Local Storage (returns [] if nothing saved or data is broken)
function loadTasks(storage) {
  try {
    const saved = storage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

/* ==================== PART 2: SCREEN (DOM) ==================== */
/* This part only runs in a browser, so tests in Node.js won't break. */

if (typeof document !== "undefined") {
  // Get the HTML elements we need
  const taskInput = document.getElementById("task-input");
  const addButton = document.getElementById("add-button");
  const errorMessage = document.getElementById("error-message");
  const taskList = document.getElementById("task-list");
  const emptyMessage = document.getElementById("empty-message");
  const totalCount = document.getElementById("total-count");
  const pendingCount = document.getElementById("pending-count");
  const completedCount = document.getElementById("completed-count");

  // Load saved tasks when the page opens
  let tasks = loadTasks(localStorage);

  // Helper: make a button with text, CSS class and click action
  function createButton(text, className, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = "btn " + className;
    button.addEventListener("click", onClick);
    return button;
  }

  // Build one <li> element for a task
  function createTaskElement(task) {
    const item = document.createElement("li");
    item.className = task.completed ? "task-item completed" : "task-item";

    // textContent is safe: it never runs user-typed text as HTML
    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;

    const buttons = document.createElement("div");
    buttons.className = "task-buttons";

    // Show Complete button for pending tasks, Undo button for completed ones
    if (task.completed) {
      buttons.appendChild(
        createButton("Undo", "btn-undo", function () {
          handleToggle(task.id);
        })
      );
    } else {
      buttons.appendChild(
        createButton("Complete", "btn-complete", function () {
          handleToggle(task.id);
        })
      );
    }

    buttons.appendChild(
      createButton("Delete", "btn-delete", function () {
        handleDelete(task.id);
      })
    );

    item.appendChild(title);
    item.appendChild(buttons);
    return item;
  }

  // Redraw the whole screen from the current tasks array
  function render() {
    // 1. Update the task list
    taskList.innerHTML = ""; // clears old items (no user text is used here)
    tasks.forEach(function (task) {
      taskList.appendChild(createTaskElement(task));
    });

    // 2. Show the friendly message when there are no tasks
    emptyMessage.style.display = tasks.length === 0 ? "block" : "none";

    // 3. Update summary numbers
    const summary = getSummary(tasks);
    totalCount.textContent = summary.total;
    pendingCount.textContent = summary.pending;
    completedCount.textContent = summary.completed;
  }

  // Change tasks, save them, and redraw the screen
  function updateTasks(newTasks) {
    tasks = newTasks;
    saveTasks(tasks, localStorage);
    render();
  }

  // ----- Event handlers -----
  function handleAdd() {
    const text = taskInput.value.trim();

    if (text === "") {
      errorMessage.textContent = "Please enter a task before adding.";
      taskInput.focus();
      return;
    }

    errorMessage.textContent = "";
    updateTasks(addTask(tasks, text));
    taskInput.value = "";
    taskInput.focus();
  }

  function handleToggle(taskId) {
    updateTasks(toggleTask(tasks, taskId));
  }

  function handleDelete(taskId) {
    updateTasks(deleteTask(tasks, taskId));
  }

  // ----- Connect events -----
  addButton.addEventListener("click", handleAdd);

  // Add task when Enter key is pressed
  taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      handleAdd();
    }
  });

  // Hide the error message as soon as the user starts typing
  taskInput.addEventListener("input", function () {
    errorMessage.textContent = "";
  });

  // First draw when the page loads
  render();
}

/* ==================== EXPORTS (for automated tests later) ==================== */
// In the browser, "module" doesn't exist, so this is skipped.
// In Node.js tests, this lets us do: require("../src/app.js")
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    STORAGE_KEY,
    createTask,
    addTask,
    toggleTask,
    deleteTask,
    getSummary,
    saveTasks,
    loadTasks,
  };
}