package ch.amphytrion.project.entities.notdatabaseentities;

import ch.amphytrion.project.entities.databaseentities.Host;
import ch.amphytrion.project.entities.databaseentities.OpeningHour;
import ch.amphytrion.project.entities.databaseentities.Tag;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@AllArgsConstructor
@Data
@Document
public class LocationResponse {
    @Id
    private String id;
    private String name;
    private String description;
    private Integer nbPeople;
    private String hostId;
    private String hostName;
    private ArrayList<Tag> tags;
    private ArrayList<OpeningHour> openingHours;
}
