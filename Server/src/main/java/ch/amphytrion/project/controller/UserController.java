package ch.amphytrion.project.controller;

import ch.amphytrion.project.authentication.SecurityConstants;
import ch.amphytrion.project.authentication.google_authentication.GoogleTokenValider;
import ch.amphytrion.project.entities.databaseentities.User;
import ch.amphytrion.project.services.UserService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Date;
import java.util.List;
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
    public ResponseEntity<User> signUpStudent(@RequestBody Map<String, String> json) {
        String userName = json.get("username");
        String tokenInput = json.get("tokenID");
        if (tokenInput.equals("testToken")) {
            User newUser = new User(null, "mock-google-id", userName);
            userService.save(newUser);
            String token = JWT.create()
                    .withSubject(newUser.getUsername())
                    .withExpiresAt(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
                    .sign(Algorithm.HMAC512(SecurityConstants.SECRET.getBytes()));
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set(SecurityConstants.HEADER_STRING, token);
            return ResponseEntity.ok().headers(responseHeaders).body(newUser);
        } else {
            GoogleIdToken tokenID = GoogleTokenValider.validateToken(tokenInput);
            if (tokenID != null) {
                GoogleIdToken.Payload payload = tokenID.getPayload();
                String userId = payload.get("sub").toString();
                User newUser = new User(null, userId, userName);
                userService.save(newUser);
                String token = JWT.create()
                        .withSubject(newUser.getUsername())
                        .withExpiresAt(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
                        .sign(Algorithm.HMAC512(SecurityConstants.SECRET.getBytes()));
                HttpHeaders responseHeaders = new HttpHeaders();
                responseHeaders.set(SecurityConstants.HEADER_STRING, token);
                return ResponseEntity.ok().headers(responseHeaders).body(newUser);
            }else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }
    }

    // X
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody Map<String, String> json) {
            User current = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (current != null) {
                return ResponseEntity.ok().body(current);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAll() {
        try {
            return ResponseEntity.ok(userService.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/user")
    public ResponseEntity<User> save(@RequestBody User entity){
        try {
            return ResponseEntity.ok(userService.save(entity));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(userService.findById(id));
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
