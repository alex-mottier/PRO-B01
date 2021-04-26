package ch.amphytrion.project.entities.databaseentities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

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
    private Address address;
    private ArrayList<Tag> tags;
    private ArrayList<OpeningHour> openingHours;

    public Location(String name, String description, Integer nbPeople,Address address, String hostId, ArrayList<Tag> tags,ArrayList<OpeningHour> openingHours) {
        this.name = name;
        this.description = description;
        this.nbPeople = nbPeople;
        this.address = address;
        this.hostId = hostId;
        this.tags = tags;
        this.openingHours = openingHours;
    }
}
