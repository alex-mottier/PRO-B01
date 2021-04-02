package ch.amphytrion.project.controller;

import ch.amphytrion.project.repositories.StudentRepository;
import ch.amphytrion.project.services.StudentService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class StudentControllerTest {

    StudentRepository studentRepository;
    StudentService studentService = new StudentService(studentRepository);
    StudentController studentController = new StudentController(studentService);

    @Test
    void name() {
        assertEquals(StudentController.class.getCanonicalName(),
                studentController.controllerName());
    }
}
