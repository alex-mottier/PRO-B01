package ch.amphytrion.project.repositories;

import ch.amphytrion.project.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends Neo4jRepository<User, String> {

    User findByUsername(String username);

}
