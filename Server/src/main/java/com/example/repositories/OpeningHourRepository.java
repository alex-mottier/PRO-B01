package com.example.repositories;

import com.example.neo4jEntities.OpeningHour;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OpeningHourRepository extends JpaRepository<OpeningHour, Long> {
}
