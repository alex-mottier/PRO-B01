package ch.amphytrion.project.repositories;

import ch.amphytrion.project.entities.databaseentities.Tag;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends MongoRepository<Tag, String> {
}
