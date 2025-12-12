// src/services/eventService.js
const BASE_URL = "http://localhost:8080/api/events";

const eventService = {
  // ----------------------------------------------------
  // Récupérer tous les événements
  // ----------------------------------------------------
  getAllEvents: async () => {
    try {
      const res = await fetch(BASE_URL);
      if (!res.ok) throw new Error("Erreur lors du fetch des événements");
      return await res.json();
    } catch (error) {
      console.error("Erreur dans eventService.getAllEvents :", error);
      return [];
    }
  },

  // ----------------------------------------------------
  // Récupérer par catégorie
  // ----------------------------------------------------
  getEventsByCategory: async (categorie) => {
    try {
      const res = await fetch(`${BASE_URL}/category/${categorie}`);
      if (!res.ok)
        throw new Error("Erreur lors du fetch des événements par catégorie");
      return await res.json();
    } catch (error) {
      console.error("Erreur dans eventService.getEventsByCategory :", error);
      return [];
    }
  },

  // ----------------------------------------------------
  // Récupérer un événement par ID
  // ----------------------------------------------------
  getEventById: async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`);
      if (!res.ok) throw new Error("Événement introuvable");
      return await res.json();
    } catch (error) {
      console.error("Erreur dans eventService.getEventById :", error);
      return null;
    }
  },

  // ----------------------------------------------------
  // Recherche (Full Text Search)
  // ----------------------------------------------------
  searchEvents: async (query) => {
    try {
      const res = await fetch(`${BASE_URL}/search?query=${query}`);
      if (!res.ok) throw new Error("Erreur lors de la recherche");
      return await res.json();
    } catch (error) {
      console.error("Erreur dans eventService.searchEvents :", error);
      return [];
    }
  },

  // ----------------------------------------------------
  // Ajouter un avis (Review)
  // ----------------------------------------------------
  addReview: async (eventId, reviewData) => {
    try {
      const res = await fetch(`${BASE_URL}/${eventId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });
      if (!res.ok) throw new Error("Erreur lors de l'ajout de l'avis");
      return await res.json();
    } catch (error) {
      console.error("Erreur dans eventService.addReview :", error);
      return null;
    }
  },

  // ----------------------------------------------------
  // Créer un événement
  // ----------------------------------------------------
  createEvent: async (event) => {
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });
      if (!res.ok) throw new Error("Erreur lors de la création de l'événement");
      return await res.json();
    } catch (error) {
      console.error("Erreur dans eventService.createEvent :", error);
      return null;
    }
  },

  // ----------------------------------------------------
  // Mettre à jour un événement
  // ----------------------------------------------------
  updateEvent: async (id, event) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });
      if (!res.ok)
        throw new Error("Erreur lors de la mise à jour de l'événement");
      return await res.json();
    } catch (error) {
      console.error("Erreur dans eventService.updateEvent :", error);
      return null;
    }
  },

  // ----------------------------------------------------
  // Supprimer un événement
  // ----------------------------------------------------
  deleteEvent: async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur lors de la suppression de l'événement");
      return true;
    } catch (error) {
      console.error("Erreur dans eventService.deleteEvent :", error);
      return false;
    }
  },

  // ----------------------------------------------------
  // Récupérer les villes uniques par catégorie
  // ----------------------------------------------------
  getCitiesByCategory: async (categorie) => {
    try {
      const res = await fetch(`${BASE_URL}/cities?category=${encodeURIComponent(categorie)}`);
      if (!res.ok)
        throw new Error("Erreur lors du fetch des villes par catégorie");
      return await res.json();
    } catch (error) {
      console.error("Erreur dans eventService.getCitiesByCategory :", error);
      return [];
    }
  }
};

export default eventService;
