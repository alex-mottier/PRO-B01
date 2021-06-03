package ch.amphytrion.project.controller.meetingControllerTests;

import ch.amphytrion.project.controller.CustomException;
import ch.amphytrion.project.controller.MeetingController;
import ch.amphytrion.project.dto.MeetingResponse;
import ch.amphytrion.project.entities.databaseentities.*;
import ch.amphytrion.project.repositories.ChatRepository;
import ch.amphytrion.project.repositories.LocationRepository;
import ch.amphytrion.project.repositories.MeetingRepository;
import ch.amphytrion.project.repositories.UserRepository;
import ch.amphytrion.project.services.ChatService;
import ch.amphytrion.project.services.LocationService;
import ch.amphytrion.project.services.MeetingService;
import ch.amphytrion.project.services.UserService;
import org.joda.time.DateTime;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureDataMongo
class MeetingControllerTest {
    private static final String GOOGLE_ID = "google-mock-up-id";
    private static final String STUDENT_1_NAME = "Student_1_Name";

    @Autowired
    private MeetingRepository meetingRepository;
    @Autowired
    private MeetingService meetingService;
    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private ChatService chatService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private LocationRepository locationRepository;
    @Autowired
    private LocationService locationService;
    @Autowired
    private MeetingController meetingController;

    private User student;

