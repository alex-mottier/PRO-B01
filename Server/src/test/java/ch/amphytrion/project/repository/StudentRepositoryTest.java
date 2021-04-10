package ch.amphytrion.project.repository;


import ch.amphytrion.project.entities.*;
import ch.amphytrion.project.entities.Student;
import ch.amphytrion.project.repositories.*;
import ch.amphytrion.project.services.*;
import ch.amphytrion.project.controller.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
@SpringBootTest
public class StudentRepositoryTest {

    StudentRepository studentRepository;
    @Autowired
    private StudentService studentService;
    StudentController studentController = new StudentController(studentService);


    @Test
    void displayRequest() {
        // créer une personne
       Student student = new Student("Kainomad");
        studentService.save(student);
        Student result = studentService.findByStudentname("Kainomad");


        assertEquals(result.getStudentname(), student.getStudentname());

        System.out.println("mon id : "+result.getId());

    }

    void addStudentToConversation (Student student, Meeting meeting){
        // lie une personne à une conversation
    }
}