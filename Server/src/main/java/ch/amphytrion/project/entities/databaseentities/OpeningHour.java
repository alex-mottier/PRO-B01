package ch.amphytrion.project.entities.notdatabaseentities.databaseentities;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@AllArgsConstructor
@Data
@Document
public class OpeningHour {
    private enum Day {
        SUNDAY,MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY
    }
    private Day day;
    private LocalDateTime hourBegin;
    private LocalDateTime hourEnd;
}
