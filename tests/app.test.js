
const test = require("node:test");
const assert = require("node:assert");
const {
    createTask,
    addTask,
    toggleTask,
    deleteTask,
    getSummary,
    saveTasks,
    loadTasks
} = require("../src/app.js");

// Test 1: Create a new task
test("Should create a new task", () => {
    const task = createTask("Complete DevOps report");

    assert.strictEqual(task.title, "Complete DevOps report");
    assert.strictEqual(task.completed, false);
    assert.ok(task.id);
});

// Test 2: Add a task
test("Should add a task to the list", () => {
    const tasks = [];
    const updatedTasks = addTask(tasks, "Study JavaScript");

    assert.strictEqual(updatedTasks.length, 1);
    assert.strictEqual(updatedTasks[0].title, "Study JavaScript");
});

// Test 3: Prevent empty tasks
test("Should not add an empty task", () => {
    const tasks = [];
    const updatedTasks = addTask(tasks, "   ");

    assert.strictEqual(updatedTasks.length, 0);
});

// Test 4: Complete a task
test("Should mark a task as completed", () => {
    const tasks = [
        { id: "1", title: "Study", completed: false }
    ];

    const updatedTasks = toggleTask(tasks, "1");

    assert.strictEqual(updatedTasks[0].completed, true);
});

// Test 5: Undo a completed task
test("Should undo a completed task", () => {
    const tasks = [
        { id: "1", title: "Study", completed: true }
    ];

    const updatedTasks = toggleTask(tasks, "1");

    assert.strictEqual(updatedTasks[0].completed, false);
});

// Test 6: Delete a task
test("Should delete a task", () => {
    const tasks = [
        { id: "1", title: "Study", completed: false },
        { id: "2", title: "Assignment", completed: false }
    ];

    const updatedTasks = deleteTask(tasks, "1");

    assert.strictEqual(updatedTasks.length, 1);
    assert.strictEqual(updatedTasks[0].id, "2");
});

// Test 7: Calculate task summary
test("Should calculate total, pending and completed tasks", () => {
    const tasks = [
        { id: "1", title: "Study", completed: true },
        { id: "2", title: "Assignment", completed: false },
        { id: "3", title: "Project", completed: false }
    ];

    const summary = getSummary(tasks);

    assert.deepStrictEqual(summary, {
        total: 3,
        pending: 2,
        completed: 1
    });
});

// Test 8: Save tasks
test("Should save tasks to storage", () => {
    let savedData = null;

    const mockStorage = {
        setItem(key, value) {
            savedData = value;
        }
    };

    const tasks = [
        { id: "1", title: "Study", completed: false }
    ];

    saveTasks(tasks, mockStorage);

    assert.deepStrictEqual(JSON.parse(savedData), tasks);
});

// Test 9: Load tasks
test("Should load tasks from storage", () => {
    const tasks = [
        { id: "1", title: "Study", completed: false }
    ];

    const mockStorage = {
        getItem() {
            return JSON.stringify(tasks);
        }
    };

    const loadedTasks = loadTasks(mockStorage);

    assert.deepStrictEqual(loadedTasks, tasks);
});

// Test 10: Handle empty storage
test("Should return an empty list when storage is empty", () => {
    const mockStorage = {
        getItem() {
            return null;
        }
    };

    assert.deepStrictEqual(loadTasks(mockStorage), []);
});
