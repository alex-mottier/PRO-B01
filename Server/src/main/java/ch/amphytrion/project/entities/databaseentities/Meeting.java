package ch.amphytrion.project.entities.databaseentities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
public class Meeting {
    private String name;
    private String description;
    private String locationID;
    private String ownerID;
    private String chatID;
    private ArrayList<Tag> tags;
    private Integer nbPeople;
    private LocalDateTime start;
    private LocalDateTime end;
}
