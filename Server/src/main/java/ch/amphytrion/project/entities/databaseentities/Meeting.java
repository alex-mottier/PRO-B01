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
import java.util.List;

/**
 *
 *
 * @author Alexis Allemann, Hakim Balestieri, Aloïs Christen, Christian Gomes, Alexandre Mottier, Johann Werkle
 */
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
    // List de String ?
    private List<Tag> tags;
    private List<String> membersID = new ArrayList<>();
    private String startDate;
    private String endDate;
    private Boolean isPrivate;

    @Autowired
    public Meeting(String name, String description, String locationID, String ownerID, String chatID, List<Tag> tags, Integer nbPeople, String startDate, String endDate, boolean isPrivate) {
        this.name = name;
        this.description = description;
        this.locationID = locationID;
        this.ownerID = ownerID;
        this.chatID = chatID;
        this.tags = tags;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Meeting(String name){ this.name = name; }
}

