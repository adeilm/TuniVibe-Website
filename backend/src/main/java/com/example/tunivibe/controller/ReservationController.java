package com.example.tunivibe.controller;

import com.example.tunivibe.model.Event;
import com.example.tunivibe.model.Reservation;
import com.example.tunivibe.repository.EventRepository;
import com.example.tunivibe.repository.ReservationRepository;
import com.example.tunivibe.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UtilisateurRepository userRepository;

    // CREATE
    @PostMapping
    public Reservation createReservation(@RequestBody Reservation res) {

        // Vérifier que l'événement existe
        Event event = eventRepository.findById(res.getEventId())
                .orElseThrow(() -> new RuntimeException("Événement introuvable"));

        // Vérifier que l'utilisateur existe
        userRepository.findById(res.getUserId())
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        // Vérifier que le nombre de tickets demandés est disponible
        if (res.getNbTickets() <= 0) {
            throw new IllegalArgumentException("Nombre de tickets doit être > 0");
        }
        if (res.getNbTickets() > event.getNbTicketsRestants()) {
            throw new IllegalArgumentException("Pas assez de tickets disponibles. Restants : " + event.getNbTicketsRestants());
        }

        // Calcul du total
        res.setTotal(res.getNbTickets() * event.getPrixTicket());

        // Mettre à jour les tickets restants
        event.setNbTicketsRestants(event.getNbTicketsRestants() - res.getNbTickets());
        eventRepository.save(event);

        return reservationRepository.save(res);
    }

    // GET ALL
    @GetMapping
    public List<Reservation> getAll() {
        return reservationRepository.findAll();
    }

    // GET BY USER
    @GetMapping("/user/{userId}")
    public List<Reservation> getByUser(@PathVariable String userId) {
        return reservationRepository.findByUserId(userId);
    }

    // GET BY EVENT
    @GetMapping("/event/{eventId}")
    public List<Reservation> getByEvent(@PathVariable String eventId) {
        return reservationRepository.findByEventId(eventId);
    }

}
