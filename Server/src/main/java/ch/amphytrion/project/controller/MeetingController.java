package ch.amphytrion.project.controller;

import ch.amphytrion.project.entities.databaseentities.Meeting;
import ch.amphytrion.project.services.MeetingService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MeetingController extends BaseController implements IGenericController<Meeting> {

    private final MeetingService meetingService;

    @Autowired
    public MeetingController(MeetingService meetingService) {
        this.meetingService = meetingService;
    }


    @GetMapping("/meetings")
    public ResponseEntity<List<Meeting>> getAll() {
        try {
            return ResponseEntity.ok(meetingService.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //X
    @PostMapping("/meeting")
    public ResponseEntity<Meeting> create(Meeting entity) {
        // TODO logique
        try {
            return ResponseEntity.ok(meetingService.save(entity));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //X
    @PatchMapping("/meeting")
    public ResponseEntity<Meeting> update(Meeting entity) {
        // TODO logique
        try {
            return ResponseEntity.ok(meetingService.save(entity));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //X
    @DeleteMapping("/meeting/{id}")
    public ResponseEntity<Meeting> delete(String id) {
        // TODO logique
        try {
            return ResponseEntity.ok(meetingService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    @GetMapping("/meeting/{id}")
    public ResponseEntity<Meeting> getById(String id) {
        try {
            return ResponseEntity.ok(meetingService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @ApiOperation(value = "Retrieve meetingController")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully reached meetingController"),
            @ApiResponse(code = 401, message = "You are not authorized to view this resource"),
            @ApiResponse(code = 403, message = "Access to this resource is forbidden")
    })
    @GetMapping("/meetingController")
    private String testController() {
        return this.getClass().getSimpleName();
    }
}
