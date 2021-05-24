package ch.amphytrion.project.repositories;

import ch.amphytrion.project.entities.databaseentities.Address;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Add CRUD methods to Address collection in database
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@Repository
public interface AddressRepository extends MongoRepository<Address, String> {
}
