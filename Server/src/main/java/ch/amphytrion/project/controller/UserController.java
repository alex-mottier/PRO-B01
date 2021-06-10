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

/**
 * RESTful user controller. Used to map HTML requests to the corresponding methods
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@RestController
public class UserController extends BaseController implements IGenericController<User> {

    private final UserService userService;

    /**
     * Constructor of the user controller
     * @param userService corresponding user service to the user controller
     */
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Method used to signed up as a host
     * @param signUpHostRequest host to sign up to
     * @throws CustomException
     * @return ResponseEntity<UserResponse> The user
     */
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

    /**
     * Method used to signed up as a host
     * @param studentRequest student to sign up to
     * @throws CustomException
     * @return ResponseEntity<UserResponse> The user
     */
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

    /**
     * Method used to login in the application
     * @param json a map of two strings
     * @throws CustomException
     * @return ResponseEntity<UserResponse> The user
     */
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


}
