package com.example.tunivibe.config;

import com.example.tunivibe.model.*;
import com.example.tunivibe.repository.EventRepository;
import com.example.tunivibe.repository.ReservationRepository;
import com.example.tunivibe.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Configuration
public class DataSeeder {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner initDatabase(UtilisateurRepository userRepository, 
                                   EventRepository eventRepository,
                                   ReservationRepository reservationRepository) {
        return args -> {
            // Clear database to ensure passwords are hashed
            userRepository.deleteAll();
            eventRepository.deleteAll();
            reservationRepository.deleteAll();

            System.out.println("Seeding database with RICH Tunisian content...");

            // ==========================================
            // 1. USERS
            // ==========================================
            
            // --- Admin ---
            Utilisateur admin = createUser(userRepository, "Admin", "System", "admin@tunivibe.tn", "admin123", Role.ADMIN, null, "98000000", null);

            // --- Organizers ---
            Utilisateur orgCarthage = createUser(userRepository, "Ben Amor", "Karim", "contact@festivalcarthage.tn", "carthage2025", Role.ORGANISATEUR, "festivalcarthage", "71123456", StatusUtilisateur.CONFIRME);
            Utilisateur orgCulture = createUser(userRepository, "Trabelsi", "Leila", "leila@culture.tn", "culture123", Role.ORGANISATEUR, "culture", "55123123", StatusUtilisateur.CONFIRME);
            Utilisateur orgSport = createUser(userRepository, "Gharbi", "Sami", "sami@sportevents.tn", "sport123", Role.ORGANISATEUR, "sportevents", "22555666", StatusUtilisateur.CONFIRME);
            Utilisateur orgTech = createUser(userRepository, "Mebazaa", "Yassine", "yassine@techhub.tn", "tech123", Role.ORGANISATEUR, "techhub", "50111222", StatusUtilisateur.CONFIRME);
            
            // Pending Organizer (for admin dashboard testing)
            createUser(userRepository, "New", "Organizer", "pending@neworg.tn", "pending123", Role.ORGANISATEUR, "neworg", "99887766", StatusUtilisateur.EN_ATTENTE);

            // --- Participants ---
            List<Utilisateur> participants = new ArrayList<>();
            participants.add(createUser(userRepository, "Jebali", "Sarah", "sarah.jebali@gmail.com", "sarah123", Role.PARTICIPANT, null, "22334455", null));
            participants.add(createUser(userRepository, "Ben Salah", "Ahmed", "ahmed.bs@gmail.com", "ahmed123", Role.PARTICIPANT, null, "55667788", null));
            participants.add(createUser(userRepository, "Khemiri", "Youssef", "youssef.k@hotmail.com", "youssef123", Role.PARTICIPANT, null, "98765432", null));
            participants.add(createUser(userRepository, "Dridi", "Amira", "amira.dridi@yahoo.fr", "amira123", Role.PARTICIPANT, null, "21345678", null));
            participants.add(createUser(userRepository, "Mansouri", "Malek", "malek.man@gmail.com", "malek123", Role.PARTICIPANT, null, "50998877", null));

            // ==========================================
            // 2. EVENTS
            // ==========================================
            List<Event> events = new ArrayList<>();

            // --- Festivals & Concerts ---
            events.add(createEvent(eventRepository, orgCarthage,
                "Festival International de Carthage - Soirée d'Ouverture",
                "Une soirée inoubliable sous les étoiles de l'amphithéâtre romain avec des artistes de renommée mondiale.",
                LocalDate.now().plusDays(15), LocalTime.of(21, 0), LocalTime.of(23, 30),
                "Carthage", "Amphithéâtre de Carthage", CategorieEvent.FESTIVAL, 7500, 60.0));

            events.add(createEvent(eventRepository, orgCulture,
                "Tabarka Jazz Festival",
                "Le rendez-vous incontournable des amateurs de Jazz au pied du fort génois.",
                LocalDate.now().plusDays(30), LocalTime.of(20, 0), LocalTime.of(23, 0),
                "Tabarka", "Basilique de Tabarka", CategorieEvent.CONCERT, 2000, 45.0));

            events.add(createEvent(eventRepository, orgCarthage,
                "Concert Symphonique d'El Jem",
                "L'Orchestre Symphonique de Vienne illumine le colisée d'El Jem.",
                LocalDate.now().plusDays(45), LocalTime.of(21, 30), LocalTime.of(23, 30),
                "El Jem", "Amphithéâtre d'El Jem", CategorieEvent.CONCERT, 4000, 80.0));

            events.add(createEvent(eventRepository, orgCulture,
                "Festival International du Sahara",
                "Découvrez les traditions du désert : courses de dromadaires, chants bédouins et poésie.",
                LocalDate.now().plusDays(60), LocalTime.of(10, 0), LocalTime.of(18, 0),
                "Douz", "Place du Festival, Douz", CategorieEvent.AUTRE, 10000, 20.0));

            // --- Tech & Professional ---
            events.add(createEvent(eventRepository, orgTech,
                "Tunisia Digital Summit",
                "Le plus grand rassemblement des professionnels du numérique et des startups en Afrique.",
                LocalDate.now().plusDays(5), LocalTime.of(9, 0), LocalTime.of(17, 0),
                "Tunis", "Hôtel Laico, Tunis", CategorieEvent.CONFERENCE, 1500, 150.0));

            events.add(createEvent(eventRepository, orgTech,
                "AI & Big Data Workshop",
                "Atelier pratique sur l'intelligence artificielle et le traitement des données massives.",
                LocalDate.now().plusDays(12), LocalTime.of(14, 0), LocalTime.of(18, 0),
                "Sousse", "Technopark Sousse", CategorieEvent.ATELIER, 50, 80.0));

            // --- Sports ---
            events.add(createEvent(eventRepository, orgSport,
                "Marathon COMAR de Tunis-Carthage",
                "Participez à la 37ème édition du Marathon. Parcours de 42km, 21km et 5km pour tous.",
                LocalDate.now().plusDays(25), LocalTime.of(7, 0), LocalTime.of(13, 0),
                "Tunis", "Avenue Habib Bourguiba", CategorieEvent.SPORT, 3000, 30.0));

            events.add(createEvent(eventRepository, orgSport,
                "Tournoi de Tennis Tunis Open",
                "Compétition internationale de tennis sur terre battue.",
                LocalDate.now().plusDays(40), LocalTime.of(10, 0), LocalTime.of(19, 0),
                "Tunis", "Tennis Club de Tunis", CategorieEvent.SPORT, 1000, 40.0));

            // --- Culture & Art ---
            events.add(createEvent(eventRepository, orgCulture,
                "Dream City - Art dans la Médina",
                "Parcours artistique contemporain au cœur de la Médina de Tunis.",
                LocalDate.now().plusDays(20), LocalTime.of(14, 0), LocalTime.of(20, 0),
                "Tunis", "Médina de Tunis", CategorieEvent.EXPOSITION, 500, 15.0));

            events.add(createEvent(eventRepository, orgCulture,
                "Journées Théâtrales de Carthage (JTC)",
                "Représentation spéciale : 'Le Radeau' - Une pièce primée.",
                LocalDate.now().plusDays(35), LocalTime.of(19, 0), LocalTime.of(21, 0),
                "Tunis", "Théâtre Municipal", CategorieEvent.THEATRE, 800, 25.0));

            // ==========================================
            // 3. RESERVATIONS
            // ==========================================
            Random random = new Random();
            
            // Create some random reservations
            for (Utilisateur participant : participants) {
                // Each participant books 2-4 random events
                int nbBookings = 2 + random.nextInt(3); 
                
                for (int i = 0; i < nbBookings; i++) {
                    Event event = events.get(random.nextInt(events.size()));
                    int nbTickets = 1 + random.nextInt(3); // 1 to 3 tickets
                    
                    createReservation(reservationRepository, eventRepository, participant, event, nbTickets);
                }
            }

            System.out.println("Database seeded successfully with Users, Events, and Reservations!");
        };
    }

