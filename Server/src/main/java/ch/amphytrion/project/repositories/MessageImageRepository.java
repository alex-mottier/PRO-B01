package ch.amphytrion.project.repositories;

import ch.amphytrion.project.entities.MessageImage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageImageRepository extends MongoRepository<MessageImage, String> {
}
