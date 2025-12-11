package com.example.tunivibe.repository;

import com.example.tunivibe.model.Utilisateur;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UtilisateurRepository extends MongoRepository<Utilisateur, String> {

	List<Utilisateur> findByRole(String role);
}
