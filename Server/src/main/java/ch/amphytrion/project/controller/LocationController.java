package ch.amphytrion.project.controller;

import ch.amphytrion.project.dto.DatesFilterDTO;
import ch.amphytrion.project.entities.databaseentities.Location;
import ch.amphytrion.project.services.LocationService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class LocationController extends BaseController implements IGenericController<Location> {

    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    //X
    @SneakyThrows
    @GetMapping("/locations")
    public ResponseEntity<List<Location>> getAll() {
        try {
            return ResponseEntity.ok(locationService.findAll());
        } catch (Exception e) {
            throw new CustomException("Are you lost?", HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    //X
    @SneakyThrows
    @GetMapping("/locations/withDate")
    public ResponseEntity<List<Location>> getAllWithDate(@RequestBody DatesFilterDTO filters) {
        //TODO logique & model dto with startDate & endDate
        try {
            return ResponseEntity.ok(locationService.findAll());
        } catch (Exception e) {
            throw new CustomException("The question is not where but when", HttpStatus.INTERNAL_SERVER_ERROR, null);
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        throw new CustomException("Romae non in die", HttpStatus.INTERNAL_SERVER_ERROR, null);
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        throw new CustomException("Yo dawg I heard you like updates so I made an update that needs an update so you can update while you update", HttpStatus.INTERNAL_SERVER_ERROR, null);
    }

    //X
    @SneakyThrows
    @GetMapping("/location/{id}")
    public ResponseEntity<Location> getById(String id) {
        try {
            return ResponseEntity.ok(locationService.findById(id));
        } catch (Exception e) {
            throw new CustomException("We don't have magical places", HttpStatus.INTERNAL_SERVER_ERROR, null);

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
