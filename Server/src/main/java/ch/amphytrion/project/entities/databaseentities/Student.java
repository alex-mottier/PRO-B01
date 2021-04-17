package ch.amphytrion.project.entities.databaseentities;

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
    private ArrayList<Meeting> meetingsParticipations;
    private ArrayList<Meeting> meetingsOwner;
}
