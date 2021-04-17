package ch.amphytrion.project.repositories;
import ch.amphytrion.project.controller.StudentController;
import ch.amphytrion.project.services.StudentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
public class StudentRepositoryTest {

    StudentRepository studentRepository;
    @Autowired
    private StudentService studentService;
    StudentController studentController = new StudentController(studentService);

    @Test
    void studentGetIdTest() {
 /*try{
        Student student = new Student("student");
        studentService.save(student);
        Student result = studentService.findByUsername("student");
        assertEquals(result.getUsername(), student.getUsername());
        studentService.deleteById(student.getId());
} catch (Exception e) {
            e.printStackTrace();
        }*/
    }
}
