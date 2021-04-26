package ch.amphytrion.project.controller;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class StudentProfilControllerTest {

    StudentRepository studentRepository;
    StudentService studentService = new StudentService(studentRepository);
    StudentController studentController = new StudentController(studentService);

    @Test
    void name() {
        assertEquals(StudentController.class.getCanonicalName(),
                studentController.controllerName());
    }
}
