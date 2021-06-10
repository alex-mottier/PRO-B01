package ch.amphytrion.project.controller.userControllerTests;

import ch.amphytrion.project.controller.CustomException;
import ch.amphytrion.project.controller.UserController;
import ch.amphytrion.project.dto.UserResponse;
import ch.amphytrion.project.entities.databaseentities.HostProfil;
import ch.amphytrion.project.entities.databaseentities.User;
import ch.amphytrion.project.repositories.UserRepository;
import ch.amphytrion.project.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureDataMongo
class UserControllerWithHostTest {

   private static final String GOOGLE_ID = "google-mock-up-id";
   private static final String HOST_NAME = "HostName";

   @Autowired
   private UserRepository userRepository;
   @Autowired
   private UserService userService;
   @Autowired
   private UserController userController;
   private User user;

    @BeforeEach
    public void setUpHost() {
        // add principal object to SecurityContextHolder
        userRepository.deleteAll();
        user = new User(GOOGLE_ID, HOST_NAME);
        user.setHostProfil(new HostProfil());
        userService.save(user);
        Authentication auth = new UsernamePasswordAuthenticationToken(user,null);

        SecurityContextHolder.getContext().setAuthentication(auth);

    }

    @Test
    void currentUserIsHost() {
        assertDoesNotThrow(() -> userController.checkUserIsHost());
        assertThrows(CustomException.class, () -> userController.checkUserIsStudent());
    }

    @Test
    void userShouldBeInDatabase() {
        assertEquals(user, userService.findByUsername(HOST_NAME));
    }

    @Test
    void loginShouldReturnHost() {
        UserResponse userResponse = userController.login(null).getBody();
        assertEquals(new UserResponse(user), userResponse);
        assertDoesNotThrow(() -> userController.login(null));
    }
}
