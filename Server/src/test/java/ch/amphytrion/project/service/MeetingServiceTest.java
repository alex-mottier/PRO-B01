package ch.amphytrion.project.service;


import ch.amphytrion.project.entities.databaseentities.Meeting;
import ch.amphytrion.project.repositories.MeetingRepository;
import ch.amphytrion.project.services.MeetingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@AutoConfigureDataMongo
public class MeetingServiceTest {

    private static final String BASE_NAME = "name-";
    private static final String BASE_DESCRIPTION = "description-";

    @Autowired
    private MeetingRepository repository;
    @Autowired
    private MeetingService service;

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
