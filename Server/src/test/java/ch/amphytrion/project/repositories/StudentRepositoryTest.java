package ch.amphytrion.project.repositories;
import ch.amphytrion.project.entities.Student;
import ch.amphytrion.project.services.*;
import ch.amphytrion.project.controller.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertEquals;


@SpringBootTest
public class StudentRepositoryTest {

    StudentRepository studentRepository;
    @Autowired
    private StudentService studentService;
    StudentController studentController = new StudentController(studentService);

    @Test
    void studentGetIdTest() {

        Student student = new Student("student");
        studentService.save(student);
        Student result = studentService.findByUsername("student");
        assertEquals(result.getUsername(), student.getUsername());
        studentService.deleteById(student.getId());

    }
}