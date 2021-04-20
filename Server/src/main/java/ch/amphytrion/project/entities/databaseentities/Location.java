package ch.amphytrion.project.entities.databaseentities;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@AllArgsConstructor
@Data
@Document
public class Location {
    @Id
    private String id;
    private String name;
    private String description;
    private Integer nbPeople;
    private Host host;
    private ArrayList<Tag> tags;
    private ArrayList<OpeningHour> openingHours;

    public Location(String name, String description, Integer nbPeople, ArrayList<Tag> tags, ArrayList<OpeningHour> openingHours) {
        this.name = name;
        this.description = description;
        this.nbPeople = nbPeople;
        this.tags = tags;
        this.openingHours = openingHours;
    }
}
