package com.example.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.neo4j.core.schema.Node;

import java.time.LocalDateTime;

@AllArgsConstructor
@Data
@Document
public class OpeningHour {
    public enum Day {
        MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY,SUNDAY
    }
    private Day day;
    private LocalDateTime hourBegin;
    private LocalDateTime hourEnd;
    private Location location;

}
