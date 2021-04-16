package ch.amphytrion.project.controller;

import ch.amphytrion.project.dto.ConnectedUser;
import ch.amphytrion.project.entities.User;
import ch.amphytrion.project.repositories.UserRepository;
import ch.amphytrion.project.services.UserService;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;


import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;
import java.util.function.Consumer;

@RestController
public class UserController extends BaseController implements IGenericController<User> {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signUpStudent")
    public ResponseEntity signUpStudent(@RequestBody String userName  ,@RequestBody String tokenID) {
        String ClIENT_ID = "298748587556-mpio0261lovc0qkt660nbhgariolp1no.apps.googleusercontent.com";
        JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), JSON_FACTORY)
                // Specify the CLIENT_ID of the app that accesses the backend:
                .setAudience(Collections.singletonList(ClIENT_ID))
                // Or, if multiple clients access the backend:
                //.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
                .build();
        try {
            GoogleIdToken idToken = verifier.verify(tokenID);
            if (idToken != null) {
                Payload payload = idToken.getPayload();
                userService.save(new User("Alexis", userName));

                HttpHeaders responseHeaders = new HttpHeaders();
                responseHeaders.set("SESSION_TOKEN_AMPHITRYON",
                        "VALID_SESSION_TOKEN_AMPHITRYON");

                return ResponseEntity.ok().headers(responseHeaders).build();
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (IOException | GeneralSecurityException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/connect")
    public ResponseEntity<ConnectedUser> connect(@RequestBody String tokenID) {
        String ClIENT_ID = "298748587556-mpio0261lovc0qkt660nbhgariolp1no.apps.googleusercontent.com";
        JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), JSON_FACTORY)
                // Specify the CLIENT_ID of the app that accesses the backend:
                .setAudience(Collections.singletonList(ClIENT_ID))
                // Or, if multiple clients access the backend:
                //.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
                .build();
        try {
            GoogleIdToken idToken = verifier.verify(tokenID);
            if (idToken != null) {
                Payload payload = idToken.getPayload();
                String username = "AllemannAlexis"; //userService.findById(payload.get("at_hash"));
                HttpHeaders responseHeaders = new HttpHeaders();
                responseHeaders.set("SESSION_TOKEN_AMPHITRYON",
                        "VALID_SESSION_TOKEN_AMPHITRYON");

                return ResponseEntity.ok().headers(responseHeaders).body(new ConnectedUser(username));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (IOException | GeneralSecurityException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
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

    @PostMapping("/users")
    public ResponseEntity<User> save(@RequestBody User entity){
        try {
            return ResponseEntity.ok(userService.save(entity));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/users/{id}")
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
