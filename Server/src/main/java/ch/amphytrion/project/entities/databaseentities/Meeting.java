package ch.amphytrion.project.entities.databaseentities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
public class Meeting {
    @Id
    private String id;
    private String name;
    private String description;
    private String locationID;
    private String ownerID;
    private String chatID;
    private ArrayList<Tag> tags;
    private Integer nbPeople;
    private LocalDateTime start;
    private LocalDateTime end;

    @Autowired
    public Meeting(String name, String description, String locationID, String ownerID, String chatID, ArrayList<Tag> tags, Integer nbPeople, LocalDateTime start, LocalDateTime end) {
        this.name = name;
        this.description = description;
        this.locationID = locationID;
        this.ownerID = ownerID;
        this.chatID = chatID;
        this.tags = tags;
        this.nbPeople = nbPeople;
        this.start = start;
        this.end = end;
    }

    public Meeting(String name){
        this.name = name;
    }
}

