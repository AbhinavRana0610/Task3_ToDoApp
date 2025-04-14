document.addEventListener("DOMContentLoaded", function () {
  const saveBtn = document.getElementById("saveBtn");
  const taskTitle = document.getElementById("taskTitle");
  const taskDescription = document.getElementById("taskDescription");
  const pendingTasks = document.getElementById("pendingTasks");
  const completedTasks = document.getElementById("completedTasks");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function renderTasks() {
    pendingTasks.innerHTML = "";
    completedTasks.innerHTML = "";

    tasks.forEach((task, index) => {
      const taskElement = document.createElement("div");
      taskElement.className = `task-item ${task.completed ? "completed" : ""}`;

      const taskContent = document.createElement("div");
      taskContent.className = "task-content";
      taskContent.innerHTML = `<strong>${task.title}</strong><br>${task.description}`;

      const taskActions = document.createElement("div");
      taskActions.className = "task-actions";

      if (!task.completed) {
        const completeBtn = document.createElement("button");
        completeBtn.className = "complete";
        completeBtn.textContent = "Complete";
        completeBtn.onclick = () => completeTask(index);
        taskActions.appendChild(completeBtn);
      }

      const editBtn = document.createElement("button");
      editBtn.className = "edit";
      editBtn.textContent = "Edit";
      editBtn.onclick = () => editTask(index);
      taskActions.appendChild(editBtn);

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete";
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => deleteTask(index);
      taskActions.appendChild(deleteBtn);

      taskElement.appendChild(taskContent);
      taskElement.appendChild(taskActions);

      if (task.completed) {
        completedTasks.appendChild(taskElement);
      } else {
        pendingTasks.appendChild(taskElement);
      }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function addTask() {
    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();

    if (title) {
      tasks.push({
        title,
        description,
        completed: false,
      });

      taskTitle.value = "";
      taskDescription.value = "";
      taskTitle.focus();

      renderTasks();
    }
  }

  function completeTask(index) {
    tasks[index].completed = true;
    renderTasks();
  }

  function editTask(index) {
    const task = tasks[index];
    taskTitle.value = task.title;
    taskDescription.value = task.description;

    tasks.splice(index, 1);
    renderTasks();
    taskTitle.focus();
  }

  function deleteTask(index) {
    if (confirm("Are you sure you want to delete this task?")) {
      tasks.splice(index, 1);
      renderTasks();
    }
  }

  saveBtn.addEventListener("click", addTask);

  taskTitle.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addTask();
    }
  });

  renderTasks();
});
