package ch.amphytrion.project.controller;

import ch.amphytrion.project.dto.DatesFilterDTO;
import ch.amphytrion.project.dto.FilterRequest;
import ch.amphytrion.project.dto.MeetingResponse;
import ch.amphytrion.project.entities.databaseentities.Chat;
import ch.amphytrion.project.entities.databaseentities.Meeting;
import ch.amphytrion.project.entities.databaseentities.Student;
import ch.amphytrion.project.entities.databaseentities.User;
import ch.amphytrion.project.services.ChatService;
import ch.amphytrion.project.services.MeetingService;
import ch.amphytrion.project.services.StudentService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class MeetingController extends BaseController implements IGenericController<Meeting> {

    private MeetingService meetingService;
    private StudentService studentService;
    private ChatService chatService;
    private User user;
    private Student student;
    @Autowired
    public MeetingController(MeetingService meetingService, StudentService studentService, ChatService chatService) {
        this.meetingService = meetingService;
        this.studentService = studentService;
        this.chatService = chatService;
    }

    private void initialize() {
             student = (Student) user;
    }

    //X
    @SneakyThrows
    @GetMapping("/getCreatedMeetings")
    public ResponseEntity<List<Meeting>> getMeetingsCreatedByUser() {
        try {
            user = getCurrentUser();

                return ResponseEntity.ok(meetingService.findByOwnerID(user.getId()));
        } catch (Exception e) {
            return ResponseEntity.ok(new ArrayList<Meeting>());
        }

    }

    //X
    @SneakyThrows
    @PostMapping("/leaveMeeting/{meetingID}")
    public ResponseEntity<Meeting> leaveMeeting(@PathVariable String meetingID){
        try {
            user = getCurrentUser();
            Meeting meeting = meetingService.findById(meetingID);
            if (user instanceof Student) {
                Student student = (Student) user;
                 student.getMeetingsParticipations().removeIf(m -> m.getId() == meeting.getId());
                 studentService.save(student);
                return ResponseEntity.ok(meeting);
                }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }
        throw new CustomException("Fuyez pauvres fous", HttpStatus.NOT_ACCEPTABLE, null);
    }

    //X
    @SneakyThrows
    @GetMapping("/getMyMeetings")
    public ResponseEntity<List<Meeting>> getMeetingsWhereUserParticipate(DatesFilterDTO datesFilter) {
        try {
            user = getCurrentUser();
            initialize();
            return ResponseEntity.ok(student.getMeetingsParticipations());
        } catch (Exception e) {
            return ResponseEntity.ok(new ArrayList<Meeting>());
        }
    }

    //X
    @SneakyThrows
    @PostMapping("/meeting/join/{meetingID}")
    public ResponseEntity<MeetingResponse> joinMeeting(@PathVariable String meetingID) {
        try {
            return ResponseEntity.ok(meetingService.addMemberToMeeting(meetingID));
        }
        catch (Exception e) {
            throw new CustomException("Le meeting n'a pas pu être joint", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

    //X
    @SneakyThrows
    @PostMapping("/meetings/filter")
    public ResponseEntity<List<Meeting>> searchWithFilter(@RequestBody FilterRequest filter){
        try {
            return ResponseEntity.ok(meetingService.searchFilter(filter));
        } catch (Exception e) {
            throw new CustomException("Aucun meeting n'a été trouvé", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

    //X
    @SneakyThrows
    @PostMapping("/meeting")
    public ResponseEntity<Meeting> create(@RequestBody Meeting entity) {
        try {
            entity.setId(null);
                Chat chat = new Chat();
                chatService.save(chat);
                entity.setChatID(chat.getId());
                entity.setMembersID(new ArrayList<String>());
                entity.setOwnerID(getCurrentUser().getId());
                return ResponseEntity.ok(meetingService.save(entity));
        } catch (Exception e) {
            throw new CustomException("Aucun meeting créé", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

    //X
    @SneakyThrows
    @PatchMapping("/meeting")
    public ResponseEntity<Meeting> update(@RequestBody Meeting entity) {
        try {
            if(entity.getId() != null){
                try {
                    Meeting existantMeeting = meetingService.findById(entity.getId());
                    existantMeeting = entity;
                    return ResponseEntity.ok(meetingService.save(existantMeeting));
                } catch (Exception e){
                    return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
                }
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }
        throw new CustomException("Meeting avec id :" + entity.getId() + " non trouvé", HttpStatus.NOT_ACCEPTABLE, null);
    }

    //X
    @SneakyThrows
    @DeleteMapping("/meeting/{meetingID}")
    public void delete(@PathVariable String meetingID)  {
        try {
            Meeting meeting = meetingService.findById(meetingID);
            if(meeting != null){
                meetingService.delete(meeting);
            }
        } catch (Exception e) {
            throw new CustomException("Meeting avec id :" + meetingID + " non trouvé", HttpStatus.NOT_ACCEPTABLE, null);

        }
    }

    //X
    @SneakyThrows
    @GetMapping("/meeting/{meetingID}")
    public ResponseEntity<Meeting> getById(@PathVariable String meetingID) {
        try {
            return ResponseEntity.ok(meetingService.findById(meetingID));
        } catch (Exception e) {
            throw new CustomException("Meeting avec id :" + meetingID + " non trouvé", HttpStatus.NOT_ACCEPTABLE, null);
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
