package ch.amphytrion.project.controller;

import ch.amphytrion.project.repositories.CityRepository;
import ch.amphytrion.project.services.CityService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CityControllerTest {

    CityRepository cityRepository;
    CityService cityService = new CityService(cityRepository);
    CityController cityController = new CityController(cityService);

    @Test
    void name() {
        assertEquals(CityController.class.getCanonicalName(),
                cityController.controllerName());
    }
}
