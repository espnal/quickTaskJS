const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

// Simulating in memory database
let tasks = [];
let currentId = 1;

// GET route to get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST route to create a new task
app.post("/tasks", (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: "The title is required" });
    }

    const newTask = { id: currentId++, title };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: "Server error while creating task" });
  }
});

// DELETE route to delete a task by ID
app.delete("/tasks/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    const deletedTask = tasks.splice(index, 1);
    res.json(deletedTask[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error while deleting task" });
  }
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
