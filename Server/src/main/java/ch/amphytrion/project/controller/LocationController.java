package ch.amphytrion.project.controller;

import ch.amphytrion.project.dto.DatesFilterDTO;
import ch.amphytrion.project.dto.LocationResponse;
import ch.amphytrion.project.entities.databaseentities.Location;
import ch.amphytrion.project.services.LocationService;
import ch.amphytrion.project.services.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class LocationController extends BaseController implements IGenericController<Location> {

    private final LocationService locationService;
    private final UserService userService;

    public LocationController(LocationService locationService, UserService userService) {
        this.locationService = locationService;
        this.userService = userService;
    }

    //X
    @SneakyThrows
    @GetMapping("/locations")
    public ResponseEntity<List<Location>> getAll() {
        try {
            return ResponseEntity.ok(locationService.findAll());
        } catch (Exception e) {
            throw new CustomException("Are you lost?", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

    //X
    @SneakyThrows
    @PostMapping("/locations/withDate")
    public ResponseEntity<List<Location>> getAllWithDate(@RequestBody DatesFilterDTO filters) {
        //TODO logique & model dto with startDate & endDate
        try {
            return ResponseEntity.ok(locationService.findAll());
        } catch (Exception e) {
            return ResponseEntity.ok(new ArrayList<Location>());
        }
    }

    //X
    @SneakyThrows
    @PostMapping("/location")
    public ResponseEntity create(@RequestBody Location entity) {
        try {
            if(entity.getId() == null){
                return ResponseEntity.ok(locationService.save(entity));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }
        throw new CustomException("Romae non in die", HttpStatus.NOT_ACCEPTABLE, null);
    }

    //X
    @SneakyThrows
    @PatchMapping("/location")
    public ResponseEntity update(@RequestBody Location entity) {
        try {
            if(entity.getId() != null && locationService.findById(entity.getId()) != null){
                return ResponseEntity.ok(locationService.save(entity));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }
        throw new CustomException("Lieu non modifié/créé", HttpStatus.NOT_ACCEPTABLE, null);
    }

    //X
    @SneakyThrows
    @GetMapping("/location/{id}")
    public ResponseEntity<LocationResponse> getById(String id) {
        try {
            return ResponseEntity.ok(new LocationResponse(locationService.findById(id), userService));
        } catch (Exception e) {
            throw new CustomException("Ce lieu n'existe pas", HttpStatus.NOT_ACCEPTABLE, null);

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
