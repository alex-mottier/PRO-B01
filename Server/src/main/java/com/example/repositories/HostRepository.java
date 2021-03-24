package com.example.repositories;

import com.example.entities.Host;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HostRepository extends MongoRepository<Host, Long> {
}
