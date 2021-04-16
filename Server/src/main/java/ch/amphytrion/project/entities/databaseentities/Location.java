package ch.amphytrion.project.entities.notdatabaseentities.databaseentities;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@AllArgsConstructor
@Data
@Document
public class Location {
    private Integer nbPeople;
    private ArrayList<Tag> tags;
    private ArrayList<OpeningHour> openingHours;
    private String name;
    private String description;
}
