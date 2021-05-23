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

/**
 * RESTful meeting controller. Used to map HTML requests to the corresponding methods
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@RestController
public class MeetingController extends BaseController implements IGenericController<Meeting> {

    private MeetingService meetingService;
    private UserService studentService;
    private ChatService chatService;
    private LocationService locationService;


    /**
     * Constructor of the meeting controller
     * @param meetingService corresponding meeting service to the meeting controller
     * @param studentService corresponding student service to the meeting controller
     * @param chatService corresponding chat service to the meeting controller
     * @param locationService corresponding location service to the meeting controller
     */
    @Autowired
    public MeetingController(MeetingService meetingService, UserService studentService, ChatService chatService, LocationService locationService) {
        this.meetingService = meetingService;
        this.studentService = studentService;
        this.chatService = chatService;
        this.locationService = locationService;
    }

    /**
     * Retrieve all the meetings that the user created
     * @throws CustomException
     * @return ResponseEntity<List<MeetingResponse>> The list of meetings that the user created, RESTfully formated
     */
    //X
    @SneakyThrows
    @GetMapping("/getCreatedMeetings")
    public ResponseEntity<List<MeetingResponse>> getMeetingsCreatedByUser() {
        try {
            checkUserIsStudent();
            User user = getCurrentUser();
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

    /**
     * Delete the user participation in a specified meeting
     * @param meetingID the ID of the meeting
     * @throws CustomException
     * @return ResponseEntity<MeetingResponse> RESTful formatted meeting that has been left
     */
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
                return ResponseEntity.ok(new MeetingResponse(meeting, locationService));
                }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }
        throw new CustomException("Fuyez pauvres fous", HttpStatus.NOT_ACCEPTABLE, null);
    }

    /**
     * Retrieve all the meetings that the user is part of
     * @param datesFilter an object made of two dates to filter the meetings response
     * @throws CustomException
     * @return ResponseEntity<List<MeetingResponse>> The list of meetings that the user is part of, RESTfully formated
     */
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
                MeetingResponse meetingResponse = new MeetingResponse(meeting, locationService);
                meetingResponses.add(meetingResponse);
            }
            return ResponseEntity.ok(meetingResponses);
        } catch (Exception e) {
            System.out.println("");
            throw new CustomException("Aucun meeting n'a été trouvé", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }
    /**
     * add a student to the meeting
     * @param meetingID the id of the meeting that the user want to join
     * @throws CustomException
     * @return ResponseEntity<MeetingResponse>The meeting that the user is now part of, RESTfully formated
     */
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

    /**
     * Search for specific meetings in the database
     * @param filter an object used to filter the meetings
     * @throws CustomException
     * @return ResponseEntity<List<MeetingResponse>> The meetings found , RESTfully formated
     */
    //X
    @SneakyThrows
    @PostMapping("/meetings/filter")
    public ResponseEntity<List<MeetingResponse>> searchWithFilter(@RequestBody FilterRequest filter){
        try {
            List<MeetingResponse> meetingResponses = new ArrayList<>();
            List<Meeting> result = meetingService.allFilters(meetingService.findAll(), filter);
            for(Meeting meeting : result) {
                MeetingResponse meetingResponse = new MeetingResponse(meeting, locationService);
                meetingResponses.add(meetingResponse);
            }
            return ResponseEntity.ok(meetingResponses);
        } catch (Exception e) {
            throw new CustomException("Aucun meeting n'a été trouvé", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

    /**
     * Add a specified meeting in the database
     * @param entity the meeting to add, RESTfully formatted
     * @throws CustomException
     * @return ResponseEntity<MeetingResponse> the meeting created
     */
    //X
    @SneakyThrows
    @PostMapping("/meeting")
    public ResponseEntity<MeetingResponse> create(@RequestBody Meeting entity) {
        try {
            checkUserIsStudent();
            User user = getCurrentUser();
            entity.setId(null);
            Chat chat = new Chat();
            chatService.save(chat);
            entity.setChatID(chat.getId());
            entity.setMembersID(Collections.singletonList(user.getId()));
            entity.setOwnerID(user.getId());
            meetingService.save(entity);
            user.getStudentProfil().getMeetingsOwnerID().add(entity.getId());
            user.getStudentProfil().getMeetingsParticipationsID().add(entity.getId());
            studentService.save(user);
                return ResponseEntity.ok(new MeetingResponse(entity, locationService));
        } catch (Exception e) {
            throw new CustomException("Aucun meeting créé", HttpStatus.NOT_ACCEPTABLE, null);
        }
    }

    /**
     * Update a specified meeting in the database
     * @param entity the meeting to add, RESTfully formatted
     * @throws CustomException
     * @return ResponseEntity<MeetingResponse> the meeting updated
     */
    //X
    @SneakyThrows
    @PatchMapping("/meeting")
    public ResponseEntity<MeetingResponse> update(@RequestBody Meeting entity) {
        try {
            if(entity.getId() != null){
                Meeting existantMeeting = meetingService.findById(entity.getId());
                if(existantMeeting == null){
                    throw new CustomException("Meeting avec id :" + entity.getId() + " non trouvé", HttpStatus.NOT_ACCEPTABLE, null);
                }
                /* Patch for update selected fields */
                existantMeeting.setName(entity.getName());
                existantMeeting.setDescription(entity.getDescription());
                existantMeeting.setTags(entity.getTags());
                existantMeeting.setLocationID(entity.getLocationID());
                return ResponseEntity.ok(new MeetingResponse(meetingService.save(existantMeeting), locationService));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }
        throw new CustomException("Meeting avec id :" + entity.getId() + " non trouvé", HttpStatus.NOT_ACCEPTABLE, null);
    }

    /**
     * delete a specific meeting in the database
     * @param meetingID the ID of the meeting to delete
     * @throws CustomException
     */
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

    /**
     * find a specific meeting in the database
     * @param meetingID the ID of the meeting to find
     * @throws CustomException
     * @return ResponseEntity<MeetingResponse> The meeting found
     */
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

//TODO : Check if still relevant
    /**
     * Test method of the controller
     * @return the name of the class
     */
    private String testController() {
        return this.getClass().getSimpleName();
    }

}
