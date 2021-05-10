package ch.amphytrion.project.controller;

import ch.amphytrion.project.authentication.SecurityConstants;
import ch.amphytrion.project.authentication.utils.JwtUtils;
import ch.amphytrion.project.dto.SignUpHostRequest;
import ch.amphytrion.project.dto.StudentRequest;
import ch.amphytrion.project.dto.UserResponse;
import ch.amphytrion.project.entities.databaseentities.*;
import ch.amphytrion.project.services.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class UserController extends BaseController implements IGenericController<User> {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @SneakyThrows
    @PostMapping("/signUpHost")
    public ResponseEntity<UserResponse> signUpHost(@RequestBody SignUpHostRequest signUpHostRequest) {
        User newUser = userService.checkAndSignUpHost(signUpHostRequest);
        if (newUser != null) {
            String token = JwtUtils.makeHeaderToken(newUser.getUsername());
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + token);
            return ResponseEntity.ok().headers(responseHeaders).body(new UserResponse(newUser));
        } else {
            //user already exists
            throw new CustomException("Ce compte host existe déjà", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }


    // X
    @SneakyThrows
    @PostMapping("/signUpStudent")
    public ResponseEntity<UserResponse> signUpStudent(@RequestBody StudentRequest studentRequest) {
        User newUser = userService.checkAndSignUp(studentRequest);
        if (newUser != null) {
            String token = JwtUtils.makeHeaderToken(newUser.getUsername());
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + token);
            return ResponseEntity.ok().headers(responseHeaders).body(new UserResponse(newUser));
        } else {
            //user already exists
            throw new CustomException("Ce compte utilisateur existe déjà", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

    // X
    @SneakyThrows
    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody Map<String, String> json) {
        User current = getCurrentUser();
        if (current != null) {
            return ResponseEntity.ok().body(new UserResponse(current));
        } else {
            throw new CustomException("Erreur de login", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

    @SneakyThrows
    @GetMapping("/user/{username}")
    public ResponseEntity<UserResponse> getById(@PathVariable String username) {
        try {
            return ResponseEntity.ok(new UserResponse(userService.findByUsername(username)));
        } catch (Exception e) {
            throw new CustomException("Utilisateur inexistant", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

    @ApiOperation(value = "Retrieve userController")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully reached userController"),
            @ApiResponse(code = 401, message = "You are not authorized to view this resource"),
            @ApiResponse(code = 403, message = "Access to this resource is forbidden"),
            @ApiResponse(code = 406, message = "The user account already exists in the app")
    })
    @GetMapping("/userController")
    private String testController() {
        return this.getClass().getSimpleName();
    }
}
