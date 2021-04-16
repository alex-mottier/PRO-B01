package ch.amphytrion.project.repositories;

import ch.amphytrion.project.entities.databaseentities.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepository extends MongoRepository<Chat, String> {
}
