package ch.amphytrion.project.repositories;

import ch.amphytrion.project.entities.databaseentities.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends MongoRepository<Student, String> {
    Student findByUsername(String username);
}
