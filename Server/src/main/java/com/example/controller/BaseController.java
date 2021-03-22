package com.example.controller;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BaseController {

    public BaseController() {
    }

    @GetMapping("/testController")
    //on relie la variable name à notre String name
    public String testBaseMethod(@RequestParam(value = "name", defaultValue = "hello") String name) {
        return name;
    }
}
