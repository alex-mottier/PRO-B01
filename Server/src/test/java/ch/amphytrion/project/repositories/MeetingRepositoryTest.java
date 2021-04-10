package ch.amphytrion.project.repository;


import ch.amphytrion.project.controller.MeetingController;
import ch.amphytrion.project.controller.StudentController;
import ch.amphytrion.project.entities.Chat;
import ch.amphytrion.project.entities.Meeting;
import ch.amphytrion.project.entities.Student;
import ch.amphytrion.project.repositories.MeetingRepository;
import ch.amphytrion.project.repositories.StudentRepository;
import ch.amphytrion.project.services.MeetingService;
import ch.amphytrion.project.services.StudentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Arrays;

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
    void displayRequest() {
      /*  // créer une personne
        Student student = new Student("POmme de terre");
        Student student2 = new Student ("au lardons");
        Student student3 = new Student ("avec crème");
        Chat chat = new Chat(null, null);
        ArrayList<Student> students = new ArrayList<>();*/

        Student student333 = studentService.findByUsername("POmme de terre");
        student333.setFirstname("Coucou je me suis fait remplacé mon prenom");
        studentService.save(student333);
/*

        students.add(student);
        studentService.save(student);
        students.add(student2);
        studentService.save(student2);
        students.add(student3);
        studentService.save(student3);
        Meeting meeting = new Meeting(students,
               student,
               null,
               null,
               chat,
               "Recette",
               0,
               0);

        meetingService.save(meeting);*/

    }
}