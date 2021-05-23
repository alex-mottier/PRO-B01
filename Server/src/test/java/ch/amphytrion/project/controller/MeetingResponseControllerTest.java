package ch.amphytrion.project.controller;

import ch.amphytrion.project.entities.databaseentities.Meeting;
import ch.amphytrion.project.repositories.MeetingRepository;
import ch.amphytrion.project.services.MeetingService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;

/**
 *
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@DataMongoTest
@RunWith(SpringRunner.class)
class MeetingResponseControllerTest {
    @Autowired
    MeetingRepository meetingRepository;

    @Test
    void saveMeeting(){

        Meeting meeting = new Meeting();
        assertEquals(meetingRepository.save(meeting), meeting);
        meetingRepository.delete(meeting);

    }
}