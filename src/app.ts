import { signUp, logIn, logOut, getCurrentUser } from "./auth.js";
import {
    createTask,
    deleteTask,
    markTaskAsDone,
    getTasksForUser,
} from "./tasks.js";

// fonction pour gérer la visibilité des sections
function toggleElementVisibility(elementId: string, show: boolean): void {
    const element = document.getElementById(elementId);
    if (!element) return;

    if (show) {
        element.classList.add("show");
        element.classList.remove("hide");
    } else {
        element.classList.add("hide");
        element.classList.remove("show");
    }
}

// fonction pour supprimer une tâche avec animation
function removeTaskWithAnimation(taskId: string): void {
    const taskElement = document.querySelector(
        `[data-id="${taskId}"]`
    ) as HTMLLIElement;
    if (!taskElement) return;

    taskElement.classList.add("hide"); // ajoute la classe de disparition

    setTimeout(() => {
        deleteTask(taskId); // supprime la tâche des données
        loadTasks(); // recharge les tâches
    }, 300); // durée de l'animation
}

// gestion des événements DOM
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById(
        "signup-form"
    ) as HTMLFormElement;
    const loginForm = document.getElementById("login-form") as HTMLFormElement;
    const taskForm = document.getElementById("task-form") as HTMLFormElement;
    const logoutButton = document.getElementById("logout") as HTMLButtonElement;

    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = (
            document.getElementById("signup-email") as HTMLInputElement
        ).value;
        const password = (
            document.getElementById("signup-password") as HTMLInputElement
        ).value;
        signUp(email, password);
    });

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = (
            document.getElementById("login-email") as HTMLInputElement
        ).value;
        const password = (
            document.getElementById("login-password") as HTMLInputElement
        ).value;
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
        const title = (
            document.getElementById("task-title") as HTMLInputElement
        ).value;
        const description = (
            document.getElementById("task-description") as HTMLTextAreaElement
        ).value;
        const deadline = (
            document.getElementById("task-deadline") as HTMLInputElement
        ).value;
        createTask(title, description, deadline);
        loadTasks();
    });
});

// charge les tâche pour l'utilisateur connecté
function loadTasks(): void {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const tasks = getTasksForUser(currentUser.email);
    const taskList = document.getElementById("task-list") as HTMLUListElement;
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = "task-item";
        li.setAttribute("data-id", task.id);

        li.innerHTML = `
            <strong>${task.title}</strong> - ${task.status}
            <p>Description: ${task.description}</p>
            <p>Deadline: <span>${new Date(
                task.deadline
            ).toLocaleDateString()}</span></p>
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

// affiche le formulaire d'authentification
function showAuth(): void {
    toggleElementVisibility("todo", false);
    toggleElementVisibility("auth", true);
}
