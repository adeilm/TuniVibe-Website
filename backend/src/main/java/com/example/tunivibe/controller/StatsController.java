package com.example.tunivibe.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.group;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.limit;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.project;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.sort;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "http://localhost:5173")
public class StatsController {

    @Autowired
    private MongoTemplate mongoTemplate;

    // 1. Total Revenue (Aggregation: Group & Sum)
    @GetMapping("/revenue")
    public Map<String, Double> getTotalRevenue() {
        Aggregation aggregation = newAggregation(
            group().sum("total").as("totalRevenue")
        );

        AggregationResults<Map> results = mongoTemplate.aggregate(aggregation, "reservations", Map.class);
        Map<String, Double> result = results.getUniqueMappedResult();
        
        return result != null ? result : Map.of("totalRevenue", 0.0);
    }

    // 2. Reservations per Category (Aggregation: Group by Embedded Field)
    @GetMapping("/by-category")
    public List<Map> getStatsByCategory() {
        Aggregation aggregation = newAggregation(
            group("event.categorie").count().as("count"),
            project("count").and("_id").as("category")
        );

        AggregationResults<Map> results = mongoTemplate.aggregate(aggregation, "reservations", Map.class);
        return results.getMappedResults();
    }
    
    // 3. Top Selling Events (Aggregation: Group, Sort, Limit)
    @GetMapping("/top-events")
    public List<Map> getTopEvents() {
        Aggregation aggregation = newAggregation(
            group("event.titre").count().as("salesCount"),
            sort(org.springframework.data.domain.Sort.Direction.DESC, "salesCount"),
            limit(5)
        );

        AggregationResults<Map> results = mongoTemplate.aggregate(aggregation, "reservations", Map.class);
        return results.getMappedResults();
    }
}
