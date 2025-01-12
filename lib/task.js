function createTask(title, description, deadline) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (!currentUser.username) {
        throw new Error("Utilisateur non connecté");
    }
    const task = {
        title,
        description,
        status: "pending",
        deadline,
        userId: currentUser.username,
    };
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    return task;
}
function getTasksForUser(userId) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    return tasks.filter((task) => task.userId === userId);
}
function validateTask(taskTitle) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const task = tasks.find((task) => task.title === taskTitle);
    if (task && task.status === "pending") {
        task.status = "completed";
        localStorage.setItem("tasks", JSON.stringify(tasks));
        return true;
    }
    return false;
}
function deleteTask(taskTitle) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const index = tasks.findIndex((task) => task.title === taskTitle && task.status !== "completed");
    if (index !== -1) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        return true;
    }
    return false;
}
export { createTask, getTasksForUser, validateTask, deleteTask };
