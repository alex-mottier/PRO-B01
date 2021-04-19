package ch.amphytrion.project.controller;

import ch.amphytrion.project.entities.databaseentities.Chat;
import ch.amphytrion.project.entities.databaseentities.Meeting;
import ch.amphytrion.project.entities.notdatabaseentities.FilterRequest;
import ch.amphytrion.project.services.MeetingService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MeetingController extends BaseController implements IGenericController<Meeting> {

    private MeetingService meetingService;

    @Autowired
    public MeetingController(MeetingService meetingService) {
        this.meetingService = meetingService;

    }

    @Override
    @GetMapping("/meetings")
    public ResponseEntity<List<Meeting>> getAll() {
        try {
            return ResponseEntity.ok(meetingService.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/meeting/{id}/join")
    public ResponseEntity<Meeting> joinMeeting(String id) {
        try {
            Meeting meeting = meetingService.findById(id);
            meetingService.save(meeting);
            return ResponseEntity.ok(meeting);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/meetings/search")
    public ResponseEntity<List<Meeting>> searchFilter(@RequestBody FilterRequest filter){
        try {
            return ResponseEntity.ok(meetingService.searchFilter(filter));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    @PostMapping("/meeting")
    public ResponseEntity<Meeting> save(Meeting entity) {
        try {
            return ResponseEntity.ok(meetingService.save(entity));
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

    public ResponseEntity<List<Meeting>>findByNameLike(String name){
        try {
            return ResponseEntity.ok(meetingService.findByName(name));
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
