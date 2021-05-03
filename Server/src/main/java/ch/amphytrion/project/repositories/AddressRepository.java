package ch.amphytrion.project.repositories;

import ch.amphytrion.project.entities.databaseentities.Address;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends MongoRepository<Address, String> {
}
