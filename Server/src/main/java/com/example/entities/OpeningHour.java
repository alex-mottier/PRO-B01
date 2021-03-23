package com.example.entities;

import lombok.Data;
import org.springframework.data.neo4j.core.schema.Node;

import java.time.LocalDateTime;

@Node("HoraireOuverture")
@Data
public class OpeningHour {
    public enum Day {
        MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY,SUNDAY
    }
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
