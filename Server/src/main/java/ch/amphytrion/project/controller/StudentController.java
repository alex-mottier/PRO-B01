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

/**
 * RESTful student controller. Used to map HTML requests to the corresponding methods
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@RestController
public class StudentController extends BaseController implements IGenericController<StudentProfil>{

    private final StudentService studentService;

    /**
     * Constructor of the student controller
     * @param studentService corresponding student service to the meeting controller
     */
    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    /**
     * Retrieve all the student in the database
     * @throws CustomException
     * @return ResponseEntity<List<UserResponse>> The list of all students, RESTfully formated
     */
    @SneakyThrows
    public ResponseEntity<List<UserResponse>> getAll() {
        try {
            List<User> students = studentService.findAll();
            return ResponseEntity.ok().body(
                    students.stream()
                            .map(student -> new UserResponse(student))
                            .collect(Collectors.toList())
            );
        } catch (Exception e) {
            throw new CustomException("Aucun étudiant trouvé", HttpStatus.NOT_ACCEPTABLE, null);

        }
    }

}
