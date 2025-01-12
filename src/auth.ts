interface User {
    email: string;
    password: string;
}

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

export function signUp(email: string, password: string): void {
    const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

    if (users.find((user) => user.email === email)) {
        alert("Un utilisateur avec cet email existe déjà.");
        return;
    }

    users.push({ email, password }); // on ajoute l'utilisateur s'il n'existe pas
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
}

export function logIn(email: string, password: string): boolean {
    const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

    // cherche l'utilisateur avec les identifiants donnés
    const user = users.find(
        (user) => user.email === email && user.password === password
    );
    if (!user) {
        alert("Identifiants incorrects.");
        return false;
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    alert("Connexion réussie !");
    return true;
}

export function logOut(): void {
    localStorage.removeItem(CURRENT_USER_KEY);
    alert("Déconnexion réussie.");
}

export function getCurrentUser(): User | null {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
}
