// src/services/reservationService.js
const BASE_URL = `${import.meta.env.VITE_API_URL}/reservations`;

const reservationService = {
  // Créer une réservation
  createReservation: async (reservation) => {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservation),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }

    return response.json();
  },

  // Récupérer toutes les réservations
  getAllReservations: async () => {
    const response = await fetch(BASE_URL);
    return response.json();
  },

  // Récupérer les réservations d'un utilisateur
  getByUser: async (userId) => {
    const response = await fetch(`${BASE_URL}/user/${userId}`);
    return response.json();
  },

  // Récupérer les réservations d'un événement
  getByEvent: async (eventId) => {
    const response = await fetch(`${BASE_URL}/event/${eventId}`);
    return response.json();
  },
};

export default reservationService;
