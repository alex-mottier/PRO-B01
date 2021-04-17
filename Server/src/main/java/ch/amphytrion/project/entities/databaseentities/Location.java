package ch.amphytrion.project.entities.databaseentities;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@AllArgsConstructor
@Data
@Document
public class Location {
    private String name;
    private String description;
    private Integer nbPeople;
    private ArrayList<Tag> tags;
    private ArrayList<OpeningHour> openingHours;
}
