const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Connect to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'appuser',
    password: 'StrongPass@123',
    database: 'todolist',
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to the database.');
    }
});

// Endpoint to get all tasks
app.get('/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Endpoint to add a new task
app.post('/tasks', (req, res) => {
    const { task } = req.body;
    db.query('INSERT INTO tasks (task) VALUES (?)', [task], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, task, completed: false });
    });
});

// Endpoint to mark a task as completed
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.query('UPDATE tasks SET completed = TRUE WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

// Endpoint to delete a task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
