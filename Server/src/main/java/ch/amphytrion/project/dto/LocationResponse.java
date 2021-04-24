package ch.amphytrion.project.dto;

import ch.amphytrion.project.entities.databaseentities.OpeningHour;
import ch.amphytrion.project.entities.databaseentities.Tag;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@AllArgsConstructor
@Document
public class LocationResponse implements InterfaceDTO {
    @Id
    public String id;
    public String name;
    public String description;
    public Integer nbPeople;
    public String hostId;
    public String hostName;
    public ArrayList<Tag> tags;
    public ArrayList<OpeningHour> openingHours;
}
