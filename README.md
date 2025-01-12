# To-Do-List en TypeScript

## Description

Ce projet est une application de gestion de tâches (To-Do List) construite en TypeScript sans framework. Elle permet aux utilisateurs de :

-   S'inscrire et se connecter.
-   Créer, valider, et supprimer des tâches.
-   Associer chaque tâche à un utilisateur connecté.
-   Voir les tâches terminées mais ne pas les supprimer.

Les données sont stockées localement via `localStorage`.

---

## Fonctionnalités

1. **Authentification** :

    - Inscription (email et mot de passe).
    - Connexion/Déconnexion.
    - Gestion de l'utilisateur courant.

2. **Gestion des tâches** :

    - Créer une tâche avec titre, description, deadline et statut.
    - Valider une tâche (la marquer comme terminée).
    - Supprimer une tâche (uniquement si elle n'est pas terminée).

3. **Stockage local** :

    - Toutes les données sont stockées dans `localStorage`.

4. **Interface Utilisateur** :
    - Simple et fonctionnelle, construite en HTML et CSS.
    - Dynamisme géré avec TypeScript.
  
--

## Installation

Installer les dépendances : npm i

Compiler le TypeScript : Utilisez le compilateur TypeScript pour transformer les fichiers .ts en .js : npm run start

Lancer l'application : Ouvrez le fichier index.html dans votre navigateur.
