package ch.amphytrion.project.controller;

import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Defines API
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = BaseController.ROOT_PATH)
@Api(tags = {"Amphytrion API"})
public class BaseController {
    public static final String ROOT_PATH = "/";
    /**
     * Constructor
     */
    public BaseController() {}

    /**
     * Get API name
     */
    public String controllerName() {
        return this.getClass().getCanonicalName();
    }



}
