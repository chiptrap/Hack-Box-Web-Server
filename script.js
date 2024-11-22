// Function to add a new task to the list
function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Get the task text from the input field
    const taskText = taskInput.value.trim();

    // Check if the input is empty
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    // Create a new list item (task)
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>${taskText}</span>
        <button onclick="markComplete(this)">Complete</button>
        <button onclick="removeTask(this)">Remove</button>
    `;

    // Append the new task to the list
    taskList.appendChild(listItem);

    // Clear the input field
    taskInput.value = '';
}

// Function to mark a task as completed
function markComplete(button) {
    const taskItem = button.parentElement;
    const taskText = taskItem.querySelector('span');
    taskText.style.textDecoration = 'line-through';
}

// Function to remove a task from the list
function removeTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
}
