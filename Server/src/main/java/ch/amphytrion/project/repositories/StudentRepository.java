package ch.amphytrion.project.repositories;

import ch.amphytrion.project.entities.databaseentities.StudentProfil;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends MongoRepository<StudentProfil, String> {
    StudentProfil findByUsername(String username);
}
