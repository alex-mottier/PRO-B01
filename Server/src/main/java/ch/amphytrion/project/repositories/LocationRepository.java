package ch.amphytrion.project.repositories;

import ch.amphytrion.project.entities.Location;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends MongoRepository<Location, Long> {

}
