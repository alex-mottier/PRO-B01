package ch.amphytrion.project.repositories;

import ch.amphytrion.project.entities.databaseentities.Meeting;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingRepository extends MongoRepository<Meeting, String> {
}
