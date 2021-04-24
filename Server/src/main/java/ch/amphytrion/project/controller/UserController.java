package ch.amphytrion.project.controller;

import ch.amphytrion.project.authentication.SecurityConstants;
import ch.amphytrion.project.authentication.utils.JwtUtils;
import ch.amphytrion.project.dto.UserResponse;
import ch.amphytrion.project.entities.databaseentities.User;
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

    // X
    @PostMapping("/signUpStudent")
    public ResponseEntity<UserResponse> signUpStudent(@RequestBody Map<String, String> json) {
        UserResponse newUser = userService.checkAndSignUp(json);
        if(newUser != null) {
            String token = JwtUtils.makeHeaderToken(newUser.username);
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + token);
            return ResponseEntity.ok().headers(responseHeaders).body(newUser);
        }
        else {
            //user already exists
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
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
                throw new CustomException("Login failed", HttpStatus.UNAUTHORIZED, null);
            }
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<UserResponse> getById(@PathVariable String username) {
        try {
            return ResponseEntity.ok(new UserResponse(userService.findByUsername(username)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @ApiOperation(value = "Retrieve userController")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully reached userController"),
            @ApiResponse(code = 401, message = "You are not authorized to view this resource"),
            @ApiResponse(code = 403, message = "Access to this resource is forbidden")
    })
    @GetMapping("/userController")
    private String testController() {
        return this.getClass().getSimpleName();
    }
}
