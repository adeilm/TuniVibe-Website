package com.example.tunivibe.controller;

import com.example.tunivibe.model.Event;
import com.example.tunivibe.model.Utilisateur;
import com.example.tunivibe.model.StatusEvent;
import com.example.tunivibe.repository.EventRepository;
import com.example.tunivibe.repository.UtilisateurRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final UtilisateurRepository utilisateurRepository;
    private final EventRepository eventRepository;

    public AdminController(UtilisateurRepository utilisateurRepository, EventRepository eventRepository) {
        this.utilisateurRepository = utilisateurRepository;
        this.eventRepository = eventRepository;
    }

    // 🔹 1. Obtenir tous les organisateurs
    @GetMapping("/organisateurs")
    public List<Utilisateur> getAllOrganisateurs() {
        return utilisateurRepository.findByRole("ORGANISATEUR");
    }

    // 🔹 2. Supprimer un organisateur
    @DeleteMapping("/organisateurs/{id}")
    public void deleteOrganisateur(@PathVariable String id) {
        utilisateurRepository.deleteById(id);
    }

    // 🔹 3. Obtenir tous les événements
    @GetMapping("/events")
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // 🔹 4. Obtenir les événements en attente
    @GetMapping("/events/en-attente")
    public List<Event> getPendingEvents() {
        return eventRepository.findByStatus(StatusEvent.EN_ATTENTE);
    }

    // 🔹 5. Obtenir les événements confirmés
    @GetMapping("/events/confirme")
    public List<Event> getConfirmedEvents() {
        return eventRepository.findByStatus(StatusEvent.CONFIRME);
    }

    // 🔹 6. Accepter un événement
    @PutMapping("/events/{id}/accepter")
    public Event acceptEvent(@PathVariable String id) {
        Event event = eventRepository.findById(id).orElseThrow();
        event.setStatus(StatusEvent.CONFIRME);
        return eventRepository.save(event);
    }

    // 🔹 7. Refuser un événement
    @PutMapping("/events/{id}/refuser")
    public Event refuseEvent(@PathVariable String id) {
        Event event = eventRepository.findById(id).orElseThrow();
        event.setStatus(StatusEvent.ANNULE);
        return eventRepository.save(event);
    }
}
