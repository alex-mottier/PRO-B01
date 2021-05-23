package ch.amphytrion.project.controller;

import ch.amphytrion.project.repositories.UserRepository;
import ch.amphytrion.project.services.UserService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 *
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
class UserResponseControllerTest {

    UserRepository userRepository;
    UserService userService = new UserService(userRepository);
    UserController userController = new UserController(userService);

    @Test
    void name() {
        assertEquals(UserController.class.getCanonicalName(),
                userController.controllerName());
    }
}
