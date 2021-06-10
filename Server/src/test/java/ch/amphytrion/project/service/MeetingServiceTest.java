package ch.amphytrion.project.service;



import ch.amphytrion.project.entities.databaseentities.Meeting;
import ch.amphytrion.project.entities.databaseentities.StudentProfil;
import ch.amphytrion.project.entities.databaseentities.User;
import ch.amphytrion.project.repositories.MeetingRepository;
import ch.amphytrion.project.services.MeetingService;
import ch.amphytrion.project.services.UserService;
import org.joda.time.DateTime;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@AutoConfigureDataMongo
public class MeetingServiceTest {

    private static final String BASE_NAME = "name-";
    private static final String BASE_DESCRIPTION = "description-";
    private static final String BASE_OWNER_ID = "owner-id-";
    private static final String BASE_LOCATION_ID = "location-id-";
    private static final String BASE_MEMBER_ID = "member-id-";

    @Autowired
    private MeetingRepository repository;
    @Autowired
    private MeetingService service;
    @Autowired
    private UserService userService;

    @BeforeEach
    public void setUp() {
        repository.deleteAll();
    }

    private List<Meeting> createMeetings(int nb){
        List<Meeting> meetings = new ArrayList<>();
        for(int i = 0; i < nb; i++){
            Meeting meeting = new Meeting();
            meeting.setName(BASE_NAME + i);
            meeting.setDescription(BASE_DESCRIPTION + i);
            meeting.setLocationID(BASE_LOCATION_ID + i);
            meeting.setOwnerID(BASE_OWNER_ID + i);
            for(int j = 0; j < i; j++){
                meeting.getMembersID().add(BASE_MEMBER_ID + j);
            }
            repository.save(meeting);
            meetings.add(meeting);
        }
        return meetings;
    }

    @Test
    void findAllShouldReturnEmptyArrayIfNone(){
        repository.deleteAll();
        assertEquals(0, service.findAll().size());
    }

    @Test
    void findAllShouldReturnRightNumberOfRecords(){
        createMeetings(10);
        assertEquals(10, service.findAll().size());
    }

    @Test
    void findByIdShouldReturnNullIfNotPresent(){
        Meeting meeting = createMeetings(3).get(0);
        assertNull(service.findById(meeting.getId() + "-fake"));
    }

    @Test
    void findByIdShouldReturnTheMeeting(){
        Meeting meeting = createMeetings(3).get(0);
        assertEquals(meeting, service.findById(meeting.getId()));
    }

    @Test
    void findByOwnerIdShouldReturnEmptyIfNone(){
        createMeetings(3);
        assertTrue(service.findByOwnerID(BASE_OWNER_ID + "-fake").isEmpty());
    }

    @Test
    void findByOwnerIdShouldReturnAllMeetingsOfOwner(){
        List<Meeting> meetings = createMeetings(5);
        String multiMeetingOwnerId = meetings.get(2).getOwnerID();
        String noMeetingOwnerId = meetings.get(0).getOwnerID();
        for(int i = 0; i < 2; i++){
            Meeting meeting = meetings.get(i);
            meeting.setOwnerID(multiMeetingOwnerId);
            repository.save(meeting);
        }
        assertTrue(service.findByOwnerID(noMeetingOwnerId).isEmpty());
        assertEquals(3, service.findByOwnerID(multiMeetingOwnerId).size());
        assertEquals(1, service.findByOwnerID(meetings.get(4).getOwnerID()).size());
    }

    @Test
    void findByLocationIdShouldReturnEmptyIfNone(){
        createMeetings(3);
        assertTrue(service.findByLocationID(BASE_LOCATION_ID + "-fake").isEmpty());
    }

    @Test
    void findByLocationIdShouldReturnAllMeetingsAtLocation(){
        List<Meeting> meetings = createMeetings(5);
        String multiMeetingLocationId = meetings.get(2).getLocationID();
        String noMeetingLocationId = meetings.get(0).getLocationID();
        for(int i = 0; i < 2; i++){
            Meeting meeting = meetings.get(i);
            meeting.setLocationID(multiMeetingLocationId);
            repository.save(meeting);
        }
        assertTrue(service.findByLocationID(noMeetingLocationId).isEmpty());
        assertEquals(3, service.findByLocationID(multiMeetingLocationId).size());
        assertEquals(1, service.findByLocationID(meetings.get(4).getLocationID()).size());
    }

    @Test
    void findOwnerFutureMeetingsShouldReturnEmptyIfNone(){
        createMeetings(3);
        assertTrue(service.findOwnerFutureMeetings(BASE_OWNER_ID + "fake").isEmpty());
    }

