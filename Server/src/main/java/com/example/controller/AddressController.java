package com.example.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AddressController extends BaseController {
    @ApiOperation(value = "Retrieve AddressController")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully reached AddressController"),
            @ApiResponse(code = 401, message = "You are not authorized to view this resource"),
            @ApiResponse(code = 403, message = "Access to this resource is forbidden")
    })
    @GetMapping("/testController")
    private String testController(@RequestParam(value = "name", defaultValue = "hello") String name) {
        return name;
    }
}
