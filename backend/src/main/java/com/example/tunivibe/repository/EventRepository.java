package com.example.tunivibe.repository;

import com.example.tunivibe.model.Event;
import com.example.tunivibe.model.StatusEvent;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {
	// Récupérer tous les événements d'une catégorie spécifique
    List<Event> findByCategorie(String categorie);
    
 // Retourner les villes distinctes d'une catégorie donnée
    @Query(value = "{ 'categorie': ?0 }", fields = "{ 'ville': 1 }")
    List<Event> findCitiesByCategorie(String categorie);

	List<Event> findByStatus(StatusEvent enAttente);
}
