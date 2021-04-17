package ch.amphytrion.project.repositories;

import ch.amphytrion.project.entities.databaseentities.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends MongoRepository<Message, String> {
}
