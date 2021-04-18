package ch.amphytrion.project.controller;

import ch.amphytrion.project.repositories.MeetingRepository;
import ch.amphytrion.project.services.MeetingService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MeetingResponseControllerTest {

    MeetingRepository meetingRepository;
    MeetingService meetingService = new MeetingService(meetingRepository);
    MeetingController meetingController = new MeetingController(meetingService);

    @Test
    void name() {
        assertEquals(MeetingController.class.getCanonicalName(),
                meetingController.controllerName());
    }
}
