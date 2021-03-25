package ch.amphytrion.project.repositories;

import ch.amphytrion.project.entities.OpeningHour;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OpeningHourRepository extends MongoRepository<OpeningHour, Long> {
}
