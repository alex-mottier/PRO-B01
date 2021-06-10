package ch.amphytrion.project.services;

import ch.amphytrion.project.entities.databaseentities.StudentProfil;
import ch.amphytrion.project.entities.databaseentities.User;
import ch.amphytrion.project.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 *
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@Service
public class StudentService {

    @Autowired
    private UserRepository studentRepository;

    /**
     * Student service constructor
     * @param studentRepository Repository of student class
     */
    @Autowired
    public StudentService(UserRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    /**
     * Retrieve all the users of the database
     * @return List<User> list of all the users of the database
     */
    public List<User> findAll() {
        return studentRepository.findAll()
                .stream()
                .filter(user -> user.getStudentProfil() != null)
                .collect(Collectors.toList());
    }

    /**
     * Create/Update user in database
     * @param student the user to add/update as student
     * @return User the student added/modified
     */
    public User save(User student) {
        if(student.getStudentProfil() != null){
            return studentRepository.save(student);
        } else {
            return null;
        }
    }

    /**
     * find a student by its user id
     * @param id the id of user to find
     * @return User the user found
     */
    public User findById(String id) {
        try {
            Query query = new Query();
            query.addCriteria(Criteria.where("id").is(id));
            query.addCriteria(Criteria.where(StudentProfil.class.getName()).exists(true));
            return studentRepository.findByIdAndStudentProfilIsNotNull(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * delete a student
     * @param student the user to delete
     */
    public void delete(User student) {
        studentRepository.delete(student);
    }

    /**
     * delete a student by its id
     * @param id the id of the student to delete
     */
    public void deleteById(String id) {
        studentRepository.deleteById(id);
    }

    /**
     * Find a student by its username
     * @param username the username to search
     * @return User the user found
     */
    public User findByUsername(String username) {
        try{
            User possibleStudent = studentRepository.findByUsername(username);
            if(possibleStudent.getStudentProfil() != null){
                return possibleStudent;
            }
        } catch (Exception e) {
        }
        return null;
    }
}
