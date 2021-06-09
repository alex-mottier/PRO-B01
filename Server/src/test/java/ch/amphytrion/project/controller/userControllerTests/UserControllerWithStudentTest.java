package ch.amphytrion.project.controller.userControllerTests;

import ch.amphytrion.project.controller.CustomException;
import ch.amphytrion.project.controller.UserController;
import ch.amphytrion.project.dto.UserResponse;
import ch.amphytrion.project.entities.databaseentities.StudentProfil;
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
class UserControllerWithStudentTest {

   private static final String GOOGLE_ID = "google-mock-up-id";
   private static final String STUDENT_NAME = "StudentName";

   @Autowired
   private UserRepository userRepository;
   @Autowired
   private UserService userService;
   @Autowired
   private UserController userController;
   private User user;

    @BeforeEach
    public void setUpStudent() {
        // add principal object to SecurityContextHolder
        userRepository.deleteAll();
        user = new User(GOOGLE_ID, STUDENT_NAME);
        user.setStudentProfil(new StudentProfil());
        userService.save(user);
        Authentication auth = new UsernamePasswordAuthenticationToken(user,null);
        SecurityContextHolder.getContext().setAuthentication(auth);

    }

    @Test
    void currentUserIsStudent() {
        assertDoesNotThrow(() -> userController.checkUserIsStudent());
        assertThrows(CustomException.class, () -> userController.checkUserIsHost());
    }

    @Test
    void userShouldBeInDatabase() {
        assertEquals(user, userService.findByUsername(STUDENT_NAME));
    }

    @Test
    void loginShouldReturnStudent() {
        UserResponse userResponse = userController.login(null).getBody();
        assertEquals(new UserResponse(user), userResponse);
        assertDoesNotThrow(() -> userController.login(null));
    }
}
