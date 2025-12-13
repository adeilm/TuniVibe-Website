package com.example.tunivibe.model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "events")
public class Event {

    @Id
    private String id;

    private String imageBase64; // Stockage du chemin de l'image sur le serveur ou URL
    
    @TextIndexed(weight = 3)
    private String titre;
    
    @TextIndexed(weight = 2)
    private String description;
    
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    
    @TextIndexed(weight = 1)
    private String ville;
    
    private String adresse;
    private CategorieEvent categorie;
    private int capaciteMax; // capacité totale
    private int nbTicketsRestants; // tickets restants, initialisés = capaciteMax
    private double prixTicket;
    private StatusEvent status;

    // Créateur (Organisateur)
    private String organisateurId;
    // Nouveau sous-document organisateur
    private Organisateur organisateur;
    
    // Embedded Reviews (NoSQL Pattern: Embedding related data)
    private List<Review> reviews = new ArrayList<>();

    // Getters and Setters

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getImageBase64() { return imageBase64; }
    public void setImageBase64(String imageBase64) { this.imageBase64 = imageBase64; }

    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public LocalTime getStartTime() { return startTime; }
    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }

    public LocalTime getEndTime() { return endTime; }
    public void setEndTime(LocalTime endTime) { this.endTime = endTime; }

    public String getVille() { return ville; }
    public void setVille(String ville) { this.ville = ville; }

    public String getAdresse() { return adresse; }
    public void setAdresse(String adresse) { this.adresse = adresse; }

    public CategorieEvent getCategorie() { return categorie; }
    public void setCategorie(CategorieEvent categorie) { this.categorie = categorie; }

    public int getCapaciteMax() { return capaciteMax; }
    // Custom setter to maintain original logic
    public void setCapaciteMax(int capaciteMax) { 
        this.capaciteMax = capaciteMax; 
        this.nbTicketsRestants = capaciteMax; // initialisation automatique
    }

    public int getNbTicketsRestants() { return nbTicketsRestants; }
    public void setNbTicketsRestants(int nbTicketsRestants) { this.nbTicketsRestants = nbTicketsRestants; }

    public double getPrixTicket() { return prixTicket; }
    public void setPrixTicket(double prixTicket) { this.prixTicket = prixTicket; }

    public StatusEvent getStatus() { return status; }
    public void setStatus(StatusEvent status) { this.status = status; }

    public String getOrganisateurId() { return organisateurId; }
    public void setOrganisateurId(String organisateurId) { this.organisateurId = organisateurId; }

    public Organisateur getOrganisateur() { return organisateur; }
    public void setOrganisateur(Organisateur organisateur) { this.organisateur = organisateur; }

    public List<Review> getReviews() { return reviews; }
    public void setReviews(List<Review> reviews) { this.reviews = reviews; }


    // Classe interne pour l'organisateur
    public static class Organisateur {
        private String userId;
        private String prenom;
        private String nom;
        private String email;

        public String getUserId() { return userId; }
        public void setUserId(String userId) { this.userId = userId; }

        public String getPrenom() { return prenom; }
        public void setPrenom(String prenom) { this.prenom = prenom; }

        public String getNom() { return nom; }
        public void setNom(String nom) { this.nom = nom; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }

    // Classe interne pour les avis (Reviews)
    public static class Review {
        private String userId;
        private String userName;
        private int rating; // 1-5
        private String comment;
        private LocalDate date;

        public Review() {}
        public Review(String userId, String userName, int rating, String comment) {
            this.userId = userId;
            this.userName = userName;
            this.rating = rating;
            this.comment = comment;
            this.date = LocalDate.now();
        }

        public String getUserId() { return userId; }
        public void setUserId(String userId) { this.userId = userId; }

        public String getUserName() { return userName; }
        public void setUserName(String userName) { this.userName = userName; }

        public int getRating() { return rating; }
        public void setRating(int rating) { this.rating = rating; }

        public String getComment() { return comment; }
        public void setComment(String comment) { this.comment = comment; }

        public LocalDate getDate() { return date; }
        public void setDate(LocalDate date) { this.date = date; }
    }
}
