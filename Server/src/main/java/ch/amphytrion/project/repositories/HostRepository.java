package ch.amphytrion.project.repositories;

import ch.amphytrion.project.entities.Host;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HostRepository extends MongoRepository<Host, Long> {
}
