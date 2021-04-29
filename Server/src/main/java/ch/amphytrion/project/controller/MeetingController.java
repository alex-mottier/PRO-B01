package ch.amphytrion.project.controller;

import ch.amphytrion.project.dto.DatesFilterDTO;
import ch.amphytrion.project.dto.FilterRequest;
import ch.amphytrion.project.dto.MeetingResponse;
import ch.amphytrion.project.entities.databaseentities.*;
import ch.amphytrion.project.services.ChatService;
import ch.amphytrion.project.services.LocationService;
import ch.amphytrion.project.services.MeetingService;
import ch.amphytrion.project.services.UserService;
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
    private UserService studentService;
    private ChatService chatService;
    private LocationService locationService;

    private User user;
    @Autowired
    public MeetingController(MeetingService meetingService, UserService studentService, ChatService chatService, LocationService locationService) {
        this.meetingService = meetingService;
        this.studentService = studentService;
        this.chatService = chatService;
        this.locationService = locationService;
    }

    //X
    @SneakyThrows
    @GetMapping("/getCreatedMeetings")
    public ResponseEntity<List<MeetingResponse>> getMeetingsCreatedByUser() {
        try {
            user = getCurrentUser();
                ArrayList<MeetingResponse> meetingResponses = new ArrayList<>();
                for(Meeting meeting : meetingService.findFutureMeetings(user.getId())) {
                    MeetingResponse meetingResponse = new MeetingResponse(meeting, locationService);
                    meetingResponses.add(meetingResponse);
                }
                return ResponseEntity.ok(meetingResponses);
        } catch (Exception e) {
            throw new CustomException("Aucun meeting n'a été trouvé", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

    //X
    @SneakyThrows
    @PostMapping("/leaveMeeting/{meetingID}")
    public ResponseEntity<MeetingResponse> leaveMeeting(@PathVariable String meetingID){
        try {
            user = getCurrentUser();
            Meeting meeting = meetingService.findById(meetingID);
            StudentProfil studentProfil = user.getStudentProfil();
            if (studentProfil != null) {
                 studentProfil.getMeetingsParticipations().removeIf(m -> m.getId() == meeting.getId());
                 studentService.save(user);
                return ResponseEntity.ok(new MeetingResponse(meeting, locationService));
                }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }
        throw new CustomException("Fuyez pauvres fous", HttpStatus.NOT_ACCEPTABLE, null);
    }

    //X
    @SneakyThrows
    @PostMapping("/getMyMeetings")
    public ResponseEntity<List<MeetingResponse>> getMeetingsWhereUserParticipate(DatesFilterDTO datesFilter) {
        try {
            StudentProfil studentProfil = getCurrentUser().getStudentProfil();
            ArrayList<MeetingResponse> meetingResponses = new ArrayList<>();
            for(Meeting meeting : studentProfil.getMeetingsParticipations()) {
                MeetingResponse meetingResponse = new MeetingResponse(meeting, locationService);
                meetingResponses.add(meetingResponse);
            }
            return ResponseEntity.ok(meetingResponses);
        } catch (Exception e) {
            throw new CustomException("Aucun meeting n'a été trouvé", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

    //X
    @SneakyThrows
    @PostMapping("/meeting/join/{meetingID}")
    public ResponseEntity<MeetingResponse> joinMeeting(@PathVariable String meetingID) {
        try {
            checkUserIsStudent();
            Meeting meeting = meetingService.addMemberToMeeting(getCurrentUser(), meetingID);
            return ResponseEntity.ok(new MeetingResponse(meeting, locationService));
        }
        catch (Exception e) {
            throw new CustomException("Le meeting n'a pas pu être joint", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

    //X
    @SneakyThrows
    @PostMapping("/meetings/filter")
    public ResponseEntity<List<MeetingResponse>> searchWithFilter(@RequestBody FilterRequest filter){
        try {
            ArrayList<MeetingResponse> meetingResponses = new ArrayList<>();
            /*for(Meeting meeting : meetingService.findByOwnerID(user.getId())) {
                MeetingResponse meetingResponse = new MeetingResponse(meeting, locationService);
                meetingResponses.add(meetingResponse);
            }*/

            user = getCurrentUser();
            ArrayList<Meeting> result = meetingService.allFilters(meetingService.findByOwnerID(user.getId()), filter);
            for(Meeting meeting : result) {
                MeetingResponse meetingResponse = new MeetingResponse(meeting, locationService);
                meetingResponses.add(meetingResponse);
            }
            return ResponseEntity.ok(meetingResponses);
        } catch (Exception e) {
            throw new CustomException("Aucun meeting n'a été trouvé", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

    //X
    @SneakyThrows
    @PostMapping("/meeting")
    public ResponseEntity<MeetingResponse> create(@RequestBody Meeting entity) {
        try {
            entity.setId(null);
                Chat chat = new Chat();
                chatService.save(chat);
                entity.setChatID(chat.getId());
                entity.setMembersID(new ArrayList<String>());
                entity.setOwnerID(getCurrentUser().getId());
                return ResponseEntity.ok(new MeetingResponse(meetingService.save(entity), locationService));
        } catch (Exception e) {
            throw new CustomException("Aucun meeting créé", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

    //X
    @SneakyThrows
    @PatchMapping("/meeting")
    public ResponseEntity<MeetingResponse> update(@RequestBody Meeting entity) {
        try {
            if(entity.getId() != null){
                try {
                    Meeting existantMeeting = meetingService.findById(entity.getId());
                    existantMeeting = entity;
                    return ResponseEntity.ok(new MeetingResponse(meetingService.save(existantMeeting), locationService));
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
    public ResponseEntity<MeetingResponse> getById(@PathVariable String meetingID) {
        try {
            return ResponseEntity.ok(new MeetingResponse(meetingService.findById(meetingID), locationService));
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
