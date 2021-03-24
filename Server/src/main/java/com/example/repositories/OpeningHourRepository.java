package com.example.repositories;

import com.example.entities.OpeningHour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OpeningHourRepository extends MongoRepository<OpeningHour, Long> {
}
