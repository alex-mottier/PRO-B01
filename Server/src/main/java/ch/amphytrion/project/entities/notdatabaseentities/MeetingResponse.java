package ch.amphytrion.project.entities.notdatabaseentities;

import ch.amphytrion.project.entities.databaseentities.Meeting;
import lombok.Data;

@Data
public class MeetingResponse extends Meeting {
    private String locationName;
    private Integer maxPeople;
}
