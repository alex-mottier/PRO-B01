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
import java.util.Collections;
import java.util.List;

@RestController
public class MeetingController extends BaseController implements IGenericController<Meeting> {

    private MeetingService meetingService;
    private UserService studentService;
    private ChatService chatService;
    private LocationService locationService;


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
            checkUserIsStudent();
            User user = getCurrentUser();
                ArrayList<MeetingResponse> meetingResponses = new ArrayList<>();
                for(Meeting meeting : meetingService.findFutureMeetings(user.getId())) {
                    Location location = locationService.findById(meeting.getLocationID());
                    MeetingResponse meetingResponse = new MeetingResponse(meeting, location);
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
            checkUserIsStudent();
            User user = getCurrentUser();
            Meeting meeting = meetingService.findById(meetingID);
            StudentProfil studentProfil = user.getStudentProfil();
            if (studentProfil != null) {
                 meeting.getMembersID().removeIf(memberId -> memberId.equals(user.getId()));
                 studentProfil.getMeetingsParticipationsID().removeIf(id -> id.equals(meetingID));
                 studentService.save(user);
                 meetingService.save(meeting);
                Location location = locationService.findById(meeting.getLocationID());
                return ResponseEntity.ok(new MeetingResponse(meeting, location));
                }
        } catch (Exception e) {
            throw new CustomException("Meeting introuvable", HttpStatus.NOT_ACCEPTABLE, null);
        }
        throw new CustomException("L'utilisateur n'est pas un étudiant", HttpStatus.NOT_ACCEPTABLE, null);
    }

    //X
    @SneakyThrows
    @PostMapping("/getMyMeetings")
    public ResponseEntity<List<MeetingResponse>> getMeetingsWhereUserParticipate(DatesFilterDTO datesFilter) {
        try {
            checkUserIsStudent();
            StudentProfil studentProfil = getCurrentUser().getStudentProfil();
            ArrayList<MeetingResponse> meetingResponses = new ArrayList<>();
            for(String meetingId : studentProfil.getMeetingsParticipationsID()) {
                Meeting meeting = meetingService.findById(meetingId);
                Location location = locationService.findById(meeting.getLocationID());
                MeetingResponse meetingResponse = new MeetingResponse(meeting, location);
                meetingResponses.add(meetingResponse);
            }
            return ResponseEntity.ok(meetingResponses);
        } catch (Exception e) {
            System.out.println("");
            throw new CustomException("Aucun meeting n'a été trouvé", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

    //X
    @SneakyThrows
    @PostMapping("/meeting/join/{meetingID}")
    public ResponseEntity<MeetingResponse> joinMeeting(@PathVariable String meetingID) {
        // NE PAS S'INSCRIRE PLUSIEURS FOIS
        // NE PAS POUVOIR EXCEDER LA TAILLE DU MEETING!
        try {
            checkUserIsStudent();
            Meeting meeting = meetingService.addMemberToMeeting(getCurrentUser(), meetingID);
            Location location = locationService.findById(meeting.getLocationID());
            return ResponseEntity.ok(new MeetingResponse(meeting, location));
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
            List<MeetingResponse> meetingResponses = new ArrayList<>();


            List<Meeting> result = meetingService.allFilters(meetingService.findAll(), filter);
            for(Meeting meeting : result) {
                Location location = locationService.findById(meeting.getLocationID());
                MeetingResponse meetingResponse = new MeetingResponse(meeting, location);
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
    public ResponseEntity<MeetingResponse> create(@RequestBody Meeting meeting) {
        try {
            checkUserIsStudent();
            User user = getCurrentUser();
            meeting.setId(null);
            Chat chat = new Chat();
            chatService.save(chat);
            meeting.setChatID(chat.getId());
            meeting.setMembersID(Collections.singletonList(user.getId()));
            meeting.setOwnerID(user.getId());
            meetingService.save(meeting);
            user.getStudentProfil().getMeetingsOwnerID().add(meeting.getId());
            user.getStudentProfil().getMeetingsParticipationsID().add(meeting.getId());
            studentService.save(user);
            Location location = locationService.findById(meeting.getLocationID());
            return ResponseEntity.ok(new MeetingResponse(meeting, location));
        } catch (Exception e) {
            throw new CustomException("Aucun meeting créé", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

    //X
    @SneakyThrows
    @PatchMapping("/meeting")
    public ResponseEntity<MeetingResponse> update(@RequestBody Meeting meeting) {
        try {
            if(meeting.getId() != null){
                Meeting existantMeeting = meetingService.findById(meeting.getId());
                if(existantMeeting == null){
                    throw new CustomException("Meeting avec id :" + meeting.getId() + " non trouvé", HttpStatus.NOT_ACCEPTABLE, null);
                }
                /* Patch for update selected fields */
                existantMeeting.setName(meeting.getName());
                existantMeeting.setDescription(meeting.getDescription());
                existantMeeting.setTags(meeting.getTags());
                existantMeeting.setLocationID(meeting.getLocationID());
                Location location = locationService.findById(meeting.getLocationID());
                return ResponseEntity.ok(new MeetingResponse(meetingService.save(existantMeeting), location));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }
        throw new CustomException("Meeting avec id :" + meeting.getId() + " non trouvé", HttpStatus.NOT_ACCEPTABLE, null);
    }

    //X
    @SneakyThrows
    @DeleteMapping("/meeting/{meetingID}")
    public void delete(@PathVariable String meetingID)  {
        try {
            Meeting meeting = meetingService.findById(meetingID);
            if(meeting != null){
                for(String id : meeting.getMembersID()){
                    User member = studentService.findById(id);
                    List<String> meetingsOwner = member.getStudentProfil().getMeetingsOwnerID();
                    if(meetingsOwner.contains(meetingID)) {
                        member.getStudentProfil().getMeetingsParticipationsID().remove(meetingID);
                        meetingsOwner.remove(meetingID);
                        studentService.save(member);
                    }
                }
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
            Meeting meeting = meetingService.findById(meetingID);
            Location location = locationService.findById(meeting.getLocationID());
            return ResponseEntity.ok(new MeetingResponse(meeting, location));
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
