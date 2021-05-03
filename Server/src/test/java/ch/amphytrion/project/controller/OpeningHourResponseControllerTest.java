package ch.amphytrion.project.controller;

import ch.amphytrion.project.repositories.OpeningHourRepository;
import ch.amphytrion.project.services.OpeningHourService;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

class OpeningHourResponseControllerTest {

    OpeningHourRepository openingHourRepository;
    OpeningHourService openingHourService = new OpeningHourService(openingHourRepository);
    OpeningHourController openingHourController = new OpeningHourController(openingHourService);

    @Test
    void name() {
        assertEquals(OpeningHourController.class.getCanonicalName(),
                openingHourController.controllerName());
    }
}
