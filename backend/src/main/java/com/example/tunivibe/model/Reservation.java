package com.example.tunivibe.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "reservations")
public class Reservation {

    @Id
    private String id;

    private String eventId; // référence à l'événement
    private String userId;  // référence à l'utilisateur

    private int nbTickets;  // nombre de tickets réservés
    private double total;   // total = nbTickets * prixTicket de l'événement
    private LocalDateTime createdAt; // date de réservation

    // --- Sous-documents ---
    private UserInfo user;
    private EventInfo event;

    // Constructeur
    public Reservation() {
        this.createdAt = LocalDateTime.now();
    }

    // --- Getters & Setters ---
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getEventId() { return eventId; }
    public void setEventId(String eventId) { this.eventId = eventId; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public int getNbTickets() { return nbTickets; }
    public void setNbTickets(int nbTickets) { this.nbTickets = nbTickets; }

    public double getTotal() { return total; }
    public void setTotal(double total) { this.total = total; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public UserInfo getUser() { return user; }
    public void setUser(UserInfo user) { this.user = user; }

    public EventInfo getEvent() { return event; }
    public void setEvent(EventInfo event) { this.event = event; }

    // --- Classes internes pour sous-documents ---
    public static class UserInfo {
        private String userId;
        private String prenom;
        private String email;
        private String tel; // nouveau champ téléphone

        public String getUserId() { return userId; }
        public void setUserId(String userId) { this.userId = userId; }

        public String getPrenom() { return prenom; }
        public void setPrenom(String prenom) { this.prenom = prenom; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getTel() { return tel; }
        public void setTel(String tel) { this.tel = tel; }
    }

    public static class EventInfo {
        private String eventId;
        private String titre;
        private String categorie;
        private String ville;
        private LocalDate dateDebut; // uniquement la date, pas l'heure

        public String getEventId() { return eventId; }
        public void setEventId(String eventId) { this.eventId = eventId; }

        public String getTitre() { return titre; }
        public void setTitre(String titre) { this.titre = titre; }

        public String getCategorie() { return categorie; }
        public void setCategorie(String categorie) { this.categorie = categorie; }

        public String getVille() { return ville; }
        public void setVille(String ville) { this.ville = ville; }

        public LocalDate getDateDebut() { return dateDebut; }
        public void setDateDebut(LocalDate dateDebut) { this.dateDebut = dateDebut; }
    }
}
