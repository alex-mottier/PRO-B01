package ch.amphytrion.project.controller;

import ch.amphytrion.project.entities.databaseentities.Location;
import ch.amphytrion.project.services.LocationService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LocationController extends BaseController implements IGenericController<Location> {

    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping("/locations")
    public ResponseEntity<List<Location>> getAll() {
        try {
            return ResponseEntity.ok(locationService.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/locations")
    public ResponseEntity save(Location entity) {
        try {
            return ResponseEntity.ok(locationService.save(entity));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    @GetMapping("/location/{id}")
    public ResponseEntity<Location> getById(String id) {
        try {
            return ResponseEntity.ok(locationService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @ApiOperation(value = "Retrieve locationController")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully reached locationController"),
            @ApiResponse(code = 401, message = "You are not authorized to view this resource"),
            @ApiResponse(code = 403, message = "Access to this resource is forbidden")
    })
    @GetMapping("/locationController")
    private String testController() {
        return this.getClass().getSimpleName();
    }

}
