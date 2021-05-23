package ch.amphytrion.project.repositories;

import ch.amphytrion.project.entities.databaseentities.City;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 *
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@Repository
public interface CityRepository extends MongoRepository<City, String> {

}
