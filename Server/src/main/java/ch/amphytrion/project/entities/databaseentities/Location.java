package ch.amphytrion.project.entities.databaseentities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

/**
 * Location class
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
public class Location {
    @Id
    private String id;
    private String name;
    private String description;
    private Integer nbPeople;
    private String hostId;
    private String hostName;
    private List<Tag> tags = new ArrayList<>();
    private List<OpeningHour> openingHours = new ArrayList<>();

    public Location(String name, String description, Integer nbPeople, String hostId, String hostName, List<Tag> tags, List<OpeningHour> openingHours) {
        this.name = name;
        this.description = description;
        this.nbPeople = nbPeople;
        this.hostId = hostId;
        this.hostName = hostName;
        this.tags = tags;
        this.openingHours = openingHours;
    }
}
