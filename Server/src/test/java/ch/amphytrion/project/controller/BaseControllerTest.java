package ch.amphytrion.project.controller;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class BaseControllerTest {

    BaseController baseController = new BaseController();

    @Test
    void name() {
        assertEquals(BaseController.class.getCanonicalName(),
                baseController.controllerName());
    }
}
