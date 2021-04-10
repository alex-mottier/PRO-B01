package ch.amphytrion.project.repositories;

import ch.amphytrion.project.entities.Meeting;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface MeetingRepository extends MongoRepository<Meeting, String> {
    ArrayList<Meeting> findByName(String name);
}

