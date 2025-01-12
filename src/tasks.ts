interface Task {
    id: string;
    user: string;
    title: string;
    description: string;
    status: "en attente" | "fait";
    deadline: string;
}

const TASKS_KEY = "tasks";

export function createTask(
    title: string,
    description: string,
    deadline: string
): void {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert("Vous devez être connecté pour créer une tâche.");
        return;
    }

    const tasks: Task[] = JSON.parse(localStorage.getItem(TASKS_KEY) || "[]");

    const newTask: Task = {
        id: generateId(),
        user: currentUser.email,
        title,
        description,
        status: "en attente",
        deadline,
    };

    tasks.push(newTask);
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    alert("Tâche créée avec succès avec une deadline !");
}

// fonction qui retourne les tâches de l'utilisateur connecté
export function getTasksForUser(email: string): Task[] {
    const tasks: Task[] = JSON.parse(localStorage.getItem(TASKS_KEY) || "[]");

    return tasks
        .filter((task) => task.user === email)
        .sort(
            (a, b) =>
                new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
        );
}

// fonction qui marque une tâche comme terminée
export function markTaskAsDone(taskId: string): void {
    const tasks: Task[] = JSON.parse(localStorage.getItem(TASKS_KEY) || "[]");
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex !== -1) {
        tasks[taskIndex].status = "fait";
        localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
        alert("Tâche marquée comme terminée.");
    }
}

export function deleteTask(taskId: string): void {
    const tasks: Task[] = JSON.parse(localStorage.getItem(TASKS_KEY) || "[]");
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex !== -1 && tasks[taskIndex].status !== "fait") {
        tasks.splice(taskIndex, 1);
        localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
        alert("Tâche supprimée avec succès.");
    } else {
        alert("Les tâches terminées ne peuvent pas être supprimées.");
    }
}

function getCurrentUser(): { email: string } | null {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
}

function generateId(): string {
    return Math.random().toString(36).substr(2, 9); // 9 caractères aléatoires
}
