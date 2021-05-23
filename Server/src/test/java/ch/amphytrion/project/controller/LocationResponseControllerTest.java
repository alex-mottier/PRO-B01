package ch.amphytrion.project.controller;

import ch.amphytrion.project.repositories.LocationRepository;
import ch.amphytrion.project.services.LocationService;

/**
 *
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
class LocationResponseControllerTest {

    LocationRepository locationRepository;
    LocationService locationService = new LocationService(locationRepository);
    //LocationController locationController = new LocationController(locationService);
/*
    @Test
    void name() {
        assertEquals(LocationController.class.getCanonicalName(),
                locationController.controllerName());
    }*/
}
