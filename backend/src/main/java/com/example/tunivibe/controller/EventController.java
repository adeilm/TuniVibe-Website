package com.example.tunivibe.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.tunivibe.model.Event;
import com.example.tunivibe.model.StatusEvent;
import com.example.tunivibe.model.Utilisateur;
import com.example.tunivibe.repository.EventRepository;
import com.example.tunivibe.repository.UtilisateurRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UtilisateurRepository userRepository;
    
    // -----------------------
    // SEARCH & REVIEWS (NoSQL Features)
    // -----------------------
    
    @GetMapping("/search")
    public List<Event> searchEvents(@RequestParam String query) {
        TextCriteria criteria = TextCriteria.forDefaultLanguage().matching(query);
        return eventRepository.findAllBy(criteria);
    }

    @PostMapping("/{id}/reviews")
    public Event addReview(@PathVariable String id, @RequestBody Event.Review review) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        
        if (event.getReviews() == null) {
            event.setReviews(List.of(review));
        } else {
            event.getReviews().add(review);
        }
        
        return eventRepository.save(event);
    }

 // Méthode utilitaire pour mettre à jour les événements terminés
    private void updatePastEvents() {
        List<Event> events = eventRepository.findAll();
        LocalDate today = LocalDate.now();

        for (Event event : events) {
            if (event.getStatus() != StatusEvent.TERMINE && event.getDate().isBefore(today)) {
                event.setStatus(StatusEvent.TERMINE);
                eventRepository.save(event);
            }
        }
    }

 // -----------------------
 // CREATE
 // -----------------------
 @PostMapping
 public Event createEvent(@RequestBody Event event) throws Exception {
     if (event.getCapaciteMax() <= 0) {
         throw new IllegalArgumentException("La capacité doit être > 0");
     }
     event.setNbTicketsRestants(event.getCapaciteMax());

     if (event.getDate() == null) {
         throw new IllegalArgumentException("La date est obligatoire");
     }
     long daysBetween = ChronoUnit.DAYS.between(LocalDate.now(), event.getDate());
     if (daysBetween < 7) {
         throw new IllegalArgumentException("Un événement doit être créé au moins 7 jours avant sa date");
     }

     if (event.getStartTime() != null && event.getEndTime() != null) {
         if (!event.getStartTime().isBefore(event.getEndTime())) {
             throw new IllegalArgumentException("L'heure de début doit être avant l'heure de fin");
         }
     }

     if (event.getStatus() == null) {
         event.setStatus(StatusEvent.EN_ATTENTE);
     }

     // --- ajout du sous-document organisateur ---
     if (event.getOrganisateurId() != null && !event.getOrganisateurId().isEmpty()) {
         Optional<Utilisateur> userOpt = userRepository.findById(event.getOrganisateurId());
         if (userOpt.isPresent()) {
             Utilisateur user = userOpt.get();

             Event.Organisateur orga = new Event.Organisateur();
             orga.setUserId(user.getId());
             orga.setPrenom(user.getPrenom());
             orga.setNom(user.getNom());
             orga.setEmail(user.getEmail());

             event.setOrganisateur(orga);
         }
     }

     //if (event.getImageBase64() != null && !event.getImageBase64().isEmpty()) {
         //Path imagePath = Path.of(event.getImageBase64());
         //byte[] fileContent = Files.readAllBytes(imagePath);
         //String base64Image = "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(fileContent);
         //event.setImageBase64(base64Image);
     //}

     return eventRepository.save(event);
 }

    // -----------------------
    // READ ALL (CONFIRMED ONLY)
    // -----------------------
    @GetMapping
    public List<Event> getAll() {
    	updatePastEvents();
        return eventRepository.findAll().stream()
                .filter(e -> e.getStatus() == StatusEvent.CONFIRME)
                .collect(Collectors.toList());
    }

    // -----------------------
    // READ ONE (CONFIRMED ONLY)
    // -----------------------
    @GetMapping("/{id}")
    public Event getById(@PathVariable String id) {
    	updatePastEvents();
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Événement introuvable"));

        if (event.getStatus() != StatusEvent.CONFIRME) {
            throw new RuntimeException("Événement non confirmé");
        }

        return event;
    }

    // -----------------------
    // GET EVENTS BY CATEGORY (CONFIRMED ONLY)
    // -----------------------
    @GetMapping("/category/{category}")
    public List<Event> getEventsByCategory(@PathVariable String category) {
    	updatePastEvents();
        return eventRepository.findByCategorie(category).stream()
                .filter(e -> e.getStatus() == StatusEvent.CONFIRME)
                .collect(Collectors.toList());
    }

    // -----------------------
    // GET EVENT + ORGANISATEUR (CONFIRMED ONLY)
    // -----------------------
    @GetMapping("/{id}/details")
    public Map<String, Object> getEventWithOrganisateur(@PathVariable String id) {
    	updatePastEvents();
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event introuvable"));

        if (event.getStatus() != StatusEvent.CONFIRME) {
            throw new RuntimeException("Événement non confirmé");
        }

        if (event.getOrganisateurId() == null) {
            throw new RuntimeException("Organisateur non défini pour cet événement");
        }

        Utilisateur user = userRepository.findById(event.getOrganisateurId())
                .orElseThrow(() -> new RuntimeException("Organisateur introuvable"));

        Map<String, Object> response = new HashMap<>();
        response.put("event", event);
        response.put("organisateur", user);

        return response;
    }

    // -----------------------
    // LIST OF UNIQUE CITIES BY CATEGORY (CONFIRMED ONLY)
    // -----------------------
    @GetMapping("/cities")
    public List<String> getCitiesByCategory(@RequestParam String category) {
    	updatePastEvents();
        List<Event> events = eventRepository.findCitiesByCategorie(category);

        return events.stream()
                .filter(e -> e.getStatus() == StatusEvent.CONFIRME)
                .map(Event::getVille)
                .distinct()
                .collect(Collectors.toList());
    }

    // -----------------------
    // UPDATE
    // -----------------------
    @PutMapping("/{id}")
    public Event update(@PathVariable String id, @RequestBody Event event) throws Exception {
        Event existing = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Événement introuvable"));

        if (event.getCapaciteMax() <= 0) {
            throw new IllegalArgumentException("La capacité doit être > 0");
        }

        long daysBetween = ChronoUnit.DAYS.between(LocalDate.now(), event.getDate());
        if (daysBetween < 7) {
            throw new IllegalArgumentException("Un événement doit être modifié au moins 7 jours avant sa date");
        }

        if (event.getStartTime() != null && event.getEndTime() != null) {
            if (!event.getStartTime().isBefore(event.getEndTime())) {
                throw new IllegalArgumentException("L'heure de début doit être avant l'heure de fin");
            }
        }

        event.setId(id);
        if (existing.getNbTicketsRestants() > event.getCapaciteMax()) {
            event.setNbTicketsRestants(event.getCapaciteMax());
        } else {
            event.setNbTicketsRestants(existing.getNbTicketsRestants());
        }

        if (event.getImageBase64() == null || event.getImageBase64().isEmpty()) {
            event.setImageBase64(existing.getImageBase64());
        } else {
            Path imagePath = Path.of(event.getImageBase64());
            byte[] fileContent = Files.readAllBytes(imagePath);
            String base64Image = "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(fileContent);
            event.setImageBase64(base64Image);
        }

        return eventRepository.save(event);
    }

    // -----------------------
    // DELETE
    // -----------------------
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        eventRepository.deleteById(id);
    }
}
