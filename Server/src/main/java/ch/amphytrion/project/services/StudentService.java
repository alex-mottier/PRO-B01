package com.example.services;

import com.example.entities.Student;
import com.example.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService implements IGenericService<Student> {

    private StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public List<Student> findAll() {
        return studentRepository.findAll();
    }

    @Override
    public Student save(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public Student findById(long id) {
        try {
            return studentRepository.findById(id).orElseThrow(Exception::new);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void delete(Student student) {
        studentRepository.delete(student);
    }

    @Override
    public void deleteById(long id) {
        studentRepository.deleteById(id);
    }

    @Override
    public long count() {
        return studentRepository.count();
    }

}
