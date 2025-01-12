// fonction qui vérifie si l'email est valide
export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// fonction qui vérifie si le mot de passe est valide
export function validatePassword(password: string): boolean {
    return password.length >= 6;
}
