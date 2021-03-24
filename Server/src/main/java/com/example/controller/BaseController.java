package com.example.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;



@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/v1")
@Api(tags = {"Tactic API"})
public class BaseController {

    public BaseController() {
    }



    public String controllerName() {
        return this.getClass().getSimpleName();
    }
}
