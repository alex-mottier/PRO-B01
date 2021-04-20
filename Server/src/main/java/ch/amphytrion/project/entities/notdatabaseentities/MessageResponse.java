package ch.amphytrion.project.entities.notdatabaseentities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
public class MessageResponse {
    private String id;
    private String message;
    private String username;
    // Format ISO 8601
    private String date;
}
