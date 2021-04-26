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

@Service
public class StudentService {

    @Autowired
    private UserRepository studentRepository;

    @Autowired
    public StudentService(UserRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<User> findAll() {
        return studentRepository.findAll()
                .stream()
                .filter(user -> user.getStudentProfil() != null)
                .collect(Collectors.toList());
    }

    public User save(User student) {
        if(student.getStudentProfil() != null){
            return studentRepository.save(student);
        } else {
            return null;
        }
    }

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

    public void delete(User student) {
        studentRepository.delete(student);
    }

    public void deleteById(String id) {
        studentRepository.deleteById(id);
    }

    public long count() {
        return studentRepository.count();
    }

    public User findByUsername(String username) {
        try{
            return studentRepository.findByUsername(username);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
