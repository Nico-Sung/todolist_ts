import { signUp, logIn, logOut, getCurrentUser } from "./auth.js";
import { createTask, deleteTask, markTaskAsDone, getTasksForUser, } from "./tasks.js";
// Fonction pour gérer la visibilité des sections
function toggleElementVisibility(elementId, show) {
    const element = document.getElementById(elementId);
    if (!element)
        return;
    if (show) {
        element.classList.add("show"); // Ajoute la classe pour afficher
        element.classList.remove("hide"); // Retire la classe pour masquer
    }
    else {
        element.classList.add("hide"); // Ajoute la classe pour masquer
        element.classList.remove("show"); // Retire la classe pour afficher
    }
}
// Fonction pour supprimer une tâche avec animation
function removeTaskWithAnimation(taskId) {
    const taskElement = document.querySelector(`[data-id="${taskId}"]`);
    if (!taskElement)
        return;
    taskElement.classList.add("hide"); // Ajoute la classe de disparition
    setTimeout(() => {
        deleteTask(taskId); // Supprime la tâche des données
        loadTasks(); // Recharge les tâches
    }, 300); // Durée de l'animation
}
// Gestion des événements DOM
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");
    const taskForm = document.getElementById("task-form");
    const logoutButton = document.getElementById("logout");
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;
        signUp(email, password);
    });
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        if (logIn(email, password)) {
            loadTasks();
        }
    });
    logoutButton.addEventListener("click", () => {
        logOut();
        showAuth();
    });
    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("task-title").value;
        const description = document.getElementById("task-description").value;
        const deadline = document.getElementById("task-deadline").value;
        createTask(title, description, deadline);
        loadTasks();
    });
});
// Charge les tâches pour l'utilisateur connecté
function loadTasks() {
    const currentUser = getCurrentUser();
    if (!currentUser)
        return;
    const tasks = getTasksForUser(currentUser.email);
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = "task-item";
        li.setAttribute("data-id", task.id);
        li.innerHTML = `
            <strong>${task.title}</strong> - ${task.status}
            <p>Description: ${task.description}</p>
            <p>Deadline: <span>${new Date(task.deadline).toLocaleDateString()}</span></p>
        `;
        if (task.status !== "fait") {
            const doneButton = document.createElement("button");
            doneButton.textContent = "Valider";
            doneButton.addEventListener("click", () => {
                markTaskAsDone(task.id);
                loadTasks();
            });
            li.appendChild(doneButton);
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Supprimer";
            deleteButton.addEventListener("click", () => {
                removeTaskWithAnimation(task.id);
            });
            li.appendChild(deleteButton);
        }
        taskList.appendChild(li);
        setTimeout(() => li.classList.add("show"), 50);
    });
    toggleElementVisibility("todo", true);
    toggleElementVisibility("auth", false);
}
// Affiche le formulaire d'authentification
function showAuth() {
    toggleElementVisibility("todo", false);
    toggleElementVisibility("auth", true);
}
