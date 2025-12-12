package com.example.tunivibe.config;

import com.example.tunivibe.model.*;
import com.example.tunivibe.repository.EventRepository;
import com.example.tunivibe.repository.UtilisateurRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.LocalTime;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(UtilisateurRepository userRepository, EventRepository eventRepository) {
        return args -> {
            // Check if data already exists
            if (userRepository.count() > 0) {
                System.out.println("Database already seeded. Skipping initialization.");
                return;
            }

            System.out.println("Seeding database with Tunisian Vibes...");

            // 1. Create Users

            // Admin
            Utilisateur admin = new Utilisateur();
            admin.setNom("Admin");
            admin.setPrenom("System");
            admin.setEmail("admin@tunivibe.tn");
            admin.setMotDePasse("admin123");
            admin.setRole(Role.ADMIN);
            admin.setTelephone("98000000");
            userRepository.save(admin);

            // Organizer 1: Festival de Carthage
            Utilisateur orgCarthage = new Utilisateur();
            orgCarthage.setNom("Ben Amor");
            orgCarthage.setPrenom("Karim");
            orgCarthage.setEmail("contact@festivalcarthage.tn");
            orgCarthage.setMotDePasse("carthage2025");
            orgCarthage.setRole(Role.ORGANISATEUR);
            orgCarthage.setOrganisation("festivalcarthage");
            orgCarthage.setStatus(StatusUtilisateur.CONFIRME);
            orgCarthage.setTelephone("71123456");
            orgCarthage = userRepository.save(orgCarthage);

            // Organizer 2: Cultural Center
            Utilisateur orgCulture = new Utilisateur();
            orgCulture.setNom("Trabelsi");
            orgCulture.setPrenom("Leila");
            orgCulture.setEmail("leila@culture.tn");
            orgCulture.setMotDePasse("culture123");
            orgCulture.setRole(Role.ORGANISATEUR);
            orgCulture.setOrganisation("culture");
            orgCulture.setStatus(StatusUtilisateur.CONFIRME);
            orgCulture.setTelephone("55123123");
            orgCulture = userRepository.save(orgCulture);

            // Participant
            Utilisateur user = new Utilisateur();
            user.setNom("Jebali");
            user.setPrenom("Sarah");
            user.setEmail("sarah.jebali@gmail.com");
            user.setMotDePasse("sarah123");
            user.setRole(Role.PARTICIPANT);
            user.setTelephone("22334455");
            userRepository.save(user);

            // 2. Create Events

            // Event 1: Festival International de Carthage
            createEvent(eventRepository, orgCarthage,
                "Festival International de Carthage - Soirée d'Ouverture",
                "Une soirée inoubliable sous les étoiles de l'amphithéâtre romain avec des artistes de renommée mondiale.",
                LocalDate.now().plusDays(15),
                LocalTime.of(21, 0),
                LocalTime.of(23, 30),
                "Carthage",
                "Amphithéâtre de Carthage",
                CategorieEvent.FESTIVAL,
                7500,
                60.0
            );

            // Event 2: Jazz à Tabarka
            createEvent(eventRepository, orgCulture,
                "Tabarka Jazz Festival",
                "Le rendez-vous incontournable des amateurs de Jazz au pied du fort génois.",
                LocalDate.now().plusDays(30),
                LocalTime.of(20, 0),
                LocalTime.of(23, 0),
                "Tabarka",
                "Basilique de Tabarka",
                CategorieEvent.CONCERT,
                2000,
                45.0
            );

            // Event 3: Festival International du Sahara
            createEvent(eventRepository, orgCulture,
                "Festival International du Sahara",
                "Découvrez les traditions du désert : courses de dromadaires, chants bédouins et poésie.",
                LocalDate.now().plusDays(60),
                LocalTime.of(10, 0),
                LocalTime.of(18, 0),
                "Douz",
                "Place du Festival, Douz",
                CategorieEvent.AUTRE,
                10000,
                20.0
            );

            // Event 4: El Jem Symphonic
            createEvent(eventRepository, orgCarthage,
                "Concert Symphonique d'El Jem",
                "L'Orchestre Symphonique de Vienne illumine le colisée d'El Jem.",
                LocalDate.now().plusDays(45),
                LocalTime.of(21, 30),
                LocalTime.of(23, 30),
                "El Jem",
                "Amphithéâtre d'El Jem",
                CategorieEvent.CONCERT,
                4000,
                80.0
            );

            // Event 5: Tech Summit Tunis
            createEvent(eventRepository, orgCulture,
                "Tunisia Digital Summit",
                "Le plus grand rassemblement des professionnels du numérique et des startups en Afrique.",
                LocalDate.now().plusDays(5),
                LocalTime.of(9, 0),
                LocalTime.of(17, 0),
                "Tunis",
                "Hôtel Laico, Tunis",
                CategorieEvent.CONFERENCE,
                1500,
                150.0
            );

            // Event 6: Dream City
            createEvent(eventRepository, orgCulture,
                "Dream City - Art dans la Médina",
                "Parcours artistique contemporain au cœur de la Médina de Tunis.",
                LocalDate.now().plusDays(25),
                LocalTime.of(14, 0),
                LocalTime.of(20, 0),
                "Tunis",
                "Médina de Tunis",
                CategorieEvent.EXPOSITION,
                500,
                15.0
            );

            System.out.println("Database seeded successfully with Tunisian events!");
        };
    }

    private void createEvent(EventRepository repo, Utilisateur org, String titre, String desc, 
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

        repo.save(event);
    }
}
