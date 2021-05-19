package ch.amphytrion.project.controller;

import ch.amphytrion.project.dto.UserResponse;
import ch.amphytrion.project.entities.databaseentities.StudentProfil;
import ch.amphytrion.project.entities.databaseentities.User;
import ch.amphytrion.project.repositories.UserRepository;
import ch.amphytrion.project.services.UserService;
import org.junit.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
@DataMongoTest
class UserControllerWithStudentTest {

   private static final String GOOGLE_ID = "google-mock-up-id";
   private static final String STUDENT_NAME = "StudentName";

   @Autowired
   private UserRepository userRepository;
   private UserController userController;
   private User user;

    @BeforeEach
    public void setUpStudent() {
        // add principal object to SecurityContextHolder
        user = new User(GOOGLE_ID, STUDENT_NAME);
        user.setStudentProfil(new StudentProfil());
        userRepository.save(user);
        Authentication auth = new UsernamePasswordAuthenticationToken(user,null);

        SecurityContextHolder.getContext().setAuthentication(auth);
        userController = new UserController(new UserService(userRepository));

    }

    @Test
    void currentUserIsStudent() {

        assertDoesNotThrow(() -> userController.checkUserIsStudent());
        assertThrows(CustomException.class, () -> userController.checkUserIsHost());
    }

    @Test
    void userShouldBeInDatabase() {
        assertEquals(user, userRepository.findByUsername(STUDENT_NAME));
    }

    @Test
    void loginShouldReturnStudent() {
        UserResponse userResponse = userController.login(null).getBody();
        assertEquals(new UserResponse(user), userResponse);
        assertDoesNotThrow(() -> userController.login(null));
    }
}
