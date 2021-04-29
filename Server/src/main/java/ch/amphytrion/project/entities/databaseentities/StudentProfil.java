package ch.amphytrion.project.entities.databaseentities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;


@Data
@AllArgsConstructor
@Document
public class StudentProfil {
    private List<Message> messages = new ArrayList<>();
    private List<Meeting> meetingsParticipations = new ArrayList<>();
    private List<Meeting> meetingsOwner = new ArrayList<>();

    public  StudentProfil(){
    }
}
