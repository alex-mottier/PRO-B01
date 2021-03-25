package ch.amphytrion.project.controller;

import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = BaseController.ROOT_PATH)
@Api(tags = {"Amphytrion API"})
public class BaseController {
    public static final String ROOT_PATH = "/item";

    public BaseController() {}

    public String controllerName() {
        return this.getClass().getCanonicalName();
    }



}
