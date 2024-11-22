const apiUrl = 'http://127.0.0.1:3000/tasks';

async function fetchTasks() {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear the list

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span style="text-decoration: ${task.completed ? 'line-through' : 'none'};">${task.task}</span>
            <button onclick="completeTask(${task.id})">Complete</button>
            <button onclick="deleteTask(${task.id})">Remove</button>
        `;
        taskList.appendChild(listItem);
    });
}

async function addTask() {
    const taskInput = document.getElementById('task-input');
    const task = taskInput.value.trim();

    if (task === '') {
        alert('Please enter a task!');
        return;
    }

    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task })
    });

    taskInput.value = '';
    fetchTasks();
}

async function completeTask(id) {
    await fetch(`${apiUrl}/${id}`, { method: 'PUT' });
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    fetchTasks();
}

// Load tasks when the page loads
fetchTasks();
