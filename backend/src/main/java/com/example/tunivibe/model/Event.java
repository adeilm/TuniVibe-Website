package com.example.tunivibe.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.time.LocalTime;

@Document(collection = "events")
public class Event {

    @Id
    private String id;

    private String imageBase64; // Stockage du chemin de l'image sur le serveur ou URL
    private String titre;
    private String description;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
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

    // --- Getters & Setters ---
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
}
