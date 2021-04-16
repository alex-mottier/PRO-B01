package ch.amphytrion.project.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
public class OpeningHour {
    public enum Day {
        MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY,SUNDAY
    }
    @Id
    private String id;
    private Day day;
    private LocalDateTime hourBegin;
    private LocalDateTime hourEnd;
    private Location location;

    public OpeningHour(Day day, LocalDateTime hourBegin, LocalDateTime hourEnd, Location location) {
        this.day = day;
        this.hourBegin = hourBegin;
        this.hourEnd = hourEnd;
        this.location = location;
    }
}
