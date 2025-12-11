// src/services/adminService.js

const API = "http://localhost:8080/api/admin";

const adminService = {

  // ------------------------------------------------------
  // Récupérer tous les organisateurs
  // ------------------------------------------------------
  getOrganisateurs: async () => {
    try {
      const res = await fetch(`${API}/organisateurs`);
      if (!res.ok) throw new Error("Erreur lors du chargement des organisateurs");
      return await res.json();
    } catch (error) {
      console.error("adminService.getOrganisateurs :", error);
      return [];
    }
  },

  // ------------------------------------------------------
  // Supprimer un organisateur
  // ------------------------------------------------------
  deleteOrganisateur: async (id) => {
    try {
      const res = await fetch(`${API}/organisateurs/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      return true;
    } catch (error) {
      console.error("adminService.deleteOrganisateur :", error);
      return false;
    }
  },

  // ------------------------------------------------------
  // Obtenir tous les événements
  // ------------------------------------------------------
  getEvents: async () => {
    try {
      const res = await fetch(`${API}/events`);
      if (!res.ok) throw new Error("Erreur lors du chargement des événements");
      return await res.json();
    } catch (error) {
      console.error("adminService.getEvents :", error);
      return [];
    }
  },

  // ------------------------------------------------------
  // Obtenir les événements en attente
  // ------------------------------------------------------
  getPendingEvents: async () => {
    try {
      const res = await fetch(`${API}/events/en-attente`);
      if (!res.ok) throw new Error("Erreur lors du chargement des événements en attente");
      return await res.json();
    } catch (error) {
      console.error("adminService.getPendingEvents :", error);
      return [];
    }
  },

  // ------------------------------------------------------
  // Obtenir les événements confirmés
  // ------------------------------------------------------
  getConfirmedEvents: async () => {
    try {
      const res = await fetch(`${API}/events/confirme`);
      if (!res.ok) throw new Error("Erreur lors du chargement des événements confirmés");
      return await res.json();
    } catch (error) {
      console.error("adminService.getConfirmedEvents :", error);
      return [];
    }
  },

  // ------------------------------------------------------
  // Accepter un événement
  // ------------------------------------------------------
  acceptEvent: async (id) => {
    try {
      const res = await fetch(`${API}/events/${id}/accepter`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error("Erreur lors de l'acceptation de l'événement");
      return await res.json();
    } catch (error) {
      console.error("adminService.acceptEvent :", error);
      return null;
    }
  },

  // ------------------------------------------------------
  // Refuser un événement
  // ------------------------------------------------------
  refuseEvent: async (id) => {
    try {
      const res = await fetch(`${API}/events/${id}/refuser`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error("Erreur lors du refus de l'événement");
      return await res.json();
    } catch (error) {
      console.error("adminService.refuseEvent :", error);
      return null;
    }
  }
};

export default adminService;
