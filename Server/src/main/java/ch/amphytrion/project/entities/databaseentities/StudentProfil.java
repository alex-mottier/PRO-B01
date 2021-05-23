package ch.amphytrion.project.entities.databaseentities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

/**
 * StudentProfil class, used in User class
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@Data
@AllArgsConstructor
@Document
public class StudentProfil {
    private List<String> meetingsParticipationsID = new ArrayList<>();
    private List<String> meetingsOwnerID = new ArrayList<>();

    public  StudentProfil(){
    }
}
