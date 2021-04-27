package ch.amphytrion.project.entities.databaseentities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Data
@Document
public class Chat {
    @Id
    private String id;
    private ArrayList<Message> messages;

    public Chat(){
        this.messages = new ArrayList<>();
    }
}
