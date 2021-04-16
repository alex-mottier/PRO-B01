package ch.amphytrion.project.entities.notdatabaseentities.databaseentities;

import ch.amphytrion.project.entities.notdatabaseentities.MeetingResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@Document
public class Student extends User {
    private ArrayList<Message> messages;
    private ArrayList<MeetingResponse> meetingsParticipations;
    private ArrayList<MeetingResponse> meetingsOwner;
}
