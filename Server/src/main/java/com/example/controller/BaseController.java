package com.example.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api")
public class BaseController {

    public BaseController() {
    }

    @GetMapping("/testController")
    public String testBaseMethod(@RequestParam(value = "name", defaultValue = "hello") String name) {
        return name;
    }

    public String controllerName() {
        return this.getClass().getSimpleName();
    }
}
