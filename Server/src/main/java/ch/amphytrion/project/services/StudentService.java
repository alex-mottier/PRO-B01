package ch.amphytrion.project.services;

import ch.amphytrion.project.entities.databaseentities.StudentProfil;
import ch.amphytrion.project.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService implements IGenericService<StudentProfil> {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public List<StudentProfil> findAll() {
        return studentRepository.findAll();
    }

    @Override
    public StudentProfil save(StudentProfil studentProfil) {
        return studentRepository.save(studentProfil);
    }

    @Override
    public StudentProfil findById(String id) {
        try {
            return studentRepository.findById(id).orElseThrow(Exception::new);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void delete(StudentProfil studentProfil) {
        studentRepository.delete(studentProfil);
    }

    @Override
    public void deleteById(String id) {
        studentRepository.deleteById(id);
    }

    @Override
    public long count() {
        return studentRepository.count();
    }

    public StudentProfil findByUsername(String username) {
        try{
            return studentRepository.findByUsername(username);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
