package com.example.tunivibe.repository;

import java.util.List;

import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.tunivibe.model.Event;
import com.example.tunivibe.model.StatusEvent;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {
	// Récupérer tous les événements d'une catégorie spécifique
    List<Event> findByCategorie(String categorie);
    
    // Recherche textuelle (Full Text Search)
    List<Event> findAllBy(TextCriteria criteria);
    
 // Retourner les villes distinctes d'une catégorie donnée
    @Query(value = "{ 'categorie': ?0 }", fields = "{ 'ville': 1 }")
    List<Event> findCitiesByCategorie(String categorie);

	List<Event> findByStatus(StatusEvent enAttente);

    // Find events that are NOT 'TERMINE' and have a date before the given date
    List<Event> findByStatusNotAndDateBefore(StatusEvent status, java.time.LocalDate date);
}
