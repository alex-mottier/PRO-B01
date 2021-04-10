package ch.amphytrion.project.repositories;

import ch.amphytrion.project.entities.Meeting;
import ch.amphytrion.project.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingRepository extends MongoRepository<Meeting, String> {
}

