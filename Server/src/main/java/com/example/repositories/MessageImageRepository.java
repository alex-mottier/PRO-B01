package com.example.repositories;

import com.example.neo4jEntities.MessageImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageImageRepository extends JpaRepository<MessageImage, Long> {
}
