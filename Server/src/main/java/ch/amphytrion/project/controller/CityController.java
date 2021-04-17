package ch.amphytrion.project.controller;

import ch.amphytrion.project.entities.databaseentities.City;
import ch.amphytrion.project.services.CityService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CityController extends BaseController implements IGenericController<City> {

    private final CityService cityService;

    @Autowired
    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @Override
    @GetMapping("/cities")
    public ResponseEntity<List<City>> getAll() {
        try {
            return ResponseEntity.ok(cityService.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    @PostMapping("/city")
    public ResponseEntity<City> save(City entity) {
        try {
            return ResponseEntity.ok(cityService.save(entity));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    @GetMapping("/city/{id}")
    public ResponseEntity getById(String id) {
        try {
            return ResponseEntity.ok(cityService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @ApiOperation(value = "Retrieve cityController")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully reached cityController"),
            @ApiResponse(code = 401, message = "You are not authorized to view this resource"),
            @ApiResponse(code = 403, message = "Access to this resource is forbidden")
    })
    @GetMapping("/cityController")
    private String testController() {
        return this.getClass().getSimpleName();
    }

}
