package ch.amphytrion.project.controller;

import ch.amphytrion.project.repositories.UserRepository;
import ch.amphytrion.project.services.HostService;
import ch.amphytrion.project.services.UserService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class HostProfilControllerTest {

    UserRepository hostRepository;
    HostService hostService = new HostService(hostRepository);
    HostController hostController = new HostController(hostService);

    @Test
    void name() {
        assertEquals(HostController.class.getCanonicalName(),
                hostController.controllerName());
    }
}
