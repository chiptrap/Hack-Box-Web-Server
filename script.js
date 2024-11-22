document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');

    // Function to load tasks from the database
    const loadTasks = async () => {
        try {
            // Fetch tasks from the backend
            const response = await fetch('backend.php');
            const tasks = await response.json();

            // Clear the current list
            taskList.innerHTML = '';

            // Populate the list with tasks
            tasks.forEach(task => {
                const listItem = document.createElement('li');
                listItem.textContent = task.task;

                // Create a delete button for each task
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.style.marginLeft = '10px';

                // Add event listener to delete the task
                deleteButton.addEventListener('click', async () => {
                    try {
                        await fetch('backend.php', {
                            method: 'DELETE',
                            body: new URLSearchParams({ id: task.id }),
                        });
                        // Reload tasks after deletion
                        loadTasks();
                    } catch (error) {
                        console.error('Error deleting task:', error);
                    }
                });

                // Append the delete button to the list item
                listItem.appendChild(deleteButton);

                // Add the list item to the task list
                taskList.appendChild(listItem);
            });
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    };

    // Function to add a new task
    const addTask = async () => {
        const task = taskInput.value.trim();

        if (task) {
            try {
                // Send the new task to the backend
                await fetch('backend.php', {
                    method: 'POST',
                    body: new URLSearchParams({ task }),
                });
                // Clear the input field
                taskInput.value = '';
                // Reload tasks to show the new one
                loadTasks();
            } catch (error) {
                console.error('Error adding task:', error);
            }
        } else {
            alert('Please enter a task!');
        }
    };

    // Event listener for the "Add Task" button
    addTaskButton.addEventListener('click', addTask);

    // Allow pressing Enter to add a task
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks on page load
    loadTasks();
});
