package ch.amphytrion.project.controller;

import ch.amphytrion.project.entities.databaseentities.StudentProfil;
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

@RestController
public class StudentController extends BaseController implements IGenericController<StudentProfil>{

    private final UserService studentService;

    @Autowired
    public StudentController(UserService studentService) {
        this.studentService = studentService;
    }

    @SneakyThrows
    @GetMapping("/students")
    public ResponseEntity<List<StudentProfil>> getAll() {
        try {
            return ResponseEntity.ok(studentService.findAll());
        } catch (Exception e) {
            throw new CustomException("Aucun étudiant trouvé", HttpStatus.NOT_ACCEPTABLE, null);

        }
    }
    @SneakyThrows
    @PostMapping("/students")
    public ResponseEntity<StudentProfil> save(@RequestBody StudentProfil studentProfil) {
        try {
            return ResponseEntity.ok(studentService.save(studentProfil));
        } catch (Exception e) {
            throw new CustomException("Étudiant non modifié/créé", HttpStatus.NOT_ACCEPTABLE, null);

        }    }
    @SneakyThrows
    @GetMapping("/students/{id}")
    public ResponseEntity<StudentProfil> getById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(studentService.findById(id));
        } catch (Exception e) {
            throw new CustomException("Aucun étudiant trouvé", HttpStatus.NOT_ACCEPTABLE, null);

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
