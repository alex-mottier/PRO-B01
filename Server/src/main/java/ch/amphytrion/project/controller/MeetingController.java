package ch.amphytrion.project.controller;

import ch.amphytrion.project.dto.DatesFilterDTO;
import ch.amphytrion.project.entities.databaseentities.Chat;
import ch.amphytrion.project.entities.databaseentities.Meeting;
import ch.amphytrion.project.entities.databaseentities.Student;
import ch.amphytrion.project.entities.databaseentities.User;
import ch.amphytrion.project.dto.FilterRequest;
import ch.amphytrion.project.repositories.ChatRepository;
import ch.amphytrion.project.services.ChatService;
import ch.amphytrion.project.services.MeetingService;
import ch.amphytrion.project.services.StudentService;
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

    private MeetingService meetingService;
    private StudentService studentService;
    private ChatService chatService;

    @Autowired
    public MeetingController(MeetingService meetingService, StudentService studentService, ChatService chatService) {
        this.meetingService = meetingService;
        this.studentService = studentService;
        this.chatService = chatService;
    }

    //X
    @GetMapping("/getCreatedMeetings")
    public ResponseEntity<List<Meeting>> getMeetingsCreatedByUser() {
        try {
            User owner = null; // TODO Use current user
            if (owner instanceof Student)
                return ResponseEntity.ok(meetingService.findByOwnerID(owner.getId()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    //X
    @PostMapping("/leaveMeeting/{meetingID}")
    public ResponseEntity<Meeting> leaveMeeting(@PathVariable String meetingID){
        try {
            Student student = null; // TODO Use current user
            Meeting meeting = meetingService.findById(meetingID);
            if (student instanceof Student) {
                 student.getMeetingsParticipations().removeIf(m -> m.getId() == meeting.getId());
                 studentService.save(student);
                return ResponseEntity.ok(meeting);
                }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    //X
    @GetMapping("/getMyMeetings")
    public ResponseEntity<List<Meeting>> getMeetingsWhereUserParticipate(DatesFilterDTO datesFilter) {
        try {
            Student student = null; // TODO Use current user
            if (student instanceof Student) {
                return ResponseEntity.ok(student.getMeetingsParticipations());
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    //X
    @PostMapping("/meeting/join/{meetingID}")
    public ResponseEntity<Meeting> joinMeeting(@PathVariable String meetingID) {
        try {
            Student student = null; // TODO Use current user
            Meeting meeting = meetingService.findById(meetingID);
            if (student instanceof Student) {
                student.getMeetingsParticipations().add(meeting);
                studentService.save(student);
                return ResponseEntity.ok(meeting);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    //X
    @PostMapping("/meetings/filter")
    public ResponseEntity<List<Meeting>> searchWithFilter(@RequestBody FilterRequest filter){
        try {
            return ResponseEntity.ok(meetingService.searchFilter(filter));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //X
    @PostMapping("/meeting")
    public ResponseEntity<Meeting> create(@RequestBody Meeting entity) {
        try {
            if(entity.getId() == null){
                Chat chat = new Chat();
                chatService.save(chat);
                entity.setChatID(chat.getId());
                return ResponseEntity.ok(meetingService.save(entity));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    //X
    @PatchMapping("/meeting")
    public ResponseEntity<Meeting> update(@RequestBody Meeting entity) {
        try {
            if(entity.getId() != null && meetingService.findById(entity.getId()) != null){
                return ResponseEntity.ok(meetingService.save(entity));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    //X
    @DeleteMapping("/meeting/{meetingID}")
    public ResponseEntity delete(@PathVariable String meetingID) {
        try {
            Meeting meeting = meetingService.findById(meetingID);
            if(meeting != null){
                meetingService.delete(meeting);
                return ResponseEntity.ok().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    //X
    @Override
    @GetMapping("/meeting/{meetingID}")
    public ResponseEntity<Meeting> getById(@PathVariable String meetingID) {
        try {
            return ResponseEntity.ok(meetingService.findById(meetingID));
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
