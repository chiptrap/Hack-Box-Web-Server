<?php
$servername = "localhost";
$username = "newuser"; // Replace with your MySQL root username
$password = "newpassword"; // Replace with your MySQL root password
$dbname = "todolist";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch tasks
    $sql = "SELECT * FROM tasks";
    $result = $conn->query($sql);

    $tasks = [];
    while ($row = $result->fetch_assoc()) {
        $tasks[] = $row;
    }

    echo json_encode($tasks);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Add a new task
    $task = $_POST['task'];
    $sql = "INSERT INTO tasks (task) VALUES ('$task')";

    if ($conn->query($sql) === TRUE) {
        echo "Task added successfully";
    } else {
        echo "Error: " . $conn->error;
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Delete a task
    parse_str(file_get_contents("php://input"), $data);
    $id = $data['id'];
    $sql = "DELETE FROM tasks WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
        echo "Task deleted successfully";
    } else {
        echo "Error: " . $conn->error;
    }
}

$conn->close();
?>
