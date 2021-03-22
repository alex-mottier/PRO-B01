package com.example.controller;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class BaseControllerTest {
    @Test
    void shouldReturnHelloOrValue() {
        BaseController baseController = new BaseController();
        assertEquals(baseController.testBaseMethod("Hakim"), "Hakim");
    }
}