    private Utilisateur createUser(UtilisateurRepository repo, String nom, String prenom, String email, String password, Role role, String orgName, String tel, StatusUtilisateur status) {
        Utilisateur u = new Utilisateur();
        u.setNom(nom);
        u.setPrenom(prenom);
        u.setEmail(email);
        u.setMotDePasse(passwordEncoder.encode(password));
        u.setRole(role);
        u.setTelephone(tel);
        if (role == Role.ORGANISATEUR) {
            u.setOrganisation(orgName);
            u.setStatus(status);
        }
        return repo.save(u);
    }

    private Event createEvent(EventRepository repo, Utilisateur org, String titre, String desc, 
                             LocalDate date, LocalTime start, LocalTime end, String ville, 
                             String adresse, CategorieEvent cat, int cap, double prix) {
        Event event = new Event();
        event.setTitre(titre);
        event.setDescription(desc);
        event.setDate(date);
        event.setStartTime(start);
        event.setEndTime(end);
        event.setVille(ville);
        event.setAdresse(adresse);
        event.setCategorie(cat);
        event.setCapaciteMax(cap);
        event.setNbTicketsRestants(cap);
        event.setPrixTicket(prix);
        event.setStatus(StatusEvent.CONFIRME);
        event.setOrganisateurId(org.getId());

        Event.Organisateur orgInfo = new Event.Organisateur();
        orgInfo.setUserId(org.getId());
        orgInfo.setNom(org.getNom());
        orgInfo.setPrenom(org.getPrenom());
        orgInfo.setEmail(org.getEmail());
        event.setOrganisateur(orgInfo);

        return repo.save(event);
    }

    private void createReservation(ReservationRepository resRepo, EventRepository eventRepo, Utilisateur user, Event event, int nbTickets) {
        Reservation res = new Reservation();
        res.setEventId(event.getId());
        res.setUserId(user.getId());
        res.setNbTickets(nbTickets);
        res.setTotal(nbTickets * event.getPrixTicket());
        
        // User Info
        Reservation.UserInfo userInfo = new Reservation.UserInfo();
        userInfo.setUserId(user.getId());
        userInfo.setPrenom(user.getPrenom());
        userInfo.setEmail(user.getEmail());
        userInfo.setTel(user.getTelephone());
        res.setUser(userInfo);

        // Event Info
        Reservation.EventInfo eventInfo = new Reservation.EventInfo();
        eventInfo.setEventId(event.getId());
        eventInfo.setTitre(event.getTitre());
        eventInfo.setCategorie(event.getCategorie().toString());
        eventInfo.setVille(event.getVille());
        eventInfo.setDateDebut(event.getDate());
        res.setEvent(eventInfo);

        resRepo.save(res);

        // Update event tickets
        event.setNbTicketsRestants(event.getNbTicketsRestants() - nbTickets);
        eventRepo.save(event);
    }
}
