package ch.amphytrion.project.dto;

import ch.amphytrion.project.entities.databaseentities.*;

import java.util.List;

public class StudentResponse implements InterfaceDTO {
    public String id;
    public String name;
    public List<Message> messages;
    public List<Meeting> meetingsParticipations;
    public List<Meeting> meetingsOwner;

    public StudentResponse(User user) {
        this.id = user.getId();
        this.name = user.getUsername();
        this.messages = user.getStudentProfil().getMessages();
        this.meetingsParticipations = user.getStudentProfil().getMeetingsParticipations();
        this.meetingsOwner = user.getStudentProfil().getMeetingsOwner();
    }
}
