package ch.amphytrion.project.entities.databaseentities;

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
public class Message {
    private String message;
    private String username;
    private LocalDateTime date;

    public Message(String message, LocalDateTime date) {
        this.message = message;
        this.date = date;
    }
}
