package ch.amphytrion.project.dto;

import ch.amphytrion.project.entities.databaseentities.Meeting;
import ch.amphytrion.project.entities.databaseentities.Tag;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Data
public class MeetingResponse{
    @Id
    private String id;
    private String name;
    private String description;
    private String locationID;
    private String locationName;
    private String ownerID;
    private String chatID;
    private ArrayList<Tag> tags;
    private Integer nbPeople;
    private Integer maxPeople;
    // Format ISO 8601
    private String startDate;
    private String endDate;
    private Boolean isPrivate;
}
