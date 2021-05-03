package ch.amphytrion.project.controller;

import ch.amphytrion.project.dto.UserResponse;
import ch.amphytrion.project.entities.databaseentities.StudentProfil;
import ch.amphytrion.project.entities.databaseentities.User;
import ch.amphytrion.project.services.StudentService;
import ch.amphytrion.project.services.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class StudentController extends BaseController implements IGenericController<StudentProfil>{

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @SneakyThrows
    @GetMapping("/students")
    public ResponseEntity<List<UserResponse>> getAll() {
        try {
            List<User> students = studentService.findAll();
            return ResponseEntity.ok(
                    students.stream()
                            .map(student -> new UserResponse(student))
                            .collect(Collectors.toList())
            );
        } catch (Exception e) {
            throw new CustomException("Aucun étudiant trouvé", HttpStatus.NOT_ACCEPTABLE, null);

        }
    }
//    @SneakyThrows
//    @PostMapping("/students")
//    public ResponseEntity<UserResponse> save(@RequestBody UserResponse user) {
//        try {
//            return ResponseEntity.ok(new UserResponse(studentService.save(user)));
//        } catch (Exception e) {
//            throw new CustomException("Étudiant non modifié/créé", HttpStatus.NOT_ACCEPTABLE, null);
//        }
//    }

    @SneakyThrows
    @GetMapping("/students/{id}")
    public ResponseEntity<UserResponse> getById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(new UserResponse(studentService.findById(id)));
        } catch (Exception e) {
            throw new CustomException("Aucun étudiant avec cet id trouvé", HttpStatus.NOT_ACCEPTABLE, null);

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
