package com.example.controller;

import com.example.neo4jEntities.User;
import com.example.services.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController extends BaseController {

    private final UserService userService;

    UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    List<User> getAllUsers() {
        return userService.findAll();
    }

    @PostMapping("/users")
    User newUser(@RequestBody User newUser){
        return userService.save(newUser);
    }

    @GetMapping("/users/{id}")
    User getUserById(@PathVariable Long id) {
        try {
            return userService.findById(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
