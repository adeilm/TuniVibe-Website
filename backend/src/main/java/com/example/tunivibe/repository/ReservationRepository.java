package com.example.tunivibe.repository;

import com.example.tunivibe.model.Reservation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends MongoRepository<Reservation, String> {
    List<Reservation> findByEventId(String eventId);
    List<Reservation> findByUserId(String userId);
}
