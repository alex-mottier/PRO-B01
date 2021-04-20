package ch.amphytrion.project.entities.notdatabaseentities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
public class OpeningHourResponse {
    private String id;
    private Integer day;
    // hh:mm
    private String startTime;
    private String endTime;
}
