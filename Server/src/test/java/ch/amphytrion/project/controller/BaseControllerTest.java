package ch.amphytrion.project.controller;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 *
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
class BaseControllerTest {

    BaseController baseController = new BaseController();

    @Test
    void name() {
        assertEquals(BaseController.class.getCanonicalName(),
                baseController.controllerName());
    }
}
