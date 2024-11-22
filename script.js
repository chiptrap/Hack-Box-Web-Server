document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    const newQuoteButton = document.getElementById('newQuote');

    // Function to load tasks from the database
    const loadTasks = async () => {
        try {
            const response = await fetch('backend.php');
            const tasks = await response.json();

            taskList.innerHTML = '';
            tasks.forEach(task => {
                const listItem = document.createElement('li');
                listItem.textContent = task.task;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.style.marginLeft = '10px';

                deleteButton.addEventListener('click', async () => {
                    try {
                        await fetch('backend.php', {
                            method: 'DELETE',
                            body: new URLSearchParams({ id: task.id }),
                        });
                        loadTasks();
                    } catch (error) {
                        console.error('Error deleting task:', error);
                    }
                });

                listItem.appendChild(deleteButton);
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
                await fetch('backend.php', {
                    method: 'POST',
                    body: new URLSearchParams({ task }),
                });
                taskInput.value = '';
                loadTasks();
            } catch (error) {
                console.error('Error adding task:', error);
            }
        } else {
            alert('Please enter a task!');
        }
    };

    // Function to fetch a random quote
    const fetchQuote = async () => {
        try {
            const response = await fetch('https://api.quotable.io/random');
            const data = await response.json();

            // Display the quote
            quoteText.textContent = `"${data.content}"`;
            quoteAuthor.textContent = `- ${data.author}`;
        } catch (error) {
            console.error('Error fetching quote:', error);
            quoteText.textContent = 'Failed to load quote.';
            quoteAuthor.textContent = '';
        }
    };

    // Load tasks on page load
    loadTasks();

    // Fetch a quote on page load
    fetchQuote();

    // Add task event listener
    addTaskButton.addEventListener('click', addTask);

    // Allow pressing Enter to add a task
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Get a new quote on button click
    newQuoteButton.addEventListener('click', fetchQuote);
});
