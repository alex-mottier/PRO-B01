package ch.amphytrion.project.notdatabaseentities;

import ch.amphytrion.project.databaseentities.apiresponse.Tag;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;

@AllArgsConstructor
@Data
@Document
public class MeetingResponse {
    private String name;
    private String description;
    private ArrayList<Tag> tags;
    private String locationID;
    private Integer nbPeople;
    private LocalDateTime start;
    private LocalDateTime end;
    private String ownerID;
    private String chatID;
}
