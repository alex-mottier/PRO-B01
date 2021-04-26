package ch.amphytrion.project.entities.databaseentities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentProfil {
    private ArrayList<Message> messages;
    private ArrayList<Meeting> meetingsParticipations;
    private ArrayList<Meeting> meetingsOwner;
}
