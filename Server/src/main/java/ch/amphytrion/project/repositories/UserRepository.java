package ch.amphytrion.project.repositories;

import ch.amphytrion.project.entities.databaseentities.StudentProfil;
import ch.amphytrion.project.entities.databaseentities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 *
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findByUsername(String username);
    User findByGoogleId(String googleId);

    User findByIdAndStudentProfilIsNotNull(String id);

    User findByIdAndHostProfilIsNotNull(String id);
}
