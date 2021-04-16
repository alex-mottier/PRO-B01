package ch.amphytrion.project.repositories;
import ch.amphytrion.project.controller.MeetingController;
import ch.amphytrion.project.controller.StudentController;
import ch.amphytrion.project.entities.*;

import ch.amphytrion.project.services.MeetingService;
import ch.amphytrion.project.services.StudentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class MeetingRepositoryTest {

    MeetingRepository meetingRepository;
    @Autowired
    private MeetingService meetingService;
    MeetingController meetingController = new MeetingController(meetingService);
    StudentRepository studentRepository;
    @Autowired
    private StudentService studentService;
    StudentController studentController = new StudentController(studentService);

    @Test
    void meetingGetIdTest() {
       /*try{
            Student s1 = new Student("s1");
            Student s2 = new Student("s2");
            ArrayList<Student> students = new ArrayList<>();
            students.add(s1);
            students.add(s2);
            Location l1 = new Location(null, null, null, null, null, null, "l1");
            Location l2 = new Location(null, null, null, null, null, null, "l2");
            ArrayList<Location> locations = new ArrayList<>();
            locations.add(l1);
            locations.add(l2);
            Tag t1 = new Tag(null, null, null, "t1");
            Tag t2 = new Tag(null, null, null, "t2");
            ArrayList<Tag> tags = new ArrayList<>();
            tags.add(t1);
            tags.add(t2);
            Chat chat = new Chat(null,null);
            Meeting meeting = new Meeting(students, s1, locations,tags,chat,"meeting", 0, 0);
            meetingService.save(meeting);
            assertEquals(meeting.getName(), meetingService.findById(meeting.getId()).getName() );
            meetingService.deleteById(meeting.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }*/
    }
}