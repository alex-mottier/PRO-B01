package ch.amphytrion.project.controller;

import ch.amphytrion.project.dto.ConnectedUser;
import ch.amphytrion.project.repositories.UserRepository;
import ch.amphytrion.project.entities.databaseentities.User;
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
import java.util.Map;
import java.util.function.Consumer;

@RestController
public class UserController extends BaseController implements IGenericController<User> {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // X
    @PostMapping("/signUpStudent")
    public ResponseEntity signUpStudent(@RequestBody Map<String, String> json) {
        String userName = json.get("userName");
        String tokenID = json.get("tokenID");
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
                userService.save(new User(null, payload.get("sub").toString(), userName));

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

    // X
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody Map<String, String> json) {
            String tokenID = json.get("tokenID");
            User current = null; // TODO use token
            if (current != null) {
                HttpHeaders responseHeaders = new HttpHeaders();
                responseHeaders.set("SESSION_TOKEN_AMPHITRYON",
                        "VALID_SESSION_TOKEN_AMPHITRYON");
                return ResponseEntity.ok().headers(responseHeaders).body(new User(null, null, null));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<User> getById(@PathVariable String username) {
        try {
            return ResponseEntity.ok(userService.findByUsername(username));
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
