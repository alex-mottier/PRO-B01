package ch.amphytrion.project.controller;

import ch.amphytrion.project.entities.databaseentities.Student;
import ch.amphytrion.project.services.StudentService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StudentController extends BaseController implements IGenericController<Student>{

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @SneakyThrows
    @GetMapping("/students")
    public ResponseEntity<List<Student>> getAll() {
        try {
            return ResponseEntity.ok(studentService.findAll());
        } catch (Exception e) {
            throw new CustomException("No student found", HttpStatus.NOT_ACCEPTABLE, null);

        }
    }
    @SneakyThrows
    @PostMapping("/students")
    public ResponseEntity<Student> save(@RequestBody Student student) {
        try {
            return ResponseEntity.ok(studentService.save(student));
        } catch (Exception e) {
            throw new CustomException("Student not saved", HttpStatus.NOT_ACCEPTABLE, null);

        }    }
    @SneakyThrows
    @GetMapping("/students/{id}")
    public ResponseEntity<Student> getById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(studentService.findById(id));
        } catch (Exception e) {
            throw new CustomException("No student found", HttpStatus.NOT_ACCEPTABLE, null);

        }
    }

    @ApiOperation(value = "Retrieve studentController")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully reached studentController"),
            @ApiResponse(code = 401, message = "You are not authorized to view this resource"),
            @ApiResponse(code = 403, message = "Access to this resource is forbidden")
    })
    @GetMapping("/studentController")
    private String testController() {
        return this.getClass().getSimpleName();
    }

}
