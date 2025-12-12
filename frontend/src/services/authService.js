// src/services/authService.js
const BASE_URL = "http://localhost:8080/api/users";

const authService = {
  // ----------------------------------------------------
  // Login : vérifier email et mot de passe
  // ----------------------------------------------------
  login: async (email, motDePasse) => {
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: motDePasse }),
      });

      if (!res.ok) {
        // Si 401 ou 500, on considère que c'est un échec
        throw new Error("Email ou mot de passe invalide");
      }

      const user = await res.json();
      return user;
    } catch (error) {
      console.error("Erreur dans authService.login :", error);
      return null;
    }
  },

  // ----------------------------------------------------
  // Signup : créer un nouvel utilisateur
  // ----------------------------------------------------
  signup: async (userData) => {
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Erreur lors de la création de l'utilisateur");
      }

      return await res.json();
    } catch (error) {
      console.error("Erreur dans authService.signup :", error);
      return null;
    }
  },

  // ----------------------------------------------------
  // Récupérer un utilisateur par ID
  // ----------------------------------------------------
  getUserById: async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`);
      if (!res.ok) throw new Error("Utilisateur introuvable");
      return await res.json();
    } catch (error) {
      console.error("Erreur dans authService.getUserById :", error);
      return null;
    }
  },

  // ----------------------------------------------------
  // Récupérer tous les utilisateurs (utile admin)
  // ----------------------------------------------------
  getAllUsers: async () => {
    try {
      const res = await fetch(BASE_URL);
      if (!res.ok) throw new Error("Erreur lors du fetch des utilisateurs");
      return await res.json();
    } catch (error) {
      console.error("Erreur dans authService.getAllUsers :", error);
      return [];
    }
  },
};

export default authService;
