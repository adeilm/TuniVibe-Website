package com.example.tunivibe.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class Utilisateur {

    @Id
    private String id; // ID incrémental
    private String nom;
    private String prenom;
    private String email;
    private String motDePasse;
    private Role role; // ADMIN, ORGANISATEUR, PARTICIPANT
    private String telephone;

    // Champs spécifiques pour Organisateur
    private String organisation;
    private StatusUtilisateur status;

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMotDePasse() { return motDePasse; }
    public void setMotDePasse(String motDePasse) { this.motDePasse = motDePasse; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }

    public String getOrganisation() { return organisation; }
    public void setOrganisation(String organisation) { this.organisation = organisation; }
    
    public StatusUtilisateur getStatus() { return status; }
    public void setStatus(StatusUtilisateur status) { this.status = status; }
}
