package ch.amphytrion.project.controller;

import ch.amphytrion.project.repositories.OpeningHourRepository;
import ch.amphytrion.project.services.OpeningHourService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class OpeningHourControllerTest {

    OpeningHourRepository openingHourRepository;
    OpeningHourService openingHourService = new OpeningHourService(openingHourRepository);
    OpeningHourController openingHourController = new OpeningHourController(openingHourService);

    @Test
    void name() {
        assertEquals(OpeningHourController.class.getCanonicalName(),
                openingHourController.controllerName());
    }
}
