const apiURL = "/tasks";

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Show tasks
async function fetchTasks() {
  const res = await fetch(apiURL);
  const tasks = await res.json();

  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.title;
    li.dataset.id = task.id;

    const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.onclick = () => deleteTask(task.id);

    li.appendChild(btn);
    taskList.appendChild(li);
  });
}

// Add tasks
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = taskInput.value.trim();
  if (!title) return;

  await fetch(apiURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  taskInput.value = "";
  fetchTasks();
});

// Delete tasks
async function deleteTask(id) {
  await fetch(`${apiURL}/${id}`, { method: "DELETE" });
  fetchTasks();
}

fetchTasks();
