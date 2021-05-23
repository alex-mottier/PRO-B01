package ch.amphytrion.project.dto;

import ch.amphytrion.project.entities.databaseentities.*;

import java.util.List;

/**
 *
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
public class StudentResponse implements InterfaceDTO {
    public String id;
    public String name;
    public List<String> meetingsParticipationsID;
    public List<String> meetingsOwnerID;

    public StudentResponse(User user) {
        this.id = user.getId();
        this.name = user.getUsername();
        this.meetingsParticipationsID = user.getStudentProfil().getMeetingsParticipationsID();
        this.meetingsOwnerID = user.getStudentProfil().getMeetingsOwnerID();
    }
}
