package com.example.repositories;

import com.example.entities.OpeningHour;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OpeningHourRepository extends JpaRepository<OpeningHour, Long> {
}
