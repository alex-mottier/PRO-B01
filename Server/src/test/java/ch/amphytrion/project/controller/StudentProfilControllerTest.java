package ch.amphytrion.project.controller;

import ch.amphytrion.project.repositories.UserRepository;
import ch.amphytrion.project.services.StudentService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test of StudentProfilControllerTest class
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
class StudentProfilControllerTest {

    UserRepository studentRepository;
    StudentService studentService = new StudentService(studentRepository);
    StudentController studentController = new StudentController(studentService);

    @Test
    void name() {
        assertEquals(StudentController.class.getCanonicalName(),
                studentController.controllerName());
    }
}
