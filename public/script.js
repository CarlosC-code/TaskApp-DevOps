const form = document.getElementById("taskForm");
const input = document.getElementById("taskTitle");
const taskList = document.getElementById("taskList");

async function loadTasks() {
    const response = await fetch("/api/tasks");
    const tasks = await response.json();

    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        li.textContent = task.title;

        taskList.appendChild(li);
    });
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = input.value;

    await fetch("/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
    });

    input.value = "";

    loadTasks();
});

loadTasks();