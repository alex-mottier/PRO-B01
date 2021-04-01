package ch.amphytrion.project.repositories;

import ch.amphytrion.project.entities.Tag;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends MongoRepository<Tag, Long> {
}
