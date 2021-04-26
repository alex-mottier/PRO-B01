package ch.amphytrion.project.services;

import ch.amphytrion.project.entities.databaseentities.StudentProfil;
import ch.amphytrion.project.entities.databaseentities.User;
import ch.amphytrion.project.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
        return studentRepository.findAll().stream().filter(user -> {return user.getStudentProfil() != null;}).collect(Collectors.toList());
    }

    public User save(User student) {
        return studentRepository.save(student);
    }

    public User findById(String id) {
        try {
            return studentRepository.findById(id).orElseThrow(Exception::new);
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
