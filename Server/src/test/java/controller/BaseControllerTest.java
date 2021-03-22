package controller;

import com.example.controller.BaseController;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class BaseControllerTest {

    BaseController baseController = new BaseController();

    @Test
    void shouldReturnHelloOrValue() {
        assertEquals(baseController.testBaseMethod("Hakim"), "Hakim");
    }

    @Test
    void shouldBeBaseControllerClass() {
        assertEquals(baseController.controllerName(), "BaseController");
    }
}
