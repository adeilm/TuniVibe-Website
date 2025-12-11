package com.example.tunivibe.controller;

import com.example.tunivibe.model.Event;
import com.example.tunivibe.model.StatusEvent;
import com.example.tunivibe.model.StatusUtilisateur;
import com.example.tunivibe.model.Utilisateur;
import com.example.tunivibe.model.Role;
import com.example.tunivibe.repository.EventRepository;
import com.example.tunivibe.repository.UtilisateurRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UtilisateurController {

    @Autowired
    private UtilisateurRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    // ========================
    // CRUD Utilisateurs
    // ========================
    @PostMapping
    public Utilisateur create(@RequestBody Utilisateur u) {
        validateOrganisateurEmail(u);

        // Si Organisateur, status par défaut = EN_ATTENTE
        if (Role.ORGANISATEUR.equals(u.getRole()) && u.getStatus() == null) {
            u.setStatus(StatusUtilisateur.EN_ATTENTE);
        }

        return userRepository.save(u);
    }

    @GetMapping
    public List<Utilisateur> getAll() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public Utilisateur getOne(@PathVariable String id) {
        return userRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Utilisateur update(@PathVariable String id, @RequestBody Utilisateur u) {
        u.setId(id);
        validateOrganisateurEmail(u);
        return userRepository.save(u);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        userRepository.deleteById(id);
    }

    private void validateOrganisateurEmail(Utilisateur u) {
        if (u.getRole() == null) {
            throw new IllegalArgumentException("Role est obligatoire");
        }

        if (Role.ORGANISATEUR.equals(u.getRole())) {
            if (u.getOrganisation() == null || u.getOrganisation().isEmpty()) {
                throw new IllegalArgumentException("Organisation est obligatoire pour un Organisateur");
            }

            String tlds = "com|net|org|info|fr|tn|de|uk|us|ca|es|it|jp|io|tech|co|biz";
            String pattern = "(?i)^[A-Za-z0-9._%+-]+@" + u.getOrganisation() + "\\.(" + tlds + ")$";

            if (!u.getEmail().matches(pattern)) {
                throw new IllegalArgumentException(
                        "Email doit être professionnel pour l'organisateur (ex: user@" + u.getOrganisation() + ".com, .tn, .fr …)"
                );
            }
        }
    }

    // ========================
    // ADMIN – Organisateurs
    // ========================
    @GetMapping("/admin/organisateurs/pending")
    public List<Utilisateur> getPendingOrganisateurs() {
        return userRepository.findAll().stream()
                .filter(u -> Role.ORGANISATEUR.equals(u.getRole()) &&
                        StatusUtilisateur.EN_ATTENTE.equals(u.getStatus()))
                .collect(Collectors.toList());
    }

    @PutMapping("/admin/organisateurs/{id}/approve")
    public Utilisateur approveOrganisateur(@PathVariable String id) {
        Utilisateur u = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Organisateur introuvable"));
        u.setStatus(StatusUtilisateur.CONFIRME);
        return userRepository.save(u);
    }

    @PutMapping("/admin/organisateurs/{id}/reject")
    public Utilisateur rejectOrganisateur(@PathVariable String id) {
        Utilisateur u = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Organisateur introuvable"));
        u.setStatus(StatusUtilisateur.REJETE);
        return userRepository.save(u);
    }

    // ========================
    // ADMIN – Événements
    // ========================
    @GetMapping("/admin/events/pending")
    public List<Event> getPendingEvents() {
        return eventRepository.findAll().stream()
                .filter(e -> e.getStatus() == StatusEvent.EN_ATTENTE)
                .collect(Collectors.toList());
    }

    @PutMapping("/admin/events/{id}/approve")
    public Event approveEvent(@PathVariable String id) {
        Event e = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Événement introuvable"));
        e.setStatus(StatusEvent.CONFIRME);
        return eventRepository.save(e);
    }

    @DeleteMapping("/admin/events/{id}")
    public void rejectEvent(@PathVariable String id) {
        eventRepository.deleteById(id);
    }
}