    @BeforeEach
    public void setUpStudent() {
        // add principal object to SecurityContextHolder
        meetingRepository.deleteAll();
        chatRepository.deleteAll();
        userRepository.deleteAll();
        locationRepository.deleteAll();
        student = new User(GOOGLE_ID, STUDENT_1_NAME);
        student.setStudentProfil(new StudentProfil());
        userRepository.save(student);
        Authentication auth = new UsernamePasswordAuthenticationToken(student,null);
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    @Test
    void currentUserIsStudent() {
        assertDoesNotThrow(() -> meetingController.checkUserIsStudent());
        assertThrows(CustomException.class, () -> meetingController.checkUserIsHost());
    }

    @Test
    void getMeetingCreatedByUserReturnEmptyListIfNoMeetings() {
        assertDoesNotThrow(() -> meetingController.getMeetingsCreatedByUser());
        List<MeetingResponse> meetings = meetingController.getMeetingsCreatedByUser().getBody();
        assertEquals(0, meetings.size());
    }

    @Test
    void getMeetingCreatedByUserReturnAllFutureMeetingCreatedByUser() {
        String meetingName1 = "meeting-name-1";
        String meetingName2 = "meeting-name-2";
        String meetingName3 = "meeting-name-3";
        DateTime now = DateTime.now();
        String future = now.plusDays(1).toString();
        String future2 = now.plusDays(2).toString();
        String past = now.plusDays(-2).toString();
        String past2 = now.plusDays(-1).toString();
        Location location = new Location();
        location.setNbPeople(2);
        locationService.save(location);
        Meeting m1 = new Meeting(meetingName1, "description1", location.getId(), student.getId(), null, null,
                1, future, future2, false);
        Meeting m2 = new Meeting(meetingName2, "description2", location.getId(), student.getId(), null, null,
                1, future, future2, false);
        Meeting m3 = new Meeting(meetingName3, "description3", location.getId(), student.getId(), null, null,
                1, past, past2, false);

        meetingService.save(m1);
        meetingService.save(m2);
        meetingService.save(m3);
        assertDoesNotThrow(() -> meetingController.getMeetingsCreatedByUser());
        List<MeetingResponse> meetings = meetingController.getMeetingsCreatedByUser().getBody();
        assertEquals(2, meetings.size());
        assertEquals(meetings.get(0), new MeetingResponse(m1, location));
        assertEquals(meetings.get(1), new MeetingResponse(m2, location));
    }

    @Test
    void leaveUnknownMeetingShouldThrow(){
        assertThrows(CustomException.class, () -> meetingController.leaveMeeting(""));
    }

    @Test
    void leaveMeetingShouldWorkEvenIfNotInMeeting(){
        String meetingName1 = "meeting-name-1";
        DateTime now = DateTime.now();
        String future = now.plusDays(1).toString();
        String future2 = now.plusDays(2).toString();
        Location location = new Location();
        location.setNbPeople(2);
        locationService.save(location);
        Meeting m1 = new Meeting(meetingName1, "description1", location.getId(), student.getId(), null, null,
                1, future, future2, false);
        meetingService.save(m1);
        assertEquals(new MeetingResponse(m1, location), meetingController.leaveMeeting(m1.getId()).getBody());
    }

    @Test
    void leaveMeetingShouldRemoveUserFromMeetingEvenIfCreator(){
        String meetingName1 = "meeting-name-1";
        String meetingName2 = "meeting-name-2";
        DateTime now = DateTime.now();
        String future = now.plusDays(1).toString();
        String future2 = now.plusDays(2).toString();
        Location location = new Location();
        location.setNbPeople(2);
        locationService.save(location);
        Meeting m1 = new Meeting(meetingName1, "description1", location.getId(), null, null, null,
                1, future, future2, false);
        Meeting m2 = new Meeting(meetingName2, "description1", location.getId(), student.getId(), null, null,
                1, future, future2, false);
        meetingService.save(m1);
        meetingService.save(m2);
        meetingService.addMemberToMeeting(student, m1.getId());
        meetingService.addMemberToMeeting(student, m2.getId());
        meetingController.leaveMeeting(m1.getId());
        meetingController.leaveMeeting(m2.getId());
        assertFalse(m1.getMembersID().contains(student.getId()));
        assertFalse(m2.getMembersID().contains(student.getId()));
    }

    @Test
    void getMyMeetingsShouldReturnEmptyListOfNoMeetings(){
        assertDoesNotThrow(() -> meetingController.getMeetingsWhereUserParticipate(null));
        assertEquals(0, meetingController.getMeetingsWhereUserParticipate(null).getBody().size());
    }

//    @Test
//    void getMyMeetingsShouldReturnOnlyFutureMeetings(){
//        assertDoesNotThrow(() -> meetingController.getMeetingsWhereUserParticipate(null));
//        assertEquals(0, meetingController.getMeetingsWhereUserParticipate(null).getBody().size());
//    }

    @Test
    void getMyMeetingsShouldNotReturnLeavedMeetings(){
        String meetingName1 = "meeting-name-1";
        String meetingName2 = "meeting-name-2";
        DateTime now = DateTime.now();
        String future = now.plusDays(1).toString();
        String future2 = now.plusDays(2).toString();
        Location location = new Location();
        location.setNbPeople(2);
        locationService.save(location);
        Meeting m1 = new Meeting(meetingName1, "description1", location.getId(), student.getId(), null, null,
                1, future, future2, false);
        Meeting m2 = new Meeting(meetingName2, "description2", location.getId(), student.getId(), null, null,
                1, future, future2, false);
        meetingService.save(m1);
        meetingService.save(m2);
        meetingService.addMemberToMeeting(student, m1.getId());
        meetingService.addMemberToMeeting(student, m2.getId());
        meetingController.leaveMeeting(m1.getId());
        assertDoesNotThrow(() -> meetingController.getMeetingsWhereUserParticipate(null));
        assertEquals(1, meetingController.getMeetingsWhereUserParticipate(null).getBody().size());
        assertEquals(m2.getId(), meetingController.getMeetingsWhereUserParticipate(null).getBody().get(0).id);
    }

    @Test
    void joinInexistantMeetingShouldThrow(){
        assertThrows(CustomException.class, () -> meetingController.joinMeeting(""));
    }

    @Test
    void joinMeetingShouldAddMeetingToStudent(){
        String meetingName1 = "meeting-name-1";
        DateTime now = DateTime.now();
        String future = now.plusDays(1).toString();
        String future2 = now.plusDays(2).toString();
        Location location = new Location();
        location.setNbPeople(2);
        locationService.save(location);
        Meeting m1 = new Meeting(meetingName1, "description1", location.getId(), null, null, null,
                1, future, future2, false);
        meetingService.save(m1);
        meetingController.joinMeeting(m1.getId());
        m1 = meetingService.findById(m1.getId());
        assertTrue(student.getStudentProfil().getMeetingsParticipationsID().contains(m1.getId()));
        assertTrue(m1.getMembersID().contains(student.getId()));
    }

    @Test
    void joinAMeetingDoNothingIfAlreadyThere(){
        String meetingName1 = "meeting-name-1";
        DateTime now = DateTime.now();
        String future = now.plusDays(1).toString();
        String future2 = now.plusDays(2).toString();
        Location location = new Location();
        location.setNbPeople(2);
        locationService.save(location);
        Meeting m1 = new Meeting(meetingName1, "description1", location.getId(), null, null, null,
                1, future, future2, false);
        meetingService.save(m1);
        meetingController.joinMeeting(m1.getId());
        m1 = meetingService.findById(m1.getId());
        meetingController.joinMeeting(m1.getId());
        Meeting m2 = meetingService.findById(m1.getId());
        assertEquals(m1, m2);
    }

    @Test
    void joinShouldThrowIfFull(){
        String meetingName1 = "meeting-name-1";
        DateTime now = DateTime.now();
        String future = now.plusDays(1).toString();
        String future2 = now.plusDays(2).toString();
        Location location = new Location();
        location.setNbPeople(0);
        locationService.save(location);
        Meeting m1 = new Meeting(meetingName1, "description1", location.getId(), null, null, null,
                1, future, future2, false);
        meetingService.save(m1);
        final String id = m1.getId();
        assertThrows(CustomException.class, () -> meetingController.joinMeeting(id));
        m1 = meetingService.findById(id);
        assertEquals(0, m1.getMembersID().size());
    }
}