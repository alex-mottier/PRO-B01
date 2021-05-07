package ch.amphytrion.project.entities.databaseentities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

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
    // List de String ?
    private List<Tag> tags = new ArrayList<>();
    private List<OpeningHour> openingHours = new ArrayList<>();

    public Location(String name, String description, Integer nbPeople, String hostId, List<Tag> tags, List<OpeningHour> openingHours) {
        this.name = name;
        this.description = description;
        this.nbPeople = nbPeople;
        this.hostId = hostId;
        this.tags = tags;
        this.openingHours = openingHours;
    }
}
