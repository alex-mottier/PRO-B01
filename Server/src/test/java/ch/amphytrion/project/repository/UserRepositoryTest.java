package ch.amphytrion.project.repository;


import ch.amphytrion.project.entities.*;
import ch.amphytrion.project.entities.User;
import ch.amphytrion.project.repositories.*;
import ch.amphytrion.project.services.*;
import ch.amphytrion.project.controller.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
@SpringBootTest
public class UserRepositoryTest {

    UserRepository userRepository;
    @Autowired
    private UserService userService;
    UserController userController = new UserController(userService);


    @Test
    void displayRequest() {
        // créer une personne
        User user = new User("Kainomad");
        //userService.save(user);
        User result = userService.findByUsername("Kainomad");


        assertEquals(result.getUsername(), user.getUsername());

        System.out.println("mon id : "+result.getId());
    }

    void addUserToConversation (User user, Meeting meeting){
        // lie une personne à une conversation
    }
}