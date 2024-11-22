document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');

    // Function to add a task
    const addTask = () => {
        const task = taskInput.value.trim();

        if (task) {
            // Create a list item
            const listItem = document.createElement('li');
            listItem.textContent = task;

            // Create a delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.style.marginLeft = '10px';

            // Add event listener to delete task
            deleteButton.addEventListener('click', () => {
                taskList.removeChild(listItem);
            });

            // Append delete button to the list item
            listItem.appendChild(deleteButton);

            // Append the list item to the task list
            taskList.appendChild(listItem);

            // Clear the input field
            taskInput.value = '';
        } else {
            alert('Please enter a task!');
        }
    };

    // Event listener for the "Add Task" button
    addTaskButton.addEventListener('click', addTask);

    // Optionally, allow pressing Enter to add a task
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});
