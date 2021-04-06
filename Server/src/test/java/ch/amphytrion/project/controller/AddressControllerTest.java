package ch.amphytrion.project.controller;

import ch.amphytrion.project.repositories.AddressRepository;
import ch.amphytrion.project.services.AddressService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class AddressControllerTest {

    AddressRepository addressRepository;
    AddressService addressService = new AddressService(addressRepository);
    AddressController addressController = new AddressController(addressService);

    @Test
    void name() {
        assertEquals(AddressController.class.getCanonicalName(),
                addressController.controllerName());
    }
}