    @Test
    void findOwnerFutureMeetingsShouldFindALlMeetingsInFuture(){
        DateTime now = DateTime.now().plusHours(2); // To be at UTC time
        String past_1 = now.minusDays(1).toString();
        String past_0 = now.minusMinutes(1).toString();
        String future_0 = now.plusMinutes(1).toString();
        String future_1 = now.plusDays(1).toString();
        List<Meeting> meetings = createMeetings(10);
        for(int i = 0; i < 3; i++){
            Meeting m = meetings.get(i);
            m.setStartDate(past_1);
            m.setEndDate(past_0);
            m.setOwnerID(BASE_OWNER_ID);
            repository.save(m);
        }
        for(int i = 3; i < 6; i++){
            Meeting m = meetings.get(i);
            m.setStartDate(past_0);
            m.setEndDate(future_0);
            m.setOwnerID(BASE_OWNER_ID);
            repository.save(m);
        }
        for(int i = 6; i < 10; i++){
            Meeting m = meetings.get(i);
            m.setStartDate(future_0);
            m.setEndDate(future_1);
            m.setOwnerID(BASE_OWNER_ID);
            repository.save(m);
        }
        assertEquals(7, service.findOwnerFutureMeetings(BASE_OWNER_ID).size());
    }

    @Test
    void findOwnerFutureMeetingsShouldFindOnlyOwnerMeetings(){
        DateTime now = DateTime.now().plusHours(2); // To be at UTC time
        String past_1 = now.minusDays(1).toString();
        String past_0 = now.minusMinutes(1).toString();
        String future_0 = now.plusMinutes(1).toString();
        String future_1 = now.plusDays(1).toString();
        List<Meeting> meetings = createMeetings(10);
        for(int i = 0; i < 3; i++){
            Meeting m = meetings.get(i);
            m.setStartDate(past_1);
            m.setEndDate(past_0);
            repository.save(m);
        }
        for(int i = 3; i < 4; i++){
            Meeting m = meetings.get(i);
            m.setStartDate(past_0);
            m.setEndDate(future_0);
            m.setOwnerID(BASE_OWNER_ID + 9);
            repository.save(m);
        }
        for(int i = 4; i < 6; i++){
            Meeting m = meetings.get(i);
            m.setStartDate(past_0);
            m.setEndDate(future_0);
            repository.save(m);
        }
        for(int i = 6; i < 10; i++){
            Meeting m = meetings.get(i);
            m.setStartDate(future_0);
            m.setEndDate(future_1);
            repository.save(m);
        }
        assertEquals(2, service.findOwnerFutureMeetings(BASE_OWNER_ID + 9).size());
    }

    @Test
    void addMemberToMeetingShouldReturnNullIfMeetingInexistant(){
        createMeetings(3);
        User member = new User("userID", "googleID", "username", new StudentProfil(), null );
        assertNull(service.addMemberToMeeting(member, "fake-id"));
    }

    @Test
    void addMemberToMeetingSouldReturnMeetingUnmodifiedIfMemberIsNotStudent(){
        Meeting meeting = createMeetings(3).get(0);
        User member = new User("userID", "googleID", "username", null, null );
        assertEquals(meeting, service.addMemberToMeeting(member, meeting.getId()));
    }

    @Test
    void addMemberToMeetingShouldAddAnotherMember(){
        Meeting meeting = createMeetings(3).get(2);
        User member = new User("userID", "googleID", "username", new StudentProfil(), null );
        meeting = service.addMemberToMeeting(member, meeting.getId());
        member = userService.findById("userID");
        assertTrue(meeting.getMembersID().contains("userID"));
        assertTrue(member.getStudentProfil().getMeetingsParticipationsID().contains(meeting.getId()));
        assertEquals(3, meeting.getMembersID().size());
    }

    @Test
    void deletedMeetingShouldNotBeFind(){
        Meeting meeting = createMeetings(3).get(0);
        service.delete(meeting);
        assertFalse(service.findAll().contains(meeting));
    }

    @Test
    void deleteInexistantShouldNotThrow(){
        Meeting meeting = createMeetings(3).get(0);
        service.delete(meeting);
        assertDoesNotThrow(() -> service.delete(meeting));
    }

    @Test
    void deletedByIdMeetingShouldNotBeFind(){
        Meeting meeting = createMeetings(3).get(0);
        service.deleteById(meeting.getId());
        assertFalse(service.findAll().contains(meeting));
    }

    @Test
    void deletedByIdInexistantShouldNotThrow(){
        Meeting meeting = createMeetings(3).get(0);
        service.deleteById(meeting.getId());
        assertDoesNotThrow(() -> service.deleteById(meeting.getId()));
    }
}
