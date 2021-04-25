package ch.amphytrion.project.entities.databaseentities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;

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
    private ArrayList<String> membersID;
    private String startDate;
    private String endDate;
    private Boolean isPrivate;

    @Autowired
    public Meeting(String name, String description, String locationID, String ownerID, String chatID, ArrayList<Tag> tags, Integer nbPeople, String start, String end, boolean isPrivate) {
        this.name = name;
        this.description = description;
        this.locationID = locationID;
        this.ownerID = ownerID;
        this.chatID = chatID;
        this.tags = tags;
        this.nbPeople = nbPeople;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Meeting(String name){
        this.name = name;
    }
}

