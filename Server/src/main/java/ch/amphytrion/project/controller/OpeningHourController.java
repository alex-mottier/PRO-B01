package ch.amphytrion.project.controller;

import ch.amphytrion.project.entities.OpeningHour;
import ch.amphytrion.project.services.OpeningHourService;
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
public class OpeningHourController extends BaseController implements IGenericController<OpeningHour> {

    private final OpeningHourService openingHourService;

    public OpeningHourController(OpeningHourService openingHourService) {
        this.openingHourService = openingHourService;
    }

    @Override
    //@GetMapping("/openingHour")
    public ResponseEntity<List<OpeningHour>> getAll() {
        try {
            return ResponseEntity.ok(openingHourService.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    //@PostMapping("/openingHour")
    public ResponseEntity save(OpeningHour entity) {
        try {
            return ResponseEntity.ok(openingHourService.save(entity));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    //@GetMapping("/openingHour")
    public ResponseEntity getById(String id) {
        try {
            return ResponseEntity.ok(openingHourService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @ApiOperation(value = "Retrieve openingHourController")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully reached openingHourController"),
            @ApiResponse(code = 401, message = "You are not authorized to view this resource"),
            @ApiResponse(code = 403, message = "Access to this resource is forbidden")
    })
    @GetMapping("/openingHourController")
    private String testController() {
        return this.getClass().getSimpleName();
    }
}
